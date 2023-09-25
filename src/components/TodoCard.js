import {Button, Card, CardActions, CardContent, Typography} from '@mui/material'
import React from 'react'


class TodoCard extends React.Component{
    render(){
        return(
            <Card variant="outlined" sx={{ minWidth: 275, m: 2, pb: 5 , position: 'relative' , backgroundColor: '#7D777D', color: '#FEDBFE '}}>
                <CardContent>
                <Typography sx={{ fontSize: 15 }} color="#FEDBFE" gutterBottom>
                    {this.props.todo.id}
                </Typography>
                <Typography variant="h5" component="div">
                    {this.props.todo.title}
                </Typography>
                <Typography variant="body2">
                    {this.props.todo.description}
                </Typography>
                </CardContent>
                <CardActions sx={{justifyContent: 'space-around', position: 'absolute', bottom: 0, display: 'flex', width: '250px'}}>
                <Button onClick={() => this.props.deleteTodo(this.props.todo.id)} variant='contained' color="error" size="small">DELETE</Button>
                <Button onClick={() => this.props.editTodo(this.props.todo)} color="warning" variant='contained' size="small">EDIT</Button>
                <Button onClick={() => this.props.toggleComplete(this.props.todo.id)} variant='contained' color={this.props.todo.isCompleted ? "success" : "secondary"} size="small">{this.props.todo.isCompleted ? "Completed" : "Incomplete"}</Button>
                </CardActions>
            </Card>
        )
    }
}
export default TodoCard