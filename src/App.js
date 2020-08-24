import React from "react";
import "./App.css";
import AddTodo from "./components/AddTodo";
import Todos from "./components/Todos";
import axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [],
    };
  }
  componentDidMount() {
    console.log("component");
    axios.get("/todo/").then((res) => {
      this.setState({ todos: res.data });
      // this.setState({todos: [...this.state.todos ,res.data]})
    });
  }
  onChange = (e) => this.setState({ [e.target.name]: e.target.value });
  onSubmit = (e) => {
    console.log(e)
    e.preventDefault();
    const todo = this.state;
    axios.post("/todo/create", todo).then((res) => {
      this.setState({ todos: [...this.state.todos, res.data] });
      console.log(res);
    });
    document.querySelector("input").value="";
  };

  markCompleted = (id) => {
    this.setState({
      todos: this.state.todos.map((todo) => {
        if (todo._id === id) {
          todo.completed = !todo.completed;
          console.log(todo.completed);
          axios.put('/todo/edit/'+id, todo)
          .then((result) => {
            console.log(result);
        });
        }
        console.log(todo)
       
        return todo;
       
      }),
    });
    
  };
  deleteTodo = (id) => {
    console.log(id);

    axios.delete("/todo/delete/" + id).then((res) => {
      console.log(res);
      this.setState({
        todos: [...this.state.todos.filter((todo) => todo._id !== id)],
      });
    });
  };

  render() {
    return (
      <div className="container row  d-flex justify-content-center">
        <div className="col-md-6" style={{ paddingTop: "10px" }}>
          <div className="card">
            <div className="card-header">
              <h2>TODO List</h2>
              <form onSubmit={this.onSubmit}>
                <input type="text" onChange={this.onChange} name="todo" />
                <button className="btn btn-primary" style={{ marginLeft: 30 }}>
                  Add
                </button>
              </form>
            </div>
            <Todos
              markCompleted={this.markCompleted}
              deleteTodo={this.deleteTodo}
              todos={this.state.todos}
            />
          </div>
        </div>
        {/* <div className="col-md-3"></div> */}
      </div>
    );
  }
}

export default App;
