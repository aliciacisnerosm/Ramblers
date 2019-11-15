import React, { Component } from "react";
import firebase from "firebase";
import css from "../css/taskform.css";
//import { Link, BrowserRouter } from "react-router-dom";

class TaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskTitle: "",
      description: "",
      relatedRole: "",
      deadline: "",
      estimatedTime: "",
      userid: firebase.auth().currentUser.uid,
      team: "",
      company: "",
      createdBy: "",
      assignedTo: "",
      taskStatus: "",
      taskLink: ""
    };
  }

  componentDidMount = () => {
    var doc = firebase
      .firestore()
      .collection("User")
      .doc(this.state.userid);

    doc
      .get()
      .then(doc => {
        this.setState({
          company: doc.data().company,
          team: doc.data().team,
          createdBy: this.state.userid,
          taskStatus: "Help"
        });
      })
      .catch(function(error) {
        console.log("Error getting document:", error);
      });
  };

  changeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  submitHandler = event => {
    event.preventDefault();
    console.log(this.props);
    const {
      taskTitle,
      description,
      relatedRole,
      deadline,
      estimatedTime,
      company,
      team,
      createdBy,
      assignedTo,
      taskStatus,
      taskLink
    } = this.state;
    firebase
      .firestore()
      .collection("Task")
      .add({
        taskTitle,
        description,
        relatedRole,
        deadline,
        estimatedTime,
        company,
        team,
        createdBy,
        assignedTo,
        taskStatus,
        taskLink
      })
      .then(docRef => {
        this.setState({
          taskTitle: "",
          description: "",
          relatedRole: "",
          deadline: "",
          estimatedTime: "",
          company: "",
          team: "",
          createdBy: "",
          assignedTo: "",
          taskStatus: "",
          taskLink: ""
        });
        console.log(this.props);
        this.props.history.push("/Home");
      })
      .catch(error => {
        console.error("Error adding document: ", error);
      });
  };
  render() {
    return (
      <div className="task">
        <form onSubmit={this.submitHandler}>
          <label>Task</label>
          <br></br>
          <input type="text" name="taskTitle" onChange={this.changeHandler} />
          <br></br>
          <label>Description</label>
          <br></br>
          <input type="text" name="description" onChange={this.changeHandler} />
          <br></br>
          <label>Related Role</label>
          <br></br>
          <input type="text" name="relatedRole" onChange={this.changeHandler} />
          <br></br>
          <label>Deadline</label>
          <br></br>
          <input
            type="date"
            name="estimatedTime"
            onChange={this.changeHandler}
          />
          <br></br>
          <input type="text" name="deadline" onChange={this.changeHandler} />
          <br></br>
          <label>Link</label>
          <br></br>
          <input type="text" name="taskLink" onChange={this.changeHandler} />
          <br></br>
          <p>
            Created by
            <br></br>
            {this.state.userid}
          </p>
          <input
            name="submit"
            type="submit"
            value="Send the Help Request"
          ></input>
        </form>
      </div>
    );
  }
}
export default TaskForm;
