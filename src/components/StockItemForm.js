import React, { useState, useEffect } from 'react';
import './StockItemForm.css'
import { Link } from "react-router-dom";

function ShowStockItems(props) {

	const [id, setId] = useState(0);
	const [amountInStock, setAmountInStock] = useState(0);
	const [alertAt, setAlertAt] = useState(0);
	const [itemName, setItemName] = useState("");
	const [emailAddress, setEmailAddress] = useState("");
	const [room, setRoom] = useState("");
	
	const resetState = () => {
		setAmountInStock(0);
		setAlertAt(0);
		setItemName("");
		setEmailAddress("");
		setRoom("");
	}

	useEffect(()=> {
		let theId = props.match ? props.match.params.id : 0;
		setId(theId)
		if(theId) {
			setAmountInStock(props.location.state.amountInStock);
			setAlertAt(props.location.state.alertAt);
			setItemName(props.location.state.itemName);
			setEmailAddress(props.location.state.emailAddress);
			setRoom(props.location.state.room);			
		} else {
			resetState();
		}
	}, [props.action])

	const onStockInput = (input) => {
		setAmountInStock(input.target.value);
	}

	const onAlertInput = (input) => {
		setAlertAt(input.target.value);
	}

	const onNameInput = (input) => {
		setItemName(input.target.value);
	}

	const onEmailInput = (input) => {
		setEmailAddress(input.target.value);
	}

	const handleRoom = (input) => {
		setRoom(input.target.value);
	}

	const handleUpdateClick = () => {
		fetch('http://localhost:8080/stockitem/' + id, {
	    	method: 'put',
	    	headers: {
	        	"Content-Type": "application/json"
	    	},
	    	body: JSON.stringify({
		        amountInStock: amountInStock,
		        alertAt: alertAt,
		        itemName: itemName,
		        emailAddress: emailAddress,
		        room: room 
	      	})
	    }).then(()=>{
	     	props.getDataFromAPI();
	     	resetState();
	    })
	}

	const handleCreateClick = () => {
		fetch('http://localhost:8080/stockitem', {
	    	method: 'post',
	    	headers: {
	        	"Content-Type": "application/json"
	    	},
	    	body: JSON.stringify({
		        amountInStock: amountInStock,
		        alertAt: alertAt,
		        itemName: itemName,
		        emailAddress: emailAddress,
		        room: room 
	      	})
	    }).then(()=>{
	     	props.getDataFromAPI();
	     	resetState();
	    })
	}

		let updateOrSubmit;
		let checkProps = props.match ? props.match.params.id : 0;
		if(checkProps) {
			updateOrSubmit = <div className="form-button"><button  onClick={handleUpdateClick}>Update</button></div>
		} else {
			updateOrSubmit = <div className="form-button"><button onClick={handleCreateClick}>Submit</button></div>
		}

	return (
		<div id="form">
			<div className="form-header">Name of the Item:</div>
				<input className="form-input" type="text" onChange={onNameInput} value={itemName} required />
			
			<div className="form-header"># Currently In Stock:</div>
				<div><input className="form-input" type="number"  onChange={onStockInput} value={amountInStock} required /></div>
			
			<div className="form-header"># of Stock for Notification:</div>
				<div><input className="form-input" type="number"  onChange={onAlertInput} value={alertAt} required /></div>
			
			<div className="form-header">Email Address:</div>
				<div><input className="form-input" type="email" onChange={onEmailInput} value={emailAddress} required /></div>
			
			<div className="form-header">Select Room:</div>
				<div><input className="form-input" onChange={handleRoom} list="rooms" name="room" autoComplete="off" value={room}/></div>
				 	<datalist id="rooms">
					    <option value="Bathroom"></option>
					    <option value="Bedroom"></option>
					    <option value="Kitchen"></option>
					    <option value="Living Room"></option>
					    <option value="Family Room"></option>
					    <option value="Dining Room"></option>
					    <option value="Other"></option>
					</datalist>
					<br/>
			<Link to="/">{updateOrSubmit}</Link>
		</div>
	);
	
	
}

export default ShowStockItems;