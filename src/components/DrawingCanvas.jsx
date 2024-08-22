'use client'
import React, { useRef, useState, useEffect } from 'react';

const DrawingCanvas = ({ onFail, onSubmit }) => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [timer, setTimer] = useState(45);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = 600;
    canvas.height = 400;
    const context = canvas.getContext('2d');
    context.lineCap = 'round';
    context.lineWidth = 5;
    context.strokeStyle = 'black';
    contextRef.current = context;

    const countdown = setInterval(() => {
      setTimer((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(countdown);
          checkCanvas();
          return 45;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, []);

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const finishDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) return;

    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    contextRef.current.clearRect(0, 0, canvas.width, canvas.height);
  };

  const handleSubmit = () => {
    const canvas = canvasRef.current;
    const dataUrl = canvas.toDataURL(); 
    onSubmit(dataUrl);
  };

  const checkCanvas = () => {
    const canvas = canvasRef.current;
    const empty = contextRef.current.getImageData(0, 0, canvas.width, canvas.height).data
      .every((colorValue) => colorValue === 0);

    if (empty) {
      setFailed(true);
      onFail();
    } else {
      clearCanvas();
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center justify-center mb-4">
        <p className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md">
          Time Left: {timer}s
        </p>
      </div>
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={draw}
        onMouseLeave={finishDrawing}
        className="border-2 border-gray-600 cursor-pointer"
      />
      <div className="mt-4">
        <button
          onClick={clearCanvas}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700"
        >
          Clear Canvas
        </button>
        <button
          onClick={handleSubmit}
          className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
        >
          Submit Drawing
        </button>
      </div>
      {failed && <p className="text-red-600 mt-4">You failed! Please try again.</p>}
    </div>
  );
};

export default DrawingCanvas;
