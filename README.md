# Project Details

View my Resume:
[https://sunnymui.github.io/frontend-nanodegree-resume/](https://sunnymui.github.io/frontend-nanodegree-resume/)

or simply by clicking **Resume** at:
[www.sunnymui.com](www.sunnymui.com)

## About the Project

1. This project stores resume data in four javaScript objects (in a JSON style) according to a structured data schema.
2. All of the consequential HTML code is stored as templates in **js/helper.js** string variables. The variable names indicate their section.
3. HTML template strings have placeholders denoting where data will be inserted, for example: **%data%**. I implemented a basic templating system in resumeBuilder.js with a few features like:
    * An encapsulated, private namespace to contain all templating functions and allow chainability of format methods (`html('<html>html template string here</html>').format(data.data_to_access, '%placeholder%')`)
    * Optional data fields that aren't displayed if no data is in the object (` %?optional% ` <== data is formatted into this string if it exists in the object)
    * Wrapping html insertion (` %?wrapper% <div>Something else here</div> %?wrapper% `)
    * Customizable placeholders when calling format functions (`html(HTMLtemplateString).format(raw_data, custom_placeholder` <== can be whatever you want as long as it matches the html template))
    * Insertion of data at multiple occurrences of a specific placeholder (e.g. replace all functionality)
4. The formatted HTML template strings are then put together and displayed on the page via append operations.
5. CSS3 animation effects used for full page shifting background gradient hero and fade in of certain images/elements
6. Customized micro-scrollspy plugin based on the [Minimal Scrollspy Plugin by Sam Sehnert](https://jsfiddle.net/mekwall/up4nu/)

* Originally forked from the project repo from [Udacity](https://github.com/udacity/frontend-nanodegree-resume)
* Almost completely rebuilt on HTML5 Boilerplate with custom functions
* Uses a [Google Maps API key](https://developers.google.com/maps/documentation/javascript/get-api-key) to display a map using the Google Maps API with work/living locations plotted.

## Build Tools

Project uses Grunt:

  1. imagemin - compress images
  2. responsive images - create multiple size images for responsive use
  3. responsive images extender - scan html files for img tags and add srcset if the responsive images are there
  4. postcss: autoprefixer - postcss allows processing of css, autoprefixer is a plugin for it that adds prefixes for legacy browser support
  5. uglify - minify and concat js
  6. cssmin - minify and concat css
  7. newer - lets designated plugins run only on updated files when running newer:pluginname
  
To rebuild the project, you'll need NPM, Grunt, and the mentioned plugins. Details in gruntfile.js.  

## License

<a rel="license" href="http://creativecommons.org/licenses/by-nc/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-nc/4.0/88x31.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc/4.0/">Creative Commons Attribution-NonCommercial 4.0 International License</a>.
