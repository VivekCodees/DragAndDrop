import { useState } from 'react'
import './App.css'
import Notes from './components/Notes'
import Canvas from './components/Canvas'

function App() {

  const [note, setNote] = useState("");

  const draw = (ctx) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // Clear the canvas

    ctx.beginPath();
    ctx.moveTo(50, 50); // Start point (x, y)
    ctx.lineTo(200, 200); // End point (x, y)
    ctx.strokeStyle = 'black'; // Line color
    ctx.lineWidth = 5; // Line width
    ctx.stroke(); // Draw the line
  };

  const [notes, setNotes] = useState(
    [
      {
        id: 1,
        text: 'Welcome to JS',
      },
      {
        id: 2,
        text: 'Lets get started'
      },
    ]
  )

  return (
    <>
      <div 
      style={{overflow:'hidden'}}
      >
        <Canvas draw={draw} />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "5px",
            padding:'20px',
          }}
        >
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            style={{padding:'10px', fontSize:'16px'}}
          />
          <button
            onClick={() => {
              setNotes([...notes, { id: notes.length + 1, text: note }]);
              setNote("");
            }}
            style={{ padding: '10px' }}
          >
            Add Note
          </button>
        </div>
        <Notes notes={notes} setNotes={setNotes} />
      </div>
    </>
  )
}

export default App
