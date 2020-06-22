import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import LoadingSpinner from '../../LoadingSpinner';
import { NotificationManager } from 'react-notifications';

export default class TodoTableRow extends Component {

    constructor(props) {
        super(props);
        this.state={
            loading:''
        }
        this.deleteTodo = this.deleteTodo.bind(this);
    }

    deleteTodo() {
        axios.delete('todo/' + this.props.obj._id)
            .then((res) => {
                this.setState({loading: false});
                console.log('Todo successfully deleted!')
                NotificationManager.success('Todo successfully deleted', 'Success', 200);
            }).catch((error) => {
                this.setState({loading: false});
                console.log(error)
                NotificationManager.error('Error while deleting!', 'Fail');

            })
    }

    render() {
        const loading = this.state.loading;
        return (
            <tr className="table-primary">
               
                <td>{this.props.obj.name}</td>
                <td>{this.props.obj.discription}</td>
                
                <td>
                    <Link className="edit-link" to={"/edit-todo/" + this.props.obj._id}>
                        <i className="fa fa-edit"></i>
                    </Link>
                    &nbsp;&nbsp;
                    {loading?<LoadingSpinner/>:null}
                    <Button onClick={this.deleteTodo} size="sm" variant="danger">Delete</Button>
                    
                </td>
            </tr>
        );
    }
}