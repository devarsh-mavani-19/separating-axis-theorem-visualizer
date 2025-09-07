import { Line } from "react-konva";
import type { Axis } from "../../types/axis";
import { useConfig } from "../../contexts/config";

export interface Projection {
  min: number;
  max: number;
  color: string;
}

export interface SeparationAxisProps {
  axis: Axis;
  width: number;
  height: number;
  projections: Projection[];
}

export default function SeparationAxis({ axis, width, height, projections }: SeparationAxisProps) {
  const { axisColor, overlapColor } = useConfig();

  const centerX = width / 2;
  const centerY = height / 2;

  // Normalize the axis vector
  const length = Math.sqrt(axis.x * axis.x + axis.y * axis.y);
  const nx = axis.x / length;
  const ny = axis.y / length;

  // Convert projection "min/max" to canvas coordinates
  const projectToCanvas = (value: number) => ({
    x: centerX + nx * value,
    y: centerY + ny * value,
  });

  // Extract two projections
  const [p1, p2] = projections;

  // Calculate overlap range
  const overlapMin = Math.max(p1.min, p2.min);
  const overlapMax = Math.min(p1.max, p2.max);
  const hasOverlap = overlapMin < overlapMax;

  // Create all line segments
  const lines = [];

  // Shape 1 projection
  lines.push({
    start: projectToCanvas(p1.min),
    end: projectToCanvas(p1.max),
    color: p1.color,
  });

  // Shape 2 projection
  lines.push({
    start: projectToCanvas(p2.min),
    end: projectToCanvas(p2.max),
    color: p2.color,
  });

  // Overlap projection → dark green
  if (hasOverlap) {
    lines.push({
      start: projectToCanvas(overlapMin),
      end: projectToCanvas(overlapMax),
      color: overlapColor,
    });
  }

  return (
    <>
      {/* Draw main axis */}
      <Line
        points={[
          centerX - nx * Math.max(width, height),
          centerY - ny * Math.max(width, height),
          centerX + nx * Math.max(width, height),
          centerY + ny * Math.max(width, height),
        ]}
        stroke={axisColor}
        strokeWidth={2}
      />

      {/* Draw projections */}
      {lines.map((line, idx) => (
        <Line
          key={`proj-${idx}`}
          points={[line.start.x, line.start.y, line.end.x, line.end.y]}
          stroke={line.color}
          strokeWidth={6}
          lineCap="round"
        />
      ))}
    </>
  );
}
