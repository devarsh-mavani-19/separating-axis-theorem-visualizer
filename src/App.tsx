import { useState, useEffect, useCallback } from "react";
import { Flex, Splitter, Typography } from "antd";
import Canvas from "./components/canvas";
import Link from "antd/es/typography/Link";
import { GithubOutlined } from "@ant-design/icons";
import ConfigPanel from "./components/config-panel";
import { ConfigProvider } from "./contexts/config";

function App() {
  const [dimension, setDimension] = useState({ width: window.innerWidth, height: window.innerHeight });
  const [panelRatio, setPanelRatio] = useState(0.7);
  const onResize = useCallback(() => {
    setDimension({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, []);

  useEffect(() => {
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [onResize]);

  return (
    <ConfigProvider>
      <Splitter
        style={{ height: "100%", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}
        onResize={([firstPanelWidth]) => {
          setPanelRatio(firstPanelWidth / dimension.width);
        }}
      >
        <Splitter.Panel max={"70%"} min={"50%"} defaultSize={"70%"}>
          <Canvas
            dimension={{
              width: dimension.width * panelRatio,
              height: window.innerHeight,
            }}
          />
        </Splitter.Panel>
        <Splitter.Panel>
          <Flex style={{ padding: 8 }} vertical>
            <Flex justify="space-between" align="center">
              <Typography.Text>
                Built with ❤️ by{" "}
                <Link target="_blank" href="https://devar.sh">
                  Devarsh Mavani
                </Link>
              </Typography.Text>
              <Link target="_blank" href="http://github.com/devarsh-mavani-19/separating-axis-theorem-visualizer">
                <GithubOutlined
                  style={{
                    color: "black",
                    fontSize: 36,
                  }}
                />
              </Link>
            </Flex>
            <Typography>
              <Typography.Title>Separting Axis Theorem</Typography.Title>

              <Typography.Paragraph>
                Separating Axis Theorem is used to detect collision between convex shapes. This tool allows to visualize
                shape normals, separating axes and projections of its shadows.
              </Typography.Paragraph>
              <Typography.Paragraph>
                If interested in learning in detail, highly recommend reading{" "}
                <Link target="_blank" href="https://dyn4j.org/2010/01/sat/">
                  this article
                </Link>
                .
              </Typography.Paragraph>
            </Typography>
            <ConfigPanel />
          </Flex>
        </Splitter.Panel>
      </Splitter>
    </ConfigProvider>
  );
}

export default App;
