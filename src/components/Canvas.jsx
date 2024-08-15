import React, { useRef, useState, useEffect } from 'react';

const Canvas = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lines, setLines] = useState([]);
  const [currentLine, setCurrentLine] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;


    // Clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Redraw all the lines
    lines.forEach(line => {
      context.beginPath();
      context.moveTo(line.start.x, line.start.y);
      context.lineTo(line.end.x, line.end.y);
      context.strokeStyle = 'black';
      context.lineWidth = 2;
      context.stroke();
    });

    // Draw the current line
    if (currentLine) {
      context.beginPath();
      context.moveTo(currentLine.start.x, currentLine.start.y);
      context.lineTo(currentLine.end.x, currentLine.end.y);
      context.strokeStyle = 'red';
      context.lineWidth = 2;
      context.stroke();
    }
  }, [lines, currentLine]);

  const startDrawing = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const startX = e.clientX - rect.left;
    const startY = e.clientY - rect.top;

    setIsDrawing(true);
    setCurrentLine({
      start: { x: startX, y: startY },
      end: { x: startX, y: startY }
    });
  };

  const draw = (e) => {
    if (!isDrawing) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const endX = e.clientX - rect.left;
    const endY = e.clientY - rect.top;

    setCurrentLine({
      ...currentLine,
      end: { x: endX, y: endY }
    });
  };

  const endDrawing = () => {
    if (!isDrawing) return;

    setLines([...lines, currentLine]);
    setIsDrawing(false);
    setCurrentLine(null);
  };

  return (
    <canvas
      ref={canvasRef}
      onMouseDown={startDrawing}
      onMouseMove={draw}
      onMouseUp={endDrawing}
    />
  );
};

export default Canvas;
