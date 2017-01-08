# Project Details

View my completed Resume:
[https://sunnymui.github.io/frontend-nanodegree-resume/](https://sunnymui.github.io/frontend-nanodegree-resume/)

## About the Project

1. This project stores resume data in four javaScript objects (in a JSON style) according to a data schema.
2. All of the HTML code is stored as templates in **js/helper.js** string variables. The variable names indicate their section.
3. HTML template strings have placeholders denoting where data will be inserted, for example: **%data%**. I implemented a basic templating system with a few features like optional data fields that aren't displayed if no data is in the object (%?optional%), wrapping html insertion (%?wrapper%), customizable placeholders, and insertion of data at multiple occurrences of a specific placeholder (e.g. replace all functionality).
4. The formatted HTML template strings are then put together and displayed on the page via append operations.

* Originally forked from the project repo from [Udacity](https://github.com/udacity/frontend-nanodegree-resume)
* Uses a [Google Maps API key](https://developers.google.com/maps/documentation/javascript/get-api-key) to display a map using the Google Maps API with work/living locations plotted.
