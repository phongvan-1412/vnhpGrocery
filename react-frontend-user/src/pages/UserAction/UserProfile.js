import React from "react";
import $ from "jquery";
import axios from "axios";
import ChangePassword from "./ChangePassword";
import EditProfile from "./EditProfile";

function UserProfile({ userinfo, updateUserLogin }) {
  let currentUserInfo = userinfo;
  if (performance.navigation.type === 1) {
    if (localStorage.getItem("customer_info") == null) {
      window.location.href = "http://localhost:3000/login";
    } else {
      currentUserInfo = JSON.parse(localStorage.getItem("customer_info"));
    }
  }

  const changePassword = () => {};

  const saveChanges = () => {
    const $result = $("#avatar-img-result");

    if ($("#user-avatar-img").prop("files")[0] == null) {
      $result.text("Please choose your avatar.");
      $result.css("color", "red");
      return;
    }
    const customerImage = $("#user-avatar-img").prop("files")[0];
    const customerImageName = customerImage.name;
    const index = customerImageName.indexOf(".");
    const img_extension = customerImageName.substr(index, index + 4);

    const customer_name = $("#fullname").val();
    const customer_email = $("#email").val();
    const customer_address = $("#address").val();
    const customer_contact = $("#contact").val();
    const customer_dob = $("#dateofbirth").val();

    let formData = new FormData();
    formData.set("user_avatar_image", customerImage);
    formData.set("img_extension", img_extension);
    formData.set("customer_name", customer_name);
    formData.set("customer_email", customer_email);
    formData.set("customer_address", customer_address);
    formData.set("customer_contact", customer_contact);
    formData.set("customer_dob", customer_dob);

    axios
      .post(`http://127.0.0.1:8000/api/customerupdateinfo`, formData)
      .then(function (response) {
        if (response.data == 0) {
          console.log("false");
        } else {
          localStorage.removeItem("customer_info");
          localStorage.setItem("customer_info", JSON.stringify(response.data));
          updateUserLogin();
          window.location.href = "http://localhost:3000";
        }
      });
  };

  function onAvatarChange() {
    const file = $("#user-avatar-img").prop("files")[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = function () {
      $("#avatar-img").prop("src", reader.result);
    };
  }

  return (
    <div className="container">
      <div className="row user-account-profile">
        <div className="card col-4 mb-2 mb-xl-0">
          <div className="card-header">
            <h4>Profile Picture</h4>
          </div>
          <div className="card-body text-center">
            <img
              className="img-user-account-profile rounded-circle mb-2"
              id="avatar-img"
              src={require(`../../../../LaravelAPI/public/UserImage/${currentUserInfo.customer_img_name}`)}
            />
            <div className="small font-italic text-muted mb-4">
              JPG or PNG no larger than 5 MB
            </div>
            <input type="file" id="user-avatar-img" onChange={onAvatarChange} />
            <div id="avatar-img-result"></div>
            <div className="card mt-3 change-password">
              <button
                type="button"
                class="btn btn-success"
                data-bs-toggle="modal"
                data-bs-target="#changepassword"
              >
                Change Password
              </button>
            </div>
          </div>
        </div>
        <div className="col-8" id="account-detail">
          <div className="card mb-4">
            <div className="card-header">
              <h4>Account Details</h4>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <label className="small mb-1" htmlFor="fullname">
                  Full name
                </label>
                <input
                  className="form-control"
                  id="fullname"
                  type="text"
                  disabled
                  value={currentUserInfo.customer_name}
                />
              </div>

              <div className="mb-3">
                <label className="small mb-1" htmlFor="email">
                  Email address
                </label>
                <input
                  className="form-control"
                  id="email"
                  disabled
                  value={currentUserInfo.customer_email}
                />
              </div>

              <div className="mb-3">
                <label className="small mb-1" htmlFor="address">
                  Address
                </label>
                <input
                  className="form-control"
                  id="address"
                  type="text"
                  disabled
                  value={currentUserInfo.customer_address}
                />
              </div>

              <div className="row gx-3 mb-3">
                <div className="col-md-6">
                  <label className="small mb-1" htmlFor="contact">
                    Phone number
                  </label>
                  <input
                    className="form-control"
                    id="contact"
                    type="tel"
                    disabled
                    value={currentUserInfo.customer_contact}
                  />
                </div>
                <div className="col-md-6">
                  <label className="small mb-1" htmlFor="dateofbirth">
                    Birthday
                  </label>
                  <input
                    className="form-control"
                    id="dateofbirth"
                    type="date"
                    disabled
                    value={currentUserInfo.customer_dob}
                  />
                </div>
              </div>

              <button
                type="button"
                class="btn btn-success"
                data-bs-toggle="modal"
                data-bs-target="#editprofile"
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
      <ChangePassword />
      <EditProfile />
    </div>
  );
}
export default UserProfile;
