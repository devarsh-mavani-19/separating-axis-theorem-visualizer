import React, { type JSX } from "react";
import { Layer, Line } from "react-konva";

interface GridProps {
  width: number;
  height: number;
  cellSize?: number;
}

const Grid: React.FC<GridProps> = ({ width, height, cellSize = 40 }) => {
  const halfWidth = width / 2;
  const halfHeight = height / 2;

  const lines: JSX.Element[] = [];

  // Draw vertical grid lines
  for (let x = -halfWidth; x <= halfWidth; x += cellSize) {
    lines.push(
      <Line
        key={`v${x}`}
        points={[x, -halfHeight, x, halfHeight]}
        stroke={x === 0 ? "#000" : "#ccc"} // Y-axis darker
        strokeWidth={x === 0 ? 2 : 1}
      />
    );
  }

  // Draw horizontal grid lines
  for (let y = -halfHeight; y <= halfHeight; y += cellSize) {
    lines.push(
      <Line
        key={`h${y}`}
        points={[-halfWidth, y, halfWidth, y]}
        stroke={y === 0 ? "#000" : "#ccc"} // X-axis darker
        strokeWidth={y === 0 ? 2 : 1}
      />
    );
  }

  return (
    <Layer x={halfWidth} y={halfHeight}>
      {lines}
    </Layer>
  );
};

export default Grid;
