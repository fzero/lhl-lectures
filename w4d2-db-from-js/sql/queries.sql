-- all tracks, with artist name and album name

SELECT
  tracks.title AS title,
  albums.title AS album,
  artists.name AS artist
FROM tracks
JOIN albums ON tracks.album_id = albums.id
JOIN artists ON albums.artist_id = artists.id;


-- same as above
-- using WHERE to specify an IMPLICIT JOIN

SELECT
  tracks.title AS title,
  albums.title AS album,
  artists.name AS artist
FROM tracks, albums, artists
WHERE albums.artist_id = artists.id AND tracks.album_id = albums.id;


-- all artists with tags

SELECT
  artists.name AS artist,
  GROUP_CONCAT(tags.name) AS tag
FROM artists, tags
JOIN artists_tags AS at ON at.artist_id = artists.id AND at.tag_id = tags.id
GROUP BY artists.id;


-- # of albums per artist

SELECT
  artists.name as artist,
  COUNT(albums.id) as album_count
FROM artists
JOIN albums ON albums.artist_id = artists.id
GROUP BY artists.id;


-- # of albums per artist
-- who have more than 2 albums, in descending order

SELECT
  artists.name as artist,
  COUNT(albums.id) as album_count
FROM artists
JOIN albums ON albums.artist_id = artists.id
GROUP BY artists.id
HAVING album_count >= 2
ORDER BY album_count DESC;


-- average tracks per album

SELECT COUNT(distinct tracks.id) / COUNT(distinct albums.id) AS average
FROM albums, tracks;


-- same as above
-- but using an implicit JOIN instead of DISTINCT

SELECT COUNT(tracks.id) / COUNT(distinct albums.id) AS avg
FROM albums, tracks
WHERE tracks.album_id = albums.id;


-- average number of tracks in albums of each tag, in order

SELECT
  tags.name as tag,
  COUNT(tracks.id) / COUNT(distinct albums.id) AS avg
FROM tags, artists
JOIN artists_tags AS at ON at.artist_id = artists.id AND at.tag_id = tags.id
JOIN albums ON albums.artist_id = artists.id
JOIN tracks ON albums.id = tracks.album_id
GROUP BY tags.id
ORDER BY avg DESC;















