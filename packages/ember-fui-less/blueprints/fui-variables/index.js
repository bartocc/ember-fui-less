"use strict";

const resolve = require("resolve");
const fs = require("fs");
const chalk = require("chalk");
const debug = require("debug")("ember-fui-less:blueprints:fui-variables");

module.exports = {
  description:
    "Generates a fomantic-ui theme file in app/styles/fomantic/site/<type>/<element>.variables",

  availableOptions: [
    {
      name: "type",
      type: String,
      default: ""
    },
    {
      name: "element",
      type: String,
      default: ""
    }
  ],

  normalizeEntityName(entityName) {
    // Normalize and validate entity name here
    return entityName;
  },

  beforeInstall(options) {
    const { type, element, project, dummy } = options;

    if (!["global", "element", "collection", "view"].includes(type)) {
      this.ui.writeLine(
        chalk.yellow(
          `--type must be one of "global", "element", "collection" or "view"`
        )
      );
      throw "";
    }

    const fileName = `${element}.variables`;
    const filePathToResolve = `fomantic-ui-less/_site/${type}s/${fileName}`;

    let appRoot = project.root;
    if (dummy) appRoot = appRoot + "/tests/dummy";
    const siteDir = appRoot + "/app/styles/fomantic/site";
    const typeDir = `${siteDir}/${type}s`;
    const destFile = `${typeDir}/${fileName}`;

    [siteDir, typeDir].forEach(dir => {
      if (!fs.existsSync(dir)) {
        debug("creating %o directory", dir);
        fs.mkdirSync(dir);
      }
    });

    let srcFile;
    try {
      srcFile = resolve.sync(filePathToResolve, {
        basedir: __dirname
      });
      debug("%o resolved to %o", filePathToResolve, srcFile);
      debug("copying %o to %o", srcFile, destFile);

      fs.copyFileSync(srcFile, destFile);
    } catch (error) {
      this.ui.writeLine(
        chalk.yellow(
          `The fomantic-ui '${element}' ${type} does not seem to be valid`
        )
      );
      throw "";
    }
  }
};
