import React, { Component } from "react";
import "./Cart.css";
import Fade from "react-reveal/Fade";
export default class Cart extends Component {
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
    };
    this.props.createOrder(order);

    this.setState({
      name: "",
      address: "",
      email: "",
    });
  };
  render() {
    const { cartItems, removeFromCart } = this.props;

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
                          onClick={() => removeFromCart(item, i)}
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
