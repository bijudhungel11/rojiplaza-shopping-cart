import React, { Component } from "react";
import "./Cart.css";
import "./Products.css";
import Fade from "react-reveal/Fade";
import { connect } from "react-redux";
import { removeFromCart } from "../redux/actions/cartActions";
import { clearOrder, createOrder } from "../redux/actions/orderActions";
import Modal from "react-modal";
import Zoom from "react-reveal/Zoom";
class Cart extends Component {
  state = {
    showCheckout: false,
    name: "",
    email: "",
    address: "",
  };
  handleClick = () => {
    this.setState({ showCheckout: !this.state.showCheckout });
  };

  handleInput = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };
  createOrder = (e) => {
    e.preventDefault();
    const order = {
      name: this.state.name,
      email: this.state.email,
      address: this.state.address,
      cartItems: this.props.cartItems,
      total: this.props.cartItems.reduce((a, c) => a + c.price * c.count, 0),
    };
    this.props.createOrder(order);

    this.setState({
      name: "",
      address: "",
      email: "",
    });
  };
  closeModal = () => {
    this.props.clearOrder();
    window.location.reload();
  };
  render() {
    const { cartItems, removeFromCart, order } = this.props;

    /*     console.log(cartItems); */
    return (
      <div>
        {cartItems.length === 0 ? (
          <div className="cart cart__header">Cart is empty</div>
        ) : (
          <div className="cart cart__header">
            You have {cartItems.length} in the Cart
          </div>
        )}
        {order && (
          <Modal
            isOpen={true}
            onRequestClose={this.closeModal}
            ariaHideApp={false}
          >
            <Zoom>
              <button className="close__modal" onClick={this.closeModal}>
                X
              </button>
              <div className="order__container">
                <h3 className="success-message">Your order has been placed.</h3>
                <h2>Order:{order._id}</h2>
                <ul>
                  <li>
                    <div>Name:</div>
                    <div>{order.name}</div>
                  </li>
                  <li>
                    <div>Email:</div>
                    <div>{order.email}</div>
                  </li>
                  <li>
                    <div>Address:</div>
                    <div>{order.address}</div>
                  </li>
                  <li className="total__price--border-top">
                    <div>Your Ordered Items Price: </div>
                    <div>NRS {order.total}</div>
                  </li>
                  <li className="order__items--list">
                    <div className="items">Items</div>
                    <div>
                      {order.cartItems.map((x) => (
                        <div key={x._id}>
                          {x.count}
                          {"x"}
                          {x.title}
                        </div>
                      ))}
                    </div>
                  </li>
                </ul>
              </div>
            </Zoom>
          </Modal>
        )}
        <div className="cart__list">
          <div className="cart">
            <Fade left cascade>
              {" "}
              <ul className="cart__list--items">
                {cartItems.map((item, i) => (
                  <li key={item._id}>
                    <div className="cart__list--itemsImage">
                      <img src={item.image} alt={item.title} />
                    </div>
                    <div>
                      <div className="cart__list--itemName">{item.title}</div>
                      <div className="right">
                        NRS {item.price}x {item.count}
                        {"  "}
                        <button
                          onClick={() => removeFromCart(item)}
                          className="btn btn-danger"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </Fade>
          </div>
          <div className="cart">
            {cartItems.length === 0 ? (
              <></>
            ) : (
              <>
                <div className="total">
                  <div className="total__price">
                    TOTAL: NRS{" "}
                    {cartItems.reduce((a, c) => a + c.price * c.count, 0)}
                  </div>
                  <div>
                    <button
                      onClick={this.handleClick}
                      className={`btn  ${
                        this.state.showCheckout ? "btn-info" : "btn-success"
                      }`}
                    >
                      {this.state.showCheckout ? "Go Back" : "Proceed"}
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          <Fade cascade right>
            {this.state.showCheckout && (
              <div className=" cart__form">
                <form onSubmit={this.createOrder}>
                  <ul className="form__container">
                    <li>
                      <label>Email</label>
                      <input
                        value={this.state.email}
                        name="email"
                        type="email"
                        required
                        onChange={this.handleInput}
                      />
                    </li>
                    <li>
                      <label>Name</label>
                      <input
                        value={this.state.name}
                        name="name"
                        type="text"
                        required
                        onChange={this.handleInput}
                      />
                    </li>
                    <li>
                      <label>Address</label>
                      <input
                        value={this.state.address}
                        name="address"
                        type="text"
                        required
                        onChange={this.handleInput}
                      />
                    </li>
                    <li>
                      <button
                        type="submit"
                        className="btn btn-success"
                        disabled={
                          !this.state.name &&
                          !this.state.email &&
                          !this.state.address
                        }
                      >
                        Check Out
                      </button>
                    </li>
                  </ul>
                </form>
              </div>
            )}
          </Fade>
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    cartItems: state.cart.cartItems,
    order: state.order.order,
  }),

  { removeFromCart, createOrder, clearOrder }
)(Cart);
