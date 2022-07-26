import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";
import moment from "moment";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IReview } from "../../api-logic/models/ReviewModal";
import { removeReview } from "../../features/shows/showsSlice";
import { selectUser } from "../../features/user/userSlice";
import authAxios from "../../util/authAxios";
import { handleError } from "../../util/util";
import AddReview from "./AddReview";

interface Props {
  review: IReview;
  edit?: boolean;
}

interface IReadReview {
  setEdit: (value: boolean) => void;
  review: IReview;
}

const ReadReview = ({ setEdit, review }: IReadReview) => {
  const user = useSelector(selectUser);

  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const onDeleteReview = async () => {
    try {
      const response = await authAxios.post(`/api/review/delete/`, {
        id: review._id,
      });
      enqueueSnackbar(response.data.message, {
        variant: "success",
      });
      dispatch(
        removeReview({
          _id: review._id,
          showId: review.showId,
        })
      );
    } catch (err) {
      handleError({ err, enqueueSnackbar, router });
    }
  };

  return (
    <div className="flex justify-between">
      <div>
        {review.reviewText} <br />{" "}
        <span className="text-slate-500 text-xs flex justify-end mr-2">
          {review.createdAt === review.updatedAt ? "Created" : "Edited"}{" "}
          {moment(review.updatedAt).fromNow()}
        </span>
      </div>
      {user?._id === review.userId && (
        <div className="flex">
          <IconButton onClick={() => setEdit(true)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={onDeleteReview}>
            <DeleteIcon />
          </IconButton>
        </div>
      )}
    </div>
  );
};

const Review = ({ review }: Props) => {
  const [edit, setEdit] = useState(false);
  const setEditFalse = () => {
    setEdit(false);
  };
  return (
    <div>
      {edit ? (
        <AddReview
          showId={review.showId}
          text={review.reviewText}
          onSubmitCallback={setEditFalse}
        />
      ) : (
        <ReadReview review={review} setEdit={setEdit} />
      )}
    </div>
  );
};

export default Review;
