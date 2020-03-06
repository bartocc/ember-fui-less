"use strict";

const resolve = require("resolve");
const fs = require("fs");
const chalk = require("chalk");
const debug = require("debug")("ember-fui-less:blueprints:fui-variables");

module.exports = {
  description:
    "Generates a fomantic-ui theme file in app/styles/fomantic/site/<type>s/<element>.variables",

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

  files() {
    return [this.filePath];
  },

  normalizeEntityName(entityName) {
    // Normalize and validate entity name here
    return entityName;
  },

  beforeInstall({ type, element }) {
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

    this.filePath = `__root__/styles/fomantic/site/${type}s/${fileName}`;
    const destFile = `${this.filesPath()}/${this.filePath}`;

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
  },

  async afterInstall() {
    this.files().forEach(path => {
      const fullPath = `${this.filesPath()}/${path}`;
      debug("unlinking file %o", fullPath);
      fs.unlinkSync(fullPath);
    });
  }
};
