<!-- omit in toc -->
# ember-fui-less

![CI](https://github.com/bartocc/ember-fui-less/workflows/CI/badge.svg)
[![Ember Observer Score](https://emberobserver.com/badges/ember-fui-less.svg)](https://emberobserver.com/addons/ember-fui-less)


Configure an ember-cli app to use [fomantic-ui-less](https://github.com/fomantic/Fomantic-UI-LESS).

To use this addon, your project must also use [ember-cli-less](https://github.com/gpoitch/ember-cli-less).
If ember-cli-less is not already part of you app's devDependencies, it will be automatically added to your package.json.

This addon automatically adds the necessary paths to ember-cli-less's [lessOptions](https://github.com/gpoitch/ember-cli-less#usage)
to be able to `@import` the fomantic-ui-less source files from your app's less files.

**This addon is not meant to provide ember components corresponding to the fomantic-ui modules!**

<!-- omit in toc -->
## Table of contents

- [Installation](#installation)
- [Compatibility](#compatibility)
- [Usage](#usage)
  - [Choosing what fomantic-ui definitions your app needs](#choosing-what-fomantic-ui-definitions-your-app-needs)
  - [Theming](#theming)
- [Contributing](#contributing)
- [License](#license)

## Installation

```
ember install ember-fui-less
```

This will execte the following actions:

1. Add `ember-cli-less` to your devDependencies
2. Add `fomantic-ui-less` to your devDependencies
3. Create the folder `app/styles/fomantic`
5. Copy `node_modules/fomantic-ui-less/theme.config` to `app/styles/fomantic/theme.config`
6. Copy part of `node_modules/fomantic-ui-less/semantic.less` to `app/styles/fomantic/semantic.less` (ommitting the `Modules` section)
7. Create `app/styles/app.less` if necessary
8. Insert `@import 'app/styles/fomantic/semantic';` in `app/styles/app.less`

If your app was not already using configured to

## Compatibility

* Ember.js v3.13 or above
* Ember CLI v2.13 or above
* Node.js v12 or above

## Usage

The `app/styles/fomantic` content is supposed to mimic the one found in `node_modules/fomantic-ui-less`.

### Choosing what fomantic-ui definitions your app needs

⚠️ By default, every fomantic-ui [Globals](https://github.com/fomantic/Fomantic-UI-LESS/tree/master/definitions/globals), [Elements](https://github.com/fomantic/Fomantic-UI-LESS/tree/master/definitions/elements), [Collections](https://github.com/fomantic/Fomantic-UI-LESS/tree/master/definitions/collections) and [Views](https://github.com/fomantic/Fomantic-UI-LESS/tree/master/definitions/views) will be `@import`ed by in `app/styles/fomantic/semantic.less`. This will result in a slower build time for your app!⚠️

❗ **Make sure you comment out every one of those imported files that your app does not use** ❗

### Theming

TODO

## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.

## License

This project is licensed under the [MIT License](LICENSE.md).
