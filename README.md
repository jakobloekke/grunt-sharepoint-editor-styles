# grunt-sharepoint-editor-styles

> Extract sharepoint editor styles into separate stylesheet.

## Getting Started
This plugin requires Grunt.

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-sharepoint-editor-styles --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-sharepoint-editor-styles');
```

## The "sharepoint_editor_styles" task

### Overview
In your project's Gruntfile, add a section named `sharepoint_editor_styles` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  sharepoint_editor_styles: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
})
```

### Options

There are no options.

### Usage Examples

#### Default Options
In this example, the default options are used to do something with whatever. So if the `testing` file has the content `Testing` and the `123` file had the content `1 2 3`, the generated result would be `Testing, 1 2 3.`

```js
grunt.initConfig({
  sharepoint_editor_styles: {
    files: {
      'path/to/where/sharepoint/stores/editorstyles/EditorStyles.css': ['src/app.css'],
    },
  },
})
```


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
0.0.1 - First version

## License
Copyright (c) 2014 Jakob Løkke Madsen. Licensed under the MIT license.
