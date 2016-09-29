let magicNumber = Number(process.argv[2])

try {
  if (magicNumber > 5) {
    throw "Magic is too strong!"
  }
}
catch (e) {
  let newNumber = Math.floor((Math.random() * 5) + 1)
  console.log(`Maybe try ${newNumber}?`);
}
