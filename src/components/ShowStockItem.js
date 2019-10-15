import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import './ShowStockItem.css';

function ShowStockItem(props) {

	const [stockInfo, setStockInfo] = useState({});

	useEffect(()=> {
		const id = props.match.params.id;
        fetch("http://localhost:8080/stockitem/" + id)
            .then((res)=>res.json())
            .then((response)=>{
                setStockInfo(response);
        	})

	}, [props.match.params.id])

	const deleteStockItem = (id) => {
		 fetch("http://localhost:8080/stockitem/" + id, {
            method: 'delete'
        }).then(()=>{
            props.getDataFromAPI();
            props.history.push('/');
        })
	}

	return (
		<div>
			<ul>
				<li>ID: {stockInfo.id}</li>
				<li>Item Name: {stockInfo.itemName}</li>
				<li># In Stock: {stockInfo.amountInStock}</li>
				<li># for Notification: {stockInfo.alertAt}</li>
				<li>Email Address: {stockInfo.emailAddress}</li>
				<li>Room: {stockInfo.room}</li>
			</ul>
			<Button variant="danger" id="delete-button" onClick={()=>deleteStockItem(stockInfo.id)}>Delete</Button>
			<Link to={{
				pathname:`/edit/stockitem/${stockInfo.id}`,
				state: {
					amountInStock: stockInfo.amountInStock,
					alertAt: stockInfo.alertAt,
					itemName: stockInfo.itemName,
					emailAddress: stockInfo.emailAddress,
					room: stockInfo.room
				}

			}}><Button variant="success">Edit</Button></Link>

		</div>
	);
}

export default ShowStockItem;