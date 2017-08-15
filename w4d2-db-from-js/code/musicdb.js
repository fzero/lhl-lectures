function findTracksByArtist(client, artist, callback) {
  const query =
    `SELECT
      tracks.title AS title,
      albums.title AS album,
      artists.name AS artist
    FROM tracks
    JOIN albums ON tracks.album_id = albums.id
    JOIN artists ON albums.artist_id = artists.id
    WHERE artists.name = $1;`

  client.query(query, [artist],
    (err, result) => {
      if (err) {
        callback(err)
        return
      }
      callback(null, result.rows)
    }
  );
}


function findArtist(client, artist, callback) {
  client.query(
    "SELECT * FROM artists WHERE name = $1;",
    [artist],
    (err, result) => {
      if (err) {
        callback(err)
        return
      }
      callback(null, result.rows)
    }
  );
}


module.exports = {
  findArtist: findArtist,
  findTracksByArtist: findTracksByArtist
}
