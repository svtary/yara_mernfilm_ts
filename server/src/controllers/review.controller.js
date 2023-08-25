import responseHandler from "../handlers/response.handler.js";
import reviewModel from "../models/review.model.js";

const create = async (req, res) => {
  try {
    console.log("reviewro", req.body.contentstyle.style);
    // console.log("stylewwww", req.contentstyle);
    const { movieId } = req.params;
    console.log("stylewreqid", req.params);

    const review = new reviewModel({
      user: req.user.id,
      movieId,
      contentstyle: req.body.contentstyle,
      ...req.body,
    });
    // console.log("stylewwww", req.contentstyle);

    await review.save();
    // console.log("style", req);

    responseHandler.created(res, {
      ...review._doc,
      id: review.id,
      user: req.user,
      contentstyle: req.body.contentstyle,
    });
  } catch {
    responseHandler.error(res);
  }
};

const remove = async (req, res) => {
  try {
    const { reviewId } = req.params;

    const review = await reviewModel.findOne({
      _id: reviewId,
      user: req.user.id,
    });

    if (!review) return responseHandler.notfound(res);

    await review.remove();

    responseHandler.ok(res);
  } catch {
    responseHandler.error(res);
  }
};

const getReviewsOfUser = async (req, res) => {
  try {
    console.log("req", req.contentstyle);
    const reviews = await reviewModel
      .find({
        user: req.user.id,
      })
      .sort("-createdAt");
    // console.log("server", reviews);

    responseHandler.ok(res, reviews);
  } catch {
    responseHandler.error(res);
  }
};

export default { create, remove, getReviewsOfUser };
