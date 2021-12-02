import React, { useState } from 'react'
import "./styles.css"
import firebase from "firebase/compat/app"
import "firebase/compat/database"

const NoteAdd = () => {

    const [title,setTitle] = useState("");
    const [description, setDescription] = useState("")

    const handleTitleChange = (event) => {
        setTitle(event.target.value)
    }
    const handleDescChange = (event) => {
        setDescription(event.target.value)
    }

    const addNote = () => {
        if (title !== "" && description !== "") {
          firebase.database().ref("notebook").push({
            title: title,
            description: description
          });
        }
        setTitle("")
        setDescription("")
      }

    return (
        <div>
            <div className="noteadd">
                <h1>Add a New Note</h1>
                <div className="form-group">
                    <input
                        type="text"
                        className="noteadd-header"
                        name="noteadd-header"
                        placeholder="Note Title"
                        value={title}
                        onChange={(val) => handleTitleChange(val)}
                    />
                </div>
                <div className="form-group">
                    <textarea
                        name="noteadd-description"
                        className="noteadd-description"
                        placeholder="Note Description"
                        value={description}
                        onChange={(val) => handleDescChange(val)}
                    ></textarea>
                </div>
                <div className="noteadd-button">
                <button onClick={() => addNote()}>Add a Note</button>
                </div>
            </div>
        </div>
    )
}

export default NoteAdd
