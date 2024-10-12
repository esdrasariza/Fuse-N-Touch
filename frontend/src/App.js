import './App.css';
import { ReactSketchCanvas } from 'react-sketch-canvas';
import { CompactPicker } from 'react-color';
import { useState, useRef } from 'react';

function App() {
  const [color, setColor] = useState("pink");
  const [timeoutId, setTimeoutId] = useState(null); // Track the timeout
  const canvasRef = useRef(); // Create a ref to access the canvas instance

  const handleColorChange = (colorObj) => {
    setColor(colorObj.hex); // Extract hex value from the color object
  };

  const handleStroke = () => {
    if (timeoutId) clearTimeout(timeoutId); // Clear previous timeout

    const newTimeoutId = setTimeout(() => {
      saveImage(); // Save image after 10s of inactivity
    }, 10000);

    setTimeoutId(newTimeoutId); // Store timeout ID
  };

  const saveImage = async () => {
    try {
      const base64Image = await canvasRef.current.exportImage('png'); // Get base64 image
      console.log('Saved Base64 Image:', base64Image);
    } catch (error) {
      console.error('Error exporting image:', error);
    }
  };

  const handleErase = () => {
    canvasRef.current.clearCanvas(); // Clear the canvas
  };

  return (
    <div className="App-header">
      <h1>Fuse-N-Touch</h1>
      <ReactSketchCanvas
        ref={canvasRef}
        width="100%"
        height="500px"
        strokeWidth={4}
        strokeColor={color}
        onStroke={handleStroke}
      />
      <div className="controls">
        <CompactPicker color={color} onChange={handleColorChange} />
        <button className="Erase-Button" onClick={handleErase}>
          Erase Canvas
        </button>
      </div>
    </div>
  );
}

export default App;

