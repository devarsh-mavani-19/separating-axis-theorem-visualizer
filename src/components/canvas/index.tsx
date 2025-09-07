import { Layer, Stage } from "react-konva";
import Grid from "../grid";
import { useEffect, useState } from "react";
import type { Polygon as PolygonType } from "../../types/polygon";
import { createPolygon } from "../../utils/polygon.util";
import Polygon from "../polygon";
import { calculateNormals, calculateProjections } from "../../utils/math.util";
import type { Axis } from "../../types/axis";
import SeparationAxis from "../separation-axis";
import type { Projection } from "../../types/projection";
import { useConfig } from "../../contexts/config";

export default function Canvas({ dimension }: { dimension: { width: number; height: number } }) {
  const { shape1Color, shape2Color, shape1Sides, shape2Sides } = useConfig();
  const [polygons, setPolygons] = useState<PolygonType[]>([]);
  const [axes, setAxes] = useState<Axis[]>([]);
  const [projections, setProjections] = useState<Projection[][]>([]);

  useEffect(() => {
    const polygon11 = createPolygon("polygon1-1", shape1Sides, 0, 0, 100);
    const polygon12 = createPolygon("polygon1-2", shape2Sides, 200, 200, 100);

    setPolygons([polygon11, polygon12]);
  }, [shape1Sides, shape2Sides]);

  useEffect(() => {
    const normals: Axis[] = [];
    for (const polygon of polygons) {
      normals.push(...calculateNormals(polygon));
    }

    const newProjections: Projection[][] = polygons.map((polygon) => calculateProjections(polygon, normals));

    setAxes(normals);
    setProjections(newProjections);
  }, [dimension.height, dimension.width, polygons]);

  return (
    <Stage {...dimension} style={{ ...dimension, border: "1px solid #ccc" }}>
      <Grid {...dimension} />
      <Layer>
        {polygons.map((it) => (
          <Polygon
            {...dimension}
            key={it.identifier}
            polygon={it}
            draggable
            onDragMove={(id, dx, dy) => {
              setPolygons((prev) =>
                prev.map((poly) => {
                  if (poly.identifier !== id) return poly;

                  return {
                    ...poly,
                    vertices: poly.vertices.map((v) => ({
                      x: v.x + dx,
                      y: v.y + dy,
                    })),
                  };
                })
              );
            }}
          />
        ))}
        {axes.map((axis, axisIndex) => {
          return (
            <SeparationAxis
              {...dimension}
              key={`axis-${axisIndex}`}
              axis={axis}
              projections={[
                { ...projections[0][axisIndex], color: shape1Color },
                { ...projections[1][axisIndex], color: shape2Color },
              ]}
            />
          );
        })}
      </Layer>
    </Stage>
  );
}
