const knex = require("../../db/connection")
const mapProperties = require("../../utils/map-properties")


function list(){
   return knex("movies")
   .select("*")
}

function listIsShowing(){
return knex("movies as m")
.select("m.*")
.join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
.groupBy("m.movie_id")
.where({"mt.is_showing":true})

}

function read(movieId){
    return knex("movies as m")
    .select("*")
    .where({"m.movie_id":movieId})
    .first()
}

function listTheaters({movie_id}){
    return knex("movies_theaters as mt")
    .where({"mt.movie_id":movie_id})
    .join("theaters as t", "t.theater_id", "mt.theater_id")
    .select("t.*", "mt.movie_id","mt.is_showing")
}

    function mapReviewsProperties(reviews){
return reviews.map(mapProperties({
    critic_id: "critic.critic_id",
    preferred_name: "critic.preferred_name",
    surname:"critic.surname",
    organization_name:"critic.organization_name",
    created_at:"critic.created_at",
    updated_at:"critic.updated-at"
}))
    }
function listReviews({movie_id}){
    return knex("reviews as r")
    .join("critics as c", "c.critic_id", "r.critic_id")
    .select("r.review_id")
    .select("r.content")
    .select("r.score")
    .select("r.created_at")
    .select("r.updated_at")
    .select("r.critic_id")
    .select("r.movie_id")
    .select("c.*")
    .where({"r.movie_id":movie_id})
    .then(mapReviewsProperties)
  
}


module.exports = {
    list,
    listIsShowing,
    read,
    listTheaters,
    listReviews
}