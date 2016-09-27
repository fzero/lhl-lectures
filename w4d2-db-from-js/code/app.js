const musicdb = require('./musicdb') // regular version
// const musicdb = require('./musicdb-promises') // promises version

var artistName = process.argv[2];
var albumName = process.argv[3];

// See musicdb.js for function interface
musicdb.getAlbumTracks(artistName, albumName, (rows) => {
  console.log(`Found ${rows.length} tracks:\n`);
  rows.forEach((row) => {
    let output = [];
    for (column in row) {
      output.push(`${column}: ${row[column]}`);
    }
    console.log(output.join(', '));
  })
});
