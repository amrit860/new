import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import notification from "./../../../utils/notification";
import "./login.component.css";
import { httpClient } from "../../../utils/httpclient";

export class LoginComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      data: {

      },
      error: {

      },
      issubmitting: false,
      isValiditing: false,
      remember_me: false
    };
  }
  //   

  handleChange = e => {
    let { type, name, value, checked } = e.target;
    if (type === "checkbox") {
      value = checked;
      this.rememberMe(value);
    }
    this.setState((preState) => ({
      data: {
        ...preState.data,
        [name]: value
      }

    }), () => {
      this.validateForm(name);

    })

  };
  rememberMe(val) {
    console.log("value>>", val);
    localStorage.setItem("remember_me", val);

  }
  validateForm(fieldName) {
    let errmsg;
    switch (fieldName) {
      case "username":
        errmsg = this.state[fieldName]
          ? ""
          : "username is required "

break;
      case "password":
        errmsg = this.state[fieldName]
          ? ""
          : "password is required"
        break;
      default:
        break;
    }
    this.setState((prevState) => ({
      error: {
        ...prevState.error,
        [fieldName]: errmsg
      }

    }))
  }

  handleSubmit = e => {
    e.preventDefault();
    this.setState({
      isSubmitting: true
    });
    // setTimeout(() => {
    //   this.setState({
    //     isSubmitting: false
    //   });
    //   this.props.history.push("/dashboard/amrit");
    // }, 2000);
httpClient.post(

      "/auth/login",
      this.state.data)
      .then(response => {
        notification.showSuccess(`welcome ${response.data.username}`)
        console.log("success in axios call>>", response);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        this.props.history.push("/dashboard");
      })
      .catch(err => {
        notification.handleError(err);
        console.log("error in axios call>>", err.response)
      })
      .finally(() => {
        this.setState({
          isSubmitting: false
        })
      })
  };


  render() {
    let btn = this.state.isSubmitting
      ?
      <button disabled={true} type="submit" className="wrapper" >
        Logging in
      </button>
      :
      <button type="submit" className="wrapper">
        login
        </button>


    return (
      <div className="loginbox">
        <h2>
        
          Login
        </h2>
      
        <form className="form-group" onSubmit={this.handleSubmit}>
          <label htmlFor="username">Username:</label>
          <input
            className="form-control"
            type="text"
            placeholder="username"
            name="username"
            onChange={this.handleChange}
          ></input>
          <p className="danger">{this.state.usernameErr}</p>
        
          <label htmlFor="password">Password:</label> <br></br>
          <input
            className="form-control"
            type="password"
            placeholder="password"
            name="password"
            onChange={this.handleChange}
          ></input>
          <p className="danger">{this.state.passwordErr}</p>

{/*          
          <input
            type="checkbox"
            name="remember_me"
            onChange={this.handleChange}
          ></input> */}
          <input type="checkbox" name="remember_me" onChange={this.handleChange}></input>
          <label>Remember Me</label>
          <br></br>
          {btn}
        </form>

        <p>
          {" "}
          Don't have an account?
          <Link to="/register">
            {" "}
            register
          </Link>
        </p>
        <Link to="/password.html">forgot password?</Link>
      </div>
    );
  }
}
