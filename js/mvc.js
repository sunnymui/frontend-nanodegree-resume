// Resume builder module - define it and immediately invoke it
var ResumeBuilder = (function(data) {

  var data = {

  };

  // init all our internal data objects for use inside the resumebuilder
  var bio = data.bio || {};
  var work = data.work || {};
  var projects = data.projects || {};
  var education = data.education || {};
  var awards = data.awards || {};
  var maps = data.maps || {};
  var footer = data.footer || {};

  // utility functions private submodule
  var util = {
    replaceAll: function(string, search, replace) {
        /*
        New method to replace all instances of a match in a string.
        This will replace every occurence of a matched string.
        Args: search(string) is what youre looking for, replace(string) is
        what to replace it with
        return: string with the matched words replaced
        */
        if (replace === undefined) {
            return string.toString();
        }
        return string.split(search).join(replace);
    }
  };

  var resume = {
    model: {

    },
    control: {

    },
    view: {

    }
  };

  // google maps API private submodule
  // since it's not a function, only one instance of this is allowed
  // and has to be named gmap
  var gmap = {
    data: {
      map: {},
      bounds: {},
      locations: [],
      places: [],
      markers: [],
      info_windows: []
    },
    model: {
      init: function() {
        // grab the map div in the dom
        var map_div = document.querySelector('.map');
        // populate locations from locations in work/lived places
        gmap.data.locations = this.init_locations_data();
        // instantiate the actual Map object attached to map div
        gmap.data.map = this.init_map(map_div);
        // get and add all the marker objects to the markers array using place data
        this.add_all_markers(gmap.data.locations);
      },
      get: function(data_type) {
        /*
        Grabs the data from the module's data storage object.
        Args: data_type (string) - type of data to return
        Return: the data requested (array or obj)
        */
        // init var to store the data accessed
        var fetched_data;

        // check what type of data was requested
        switch (data_type) {
          case 'map':
            // set fetched data equal to the map instance
            fetched_data = gmap.data.map;
            break;
          case 'bounds':
            // set fetched data equal to the map instance
            fetched_data = gmap.data.bounds;
            break;
          case 'locations':
           // grab the locations data generated from school/bio/edu
            fetched_data = gmap.data.locations;
            break;
          case 'places':
            // grab place data from the google place data API
            fetched_data = gmap.data.places;
            break;
          case 'markers':
            // grab the markers data created from the place data
            fetched_data = gmap.data.markers;
            break;
          case 'infos':
            // grab the markers data created from the place data
            fetched_data = gmap.data.info_windows;
            break;
        }

        // return the retrieved data
        return fetched_data;
      },
      // get locations from raw data
      init_locations_data: function() {
        /*
        Returns an array of every location string from the high level data
        written for bio, education, and work in data objects.
        Return: array of location strings
        */
        // initializes an empty array
        var locations = [];

        // adds the single location property and the hometown from bio to the locations array
        locations.push(bio.location, bio.hometown);

        // iterates through school locations and appends each location to
        // the locations array.
        education.schools.forEach(function(school){
          locations.push(school.location);
        });

        // iterates through work locations and appends each location to
        // the locations array.
        work.jobs.forEach(function(job){
          locations.push(job.location);
        });

        return locations;
      },
      add_all_markers: function(locations) {
        // create a place service object to get api place data from locations
        // docs: https://developers.google.com/maps/documentation/javascript/places#TextSearchRequests
        var service = new google.maps.places.PlacesService(this.get('map'));
        // loop through the places array
        locations.forEach(function(location){
          // create a marker object for each place
          this.get_place_add_marker(location, service);
        }, this);
      },
      get_place_add_marker:  function(location, places_service) {
        /*
        reads Google Places search results to create map pins.
        placeData is the object returned from search results containing information
        about a single location.
        Then creates the marker pin objects for each location async.
        Args: location (string) - the location string to get placedata for
              places_service - the placesService api object to search with
        return: na
        */
        // format the location search for the places api request
        var request = {
          query: location
        };

        // Actually searches the Google Maps API for location data and validates
        // the data is ok for the search
        places_service.textSearch(request, this.add_marker.bind(this));

      },
      add_marker: function(results, status){
        /*
        Adds a marker and marker pin to the map.
        Args: results (obj) - the results obj returned from the places
                        api search
              status (string) - the status of the api request
        Return: na
        */
        // validates that the search returned results for a location.
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          // init var for the info window for a marker
          var info_window;
          // save place data from api search results
          var place_data = results[0];

          // marker is an object with additional data about a
          // pin for a single location
          var marker = new google.maps.Marker({
            // the map object
            map: this.get('map'),
            // add a marker to the map using the placeId
            place: {
              // the unique identifier of the specific place
              placeId: place_data.place_id,
              // the place's lat/lng coordinates in location prop
              location: place_data.geometry.location
            },
            // formatted name of the address
            title: place_data.name + ', ' + place_data.formatted_address
          });

          // create an info window for a marker
          info_window = this.add_info_window(marker);
          // position the map to have the marker be visible
          gmap.view.resize_map_bounds(this.get('bounds'), place_data);
          // listen for clicks on the map pin
          gmap.control.add_marker_listener(marker, info_window);

          // push the current marker into the markers array
          this.get('markers').push(marker);
          // push the current info window in the info windows array
          this.get('infos').push(info_window);
        }
      },
      add_info_window: function(marker) {
        /*
        Constructs an info window object that shows info about
        a marker location when shown with the .open() method.
        Args: marker (obj) - a marker object
        Return: infoWindow - the info window object instance
        */
        // infoWindows are the little helper windows that open when you click
        // or hover over a pin on a map. They usually contain more information
        // about a location.
        var infoWindow = new google.maps.InfoWindow({
          content: '<h3>'+marker.title+'</h3>'
        });

        return infoWindow;
      },
      init_map: function(target) {
        /*
        Does initial instantiation of the map object and attaches it to a dom
        node, then sets the creates a mapbounds object that will allow the map
        pin locations to determine the map boundaries.
        Args: target (dom node) - a queried dom node to attach the map to
        Return: the google map instance (obj)
        */
        // stores the map instance
        var map;
        // create the map object and append it to the map div
        map = new google.maps.Map(target);
        // Used to set the boundaries of the map based on pin locations
        gmap.data.bounds = new google.maps.LatLngBounds();

        return map;
      },
      set_map: function(options) {
        /*
        Sets the map display properties, options, and map type/style to use.
        Args: options (obj) - a table containing the properties to set in the
              map. should contain: the style id string to use for the map theme,
              the map displayOptions object, the styledmaptype object for the theme
        Return: na
        */
        // name of the style id to assign to the styledmaptype that will be applied
        var style_id = options.style_id;

        // set the map's general mapDisplay options object settings
        this.get('map').setOptions(options.display_options);
        // associate the 'styled map' map type with the styled_map maptypeid
        this.get('map').mapTypes.set(style_id, options.map_type);
        // set the current map type id to styledmap to switch the styling
        this.get('map').setMapTypeId(style_id);
      },
    },
    control: {
      init: function() {
        gmap.model.init();
        gmap.view.init();
        // add event listener to listen for window resizing
        this.add_window_resize_listener();
      },
      // attach event listeners
      add_window_resize_listener: function() {
        // Vanilla JS way to listen for resizing of the window
        // and adjust map bounds
        window.addEventListener('resize', function(e) {
          // Make sure the map bounds get updated on page resize
         gmap.model.get('map').fitBounds(gmap.model.get('bounds'));
        });
      },
      add_marker_listener: function(marker, info_window) {
        // listen for clicks on the current google map marker
        google.maps.event.addListener(marker, 'click', function() {
          // close any already open info windows so only one shows
          gmap.control.close_all_info_windows();
          // open the infowindow for clicked marker
          info_window.open(gmap.model.get('map'), marker);
        });
      },
      close_all_info_windows: function() {
        // loop through all info window instances
        gmap.model.get('infos').forEach(function(info_window){
          // close the current info_window
          info_window.close();
        });
      }
    },
    view: {
      // set visual theming of the map e.g. colors, etc
      map_theme: [
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
      // settings for options like showing the ui, controls, etc
      map_display_options: {
        disableDefaultUI: true,
        mapTypeControlOptions: {
          mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain',
                  'styled_map']
        }
      },
      init: function() {
        // render the google map element styling in the dom
        this.render_map_style();
      },
      render_map_style: function() {
        /*
        Renders the map with certain style, theming, and display options.
        */

        // create the styledmaptype map styleto be set
        var styledMapType = new google.maps.StyledMapType(this.map_theme, {name: 'Styled Map'});

        gmap.model.set_map({
          // map display options
          display_options: this.map_display_options,
          // the map style theme to use
          map_type: styledMapType,
          // style id to use for the map_theme
          style_id: 'styled_map'
        });
      },
      resize_map_bounds: function(bounds, place) {
        /*
          Extends the map bounds to the google map pin instance and
          fits/centers the map area to the new pin.
          Args: place (obj) - the place data w/ location property,
                bounds (obj) - the bounds object of the map
          Return: na
        */
        // bounds.extend() takes in a map location object
        // extends the map's bounds with the given place location
        bounds.extend(place.geometry.location);
        // fit the visible map to the new marker
        gmap.model.get('map').fitBounds(bounds);
        // center the map
        gmap.model.get('map').setCenter(bounds.getCenter());
      }
    },
  };

  // run google map module after dom loads, bind this to control
  window.addEventListener('load', gmap.control.init.bind(gmap.control));

  // provide public methods and data for the resume app
  return {
    'resume': resume,
    'data': {
      'bio':bio,
      'work':work,
      'projects':projects,
      'education':education,
      'awards':awards,
      'maps':maps,
      'footer':footer
    }
  };
})(data);
