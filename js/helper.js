// Hero Section
var HTMLhero = '<section class="hero flex flex-v-center">'+
                  '<div class="center center-text all-caps white">'+
                    '<img src="%pic%" class="round border" alt="Picture of %name%">'+
                    '<h1 class="no-margin deep-shadow italic md-text-size-4 lg-text-size-5 ">%name%</h1>'+
                    '<h2 class="no-margin unbold spaced-text md-text-size-2 lg-text-size-3">%role%</h2>'+
                    '<nav>'+
                      '%nav%'+
                    '</nav>'+
                  '</div>'+
                '</section>';

var HTMLnav = '<a class="slide" href="#%data%">%data%</a>';

// Summary Section

var HTMLsummary = ''+
                  '<section class="summary">'+
                      '<a id="summary"></a>'+
                      '<ul class="contact list-no-style all-caps center-text">'+
                      '</ul>'+
                      '<div class="container center-text">'+
                        '<h2 class="unbold divider">Summary</h2>'+
                        '<p class="mid-gray italic intro">'+
                          '%welcomemsg%'+
                        '</p>'+
                        '<h3 class="unbold divider">Key Qualifications</h3>'+
                        '<ul class="qualifications grid list-no-style white">'+
                          '%qualifications%'+
                        '</ul>'+
                        '<h3 class="unbold divider">Skills</h3>'+
                        '<div class="skills grid">'+
                          '%skillsgroups%'+
                        '</div>'+
                      '</div>'+
                   '</section';

// contacts

var HTMLcontact = '<li>'+
                    '<a class="link" href="%link%" title="%tooltip%">'+
                      '<span class="icon-%icon%"></span>'+
                      '%name%'+
                    '</a>'+
                  '</li>';

// qualifications

var HTMLqualification = '<li class="col md-halves lg-thirds flex gutters">'+
                          '<div class="tile-item">'+
                            '<h4 class="big-5-text no-margin">%symbol%</h4>'+
                            '<h4 class="uppercase unbold no-margin spaced-text">%name%</h4>'+
                            '<p>%description%</p>'+
                          '</div>'+
                        '</li>';

// skills

var HTMLskillsGroup = '<div class="col lg-thirds gutters">'+
                        '<h4 class="no-margin-top">%data%</h4>'+
                        '<ul class="list-no-style list-inline-block">'+
                          '%skills%'+
                        '</ul>'+
                      '</div>';
var HTMLskill = '<li class="tag">%data%</li>';

// Work Experience Section

var HTMLwork = ''+
               '<section class="work">'+
                '<a id="work"></a>'+
                 '<div class="container center-text">'+
                   '<h2 class="unbold divider">Work and Experience</h2>'+
                   '<ul class="list-no-style">'+
                    '%entries%'+
                   '</ul>'+
                 '</div>'+
              '</section>';
var HTMLworkEntry = '<li class="v-margin-1">'+
                      '<img class="inline-top round border-light-gray max-width-5" src="%logo%"" alt="%employer% Company Logo" />'+
                      '<div class="entry md-75-max-width inline-middle margin-1 center-text md-left-text">'+
                        '<h3 class="unbold no-margin">%role%</h3>'+
                        '<h4 class="no-margin">%employer% <span class="light-gray italic small-text unbold">◉ %location%</span></h4>'+
                        '<h5 class="unbold v-margin-1 light-gray">'+
                          '<time>%start%</time>'+
                          '<span class="linker"></span>'+
                          '<time>%end%</time>'+
                        '</h5>'+
                        '<p>'+
                          '%description%'+
                        '</p>'+
                        '<ul>'+
                          '%highlights%'+
                        '</ul>'+
                        '<div class="grid">'+
                          '%testimonials%'+
                        '</div>'+
                      '</div>'+
                    '</li>';
var HTMLworkEntryHighlight = '<li>%data%</li>';
var HTMLworkTestimonial = '<div class="col md-whole lg-halves gutters">'+
                            '<blockquote>'+
                              '%testimonial%'+
                              '<p class="lg-right-text">'+
                                '<a href="%link%" target="_blank">'+
                                '<img class="lg-inline-middle" src="%photo%" alt="Pic and profile of %person%" />'+
                                '<span class="lg-inline-middle left-text link">%person%<br>%role%</span>'+
                                '</a>'+
                              '</p>'+
                            '</blockquote>'+
                          '</div>';

var HTMLprojectStart = '<div class="project-entry"></div>';
var HTMLprojectTitle = '<a href="#">%data%</a>';
var HTMLprojectDates = '<div class="date-text">%data%</div>';
var HTMLprojectDescription = '<p><br>%data%</p>';
var HTMLprojectImage = '<img src="%data%">';

var HTMLschoolStart = '<div class="education-entry"></div>';
var HTMLschoolName = '<a href="#">%data%';
var HTMLschoolDegree = ' -- %data%</a>';
var HTMLschoolDates = '<div class="date-text">%data%</div>';
var HTMLschoolLocation = '<div class="location-text">%data%</div>';
var HTMLschoolMajor = '<em><br>Major: %data%</em>';

