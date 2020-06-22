 
import React, { Component } from 'react'
import { Link, withRouter} from 'react-router-dom'

class Landing extends Component {
  logOut(e) {
    e.preventDefault()
    localStorage.removeItem('usertoken')
    this.props.history.push(`/`)
  }

  render() {
   
    const loginRegLink = (
      <ul className="navbar-nav ml-auto right">
        <li className="nav-item">
          <Link to="/login" className="nav-link">
            Login
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/register" className="nav-link">
            Register
          </Link>
        </li>
        <li className="nav-item">
          
          <Link to={"/todo"} style={{color:"red"}} className="nav-link">
            Todo
          </Link>
        </li>
      </ul>
    )

    const userLink = (
      <ul className="navbar-nav ml-auto right">
        <li className="nav-item">
          
          <Link to={"/todo"} className="nav-link">
            Todo
          </Link>
        </li>
        <li className="nav-item">
          <Link to={"/todo-list"} className="nav-link">
            TodoList
          </Link>
        </li>
        <li className="nav-item">
          <a href="" onClick={this.logOut.bind(this)} className="nav-link">
            Logout
          </a>
        </li>
      </ul>
    )

    return (
      <nav className="navbar fixed navbar-expand-lg navbar-dark bg-white">
         <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
          </ul>
        <button
          className=" btn  navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarsExample10"
          aria-controls="navbarsExample10"
          aria-expanded="false"
          aria-label="Toggle navigation"
          style={{background: 'red'}}
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div
          className="collapse navbar-collapse "
          id="navbarsExample10"
        >
         
          {localStorage.usertoken ? userLink : loginRegLink}
        </div>
      </nav>
    )
  }
}

export default withRouter(Landing)