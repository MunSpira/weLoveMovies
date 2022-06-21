const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function reviewExists(req, res, next) {
  const { reviewId } = req.params;
  const review = await service.read(reviewId);

  if (review) {
    res.locals.review = review;
    return next();
  }

  return next({
    status: 404,
    message: "Review cannot be found",
  });
}
async function update(req, res, next) {
  const review = res.locals.review.review_id;
  const updatedReview = { ...req.body.data, review_id: review };
  await service.update(updatedReview);
  res.json({ data: await service.read(review) });
}

async function destroy(req, res, next) {
  const { review } = res.locals;
  await service.delete(review.review_id);
  res.sendStatus(204);
}

module.exports = {
  update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)],
  delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
};
