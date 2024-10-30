import React from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

const UnAuthorized = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-center items-center h-[36rem]">
      <p className="text-xl font-bold">PLEASE LOG IN</p>
      <p>to continue</p>
      <img className="h-[20rem]" src="/login.svg" alt="login" />
      <Button
        variant={"outline"}
        className="px-12 py-2"
        onClick={() => navigate("/login")}
      >
        Login
      </Button>
    </div>
  );
};

export default UnAuthorized;
