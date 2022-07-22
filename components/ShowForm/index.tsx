import { Button, TextField } from "@mui/material";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { useSnackbar } from "notistack";

import joi from "joi";
import authAxios from "../../util/authAxios";
import { AxiosError } from "axios";
import { checkIfUnauthorized } from "../../util/util";

import { useRouter } from "next/router";

const validateData = joi.object({
  title: joi.string().label("Title").required(),
  streamingApp: joi.string().label("Streaming App").required(),
  imageURL: joi.string().allow("").label("Image Link").uri().optional(),
  _id: joi.optional(),
});

interface IFormData {
  title: string;
  streamingApp: string;
  imageURL: string;
}

const defaultFormData: IFormData = {
  title: "",
  streamingApp: "",
  imageURL: "",
};

const ShowForm = () => {
  const router = useRouter();

  const [formData, setFormData] = useState<IFormData>(defaultFormData);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
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
      const response = await authAxios.post("/api/shows/add", {
        title: formData.title,
        streamingApp: formData.streamingApp,
        imageURL: formData.imageURL || undefined,
      });
      setLoading(false);
      enqueueSnackbar("Show Added Successfully", {
        variant: "success",
      });
    } catch (err) {
      if (err instanceof AxiosError) {
        enqueueSnackbar(err.response?.data.message, {
          variant: "error",
        });
        if (checkIfUnauthorized(err)) {
          router.push("/login");
        }
      } else {
        console.error(err);
        enqueueSnackbar("Something went Wrong", {
          variant: "error",
        });
      }
    }
    setLoading(false);
  };

  return (
    <div>
      <form
        className="flex flex-col space-y-3 justify-center mt-20 w-11/12 mx-auto max-w-3xl p-4 shadow-2xl"
        onSubmit={onSubmit}
      >
        <div className="text-4xl text-center">Add a Show</div>
        <div className="flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0">
          <TextField
            label="Title"
            name="title"
            value={formData.title}
            onChange={onChange}
            fullWidth
          />
          <TextField
            label="Streaming App (optional)"
            name="streamingApp"
            value={formData.streamingApp}
            onChange={onChange}
            fullWidth
          />
        </div>
        <TextField
          label="Image Link"
          name="imageURL"
          value={formData.imageURL}
          onChange={onChange}
          fullWidth
        />
        <div>{/* For Image Display */}</div>

        <Button className="bg-blue-700" variant="contained" type="submit">
          Add Show
        </Button>
      </form>
    </div>
  );
};

export default ShowForm;
