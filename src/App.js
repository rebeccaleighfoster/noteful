import React from 'react';
import Notes from './components/Notes'
import NoteInfo from "./components/NoteInfo"
import './App.css';
import MyContext from "./components/MyContext";
import DummyStore from "./components/DummyStore";
import { BrowserRouter as Router, Route, } from "react-router-dom";

function App() {
  return (
    <MyContext.Provider value={{ DummyStore }}>
      <Router>
      <Route path="/" exact component={Notes} />
      <Route path="/folder/:id" exact component={Notes} />
      <Route path="/note/:noteId" exact component={NoteInfo} />
    </Router>
  </MyContext.Provider>
  );
}

export default App;
