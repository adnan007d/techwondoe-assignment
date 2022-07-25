import { Button, TextField } from "@mui/material";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useSnackbar } from "notistack";

import joi from "joi";
import authAxios from "../../util/authAxios";
import { handleError } from "../../util/util";

import { useRouter } from "next/router";
import { IShowPopulated } from "../../api-logic/models/ShowModal";
import { useDispatch } from "react-redux";
import { updateShow, addShow } from "../../features/shows/showsSlice";

const validateData = joi.object({
  title: joi.string().label("Title").required(),
  streamingApp: joi.string().label("Streaming App").required(),
  imageURL: joi.string().allow("").label("Image Link").uri().optional(),
  _id: joi.optional(),
});

interface IFormData {
  title: string;
  streamingApp: string;
  imageURL?: string;
  _id?: string;
}

const defaultFormData: IFormData = {
  title: "",
  streamingApp: "",
  imageURL: "",
};

interface Props {
  show?: IShowPopulated;
}

const getRouteAndDataObject = (
  showId: string,
  formData: IFormData
): [string, IFormData] => {
  let route = "/api/shows";
  let dataObject: IFormData;
  if (showId) {
    dataObject = {
      title: formData.title,
      streamingApp: formData.streamingApp,
      imageURL: formData.imageURL || undefined,
      _id: showId,
    };
    route += "/update";
  } else {
    dataObject = {
      title: formData.title,
      streamingApp: formData.streamingApp,
      imageURL: formData.imageURL || undefined,
    };
    route += "/add";
  }

  return [route, dataObject];
};

const ShowForm = ({ show }: Props) => {
  const router = useRouter();
  const showId = show?._id;

  const [formData, setFormData] = useState<IFormData>(defaultFormData);
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);

  const formType = showId ? "Edit" : "Add";
  const dispatch = useDispatch();

  useEffect(() => {
    if (showId) {
      setFormData({
        title: show.title,
        streamingApp: show.streamingApp,
        imageURL: show.imageURL!,
      });
    }
  }, [showId, show]);

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

    const [route, dataObject] = getRouteAndDataObject(showId!, formData);

    try {
      const response = await authAxios.post(route, dataObject);
      enqueueSnackbar(response.data.message, {
        variant: "success",
      });
      if (showId) {
        dispatch(updateShow(response.data.data));
      } else {
        dispatch(addShow(response.data.data));
      }
    } catch (err) {
      handleError({ err, enqueueSnackbar, router });
    }
    setLoading(false);
  };

  return (
    <div>
      <form
        className="flex flex-col space-y-3 justify-center mt-20 w-11/12 mx-auto max-w-3xl p-4 shadow-2xl"
        onSubmit={onSubmit}
      >
        <div className="text-4xl text-center">{formType} Show</div>
        <div className="flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0">
          <TextField
            label="Title"
            name="title"
            value={formData.title}
            onChange={onChange}
            fullWidth
          />
          <TextField
            label="Streaming App"
            name="streamingApp"
            value={formData.streamingApp}
            onChange={onChange}
            fullWidth
          />
        </div>
        <TextField
          label="Image Link (optional)"
          name="imageURL"
          value={formData.imageURL}
          onChange={onChange}
          fullWidth
        />
        <div>{/* For Image Display */}</div>

        <Button
          className="bg-blue-700"
          variant="contained"
          type="submit"
          disabled={loading}
        >
          {formType}
        </Button>
      </form>
    </div>
  );
};

export default ShowForm;
