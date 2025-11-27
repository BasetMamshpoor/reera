import React from "react";
import Otp from "./Otp";
import PhoneEnter from "./PhoneEnter";

const Login = () => {
  const [step, setStep] = React.useState("phone");
  const [phoneNumber, setPhoneNumber] = React.useState("");

  return (
    <>
      {step === "phone" ? (
        <PhoneEnter
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
          setStep={setStep}
        />
      ) : (
        <>
          <Otp phoneNumber={phoneNumber} />
        </>
      )}
    </>
  );
};

export default Login;
