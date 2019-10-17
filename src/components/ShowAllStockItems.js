import React from 'react';
import { Link } from "react-router-dom";
import './ShowAllStockItems.css';


function ShowAllStockItems(props) {

	let itemStockArr = props.stock.map((item)=> {
		return (
			<div id="item-box" key={item.id}>
				<Link style={{ textDecoration: 'none'}} className="container" to={"/stockitem/" + item.id} >
					<div className="items">
						<div className="fields">{item.itemName}</div>
						<div className="fields">Stock: {item.amountInStock}</div>

					</div>
				</Link>
				<div className="circle-state" id="minus">-</div><span className="circle-state" id="plus">+</span>
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