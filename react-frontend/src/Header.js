import React, { Component } from "react";
import { Link } from "react-router-dom";
import $ from "jquery";
import axios from "axios";
import Dropdown from "./DropdownNavBar/Dropdown";

class Header extends Component {
  state = {
    categories: [],
    categoriesRoot: [],
    drop: false,
  };

  async componentDidMount() {
    const res1 = await axios.get("http://127.0.0.1:8000/api/selectallcategory");
    this.setState({ categories: res1.data });
    const res2 = await axios.get(
      "http://127.0.0.1:8000/api/selectcategoryroot"
    );
    this.setState({ categoriesRoot: res2.data });
  }

  render() {
    return (
      <div
        className="header-menu"
        style={{
          height: "100px",
          display: "flex",
          justifyContent: "space-evenly",
        }}
      >
        <header className="menu">
          {/* <Link to="/" replace>
              <img
                src={require("../../img/Header/logo.jpg")}
                className="logo"
              />
            </Link> */}
          <Link to="/about" replace className="about">
            About
          </Link>
          {/* <Link to="/blog" replace className="blog">
              Blog
            </Link> */}
          <Link to="/contactus" replace className="contact">
            Contact
          </Link>
          <div
            style={{ height: "50px", marginTop: "57px" }}
            className="product"
            onMouseEnter={() => this.setState({ drop: true })}
            onMouseLeave={() => this.setState({ drop: false })}
          >
            <Link to="#" replace>
              Product
              <span>
                {this.state.drop ? (
                  <Dropdown
                    categoriesRoot={this.state.categoriesRoot}
                    categories={this.state.categories}
                  />
                ) : null}
              </span>
            </Link>
          </div>

          {/* <Link to="/shipping" replace className="shipping">
            Shipping
          </Link> */}
          <Link to="/term-and-policy" replace className="needhelp">
            Needhelp
          </Link>

          {/* {isCustomerLogin ? (
              <Link to="/customer" replace className="customer">
                Customer
              </Link>
            ) : (
              <div>
                <a href="http://127.0.0.1:8000/register">Register</a>
                <a href="http://127.0.0.1:8000/login">Login</a>
              </div>
            )} */}

          {/* <a href="https://www.facebook.com/" className="meta-facebook">
              <FaFacebook />
            </a>
            <a
              href="https://www.instagram.com/?hl=en"
              className="meta-instagram"
            >
              <FaInstagramSquare />
            </a>
            <a href="https://twitter.com/" className="meta-twitter">
              <FaTwitter />
            </a> */}
          {/* <Link to="#" className="nav-bag-container">
              <AiOutlineShoppingCart style={{ color: "white" }} />
              <div
                className="nav-bag-wrapper"
                onClick={() => setCartMini(!cartMini)}
              >
                <div className="bag-quantity">
                  <span
                    className="bag-quantity-content"
                    style={{ color: "white" }}
                  >
                    {itemsCount} items - {cartTotalPayment.toLocaleString()}đ
                  </span>
                </div>
                <div className="bag-price">
                  <span className="bag-price-content">
                    {cartMini && (
                      <QuickViewCartItems cart={cart} updateCart={updateCart} />
                    )}
                  </span>
                </div>
              </div>
            </Link> */}
        </header>
      </div>
    );
  }
}
export default Header;
