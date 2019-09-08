import React from 'react';
import DummyStore from "./DummyStore";
import Folders from "./Folders";
import { Link } from "react-router-dom";
import MyContext from "./MyContext"



export default class Notes extends React.Component{
    filterByFolderId = (folderId) => {
        return DummyStore.notes.map(note => {
            if (note.folderId === folderId){
                return <div> <Link to={`/note/${note.id}`} key ={note.id}> {note.name} </Link> </div>;
            }
            return null;
        })
    }
render(){
        const folderId = this.props.match.params.id || null;
        return(
        <MyContext.Consumer>
        {context => (
            <div className="d-flex">
                <div className="folders-pane">
                    <Folders />
                    <div className="notes-pane">
                        {folderId ? (<div>
                            {this.filterByFolderId(context.notes)}
                            </div>) : context.notes.map(note => <div> <Link to={`/note/${note.id}`} key={note.id}> {note.name}</Link></div>)}
                    </div>
                </div>
                </div>)}
            </MyContext.Consumer>
        )
    }
}