
import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Landing from './components/Landing'
import Login from './components/Login'
import Register from './components/Register'
import CreateTodo from './components/Todo/create-todo.component';
import TodoList from './components/Todo/todo-list.component.js';
import EditTodo from './components/Todo/edit-todo.component';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer } from 'react-notifications';
class App extends Component {
  
  render() {
    
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Landing} />
          <div className="container">
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/todo" component={CreateTodo} />
            <Route exact path="/todo-list" component={TodoList} />
            <Route exact path="/edit-todo/:id" component={EditTodo} />
            <NotificationContainer/>
          </div>
        </div>
      </Router>
    )
  }
}

export default App