import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { IShowPopulated } from "../../api-logic/models/ShowModal";
import { selectUser } from "../../features/user/userSlice";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import Rating from "@mui/material/Rating";
import CommentIcon from "@mui/icons-material/Comment";
import Badge from "@mui/material/Badge";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import authAxios from "../../util/authAxios";
import { useSnackbar } from "notistack";
import { AxiosError } from "axios";
import { checkIfUnauthorized, handleError } from "../../util/util";
import { useRouter } from "next/router";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  addRating,
  removeRating,
  removeShow,
  setCurrentShow,
} from "../../features/shows/showsSlice";
import { IUser } from "../../api-logic/models/UserModal";

interface Props {
  show: IShowPopulated;
  edit?: boolean;
  className?: string;
}

const Header = ({ show, edit }: Props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const onEditClick = () => {
    dispatch(setCurrentShow(show));
    router.push(`/show/edit/${show._id}`);
  };

  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const onDeleteClick = async () => {
    setLoading(true);
    try {
      const response = await authAxios.post("/api/shows/delete", {
        id: show?._id,
      });
      enqueueSnackbar(response.data.message, {
        variant: "success",
      });
      dispatch(removeShow(show?._id));
    } catch (err) {
      handleError({
        err,
        enqueueSnackbar,
        router,
      });
    }
    setLoading(false);
  };

  return (
    <header className="flex justify-between items-center">
      <div className="flex flex-col">
        <span className="text-lg">{show.title}</span>
        <span className="text-sm text-slate-500">on {show.streamingApp}</span>
      </div>
      {edit ? (
        <div>
          <IconButton onClick={onEditClick}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={onDeleteClick} disabled={loading}>
            <DeleteIcon />
          </IconButton>
        </div>
      ) : (
        <Tooltip title={show.userId.username} className="cursor-pointer" arrow>
          <Avatar>{show.userId.username.charAt(0)}</Avatar>
        </Tooltip>
      )}
    </header>
  );
};

const Main = ({ imageURL, title }: { imageURL: string; title: string }) => {
  return (
    <main className="my-3">
      <picture>
        <source srcSet={imageURL} type="image/webp" />
        <img
          className="w-full h-[200px] object-contain"
          src={imageURL}
          alt={`${title} Image`}
        />
      </picture>
    </main>
  );
};

const Footer = ({ show, user }: { show: IShowPopulated; user: IUser }) => {
  const rating = Math.ceil(
    show.ratings?.reduce((prev, next) => {
      return prev + next.rating;
    }, 0)! / show.ratings?.length!
  );

  const reviews = show.reviews?.length || 0;

  const rated = show.ratings?.find((rating) => rating.userId === user?._id);
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const onRemoveRating = async () => {
    setLoading(true);
    try {
      const response = await authAxios.post("/api/rating/delete", {
        id: rated?._id!,
      });
      enqueueSnackbar("Rating Removed Successfully", {
        variant: "success",
      });
      dispatch(
        removeRating({
          _id: rated?._id!,
          showId: show._id,
        })
      );
    } catch (err) {
      handleError({
        err,
        enqueueSnackbar,
        router,
      });
    }
    setLoading(false);
  };

  const onAddRating = async (value: number) => {
    setLoading(true);
    try {
      const response = await authAxios.post("/api/rating/add", {
        showId: show._id,
        rating: value,
      });
      enqueueSnackbar("Rating Added Successfully", {
        variant: "success",
      });
      dispatch(
        addRating({
          ...response.data.data,
          userId: user._id,
        })
      );
    } catch (err) {
      handleError({
        err,
        enqueueSnackbar,
        router,
      });
    }
    setLoading(false);
  };

  const onCommentClick = () => {
    dispatch(setCurrentShow(show));
    router.push(`/show/detail/${show._id}`);
  };

  return (
    <footer className="flex justify-between">
      <div>
        <div className="flex items-center gap-1">
          <Rating
            name="size-small"
            value={rating}
            size="small"
            disabled={loading}
            onChange={(event, newValue) => onAddRating(newValue!)}
          />
          <span className="text-xs text-slate-500">
            ({show.ratings?.length || 0})
          </span>
        </div>
        <div>
          {rated && (
            <div>
              <span className="text-xs">You rated {rated.rating}</span>
              <IconButton onClick={onRemoveRating} disabled={loading}>
                <CloseIcon className="h-5 w-5" />
              </IconButton>
            </div>
          )}
        </div>
      </div>

      <IconButton onClick={onCommentClick}>
        <Badge color="info" badgeContent={reviews} showZero>
          <CommentIcon className="h-5 w-5" color="inherit" />
        </Badge>
      </IconButton>
    </footer>
  );
};

const Show = (props: Props) => {
  const user = useSelector(selectUser);
  const { edit, show, className } = props;

  return (
    <div className={`shadow-lg p-4 w-[300px] ${className}`}>
      <Header show={show} edit={user?._id === show.userId._id} />
      <Main imageURL={show.imageURL!} title={show?.title} />
      <Footer show={show} user={user!} />
    </div>
  );
};

export default Show;
