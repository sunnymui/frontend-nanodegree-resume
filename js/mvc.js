// Resume builder module - define it and immediately invoke it
var ResumeBuilder = (function(data, jQuery) {

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
    },
    first_letters: function(string) {
        /*
        Takes in a string and returns the first 2 letters of that string.
        Cuts out any white space before or after the string, so only gets actual letters.
        ex. for the string 'hello', the return will be 'he'
        Args: the word you want the first 2 letters of (string)
        Return: the first 2 letters (string)
        */
        // trim out white space from beginning and end
        var trimmed = string.trim();
        // get a slice of the string form beginning to 2nd character
        return trimmed.slice(0, 2);
    },
    default_for: function(argument, value) {
        /*
        Sets a default argument for a function if specified argument is undefined.
        Args: argument in the function you're checking/setting default for, value of the default argument
        Return: undefined argument - default value, otherwise the user defined argument value
        */
        // checks if argument is undefined
        // ? : are conditional ternary operators meaning:
        // condition ?  value if true : value if false
        return typeof argument !== 'undefined' ? argument : value;
    }
  };

  // plugins module - container for all plugin code/scripts for resumeBuilder
  var plugins = {
    init: function() {
      // add .visible function to jquery library
      this.extend_visible_to_jquery(jQuery);
    },
    extend_visible_to_jquery: function($) {
      // extends jquery with the .visible function
      /**
       * Copyright 2012, Digital Fusion
       * Licensed under the MIT license.
       * http://teamdf.com/jquery-plugins/license/
       *
       * @author Sam Sehnert
       * @desc A small plugin that checks whether elements are within
       *     the user visible viewport of a web browser.
       *     only accounts for vertical position, not horizontal.
       */

      window.$.fn.visible = function(partial) {

          var $t = $(this),
              $w = $(window),
              viewTop = $w.scrollTop(),
              viewBottom = viewTop + $w.height(),
              _top = $t.offset().top,
              _bottom = _top + $t.height(),
              compareTop = partial === true ? _bottom : _top,
              compareBottom = partial === true ? _top : _bottom;

          return ((compareBottom <= viewBottom) && (compareTop >= viewTop));

      };
    },
    scrollspy: function(nav_link) {
        /*
        Minimal Scrollspy plugin
        https://jsfiddle.net/mekwall/up4nu/
        Modified and broken up into multiple encapsulated functions to make it so
        I can use one scroll listener for all my functions.
        Modified add/hide class behavior due to dom structure.
        */

        // return an instance of the object without needing the new keyword syntax
        if (!(this instanceof plugins.scrollspy)) {
            return new plugins.scrollspy(nav_link);
        }

        this.nav_item_map = function() {
            /*
            Creates an array of each nav anchor element using the map function.
            Used for the scrollspy highlighting function.
            Args: target(passed in via outer scroll spy function) - the nav anchor elements
            to create the mapped array with
            Return: a mapped array of each nav anchor element in the nav menu
            */

            return $(nav_link).map(function() {
                // gets the href for each nav link
                var item = $($(this).attr("href"));
                // return an item if it has an href
                if (item.length) {
                    return item;
                }
            });
        };

        this.highlight = function(active_class, nav_item_map, nav_height) {
            /*
            Add active class to the nav item in the menu linked to the respective onpage
            anchor when the user has scrolled past or in it's respective section.
            Requires a cached jquery window selector.
            Args: target(passed in via outer scrollspy() scope) - the nav menu link elements
            nav_item_map(array) - the mapped array for the nav menu items,
            active_class(string) - css class to apply to nav menu items when active,
            nav_height(number) - height of the nav menu,
            */

            // initialize var for id storage
            var lastId;
            // Get container scroll position
            var fromTop = $(window).scrollTop() + nav_height;

            // Get id of current scroll item
            var cur = nav_item_map.map(function() {
                // if the vertical position of the current item is less than the scrollbar position
                // return this item as the current
                if ($(this).offset().top < fromTop)
                    return this;
            });

            // Get the id of the current element
            cur = cur[cur.length - 1];
            var id = cur && cur.length ? cur[0].id : "";

            if (lastId !== id) {
                lastId = id;
                // note: this section modified to make it work in a non ul-li-a structure
                var current_nav_link = 'nav a[href="#' + id + '"]';
                // clear any active classes on the nav links
                $(nav_link).removeClass(active_class);
                // add an active class to the current link corresponding to the section
                $(current_nav_link).addClass(active_class);
            }
        };
      }
  };

  // resume html generator and displayer module
  var resume = {
    model: {
      init: function() {
      },
      get: function(data_type) {
        // return requested data type
        return data[data_type];
      }
    },
    control: {
      // maybe some features can go here since dealing with interaction
      init: function() {
        resume.model.init();
        resume.view.init();

        // Enable JS interactive features for the page

        // shortcut reference to the features functions in control
        var features = resume.control.features;
        // shortcut to dom selector references
        var selectors = resume.view.dom.selectors;
        // shortcut to dom classes
        var classes = resume.view.dom.class;

        // read more button allowing show/hide functionality for truncated elements
        features(selectors.$read_more_btn).read_more(classes.description, classes.truncate);
        // smooth animated to top button jumping to top of the page
        features(selectors.$top_btn).to_top();
        // calculate height of the nav element
        var nav_height = selectors.$nav.outerHeight() + 15;
        // smooth animated nav link on page jumps
        features(selectors.$nav_link).animate_nav_jump(nav_height);

        // Scroll Function Vars

        // get the distance of the nav from the top of the window for sticky nav function
        var nav_distance_from_top = selectors.$nav.offset().top;
        // correct the nav distance to top of page if window is resized
        $(window).resize(function() {
            nav_distance_from_top = selectors.$nav.offset().top;
        });
        // mapped array of nav menu anchors for scrollspy plugin use
        var nav_map = plugins.scrollspy(selectors.$nav_link).nav_item_map();

        // Run scroll event dependent features
        $(window).scroll(function() {
            // sticky nav menu when scrolling past it's initial page location
            features(selectors.$nav).sticky_nav(classes.fixed, nav_distance_from_top);
            // play css animation when an element is visible in the window
            features(selectors.$animated_element).animate_visible(classes.fade_animate);
            // Scrollspy Plugin to highlight nav menu items when you're in that section
            plugins.scrollspy(selectors.$nav_link).highlight(classes.active_nav, nav_map, nav_height);
        });

      },
      features: function(target) {
          /*

          Features functions enable additional functionality of some sort.
          Wrapper function for encapsulation of features functions.

          Args: target (string or jquery dom selector) - target element for a specific feature function

          */

          if (!(this instanceof resume.control.features)) {
              return new resume.control.features(target);
          }

          this.read_more = function(truncated_element_class, truncator_class) {
              /*
              Enables show/hide function in conjunction with a css class that shows/hides content.
              Searches for buttons that trigger show/hide behavior, then finds the content
              linked to that button and toggles the truncation class to show/hide content when clicked.
              Also changes the button text to either more or less to reflect the toggle action.
              Ex: <div class="description truncate">Some content</div>
                  <a class="read-more" href="#">+ More</a>
                  becomes:
                  <div class="description">Some content</div>
                  <a class="read-more" href="#">+ Less</a>
              Args: target (passed in outer features() scope) - the selector for
              the see more button that will trigger show/hide on click (),
              selector for the element that is currently being truncated by a css class (string),
              the class name to remove or add when the button is clicked, without the '.' (string)
              Returns: none
              */

              // the text for the button to switch between
              var more_text = '+ More';
              var less_text = '- Less';

              // when the button is clicked find the content, toggle class, and change button text
              $(target).click(function(e) {

                  // cache the current button triggering the event
                  var $this = $(this);
                  // get the content element that's specifically related to the button pressed
                  var current_content = $this.siblings(truncated_element_class);
                  // toggle the truncation class
                  $(current_content).toggleClass(truncator_class);

                  // trim spaces to ensure consistent matches for the button text
                  var button_text = $this.text().trim();
                  // if button text says more, change to 'less', else change it to 'more'
                  if (button_text == more_text) {
                      $this.text(less_text);
                  } else {
                      $this.text(more_text);
                  }

                  // prevent default <a> behavior of jumping to top of page when clicking # links
                  e.preventDefault();
              });
          };

          this.to_top = function() {
              /*
              Filters anchor elements by links pointing to #top then scrolls the window to
              the top of the document when an anchor is clicked with a smooth animation.
              Needs a jquery selector for the page (html, body) to scroll.
              Args: target (passed in outer features() scope) - the selector for the button
              that will trigger the jump to the top of the page
              Return: none
              */

              var $page = $('html, body');
              // animate scroll when to top button is clicked

              // when a to-top button is clicked,
              $(target).click(function(e) {
                  // scroll the page to the top and animate the movement
                  $page.animate({
                      scrollTop: 0
                  }, 'medium');
                  // prevent default of clicking a link jumping to that location
                  e.preventDefault();
              });
          };

          this.sticky_nav = function(fixed_class, nav_distance_from_top) {
              /*
              Makes header nav sticky when top of the window scrolls to the nav element's position.
              Requires a jquery cached selector for window.
              Args: target (passed in to outer features() scope) - the nav element to stickify,
              fixed_class (string) - the css class to apply to make the nav fixed position,
              nav_distance_from_top (numebr)- the pixel distance of the nav from the top of the page
              Return: none
              */

              // every scroll event check if current distance to top of the page is
              // greater than or equal to distance of the nav to the top
              if ($(window).scrollTop() >= nav_distance_from_top) {
                  // if distance is greater then we're below the nav position and if
                  // equal the nav is right at the top of the page and should be stickied
                  // so add the fixed class
                  $(target).addClass(fixed_class);
              } else {
                  // remove the stickying if we're scrolled above the nav's position
                  $(target).removeClass(fixed_class);
              }

          };

          this.animate_visible = function(animation_class) {
              /*
              Animates items with the animated element class when visible in the window.
              Depends on the .visible jquery function mini plugin.
              Args: target (passed into outer features() scope) - the selected element(s) to load animations on
              animation_class - the css class applied to create the css animation
              Return: none
              */

              // loop through animated elements checking if theyre visible
              $(target).each(function(i, el) {

                  // current elements
                  var element = $(el);
                  // check if they are visible
                  if (element.visible(true)) {
                      // add animation class if they are visible
                      element.addClass(animation_class);
                  }
              });

          };

          this.animate_nav_jump = function(nav_height) {
              /*
              Bind click handler to menu items so we can get a fancy scroll animation.
              Requires a cached jquery selector for the page.

              Args: target(passed in as arg via outer features() scope) - the nav link elements,
              nav_height(number) - pixel height of nav bar area to account for when scrolling to section
              Return: none
              */
              var $page = $('html, body');

              $(target).click(function(e) {
                  // get the anchor link href
                  var href = $(this).attr("href");
                  // set offset equal to href then check if its a '#', if so set offset to 0
                  // otherwise set it equal to the offset amount of the clicked anchor - nav height
                  var offsetTop = href === "#" ? 0 : $(href).offset().top - nav_height + 1;
                  // animate the scroll jump to the anchor location
                  $page.stop().animate({
                      scrollTop: offsetTop
                  }, 300);
                  // stop default behavior link jump
                  e.preventDefault();
              });
          };

      }
    },
    view: {
      dom: {
        class: {
          truncate: 'truncate lighter-gray',
          fixed: 'fixed-wrapper no-margin',
          // class to add when element is visible
          fade_animate: 'fadeInDown',
          active_nav: 'active',
          description: '.description'
        },
        selectors: {
          $nav: $('nav'),
          $nav_link: $('nav a'),
          $read_more_btn: $('.read-more'),
          // filter anchors in document linking to the top anchor
          $top_btn: $('a[href="#top"]'),
          // get element(s) with this class for animating
          $animated_element: $('.animated'),
          // essential build selectors neccessary for display functions
          $main: $('main'),
          $footer: $('footer')
        }
      },
      init: function() {
        // render each section of the resume
        this.render.bio();
        this.render.work();
        this.render.projects();
        this.render.education();
        this.render.maps();
        this.render.footer();

        // refresh the dom elements in selectors since stuff was rendered
        this.refresh_all_selectors();

        // run google map module after dom loads, bind this to control
        window.addEventListener('load', gmap.control.init.bind(gmap.control));
      },
      refresh_all_selectors: function() {
        /*
        Refreshes all the selectors in the view.dom.selectors table by looping
        through them and running refresh_selector on each one, resetting their
        value in the selectors table.

        Args: na
        Return: na
        */
        // shortcut reference to the selectors obj
        var selectors = this.dom.selectors;

        // loop through every selector in selectors
        for (var selector in selectors) {
          // refresh the current selector
          selectors[selector] = this.refresh_selector(selectors[selector]);
        }
      },
      refresh_selector: function(jquery_collection) {
        /*
        Refreshes a selector by getting it from the dom again with jquery. Used
        to update a reference to a dom obj grabbed at execution time when it might
        not have existed, like in the view.dom.selectors object before display
        functions have run. Note that newer jquery might not have selector property.

        Args: jquery_collection (obj) - the jquery dom object that was selected
        Return: the updated dom element jquery collection (obj)
        */
        // use the selector property from the jquery collection to fetch again
        return $(jquery_collection.selector);
      },
      // display the html, html templates?
      templates: {
        hero: {
          // was hero
          header: '<header class="hero flex flex-v-center">'+
                    '<div class="center center-text all-caps white">'+
                      '<img src="%pic%" class="round border" alt="Picture of %name%">'+
                      '<h1 class="no-margin deep-shadow md-text-size-4 lg-text-size-5 transition ">%name%</h1>'+
                      '<h2 class="no-margin unbold spaced-text md-text-size-2 lg-text-size-3 transition">%role%</h2>'+
                      '<nav>'+
                        '%nav%'+
                      '</nav>'+
                    '</div>'+
                  '</header>',
          nav: '<a class="slide" href="#%data%">%data%</a>'
        },
        summary: {
          // was summary
          section: '<section class="summary">'+
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
                   '</section'
        },
        contacts: {
          // was contacts
          list: '<ul class="contact list-no-style all-caps center-text">'+
                    '</ul>',
          // was contact
          entry: '<li>'+
                    '<a class="link" href="%link%" title="%tooltip%">'+
                      '<span class="icon-%icon%"></span>'+
                      '%name%'+
                    '</a>'+
                  '</li>'
        },
        qualifications: {
          // was qualification
          entry: '<li class="col md-halves lg-thirds flex gutters">'+
                            '<div class="tile-item">'+
                              '<h4 class="big-5-text no-margin animated">%symbol%</h4>'+
                              '<h4 class="uppercase unbold no-margin spaced-text animated">%name%</h4>'+
                              '<p>%description%</p>'+
                            '</div>'+
                          '</li>'
        },
        skills: {
          group: '<div class="col lg-thirds gutters">'+
                    '<h4 class="no-margin-top">%data%</h4>'+
                    '<ul class="list-no-style list-inline-block">'+
                      '%skills%'+
                    '</ul>'+
                  '</div>',
          // was skill
          entry: '<li class="tag">%data%</li>'
        },
        work: {
          // was work
          section: '<section class="work">'+
                   '<a id="work"></a>'+
                   '<div class="container center-text">'+
                     '<h2 class="unbold divider">Work and Experience</h2>'+
                     '<ul class="list-no-style">'+
                      '%data%'+
                     '</ul>'+
                   '</div>'+
                '</section>',
          entry: '<li class="v-margin-1">'+
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
                  '</li>',
            entry_highlight: '<li>%data%</li>',
            link_wrap: '<a class="link darker-gray" href="%link%" target="_blank" rel="noopener noreferrer">%data%</a>',
            img_link_wrap: '<a class="inline-top zoom" href="%link%" target="_blank" rel="noopener noreferrer">%data%</a>',
            testimonial_wrap: '<div class="grid">%data%</div>',
            testimonial: '<div class="col md-whole lg-halves gutters">'+
                            '<blockquote>'+
                              '%testimonial%'+
                              '<p class="lg-right-text animated">'+
                                '<a class="link" href="%link%" target="_blank" rel="noopener noreferrer">'+
                                '<img class="lg-inline-middle" src="%photo%" alt="Pic and profile of %person%" />'+
                                '<span class="lg-inline-middle left-text">%person%<br>%role%</span>'+
                                '</a>'+
                              '</p>'+
                            '</blockquote>'+
                          '</div>'
        },
        projects: {
          // was projects
          section: '<section class="projects center-text">'+
                        '<a id="projects"></a>'+
                        '<h2 class="unbold divider">Projects</h2>'+
                        '<div class="grid flex-center">'+
                          '%data%'+
                        '</div>'+
                      '</section>',
          entry: '<div class="col md-halves lg-min-width-25 lg-max-width-50 gutters">'+
                    '<article class="left-text animated">'+
                      '<a class="no-link" href="%link%" target="_blank" rel="noopener noreferrer">'+
                        '<div class="relative no-overflow">'+
                          '<h4 class="project-heading absolute no-margin unbold white small-text">%date%</h4>'+
                          '<img class="width-100 zoom" src="%image%" srcset="%srcset%" sizes="%sizes%" alt="%alttext%" />'+
                          '<h3 class="project-heading absolute unbold no-margin white">%title%</h3>'+
                        '</div>'+
                      '</a>'+
                      '<div class="description truncate lighter-gray padding-05">'+
                        '%description%'+
                      '</div>'+
                      '<a class="link small-text all-caps read-more" href="#">+ More</a>'+
                    '</article>'+
                  '</div>',
          description: '<p>%data%</p>'
        },
        education: {
          section: '<section class="education">'+
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
                    '</section>',
          entry: '<li class="v-margin-1">'+
                    '<a class="inline-top zoom" href="%link%" target="_blank" rel="noopener noreferrer">'+
                      '<img class="inline-top round border-light-gray max-width-5 animated" src="%logo%" alt="%school% Logo" />'+
                    '</a>'+
                    '<div class="entry md-75-max-width inline-middle md-margin-1 center-text md-left-text">'+
                      '<h3 class="unbold no-margin">%degree% in %major%</h3>'+
                      '<a class="link darker-gray" href="%link%" target="_blank" rel="noopener noreferrer">'+
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
                  '</li>',
            testimonial_wrap: '<div class="grid">%data%</div>',
            testimonial: '<div class="col md-whole lg-halves gutters">'+
                            '<blockquote>'+
                              '%testimonial%'+
                              '<p class="lg-right-text animated">'+
                                '<a class="link" href="%link%" target="_blank" rel="noopener noreferrer">'+
                                '%?optional%'+
                                '<img class="lg-inline-middle" src="%photo%" alt="Pic and profile of %person%" />'+
                                '%?optional%'+
                                '<span class="lg-inline-middle left-text">%person%<br>%role%</span>'+
                                '</a>'+
                              '</p>'+
                            '</blockquote>'+
                          '</div>'
        },
        courses: {
          entry: '<li class="v-margin-1">'+
                    '<a class="inline-top zoom" href="%link%" target="_blank" rel="noopener noreferrer">'+
                      '<img class="inline-top round border-light-gray max-width-5 animated" src="%logo%" alt="%title% Course Logo" />'+
                    '</a>'+
                    '<div class="entry md-75-max-width inline-middle margin-1 center-text md-left-text">'+
                      '<h3 class="unbold no-margin">%course%</h3>'+
                      '<a class="link darker-gray" href="%link%" target="_blank" rel="noopener noreferrer">'+
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
                  '</li>'
        },
        location: {
          // was map
          section: '<section class="location">'+
                      '<a id="contact"></a>'+
                      '<div class="container center-text">'+
                        '<h2 class="unbold divider">Where I Work + Live</h2>'+
                        '<p class="no-margin-top">'+
                          'I\'ve worked in Silicon Valley and roamed all around the Bay Area on my journey. I currently reside in %location%, but I\'ve also lived in San Francisco and my original hometown is %hometown%.'+
                        '</p>'+
                        '<div class="map animated"></div>'+
                      '</div>'+
                    '</section>'
        },
        footer: {
          // was footer
          section: '<div class="footer-links padding-05 grid flex-v-center">'+
                     '<a class="col link white md-thirds" href="#top">↑ Back to Top</a>'+
                     '<a class="col link white md-thirds" href="https://sunnymui.github.io/one-page-portfolio/">Portfolio</a>'+
                     '<p class="col no-margin white small-text md-thirds">© 2016 Sunny Mui</p>'+
                   '</div>'
        }

      },
      render: {
        bio: function() {
          /*
          Displays the info from the bio data object in the html page.
          Takes the raw data, formats using helpers containing the html template,
          then appends that into places in the dom.
          Args: none as passed parameters, but does get data from the object
          Returns: no returns, but does append formatted html to the page
          */

          //
          // HERO SECTION
          //

          // grab the bio data
          var bio = resume.model.get('bio');
          // shortcut reference to the html templates
          var templates = resume.view.templates;
          // shortcut ref to the html templating functions
          var html = resume.view.html;
          // shortcuts to elements to append built html to
          var $main = resume.view.dom.selectors.$main;
          var $footer = resume.view.dom.selectors.$footer;

          // NAV BAR
          // create nav bar to insert into the hero html tempate

          // initialize var to store nav bar html
          var formatted_nav = '';
          // Navigation Sections
          var nav_links = ['summary', 'work', 'projects', 'education', 'contact'];

          // loop through the nav sections array and format them to add to the hero
          for (var i = 0; i < nav_links.length; i += 1) {
              formatted_nav += html(templates.hero.nav).format(nav_links[i]).html;
          }

          // create the hero area html with the data, format with hero template
          var formatted_hero = html(templates.hero.header).format(bio.biopic, '%pic%')
              .format(bio.name, '%name%')
              .format(bio.role, '%role%')
              .format(formatted_nav, '%nav%')
              .html; // returns the html value from the html object

          // ADD HERO HTML TO PAGE

          // prepend because we want it at the beginning
          $main.prepend(formatted_hero);

          //
          // SUMMARY SECTION
          //

          // CONTACTS
          // Function useful so we don't format the same contact data multiple times.
          // every time we want to append it somewhere on the page

          function displayContact( /* DOM location(s) as arguments */ ) {
              /*
              Displays the contact info from the bio in specified locations on the page.
              Takes raw data from the bio data object, formats it using the appropriate helper
              html template, and puts it in dom location(s) passed as arguments.
              Args: dom locations (string) for each argument
              Return: none, but does append the contact info to the page
              */

              // initialize var to store formatted contact html string
              // cache it so we don't redo the format functions for every dom location
              var formatted_contacts = '';

              // format and show contacts if the array is not empty
              if (bio.contacts.length !== 0) {

                  // loop through each contact and format the html with the data for each contact
                  for (var i = 0; i < bio.contacts.length; i += 1) {
                      // current contact in the contacts array
                      var current_contact = bio.contacts[i];

                      // add each contact's data to the formatted html
                      formatted_contacts += html(templates.contacts.entry).format(current_contact.name, '%name%')
                          .format(current_contact.link, '%link%')
                          .format(current_contact.tooltip, '%tooltip%')
                          .format(current_contact.icon, '%icon%')
                          .html;
                  }

                  // append the formatted contact info to the specified location(s)
                  // loop through arguments object to allow multiple dom locations to be passed
                  for (i = 0; i < arguments.length; i += 1) {
                      var dom_location = arguments[i];
                      $(dom_location).append(formatted_contacts);
                  }

              }

          }

          // SKILLS
          // create skills section html for insertion into the summary html template

          // initialize var to store the formatted skills groups html in
          var formatted_skills_groups = '';

          // add skills if the skills array isn't empty
          if (bio.skills.length !== 0) {

              // loop through skills array to add each skill group and their respective skills
              for (i = 0; i < bio.skills.length; i += 1) {
                  // skills object is essentially a multidimensional array of objects so access is like:
                  // object[object array index][key for inner object array][key of value in innermost array]
                  // bio.skills[i]['Business'][j]

                  // the current skills group in the array
                  var current_group = bio.skills[i];
                  // get the current key for the current skill group's array of skills
                  var current_group_key = Object.keys(current_group);
                  // get the array of skills for the current skill group
                  var current_skills_array = current_group[current_group_key];

                  // initialize var to store the formatted individual skills in
                  var formatted_skills = '';
                  // loop through the current group's skills and format/add each one
                  for (var j = 0; j < current_skills_array.length; j += 1) {
                      // format current skill data into html for every skill in the array and put it all together
                      formatted_skills += html(templates.skills.entry).format(current_skills_array[j]).html;
                  }

                  // format the current skills group with the title and the respective skills
                  // put all the groups together in a single string to insert in the template
                  formatted_skills_groups += html(templates.skills.group).format(current_group_key)
                      .format(formatted_skills, '%skills%')
                      .html;
              }

          }

          // QUALIFICATIONS
          // create qualifications section html for later insertion into summary html template

          // initialize var to store the formatted qualifications html
          var formatted_qualifications = '';

          // add qualifications section if it's not empty
          if (bio.qualifications.length !== 0) {

              // loop through the qualifications array
              for (i = 0; i < bio.qualifications.length; i += 1) {
                  var current_qual = bio.qualifications[i];
                  // add each qualification's data to the html qualifications template
                  formatted_qualifications += html(templates.qualifications.entry).format(util.first_letters(current_qual.name), '%symbol%')
                      .format(current_qual.name, '%name%')
                      .format(current_qual.description, '%description%')
                      .html;
              }

          }

          // now that all the html is ready for insertion, add everything to the summary html template
          var formatted_summary = html(templates.summary.section).format(templates.contacts.list, '%contacts%')
              .format(bio.welcomeMessage, '%welcomemsg%')
              .format(formatted_qualifications, '%qualifications%')
              .format(formatted_skills_groups, '%skillsgroups%')
              .html;

          // APPEND SUMMARY HTML TO PAGE

          // add summary section html to the page
          $main.append(formatted_summary);

          // APPEND CONTACTS HTML

          // add a contacts section to footer for displayContact function to append contacts to
          $footer.append(templates.contacts.list);
          // class of contacts section(s) to append formatted contact html to
          var contact = '.contact';
          // add contacts html to the page
          displayContact(contact);
        },
        work: function() {
          /*
          Displays the info from the work data object in the html page.
          Takes the raw data, formats using helpers containing the html template,
          then appends that into places in the dom.
          Args: none as passed parameters, but does get data from the object
          Returns: no returns, but does append formatted html to the page
          */

          //
          // WORK SECTION
          //

          // grab the work data object
          var work = resume.model.get('work');
          // shortcut reference to the html templates
          var templates = resume.view.templates.work;
          // shortcut ref to the html templating functions
          var html = resume.view.html;
          // shortcuts to elements to append built html to
          var $main = resume.view.dom.selectors.$main;

          // initialize var to store all the formatted job work entries
          var formatted_work_entries = '';

          // loop through each job in the work object to format data
          for (var i = 0; i < work.jobs.length; i += 1) {
              // the current job's data we're checking out
              var current_job = work.jobs[i];
              // initialize an increment counter var here for use in all the loops
              var j = 0;

              // TESTIMONIALS / RECOMMENDATIONS
              // create testimonials section formatted html to add the the work html template later

              // string var to store the formatted testimonials html
              var formatted_testimonials = '';

              // check if there's even any testimonials data
              if (current_job.testimonials.length !== 0) {

                  // loop through the testimonials data and format each one with the html template
                  for (j = 0; j < current_job.testimonials.length; j += 1) {
                      // the current testimonial data we're working with in the object array
                      var current_testimonial = current_job.testimonials[j];

                      // format the data with the testimonial html template and store in the formatted string
                      formatted_testimonials += html(templates.testimonial).format(current_testimonial.text, '%testimonial%')
                          .format(current_testimonial.link, '%link%')
                          .format(current_testimonial.pic, '%photo%')
                          .format(current_testimonial.name, '%person%')
                          .format(current_testimonial.role, '%role%')
                          .html;
                  }
              }

              // HIGHLIGHTS LIST OF JOB DESCRIPTION
              // create the list summarizing job accomplishments, ready it for insertion in work entry html template

              // initialize var string to store formatted job highlights html
              var formatted_highlights = '';

              // check if there are any job highlights to list
              if (current_job.highlights.length !== 0) {

                  // loop through highlights, format, then add to formatted highlights var
                  // using new var k to increment
                  for (j = 0; j < current_job.highlights.length; j += 1) {
                      // the current highlight we're working with in the array
                      var current_highlight = current_job.highlights[j];

                      // add data to the highlight template, then add it to the formatted highlights var
                      formatted_highlights += html(templates.entry_highlight).format(current_highlight).html;
                  }
              }

              // FORMAT WORK ENTRY HTML
              // add all formatted work html subsections
              // to the main work entry template for the current job
              // then add the work entry html to the rest of the entries
              formatted_work_entries += html(templates.entry).format(current_job.logo, '%logo%')
                  .wrap(current_job.link, '%?link%', templates.link_wrap)
                  .wrap(current_job.link, '%?imglink%', templates.img_link_wrap)
                  .format(current_job.link, '%link%')
                  .format(current_job.employer, '%employer%')
                  .format(current_job.title, '%role%')
                  .format(current_job.location, '%location%')
                  .format(current_job.dates.start, '%start%')
                  .format(current_job.dates.end, '%end%')
                  .format(current_job.description, '%description%')
                  .format(formatted_highlights, '%highlights%')
                  .wrap(formatted_testimonials, '%?testimonial-wrap%', templates.testimonial_wrap)
                  .format(formatted_testimonials, '%testimonials%')
                  .html;

          }

          // add the formatted work entries to the work section html template
          var formatted_work = html(templates.section).format(formatted_work_entries).html;

          // APPEND WORK HTML TO THE PAGE

          $main.append(formatted_work);
        },
        projects: function() {
          /*
          Displays the info from the projects data object in the html page.
          Takes the raw data, formats using helpers containing the html template,
          then appends that into places in the dom.
          Args: none as passed parameters, but does get data from the object
          Returns: no returns, but does append formatted html to the page
          */

          //
          // PROJECTS SECTION
          //

          // grab the projects data
          var projects = resume.model.get('projects');
          // shortcut reference to the html templates
          var templates = resume.view.templates.projects;
          // shortcut ref to the html templating functions
          var html = resume.view.html;
          // shortcuts to elements to append built html to
          var $main = resume.view.dom.selectors.$main;

          // for storing the complete html for the projects entries to add to project section html later
          var formatted_project_entries = '';

          // loop through each project in the projects array of objects
          for (var i = 0; i < projects.projects.length; i += 1) {

              // current project in the array
              var current_project = projects.projects[i];

              // DESCRIPTION PARAGRAPHS
              // format paragraphs as the description to be added to the project entry html template

              // var to store the formatted description paragraphs
              var formatted_description = '';

              // check if there's any description to be formatted
              if (current_project.description.length !== 0) {
                  // loop through the description array to format each item as a paragraph
                  for (var j = 0; j < current_project.description.length; j += 1) {
                      // format the description paragraph data with the html template
                      formatted_description += html(templates.description).format(current_project.description[j]).html;
                  }
              }


              // IMAGES

              // the current project's images array for image urls
              var img_array = current_project.images;

              // default: use a placeholder image for projects without images
              var project_img = 'http://lorempixel.com/600/450/abstract/';

              // if there's only one image in the array just use that
              if (img_array.length !== 0) {
                  // use the first image in the array
                  project_img = img_array[0];

                  // randomize the used image if there's more than one image in the array
                  if (img_array.length > 1) {
                      // gets a random image from the image array
                      // math.random generates random number between 1 & 0, multiply that by
                      // array length to scale it to a key in the array's range, then round
                      // down to the nearest whole number with math.floor
                      project_img = img_array[Math.floor(Math.random() * img_array.length)];
                  }
              }

              // FORMAT PROJECT ENTRY HTML

              // insert data into the project entry template then put all the entries together
              formatted_project_entries += html(templates.entry).format(current_project.link, '%link%')
                  .format(current_project.dates, '%date%')
                  .format(project_img, '%image%')
                  .format(current_project.srcset, '%srcset%')
                  .format(current_project.sizes, '%sizes%')
                  .format(current_project.alt, '%alttext%')
                  .format(current_project.title, '%title%')
                  .format(formatted_description, '%description%')
                  .html;

          }

          // add all the project entries to the projects section html template
          var formatted_projects = html(templates.section).format(formatted_project_entries).html;

          // APPEND PROJECT HTML TO PAGE

          $main.append(formatted_projects);
        },
        education: function() {
          /*
          Displays the info from the education data object in the html page.
          Takes the raw data, formats using helpers containing the html template,
          then appends that into places in the dom.
          Args: none as passed parameters, but does get data from the object
          Returns: no returns, but does append formatted html to the page
          */
          //
          // EDUCATION SECTION
          //

          // grab the education data
          var education = resume.model.get('education');
          // shortcut reference to the html templates
          var templates = resume.view.templates.education;
          // shortcut reference to the courses html templates
          var templates_courses = resume.view.templates.courses;
          // shortcut ref to the html templating functions
          var html = resume.view.html;
          // shortcuts to elements to append built html to
          var $main = resume.view.dom.selectors.$main;

          // initialize var to store all the formatted school entries
          var formatted_school_entries = '';

          // loop through each job in the work object to format data
          for (var i = 0; i < education.schools.length; i += 1) {
              // the current school in the schools array
              var current_school = education.schools[i];

              // TESTIMONIALS / RECOMMENDATIONS
              // create testimonials section formatted html to add the the work html template later

              // string var to store the formatted testimonials html
              var formatted_testimonials = '';

              // check if there's even any testimonials data
              if (current_school.testimonials.length !== 0) {

                  // loop through the testimonials data and format each one with the html template
                  for (var j = 0; j < current_school.testimonials.length; j += 1) {
                      // the current testimonial data we're working with in the object array
                      var current_testimonial = current_school.testimonials[j];

                      // format the data with the testimonial html template and store in the formatted string
                      formatted_testimonials += html(templates.testimonial).format(current_testimonial.text, '%testimonial%')
                          .format(current_testimonial.link, '%link%')
                          .format(current_testimonial.pic, '%photo%', true)
                          .format(current_testimonial.name, '%person%')
                          .format(current_testimonial.role, '%role%')
                          .html;
                  }
              }

              // FORMAT SCHOOL ENTRY HTML
              // add all formatted school html subsections
              // to the main school entry template for the current school
              // then add the school entry html to the rest of the entries
              formatted_school_entries += html(templates.entry).format(current_school.logo, '%logo%')
                  .format(current_school.url, '%link%')
                  .format(current_school.name, '%school%')
                  .format(current_school.degree, '%degree%')
                  .format(current_school.majors[0], '%major%')
                  .format(current_school.location, '%location%')
                  .format(current_school.dates.start, '%start%')
                  .format(current_school.dates.end, '%end%')
                  .format(current_school.description, '%description%')
                  .wrap(formatted_testimonials, '%?testimonial-wrap%', templates.testimonial_wrap)
                  .format(formatted_testimonials, '%testimonials%')
                  .html;

          }

          // FORMAT PROFESSIONAL COURSEWORK ENTRY HTML
          // format html with raw data for each course using course entry template

          // initialize var to store all of the formatted course entries
          var formatted_course_entries = '';
          // loop through each online course to format all of the data
          for (i = 0; i < education.onlineCourses.length; i += 1) {
              // the current online course in the array
              var current_course = education.onlineCourses[i];

              // format the course entry data with the html template and put them all together
              formatted_course_entries += html(templates_courses.entry).format(current_course.logo, '%logo%')
                  .format(current_course.url, '%link%')
                  .format(current_course.school, '%school%')
                  .format(current_course.title, '%course%')
                  .format(current_course.instructor, '%instructor%', true)
                  .format(current_course.dates, '%dates%')
                  .format(current_course.description, '%description%')
                  .html;

          }


          // add the formatted education entries to the education section html template
          var formatted_education = html(templates.section).format(formatted_school_entries, '%schools%')
              .format(formatted_course_entries, '%courses%')
              .html;

          // APPEND EDUCATION HTML TO THE PAGE

          $main.append(formatted_education);
        },
        maps: function() {
          /*
          Formats the html for the location section and appends it.
          Actual map created in the helper functions js and appended to this section.
          */

          // grab the bio data
          var bio = resume.model.get('bio');
          // shortcut reference to the html templates
          var templates = resume.view.templates.location;
          // shortcut ref to the html templating functions
          var html = resume.view.html;
          // shortcuts to elements to append built html to
          var $main = resume.view.dom.selectors.$main;

          // create the map section
          var formatted_map = html(templates.section).format(bio.location, '%location%')
              .format(bio.hometown, '%hometown%')
              .html;

          // append map section to the page
          $main.append(formatted_map);
        },
        footer: function() {
          /*
          Formats the html for the footer and appends it to the footer.
          */
          // shortcut reference to the html templates
          var templates = resume.view.templates.footer;
          // shortcuts to elements to append built html to
          var $footer = resume.view.dom.selectors.$footer;

          // append footer section to the page
          $footer.append(templates.section);
        }
      },
      // chainable html code generator submodule
      html: function(target) {
          /*
          Wrapper function object for allowing some chainable functions on passed in html.
          Args: target of the function, which typically would be an html string
          Returns: this, which would be the returned modified html in and object from the subfunctions
          */
          if (!(this instanceof resume.view.html)) {
              return new resume.view.html(target);
          }

          // initialize an html key with the value of the passed in target html
          this.html = target;

          // return itself as an object to allow chaining
          return this;
      }
    }
  };
  // add prototype methods to the html submodule
  resume.view.html.prototype.format = function(raw_data, placeholder, optional) {
      /*
      Takes raw data and inserts that data into a preformatted html string,
       replacing a placeholder with the actual data.
       Chainable function within the html function made by returning this.
       Placeholder string that the function looks for is set in the var.
       ex. <p>%data%</p> => <p>Hello</p>
       Args: the formatted html (string), the raw data to insert into that html (string/numbers)
       Return: the formatted html string with placeholder replaced by that data (string)
      */
      // default is that this isn't an optional part of the html
      optional = util.default_for(optional, false);
      // the default placeholder string to look for in the html
      placeholder = util.default_for(placeholder, '%data%');

      // check if this is an optional block/this key's value in the data is empty
      // if so then remove relevant html from the string since it's optional
      if (optional === true) {

          // placeholder text marking an optional block of text
          var optional_tag = '%?optional%';

          // if there's no data in the specified key run the regex to get the whole block
          if (raw_data.length === 0) {
              // regular expression to match anything enclosed in the optional tags
              // and containing the placeholder for the data we're looking at
              var optional_regex = new RegExp('%\\?optional%.*' + placeholder + '.*%\\?optional%', 'g');
              // remove the matched substrings enclosed by optional tags
              this.html = util.replaceAll(this.html, optional_regex, '');
          } else {
              // if there is data in the specified key, just remove the optional text placeholders
              this.html = util.replaceAll(this.html, optional_tag, '');
          }
      }

      // check the html for occurences of the placeholder and replace with provided data
      // set this.html to the result of the function so it can be returned
      this.html = util.replaceAll(this.html, placeholder, raw_data);

      // return the results as an object to allow chaining
      // when using this function, put .html at the end to get the value of the html
      return this;
  };
  resume.view.html.prototype.wrap = function(data, placeholder, wrapper) {
      /*
      Checks the data to see if it has something, if so then it'll add a wrapper
      to the passed in html template where marked by the placeholders. Useful for links where
      they something might not have link data, but others items do--like an offline business
      in a list of work experience.
      So calling on <div>%?wrap%<p></p>%?wrap%</div>, if the data has something it'll add
      the wrapping code <div><wrapper><p></p></wrapper></div>
      otherwise itll just delete the placeholders.
      Args: data is the data field to check if it contains info(string),
            placeholder is where the wrapper will be inserted (string),
            wrapper is the wrapper html which will be split into opening and
            closing parts at the %data% placeholder
      Returns: formatted html string with placeholders replaced by wrapper. (string)
      */
      // check if data has been entered
      if (data.length !== 0) {
          // split html at the wrapper placeholders
          var split_html = this.html.split(placeholder);
          // split the wrapper at the %data% placeholder
          var split_wrapper = wrapper.split('%data%');

          // concatenate back together with the wrapper pieces where the placeholders were
          this.html = split_html[0] +
              split_wrapper[0] +
              split_html[1] +
              split_wrapper[1] +
              split_html[2];

      } else {
          // if no data just remove the placeholder text
          this.html = util.replaceAll(this.html, placeholder, '');
      }

      // to allow chaining return this object
      return this;
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
        // return requested information from the data object
        return gmap.data[data_type];
      },
      // get locations from raw data
      init_locations_data: function() {
        /*
        Returns an array of every location string from the high level data
        written for bio, education, and work in data objects.
        Return: array of location strings
        */
        // shorthand ref to data objects
        var bio = data.bio;
        var education = data.education;
        var work = data.work;

        // initializes an empty array to store locations
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
          this.get('info_windows').push(info_window);
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
        gmap.model.get('info_windows').forEach(function(info_window){
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

  // check jquery loaded first before plugins extend jquery library
  // id of jquery was assigned to script element loading jquery
  //document.getElementById('jquery').addEventListener('load', function(){
    // load plugins
    plugins.init();
    // init the resume generation module
    resume.control.init();
  //});

  // provide public access methods and data for the resume app
  return {
    resume: resume,
    data: {
      bio:data.bio,
      work:data.work,
      projects:data.projects,
      education:data.education,
      awards:data.awards,
      maps:data.maps,
      footer:data.footer
    }
  };
})(data, jQuery);
