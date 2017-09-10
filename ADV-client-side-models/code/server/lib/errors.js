// Utility functions to deal with errors

module.exports = {

  // Normalize errors for JSON API output
  normalize: (errorObj) => {
    if (errorObj.errors && errorObj.errors instanceof Array) {
      // Sequelize errors
      return {errors: errorObj.errors}
    }
    else if (typeof(errorObj) === 'string') {
      // Custom error messages as strings
      return {errors: [{message: errorObj}]}
    }
    else {
      // ¯\_(ツ)_/¯
      return {errors: [errorObj]}
    }
  }

}
