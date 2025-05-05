import { Routes, Route } from 'react-router-dom'
import React from 'react';
import './App.css';
import AllTasks from './components/AllTasks';
import Sidebar from './components/Sidebar';
import NewTask from './components/NewTask';
import ItemTask from './components/ItemTask';
import Home from './components/Home';


function App() {
  return (
    <div className="app-container">
        <Sidebar />
        <div className="main-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/allTasks" element={<AllTasks />} />
            <Route path="/newTask" element={<NewTask />} />
            <Route path="tasks/:id" element={<ItemTask />} />
          </Routes>
        </div>
      </div>
  );
}

export default App;
