// Hero Section
var HTMLhero = '<header class="hero flex flex-v-center">'+
                  '<div class="center center-text all-caps white">'+
                    '<img src="%pic%" class="round border" alt="Picture of %name%">'+
                    '<h1 class="no-margin deep-shadow italic md-text-size-4 lg-text-size-5 transition ">%name%</h1>'+
                    '<h2 class="no-margin unbold spaced-text md-text-size-2 lg-text-size-3 transition">%role%</h2>'+
                    '<nav>'+
                      '%nav%'+
                    '</nav>'+
                  '</div>'+
                '</header>';

var HTMLnav = '<a class="slide" href="#%data%">%data%</a>';

// Summary Section

var HTMLsummary = '<section class="summary">'+
                      '<a id="summary"></a>'+
                      '%contacts%'+
                      '<div class="container center-text">'+
                        '<h2 class="unbold divider">Summary</h2>'+
                        '<p class="italic intro animated">'+
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
var HTMLcontacts = '<ul class="contact list-no-style all-caps center-text">'+
                   '</ul>';
var HTMLcontact = '<li>'+
                    '<a class="link" href="%link%" title="%tooltip%">'+
                      '<span class="icon-%icon%"></span>'+
                      '%name%'+
                    '</a>'+
                  '</li>';

// qualifications

var HTMLqualification = '<li class="col md-halves lg-thirds flex gutters">'+
                          '<div class="tile-item animated">'+
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

var HTMLwork = '<section class="work">'+
                 '<a id="work"></a>'+
                 '<div class="container center-text">'+
                   '<h2 class="unbold divider">Work and Experience</h2>'+
                   '<ul class="list-no-style">'+
                    '%data%'+
                   '</ul>'+
                 '</div>'+
              '</section>';
var HTMLworkEntry = '<li class="v-margin-1">'+
                      '%?imglink%'+
                      '<img class="inline-top round border-light-gray max-width-5 animated" src="%logo%" alt="%employer% Company Logo" />'+
                      '%?imglink%'+
                      '<div class="entry md-75-max-width inline-middle md-margin-1 center-text md-left-text">'+
                        '<h3 class="unbold no-margin">%role%</h3>'+
                        '%?link%'+
                        '<h4 class="no-margin">%employer% <span class="mid-gray italic small-text unbold">◉ %location%</span></h4>'+
                        '%?link%'+
                        '<h5 class="unbold v-margin-1 mid-gray">'+
                          '<time>%start%</time>'+
                          '<span class="linker"></span>'+
                          '<time>%end%</time>'+
                        '</h5>'+
                        '<p class="left-text">'+
                          '%description%'+
                        '</p>'+
                        '<ul class="left-text">'+
                          '%highlights%'+
                        '</ul>'+
                        '%?testimonial-wrap%'+
                          '%testimonials%'+
                        '%?testimonial-wrap%'+
                      '</div>'+
                    '</li>';
var HTMLworkEntryHighlight = '<li>%data%</li>';
var HTMLworkLinkWrapper = '<a class="link darker-gray" href="%link%" target="_blank">%data%</a>';
var HTMLworkImgLinkWrapper = '<a class="inline-top zoom" href="%link%" target="_blank">%data%</a>';
var HTMLworkTestimonialWrap = '<div class="grid">%data%</div>';
var HTMLworkTestimonial = '<div class="col md-whole lg-halves gutters">'+
                            '<blockquote>'+
                              '%testimonial%'+
                              '<p class="lg-right-text animated">'+
                                '<a class="link" href="%link%" target="_blank">'+
                                '<img class="lg-inline-middle" src="%photo%" alt="Pic and profile of %person%" />'+
                                '<span class="lg-inline-middle left-text">%person%<br>%role%</span>'+
                                '</a>'+
                              '</p>'+
                            '</blockquote>'+
                          '</div>';

// Projects Section

var HTMLprojects = '<section class="projects center-text">'+
                      '<a id="projects"></a>'+
                      '<h2 class="unbold divider">Projects</h2>'+
                      '<div class="grid flex-center">'+
                        '%data%'+
                      '</div>'+
                    '</section>';
