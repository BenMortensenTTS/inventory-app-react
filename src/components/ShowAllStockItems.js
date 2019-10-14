import React from 'react';
import { Link } from "react-router-dom";


function ShowAllStockItems(props) {

	let itemStockArr = props.stock.map((item)=> {
		return (
			<Link to={"/stockitem/" + item.id} key={item.id}>
				<div >
					ID: {item.id},
					Item Name: {item.itemName},
					# In Stock: {item.amountInStock},
					# for Notification: {item.alertAt},
					Email Address: {item.emailAddress},
					Room: {item.room}
				</div>
			</Link>
		);
	})


	return (
		<div>
			{itemStockArr}
		</div>
	);
}

export default ShowAllStockItems;