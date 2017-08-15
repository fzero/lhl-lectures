// NOTE: all functions receive a connected pg client as their first argument.

function findTracksByArtist(db, artist) {
  const query =
    `SELECT
      tracks.title AS title,
      albums.title AS album,
      artists.name AS artist
    FROM tracks
    JOIN albums ON tracks.album_id = albums.id
    JOIN artists ON albums.artist_id = artists.id
    WHERE artists.name = $1;`

  return db.query(query, [artist])
}


function findArtist(db, artist) {
  return db.query("SELECT * FROM artists WHERE name = $1;", [artist])
}


module.exports = {
  findArtist: findArtist,
  findTracksByArtist: findTracksByArtist
}
