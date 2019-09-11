import React from "react";
import DummyStore from "./DummyStore";
import moment from "moment"

const NoteInfo = props => {
    const noteId = props.match.params.noteId || null;
    const noteData = DummyStore.notes.find(note => note.id === noteId);
    return (
        <div className="d-flex">
            <div className="folders-pane">
            </div>
            <div className="notes-pane">
                <div>{noteData.name}</div>
                <div>{moment(noteData.modified)} ("MMM Do YY")}</div>
                <div>{noteData.content}</div>
            </div>
        </div>
    )
}

export default NoteInfo;