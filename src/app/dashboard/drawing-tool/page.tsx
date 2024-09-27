"use client";

import { useRef, useState, useEffect, MouseEvent } from 'react';
import styles from './page.module.scss';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Image from 'next/image'

const DrawingTool = () => {
  //TODO: split component in 2 childs, boardComponent and toolBarComponent
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState<string>("#000000");
  const [lineWidth, setLineWidth] = useState<number>(25);
  const [tool, setTool] = useState<"draw" | "erase" | "text">("draw");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - 110;
    const context = canvas.getContext('2d') as CanvasRenderingContext2D;
    context.lineCap = "round";
    contextRef.current = context;

    //TODO: call api to save contextRef.current data before unmount
    //TODO: call api here to get state on load and set locally
  }, []);
  
  useEffect(() => {
    if (contextRef.current) {
      contextRef.current.strokeStyle = color;
      contextRef.current.lineWidth = lineWidth;
    }
  }, [color, lineWidth]);

  const handleChange = (
    event: MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {
    switch (newAlignment) {
      case 'draw':
        setTool("draw");
        break;
      case 'erase':
        setTool("erase");
        break;
      case 'text':
        setTool("text");
        break;
    }
  };

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

  const addText = ({ nativeEvent }: MouseEvent<HTMLCanvasElement>) => {
    const { offsetX, offsetY } = nativeEvent;
    const text = prompt("Enter your text:");
    if (text) {
      contextRef.current!.font = `${lineWidth * 2}px Arial`;
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
        <ToggleButtonGroup
          color="info"
          value={tool}
          exclusive
          onChange={handleChange}
          aria-label="Platform"
        >
          <ToggleButton value="draw" className={styles.iconBtn}>
            <Image
              src="/pencil.png"
              alt="draw icon"
              width={54}
              height={54}
              priority
            />
          </ToggleButton>
          <ToggleButton value="erase" className={styles.iconBtn}>
            <Image
              src="/eraser-blue.png"
              alt="eraser icon"
              width={54}
              height={54}
              priority
            />
          </ToggleButton>
          <ToggleButton value="text" className={styles.iconBtn}>
            <Image
              src="/font.png"
              alt="text icon"
              width={54}
              height={54}
              priority
            />
          </ToggleButton>
        </ToggleButtonGroup>
        <input
          type="color"
          value={color}
          style={{ width: "80px", height: "80px" }}
          onChange={(e) => setColor(e.target.value as string)}
        />
        <input
          type="range"
          min="1"
          max="50"
          style={{ width: "160px", marginLeft: "10px" }}
          value={lineWidth}
          onChange={(e) => setLineWidth(Number(e.target.value))}
        />
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

export default DrawingTool;

