
import React, { Component } from 'react'
import { register } from './UserFunctions'
import { NotificationManager } from 'react-notifications';
import LoadingSpinner from '../LoadingSpinner';
class Register extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      email: '',
      password: '',
      nameError: "",
      emailError: "",
      passwordError: "",
      loading:'',
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }


  validate = () => {
    let nameError = "";
    let emailError = "";
    let passwordError = "";

    if (!this.state.name) {
      nameError = "name can not be blank";
    }
    if (this.state.name < 2) {
      nameError = "name must be greater than 2 characters";
    }
    if (this.state.password < 5) {
      passwordError = "password must be greater than 5 characters";
    }
    if (!this.state.email) {
      emailError = "email can not be blank";
    }
    if (!this.state.password) {
      passwordError = "password can not be blank";
    }

    if (!this.state.email.includes('@')) {
      emailError = "invalid email";
    }
    if (emailError || nameError || passwordError) {
      this.setState({ emailError, nameError, passwordError });
      return false;
    }

    return true;

  }

  onSubmit(e) {
    e.preventDefault()
    const isValid = this.validate();
    if (isValid) {
      this.setState({loading:true});
      const newUser = {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password
      }

      register(newUser).then(res => {
        this.props.history.push(`/login`)
        NotificationManager.success('Successfully Login', 'Successful!', 200);
        this.setState({loading:false});
      }).catch(err=>{
        console.log(err);
        NotificationManager.error('Error while creating user , try with another email','Fail!');
        this.setState({loading:false});
      })

      
    }

  }

  render() {
    const loading = this.state.loading;
    return (
      
      <div className="container">
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            <div className="card">
              <div className="card-header">
                <h1 className="h3 mb-3 font-weight-normal">Register</h1>
              </div>
              <div className="card-body">
                <form noValidate onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <label htmlFor="name">name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      placeholder="Enter your first name"
                      value={this.state.name}
                      onChange={this.onChange}
                    />
                    <div style={{ fontSize: 12, color: "red" }}><center>{this.state.nameError}</center></div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      placeholder="Enter email"
                      value={this.state.email}
                      onChange={this.onChange}
                    />
                    <div style={{ fontSize: 12, color: "red" }}><center>{this.state.emailError}</center></div>

                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      placeholder="Password"
                      value={this.state.password}
                      onChange={this.onChange}
                    />
                    <div style={{ fontSize: 12, color: "red" }}><center>{this.state.passwordError}</center></div>

                  </div>
                  <button
                    type="submit"
                    className="btn btn-lg btn-primary btn-block"
                  >
                   {loading?<LoadingSpinner/>:null} Register!
              </button>
                </form>
              </div>

            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Register