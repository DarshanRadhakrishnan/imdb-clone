import { useState, useEffect } from "react";

function App() {
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState(() => {
    return JSON.parse(localStorage.getItem("notes")) || [];
  });

  // Persist notes to localStorage
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    if (note.trim() === "") return;

    setNotes([...notes, note]);
    setNote("");
  };

  const deleteNote = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
  };

  return (
    <div style={styles.container}>
      <h1>Notes App</h1>

      <div style={styles.inputContainer}>
        <input
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Write a note..."
          style={styles.input}
        />
        <button onClick={addNote} style={styles.button}>
          Add Note
        </button>
      </div>

      <ul style={styles.list}>
        {notes.map((n, index) => (
          <li key={index} style={styles.item}>
            <span>{n}</span>
            <button
              onClick={() => deleteNote(index)}
              style={styles.deleteButton}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

// ----------------- Simple Inline Styles --------------------
const styles = {
  container: {
    maxWidth: "600px",
    margin: "40px auto",
    textAlign: "center",
    fontFamily: "Arial",
  },
  inputContainer: {
    display: "flex",
    gap: "10px",
    justifyContent: "center",
    marginBottom: "20px",
  },
  input: {
    padding: "10px",
    width: "70%",
    fontSize: "16px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
  },
  list: {
    listStyle: "none",
    padding: 0,
  },
  item: {
    background: "#f2f2f2",
    padding: "12px",
    margin: "8px 0",
    borderRadius: "6px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  deleteButton: {
    padding: "6px 12px",
    background: "red",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};
