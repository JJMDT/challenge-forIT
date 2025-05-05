import React from "react";
import { NavLink } from "react-router-dom";
import { Typography } from "@mui/material";

import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <NavLink to="/" style={{ textDecoration: "none" }}>
        <Typography
          variant="h4"
          style={{
            color: "#1976d2",
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          TasksApp
        </Typography>
      </NavLink>
      <nav className="nav-menu">
        <ul>
          <li>
            <NavLink
              to="/newTask"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              <span className="nav-text">New Task</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/allTasks"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              <span className="nav-text">All Tasks</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
