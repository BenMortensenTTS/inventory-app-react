import React from 'react';
import './StockItemForm.css'
import { Link } from "react-router-dom";

class ShowStockItems extends React.Component {
	constructor() {
		super();
		this.state = {
			id:0,
			amountInStock: 0,
			alertAt: 0,
			itemName:"",
			emailAddress: "",
			room: ""
		}
	}

	componentDidMount() {
		let id = this.props.match ? this.props.match.params.id : 0;
		this.setState({id})
		if(id) {
			this.setState({
				amountInStock: this.props.location.state.amountInStock,
				alertAt: this.props.location.state.alertAt,
				itemName:this.props.location.state.itemName,
				emailAddress: this.props.location.state.emailAddress,
				room: this.props.location.state.room
			})
		}
	}

	onStockInput = (input) => {
		this.setState({amountInStock: input.target.value})
	}

	onAlertInput = (input) => {
		this.setState({alertAt: input.target.value})
	}

	onNameInput = (input) => {
		this.setState({itemName: input.target.value})
	}

	onEmailInput = (input) => {
		this.setState({emailAddress: input.target.value})
	}

	handleRoom = (input) => {
		this.setState({room: input.target.value})
	}

	handleUpdateClick = () => {
		fetch('http://localhost:8080/stockitem/' + this.state.id, {
	    	method: 'put',
	    	headers: {
	        	"Content-Type": "application/json"
	    	},
	    	body: JSON.stringify({
		        amountInStock:this.state.amountInStock,
		        alertAt:this.state.alertAt,
		        itemName:this.state.itemName,
		        emailAddress:this.state.emailAddress,
		        room:this.state.room 
	      	})
	    }).then(()=>{
	     	this.props.getDataFromAPI();
	     	this.setState({
		     	id:0,
				amountInStock: 0,
				alertAt: 0,
				itemName:"",
				emailAddress: "",
				room: 0
			});
	    })
	}

	handleCreateClick = () => {
		fetch('http://localhost:8080/stockitem', {
	    	method: 'post',
	    	headers: {
	        	"Content-Type": "application/json"
	    	},
	    	body: JSON.stringify({
		        amountInStock:this.state.amountInStock,
		        alertAt:this.state.alertAt,
		        itemName:this.state.itemName,
		        emailAddress:this.state.emailAddress,
		        room:this.state.room 
	      	})
	    }).then(()=>{
	     	this.props.getDataFromAPI();
	     	this.setState({
		     	id:0,
				amountInStock: 0,
				alertAt: 0,
				itemName:"",
				emailAddress: "",
				room: 0
			});
	    })
	}

	render() {

		let updateOrSubmit;
		if(this.state.id) {
			updateOrSubmit = <div className="form-button"><button  onClick={this.handleUpdateClick}>Update</button></div>
		} else {
			updateOrSubmit = <div className="form-button"><button onClick={this.handleCreateClick}>Submit</button></div>
		}
		


		return (
			<div id="form">
				<div className="form-header">Name of the Item:</div>
					<input className="form-input" type="text" onChange={this.onNameInput} value={this.state.id ? this.state.itemName : console.log()} required />
				
				<div className="form-header"># Currently In Stock:</div>
					<div><input className="form-input" type="number"  onChange={this.onStockInput} value={this.state.id ? this.state.amountInStock : console.log()} required /></div>
				
				<div className="form-header"># of Stock for Notification:</div>
					<div><input className="form-input" type="number"  onChange={this.onAlertInput} value={this.state.id ? this.state.alertAt : console.log()} required /></div>
				
				<div className="form-header">Email Address:</div>
					<div><input className="form-input" type="email" onChange={this.onEmailInput} value={this.state.id ? this.state.emailAddress : console.log()} required /></div>
				
				<div className="form-header">Select Room:</div>
					<div><input className="form-input" onChange={this.handleRoom} list="rooms" name="room" autoComplete="off" value={this.state.id ? this.state.room : console.log()}/></div>
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
	
}

export default ShowStockItems;