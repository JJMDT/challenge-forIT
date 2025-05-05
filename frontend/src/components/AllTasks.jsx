import React, { useState, useEffect } from "react";
import "./AllTasks.css";
import { Typography,InputLabel,MenuItem,FormControl,Select,Button,Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import {ToastContainer, Zoom,Bounce, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AllTasks = () => {
  const navigate = useNavigate();
  const API = `${import.meta.env.VITE_API_URL}`;
  const [tasks, setTasks] = useState([]);
  const [message, setMessage] = useState("");
  const [status, setStatus] = React.useState("all");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(API, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (response.ok) {
          setTasks(data.tasks);
        } else {
          setMessage(data.message);
        }
      } catch (error) {
        setMessage(data.error);
      }
    };

    fetchTasks();
  }, []);

  const changeStatus = async (id) => {
    const updateTask = tasks.find((task) => task.id === id);

    try {
      const response = await fetch(`${API}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          completed: !updateTask.completed,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        toast.dark(data.message);
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === id ? { ...task, completed: !task.completed } : task
          )
        );
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const filterStatus = (event) => {
    setStatus(event.target.value);
  };

  const redirect = ()=>{
    navigate("/itemTask");
  }

  const filterStatusTasks = tasks.filter((task) => {
    if (status === "all") {
      return task;
    } else if (status === "pending") {
      return !task.completed;
    } else if (status === "completed") {
      return task.completed;
    }
    return false;
  });

  const deleteTask = async (taskId) => {
    try {
      const response = await fetch(`${API}/${taskId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.ok) {
        toast.error(data.message);
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Error", error);
    }
  };


  return (
    <div className="container">
      <Typography variant="h4" align="center" gutterBottom>
        Tasks List
      </Typography>

      <div className="status">
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="demo-select-small-label">Filter by status</InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={status}
            label="Filter by status"
            onChange={filterStatus}
          >
            <MenuItem value=""></MenuItem>
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
          </Select>
        </FormControl>
        <p>Tasks Pending: {tasks.filter((task) => !task.completed).length}</p>
        <p>Tasks Completed: {tasks.filter((task) => task.completed).length}</p>
      </div>
      <Divider orientation="horizontal" flexItem style={{ margin: "10px" }} />

      {status === "pending" && filterStatusTasks.length === 0 && (
        <Typography variant="h6" align="center" gutterBottom>
          No pending tasks found.
        </Typography>
      )}

      {status === "completed" && filterStatusTasks.length === 0 && (
        <Typography variant="h6" align="center" gutterBottom>
          No completed tasks found.
        </Typography>
      )}

      {status === "all" && filterStatusTasks.length === 0 && (
        <Typography variant="h6" align="center" gutterBottom>
          No tasks
        </Typography>
      )}

      {filterStatusTasks.map((task) => (
        <div className="task-list" key={task.id}>
          <div className="task">
            <div className="task-details"   onClick={() => navigate(`/tasks/${task.id}`)}
              style={{ cursor: "pointer" }}>

            {/* <label>ID: {task.id} </label> */}
            <label>
              Title: {task.title}
            </label>
            <label>{task.createdAt}</label>
            <label>Status: {task.completed ? "Completed" : "Pending"} </label>
            </div>

            <div className="btnAction">
              <Button
                variant="text"
                color="default"
                size="small"
                onClick={() => changeStatus(task.id)}
                className={!task.completed ? "pendiente" : "completed"}
                style={{
                  margin: "0 5px",
                }}
              >
                {!task.completed ? "Pending..." : "Completed"}
              </Button>

              <Button
                variant="contained"
                size="small"
                onClick={() => deleteTask(task.id)}
                className="btnDelete"
              >
                <DeleteIcon fontSize="small" /> Delete
              </Button>
            </div>
          </div>
        </div>
      ))}
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
            limit={5}
          />
    </div>
  );
};

export default AllTasks;
