Handlebars.registerHelper('ifGreaterThanTwo', function (array, options) {
  if (array.length > 2) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});
