import React from "react";
import { useSelector } from "react-redux";
import { IShowPopulated } from "../../api-logic/models/ShowModal";
import { selectUser } from "../../features/user/userSlice";
import AddReview from "./AddReview";
import Review from "./Review";
import Show from "./Show";

interface Props {
  show: IShowPopulated;
  className?: string;
}

const DetailShow = (props: Props) => {
  const { show, className } = props;
  const user = useSelector(selectUser);
  const reviewd = show.reviews.findIndex(
    (review) => review.userId === user?._id
  );

  let reviews = show.reviews;
  if (reviewd !== -1 && reviews.length > 1) {
    const Myobj = reviews[reviewd];
    reviews = [Myobj, ...reviews.filter((_, i) => i !== reviewd)];
  }

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="w-[800px] w-m-[90%] p-4 shadow-lg">
        <Show
          show={show}
          className={`w-m-[85%] shadow-none mx-auto !w-[750px]`}
        />
        {reviewd === -1 && <AddReview showId={show._id!} text={""} />}
        {reviews.map((review) => {
          return <Review key={review._id} review={review} />;
        })}
      </div>
    </div>
  );
};

export default DetailShow;
