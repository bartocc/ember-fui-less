'use strict';
const resolve = require('resolve');

module.exports = {
  name: require('./package').name,

  included(app) {
    this._super.included.apply(this, app);

    if (!app.options["lessOptions"]) app.options["lessOptions"] = {};
    if (!app.options["lessOptions"]["paths"]) app.options["lessOptions"]["paths"] = [];

    const accordionModulePath = "/definitions/modules/accordion.js";
    let res = resolve.sync(`fomantic-ui-less${accordionModulePath}`, { basedir: __dirname });
    const fuiLessPath = res.replace(accordionModulePath, '');
    let appRoot;

    if (app.project.isEmberCLIAddon())
      appRoot= app.options.configPath.replace('/config/environment', '');
    else
      appRoot = app.project.root

    app.options["lessOptions"]["paths"].push(
      fuiLessPath,
      `${appRoot}/app/styles/fomantic`,
      `${appRoot}/app/styles/fomantic/dummy-path-to-import/theme.config`
    );
  }

};
