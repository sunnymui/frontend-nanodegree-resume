// Resume builder module - define it and immediately invoke it
var ResumeBuilder = (function(data){

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

  // google maps API private submodule
  // since it's not a function, only one instance of this is allowed
  // and has to be named gmap
  var gmap = {
    data: {
      map: {},
      bounds: {},
      locations: [],
      places: [],
      markers: []
    },
    model: {
      init: function() {
        // grab the location data from the main data constants
        gmap.data.locations = this.get_locations();
        // get place data from the google api and store in gmap.data.places
        gmap.data.places = this.get_all_places(gmap.data.locations);
        // get and add all the marker objects using place data
        gmap.data.markers = this.add_all_markers(gmap.data.places);
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
        }

        // return the retrieved data
        return fetched_data;
      },
      // get locations
      get_locations: function() {
        /*
        Returns an array of every location string from the high level data
        written for bio, education, and work.
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
      get_all_places: function(locations) {
        // array to store all found place data
        var places = [];
        // init var for current place in loop
        var current_place;
        // Iterates through the array of locations, getting place data for each location
        locations.forEach(function(location) {
          // sets the query for a certain place that will will be requested from api
          var request = {
            query: location
          };
          // get place data for the current location from api
          current_place = this.get_place(request);
          // if a place was found returned
          if (current_place) {
            // push found place to places array
            places.push(current_place);
          }

        });

        return places;
      },
      get_place: function(request) {
        // creates a Google place search service object. PlacesService does the work of
        // actually searching for location data.
        var service = new google.maps.places.PlacesService(gmap.data.map);
        // init var to store map marker location data
        var place_data;

        // Actually searches the Google Maps API for location data and validates
        // the data is ok for the search
        service.get_place.textSearch(request, function(results, status){
          // validates that the search returned results for a location.
          if (status == google.maps.places.PlacesServiceStatus.OK) {
            // set marker equal to the result data
            place_data = results[0];
          }
        });

        return place_data;
      },
      add_all_markers: function(places) {
        // loop through the places array
        places.forEach(function(place){
          // create a marker object for each place
          this.add_marker(place);
        });
      },
      add_marker: function(placeData) {
        /*
        reads Google Places search results to create map pins.
        placeData is the object returned from search results containing information
        about a single location.
        */
        // The next lines save location data from the search result object to local variables
        var name = placeData.formatted_address;   // name of the place from the place service

        // marker is an object with additional data about the pin for a single location
        var marker = new google.maps.Marker({
          map: gmap.data.map,
          position: placeData.geometry.location,
          title: name
        });

        // store a reference to the current marker in the markers array
        gmap.data.markers.push(marker);

        // return the constructed marker in case other stuff needs it
        return marker;
      },
      set_map: function(options) {
        var map_div = options.target;
        var display_options = options.display_options;
        var map_type = options.map_type;
        var style_id = 'styled_map';

        // create the map object and append it to the map div
        gmap.data.map = new google.maps.Map(options.target, options.display_options);
        // set the current map theme as the 'styled map' map type
        gmap.data.map.mapTypes.set(options.style_id, options.map_type);
        // set the current map id to as styledmap
        gmap.data.map.setMapTypeId(options.style_id);
        // Sets the boundaries of the map based on pin locations
        gmap.data.mapBounds = new google.maps.LatLngBounds();
      },
      add_map_pin: function(latitude, longitude, bounds) {
        /*
          Adds a new map pin object to the google map instance and fits the map
          area to the new pin.
        */
        // bounds.extend() takes in a map location object
        // extends the map's bounds with the given latlng instance
        bounds.extend(new google.maps.LatLng(lat, lon));
        // fit the visible map to the new marker
        gmap.data.map.fitBounds(bounds);
        // center the map
        gmap.data.map.setCenter(bounds.getCenter());
      }
    },
    control: {
      init: function() {
        gmap.model.init();
        gmap.view.init();

        // add event listeners to everything to setup interaction
        this.add_all_event_listeners();
      },
      // attach event listeners
      add_all_event_listeners: function() {

        // add marker event listeners for all map marker objects
        gmap.data.markers.forEach(function(marker){
          // add event listener for current marker in the array
          this.add_marker_listener(marker);
        });

        // Vanilla JS way to listen for resizing of the window
        // and adjust map bounds
        window.addEventListener('resize', function(e) {
          // Make sure the map bounds get updated on page resize
         gmap.data.map.fitBounds(gmap.data.mapBounds);
        });
      },
      add_marker_listener: function(marker) {
        // infoWindows are the little helper windows that open when you click
        // or hover over a pin on a map. They usually contain more information
        // about a location.
        var infoWindow = new google.maps.InfoWindow({
          content: '<h3>'+marker.title+'</h3>'
        });

        // listen for clicks on the current google map marker
        google.maps.event.addListener(marker, 'click', function() {
          // open the infowindow for clicked marker
          infoWindow.open(gmap.data.map, marker);
        });
      }
    },
    view: {
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
      map_display_options: {
        disableDefaultUI: true,
        mapTypeControlOptions: {
          mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain',
                  'styled_map']
        }
      },
      init: function() {
        // render the google map element in the dom
        this.render_map();
        // add the pins to the google map element w/ the place data
        this.render_pins(gmap.model.get('places'));
      },
      render_map: function() {
        /*
        renders the actual google map element in the dom
        */
        // grab the map div in the dom
        var map_div = document.querySelector('.map');
        // create the styledmaptype map styleto be set
        var styledMapType = new google.maps.StyledMapType(this.map_theme, {name: 'Styled Map'});

        gmap.model.set_map({
          // where in dom to append the map element
          target: map_div,
          // map display options
          display_options: this.map_display_options,
          // the map style theme to use
          map_type: styledMapType
        });
      },
      render_pins: function(places) {
        /*
        takes in the array of places, puts pins on the map element for each location
        */

        // Iterates through the array of places, rendering the pin for each place
        places.forEach(function(place) {
          // render the pin for the current place
          this.render_pin(place);
        });
      },
      render_pin: function(placeData) {
        /*
        reads Google Places search results to create map pins.
        placeData is the object returned from search results containing information
        about a single location.
        */
        // The next lines save location data from the place object to local variables
        var lat = placeData.geometry.location.lat();  // latitude from the place service
        var lon = placeData.geometry.location.lng();  // longitude from the place service
        var bounds = gmap.data.mapBounds;            // current boundaries of the map window

        // this is where the pin actually gets added to the map.
        gmap.model.add_map_pin(lat, lon, bounds);
      }
    }
  };

  // main resumebuilder app submodule
  var resume = {
    model: {
      init: function() {

      }
    },
    control: {
      init: function() {

      }
    },
    view: {
      templates: {

      },
      init: function() {

      }
    }
  };

  // initialize the google map submodule when the page has loaded
  window.addEventListener('load', gmap.control.init);

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
