import React from 'react';
import Notes from './components/Notes'
import NoteInfo from "./components/NoteInfo"
import './App.css';
import { BrowserRouter as Router, Route, } from "react-router-dom";

function App() {
  return (
    <Router>
      <Route path="/" exact component={Notes} />
      <Route path="/folder/:id" exact component={Notes} />
      <Route path="/note/:noteId" exact component={NoteInfo} />
    </Router>
  );
}

export default App;
