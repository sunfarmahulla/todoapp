import React, { Component } from 'react'
import { login } from './UserFunctions'
import { NotificationManager } from 'react-notifications';
import LoadingSpinner from '../LoadingSpinner';
class Login extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      emailError: "",
      passwordError: "",
      loading: '',

    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  validate = () => {
    let emailError = "";
    let passwordError = "";

    if (!this.state.email.includes('@')) {
      emailError = "invalid email";
    }
    if (!this.state.email) {
      emailError = "email can not be blank";
    }
    if (!this.state.password) {
      passwordError = "password can not be blank";
    }

    if (emailError || passwordError) {
      this.setState({ emailError, passwordError })
      return false;
    }

    return true;
  }
  onSubmit(e) {
    e.preventDefault()
    const isValid = this.validate();

    if (isValid) {
      this.setState({ loading: true });
      const user = {
        email: this.state.email,
        password: this.state.password
      }

      login(user).then(res => {
        if (res) {
          this.props.history.push(`/todo`)
          NotificationManager.success('Successfully Login', 'Successful!', 200);
          this.setState({ loading: false });
        } else {
          NotificationManager.error('Something occur error while login ', 'Error!');
          this.setState({ loading: false });

        }
      })
    }

  }

  render() {
    const loading = this.state.loading;
    return (
      <body className="body">
        <div className="container">
          <div className="row">
            <div className="col-md-6 mt-5 mx-auto">
              <div className="card">
                <div className="card-header">
                  <h3 className="h3 mb-3 font-weight-normal">Sign In</h3>
                </div>
                <div className="card-body">
                  <form noValidate onSubmit={this.onSubmit}>

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
                      {loading ? <LoadingSpinner /> : null}  Sign in
              </button>
                  </form>

                </div>
              </div>
            </div>
          </div>
        </div>
      </body>

    )
  }
}

export default Login