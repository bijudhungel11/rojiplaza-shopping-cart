import React, { Component } from "react";
import "./App.css";

import data from "./data.json";
import Products from "./components/Products";
import Filter from "./components/Filter";
import Cart from "./components/Cart";
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
  /* according to price  */
  sortProducts = (e) => {
    // console.log("sort according to ", e.target.value);
    const sort = e.target.value;
    console.log(sort);

    this.setState((state) => ({
      sort: sort,
      products: this.state.products.slice().sort((a, b) =>
        sort === "Lowest"
          ? /* ? console.log("price of a>>>", a.price, "price of b>>>>", b.price)
            : console.log(
                "actual objects>>>>",
                this.state.products,
                "object a>>>",
                a,
                "object b>>>",
                b
              ) */
            a.price > b.price
            ? 1 // positive
            : -1 //-negative
          : sort === "Highest"
          ? a.price < b.price
            ? 1
            : -1
          : a._id < b._id
          ? 1
          : -1
      ),
    }));
  };

  /* adding the cart in the cart--list */
  addToCart = (product) => {
    /* clone of the cartItems  */

    const cartItems = this.state.cartItems.slice();

    let alreadyInCart = false;
    cartItems.forEach((item) => {
      console.log("the value from the ", item);
      if (item._id === product._id) {
        item.count++;
        alreadyInCart = true;
      }
    });

    if (!alreadyInCart) {
      cartItems.push({ ...product, count: 1 });
    }
    this.setState({ cartItems });

    /* it takes the  two value one for key and another should be the string so we are using the JSON.stringify() method to make the javascript object ot the object*/
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };

  removeFromCart = (item, num) => {
    console.log(num);
    const cartItems = this.state.cartItems.slice();
    /* those item where the user has click the remove for the button is filter and cartItems.filter(x) will return all the item expect the clicked item in the array 
    
    cartItems.filter((x) => x._id !== item._id)
    
    But we can also do the value of the simple one 
    ==>first we have make the copy of the this.state.cartItems and then assing that copy ot the cartItems and now we can use the poweful method of the array which is splice and when the user clicked the remove button then the index of that item is also passed at the removeFromCart and then we can use the splice method in it 
    
    cartItems is now the array of the cart lists and when we splice(num, 1) THEN NUM  is the index to start 1 is the deletecount
    
    
    console.log(cartItems);*/

    cartItems.splice(num, 1);
    this.setState({
      cartItems: cartItems,
    });
    console.log(
      "simple value of the cartItems",
      cartItems,
      "===",
      "this.state.cartItems>>>",
      this.state.cartItems
    );
    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    /* console.log(cartItems.filter((x) => x._id !== item._id)); */
  };
  filterProducts = (e) => {
    if (e.target.value === "") {
      this.setState({
        size: e.target.value,
        products: data.products,
      });
    } else {
      this.setState({
        size: e.target.value,
        products: data.products.filter(
          (product) => product.availableSizes.indexOf(e.target.value) >= 0
        ),
      });
    }
    /* console.log(
      "let see what the hell is index of ",
      this.state.products.filter((product) =>
        product.availableSizes.indexOf(e.target.value)
      ) */
    /* data.products.filter((product) =>
        console.log(product.availableSizes.indexOf(e.target.value))
      ) 
    );*/
    //console.log("who have choose size", e.target.value);
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
      <>
        <div className="grid__container">
          <header className="header">
            <a href="/">RojiPlaza</a>
          </header>
          <main className="main__container">
            <div className="main__content">
              <div className="main">
                <Filter
                  count={this.state.products.length}
                  size={this.state.size}
                  sort={this.state.sort}
                  filterProducts={this.filterProducts}
                  sortProducts={this.sortProducts}
                />
                <Products
                  products={this.state.products}
                  addToCart={this.addToCart}
                />
              </div>
              <div className="sidebar">
                <Cart
                  cartItems={this.state.cartItems}
                  removeFromCart={this.removeFromCart}
                  createOrder={this.createOrder}
                />
              </div>
            </div>
          </main>

          <footer className="footer">@All rights is reserved.</footer>
        </div>
      </>
    );
  }
}
