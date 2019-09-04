import React from 'react';
import DummyStore from "./DummyStore";
import Folders from "./Folders";
import { Link } from "react-router-dom";

export default class Notes extends React.Component{
    constructor(props){
        super();
        this.state = {
            notes: DummyStore.notes
        }
    }

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
            <div className="d-flex">
                <div className="folders-pane">
                    <Folders />
                    <div className="notes-pane">
                        {folderId ? (<div>
                            {this.filterByFolderId(folderId)}
                            </div>) : this.state.notes.map(note => <div> <Link to={`/note/${note.id}`} key={note.id}> {note.name}</Link></div>)}
                    </div>
                </div>
            </div>
        )
    }
}