import React, { Component } from "react";
import "./App.css";

import data from "./data.json";
import Products from "./components/Products";
import Filter from "./components/Filter";
import Cart from "./components/Cart";

import store from "./redux/store";
import { Provider } from "react-redux";
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: data.products,
      size: "",
      sort: "",

      /* first the cartItems is directly assign to the string to the javascript object and if we check the result then it will crash beacuse there is no thing in the cart so 
      
      ==> if cartItems is in the cookies or the localstorage then it will use the JSON.parse(localStorage.getItem("cartItems")) if not then the value is the []//empty array */
      /* json.parse is the opposite of the json.stringify so it's convert the string to the javscript objects */
      cartItems: localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [],
    };
  }
  createOrder = (order) => {
    alert("Need to save the order for" + order.name);
  };

  render() {
    /* this.state.products
      .slice()
      .sort((a, b) =>
        console.log("the initial state", a, "the previous state", b)

        console.log(
      "the value after remove  button is clicked>>>>",
      this.state.cartItems
    );
      ); */

    return (
      <Provider store={store}>
        <>
          <div className="grid__container">
            <header className="header">
              <a href="/">RojiPlaza</a>
            </header>
            <main className="main__container">
              <div className="main__content">
                <div className="main">
                  <Filter />
                  <Products
                  /* products={this.state.products} */
                  />
                </div>
                <div className="sidebar">
                  <Cart />
                </div>
              </div>
            </main>

            <footer className="footer">@All rights is reserved.</footer>
          </div>
        </>
      </Provider>
    );
  }
}