var HTMLprojectEntry = '<div class="col md-halves lg-min-width-25 lg-max-width-50 gutters">'+
                          '<article class="left-text animated">'+
                            '<a class="no-link" href="%link%">'+
                              '<div class="relative no-overflow">'+
                                '<h4 class="project-heading absolute no-margin unbold white small-text">%date%</h4>'+
                                '<img class="width-100 zoom" src="%image%" alt="%alttext%" />'+
                                '<h3 class="project-heading absolute unbold no-margin white">%title%</h3>'+
                              '</div>'+
                            '</a>'+
                            '<div class="description truncate lighter-gray padding-05">'+
                              '%description%'+
                            '</div>'+
                            '<a class="link small-text all-caps read-more" href="#">+ More</a>'+
                          '</article>'+
                        '</div>';
var HTMLprojectDesc = '<p>%data%</p>';

// Education Section

var HTMLeducation = '<section class="education">'+
                       '<a id="education"></a>'+
                       '<div class="container center-text">'+
                         '<h2 class="unbold divider">Education</h2>'+
                         '<ul class="list-no-style">'+
                          '%schools%'+
                         '</ul>'+
                         '<h2 class="unbold divider">Professional Coursework</h2>'+
                         '<ul class="list-no-style">'+
                          '%courses%'+
                         '</ul>'+
                       '</div>'+
                    '</section>';
var HTMLschoolEntry = '<li class="v-margin-1">'+
                        '<a class="inline-top zoom" href="%link%" target="_blank">'+
                          '<img class="inline-top round border-light-gray max-width-5 animated" src="%logo%" alt="%school% Logo" />'+
                        '</a>'+
                        '<div class="entry md-75-max-width inline-middle md-margin-1 center-text md-left-text">'+
                          '<h3 class="unbold no-margin">%degree% in %major%</h3>'+
                          '<a class="link darker-gray" href="%link%" target="_blank">'+
                            '<h4 class="no-margin">%school% <span class="mid-gray italic small-text unbold">◉ %location%</span></h4>'+
                          '</a>'+
                          '<h5 class="unbold v-margin-1 mid-gray">'+
                            '<time>%start%</time>'+
                            '<span class="linker"></span>'+
                            '<time>%end%</time>'+
                          '</h5>'+
                          '<p class="left-text">'+
                            '%description%'+
                          '</p>'+
                          '%?testimonial-wrap%'+
                            '%testimonials%'+
                          '%?testimonial-wrap%'+
                        '</div>'+
                      '</li>';
var HTMLschoolTestimonialWrapper = '<div class="grid">%data%</div>';
var HTMLschoolTestimonial = '<div class="col md-whole lg-halves gutters">'+
                              '<blockquote>'+
                                '%testimonial%'+
                                '<p class="lg-right-text animated">'+
                                  '<a class="link" href="%link%" target="_blank">'+
                                  '%?optional%'+
                                  '<img class="lg-inline-middle" src="%photo%" alt="Pic and profile of %person%" />'+
                                  '%?optional%'+
                                  '<span class="lg-inline-middle left-text">%person%<br>%role%</span>'+
                                  '</a>'+
                                '</p>'+
                              '</blockquote>'+
                            '</div>';

// Professional Coursework section

var HTMLcourseEntry = '<li class="v-margin-1">'+
                        '<a class="inline-top zoom" href="%link%" target="_blank">'+
                          '<img class="inline-top round border-light-gray max-width-5 animated" src="%logo%" alt="%title% Course Logo" />'+
                        '</a>'+
                        '<div class="entry md-75-max-width inline-middle margin-1 center-text md-left-text">'+
                          '<h3 class="unbold no-margin">%course%</h3>'+
                          '<a class="link darker-gray" href="%link%" target="_blank">'+
                            '<h4 class="no-margin">%school% '+
                              '%?optional%'+
                              '<span class="mid-gray italic small-text unbold">Instructor - %instructor%</span>'+
                              '%?optional%'+
                            '</h4>'+
                          '</a>'+
                          '<h5 class="unbold v-margin-1 mid-gray">'+
                            '<time>%dates%</time>'+
                          '</h5>'+
                          '<p class="left-text">'+
                            '%description%'+
                          '</p>'+
                        '</div>'+
                      '</li>';

