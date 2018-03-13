/*
Given a sentence with blank spaces
I'd like to run a program
that takes words
and inserts them in the sentence
so I can have a laugh

Tasks:
- Figure out how to read arguments from the command line
- How to put words in the sentence?
  - Split the sentence into parts
  - add the words
*/


function madlib(sentence, words) {
  var assembled = '';
  // split sentence at blanks
  var parts = sentence.split('___');
  // add words to each corresponding blank in order
  for (var i = 0; i < words.length; i += 1) {
    assembled += parts[i] + words[i];
  }
  assembled += parts[parts.length - 1];
  // return assembled sentence
  return assembled;
}


// Here be tests!

var sentence = "I went to the ___ to get some ___ but then I met ___ and ___ happened.";
var words = ['mall', 'liquor', 'Nicole', 'catastrophe'];
console.log('Assembled:', madlib(sentence, words));

if (madlib(sentence, words) === "I went to the mall to get some liquor but then I met Nicole and catastrophe happened.") {
  console.log("It works!");
}
else {
  console.log('You done goofed!');
}

// Now we use the command line arguments
// node madlibs.js "I went to the ___ to get ___ for a ___." desert sand castle

var sentenceFromCommandLine = process.argv[2]; // Remember to use quotes!
var wordsFromCommandLine = process.argv.slice(3);
console.log('Your sentence:', madlib(sentenceFromCommandLine, wordsFromCommandLine));
