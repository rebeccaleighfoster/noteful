import React from "react";
import DummyStore from "./DummyStore";
import { Link } from "react-router-dom";

const folders = props => {
    console.log(props);
    return(
        <>
        {DummyStore.folders.map(folder => 
            <div key={folder.name}>
                <Link to={`/folder/${folder.id}`}>{folder.name}</Link>
                {DummyStore.notes.filter(note => note.folderId === folder.id).length}
            </div>)}
        </>
  )
}

export default folders;