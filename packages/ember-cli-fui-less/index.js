'use strict';

module.exports = {
  name: require('./package').name,

  included(app) {
    this._super.included.apply(this, app);

    if (!app.options["lessOptions"]) app.options["lessOptions"] = {};
    if (!app.options["lessOptions"]["paths"]) app.options["lessOptions"]["paths"] = [];

    app.options["lessOptions"]["paths"].push(
      'node_modules/fomantic-ui-less',
      './app/styles/fomantic',
      './app/styles/fomantic/dummy-path-to-import/theme.config'
    );
  }

};
