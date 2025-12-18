"use client";

import { defaultConfig } from "@/lib/bingoConfig";
import { GeneratorSchema, GeneratorConfig } from "@/schemas/generator";
import { useState } from "react";

const defaults: GeneratorConfig = GeneratorSchema.parse(defaultConfig);

export interface UseGeneratorConfigReturn {
  config: GeneratorConfig;
  updateGame: (patch: Partial<GeneratorConfig["game"]>) => void;
  updatePrinting: (patch: Partial<GeneratorConfig["printing"]>) => void;
}

export const useGeneratorConfig = (): UseGeneratorConfigReturn => {
  const [config, setConfig] = useState<GeneratorConfig>(defaults);

  const updateGame = (patch: Partial<GeneratorConfig["game"]>) =>
    setConfig((prev) => ({
      ...prev,
      game: { ...prev.game, ...patch },
    }));

  const updatePrinting = (patch: Partial<GeneratorConfig["printing"]>) =>
    setConfig((prev) => ({
      ...prev,
      printing: { ...prev.printing, ...patch },
    }));

  return {
    config,
    updateGame,
    updatePrinting,
  };
};
