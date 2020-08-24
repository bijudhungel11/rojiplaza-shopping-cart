import React, { Component } from "react";
import "./Products.css";
import Fade from "react-reveal/Fade";

import Modal from "react-modal";
import Zoom from "react-reveal/Zoom";
import { connect } from "react-redux";

import { fetchProducts } from "../redux/actions/productAction";
import { addToCart } from "../redux/actions/cartActions";
class Products extends Component {
  state = {
    product: null,
  };
  componentDidMount() {
    this.props.fetchProducts();
  }
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
          {!this.props.products ? (
            <div> Loading.....</div>
          ) : (
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
          )}
        </Fade>
        {product && (
          <Modal
            isOpen={true}
            onRequestClose={this.closeModal}
            ariaHideApp={false}
          >
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
                    {product.availableSizes.map((item, i) => (
                      <span key={i}>
                        {" "}
                        <button className="btn-available__sizes">{item}</button>
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
        )}
      </div>
    );
  }
}
export default connect(
  (state) => ({
    products: state.products.filteredItems,
    cartItems: state.cart.cartItems,
  }),
  {
    fetchProducts,
    addToCart,
  }
)(Products);