var HTMLonlineClasses = '<h3>Online Classes</h3>';
var HTMLonlineTitle = '<a href="#">%data%';
var HTMLonlineSchool = ' - %data%</a>';
var HTMLonlineDates = '<div class="date-text">%data%</div>';
var HTMLonlineURL = '<br><a href="#">%data%</a>';

var internationalizeButton = '<button>Internationalize</button>';
var googleMap = '<div id="map"></div>';


/*
The Internationalize Names challenge found in the lesson Flow Control from JavaScript Basics requires you to create a function that will need this helper code to run. Don't delete! It hooks up your code to the button you'll be appending.
*/
$(document).ready(function() {
  $('button').click(function() {
    var $name = $('#name');
    var iName = inName($name.text()) || function(){};
    $name.html(iName);
  });
});

/*
The next few lines about clicks are for the Collecting Click Locations quiz in the lesson Flow Control from JavaScript Basics.
*/
var clickLocations = [];

function logClicks(x,y) {
  clickLocations.push(
    {
      x: x,
      y: y
    }
  );
  console.log('x location: ' + x + '; y location: ' + y);
}



/*
This is the fun part. Here's where we generate the custom Google Map for the website.
See the documentation below for more details.
https://developers.google.com/maps/documentation/javascript/reference
*/
var map;    // declares a global map variable


/*
Start here! initializeMap() is called when page is loaded.
*/
function initializeMap() {

  var locations;

  var mapOptions = {
    disableDefaultUI: true
  };

  /*
  For the map to be displayed, the googleMap var must be
  appended to #mapDiv in resumeBuilder.js.
  */
  map = new google.maps.Map(document.querySelector('#map'), mapOptions);


  /*
  locationFinder() returns an array of every location string from the JSONs
  written for bio, education, and work.
  */
  function locationFinder() {

    // initializes an empty array
    var locations = [];

    // adds the single location property from bio to the locations array
    locations.push(bio.contacts.location);

    // iterates through school locations and appends each location to
    // the locations array. Note that forEach is used for array iteration
    // as described in the Udacity FEND Style Guide:
    // https://udacity.github.io/frontend-nanodegree-styleguide/javascript.html#for-in-loop
    education.schools.forEach(function(school){
      locations.push(school.location);
    });

    // iterates through work locations and appends each location to
    // the locations array. Note that forEach is used for array iteration
    // as described in the Udacity FEND Style Guide:
    // https://udacity.github.io/frontend-nanodegree-styleguide/javascript.html#for-in-loop
    work.jobs.forEach(function(job){
      locations.push(job.location);
    });

    return locations;
  }

  /*
  createMapMarker(placeData) reads Google Places search results to create map pins.
  placeData is the object returned from search results containing information
  about a single location.
  */
  function createMapMarker(placeData) {

    // The next lines save location data from the search result object to local variables
    var lat = placeData.geometry.location.lat();  // latitude from the place service
    var lon = placeData.geometry.location.lng();  // longitude from the place service
    var name = placeData.formatted_address;   // name of the place from the place service
    var bounds = window.mapBounds;            // current boundaries of the map window

    // marker is an object with additional data about the pin for a single location
    var marker = new google.maps.Marker({
      map: map,
      position: placeData.geometry.location,
      title: name
    });

    // infoWindows are the little helper windows that open when you click
    // or hover over a pin on a map. They usually contain more information
    // about a location.
    var infoWindow = new google.maps.InfoWindow({
      content: name
    });

    // hmmmm, I wonder what this is about...
    google.maps.event.addListener(marker, 'click', function() {
      // your code goes here!
    });

    // this is where the pin actually gets added to the map.
    // bounds.extend() takes in a map location object
    bounds.extend(new google.maps.LatLng(lat, lon));
    // fit the map to the new marker
    map.fitBounds(bounds);
    // center the map
    map.setCenter(bounds.getCenter());
  }

  /*
  callback(results, status) makes sure the search returned results for a location.
  If so, it creates a new map marker for that location.
  */
  function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      createMapMarker(results[0]);
    }
  }

  /*
  pinPoster(locations) takes in the array of locations created by locationFinder()
  and fires off Google place searches for each location
  */
  function pinPoster(locations) {

    // creates a Google place search service object. PlacesService does the work of
    // actually searching for location data.
    var service = new google.maps.places.PlacesService(map);

    // Iterates through the array of locations, creates a search object for each location
      locations.forEach(function(place){
      // the search request object
      var request = {
        query: place
      };

      // Actually searches the Google Maps API for location data and runs the callback
      // function with the search results after each search.
      service.textSearch(request, callback);
    });
  }

  // Sets the boundaries of the map based on pin locations
  window.mapBounds = new google.maps.LatLngBounds();

  // locations is an array of location strings returned from locationFinder()
  locations = locationFinder();

  // pinPoster(locations) creates pins on the map for each location in
  // the locations array
  pinPoster(locations);

}

/*
Uncomment the code below when you're ready to implement a Google Map!
*/

// Calls the initializeMap() function when the page loads
window.addEventListener('load', initializeMap);

// Vanilla JS way to listen for resizing of the window
// and adjust map bounds
window.addEventListener('resize', function(e) {
  //Make sure the map bounds get updated on page resize
 map.fitBounds(mapBounds);
});
