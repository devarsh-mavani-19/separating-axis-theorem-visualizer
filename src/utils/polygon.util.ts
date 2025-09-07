import type { Polygon } from "../types/polygon";
import type { Vertex } from "../types/vertex";

/**
 * Create a regular polygon with any number of sides.
 * @param identifier - Unique name for the polygon.
 * @param noOfSides - Number of sides (≥ 3).
 * @param centerX - Center X coordinate.
 * @param centerY - Center Y coordinate.
 * @param size - Size (radius from center to vertex).
 * @returns Polygon object containing vertices.
 */
export const createPolygon = (
  identifier: string,
  noOfSides: number,
  centerX: number,
  centerY: number,
  size: number
): Polygon => {
  if (noOfSides < 3) {
    throw new Error("Polygon must have at least 3 sides.");
  }

  const angleStep = (2 * Math.PI) / noOfSides;

  const vertices: Vertex[] = [];

  for (let i = 0; i < noOfSides; i++) {
    const angle = i * angleStep - Math.PI / 2; // start from top
    const x = centerX + size * Math.cos(angle);
    const y = centerY + size * Math.sin(angle);
    vertices.push({ x, y });
  }

  return {
    identifier,
    vertices,
  } satisfies Polygon;
};
