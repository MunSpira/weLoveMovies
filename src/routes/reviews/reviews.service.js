const knex = require("../../db/connection");
const mapProperties = require("../../utils/map-properties");

const addCritic = mapProperties({
  c_critic_id: "critic.critic_id",
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
  c_created_at: "critic.created_at",
  c_updated_at: "critic.updated_at",
});

function update(updatedReview) {
  return knex("reviews as r")
    .select("*")
    .where({ "r.review_id": updatedReview.review_id })
    .update(updatedReview)
    .then((updatedReview) => updatedReview[0]);
}

function read(review_id) {
  return knex("reviews as r")
    .join("critics as c", "c.critic_id", "r.critic_id")
    .select(
      "r.*",
      "c.critic_id as critic_id",
      "c.preferred_name",
      "c.surname",
      "c.organization_name",
      "c.created_at as created_at",
      "c.updated_at as updated_at"
    )
    .where({ review_id })
    .first()
    .then(addCritic);
}

function destroy(reviewId) {
  return knex("reviews as r")
    .select("*")
    .where({ "r.review_id": reviewId })
    .first()
    .del();
}

module.exports = {
  update,
  read,
  delete: destroy,
};
