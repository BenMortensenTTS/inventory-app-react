import React, { useEffect, useState } from 'react';
import './App.css';
import ShowAllStockItems from './components/ShowAllStockItems';
import ShowStockItem from './components/ShowStockItem';
import StockItemForm from './components/StockItemForm';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import AppBar from './components/AppBar'
import Button from 'react-bootstrap/Button';

function App() {
  const [inventoryData, setInventoryData] = useState([]);

  const getDataFromAPI = () => {
    fetch("https://inventoryapp.cfapps.io/stockitems")
    .then((res)=> res.json())
    .then((response) => {
      setInventoryData(response);
    });
  }

  useEffect(()=> {
    getDataFromAPI();
  }, [])

  return (
    <div>
      <AppBar />
      <Router>
        <nav>
          <Link to="/"><Button className="nav-button" variant="dark">Show Inventory</Button></Link>
          <Link to="/add"><Button className="nav-button" variant="dark">Add Inventory Item</Button></Link>
          <Link to="/shoppinglist"><Button className="nav-button" variant="dark">Shopping List</Button></Link>
        </nav>
        <div className="container">
          

          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/stockitem/:id" render={(props)=> (
              <ShowStockItem {...props} getDataFromAPI={getDataFromAPI}/>
            )}/>
            <Route path="/edit/stockitem/:id" render={(props)=> (
              <StockItemForm {...props} getDataFromAPI={getDataFromAPI}/>
            )} />
            <Route path="/add" render={(props) => (
              <StockItemForm {...props} getDataFromAPI={getDataFromAPI}/>
              )}/>
            <Route exact path="/" render={(props) => (
              <ShowAllStockItems {...props} stock={inventoryData} getDataFromAPI={getDataFromAPI}/>
              )}/>
              
            <Route path="/shoppinglist" render={(props) => (
              <ShowAllStockItems {...props} stock={inventoryData} getDataFromAPI={getDataFromAPI}/> 
              )}/>
          </Switch>
        </div>
      </Router>

    </div>
  );
}



export default App;
