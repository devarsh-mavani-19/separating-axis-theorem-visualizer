import { Line } from "react-konva";
import type { Polygon as PolygonType } from "../../types/polygon";
import { transformCoordinates } from "../../utils/coordinates.util";
import { useRef } from "react";
import type { LineConfig, Line as LineType } from "konva/lib/shapes/Line";

interface PolygonProps {
  polygon: PolygonType;
  width: number;
  height: number;
  draggable?: boolean;
  onDragMove?: (id: string, dx: number, dy: number) => void;
}

export default function Polygon({ polygon, draggable, width, height, onDragMove }: PolygonProps) {
  const points = polygon.vertices.flatMap((v) => [transformCoordinates(v.x, width), transformCoordinates(v.y, height)]);
  const ref = useRef<LineType<LineConfig>>(null);

  const lastDragPosition = useRef({ x: 0, y: 0 });

  return (
    <Line
      points={points}
      stroke="red"
      strokeWidth={2}
      fill={"#ff00ff55"}
      ref={ref}
      closed
      draggable={draggable}
      dragBoundFunc={(pos) => {
        // Compute relative delta
        const dx = pos.x - lastDragPosition.current.x;
        const dy = pos.y - lastDragPosition.current.y;

        if (dx !== 0 || dy !== 0) {
          onDragMove?.(polygon.identifier, dx, dy);
          lastDragPosition.current = pos;
        }

        // Always return original position to cancel the visual move
        return { x: 0, y: 0 };
      }}
      onDragStart={() => {
        lastDragPosition.current = { x: 0, y: 0 };
      }}
    />
  );
}
