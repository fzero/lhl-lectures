/*
Given a sentence with blank spaces
I'd like to run a program
that takes words
and inserts them in the sentence
so I can have a laugh

Sentence:
I brought my ___ to the ___ so that I could get ___.

Tasks:
- Figure out how to read arguments from the command line
- How to put words in the sentence?
  - Split the sentence into parts
  - add the words
*/

function buildMadlib(madlib, words) {
  // Whenever I have a madlib, the length of the splitted madlib
  // will be the number of blank spaces + 1.
  // How do we know this? We've tried it on the REPL!
  var splittedMadlib = madlib.split('___');

  var sentence = '';
  for (var c = 0; c < words.length; c++) {
    // console.log("Part of sentence: " + splittedMadlib[c]);
    // console.log("Word: " + words[c]);
    sentence += splittedMadlib[c];
    sentence += words[c];
  }
  // Then we need to get the last part of the sentence.
  // To get the last element of an array, use array.length - 1
  sentence += splittedMadlib[splittedMadlib.length - 1];

  return sentence;
}


// This is where the code actually starts running
var madlib = "I brought my ___ to the ___ so that I could get ___.";
var words = process.argv.slice(2);
console.log(buildMadlib(madlib, words));
