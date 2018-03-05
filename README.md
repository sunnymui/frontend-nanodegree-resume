# The ResumeBuilder

![Screenshot of the Resume Builder Showing Sunny Mui, a Picture, and the Navigation](https://raw.githubusercontent.com/sunnymui/frontend-nanodegree-resume/master/screenshot.jpg "Sunny Mui Resume Screenshot")

### View My Resume
[https://sunnymui.github.io/frontend-nanodegree-resume/](https://sunnymui.github.io/frontend-nanodegree-resume/)

or simply by clicking **Resume** at:
[www.sunnymui.com](www.sunnymui.com)

## About the Project

1. This project stores resume data in `data.js` within a single data object simply named `data` subdivided into 7 sections (JSON style) according to a structured data schema. The raw data is essentially what an API would output so later development can have this data stored on the backend database level and have the resume submodule query the API to get the data. The 7 sections are: 
   - `bio` - Stores basic info like contact info, skills, major qualifications, profile pic, etc.
   - `work` - Has entries for job positions and recommendations for each position.
   - `projects` - Has some portfolio project information.
   - `education` - Degrees obtained and courses taken.
   - `awards` - Any awards I've received.
   - `maps` - Extra map information for the gmap submodule.
   - `footer` - Extra information for the footer section.
2. The project is organized into a modular/submodular MVC pattern. The main `ResumeBuilder` module is contained in the `mvc.js` file. The main module is encapsulated in an IIFE to keep the public namespace clear, taking in the `data` object and `jQuery` as arguments. `ResumeBuilder` returns an object for public access containing the `resume` submodule and the `data` it has used. The submodules within the `ResumeBuilder` module are:
   - `util` - Holds very generalized utility functions
   - `plugins` - Some small plugins/3rd party code
   - `resume` -  The main Model-View-Controller organized submodule that gets the raw resume data, renders the resume page, and manages user interactions
   - `gmap` - Constructs Google Map objects via API queries for a list of locations, also MVC patterned. Accesses the Google api, formats data, renders it to the map element, and handles any clicks in the map element.
3. HTML templates are stored in the `resume.view.templates` strings with placeholders denoting where data will be inserted, for example: **%data%**. I implemented a basic templating system in the resume submodule denoted by the `resume.view.html` prototypal functions with a few features like:
    * An encapsulated, private namespace to contain all templating functions and to allow chainability of format methods. Basic usage: (`resume.view.html('<html>html template string here</html>').format(data.data_to_access, '%placeholder%')`)
    * Calls to the `html` constructor function automatically create a new instance of the function without invoking the new keyword explicity for ease of use of `html` methods
    * Optional data fields that aren't displayed if no data is in the object (` %?optional% ` <== data is formatted into this string if it exists in the object)
    * Wrapping HTML insertion (` %?wrapper% <div>Something else here</div> %?wrapper% `)
    * Customizable placeholders when calling format functions (`html(HTMLtemplateString).format(raw_data, custom_placeholder` <== can be whatever you want as long as it matches the html template))
    * Insertion of data at multiple occurrences of a specific placeholder (e.g. replace all functionality)
4. Render functions in resume.view handle the building of the DOM elements and displaying it all on the page. The formatted HTML template strings are put together in memory and added together per section to minimize append operations.
5. The `resume.control` section manages all the user interaction and initial execution. The `init` function contains all the even listeners and interactive features being executed. Most of the interactivity is handled by `features` functions in `resume.control`.
6. CSS3 animation effects used for full page shifting background gradient hero and fade in effects of certain images/elements
7. Customized micro-scrollspy plugin based on the [Minimal Scrollspy Plugin by Sam Sehnert](https://jsfiddle.net/mekwall/up4nu/) to  highlight the navigation title of the section of the page the user is viewing.

* Originally forked from the project repo from [Udacity](https://github.com/udacity/frontend-nanodegree-resume)
* Almost completely rebuilt on HTML5 Boilerplate with custom functions
* MVC and modular patterns
* Uses a [Google Maps API key](https://developers.google.com/maps/documentation/javascript/get-api-key) to display a map using the Google Maps API with work/living locations plotted.

## How to Initiate the Module

The ResumeBuilder module is wrapped in an immediately invoked function expression (IIFE), which means the function will execute immediately and the global namespace will be kept clear with access to the module's public methods/data via the `ResumeBuilder` name. 

Since an IIFE is used, all you have to do is include `mvc.js` anda the raw data to start the module. A data object following the structure laid out in `data.js` should be passed to the `ResumeBuilder` function as the first argument. `jQuery` should be passed as the second argument. 

In practice, this means you'll have something like this in your html file:

```
<!-- Load jQuery, give id of jquery because the module checks that the jquery id element has loaded -->
<script async src="https://code.jquery.com/jquery-1.12.0.min.js" id="jquery"></script>
<!-- Load the data to use -->
<script src="js/data.js"></script>
<!-- Run the ResumeBuilder module -->
<script src="js/mvc.js"></script>
```
However, in my build, I concatenated `data.js` together with `mvc.js` so that only a single `scripts.min.js` file is loaded.

### Asynchronous Loading

Notice that you can load jQuery asynchronously as shown by the `async` property added to the script tag that loads jQuery. Asynchronous loading means it can download all the script files in parallel, at the same time, instead of waiting for one to finish downloading before it starts downbloading the next file. 

The `ResumeBuilder` module will wait for jQuery to be loaded if jQuery hasn't loaded before the `ResumeBuilder` module has loaded.

### Manually Starting the ResumeBuilder Module

If you want to manually start the `ResumeBuilder` function, you can edit `ResumeBuilder` to only define then function, without executing it immediately. Then you simply invoke the function manually when you want `ResumeBuilder` to run.

That means instead of how it's currently written:

```
var ResumeBuilder = (function(data, jQuery) {

// all the module code
...
})(data, jQuery);
```

You remove the 2 sets of extra parantheses wrapping the function and after the last curly brace:

```
var ResumeBuilder = function(data, jQuery) {

// all the module code
...
};

// run the resumebuilder module function
ResumeBuilder(data, jQuery);
```
Make sure your data object and jQuery are loaded/available before executing the `ResumeBuilder` module function. Since those 2 things are passed as arguments to the `ResumeBuilder` module, it depends on them to run properly.

## Dependencies

Project uses jQuery 1.12, mainly just for ease of DOM manipulation, though some interactive features use jQuery functions.

Project also uses Grunt:

  1. imagemin - compress images
  2. responsive images - create multiple size images for responsive use
  3. responsive images extender - scan html files for img tags and add srcset if the responsive images are there
  4. postcss: autoprefixer - postcss allows processing of css, autoprefixer is a plugin for it that adds prefixes for legacy browser support
  5. uglify - minify and concat js
  6. cssmin - minify and concat css
  7. newer - lets designated plugins run only on updated files when running newer:pluginname
  8. watch - watches files for changes and runs appropriate tasks when changed
  
To rebuild the project, you'll need NPM, Grunt, and the mentioned plugins. Details in gruntfile.js.

Help on getting started with grunt here: [https://gruntjs.com/getting-started](https://gruntjs.com/getting-started)

You can run grunt by simply typing `grunt` in a command prompt while you are in the ResumeBuilder project directory, then pressing enter. By default it will run the responsive images, imagemin, and postcss tasks. You can also use the `grunt optimize` task which will run imagemin only only new files in the img folder, uglify and concatenate Javascript files, and minify CSS files. Otherwise, you can just run each plugin individually by using `grunt [plugin-name-here]`, for example, `grunt uglify`.

## License

<a rel="license" href="http://creativecommons.org/licenses/by-nc/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-nc/4.0/88x31.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc/4.0/">Creative Commons Attribution-NonCommercial 4.0 International License</a>.
