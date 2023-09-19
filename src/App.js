import logo from './logo.svg';
import './App.css';
import React from 'react'
import { Box, Button, TextField, Card, CardContent, CardActions, Typography, Grid } from '@mui/material'
import { toast } from 'react-toastify'



class App extends React.Component{
  state = {
    showForm : false,
    todos: [],
    todo: {
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

  }
  deleteTodo = id => {
    
  }
  render(){
    return(
    <Box className="App">
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
                        <Card variant="outlined" sx={{ minWidth: 275, m: 2, pb: 5 , position: 'relative' , backgroundColor: '#7D777D', color: '#FEDBFE '}}>
                          <CardContent>
                            <Typography sx={{ fontSize: 15 }} color="#FEDBFE" gutterBottom>
                              {todo.id}
                            </Typography>
                            <Typography variant="h5" component="div">
                              {todo.title}
                            </Typography>
                            <Typography variant="body2">
                              {todo.description}
                            </Typography>
                          </CardContent>
                          <CardActions sx={{justifyContent: 'space-around', position: 'absolute', bottom: 0, display: 'flex', width: '250px'}}>
                            <Button onClick={() => this.deleteTodo(todo.id)} variant='contained' color="error" size="small">DELETE</Button>
                            <Button color="warning" variant='contained' size="small">EDIT</Button>
                            <Button onClick={() => this.toggleComplete(todo.id)} variant='contained' color={todo.isCompleted ? "success" : "secondary"} size="small">{todo.isCompleted ? "Completed" : "Incomplete"}</Button>
                          </CardActions>
                        </Card>
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
