import React from 'react';
import './App.css';
import ShowAllStockItems from './components/ShowAllStockItems';
import ShowStockItem from './components/ShowStockItem';
import StockItemForm from './components/StockItemForm';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      inventoryData: []
    }
  }

  getDataFromAPI = () => {
    fetch("http://localhost:8080/stockitems")
    .then((res)=> res.json())
    .then((response) => {
      this.setState({inventoryData: response});
    });
  }

  componentDidMount() {
    this.getDataFromAPI();
  }

  render() {
    return (
      <div>
        <Router>
          <div>
            <nav>
              <ul>
                <li>
                  <Link to="/">Show Inventory</Link>
                </li>
                <li>
                  <Link to="/add">Add Inventory Item</Link>
                </li>
              </ul>
            </nav>

            {/* A <Switch> looks through its children <Route>s and
                renders the first one that matches the current URL. */}
            <Switch>
              <Route path="/stockitem/:id" render={(props)=> (
                <ShowStockItem {...props} getDataFromAPI={this.getDataFromAPI}/>
              )}/>
              <Route path="/edit/stockitem/:id" render={(props)=> (
                <StockItemForm {...props} getDataFromAPI={this.getDataFromAPI} />
              )} />
              <Route path="/add">
                <StockItemForm getDataFromAPI={this.getDataFromAPI}/>
              </Route>
              <Route exact path="/">
                <ShowAllStockItems getDataFromAPI={this.getDataFromAPI} stock={this.state.inventoryData}/>
              </Route>
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
