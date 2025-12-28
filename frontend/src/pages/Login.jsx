import React, { useState, useEffect, useRef } from "react";
import OtpInput from "../components/OtpInput";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otpLength] = useState(4);

  // Refs for input fields
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  // Focus on email field on mount
  useEffect(() => {
    if (emailRef.current) emailRef.current.focus();
  }, []);

  // Validation: email format and password length
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password) => password.length >= 8;

  const handleEmailChange = (e) => {
    const value = e.target.value.trim();
    setEmail(value);
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      alert("Please enter a valid email address.");
      emailRef.current.focus();
      return;
    }

    if (!validatePassword(password)) {
      alert("Password must be at least 8 characters long.");
      passwordRef.current.focus();
      return;
    }

    setShowOtpInput(true);
  };

  const handleBackClick = () => {
    setShowOtpInput(false);
    setEmail("");
    setPassword("");
    if (emailRef.current) emailRef.current.focus();
  };

  return (
    <section className="bg-gray-50 flex flex-col items-center p-8">
      <div className="flex min-h-screen flex-col justify-start max-w-3xl w-full bg-white shadow-lg rounded-2xl p-8 md:p-12">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h1 className="py-8 text-3xl tracking-wider font-semibold text-center">
            Login
          </h1>
          <p className="w-full text-center font-medium text-lg">
            Enter your credentials to continue
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit}>
            <div className="mt-2 flex flex-col gap-4">
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Enter email"
                required
                ref={emailRef}
                value={email}
                onChange={handleEmailChange}
                className="block w-full bg-gray-300/5 p-4 text-base outline-1 -outline-offset-1 outline-(--color-primary)/20 
                             placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 
                             focus:outline-(--color-primary) focus:bg-white/5 sm:text-base/6"
              />
              <input
                id="password"
                type="password"
                name="password"
                minLength={8}
                placeholder="Enter password"
                required
                ref={passwordRef}
                value={password}
                onChange={handlePasswordChange}
                className="block w-full bg-gray-300/5 p-4 text-base outline-1 -outline-offset-1 
                             outline-(--color-primary)/20 placeholder:text-gray-500 focus:outline-2 
                             focus:-outline-offset-2 focus:outline-(--color-primary) focus:bg-white/5 sm:text-base/6"
              />
            </div>
            <button
              type="submit"
              id="get-otp-btn"
              className="flex w-full justify-center mt-5 bg-(--color-primary) p-4 
                               text-base/6 font-semibold text-(--color-secondary) 
                               hover:bg-(--color-topbar) transition-colors ease-in-out duration-300"
            >
              Sign In
            </button>
            <p className="text-center text-sm sm:mx-auto sm:w-full sm:max-w-sm py-4">
              By proceeding you confirm that you are above 18 years of age and
              agree to the{" "}
              <a href="#" className="font-bold">
                Privacy Policy
              </a>{" "}
              and{" "}
              <a href="#" className="font-bold">
                Terms of Use
              </a>
              .
            </p>
          </form>
          {/* <OtpInput
            otpLength={otpLength}
            handleBackClick={handleBackClick}
            email={email}
          /> */}
        </div>
      </div>
    </section>
  );
};

export default Login;
