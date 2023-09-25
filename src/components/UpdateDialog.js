import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import React from 'react'

class UpdateDialog extends React.Component{
    render(){
        return(
            <Dialog fullWidth open={this.props.todo.id !== null}>
                <DialogTitle>Edit Todo ({this.props.todo.id})</DialogTitle>
                <DialogContent>
                    <Box id="update-form" sx={{p: 2}}>
                        <Box sx={{p: 2}}>
                        <TextField onChange={this.props.titleChange} value={this.props.todo.title} fullWidth variant="outlined" label="Title" />
                        </Box>
                        <Box sx={{px: 2}}>
                        <TextField onChange={this.props.descriptionChange} value={this.props.todo.description} fullWidth variant="outlined" label="Description" multiline maxRows={6}/>
                        </Box>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.editDialogClose}>Close</Button>
                    <Button onClick={this.props.editUpdatebtn} color="warning">Update</Button>
                </DialogActions>
            </Dialog>
        )
    }
}
export default UpdateDialog