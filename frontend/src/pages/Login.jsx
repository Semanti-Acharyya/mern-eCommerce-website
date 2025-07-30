import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);

  // State variables for form inputs
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (event) => {
    // doing this to prevent the default form submission behavior
    event.preventDefault();
    try {
      // if the current state is "Sign Up", we will register the user
      if (currentState === "Sign Up") {
        const response = await axios.post(backendUrl + "/api/users/register", {
          name,
          email,
          password,
        });
        // if the response is successful, we will set the token and navigate to the home page
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
        }
        // if the response is not successful, we will show an error message
        else {
          // toast.error("User already exists or invalid credentials!");
          toast.error(error.message);
        }
      }
      // if the current state is "Login", we will log in the user
      else {
        const response = await axios.post(backendUrl + "/api/users/login", {
          email,
          password,
        });
        // if the response is successful, we will set the token and navigate to the home page
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
        }
        // if the response is not successful, we will show an error message
        else {
          // toast.error("Invalid credentials!");
          toast.error(error.message);
        }
      }
    } catch (error) {
      // if there is an error, we will show an error message
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    // if the token is set, we will navigate to the home page
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>
      {currentState === "Login" ? (
        ""
      ) : (
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Name"
          required
        />
      )}
      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="email"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Email Address"
        required
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type="password"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Password"
        required
      />
      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <p className="cursor-pointer">Forgot your password?</p>
        {currentState === "Login" ? (
          <p
            onClick={() => setCurrentState("Sign Up")}
            className="cursor pointer"
          >
            Create Account
          </p>
        ) : (
          <p
            onClick={() => setCurrentState("Login")}
            className="cursor pointer"
          >
            Login Here
          </p>
        )}
      </div>
      <button className="bg-black text-white font-light px-8 py-2 mt-4">
        {currentState === "Login" ? "Sign In" : "Sign Up"}
      </button>
    </form>
  );
};

export default Login;
