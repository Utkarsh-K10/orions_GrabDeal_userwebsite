import React from "react";
import StarRatings from "react-star-ratings/build/star-ratings";

function Review({ rating, stars, recommendedvalue }) {
  const userRatings = () => {
    return (
      <div className="star5 d-flex flex-row mb-2">
        <div className="startype" style={{ color: "#f39c12" }}>
          5<i className="fas fa-star"></i>
        </div>
        <div className="progress w-100">
          <div
            className="progress-bar"
            role="progressbar"
            style={{ width: "25%", backgroundColor: "#f39c12" }}
            aria-valuenow="50"
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>
      </div>
    );
  };

  return (
    <div className="reviewSection container-fluid mt-5 mb-3 productPageSliderDiv">
      <h3 className=" productPageSliderHd">
        <strong>Reviews Section</strong>
      </h3>
      <div className="container-fluid mt-3 mb-3">
        <div className="row">
          <div className="col-sm-3 col-md-3">
            <h3 className="text-center colored">0 out of 5</h3>
            <StarRatings
              rating={stars}
              starRatedColor="##F99C00"
              numberOfStars={5}
              name="rating"
              starDimension="40px"
              starSpacing="10px"
            />
          </div>
          <div className="col-sm-6 col-md-6 ">{userRatings()}</div>
          <div className="col-sm-3 col-md-3">
            <div className="mb-2 mr-3 mt-5 text-center recomd align-middle">
              <strong>
                {recommendedvalue}%
                <br /> Recommended
              </strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Review;
