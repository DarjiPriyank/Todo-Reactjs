import React, { Component } from "react";

class TodoItem extends Component {
  getStyle = () => {
    return {
      textDecoration: this.props.todo.completed ? "Line-through" : "none",
    };
  };
  render() {
    console.log(this.props.todo)
    const { _id, todo } = this.props.todo;
    return (
      <table className="table">
        <tbody>
          <tr>
            <td className="text-left todo" style={this.getStyle()}>
              <input
                type="checkbox"
                onChange={this.props.markCompleted.bind(this, _id)}
                checked={this.props.todo.completed ? "checked" : ""}
              />{" "}
                {todo}
            </td>
            <td className="text-right">
              <button
                className="btn btn-danger"
                onClick={this.props.deleteTodo.bind(this, _id)}
              >
                X
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default TodoItem;
