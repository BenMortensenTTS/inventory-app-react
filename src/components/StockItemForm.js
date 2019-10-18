import React, { useState, useEffect } from 'react';
import './StockItemForm.css'
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';

function StockItemForm(props) {

	const [id, setId] = useState("");
	const [amountInStock, setAmountInStock] = useState("");
	const [idealStock, setIdealStock] = useState("");
	const [alertAt, setAlertAt] = useState("");
	const [itemName, setItemName] = useState("");
	const [room, setRoom] = useState("");
	
	const resetState = () => {
		setAmountInStock("");
		setIdealStock("");
		setAlertAt("");
		setItemName("");
		setRoom("");
		setId("");
	}

	useEffect(()=> {
		let paramId = props.match ? props.match.params.id : 0;
		setId(paramId)
		if(paramId) {
			setAmountInStock(props.location.state.amountInStock);
			setIdealStock(props.location.state.idealStock);
			setAlertAt(props.location.state.alertAt);
			setItemName(props.location.state.itemName);
			setRoom(props.location.state.room);			
		} else {
			resetState();
		}
	}, [props.match])

	const onStockInput = (input) => {
		setAmountInStock(input.target.value);
	}

	const onidealStockInput = (input) => {
		setIdealStock(input.target.value);
	}

	const onAlertInput = (input) => {
		setAlertAt(input.target.value);
	}

	const onNameInput = (input) => {
		setItemName(input.target.value);
	}

	const handleRoom = (input) => {
		setRoom(input.target.value);
	}

	const handleUpdateClick = () => {
		fetch('https://inventoryapp.cfapps.io/stockitem/' + id, {
	    	method: 'put',
	    	headers: {
	        	"Content-Type": "application/json"
	    	},
	    	body: JSON.stringify({
		        amountInStock: amountInStock,
		        idealStock: idealStock,
		        alertAt: alertAt,
		        itemName: itemName,
		        room: room 
	      	})
	    }).then(()=>{
	     	props.getDataFromAPI();
	     	resetState();
	    })
	}

	const handleCreateClick = () => {
		fetch('https://inventoryapp.cfapps.io/stockitem', {
	    	method: 'post',
	    	headers: {
	        	"Content-Type": "application/json"
	    	},
	    	body: JSON.stringify({
		        amountInStock: amountInStock,
		        idealStock: idealStock,
		        alertAt: alertAt,
		        itemName: itemName,
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
			updateOrSubmit = <div className="form-button ui"><Button variant="success" onClick={handleUpdateClick}>Update</Button></div>
		} else {
			updateOrSubmit = <div className="form-button ui"><Button variant="success" onClick={handleCreateClick}>Submit</Button></div>
		}

	return (
		<div id="form" className="container">
			<div className="form-header">Name of the Item:</div>
				<input className="form-input" type="text" onChange={onNameInput} value={itemName} required />
			
			<div className="form-header"># Currently In Stock:</div>
				<div><input className="form-input" type="number"  onChange={onStockInput} value={amountInStock} required /></div>

			<div className="form-header"># of Stock Ideally:</div>
				<div><input className="form-input" type="number"  onChange={onidealStockInput} value={idealStock} required /></div>
			
			<div className="form-header">Alert Stock At:</div>
				<div><input className="form-input" type="number"  onChange={onAlertInput} value={alertAt} required /></div>
			
			<div className="form-header">Select Room:</div>
				<div><input className="form-input" onChange={handleRoom} list="rooms" name="room" autoComplete="off" value={room}/></div>
				 	<datalist id="rooms">
					    <option value="General"></option>
					    <option value="Bedroom"></option>
					    <option value="Kitchen"></option>
					    <option value="Family Room"></option>
					    <option value="Garage"></option>
					    <option value="Bathroom"></option>
						<option value="Utility Room"></option>
					    <option value="Other"></option>
					</datalist>
					<br/>
			<Link to="/">{updateOrSubmit}</Link>
			{console.log(props.match)}
		</div>
	);
}

export default StockItemForm;