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
- [Credits](#credits)

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

In `app/styles/fomantic/semantic.less`, Make sure you comment out every one of those imported files that your app does not use.

```less

/* Elements */
& { @import "definitions/elements/button"; }    // My app uses fomantic-ui buttons
& { @import "definitions/elements/container"; } // My app uses fomantic-ui containers

// My app DOES NOT need these ⬇️ fomantic-ui elements
// & { @import "definitions/elements/divider"; }
// & { @import "definitions/elements/emoji"; }
// & { @import "definitions/elements/flag"; }
// & { @import "definitions/elements/header"; }
// & { @import "definitions/elements/icon"; }
// & { @import "definitions/elements/image"; }
// & { @import "definitions/elements/input"; }
// & { @import "definitions/elements/label"; }
// & { @import "definitions/elements/list"; }
// & { @import "definitions/elements/loader"; }
// & { @import "definitions/elements/placeholder"; }
// & { @import "definitions/elements/rail"; }
// & { @import "definitions/elements/reveal"; }
// & { @import "definitions/elements/segment"; }
// & { @import "definitions/elements/step"; }
// & { @import "definitions/elements/text"; }
```

### Theming

You can easily use the [theming](https://fomantic-ui.com/usage/theming.html) system of fomantic-ui with ember-fui-less.

This addon provides blueprints to generate the files necessary to customize the [site](https://fomantic-ui.com/usage/theming.html#sitewide-defaults) theme.

For example, you could start building the site theme of your application with:

```shell
ember generate fui-variables --type="global" --element="site"
```

This would create the file `app/styles/fomantic/site/globas/site.variables`.
This file is by default empty (if you except the comments).
You could then modify the primary color:

```less
@primaryColor: red;
```

and check the result by adding a primary button in one of your templates:

```hbs
<button class="ui primary button" type="button">
  A Primary Button
</button>
```

Fomantic-ui has **MANY** variables available to configure your theme, and that can be quite overwhelming.
The best way to grasp the power of theming is to read through the default theme variables file,
for example [themes/default/globals/site.variables](https://github.com/fomantic/Fomantic-UI-LESS/blob/master/themes/default/globals/site.variables)

## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.

## License

This project is licensed under the [MIT License](LICENSE.md).

## Credits

Yarn workspace test-packages setup idea inspired from [ember-css-modules](https://github.com/salsify/ember-css-modules)
