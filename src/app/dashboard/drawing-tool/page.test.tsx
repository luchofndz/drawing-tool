import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import DrawingTool from './page';

const mockGetContext = jest.fn();
HTMLCanvasElement.prototype.getContext = mockGetContext;

describe('DrawingTool Component', () => {
  let mockCanvasContext: Partial<CanvasRenderingContext2D>;

  beforeEach(() => {
    mockCanvasContext = {
      beginPath: jest.fn(),
      moveTo: jest.fn(),
      lineTo: jest.fn(),
      stroke: jest.fn(),
      closePath: jest.fn(),
      fillText: jest.fn(),
      font: '',
      fillStyle: '',
      strokeStyle: '',
      lineWidth: 0,
    };
    mockGetContext.mockReturnValue(mockCanvasContext as CanvasRenderingContext2D);
  });

  test('renders canvas and tools correctly', () => {
    render(<DrawingTool />);
    const drawButton = screen.getByAltText('draw icon');
    const eraseButton = screen.getByAltText('eraser icon');
    const textButton = screen.getByAltText('text icon');
    const colorPicker = screen.getByDisplayValue('#000000');

    expect(drawButton).toBeInTheDocument();
    expect(eraseButton).toBeInTheDocument();
    expect(textButton).toBeInTheDocument();
    expect(colorPicker).toBeInTheDocument();
  });

  test('handles color and line width changes', () => {
    render(<DrawingTool />);
    const colorPicker = screen.getByDisplayValue('#000000');
    const rangeInput = screen.getByDisplayValue('25');

    fireEvent.change(colorPicker, { target: { value: '#ff0000' } });
    fireEvent.change(rangeInput, { target: { value: '10' } });

    expect(mockCanvasContext.strokeStyle).toBe('#ff0000');
    expect(mockCanvasContext.lineWidth).toBe(10);
  });

  //TODO: cover 100% coverage of the drawing tool
});
