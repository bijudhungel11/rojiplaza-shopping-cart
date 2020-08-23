import React, { Component } from "react";
import "./Products.css";
export default class extends Component {
  render() {
    return (
      <div>
        <ul className="products">
          {this.props.products.map((product) => (
            <li key={product._id}>
              <div className="product">
                <a href={`# ${product._id}`}>
                  <img src={product.image} alt={product.title} />

                  <p>{product.title}</p>
                </a>
                <div className="product__info">
                  <div className="product__price">NRS {product.price}</div>
                  <button className="btn btn-primary">Add to cart</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
