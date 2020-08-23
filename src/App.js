import React, { Component } from "react";
import "./App.css";

import data from "./data.json";
import Products from "./components/Products";
import Filter from "./components/Filter";
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: data.products,
      size: "",
      sort: "",
    };
  }
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
  /* according to the size */
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
      ); */
    console.log();
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
                <Products products={this.state.products} />
              </div>
              <div className="sidebar">Cart Items</div>
            </div>
          </main>

          <footer className="footer">@All rights is reserved.</footer>
        </div>
      </>
    );
  }
}
