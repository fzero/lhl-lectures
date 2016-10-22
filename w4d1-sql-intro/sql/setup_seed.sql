-- Schema creation

-- First delete tables if they already exist

DROP TABLE IF EXISTS artists;
DROP TABLE IF EXISTS albums;
DROP TABLE IF EXISTS tracks;
DROP TABLE IF EXISTS tags;
DROP TABLE IF EXISTS artists_tags;


-- Create tables

CREATE TABLE artists (
  id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  name VARCHAR(50) NOT NULL
);

CREATE TABLE albums (
  id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  title VARCHAR(50) NOT NULL,
  year INTEGER NOT NULL,
  artist_id INTEGER NOT NULL REFERENCES artists(id) ON DELETE CASCADE
);

CREATE TABLE tracks (
  id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  title VARCHAR(50) NOT NULL,
  number INTEGER NOT NULL,
  album_id INTEGER NOT NULL REFERENCES albums(id) ON DELETE CASCADE
);

CREATE TABLE tags (
  id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  name VARCHAR(50) NOT NULL
);

CREATE TABLE artists_tags (
  artist_id INTEGER NOT NULL REFERENCES artists(id) ON DELETE CASCADE,
  tag_id INTEGER NOT NULL REFERENCES tags(id) ON DELETE CASCADE
);


-- Seed data

INSERT INTO "tags" (id, name) VALUES(1, "post-rock");
INSERT INTO "tags" (id, name) VALUES(2, "instrumental");
INSERT INTO "tags" (id, name) VALUES(3, "electronic");
INSERT INTO "tags" (id, name) VALUES(4, "dance");

INSERT INTO "artists" (id, name) VALUES(1, "Explosions in the Sky");

INSERT INTO "artists_tags" (artist_id, tag_id) VALUES(1,1);
INSERT INTO "artists_tags" (artist_id, tag_id) VALUES(1,2);

INSERT INTO "albums" (id, title, year, artist_id) VALUES(1, "The Earth is not a Cold Dead Place", 2003, 1);

INSERT INTO "tracks" (title, number, album_id) VALUES ("First Breath After Coma", 1, 1);
INSERT INTO "tracks" (title, number, album_id) VALUES ("The Only Moment We Were Alone", 2, 1);
INSERT INTO "tracks" (title, number, album_id) VALUES ("Six Days at the Bottom of the Ocean", 3, 1);
INSERT INTO "tracks" (title, number, album_id) VALUES ("Memorial", 4, 1);
INSERT INTO "tracks" (title, number, album_id) VALUES ("Your Hand in Mine", 5, 1);

INSERT INTO "albums" (id, title, year, artist_id) VALUES (2, "All of a Sudden I Miss Everyone", 2007, 1);

INSERT INTO "tracks" (title, number, album_id) VALUES ("The Birth and Death of the Day", 1, 2);
INSERT INTO "tracks" (title, number, album_id) VALUES ("Welcome, Ghosts", 2, 2);
INSERT INTO "tracks" (title, number, album_id) VALUES ("It's Natural To Be Afraid", 3, 2);
INSERT INTO "tracks" (title, number, album_id) VALUES ("What Do You Go Home To?", 4, 2);
INSERT INTO "tracks" (title, number, album_id) VALUES ("Catastrophe and the Cure", 5, 2);
INSERT INTO "tracks" (title, number, album_id) VALUES ("So Long, Lonesome", 6, 2);

INSERT INTO "artists" (id, name) VALUES(2, "God is an Astronaut");

INSERT INTO "artists_tags" (artist_id, tag_id) VALUES(2,1);
INSERT INTO "artists_tags" (artist_id, tag_id) VALUES(2,2);

INSERT INTO "albums" (id, title, year, artist_id) VALUES (3, "All is Violent, All is Bright", 2005, 2);

