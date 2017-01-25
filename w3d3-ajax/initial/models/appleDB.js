// Let's create an object to serve as our apple "database"
let appleDB = [
  {
    type: "Granny Smith",
    color: "Green",
    taste: "So sour only your granny would like it"
  },
  {
    type: "Royal Gala",
    color: "Marbled red",
    taste: "Delicious and juicy!"
  },
  {
    type: "Pink Lady",
    color: "Pink",
    taste: "Ok, I guess"
  },
  {
    type: "Red Delicious",
    color: "Deep red",
    taste: "Not delicious at all"
  }
]


// Check if an apple object is valid
function isValid(apple) {
  return (apple.type && apple.color && apple.taste)
}


// Return all apples with added id's
function all() {
  return appleDB
  .map((apple, index) => { // Add ids to apples
    if (apple) apple.id = index
    return apple
  })
  .filter((apple) => apple) // Removes deleted apples
}


// Return a specific apple
function find(id) {
  let appleId = Number(id)
  let apple = appleDB[appleId]
  if (!apple) return null

  apple.id = appleId
  return apple
}


// Add a new apple
function create(newApple) {
  if (!isValid(newApple)) return false

  appleDB.push({
    type: newApple.type,
    color: newApple.color,
    taste: newApple.taste
  })

  let newId = appleDB.length - 1  // id of new apple

  return find(newId)
}


// Update an apple
function update(id, updatedApple) {
  let appleId = Number(id)

  let apple = find(appleId)
  if (!apple || !isValid(updatedApple)) return false

  appleDB[appleId] = {
    type: updatedApple.type,
    color: updatedApple.color,
    taste: updatedApple.taste
  }

  return find(appleId)
}


// Delete an apple
function del(id) {
  let appleId = Number(id)
  if (!find(appleId)) return false

  appleDB[id] = null
  return true
}


module.exports = {
  all: all,
  find: find,
  create: create,
  update: update,
  del: del,
  isValid: isValid
}
