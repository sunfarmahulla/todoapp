import React, { Component } from "react";
import axios from 'axios';
import TodoTableRow from './TodoTableRow';
import LoadingSpinner from '../../LoadingSpinner';
import { NotificationManager } from 'react-notifications';

export default class TodoList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      students: []
    };
  }

  componentDidMount() {
    axios.get('todo')
      .then(res => {
        this.setState({
          students: res.data,
          loading: false

        });
      })
      .catch((error) => {
        console.log(error);
        NotificationManager.error('Error while fetching data', 'Fail');
      })
  }

  DataTable() {
    return this.state.students.map((res, i) => {
      return <TodoTableRow obj={res} key={i} />;
    });
  }


  render() {
    const loading = this.state.loading;
    return (<section>
      <section className="alert alert-success">
        <center><h3>Todo Tasks List</h3></center>
      </section>

      <table className="table table-bordered table-hover">
        <thead className="thead-dark">
          <tr>
            <th>Name</th>
            <th>Discription</th>
            <th>Action</th>
          </tr>
        </thead>
        {loading ? <LoadingSpinner /> :
          <tbody>
            {this.DataTable()}
          </tbody>
            }
      </table>

    </section>);
  }
}