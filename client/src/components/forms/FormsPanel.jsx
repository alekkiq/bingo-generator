import { useState } from "react";
import { Box, Tabs, Tab, Paper } from "@mui/material";
import FormWizard from "./FormWizard";
import GameSetupForm from "./steps/GameSetupForm";
import AppearanceForm from "./steps/AppearanceForm";
import PrintOptionsForm from "./steps/PrintOptionsForm";

const FormsPanel = ({
  config,
  updateGame,
  updateStyle,
  updatePrintOptions,
}) => {
  const [tab, setTab] = useState(0);

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  const formSteps = [
    {
      label: "Settings",
      component: <GameSetupForm game={config.game} onChange={updateGame} />,
    },
    {
      label: "Styles",
      component: <AppearanceForm />,
    },
    {
      label: "Printing",
      component: (
        <PrintOptionsForm
          options={config.printing}
          onChange={updatePrintOptions}
        />
      ),
    },
  ];

  return (
    <Paper>
      {/*
      <Tabs
        value={tab}
        onChange={handleChange}
        variant="fullWidth"
        textColor="primary"
        indicatorColor="primary"
      >
        <Tab label="Setup" />
        <Tab label="Appearance" />
      </Tabs>
      */}

      <Box>
        {/*tab === 0 && (
          <GameSetupForm game={config.game} onChange={updateGame} />
        )}
        {tab === 1 && <AppearanceForm />*/}
        <FormWizard steps={formSteps} />
      </Box>
    </Paper>
  );
};

export default FormsPanel;
