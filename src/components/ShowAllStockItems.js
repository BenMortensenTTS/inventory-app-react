import React, { useState } from 'react';
import { Link } from "react-router-dom";
import './ShowAllStockItems.css';


function ShowAllStockItems(props) {

	const subtractStockClick = (id, amountInStock, alertAt, itemName, room) => {
		fetch('https://inventoryapp.cfapps.io/stockitem/' + id, {
	    	method: 'put',
	    	headers: {
	        	"Content-Type": "application/json"
	    	},
	    	body: JSON.stringify({
		        amountInStock: amountInStock - 1,
		        alertAt: alertAt,
		        itemName: itemName,
		        room: room 
	      	})
	    }).then(()=>{
	     	props.getDataFromAPI();
	    })
	}

	const addStockClick = (id, amountInStock, alertAt, itemName, room) => {
		fetch('https://inventoryapp.cfapps.io/stockitem/' + id, {
	    	method: 'put',
	    	headers: {
	        	"Content-Type": "application/json"
	    	},
	    	body: JSON.stringify({
		        amountInStock: amountInStock + 1,
		        alertAt: alertAt,
		        itemName: itemName,
		        room: room 
	      	})
	    }).then(()=>{
	     	props.getDataFromAPI();
	    })
	console.log(id, amountInStock, alertAt, itemName, room);

	}

	let itemStockArr = props.stock.map((item)=> {
		return (
			<div id="item-box" key={item.id}>
				<Link style={{ textDecoration: 'none'}} className="container" to={"/stockitem/" + item.id} >
					<div className="items">
						<div className="fields">{item.itemName}</div>
						<div className="fields">Stock: {item.amountInStock}</div>

					</div>
				</Link>
				<div onClick={()=>subtractStockClick(item.id, item.amountInStock, item.alertAt, item.itemName, item.room)} className="circle-state" id="minus">-</div>
				<span onClick={()=>addStockClick(item.id, item.amountInStock, item.alertAt, item.itemName, item.room)} className="circle-state" id="plus">+</span>
			</div>
		);
	})


	return (
		<div id="allstock-div">
			{itemStockArr}
		</div>
	);
}

export default ShowAllStockItems;