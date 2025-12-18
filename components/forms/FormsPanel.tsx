"use client";

import { Paper, Box } from "@mui/material";
import FormWizard from "./FormWizard";
import GameSetupForm from "./steps/GameSetupForm";
import AppearanceForm from "./steps/AppearanceForm";
import PrintOptionsForm from "./steps/PrintOptionsForm";

import { GeneratorConfig } from "@/schemas/generator";
import { CardStyle } from "@/hooks/useStyleConfig";

interface FormsPanelProps {
  gameConfig: GeneratorConfig["game"];
  printConfig: GeneratorConfig["printing"];
  styleConfig: CardStyle;
  updateGame: (patch: Partial<GeneratorConfig["game"]>) => void;
  updatePrinting: (patch: Partial<GeneratorConfig["printing"]>) => void;
  updateStyle: (patch: Partial<CardStyle>) => void;
}

const FormsPanel: React.FC<FormsPanelProps> = ({
  gameConfig,
  printConfig,
  styleConfig,
  updateGame,
  updatePrinting,
  updateStyle,
}) => {
  const formSteps = [
    {
      label: "Settings",
      component: <GameSetupForm game={gameConfig} onChange={updateGame} />,
    },
    {
      label: "Styles",
      component: (
        <AppearanceForm
          styles={styleConfig}
          onChange={updateStyle}
          freeCenter={gameConfig.freeCenter}
        />
      ),
    },
    {
      label: "Printing",
      component: (
        <PrintOptionsForm options={printConfig} onChange={updatePrinting} />
      ),
    },
  ];

  return (
    <Box>
      <Paper>
        <FormWizard steps={formSteps} />
      </Paper>
    </Box>
  );
};

export default FormsPanel;
