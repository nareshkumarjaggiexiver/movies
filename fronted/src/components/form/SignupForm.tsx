"use client";

import React, { useState } from "react";
import InputField from "../global/InputField";
import Button from "../global/Button";
// import { axiosInstance } from "@/utils/apiconfig";
import axios from "axios";
import { axiosInstance } from "@/utils/apiconfig";
import { useRouter } from 'next/navigation'


const SignupForm = () => {
  const [data, setData] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });

  const router = useRouter()


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(data.email.length,data.password.length, "handleSumbitValue");

    if (data.email.length > 0 && data.password.length > 0) {
      try {
          const response = await axiosInstance.post(
            "/api/v1/authentication/login/",
            {
              email: data.email,
              password: data.password,
            }
          );
          console.log(response, "---------------")
         if(response.status === 200 && response?.data?.access.length > 0 ) {
            localStorage.setItem("accessToken",response.data.access)
            router.push('/add-new-movie')
         }
         
      } catch (error) {
        // Check if error is axios error type and set a user-friendly error message
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 401) {
            alert("Invalid credentials. Please try again.");
          } else {
            alert("An error occurred. Please try again later.");
          }
        } else {
          console.error("Unexpected Error:", error);
          alert("An unexpected error occurred.");
        }
      } 
    }
    else {
        alert("An error occurred. Please try again later.");
      }
  };

  return (
    <div className="flex justify-center items-center flex-col h-screen w-full px-4">
      <div>
        <h1 className="text-white text-6xl font-semibold">Sign in</h1>
      </div>
      <form className="mt-12 md:w-[20%] w-full" onSubmit={handleSubmit}>
        <div>
          <InputField
            type="email"
            placeholder="Email"
            onChange={handleChange}
            name="email"
          />
          <div className="mt-4">
            <InputField
              type="text"
              placeholder="Password"
              onChange={handleChange}
              name="password"
            />
          </div>
        </div>
        <div className="flex items-center gap-4 justify-center py-4">
          <input
            type="checkbox"
            className="h-4 w-4 appearance-none rounded-sm bg-[var(--color-input-bg)] "
          />
          <label className="text-white">Remember me</label>
        </div>
        <div className="mt-4">
          <Button backgroundColor="var(--color-primary)" type="submit">
            Login
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
