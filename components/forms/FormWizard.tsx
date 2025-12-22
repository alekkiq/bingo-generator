"use client";

import { useState } from "react";
import {
  Stepper,
  Step,
  StepButton,
  StepLabel,
  Typography,
  Button,
  Box,
  StepConnector,
  Icon,
  StepIconProps,
  Divider,
  Stack,
} from "@mui/material";
import {
  NavigateNext,
  NavigateBefore,
  Download,
  Done,
} from "@mui/icons-material";

export interface FormStep {
  label: string;
  icon?: any;
  component: React.ReactNode;
}

interface FormWizardProps {
  steps: FormStep[];
  onSubmit: CallableFunction;
  submitLabel?: string;
}

interface WizardStepIconProps extends StepIconProps {
  iconComponent: React.ElementType;
}

const WizardStepIcon: React.FC<WizardStepIconProps> = ({
  active,
  completed,
  iconComponent: Icon,
}) => {
  return (
    <Icon
      fontSize="small"
      color={active || completed ? "primary" : "disabled"}
    />
  );
};

const FormWizard: React.FC<FormWizardProps> = ({
  steps,
  onSubmit,
  submitLabel = "Generate",
}) => {
  const [activeStep, setActiveStep] = useState(0);

  const isLastStep = activeStep === steps.length - 1;

  const handleNext = () => {
    if (isLastStep) {
      onSubmit();
    } else {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => Math.max(prev - 1, 0));
  };

  return (
    <>
      <Stepper activeStep={activeStep}>
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepButton
              sx={{ paddingBlock: 1.5 }}
              onClick={() => setActiveStep(index)}
            >
              <StepLabel
                slots={{
                  stepIcon: (props) => (
                    <WizardStepIcon {...props} iconComponent={step.icon} />
                  ),
                }}
              >
                {step.label}
              </StepLabel>
            </StepButton>
          </Step>
        ))}
      </Stepper>

      <Divider sx={{ mt: 2 }} />

      <Stack spacing={2} sx={{ mt: 2 }}>
        {steps[activeStep].component}
      </Stack>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          pt: 3,
        }}
      >
        <Button
          color="inherit"
          disabled={activeStep === 0}
          onClick={handleBack}
          variant="contained"
          startIcon={<NavigateBefore />}
        >
          Back
        </Button>

        <Box sx={{ flex: "1 1 auto" }} />

        <Button
          variant="contained"
          onClick={handleNext}
          endIcon={isLastStep ? <Done /> : <NavigateNext />}
        >
          {isLastStep ? submitLabel : "Next"}
        </Button>
      </Box>
    </>
  );
};

export default FormWizard;
