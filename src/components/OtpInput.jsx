import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const OtpInput = ({ otpLength = 4, handleBackClick, phoneNumber }) => {
  const [otp, setOtp] = useState(new Array(otpLength).fill(""));
  const [showContinueBtn, setShowContinueBtn] = useState(false);
  const [globIndex, setGlobIndex] = useState(0);
  const inputRefs = useRef([]);
  const [timeLeft, setTimeLeft] = useState(60); // seconds
  const [isActive, setIsActive] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Focus the first input when component mounts
    inputRefs.current[0].focus();
  }, []);

  useEffect(() => {
    let timer;
    if (isActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
    }
    return () => clearInterval(timer);
  }, [isActive, timeLeft]);

  const handleResend = () => {
    // You can call your resend OTP API here
    setTimeLeft(60);
    setIsActive(true);
  };

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${mins}:${secs}`;
  };

  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    const enteredNum = value.replace(/\D/g, ""); // Remove non-digit characters
    const newOtp = [...otp];
    newOtp[index] = enteredNum;
    setOtp(newOtp);
    setGlobIndex(newOtp.indexOf(""));
    // Move focus to next input if a digit was entered
    if (enteredNum && index < otpLength - 1) {
      inputRefs.current[index + 1].focus();
    }

    // If all inputs are filled, you can handle OTP submission here
    setShowContinueBtn(newOtp.every((digit) => digit !== ""));
  };
  const handleOtpClick = (e, index) => {
    inputRefs.current[index].focus();
  };
  const handleOtpKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (otp[index] === "" && index > 0) {
        // delete previous value and move focus
        const newOtp = [...otp];
        newOtp[index - 1] = "";
        setOtp(newOtp);
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    // alert("OTP Submitted: " + otp.join(""));
    navigate("/dashboard", { state: { phoneNumber } });
  };

  return (
    <div>
      <form action="#" method="POST">
        <div>
          <a
            href="#"
            className="inline-flex justify-around gap-2 font-sm items-center"
          >
            <FaArrowLeft className="h-4" />{" "}
            <span onClick={handleBackClick}>Back</span>
          </a>
          <label
            htmlFor={`otp-${globIndex}`}
            className="block py-4 text-lg font-medium"
          >
            Enter OTP
          </label>
          <div className="otp mt-2 flex flex-row items-center gap-2">
            {otp.map((value, index) => {
              return (
                <input
                  key={index}
                  type="text"
                  id={`otp-${index}`}
                  name={`otp-${index}`}
                  ref={(el) => (inputRefs.current[index] = el)}
                  value={value}
                  maxLength={1}
                  required
                  onChange={(e) => handleOtpChange(e, index)}
                  onClick={(e) => handleOtpClick(e, index)}
                  onKeyDown={(e) => handleOtpKeyDown(e, index)}
                  className="block w-full bg-gray-300/5 p-4 text-base outline-1 -outline-offset-1 outline-(--color-primary)/20 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-(--color-primary) focus:bg-white/5 sm:text-base/6 text-center"
                />
              );
            })}
          </div>
          <div className="mt-5 font-base">
            {isActive ? (
              <p>
                Resend OTP in <strong>{formatTime(timeLeft)}</strong>
              </p>
            ) : (
              <button
                onClick={handleResend}
                className="bg-none border-0 text-(--color-primary) cursor-pointer font-bold"
              >
                Resend OTP
              </button>
            )}
          </div>

          <button
            type="submit"
            id="get-otp-btn"
            hidden={!showContinueBtn}
            onClick={handleOtpSubmit}
            className="flex w-full justify-center mt-5 bg-(--color-primary) p-4 text-base/6 font-semibold text-(--color-secondary) hover:bg-(--color-topbar) hover:cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-topbar) transition-colors ease-in-out duration-300"
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default OtpInput;
