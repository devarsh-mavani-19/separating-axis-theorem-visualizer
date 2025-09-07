// components/ConfigPanel.tsx
import { Typography, InputNumber, ColorPicker } from "antd";
import { useConfig } from "../../contexts/config";

export default function ConfigPanel() {
  const { shape1Sides, shape1Color, shape2Sides, shape2Color, axisColor, overlapColor, setConfig } = useConfig();

  return (
    <>
      <Typography.Title level={3}>Configuration</Typography.Title>

      <Typography.Text>No. of sides in shape 1</Typography.Text>
      <InputNumber min={3} max={10} value={shape1Sides} onChange={(val) => setConfig({ shape1Sides: val ?? 3 })} />

      <Typography.Text>Shape 1 projection color</Typography.Text>
      <ColorPicker
        style={{ maxWidth: 40 }}
        value={shape1Color}
        onChange={(color) => setConfig({ shape1Color: color.toHexString() })}
      />

      <Typography.Text>No. of sides in shape 2</Typography.Text>
      <InputNumber min={3} max={10} value={shape2Sides} onChange={(val) => setConfig({ shape2Sides: val ?? 3 })} />

      <Typography.Text>Shape 2 projection color</Typography.Text>
      <ColorPicker
        style={{ maxWidth: 40 }}
        value={shape2Color}
        onChange={(color) => setConfig({ shape2Color: color.toHexString() })}
      />

      <Typography.Text>Axis color</Typography.Text>
      <ColorPicker
        style={{ maxWidth: 40 }}
        value={axisColor}
        onChange={(color) => setConfig({ axisColor: color.toHexString() })}
      />

      <Typography.Text>Overlap shadow color</Typography.Text>
      <ColorPicker
        style={{ maxWidth: 40 }}
        value={overlapColor}
        onChange={(color) => setConfig({ overlapColor: color.toHexString() })}
      />
    </>
  );
}
