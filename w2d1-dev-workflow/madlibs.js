// Create a program that:
// - Presents a sentence with some blank spaces when no arguments are provided
// - When arguments are provided, use those arguments to complete the sentence

// Converts a sentence into an array
function splitSentence(sentence, whatToSplitOn) {
  // Uses the whatToSplitOn argument when provided or '___' when not present.
  // This is one of the ways to make a function argument optional.
  whatToSplitOn = whatToSplitOn || '___';
  return sentence.split(whatToSplitOn);
}


// Gets a splitted sentence, an array with words and puts them together
function putItTogether(splittedSentence, words) {
  var completedSentence = '';
  for (var i = 0; i < words.length; i++) {
    completedSentence += splittedSentence[i];
    completedSentence += words[i];
  }

  // The madlibs sentence may have something after the last blank space.
  // We need to deal with that situation.
  if (splittedSentence.length > words.length) {
    completedSentence += splittedSentence[splittedSentence.length - 1];
  }

  return completedSentence;
}


// We only have function definitions above. The code actually starts running here.

var onlyWords = process.argv.slice(2);
var sentence = "It was the ___ of times, it was the ___ of times.";
var splitted = splitSentence(sentence);

if (onlyWords.length === 0) {
  console.log("Complete this sentence:", sentence);
}
else if (onlyWords.length < (splitted.length - 1)) {
  console.log(`You need to provide ${(splitted.length - 1)} words:`, sentence);
}
else {
  console.log(putItTogether(splitted, onlyWords));
}
