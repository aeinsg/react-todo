import logo from './logo.svg';
import './App.css';
import React from 'react'
import { Box, Button, TextField, Card, CardContent, CardActions, Typography, Grid } from '@mui/material'
import { toast } from 'react-toastify'
import UpdateDialog from './components/UpdateDialog'
import TodoCard from './components/TodoCard'


class App extends React.Component{
  state = {
    showForm : false,
    todos: [],
    todo: {
      id: null,
      title: '',
      description: '',
      
    }
  }
  toggleShowForm = () => {
    this.setState({
      showForm: !this.state.showForm
    })
  }
  titleChange = e =>{
    if(e.target.value.length <= 32){
      this.setState({
        todo: {...this.state.todo, title: e.target.value}
      })
    }
  }
  descriptionChange = e =>{
    this.setState({
      todo: {...this.state.todo, description: e.target.value}
    })
  }
  todoCreate = () => {
    if(this.state.todo.title.length === 0 || this.state.todo.description.length === 0){
      toast.warn('Incorrect input, please try again!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
    }
  else{
    const date = new Date()
    const todo = {
      id: date.getUTCFullYear().toString() + date.getUTCMonth().toString() + date.getUTCDate().toString() + date.getUTCDay().toString() + date.getUTCHours().toString() + date.getUTCMinutes().toString() + date.getUTCSeconds().toString() + date.getUTCMilliseconds().toString(),
      title: this.state.todo.title,
      description: this.state.todo.description,
      isCompleted: false,
    }
    const todos = [...this.state.todos]
    todos.push(todo)
    this.setState({
      todos,
      todo: {
        id: null,
        title: '',
        description: '',
      }
    })
    toast.success('Todo has been created!', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
    }
  }
  toggleComplete = id => {
    const todos =[...this.state.todos]
    todos.map(todo => {
      if(todo.id.toString() === id.toString()){
        todo.isCompleted = !todo.isCompleted
      }
      return todo
    })
    this.setState({todos})
  }
  deleteTodo = id => {
    const todos = [...this.state.todos]
    this.setState({
      todos: todos.filter(todo => todo.id.toString() !== id.toString())
    })
  }
  editTodo = id => {
    this.setState({todo: {...this.state.todo, id}})
  }
  editDialogClose = () => {
    this.setState({todo: {
      id: null,
      title: '',
      description: ''
    }})
  }
  editUpdatebtn = () => {
    const tempTodo = [...this.state.todos]
    tempTodo.map(todo => {
      if(todo.id.toString() === this.state.todo.id.toString()){
        todo.title = this.state.todo.title
        todo.description = this.state.todo.description
      }
      return todo
    })
    this.setState({todos: tempTodo})
    this.editDialogClose()
  }
  componentDidMount(){
    this.setState({todos:  JSON.parse(localStorage.getItem('todos')) ?? []})
  }
  componentDidUpdate(prevProps, prevState){
    if(prevState.todos !== this.state.todos){
      localStorage.setItem('todos', JSON.stringify(this.state.todos))
    }
  }
  render(){
    return(
    <Box className="App">
      <UpdateDialog 
        todo={this.state.todo}
        editDialogClose={this.editDialogClose}
        titleChange={this.titleChange}
        descriptionChange={this.descriptionChange}
        editUpdatebtn={this.editUpdatebtn}
      />
        <Box style={{textAlign: 'center', marginTop: '5rem'}}>
          <Button onClick={this.toggleShowForm} variant="contained" color="secondary">
            { this.state.showForm ? "Hide" : "Show" } Form
          </Button>
          {
            this.state.showForm ?
              <Box id="create-form" sx={{p: 5}}>
                <Box sx={{p: 2}}>
                  <TextField onChange={this.titleChange} value={this.state.todo.title} fullWidth variant="outlined" label="Title" />
                </Box>
                <Box sx={{px: 2}}>
                  <TextField onChange={this.descriptionChange} value={this.state.todo.description} fullWidth variant="outlined" label="Description" multiline maxRows={6}/>
                </Box>
                <Box sx={{mt: 2}}>
                  <Button onClick={this.todoCreate} variant="contained" color="success">Create Todo</Button>
                </Box>
              </Box>
            :
              null
          }
        </Box>
        {
          !this.state.showForm ?
            <Box sx={{ textAlign: 'center', mt: 5 }}>
              <h3>Your list of Todos: </h3>
              <Grid container id="todo-list">
                  {
                    this.state.todos.map((todo) => (
                      <Grid item key={todo.id} sx={{maxWidth: '300px', p:2}}>
                        <TodoCard 
                          todo={todo}
                          deleteTodo={this.deleteTodo}
                          editTodo={this.editTodo}
                          toggleComplete={this.toggleComplete}
                        />
                      </Grid>
                    ))
                  }
              </Grid>
            </Box>
          : null
        }
      </Box>
    )
  }
}

export default App;
