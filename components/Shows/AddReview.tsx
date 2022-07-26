import { Button, TextField } from "@mui/material";
import { AxiosError } from "axios";
import Joi from "joi";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import React, { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { updateReview } from "../../features/shows/showsSlice";
import authAxios from "../../util/authAxios";
import { checkIfUnauthorized, handleError, swap } from "../../util/util";

interface Props {
  showId: string;
  text: string;
  onSubmitCallback?: () => void;
}

const validateReviewText = Joi.string().max(255).required();

const AddReview = ({ showId, text, onSubmitCallback }: Props) => {
  const [reviewText, setReviewText] = useState(text);
  const [loading, setLoading] = useState(false);

  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const dispatch = useDispatch();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setLoading(true);

    e.preventDefault();
    const { error } = validateReviewText.validate(reviewText);

    if (error) {
      enqueueSnackbar(error.message, {
        variant: "error",
      });
      return;
    }
    try {
      const response = await authAxios.post("/api/review/add", {
        showId: showId,
        reviewText,
      });
      enqueueSnackbar(response.data.message, {
        variant: "success",
      });
      dispatch(updateReview(response.data.data));
    } catch (err) {
      handleError({
        err,
        enqueueSnackbar,
        router,
      });
    }
    if (onSubmitCallback) {
      onSubmitCallback();
    }
    setLoading(false);
  };

  return (
    <form className="my-2 space-y-2" onSubmit={onSubmit}>
      <TextField
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
        rows={5}
        multiline
        fullWidth
      />
      <div className="flex justify-end">
        <Button
          className="bg-blue-700 text-white"
          variant="contained"
          type="submit"
          disabled={loading}
        >
          Add
        </Button>
      </div>
    </form>
  );
};

export default AddReview;