// Location Section

var HTMLmap = '<section class="location">'+
                '<a id="contact"></a>'+
                '<div class="container center-text">'+
                  '<h2 class="unbold divider">Where I Work + Live</h2>'+
                  '<p class="no-margin-top">'+
                    'I\'ve worked in Silicon Valley and roamed all around the Bay Area on my journey. I currently reside in %location%, but I\'ve also lived in San Francisco and my original hometown is %hometown%.'+
                  '</p>'+
                  '<div class="map animated"></div>'+
                '</div>'+
              '</section>';

// Footer

var HTMLfooter = '<div class="footer-links padding-05 grid flex-v-center">'+
                   '<a class="col link white md-thirds" href="#top">↑ Back to Top</a>'+
                   '<a class="col link white md-thirds" href="https://sunnymui.github.io/one-page-portfolio/">Portfolio</a>'+
                   '<p class="col no-margin white small-text md-thirds">© 2016 Sunny Mui</p>'+
                 '</div>';

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
    disableDefaultUI: true,
    mapTypeControlOptions: {
            mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain',
                    'styled_map']
          }
  };

  // create a map style theme
  var styledMapType = new google.maps.StyledMapType(
    [
      {
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#1d2c4d"
          }
        ]
      },
      {
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#8ec3b9"
          }
        ]
      },
      {
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#1a3646"
          }
        ]
      },
      {
        "featureType": "administrative.country",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#4b6878"
          }
        ]
      },
      {
        "featureType": "administrative.land_parcel",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#64779e"
          }
        ]
      },
      {
        "featureType": "administrative.neighborhood",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "administrative.province",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#4b6878"
          }
        ]
      },
      {
        "featureType": "landscape.man_made",
        "stylers": [
          {
            "color": "#0c485a"
          }
        ]
      },
      {
        "featureType": "landscape.man_made",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#334e87"
          }
        ]
      },
      {
        "featureType": "landscape.natural",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#023e58"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#283d6a"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#6f9ba5"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#1d2c4d"
          }
        ]
      },
      {
        "featureType": "poi.business",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#023e58"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "labels.text",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#3C7680"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#304a7d"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "labels",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#98a5be"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#1d2c4d"
          }
        ]
      },
      {
        "featureType": "road.arterial",
        "stylers": [
          {
            "color": "#dc997c"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "stylers": [
          {
            "color": "#d52828"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#2c6675"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#255763"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#b0d5ce"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#023e58"
          }
        ]
      },
      {
        "featureType": "road.local",
        "stylers": [
          {
            "color": "#f4e475"
          }
        ]
      },
      {
        "featureType": "transit",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#98a5be"
          }
        ]
      },
      {
        "featureType": "transit",
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#1d2c4d"
          }
        ]
      },
      {
        "featureType": "transit.line",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#283d6a"
          }
        ]
      },
      {
        "featureType": "transit.station",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#3a4762"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#0e1626"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels.text",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#4e6d70"
          }
        ]
      }
    ],
  {name: 'Styled Map'});

  /*
  For the map to be displayed, the googleMap var must be
  appended to #mapDiv in resumeBuilder.js.
  */
  map = new google.maps.Map(document.querySelector('.map'), mapOptions);

  // associate the styled map with the maptypeid and display it
  map.mapTypes.set('styled_map', styledMapType);
  map.setMapTypeId('styled_map');


  /*
  locationFinder() returns an array of every location string from the JSONs
  written for bio, education, and work.
  */
  function locationFinder() {

    // initializes an empty array
    var locations = [];

    // adds the single location property and the hometown from bio to the locations array
    locations.push(bio.location, bio.hometown);

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
      content: '<h3>'+name+'</h3>'
    });

    // hmmmm, I wonder what this is about...
    google.maps.event.addListener(marker, 'click', function() {
      // your code goes here!
      infoWindow.open(map, marker);
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
