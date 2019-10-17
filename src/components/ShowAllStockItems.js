import React from 'react';
import { Link } from "react-router-dom";
import './ShowAllStockItems.css';


function ShowAllStockItems(props) {

	let itemStockArr = props.stock.map((item)=> {
		return (
			<div id="item-box">
				<Link className="container ui" to={"/stockitem/" + item.id} key={item.id}>
					<div className="items">
						<div className="fields">{item.itemName}</div>
						<div className="fields">Stock: {item.amountInStock}</div>
					</div>
				</Link>
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