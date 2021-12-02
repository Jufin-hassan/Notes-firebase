
import React, { useState, useEffect } from "react";
import "./App.css"

import firebase from "firebase/compat/app";
import "firebase/compat/database";

import Navbar from "./components/Navbar";
import NoteAdd from "./components/NoteAdd";
import NoteBook from "./components/NoteBook";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};
firebase.initializeApp(firebaseConfig);

const App = () => {

  const [noteData, setNoteData] = useState([])

  const updateNotes = () => {
    firebase
      .database()
      .ref("notebook")
      .on("child_added", (snapshot) => {
        let note = {
          id: snapshot.key,
          title: snapshot.val().title,
          description: snapshot.val().description,
        };
        let notebook = noteData;
        notebook.push(note);
        setNoteData([...noteData]);
      });

    firebase
      .database()
      .ref("notebook")
      .on("child_removed", (snapshot) => {
        let notebook = noteData;
        notebook = noteData.filter((note) => note.id !== snapshot.key);
        setNoteData(notebook);
      });
  };

  useEffect(() => {
    updateNotes();
  }, []);


  return (
    <div className="app">
      <Navbar />
      <div className="note-section">
        <NoteAdd />
        <NoteBook notebook={noteData} />
      </div>
    </div>

  )
};


export default App