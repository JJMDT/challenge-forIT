import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {ToastContainer, Zoom,Bounce, toast } from 'react-toastify';
import { Typography,Box,TextField,Button } from '@mui/material';
import './NewTask.css';
import 'react-toastify/dist/ReactToastify.css';



const NewTask = () => {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');

  const API =` ${import.meta.env.VITE_API_URL}`;
  const navigate = useNavigate();

  const redirect = () =>{
    navigate('/allTasks')
  }

  const handleSubmit = async (e)=> {
    e.preventDefault();

    const task = {
      title: taskTitle,
      description: taskDescription,
    }

    try {
      const response = await fetch(API,{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body: JSON.stringify(task)
      })

      const data = await response.json();
      if(response.ok){
        toast.success(data.message);
        setTaskTitle('');
        setTaskDescription('');
        
      }else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(data.message);
    }
    
  }
    return (
      <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 2, width: '500px' },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100vh',
      }}
      noValidate
      autoComplete="off"
    >
      <Typography variant="h4" gutterBottom>
        Create a new task
      </Typography>

      <TextField
        required
        id="outlined-title-input"
        label="Title"
        type="text"
        margin="dense"
        onChange={(e) => setTaskTitle(e.target.value)}
        value={taskTitle}
        autoFocus
      />
      <TextField
        required
        id="outlined-description-input"
        label="Description"
        multiline
          rows={4}
        type="text"
        margin="dense"
        onChange={(e) => setTaskDescription(e.target.value)}
        value={taskDescription}
      />
     

      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Create
      </Button>
      <ToastContainer
            position="bottom-right"
            autoClose={1000}
            hideProgressBar={false}
            closeOnClick={false}
            pauseOnHover={false}
            draggable={true}
            progress={undefined}
            theme="colored"
            transition={Bounce}
          />

    </Box>
    );
};

export default NewTask;