INSERT INTO "tracks" (title, number, album_id) VALUES ("Fragile", 1, 3);
INSERT INTO "tracks" (title, number, album_id) VALUES ("All is Violent, All is Bright", 2, 3);
INSERT INTO "tracks" (title, number, album_id) VALUES ("Forever Lost", 3, 3);
INSERT INTO "tracks" (title, number, album_id) VALUES ("Fireflies and Empty Skies", 4, 3);
INSERT INTO "tracks" (title, number, album_id) VALUES ("A Deafening Distance", 5, 3);
INSERT INTO "tracks" (title, number, album_id) VALUES ("Infinite Horizons", 6, 3);
INSERT INTO "tracks" (title, number, album_id) VALUES ("Suicide by Star", 7, 3);
INSERT INTO "tracks" (title, number, album_id) VALUES ("Remembrance Day", 8, 3);
INSERT INTO "tracks" (title, number, album_id) VALUES ("Dust and Echoes", 9, 3);
INSERT INTO "tracks" (title, number, album_id) VALUES ("When Everything Dies", 10, 3);

INSERT INTO "artists" (id, name) VALUES(3, "Ratatat");

INSERT INTO "artists_tags" (artist_id, tag_id) VALUES(3,2);
INSERT INTO "artists_tags" (artist_id, tag_id) VALUES(3,3);

INSERT INTO "albums" (id, title, year, artist_id) VALUES (4, "Classics", 2006, 3);

INSERT INTO "tracks" (title, number, album_id) VALUES ("Montanita", 1, 4);
INSERT INTO "tracks" (title, number, album_id) VALUES ("Lex", 2, 4);
INSERT INTO "tracks" (title, number, album_id) VALUES ("Gettysburg", 3, 4);
INSERT INTO "tracks" (title, number, album_id) VALUES ("Wildcat", 4, 4);
INSERT INTO "tracks" (title, number, album_id) VALUES ("Tropicana", 5, 4);
INSERT INTO "tracks" (title, number, album_id) VALUES ("Loud Pipes", 6, 4);
INSERT INTO "tracks" (title, number, album_id) VALUES ("Nostrand", 7, 4);
INSERT INTO "tracks" (title, number, album_id) VALUES ("Swisha", 8, 4);
INSERT INTO "tracks" (title, number, album_id) VALUES ("Kennedy", 9, 4);
INSERT INTO "tracks" (title, number, album_id) VALUES ("Tacobel Canon", 10, 4);

INSERT INTO "artists" (id, name) VALUES(4, "Daft Punk");

INSERT INTO "artists_tags" (artist_id, tag_id) VALUES(4,3);
INSERT INTO "artists_tags" (artist_id, tag_id) VALUES(4,4);

INSERT INTO "albums" (id, title, year, artist_id) VALUES (5, "Discovery", 2001, 4);

INSERT INTO "tracks" (title, number, album_id) VALUES ("One More Time", 1, 5);
INSERT INTO "tracks" (title, number, album_id) VALUES ("Aerodynamic", 2, 5);
INSERT INTO "tracks" (title, number, album_id) VALUES ("Digital Love", 3, 5);
INSERT INTO "tracks" (title, number, album_id) VALUES ("Harder, Better, Faster, Stronger", 4, 5);
INSERT INTO "tracks" (title, number, album_id) VALUES ("Crescendolls", 5, 5);
INSERT INTO "tracks" (title, number, album_id) VALUES ("Nightvision", 6, 5);
INSERT INTO "tracks" (title, number, album_id) VALUES ("Superheroes", 7, 5);
INSERT INTO "tracks" (title, number, album_id) VALUES ("High Life", 8, 5);
INSERT INTO "tracks" (title, number, album_id) VALUES ("Something About Us", 9, 5);
INSERT INTO "tracks" (title, number, album_id) VALUES ("Voyager", 10, 5);
INSERT INTO "tracks" (title, number, album_id) VALUES ("Veridis Quo", 11, 5);
INSERT INTO "tracks" (title, number, album_id) VALUES ("Short Circuit", 12, 5);
INSERT INTO "tracks" (title, number, album_id) VALUES ("Face to Face", 13, 5);
INSERT INTO "tracks" (title, number, album_id) VALUES ("Too Long", 14, 5);

INSERT INTO "albums" (id, title, year, artist_id) VALUES (6, "Homework", 1997, 4);

