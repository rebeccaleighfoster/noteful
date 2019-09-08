import React from "react";
//import DummyStore from "./DummyStore";
import { Link } from "react-router-dom";
import MyContext from "./Notes";

export default class Folders extends React.Component{
    render(){
    return(
    <MyContext.Consumer> 
     {context => (
           <div>
        {context.folders.map(folder => 
            <div key={folder.name}>
                <Link to={`/folder/${folder.id}`}>{folder.name}</Link>
                {context.notes.filter(note => note.folderId === folder.id).length}
            </div>
            )}
     </div>)}
    </MyContext.Consumer>
    )}
}