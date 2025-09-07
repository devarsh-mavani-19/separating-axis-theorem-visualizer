import type { Axis } from "../types/axis";
import type { Polygon } from "../types/polygon";
import type { Projection } from "../types/projection";

export const calculateNormals = (polygon: Polygon) => {
  const normals: Axis[] = [];
  const { vertices } = polygon;

  for (let i = 0; i < vertices.length; i++) {
    const v1 = vertices[i];
    const v2 = vertices[(i + 1) % vertices.length];

    // Edge vector = v2 - v1
    const edge = { x: v2.x - v1.x, y: v2.y - v1.y };

    // Perpendicular vector (normal) = (-edge.y, edge.x)
    let normal = { x: -edge.y, y: edge.x };

    // Normalize the normal vector
    const length = Math.sqrt(normal.x ** 2 + normal.y ** 2);
    if (length !== 0) {
      normal = { x: normal.x / length, y: normal.y / length };
    }

    normals.push(normal);
  }

  return normals;
};

export const calculateProjections = (polygon: Polygon, axes: Axis[]): Projection[] => {
  const projections: Projection[] = [];

  for (const axis of axes) {
    let min = Infinity;
    let max = -Infinity;

    for (const vertex of polygon.vertices) {
      // Shift vertex relative to canvas center
      const shiftedX = vertex.x;
      const shiftedY = vertex.y;

      // Dot product for projection
      const dot = shiftedX * axis.x + shiftedY * axis.y;

      min = Math.min(min, dot);
      max = Math.max(max, dot);
    }

    projections.push({ min, max });
  }

  return projections;
};
