import React, { Component } from "react";
import "./Products.css";
import Fade from "react-reveal/Fade";

import Modal from "react-modal";
import Zoom from "react-reveal/Zoom";
export default class extends Component {
  state = {
    product: null,
  };
  openModal = (product) => {
    this.setState({ product: product });
  };
  closeModal = () => {
    this.setState({ product: null });
  };
  render() {
    /* console.log(this.state.product); */
    const { product } = this.state;
    return (
      <div>
        {/* cascade make the fade to the one particular product not the all the products  */}
        <Fade bottom cascade={true}>
          <ul className="products">
            {this.props.products.map((product) => (
              <li key={product._id}>
                <div className="product">
                  <a href={`# ${product._id}`}>
                    <img
                      src={product.image}
                      alt={product.title}
                      onClick={() => this.openModal(product)}
                    />

                    <p>{product.title}</p>
                  </a>
                  <div className="product__info">
                    <div className="product__price">NRS {product.price}</div>
                    <button
                      onClick={() => this.props.addToCart(product)}
                      className="btn btn-primary"
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Fade>
        {
          //console.log("value from check", product)
          product && (
            <Modal isOpen={true} onRequestClose={this.closeModal}>
              <Zoom>
                <button
                  className=" btn-danger close__modal"
                  onClick={this.closeModal}
                >
                  X
                </button>
                <div className="product__modal">
                  <div className="product__modal--image">
                    <img src={product.image} alt={product.title} />
                  </div>
                  <div className="product__details--info">
                    <p>
                      <strong>{product.title}</strong>
                    </p>
                    <p>{product.description}</p>
                    <p>
                      Available Sizes:{" "}
                      {product.availableSizes.map((item) => (
                        <span>
                          {" "}
                          <button className="btn-available__sizes">
                            {item}
                          </button>
                        </span>
                      ))}
                    </p>
                    <div>
                      <div className="product__price">NRS{product.price}</div>
                      <button
                        className="btn btn-success"
                        onClick={() => {
                          this.props.addToCart(product);
                          this.closeModal();
                        }}
                      >
                        Add To Cart
                      </button>
                    </div>
                  </div>
                </div>
              </Zoom>
            </Modal>
          )
        }
      </div>
    );
  }
}
