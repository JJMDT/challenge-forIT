import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, TextField, Typography, MenuItem, Button } from '@mui/material';
import {ToastContainer, Zoom,Bounce, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Item.css';

const ItemTask = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const API = `${import.meta.env.VITE_API_URL}/${id}`;

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await fetch(API);
        const data = await response.json();
        if (response.ok) {
          setTask(data.task);
        } else {
          setMessage(data.message);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchTask();
  }, [id]);

  if (!task) {
    return <p>Loading...</p>;
  }


  const handleToggleEdit = async () => {
    if(!editMode){
      setEditMode(true);
    } else{
      
      try{
        const response = await fetch(API, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: task.title,
            description: task.description,
            completed: task.completed,
          }),
        });
        const data = await response.json();
        if(response.ok){
          toast.success(data.message);
          setTask(data.task);
          setEditMode(false);
        } else {
          toast.error(data.message);
        }
      }catch (error) {
        toast.error(data.error);
      }
      
    }
  }

  const handleChange = (e) => {
    const {name,value} = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: name === "completed" ? value === "Completed" : value,
    }));
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
        Details of Task
      </Typography>
      <div className="nav">
        <Button variant="contained" size="small" onClick={() => navigate(-1)}>
          Back
        </Button>
      </div>

      <TextField
        name="title"
        label="Title"
        type="text"
        margin="dense"
        value={task.title}
        disabled = {!editMode}
        onChange={handleChange}
      />
      <TextField
        name="description"
        label="Description"
        multiline
        rows={4}
        type="text"
        margin="dense"
        value={task.description}
        disabled = {!editMode}
        onChange={handleChange}
      />
      <TextField
        label="Created At"
        type="text"
        margin="dense"
        value={`${task.createdAt}hs`}
        disabled 
      />
      <TextField
        select
        name="completed"
        value={task.completed ? "Completed" : "Pending"}
        margin="dense"
        label="Status"
        disabled = {!editMode}
        onChange={handleChange}
      >
        <MenuItem value="Completed">Completed</MenuItem>
        <MenuItem value="Pending">Pending</MenuItem>
      </TextField>

      <Button
        variant="contained"
        size="small"
        onClick={handleToggleEdit}
      >
        {editMode ? "save" : "edit"}
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

export default ItemTask;
