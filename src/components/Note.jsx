{/*
import {forwardRef} from "react";

const Note = forwardRef(({content, initialPos, ...props}, ref) => {
  return (
    <div
      ref={ref}
      style={{
        position: "absolute",
        left: `${initialPos?.x}px`,
        top: `${initialPos?.y}px`,
        border: "1px solid black",
        userSelect: "none",
        padding: "10px",
        width: "200px",
        cursor: "grab",
        backgroundColor: "beige",
      }}
      {...props}
    >
      📌 {content}
    </div>
  );
});

export default Note;
*/}

import React, { useState, forwardRef } from "react";

const Note = forwardRef(({ content, initialPos, ...props }, ref) => {
  const [showFullContent, setShowFullContent] = useState(false);

  const words = content.split(" ");
  const isContentLong = words.length > 10;
  const displayedContent = showFullContent ? content : words.slice(0, 10).join(" ") + (isContentLong ? "..." : "");

  const toggleContent = () => {
    setShowFullContent((prev) => !prev);
  };

  return (
    <div
      ref={ref}
      style={{
        position: "absolute",
        left: `${initialPos?.x}px`,
        top: `${initialPos?.y}px`,
        border: "2px solid black",
        lineHeight:'16px',
        fontSize:'20px',
        userSelect: "none",
        padding: "32px",
        borderRadius:'10px',
        width: "200px",
        cursor: "grab",
        backgroundColor: "beige",
        overflow: "hidden",
      }}
      {...props}
    >
      📌 {displayedContent}
      {isContentLong && (
        <button onClick={toggleContent} style={{  color: 'blue', border:'none',}}>
          {showFullContent ? "Read Less" : "Read More"}
        </button>
      )}
    </div>
  );
});

export default Note;
