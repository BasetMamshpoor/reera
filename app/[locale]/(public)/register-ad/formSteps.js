// formSteps.js
export function renderFormStep({
  stepIndex,
  slug,
  categoryFlows,
  selectedCategory,
  apiResponseData,
  setApiResponseData,
  position,
  setPosition,
  setCurrentStep,
  positionClicked,
  setPositionClicked,
}) {
  const normalizedSlug = slugMap[slug] || slug || "default";
  const flow = categoryFlows[normalizedSlug];
  if (!flow || stepIndex < 0) return null;
  if (stepIndex >= flow.length) return <div>تمام مراحل انجام شد</div>;
  const { component: Comp, props = {} } = flow[stepIndex];
  if (Comp === LocationForm && !positionClicked)
    return <MapComponent setPositionClicked={setPositionClicked} />;

  return (
    <Comp
      {...props}
      apiResponseData={apiResponseData}
      setApiResponseData={setApiResponseData}
      selectedCategory={selectedCategory}
      setCurrentStep={setCurrentStep}
      setPosition={setPosition}
      position={position}
      setPositionClicked={setPositionClicked}
    />
  );
}
