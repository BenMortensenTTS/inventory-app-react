import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import './ShowAllStockItems.css';


function ShowAllStockItems(props) {

	const [itemStockArr, setItemStockArr] = useState([]);

	useEffect(()=> {

		setItemStockArr([]);

		console.log(props.stock);


		if(props.match.url !== "/") {
			setItemStockArr(props.stock.filter((item)=> {
				return item.amountInStock <= item.alertAt;
			}).map((item)=> {
				return (
					<div className="item-box" key={item.id}>
						<Link style={{ textDecoration: 'none'}} className="container" to={"/stockitem/" + item.id} >
							<div className={"items " + ((item.amountInStock<=item.alertAt)?"low":"")}>
								<div className="fields" id="item-name">{item.itemName}</div>
								<div className="fields">Stock: {item.amountInStock}</div>
								<div className="fields">Ideal: {item.idealStock}</div>
							</div>
						</Link>
						<div onClick={()=>subtractStockClick(item.id, item.amountInStock, item.idealStock, item.alertAt, item.itemName, item.room)} className="circle-state" id="minus">-</div>
						<span onClick={()=>addStockClick(item.id, item.amountInStock, item.idealStock, item.alertAt, item.itemName, item.room)} className="circle-state" id="plus">+</span>
					</div>
				);
			}))
		}

		else if(props.match.url === "/") {
			setItemStockArr(props.stock.map((item)=> {
				return (
					<div className="item-box" key={item.id}>
						<Link style={{ textDecoration: 'none'}} className="container" to={"/stockitem/" + item.id} >
							<div className={"items " + ((item.amountInStock<=item.alertAt)?"low":"")}>
								<div className="fields" id="item-name">{item.itemName}</div>
								<div className="fields">Stock: {item.amountInStock}</div>
								<div className="fields">Ideal: {item.idealStock}</div>
							</div>
						</Link>
						<div onClick={()=>subtractStockClick(item.id, item.amountInStock, item.idealStock, item.alertAt, item.itemName, item.room)} className="circle-state" id="minus">-</div>
						<span onClick={()=>addStockClick(item.id, item.amountInStock, item.idealStock, item.alertAt, item.itemName, item.room)} className="circle-state" id="plus">+</span>
					</div>
				);
			}))
		}
		
	}, [props.match])


	const subtractStockClick = (id, amountInStock, idealStock, alertAt, itemName, room) => {
		if(amountInStock > 0) {
			fetch('https://inventoryapp.cfapps.io/stockitem/' + id, {
		    	method: 'put',
		    	headers: {
		        	"Content-Type": "application/json"
		    	},
		    	body: JSON.stringify({
			        amountInStock: amountInStock - 1,
			        idealStock: idealStock,
			        alertAt: alertAt,
			        itemName: itemName,
			        room: room 
		      	})
		    }).then(()=>{
		     	props.getDataFromAPI();
		    })
		}
	}

	const addStockClick = (id, amountInStock, idealStock, alertAt, itemName, room) => {
		fetch('https://inventoryapp.cfapps.io/stockitem/' + id, {
	    	method: 'put',
	    	headers: {
	        	"Content-Type": "application/json"
	    	},
	    	body: JSON.stringify({
		        amountInStock: amountInStock + 1,
		        idealStock: idealStock,
		        alertAt: alertAt,
		        itemName: itemName,
		        room: room 
	      	})
	    }).then(()=>{
	     	props.getDataFromAPI();
	    })
	}

	return (
		<div id="container">
			<div id="allstock-div">
				{itemStockArr}
			</div>
		</div>
	);
}

export default ShowAllStockItems;