// Client-side code goes here!
$(function(){ // jQuery document.ready shortcut

  // Makes an AJAX GET call and displays the results inside #container
  function fetchAndDisplayApples() {
    // NOTE: $.getJSON is the same as:
    // $.ajax('/apples', {method: 'GET'})
    $.getJSON('/apples')
    .then((apples) => {
      $('#container').empty();
      for (let apple of apples) {
        $('#container').append(
          `<p>${apple.type} apples are ${apple.color} and taste ${apple.taste}.</p>`
        );
      }
    });
  }

  // Attach fetchAndDisplayApples() to clicks on the #getApples button
  $('#getApples').on('click', fetchAndDisplayApples);

  // Intercepts #newApple form sumission
  $('#newApple').on('submit', function(ev) {
    ev.preventDefault(); // Prevents the default browser form submit action

    // SUGGESTION: You should add a check to see if the form is empty
    //             before posting the data.

    let newApple = {
      type: $('#type').val(),
      color: $('#color').val(),
      taste: $('#taste').val()
    }

    // NOTE: $.post('/apples', newApple) does the same as the $.ajax call below
    $.ajax('/apples', {method: "post", data: newApple})
    .then((result) => {
      fetchAndDisplayApples()
      // SUGGESTION: You should clear all form fields here
    })
    .fail((error) => console.error(error))
  });

});
