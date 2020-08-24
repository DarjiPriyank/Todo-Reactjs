import React, { Component } from "react";
import TodoItem from "./TodoItem";
import axios from "axios";

class Todos extends Component {
  render() {
    return (
      <div className="card-body">
        {this.props.todos.map((todo) => 
             <TodoItem key={todo._id} todo={todo} markCompleted={this.props.markCompleted} deleteTodo={this.props.deleteTodo}/> 
          )}
      </div>
    );
  }
}

export default Todos;