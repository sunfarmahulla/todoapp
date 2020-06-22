import React, { Component } from "react";
import axios from 'axios';
import { NotificationManager } from 'react-notifications';
import LoadingSpinner from '../../LoadingSpinner';

export default class EditTodo extends Component {

  constructor(props) {
    super(props)

    this.onChange = this.onChange.bind(this)

    this.onSubmit = this.onSubmit.bind(this);

    // State
    this.state = {
      name: '',
      discription: '',
      nameError: '',
      discriptionError: '',
      loading: '',

    }
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
}
  validate = () => {
    let nameError = '';
    let discriptionError = '';
    if (!this.state.name) {
      nameError = "Name of task is required";
    }
    if (!this.state.discription) {
      discriptionError = "Discription of task is required";
    }
    if (this.state.name < 2) {
      nameError = "Name of task must be greater than 2 characters";
    }
    if (this.state.discription < 2) {
      discriptionError = "Discription of task must be greater than 2 characters";
    }

    if (nameError || discriptionError) {
      this.setState({ nameError, discriptionError })
      return false;
    }
    return true;
  }

  componentDidMount() {
    axios.get('todo/' + this.props.match.params.id)
      .then(res => {
        this.setState({
          name: res.data.name,
          discription: res.data.discription,

        });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  onSubmit(e) {
    e.preventDefault()
    const isValid = this.validate();

    if (isValid) {
      this.setState({loading: true});

      const studentObject = {
        name: this.state.name,
        discription: this.state.discription,

      };

      axios.put('todo/' + this.props.match.params.id, studentObject)
        .then((res) => {
          console.log(res.data)
          console.log('todo successfully updated')
          NotificationManager.success('successfully updated data','Success', 200);
          this.setState({loading: false});
        }).catch((error) => {
          console.log(error)
          NotificationManager.error('failed in updating','Fail');
          this.setState({loading: false});
        })

      // Redirect to Student List 
      this.props.history.push('/todo-list')
    }

  }


  render() {
    const loading = this.setState.loading;
    return (<body className="body">
      <div className="container">
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            <div className="card">
              <div className="card-header">
                <h3 className="h3 mb-3 font-weight-normal">Create Tasks</h3>
              </div>
              <div className="card-body">
                <form  onSubmit={this.onSubmit}>

                  <div className="form-group">
                    <label htmlFor="name">Name of Task</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      placeholder="Enter name of task"
                      value={this.state.name}
                      onChange={this.onChange}
                    />
                    <div style={{ fontSize: 12, color: "red" }}><center>{this.state.nameError}</center></div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="text">Discription</label>
                    <textarea
                      type="text"
                      className="form-control"
                      name="discription"
                      placeholder="Enter discription about tasks"
                      value={this.state.discription}
                      onChange={this.onChange}
                    />
                    <div style={{ fontSize: 12, color: "red" }}><center>{this.state.discriptionError}</center></div>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-lg btn-info btn-block"
                  >
                     {loading ? <LoadingSpinner /> : null} Sign in
                  </button>
                </form>

              </div>
            </div>
          </div>
        </div>
      </div>


    </body>);
  }
}
