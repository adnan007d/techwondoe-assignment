import { NextPage } from "next";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";

import authAxios from "../util/authAxios";
import { AxiosError } from "axios";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import PasswordField from "../components/PasswordField";
import { useRouter } from "next/router";
import { getToken, setToken } from "../util/util";
import joi from "joi";
import { useSnackbar } from "notistack";
import Link from "next/link";

const defaultFormData = {
  username: "",
  password: "",
};

const validateData = joi.object({
  username: joi.string().min(3).max(20).required(),
  password: joi.string().min(8).required(),
});

const Login: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    if (getToken()) {
      router.push("/");
    }
  }, [router]);

  const [formData, setFormData] = useState(defaultFormData);
  const { enqueueSnackbar } = useSnackbar();

  const [loading, setLoading] = useState(false);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { error } = validateData.validate(formData);

    if (error) {
      enqueueSnackbar(error.message, {
        variant: "error",
      });
      return;
    }

    setLoading(true);

    try {
      const response = await authAxios.post("/api/login", {
        username: formData.username,
        password: formData.password,
      });
      setToken(response.data.data.token);
      setLoading(false);
      enqueueSnackbar("Logged In Successfully", {
        variant: "success",
      });
      router.push("/");
    } catch (err) {
      if (err instanceof AxiosError) {
        enqueueSnackbar(err.response?.data.message, {
          variant: "error",
        });
      } else {
        console.error(err);
      }
    }
    setLoading(false);
  };

  return (
    <div>
      <div className="grid place-items-center min-h-screen">
        <form
          className="shadow-md shadow-[#1d1d1d66] flex flex-col space-y-3 rounded-md p-4"
          onSubmit={onSubmit}
        >
          <h3 className="text-center text-xl">Login</h3>

          <TextField
            name={"username"}
            value={formData.username}
            onChange={onChange}
            label="Username"
            variant="outlined"
          />
          <PasswordField
            className={""}
            name={"password"}
            onChange={onChange}
            label="Password"
            value={formData.password}
          />
          <div className="flex justify-end px-2">
            <Link href={"/signup"}>
              <span className="link">create an account ?</span>
            </Link>
          </div>
          <Button
            variant="contained"
            className="bg-blue-700"
            type="submit"
            disabled={loading}
          >
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
