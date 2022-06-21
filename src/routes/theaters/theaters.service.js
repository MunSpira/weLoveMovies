const knex = require("../../db/connection")
const reduceProperties = require("../../utils/reduce-properties");

const reduceMovies = reduceProperties("theater_id",{
    m_movie_id:["movies", null, "movie_id"],
    m_title:["movies",null,"title"],
    m_runtime_in_minutes:["movies",null,"runtime_in_minutes"],
    m_rating:["movies", null, "rating"],
    m_description:["movies", null, "description"],
    m_image_url:["movies", null, "image_url"],
    m_created_at:["movies", null, "created_at"],
    m_updated_at:["movies", null, "updated_at"],
    mt_is_showing:["movies", null, "is_showing"],
    mt_theater_id:["movies", null, "theater_id"],
})
  
function listTheaters(){
    return knex("theaters as t")
        .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
        .join("movies as m", "m.movie_id", "mt.movie_id")
        .where({ "mt.is_showing": true })
        .select("t.*")
        .select("m.movie_id as m_movie_id")
        .select("m.title as m_title")
        .select("m.runtime_in_minutes as m_runtime_in_minutes")
        .select("m.rating as m_rating")
        .select("m.description as m_description")
        .select("m.image_url as m_image_url")
        .select("m.created_at as m_created_at")
        .select("m.updated_at as m_updated_at")
        .select("mt.is_showing as mt_is_showing")
        .select("mt.theater_id as mt_theater_id")
        .then(reduceMovies)
}

module.exports = {
list:listTheaters
}
