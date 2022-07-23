import React from "react";
import { useSelector } from "react-redux";
import type { IShowPopulated } from "../../api-logic/models/ShowModal";
import { selectUser } from "../../features/user/userSlice";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import Rating from "@mui/material/Rating";
import CommentIcon from "@mui/icons-material/Comment";
import Badge from "@mui/material/Badge";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";

interface Props {
  show: IShowPopulated;
  edit?: boolean;
  className?: string;
}

const Header = ({ show, edit }: Props) => {
  return (
    <header className="flex justify-between items-center">
      <div className="flex flex-col">
        <span className="text-lg">{show.title}</span>
        <span className="text-sm text-slate-500">on {show.streamingApp}</span>
      </div>
      {edit ? (
        <IconButton>
          <EditIcon />
        </IconButton>
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

const Footer = ({ show, userId }: { show: IShowPopulated; userId: string }) => {
  const rating = Math.ceil(
    show.ratings?.reduce((prev, next) => {
      return prev + next.rating;
    }, 0)! / show.ratings?.length!
  );

  const reviews = show.reviews?.length || 0;

  const rated = show.ratings?.find((rating) => rating.userId === userId);
  return (
    <footer className="flex justify-between">
      <div>
        <div className="flex items-center gap-1">
          <Rating name="size-small" value={rating} size="small" />
          <span className="text-xs text-slate-500">
            ({show.ratings?.length || 0})
          </span>
        </div>
        <div>
          {rated && (
            <div>
              <span className="text-xs">You rated {rated.rating}</span>
            </div>
          )}
        </div>
      </div>

      <Badge color="info" badgeContent={reviews} showZero>
        <CommentIcon className="h-5 w-5" color="inherit" />
      </Badge>
    </footer>
  );
};

const Show = (props: Props) => {
  const user = useSelector(selectUser);
  const { edit, show } = props;

  return (
    <div className="shadow-lg p-4 w-[300px]">
      <Header show={show} edit={edit} />
      <Main imageURL={show.imageURL!} title={show.title} />
      <Footer show={show} userId={user?.id!} />
    </div>
  );
};

export default Show;
