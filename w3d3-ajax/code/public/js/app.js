// Client-side code goes here!

$(function(){ // jQuery document.ready shortcut

  function loadApples() {
    $.get('/apples') // This is the same as $.ajax('/apples', {method: 'GET'})
    .done(function(result) {
      $('#container').empty()
      for (var apple of result) {
        $('#container').append(
          `<h3>${apple.type}</h3>
          <p>
            It's ${apple.color} and tastes ${apple.taste}
            <a href="#" class="deleteApple" data-apple-id="${apple.id}">
              [Delete]
            </a>
          </p>
          <hr />`
        )
      }
      // we can only attach events when the elements are being displayed
      attachDeleteHandlers()
    })
    .fail(function(error) {
      console.error(error)
    })
  }

  function createApple(formData) {
    // Submit the data
    $.post('/apples', formData)
    .done(function(result) {
      loadApples()
    })
    .fail(function(error) {
      console.error(error)
    })
  }

  function deleteApple(id) {
    // show confirmation dialog
    var confirm = window.confirm(`Are you sure you want to delete apple id ${id}?`)
    // if confirmed, delete apple
    if (confirm) {
      $.ajax(`/apples/${id}`, {method: 'DELETE'})
      .done(function(result) {
        // Refresh display
        loadApples()
      })
      .fail(function(error) {
        console.error(error)
      })
    }
  }

  // Event handlers
  $('#loadApples').on('click', loadApples)

  $('#daForm').on('submit', function(ev) {
    ev.preventDefault()
    // Get data from the form
    var formData = $('#daForm').serialize()
    createApple(formData)
  })

  function attachDeleteHandlers() {
    $('.deleteApple').on('click', function(ev) {
      ev.preventDefault()
      // Get the target element with ev.target,
      // then get id from data-apple-id attribute
      var appleId = $(ev.target).data('apple-id')
      deleteApple(appleId)
    })
  }

})
