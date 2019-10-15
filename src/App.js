import React, { useEffect, useState } from 'react';
import './App.css';
import ShowAllStockItems from './components/ShowAllStockItems';
import ShowStockItem from './components/ShowStockItem';
import StockItemForm from './components/StockItemForm';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import DenseAppBar from './components/AppBar'
import Button from 'react-bootstrap/Button';

function App() {
  const [inventoryData, setInventoryData] = useState([]);

  const getDataFromAPI = () => {
    fetch("http://localhost:8080/stockitems")
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
      <DenseAppBar />
      <Router>
        <div className="container">
          <nav>
                <Link to="/"><Button variant="secondary">Show Inventory</Button></Link><br/>
                <Link to="/add"><Button variant="secondary">Add Inventory Item</Button></Link>
          </nav>

          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/stockitem/:id" render={(props)=> (
              <ShowStockItem {...props} getDataFromAPI={getDataFromAPI}/>
            )}/>
            <Route path="/edit/stockitem/:id" render={(props)=> (
              <StockItemForm {...props} action="update" getDataFromAPI={getDataFromAPI} />
            )} />
            <Route path="/add" render={(props) => (
              <StockItemForm {...props} action="submit" getDataFromAPI={getDataFromAPI}/>
              )}/>
            <Route exact path="/">
              <ShowAllStockItems stock={inventoryData}/>
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
  
}

export default App;
