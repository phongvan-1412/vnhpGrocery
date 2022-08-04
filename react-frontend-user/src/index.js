import React, { Component } from "react";
import reportWebVitals from "./reportWebVitals";
import ReactDOM from "react-dom/client";
import $ from "jquery";

import { BrowserRouter, Router, Routes, Route } from "react-router-dom";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
//Header
import Header from "./layout/Header/Header";
//Side Pages
import About from "./pages/AboutUs/About";
import Contact from "./pages/Contact/Contact";
//Product
import LandingPage from "./pages/LandingPageSlider/LandingPage";
import ProductByCategory from "./pages/Products/ProductByCategory/ProductByCategory";
import ProductDetail from "./pages/Products/ProductDetail/ProductDetail";
// UserAction
import Login from "./pages/UserAction/Login";
import Register from "./pages/UserAction/Register";
import ForgetPassword from "./pages/UserAction/ForgetPassword";
import UserProfile from "./pages/UserAction/UserProfile";
import PayPals from "./pages/Payment/PayPals";
//Footer
import Footer from "./layout/Footer";

class HomePage extends Component {
  state = {
    products: [],
    categories: [],
    customers: [],
    userinfo: {},
    autionHistory: [],
    feedbacks: [],
    hotAuctionProducts: [],
  };

  componentDidMount() {
    fetch("http://127.0.0.1:8000/api/selectallproducts", { method: "GET" })
      .then((products) => products.json())
      .then((products) => {
        this.setState({ products: products });
      })
      .catch((err) => {
        console.log(err);
      });

    fetch("http://127.0.0.1:8000/api/selectcategories", { method: "GET" })
      .then((categories) => categories.json())
      .then((categories) => {
        this.setState({ categories: categories });
      })
      .catch((err) => {
        console.log(err);
      });

    fetch("http://127.0.0.1:8000/api/customerautionhistory", { method: "GET" })
      .then((ah) => ah.json())
      .then((ah) => {
        this.setState({ autionHistory: ah });
      })
      .catch((err) => {
        console.log(err);
      });

    fetch("http://127.0.0.1:8000/api/customerbillhistory", { method: "GET" })
      .then((bh) => bh.json())
      .then((bh) => {
        this.setState({ billHistory: bh });
      })
      .catch((err) => {
        console.log(err);
      });

    fetch("http://127.0.0.1:8000/api/showcomment", { method: "GET" })
      .then((feedbacks) => feedbacks.json())
      .then((feedbacks) => {
        this.setState({ feedbacks: feedbacks });
      })
      .catch((err) => {
        console.log(err);
      });
    this.setState({
      userinfo: JSON.parse(localStorage.getItem("customer_info")),
    });

    fetch("http://127.0.0.1:8000/api/hotauctionproducts", { method: "GET" })
      .then((response) => response.json())
      .then((response) => {
        this.setState({ hotAuctionProducts: response });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const customerLogin = () => {
      this.setState({
        userinfo: JSON.parse(localStorage.getItem("customer_info")),
      });
    };

    const hotAuctionProducts = () => {
      fetch("http://127.0.0.1:8000/api/hotauctionproducts", { method: "GET" })
        .then((response) => response.json())
        .then((response) => {
          this.setState({ hotAuctionProducts: response });
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const autionHistory = () => {
      fetch("http://127.0.0.1:8000/api/customerautionhistory", {
        method: "GET",
      })
        .then((response) => response.json())
        .then((response) => {
          this.setState({ autionHistory: response });
        })
        .catch((err) => {
          console.log(err);
        });
    };
    

    return (
      <div>
        <div id="data" hidden></div>

        {/* Header  */}
        <Header categories={this.state.categories} />

        <Routes>
          <Route path="/*/reload" component={null} />
          <Route path="/about" element={<About />}></Route>
          <Route path="/contactus" element={<Contact />}></Route>

          {/* UserAction  */}
          <Route
            path="/login"
            element={<Login customerLogin={customerLogin} />}
          ></Route>

          <Route path="/register" element={<Register />}></Route>

          <Route
            path="/userprofile"
            element={
              <UserProfile
                userinfo={this.state.userinfo}
                autionHistory={this.state.autionHistory}
                billHistory={this.state.billHistory}
                newBill={this.state.newBill}
                updateAutionHistory={autionHistory}
                updateBillHistory={billHistory}
                updateNewBill={newBill}
                updateUserLogin={customerLogin}
              />
            }
          ></Route>

          <Route
            path="/forgetpassword"
            element={
              <ForgetPassword
                style={{ backgroundImage: "url(../../img/About/about2.jpg)" }}
                userinfo={this.state.userinfo}
              />
            }
          ></Route>

          {/* <Route path="/paymentgateway" element={ <PayPals />}></Route> */}
          <Route
            path="/paymentgateway/:billid/:customerid"
            element={<PayPals newBill={newBill}/>}
          ></Route>

          {/* <Route path="/term-and-policy" element={<TermAndPolicy />}></Route>  */}

          {/* LandingPage  */}
          <Route
            path="/"
            element={
              <LandingPage
                hotAuctionProducts={this.state.hotAuctionProducts}
                categories={this.state.categories}
              />
            }
          ></Route>

          {/* Product */}
          {this.state.categories.map((category) => (
            <Route
              key={category.category_id}
              path={`/category/${category.category_name}`}
              element={
                <ProductByCategory
                  products={this.state.products}
                  category={category}
                  categories={this.state.categories}
                />
              }
            ></Route>
          ))}

          {/* Product Detail   */}
          {this.state.products.map((product) => (
            <Route
              key={product.product_id}
              path={`/${product.category_id}/${product.product_name}`}
              element={
                <ProductDetail
                  products={this.state.products}
                  categories={this.state.categories}
                  product={product}
                  feedbacks={this.state.feedbacks}
                />
              }
            ></Route>
          ))}

          {/* Product Detail   */}
          {this.state.products.map((product) => (
            <Route
              key={product.product_id}
              path={`/${product.category_id}/${product.product_name}`}
              element={
                <ProductDetail
                  products={this.state.products}
                  categories={this.state.categories}
                  product={product}
                />
              }
            ></Route>
          ))}
        </Routes>

        {/* Footer  */}
        <Footer />
      </div>
    );
  }
}

export default HomePage;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <BrowserRouter>
      <HomePage style={{ padding: "0px", margin: "0px" }} />
    </BrowserRouter>
);

reportWebVitals();
