"use client";

import styles from './page.module.scss';
import { useRef, useState, useEffect, MouseEvent } from 'react';

const DrawingApp = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState<string>("#000000");
  const [lineWidth, setLineWidth] = useState<number>(5);
  const [tool, setTool] = useState<"draw" | "erase" | "text">("draw");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - 90;

    const context = canvas.getContext('2d') as CanvasRenderingContext2D;
    context.lineCap = "round";
    context.strokeStyle = color;
    context.lineWidth = lineWidth;
    contextRef.current = context;
  }, [color, lineWidth]);

  const startDrawing = ({ nativeEvent }: MouseEvent<HTMLCanvasElement>) => {
    const { offsetX, offsetY } = nativeEvent;
    if (tool === "text") return;
    contextRef.current?.beginPath();
    contextRef.current?.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const finishDrawing = () => {
    contextRef.current?.closePath();
    setIsDrawing(false);
  };

  const draw = ({ nativeEvent }: MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = nativeEvent;
    
    if (tool === "draw") {
      contextRef.current!.globalCompositeOperation = "source-over";
      contextRef.current?.lineTo(offsetX, offsetY);
      contextRef.current?.stroke();
    } else if (tool === "erase") {
      contextRef.current!.globalCompositeOperation = "destination-out";
      contextRef.current?.lineTo(offsetX, offsetY);
      contextRef.current?.stroke();
    }
  };

  const addText = (e: MouseEvent<HTMLCanvasElement>) => {
    const { offsetX, offsetY } = e.nativeEvent;
    const text = prompt("Enter your text:");
    if (text) {
      contextRef.current!.font = `${lineWidth * 2}px Arial`;
      console.log("colorr", color)
      contextRef.current!.fillStyle = color;
      contextRef.current?.fillText(text, offsetX, offsetY);
    }
  };

  const handleCanvasClick = (e: MouseEvent<HTMLCanvasElement>) => {
    if (tool === "text") {
      addText(e);
    }
  };

  return (
    <div className={styles.mainContainer} style={{ textAlign: 'center' }}>
      <div className={styles.tools}>
        <button onClick={() => setTool("draw")}>Draw</button>
        <button onClick={() => setTool("erase")}>Erase</button>
        <button onClick={() => setTool("text")}>Text</button> 
        <label>
          Color:
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value as string)}
          />
        </label>
        <label style={{ marginLeft: '20px' }}>
          Size:
          <input
            type="range"
            min="1"
            max="50"
            value={lineWidth}
            onChange={(e) => setLineWidth(Number(e.target.value))}
          />
        </label>
      </div>
      <canvas
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={draw}
        onClick={handleCanvasClick}
        ref={canvasRef}
        className={styles.canvas}
        style={{cursor: tool === "text" ? 'text' : 'crosshair' }}
      />
    </div>
  );
};

export default DrawingApp;

