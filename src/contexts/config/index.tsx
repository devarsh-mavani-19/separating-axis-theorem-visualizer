import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface Config {
  shape1Sides: number;
  shape1Color: string;
  shape2Sides: number;
  shape2Color: string;
  axisColor: string;
  overlapColor: string;
  setConfig: (config: Partial<Omit<Config, "setConfig">>) => void;
}

const ConfigContext = createContext<Config | undefined>(undefined);

export const ConfigProvider = ({ children }: { children: ReactNode }) => {
  const [configState, setConfigState] = useState<Omit<Config, "setConfig">>({
    shape1Sides: 3,
    shape1Color: "#1890ff",
    shape2Sides: 3,
    shape2Color: "#f5222d",
    axisColor: "#52c41a",
    overlapColor: "#722ed1",
  });

  const setConfig = (newConfig: Partial<Omit<Config, "setConfig">>) => {
    setConfigState((prev) => ({ ...prev, ...newConfig }));
  };

  return <ConfigContext.Provider value={{ ...configState, setConfig }}>{children}</ConfigContext.Provider>;
};

export const useConfig = () => {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error("useConfig must be used within a ConfigProvider");
  }
  return context;
};
