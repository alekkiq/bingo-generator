import { useState } from "react";
import { GeneratorSchema } from "../schema/generatorSchema";
import { defaultConfig } from "../config/defaultConfig";

const defaults = GeneratorSchema.parse(defaultConfig);

export const useGeneratorConfig = () => {
  const [config, setConfig] = useState(defaults);

  const updateGame = (patch) =>
    setConfig((prev) => ({
      ...prev,
      game: { ...prev.game, ...patch },
    }));

  const updateStyle = (patch) =>
    setConfig((prev) => ({
      ...prev,
      style: { ...prev.style, ...patch },
    }));

  const updatePrintOptions = (patch) =>
    setConfig((prev) => ({
      printing: { ...prev.printing, ...patch },
    }));

  return {
    config,
    updateGame,
    updateStyle,
    updatePrintOptions,
  };
};
