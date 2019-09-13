import React from "react";
import MyContext from "./MyContext";

export default class Folders extends React.Component {

  addFolder = () => {
    const { folders } = this.state;
    folders.push({
      id: "b07162f0-ffaf-11e8-8233223322eb2-f2801f1b9fd1",
      name: "My new folder"
    });
    this.setState({
      folders
    });
  };

  handleFolderDelete = folderId = e => {
    e.preventDefault();
    const folderId = this.props.id;
    console.log(this.state)
    console.log(this.props)

    fetch(`http://localhost:9090/folders/${folderId}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json"
      }
    })
      .then(res => {
        if (!res.ok) return res.json().then(e => Promise.reject(e));
        return res.json();
      })
      .catch(error => {
        console.error({ error });
      });
  };

  render() {
    return (
      <MyContext.Consumer>
        {context => {
          return context.folders.map(folder => (
            <div key={folder.name}>
              <div onClick={() => this.addFolder()}>{folder.name}</div>
              <button 
                className="Note__delete"
                type="button" 
                onClick={this.handleFolderDelete(folder.id)}
              > handle folder delete </button>
              {context.notes.filter(note => note.folderId === folder.id).length}
            </div>
          ));
        }}
      </MyContext.Consumer>
    );
  }
}