INSERT INTO "tracks" (title, number, album_id) VALUES ("Daftendirekt", 1, 6);
INSERT INTO "tracks" (title, number, album_id) VALUES ("WDPK 83.7 FM", 2, 6);
INSERT INTO "tracks" (title, number, album_id) VALUES ("Revolution 909", 3, 6);
INSERT INTO "tracks" (title, number, album_id) VALUES ("Da Funk", 4, 6);
INSERT INTO "tracks" (title, number, album_id) VALUES ("Phoenix", 5, 6);
INSERT INTO "tracks" (title, number, album_id) VALUES ("Fresh", 6, 6);
INSERT INTO "tracks" (title, number, album_id) VALUES ("Around the World", 7, 6);
INSERT INTO "tracks" (title, number, album_id) VALUES ("Rollin' & Scratchin'", 8, 6);
INSERT INTO "tracks" (title, number, album_id) VALUES ("Teachers", 9, 6);
INSERT INTO "tracks" (title, number, album_id) VALUES ("High Fidelity", 10, 6);
INSERT INTO "tracks" (title, number, album_id) VALUES ("Rock'n Roll", 11, 6);
INSERT INTO "tracks" (title, number, album_id) VALUES ("Oh Yeah", 12, 6);
INSERT INTO "tracks" (title, number, album_id) VALUES ("Burnin'", 13, 6);
INSERT INTO "tracks" (title, number, album_id) VALUES ("Indo Silver Club", 14, 6);
INSERT INTO "tracks" (title, number, album_id) VALUES ("Alive", 15, 6);
INSERT INTO "tracks" (title, number, album_id) VALUES ("Funk Ad", 16, 6);

INSERT INTO "albums" (id, title, year, artist_id) VALUES (7, "Human After All", 2005, 4);

INSERT INTO "tracks" (title, number, album_id) VALUES ("Human After All", 1, 7);
INSERT INTO "tracks" (title, number, album_id) VALUES ("The Prime Time of Your Life", 2, 7);
INSERT INTO "tracks" (title, number, album_id) VALUES ("Robot Rock", 3, 7);
INSERT INTO "tracks" (title, number, album_id) VALUES ("Steam Machine", 4, 7);
INSERT INTO "tracks" (title, number, album_id) VALUES ("Make Love", 5, 7);
INSERT INTO "tracks" (title, number, album_id) VALUES ("The Brainwasher", 6, 7);
INSERT INTO "tracks" (title, number, album_id) VALUES ("On/Off", 7, 7);
INSERT INTO "tracks" (title, number, album_id) VALUES ("Television Rules The Nation", 8, 7);
INSERT INTO "tracks" (title, number, album_id) VALUES ("Technologic", 9, 7);
INSERT INTO "tracks" (title, number, album_id) VALUES ("Emotion", 10, 7);

INSERT INTO "albums" (id, title, year, artist_id) VALUES (8, "Random Access Memories", 2013, 4);

INSERT INTO "tracks" (title, number, album_id) VALUES ("Give Life Back to Music", 1, 8);
INSERT INTO "tracks" (title, number, album_id) VALUES ("The Game of Love", 2, 8);
INSERT INTO "tracks" (title, number, album_id) VALUES ("Giorgio by Moroder", 3, 8);
INSERT INTO "tracks" (title, number, album_id) VALUES ("Within", 4, 8);
INSERT INTO "tracks" (title, number, album_id) VALUES ("Instant Crush", 5, 8);
INSERT INTO "tracks" (title, number, album_id) VALUES ("Lose Yourself to Dance", 6, 8);
INSERT INTO "tracks" (title, number, album_id) VALUES ("Touch", 7, 8);
INSERT INTO "tracks" (title, number, album_id) VALUES ("Get Lucky ", 8, 8);
INSERT INTO "tracks" (title, number, album_id) VALUES ("Beyond", 9, 8);
INSERT INTO "tracks" (title, number, album_id) VALUES ("Motherboard", 10, 8);
INSERT INTO "tracks" (title, number, album_id) VALUES ("Fragments of Time", 11, 8);
INSERT INTO "tracks" (title, number, album_id) VALUES ("Doin' It Right", 12, 8);
INSERT INTO "tracks" (title, number, album_id) VALUES ("Contact", 13, 8);
