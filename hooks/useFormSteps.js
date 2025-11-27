import { useState } from "react";

const flows = {
  housing: [
    "AdForm",
    "LocationForm",
    "Facilities",
    "UploadPics",
    "ContactInfo",
    "Conditions",
  ],
  digital: ["DigitalForm", "UploadPics", "ContactInfo", "Conditions"],
  default: ["AdForm", "ContactInfo", "Conditions"],
};

export function useFormSteps() {
  const [currentStep, setCurrentStep] = useState(1);
  const [currentFlow, setCurrentFlow] = useState(flows.default);
  const [apiResponseData, setApiResponseData] = useState(null);
  const [position, setPosition] = useState({
    latitude: 35.6892,
    longitude: 51.389,
  });
  const [positionClicked, setPositionClicked] = useState(false);

  return {
    currentStep,
    setCurrentStep,
    currentFlow,
    setCurrentFlow,
    apiResponseData,
    setApiResponseData,
    position,
    setPosition,
    positionClicked,
    setPositionClicked,
    flows,
  };
}
