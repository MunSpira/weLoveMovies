const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res, next) {
  let showing = req.query.is_showing;
  let data;

  showing
    ? (data = await service.listIsShowing())
    : (data = await service.list());

  res.json({ data: data });
}

async function movieExists(req, res, next) {
  const { movieId } = req.params;

  const movie = await service.read(movieId);
  if (movie) {
    res.locals.movie = movie;
    return next();
  }
  next({
    status: 404,
    message: "Movie cannot be found.",
  });
}

function read(req, res, next) {
  res.json({ data: res.locals.movie });
}

async function listTheaters(req, res, next) {
  const data = await service.listTheaters(res.locals.movie);
  res.json({ data: data });
}

async function listReviews(req, res, next) {
  const data = await service.listReviews(res.locals.movie);
  res.json({ data: data });
}

module.exports = {
  list: asyncErrorBoundary(list),
  read: [asyncErrorBoundary(movieExists), read],
  listTheaters: [
    asyncErrorBoundary(movieExists),
    asyncErrorBoundary(listTheaters),
  ],
  listReviews: [
    asyncErrorBoundary(movieExists),
    asyncErrorBoundary(listReviews),
  ],
};
