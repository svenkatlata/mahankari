import React, { useState, useEffect } from "react";
import OtpInput from "../components/OtpInput";

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showOtpBtn, setShowOtpBtn] = useState(false);
  const [showOtpInput, setshowOtpInput] = useState(false);
  const [otpLength, setOtpLength] = useState(4);

  useEffect(() => {
    document.getElementById("phoneNum").focus();
  }, []);

  const handlePhoneNumChange = (e) => {
    const input = e.target.value;
    const enteredNums = input.replace(/\D/g, "");
    setPhoneNumber(enteredNums);
    setShowOtpBtn(enteredNums.length === 10);
  };

  const handlePhoneNumSubmit = (e) => {
    e.preventDefault();
    setshowOtpInput(true);
  };

  const handleBackClick = () => {
    setshowOtpInput(false);
    setPhoneNumber("");
    setShowOtpBtn(false);
    document.getElementById("phoneNum").focus();
  };

  // const [mobile, setMobile] = useState('');
  // const [otpBtnVisibility, setOtpBtnVisibility] = useState(false);
  // const [onOtpBtn, setOnOtpBtn] = useState(false);

  // const onMobileChange = (e) => {
  //   const input = e.target.value;
  //   const enteredNums = input.replace(/\D/g, '');
  //   setMobile(enteredNums);
  //   setOtpBtnVisibility(enteredNums.length === 10);
  // };

  // const onOtpBtnClick = (e) => {
  //   e.preventDefault();
  //   setOnOtpBtn(true);
  // };

  // const onContinueClick = (e) => {
  //   e.preventDefault();
  //   alert('Logged in successfully!');
  // };

  return (
    <section className="pt-40">
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h1 className="py-10 text-center text-4xl/9 text-(--color-primary)">
            Login
          </h1>
        </div>
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          {!showOtpInput ? (
            <form action="#" method="POST">
              <div>
                <label
                  htmlFor="phoneNum"
                  className="block py-4 text-lg text-(--color-primary) font-medium"
                >
                  Enter phone number
                </label>
                <div className="mt-2 flex flex-row items-center gap-2">
                  <input
                    id="phoneNumCode"
                    type="text"
                    name="phoneNumCode"
                    maxLength={4}
                    disabled
                    value={"+91"}
                    className="block w-18 rounded-md bg-gray-300/5 p-4 text-base outline-1 -outline-offset-1 outline-(--color-primary)/20 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-(--color-primary) focus:bg-white/5 sm:text-base/6 text-center"
                  />
                  <input
                    id="phoneNum"
                    type="text"
                    name="phoneNum"
                    maxLength={10}
                    onChange={handlePhoneNumChange}
                    required
                    value={phoneNumber}
                    className="block w-full rounded-md bg-gray-300/5 p-4 text-base outline-1 -outline-offset-1 outline-(--color-primary)/20 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-(--color-primary) focus:bg-white/5 sm:text-base/6"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  id="get-otp-btn"
                  onClick={handlePhoneNumSubmit}
                  hidden={!showOtpBtn}
                  className="flex w-full justify-center mt-5 rounded-md bg-(--color-primary) p-4 text-base/6 font-semibold text-(--color-secondary) hover:bg-(--color-topbar) hover:cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-topbar) transition-colors ease-in-out duration-300"
                >
                  Get OTP
                </button>
                <p className="text-center text-sm text-(--color-primary) sm:mx-auto sm:w-full sm:max-w-sm py-4">
                  *We recommend using your{" "}
                  <span className="font-bold">WhatsApp</span> number to Sign up
                  or Login so we can share order updates with you. By proceeding
                  you confirm that you are above 18 years of age and agree to
                  the{" "}
                  <a href="#" className="font-bold">
                    Privacy Policy
                  </a>{" "}
                  and{" "}
                  <a href="#" className="font-bold">
                    Terms of Use
                  </a>
                  .
                </p>
              </div>
            </form>
          ) : (
            <OtpInput otpLength={otpLength} handleBackClick={handleBackClick} />
          )}
        </div>
        {/* {onOtpBtn && renderOTP()} */}
      </div>
    </section>
  );
};

export default Login;
