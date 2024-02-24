"use client";

import { Input, InputTypes } from "@/UI/Input";
import React, { useState } from "react";
import { loginWithEmailAndPassword } from "@/firebase/login";
import styled from "styled-components";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const Button = styled.button`
  width: 100%;
  padding: 0.8rem;
  border-radius: 5px;
  border: 0;
  cursor: pointer;
  font-size: 1rem;
  color: var(--black);
  font-weight: 700;
  background-color: var(--button-background-color);
  transition: all 0.2s ease-in-out;
`;

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const onSubmit = (e: any) => {
    setLoading(true);
    e.preventDefault();
    loginWithEmailAndPassword({
      email,
      password,
      onSuccess: () => {
        setLoading(false);
        router.push("/admin");
        toast.success("logged in successfully");
      },
      onError: (error) => {
        setLoading(false);
        toast.success("something went wrong!, try again later");
      },
    });
  };

  return (
    <form onSubmit={onSubmit} className="login__page__inputWrapper">
      <Input
        name="email"
        type={InputTypes.TEXT}
        label={"Enter Email"}
        value={email}
        onChange={(e: any) => setEmail(e?.target?.value)}
        required
      />
      <Input
        name="password"
        type={InputTypes.PASSWORD}
        label={"Enter Password"}
        value={password}
        onChange={(e: any) => setPassword(e?.target?.value)}
        required
      />
      <Button
        disabled={loading}
        className={loading ? "loading" : ""}
        type="submit"
      >
        Submit
      </Button>
    </form>
  );
};
