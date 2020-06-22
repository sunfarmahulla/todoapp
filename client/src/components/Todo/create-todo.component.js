import React, { Component } from 'react';
import axios from 'axios';
import TodoList from './todo-list.component';
import { NotificationManager } from 'react-notifications';
import LoadingSpinner from '../../LoadingSpinner';

export default class CreateTodo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            discription: '',
            nameError: '',
            discriptionError: '',
            loading: '',
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
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

    onSubmit(e) {
        e.preventDefault()
        const isValid = this.validate();
        if (isValid) {
            this.setState({ loading: true });
            const TodoObject = {
                name: this.state.name,
                discription: this.state.discription,

            };

            axios.post('todo', TodoObject)
                .then(res => {
                    this.setState({ loading: false });

                    console.log(res.data);
                    NotificationManager.success('Successfully added task', 'Success', 200);
                }).catch(err => {
                    this.setState({ loading: true });

                    NotificationManager.error('Fail in added task', 'Fail');

                })

            this.setState({
                name: '',
                discription: '',

            });
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
                                    <h3 className="h3 mb-3 font-weight-normal">Create Tasks.</h3>
                                </div>
                                <div className="card-body">
                                    <form noValidate onSubmit={this.onSubmit}>

                                        <div className="form-group">
                                            <label htmlFor="name">Name of Task</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="name"
                                                placeholder="Enter name of task"
                                                value={this.state.email}
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
                        <div className="col-md-6">
                            <section className="tasktable">

                                <TodoList />
                            </section>
                        </div>
                    </div>
                </div>



            </body>



        );
    }
}


