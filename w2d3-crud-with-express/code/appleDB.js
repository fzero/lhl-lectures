// Our data is just an array of objects, and our id's will be
// their indexes inside the array.
// To mock a real database, we'll only allow the data
// to be manipulated using the exported methods further below.
let data = [
  {
    type: "Granny Smith",
    color: "green"
  },
  {
    type: "Pink Lady",
    color: "pink I guess?"
  },
  {
    type: "Royal Gala",
    color: "reddish"
  }
];


function getAll() {
  return data;
}


function get(id) {
  id = Number(id); // Making sure id is a number
  return data[id];
}


function add(apple) {
  data.push(apple);
  return true; // functions that change data return true on success
}


function update(id, editedApple) {
  id = Number(id);
  let apple = get(id);
  if (apple) {
    data[id] = editedApple;
    return true;
  }
  else {
    return false;
  }
}


function destroy(id) {
  id = Number(id);
  // Return false if apple doesn't exist
  if (!data[id]) return false;

  // Remove apple with index == id from data
  data = data.filter((apple, index) => {
    // array.filter KEEPS elements for which the callback returns true
    return (id !== index);
  });
  return true;
}


module.exports = {
  data: data,
  getAll: getAll,
  get: get,
  add: add,
  update: update,
  destroy: destroy
}
