import React, { Component } from "react";
import "./Cart.css";
export default class Cart extends Component {
  render() {
    const { cartItems, removeFromCart } = this.props;
    console.log(cartItems);
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
                    <button className="btn btn-primary">Proceed</button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
}
