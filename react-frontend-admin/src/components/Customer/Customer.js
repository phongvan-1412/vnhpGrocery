import React, { Component } from "react";
import $ from "jquery";
import "../../css/customer.css";
import axios from "axios";
class Customer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      HistoryData: [],
      DetailAution: [],
      DetailPayment: [],
      CustomerPaginate: [],
      Customer: []
    };
  }
  componentDidMount() {
    fetch("http://127.0.0.1:8000/api/addcustomertable", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((response) => {
        this.setState({
          CustomerPaginate: response,
        });
      })
      .catch((err) => {
        console.log(err);
      });
    const self = this;
    axios
      .post(`http://127.0.0.1:8000/api/paginatecustomertable`, { paginate: 1 })
      .then(function (response) {
        self.setState({
          Customer: response.data,
          
        });
        console.log(response.data)
      });
    fetch("http://127.0.0.1:8000/api/customerhistorydata", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((response) => {
        this.setState({
          HistoryData: response,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    let i = 1;
    function Search() {
      var value = $("#searchcustomer").val().toLowerCase();
      $("#customerrecords tr").filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
      });
    }
    const onClick = (e) => {
      let history = [];
      let payment = [];
      this.state.HistoryData.forEach((historybidding) => {
        if (historybidding.customer_id == e.target.value) {
          history = [...history, historybidding];
          if (historybidding.aution_status == 1){
            payment = [...payment, historybidding];
          }
        }
      });
      this.setState({ DetailPayment: payment });
      this.setState({ DetailAution: history });
    };
    const onPaginate = (e) => {
      const self = this;
      axios
        .post(`http://127.0.0.1:8000/api/paginatecustomertable`, {
          paginate: e.target.value,
        })
        .then(function (response) {
          self.setState({
            Customer: response.data,
          });
        });
    };
    return (
      <div className="container-fluid">
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">Customer</h6>
          </div>
          <div className="card-body">
            <input
              className="form-control col-3 mb-3"
              id="searchcustomer"
              type="text"
              onKeyUp={Search}
              placeholder="Search.."
            />

            <div className="table-responsive">
              <table
                className="table table-bordered"
                id="dataTable"
                style={{ width: "100%" }}
                cellSpacing="0"
              >
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Customer</th>
                    <th>Email</th>
                    <th>Contact</th>
                    <th>Date of birth</th>
                    <th>Address</th>
                    <th>Total spending</th>
                    <th>View</th>
                  </tr>
                </thead>
                <tfoot>
                  <tr>
                    <th>#</th>
                    <th>Customer</th>
                    <th>Email</th>
                    <th>Contact</th>
                    <th>Date of birth</th>
                    <th>Address</th>
                    <th>Total spending</th>
                    <th>View</th>
                  </tr>
                </tfoot>
                <tbody id="customerrecords">
                  {this.state.Customer.map((p, index) => {
                    return (
                      <tr id="record-hover">
                        <td className="align-middle" key={index}>
                          {i++}
                        </td>
                        <td>
                          <img
                            width={"60px"}
                            className="mr-3"
                            src={
                              "http://localhost:8000/UserImage/" +
                              p.customer_img_name
                            }
                          ></img>
                          {p.customer_name}
                        </td>
                        <td className="align-middle">{p.customer_email}</td>
                        <td className="align-middle">{p.customer_contact}</td>
                        <td className="align-middle">{p.customer_dob}</td>
                        <td className="align-middle">{p.customer_address}</td>
                        <td className="align-middle">$ {parseInt(p.total_spending).toLocaleString()}</td>
                        <td className="align-middle">
                          <button 
                            className="btn text-light btn-hover color-8"
                            data-toggle="modal"
                            data-target=".bd-example-modal-lg"
                            onClick={onClick}
                            value={p.customer_id}>History
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
                {this.state.CustomerPaginate.map((paginate, index) => {
                  return (
                    <button className="btn btn-outline-dark align-center" key={index} value={paginate} onClick={onPaginate}>
                      {paginate}
                    </button>
                  );
                })}
                <div
                  className="modal fade bd-example-modal-lg"
                  tabIndex="-1"
                  role="dialog"
                  aria-labelledby="myLargeModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content">
                      <div className="card bg-light">
                        <div className="card-body">
                          <ul
                            className="nav nav-tabs text-center"
                            id="myTab"
                            role="tablist"
                          >
                            <li className="nav-item col-md-6">
                              <a
                                className="nav-link active"
                                id="home-tab"
                                data-toggle="tab"
                                href="#home"
                                role="tab"
                                aria-controls="home"
                                aria-selected="true"
                              >
                                Bidding history
                              </a>
                            </li>
                            <li className="nav-item col-md-6">
                              <a
                                className="nav-link"
                                id="profile-tab"
                                data-toggle="tab"
                                href="#profile"
                                role="tab"
                                aria-controls="profile"
                                aria-selected="false"
                              >
                                Payment history
                              </a>
                            </li>
                          </ul>
                          <div className="tab-content mt-3" id="myTabContent">
                            <div
                              className="tab-pane fade show active"
                              id="home"
                              role="tabpanel"
                              aria-labelledby="home-tab"
                            >
                              {this.state.DetailAution.map((h, index) => {
                                return(
                                  <div key={index} className="d-flex justify-content-start mb-4">
                                  <div className="img_cont_msg">
                                    <img
                                      src={"http://localhost:8000/ProductImg/" + h.product_thumbnail_img_name}
                                      className="img-fluid rounded-circle user_img_msg"
                                      width={60}
                                    />
                                  </div>
                                  <div className="border rounded  btn-hovol color-11 shadow p-3 ml-3 ">
                                    <strong>{h.customer_name ? h.customer_name.replace(/-/g, " "): null}</strong> auctioned the item <strong>{h.product_name ? h.product_name.replace(/-/g, " "): null}</strong> 
                                      in the <strong>{h.category_name ? h.category_name.replace(/-/g, " "): null}</strong> catefory for <strong>$ {parseInt(h.aution_price).toLocaleString()}</strong>
                                  </div>
                                </div>
                                )
                              })}
                            </div>
                            <div
                              className="row tab-pane fade"
                              id="profile"
                              role="tabpanel"
                              aria-labelledby="profile-tab"
                            >
                              {this.state.DetailPayment.map((h, index) => {
                                return(
                                  <div key={index} className="d-flex justify-content-start mb-4">
                                  <div className="img_cont_msg">
                                  <img
                                      src={"http://localhost:8000/ProductImg/" + h.product_thumbnail_img_name}
                                      className="img-fluid rounded-circle user_img_msg"
                                      width={60}
                                    />
                                  </div>
                                  <div style={{width: "100%"}} id="color-10" className="border rounded btn-hovol color-10 shadow p-3 ml-3 ">
                                    <strong>{h.customer_name ? h.customer_name.replace(/-/g, " "): null}</strong> got <strong>{h.product_name ? h.product_name.replace(/-/g, " "): null}</strong> for <strong>$ {parseInt(h.aution_price).toLocaleString()}</strong> at aution
                                  </div>                                
                                </div>
                                )
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Customer;
