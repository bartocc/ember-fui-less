const fs = require("fs");
const resolve = require("resolve");
const debug = require("debug")("ember-fui-less:default-blueprint");

// fs.existsSync(`${__dirname}/js/addon.js`);

module.exports = {
  normalizeEntityName() {},

  files() {
    return [
      "__root__/styles/fomantic/theme.config",
      "__root__/styles/fomantic/semantic.less"
    ];
  },

  async beforeInstall(options, locals) {
    try {
      await this.addAddonToProject({ name: "ember-cli-less" });
    } catch (error) {
      debug("Could not add `ember-cli-less` addon to project: %o", error);
    }

    try {
      await this.addPackageToProject("fomantic-ui-less");
    } catch (error) {
      debug("Could not add `fomantic-ui-less` package to project: %o", error);
    }

    const fomanticDestDir = `__root__/styles/fomantic`;

    // Resolve the path of fomantic-ui-less/theme.config.example and copy the file
    // to the blueprints files dir with name theme.config
    let res = resolve.sync("fomantic-ui-less/theme.config.example", {
      basedir: __dirname
    });
    fs.copyFileSync(res, `${this.filesPath()}/${fomanticDestDir}/theme.config`);

    // res = resolve.sync('fomantic-ui-less/_site/globals/site.variables', { basedir: __dirname });
    // fs.copyFileSync(res, `${this.filesPath()}/${fomanticDestDir}/site/globals/site.variables`);

    res = resolve.sync("fomantic-ui-less/semantic.less", {
      basedir: __dirname
    });
    fs.copyFileSync(
      res,
      `${this.filesPath()}/${fomanticDestDir}/semantic.less`
    );

    await this.insertIntoFile(
      `${locals.fileMap["__root__"]}/styles/app.less`,
      "@import 'app/styles/fomantic/semantic';"
    );
    await this.insertIntoFile(
      `${locals.fileMap["__root__"]}/styles/fomantic/semantic.less`,
      "/* Uncomment below the FUI elements you need",
      { after: "/* Elements */" }
    );
    await this.insertIntoFile(
      `${locals.fileMap["__root__"]}/styles/fomantic/semantic.less`,
      "end of elements whitelist */",
      { before: "/* Collections */" }
    );
    await this.insertIntoFile(
      `${locals.fileMap["__root__"]}/styles/fomantic/semantic.less`,
      "/* Uncomment below the FUI collections you need",
      { after: "/* Collections */" }
    );
    await this.insertIntoFile(
      `${locals.fileMap["__root__"]}/styles/fomantic/semantic.less`,
      "end of collections whitelist */",
      { before: "/* Views */" }
    );
    await this.insertIntoFile(
      `${locals.fileMap["__root__"]}/styles/fomantic/semantic.less`,
      "/* Uncomment below the FUI Views you need",
      { after: "/* Views */" }
    );
    await this.insertIntoFile(
      `${locals.fileMap["__root__"]}/styles/fomantic/semantic.less`,
      "end of views whitelist */",
      { before: "/* Modules */" }
    );
    await this.insertIntoFile(
      `${locals.fileMap["__root__"]}/styles/fomantic/semantic.less`,
      "/* Uncomment below the FUI Modules you need",
      { after: "/* Modules */" }
    );
    await this.insertIntoFile(
      `${locals.fileMap["__root__"]}/styles/fomantic/semantic.less`,
      "end of modules whitelist */"
    );
  },

  async afterInstall() {
    this.files().forEach(path => fs.unlinkSync(`${this.filesPath()}/${path}`));
  }
};
