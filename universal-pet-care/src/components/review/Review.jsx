import React from "react";
import { UserType } from "../uitls/utilities";
import UserImage from "../common/UserImage";
import RatingStars from "../rating/RatingStars";

export default function Review({ review, userType }) {
  const displayName =
    userType === UserType.Patient
      ? `You rated Dr. ${review.vetName}`
      : `Reviewed by: ${review.patientName}`;

  return (
    <div className="mb-4">
      <div className="d-flex align-item-center me-5">
        {userType === UserType.VET ? (
          <UserImage
            userId={review.patientId}
            userPhoto={review.patientImage}
          />
        ) : (
          <UserImage userId={review.vetId} userPhoto={review.vetImage} />
        )}
        <div>
          <div>
            <h5 className="title ms-3">
              <RatingStars rating={review.stars} />
            </h5>
          </div>
          <div className="mt-4">
            <p className="review-text">{review.feedback}</p>
          </div>
          <div>
            <p className="ms-4">{displayName}</p>
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
}
