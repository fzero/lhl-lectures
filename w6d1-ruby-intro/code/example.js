function printItems(myArray) {
  myArray.forEach((item) => {
    console.log(`Item is now: ${item}`);
  });

  return myArray.length;
}

let myArray = ['banana', 'apple', 'truck', 'building', 'computer', 'machine gun'];

myArray.push('orange');

var howMany = printItems(myArray);
console.log(`${howMany} items in array.`);


// Moar below

let contact = {
  name: "Fabio Neves",
  phone: "555-555-5555",
  email: "thugswag4lyfe@example.com",
  address: "The Internets"
}

for (key in contact) {
  console.log(`${key}: ${contact[key]}`);
}

console.log(`Name is ${contact['name']}`);
