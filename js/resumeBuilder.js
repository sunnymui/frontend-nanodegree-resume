///////////////
// CONSTANTS //
///////////////

// DOM selectors
var main = 'main';
var nav = 'nav';
var contact = '.contact';
var footer_section = 'footer';
var read_more_btn = '.read-more';
var description = '.description';
var truncate = 'truncate lighter-gray';

///////////////
// FUNCTIONS //
///////////////

// Utility Functions

String.prototype.replaceAll = function(search, replace) {
  /*
  Extends the builtin string replace method with a replace all method.
  This will replace every occurence of a matched string.
  Args: search(string) is what youre looking for, replace(string) is
  what to replace it with
  return: string with the matched words replaced
  */
    if (replace === undefined) {
        return this.toString();
    }
    return this.split(search).join(replace);
};

function html(target) {
/*
Wrapper function object for allowing some chainable functions on passed in html.
Args: target of the function, which typically would be an html string
Returns: this, which would be the returned modified html in and object from the subfunctions
*/
  if (!(this instanceof html)) {
  return new html(target);
  }

  // initialize an html key with the value of the passed in target html
  this.html = target;

  // return itself as an object to allow chaining
  return this;
}

  html.prototype.format = function(raw_data, placeholder, optional) {
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
      optional = default_for(optional, false);
      // the default placeholder string to look for in the html
      placeholder = default_for(placeholder,'%data%');

      // check if this is an optional block/this key's value in the data is empty
      // if so then remove relevant html from the string since it's optional
      if (optional === true) {

        // placeholder text marking an optional block of text
        var optional_tag = '%?optional%';

        // if there's no data in the specified key run the regex to get the whole block
        if (raw_data.length === 0) {
          // regular expression to match anything enclosed in the optional tags
          // and containing the placeholder for the data we're looking at
          var optional_regex = new RegExp('%\\?optional%.*'+placeholder+'.*%\\?optional%', 'g');
          // remove the matched substrings enclosed by optional tags
          this.html = this.html.replaceAll(optional_regex, '');
        } else {
          // if there is data in the specified key, just remove the optional text placeholders
          this.html = this.html.replaceAll(optional_tag, '');
        }
      }

      // check the html for occurences of the placeholder and replace with provided data
      // set this.html to the result of the function so it can be returned
      this.html =  this.html.replaceAll(placeholder, raw_data);

      // return the results as an object to allow chaining
      // when using this function, put .html at the end to get the value of the html
      return this;
  };

  html.prototype.wrap = function(data, placeholder, wrapper) {
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
      this.html = split_html[0]+
                  split_wrapper[0]+
                  split_html[1]+
                  split_wrapper[1]+
                  split_html[2];

    } else {
      // if no data just remove the placeholder text
      this.html = this.html.replaceAll(placeholder, '');
    }

    // to allow chaining return this object
    return this;
  };

function first_letters(string) {
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
}

function default_for(argument, value) {
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

function features() {
/*

Features functions enable additional functionality of some sort. Encapsulated
in the features function.

*/

  if (!(this instanceof features)) {
  return new features();
  }

  this.read_more = function(button, element, truncator_class) {
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
    Args: the selector for the see more button that will trigger show/hide on click (string),
    selector for the element that is currently being truncated by a css class (string),
    the class name to remove or add when the button is clicked, without the '.' (string)
    Returns: none
    */

    // the text for the button to switch between
    var more_text = '+ More';
    var less_text = '- Less';

    // when the button is clicked find the content, toggle class, and change button text
    $(button).click(function(e) {
      // get the content element that's specifically related to the button pressed
      var current_content = $(this).siblings(element);
      // toggle the truncation class
      $(current_content).toggleClass(truncator_class);

      // trim spaces to ensure consistent matches for the button text
      var button_text = $(this).text().trim();
      // if button text says more, change to 'less', else change it to 'more'
      if (button_text == more_text) {
        $(this).text(less_text);
      } else {
        $(this).text(more_text);
      }

      // prevent default <a> behavior of jumping to top of page when clicking # links
      e.preventDefault();
    });
  };

  this.sticky_nav = function() {

    // sticky nav

    var fixed_class = 'fixed-wrapper no-margin';
    var distance = $(nav).offset().top;
    var $window = $(window);
    var $nav = $(nav);

    $window.scroll(function() {
        if ( $window.scrollTop() >= distance ) {
            $nav.addClass(fixed_class);
        } else {
            $nav.removeClass(fixed_class);
        }
    });

  };

  this.to_top = function() {

    // animate scroll when to top button is clicked

    var top_btn = 'a[href="#top"]';

    // when a to-top button is clicked,
    $(top_btn).click(function(e){
        $('html,body').animate({ scrollTop: 0 }, 'medium');
        e.preventDefault();
    });
  };


}



// Plugin Functions

(function($) {

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

  $.fn.visible = function(partial) {

      var $t            = $(this),
          $w            = $(window),
          viewTop       = $w.scrollTop(),
          viewBottom    = viewTop + $w.height(),
          _top          = $t.offset().top,
          _bottom       = _top + $t.height(),
          compareTop    = partial === true ? _bottom : _top,
          compareBottom = partial === true ? _top : _bottom;

    return ((compareBottom <= viewBottom) && (compareTop >= viewTop));

  };

})(jQuery);

// Display functions for json data

bio.display = function() {
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

    // NAV BAR
    // create nav bar to insert into the hero html tempate

    // initialize var to store nav bar html
    var formatted_nav = '';
    // Navigation Sections
    var nav_links = ['summary', 'work', 'projects', 'education', 'contact'];

    // loop through the nav sections array and format them to add to the hero
    for (var i = 0; i < nav_links.length; i+=1) {
      formatted_nav += html(HTMLnav).format(nav_links[i]).html;
    }

    // create the hero area html with the data, format with hero template
    var formatted_hero = html(HTMLhero).format(bio.biopic,'%pic%')
                                       .format(bio.name,'%name%')
                                       .format(bio.role,'%role%')
                                       .format(formatted_nav,'%nav%')
                                       .html; // returns the html value from the html object

    // ADD HERO HTML TO PAGE

    // prepend because we want it at the beginning
    $(main).prepend(formatted_hero);

    //
    // SUMMARY SECTION
    //

    // CONTACTS
    // Function useful so we don't format the same contact data multiple times.
    // every time we want to append it somewhere on the page

    function displayContact(/* DOM location(s) as arguments */) {
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
      if (bio.contacts.length !==0) {

        // loop through each contact and format the html with the data for each contact
        for (var i = 0; i < bio.contacts.length; i+=1) {
          // current contact in the contacts array
          var current_contact = bio.contacts[i];
          // add each contact's data to the formatted html
          formatted_contacts += html(HTMLcontact).format(current_contact.name, '%name%')
                                                 .format(current_contact.link, '%link%')
                                                 .format(current_contact.tooltip, '%tooltip%')
                                                 .format(current_contact.icon, '%icon%')
                                                 .html;
        }

        // append the formatted contact info to the specified location(s)
        // loop through arguments object to allow multiple dom locations to be passed
        for (i = 0; i < arguments.length; i+=1) {
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
        for (i = 0; i < bio.skills.length; i+=1) {
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
            for (var j = 0; j < current_skills_array.length; j+=1) {
              // format current skill data into html for every skill in the array and put it all together
              formatted_skills += html(HTMLskill).format(current_skills_array[j]).html;
            }

            // format the current skills group with the title and the respective skills
            // put all the groups together in a single string to insert in the template
            formatted_skills_groups += html(HTMLskillsGroup).format(current_group_key)
                                                            .format(formatted_skills, '%skills%')
                                                            .html;
        }

    }

    // QUALIFICATIONS
    // create qualifications section html for later insertion into summary html template

    // initialize var to store the formatted qualifications html
    var formatted_qualifications = '';

    // add qualifications section if it's not empty
    if (bio.qualifications.length !==0) {

      // loop through the qualifications array
      for (i = 0; i < bio.qualifications.length; i+=1) {
        var current_qual = bio.qualifications[i];
        // add each qualification's data to the html qualifications template
        formatted_qualifications += html(HTMLqualification).format(first_letters(current_qual.name), '%symbol%')
                                                           .format(current_qual.name, '%name%')
                                                           .format(current_qual.description, '%description%')
                                                           .html;
      }

    }

    // now that all the html is ready for insertion, add everything to the summary html template
    var formatted_summary = html(HTMLsummary).format(HTMLcontacts, '%contacts%')
                                             .format(bio.welcomeMessage, '%welcomemsg%')
                                             .format(formatted_qualifications, '%qualifications%')
                                             .format(formatted_skills_groups, '%skillsgroups%')
                                             .html;

    // APPEND SUMMARY HTML TO PAGE

    // add summary section html to the page
    $(main).append(formatted_summary);
    // add a contacts section to footer so that contacts will be added to both dom locations
    $(footer_section).append(HTMLcontacts);
    // add contacts html to the page
    displayContact(contact);

};

work.display = function() {
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

  // initialize var to store all the formatted job work entries
  var formatted_work_entries = '';

  // loop through each job in the work object to format data
  for (var i = 0; i < work.jobs.length; i+=1) {
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
      for (j = 0; j < current_job.testimonials.length; j+=1 ) {
        // the current testimonial data we're working with in the object array
        var current_testimonial = current_job.testimonials[j];

        // format the data with the testimonial html template and store in the formatted string
        formatted_testimonials += html(HTMLworkTestimonial).format(current_testimonial.text, '%testimonial%')
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
    if (current_job.highlights.length !==0) {

      // loop through highlights, format, then add to formatted highlights var
      // using new var k to increment
      for (j = 0; j < current_job.highlights.length; j+=1) {
        // the current highlight we're working with in the array
        var current_highlight = current_job.highlights[j];

        // add data to the highlight template, then add it to the formatted highlights var
        formatted_highlights += html(HTMLworkEntryHighlight).format(current_highlight).html;
      }
    }

    // FORMAT WORK ENTRY HTML
    // add all formatted work html subsections
    // to the main work entry template for the current job
    // then add the work entry html to the rest of the entries
    formatted_work_entries += html(HTMLworkEntry).format(current_job.logo, '%logo%')
                                                 .wrap(current_job.link, '%?link%', HTMLworkLinkWrapper)
                                                 .wrap(current_job.link, '%?imglink%', HTMLworkImgLinkWrapper)
                                                 .format(current_job.link, '%link%')
                                                 .format(current_job.employer, '%employer%')
                                                 .format(current_job.title, '%role%')
                                                 .format(current_job.location, '%location%')
                                                 .format(current_job.dates.start, '%start%')
                                                 .format(current_job.dates.end, '%end%')
                                                 .format(current_job.description, '%description%')
                                                 .format(formatted_highlights, '%highlights%')
                                                 .wrap(formatted_testimonials, '%?testimonial-wrap%', HTMLworkTestimonialWrap)
                                                 .format(formatted_testimonials, '%testimonials%')
                                                 .html;

  }

  // add the formatted work entries to the work section html template
  var formatted_work = html(HTMLwork).format(formatted_work_entries).html;

  // APPEND WORK HTML TO THE PAGE

  $(main).append(formatted_work);

};

// encapsulate display function in the projects object
projects.display = function() {
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

    // for storing the complete html for the projects entries to add to project section html later
    var formatted_project_entries = '';

    // loop through each project in the projects array of objects
    for (var i = 0; i < projects.projects.length; i+=1) {

        // current project in the array
        var current_project = projects.projects[i];

        // DESCRIPTION PARAGRAPHS
        // format paragraphs as the description to be added to the project entry html template

        // var to store the formatted description paragraphs
        var formatted_description = '';

        // check if there's any description to be formatted
        if (current_project.description.length !== 0) {
          // loop through the description array to format each item as a paragraph
          for (var j = 0; j < current_project.description.length; j+=1) {
            // format the description paragraph data with the html template
            formatted_description += html(HTMLprojectDesc).format(current_project.description[j]).html;
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
        formatted_project_entries += html(HTMLprojectEntry).format(current_project.link, '%link%')
                                                    .format(current_project.dates, '%date%')
                                                    .format(project_img, '%image%')
                                                    .format(current_project.alt, '%alttext%')
                                                    .format(current_project.title, '%title%')
                                                    .format(formatted_description, '%description%')
                                                    .html;

    }

    // add all the project entries to the projects section html template
    var formatted_projects = html(HTMLprojects).format(formatted_project_entries).html;

    // APPEND PROJECT HTML TO PAGE

    $(main).append(formatted_projects);

};

// education
education.display = function() {
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

      // initialize var to store all the formatted school entries
      var formatted_school_entries = '';

      // loop through each job in the work object to format data
      for (var i = 0; i < education.schools.length; i+=1) {
        // the current school in the schools array
        var current_school = education.schools[i];

        // TESTIMONIALS / RECOMMENDATIONS
        // create testimonials section formatted html to add the the work html template later

        // string var to store the formatted testimonials html
        var formatted_testimonials = '';

        // check if there's even any testimonials data
        if (current_school.testimonials.length !== 0) {

          // loop through the testimonials data and format each one with the html template
          for (var j = 0; j < current_school.testimonials.length; j+=1 ) {
            // the current testimonial data we're working with in the object array
            var current_testimonial = current_school.testimonials[j];

            // format the data with the testimonial html template and store in the formatted string
            formatted_testimonials += html(HTMLschoolTestimonial).format(current_testimonial.text, '%testimonial%')
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
        formatted_school_entries += html(HTMLschoolEntry).format(current_school.logo, '%logo%')
                                                         .format(current_school.url, '%link%')
                                                         .format(current_school.name, '%school%')
                                                         .format(current_school.degree, '%degree%')
                                                         .format(current_school.majors[0], '%major%')
                                                         .format(current_school.location, '%location%')
                                                         .format(current_school.dates.start, '%start%')
                                                         .format(current_school.dates.end, '%end%')
                                                         .format(current_school.description, '%description%')
                                                         .wrap(formatted_testimonials, '%?testimonial-wrap%', HTMLschoolTestimonialWrapper)
                                                         .format(formatted_testimonials, '%testimonials%')
                                                         .html;

      }

      // FORMAT PROFESSIONAL COURSEWORK ENTRY HTML
      // format html with raw data for each course using course entry template

      // initialize var to store all of the formatted course entries
      var formatted_course_entries = '';
      // loop through each online course to format all of the data
      for (i=0; i < education.onlineCourses.length; i+=1 ) {
        // the current online course in the array
        var current_course = education.onlineCourses[i];

        // format the course entry data with the html template and put them all together
        formatted_course_entries += html(HTMLcourseEntry).format(current_course.logo, '%logo%')
                                                         .format(current_course.url, '%link%')
                                                         .format(current_course.school, '%school%')
                                                         .format(current_course.title, '%course%')
                                                         .format(current_course.instructor, '%instructor%', true)
                                                         .format(current_course.dates, '%dates%')
                                                         .format(current_course.description, '%description%')
                                                         .html;

      }


      // add the formatted education entries to the education section html template
      var formatted_education = html(HTMLeducation).format(formatted_school_entries, '%schools%')
                                                   .format(formatted_course_entries, '%courses%')
                                                   .html;

      // APPEND EDUCATION HTML TO THE PAGE

      $(main).append(formatted_education);

};


// map

maps.display = function() {
  /* Formats the html for the footer map. Actual map created in the helper functions js.
  */

  // create the map section
  var formatted_map = html(HTMLmap).format(bio.location, '%location%')
                     .format(bio.hometown, '%hometown%')
                     .html;

  // append map section to the page
  $(main).append(formatted_map);

};

// footer

footer.display = function() {
  /* Formats the html for the footer map. Actual map created in the helper functions js.
  */

  // append footer section to the page
  $(footer_section).append(HTMLfooter);

};

// Add all the formatted html to the page;

bio.display();
work.display();
projects.display();
education.display();
maps.display();
footer.display();

// interactive read more button functionality
features().read_more(read_more_btn, description, truncate);
features().sticky_nav();
features().to_top();


// animate element appearance when visible in window

var animated_element = '.animated';
var fade_class = 'fadeInDown';

$window.scroll(function(event) {

  $(animated_element).each(function(i, el) {
    var el = $(el);
    if (el.visible(true)) {
      el.addClass(fade_class);
    }
  });

});

// Minimal Scrollspy plugin
// https://jsfiddle.net/mekwall/up4nu/

// with modified add/hide active class behavior to make it work my dom structure

// the button in the nav to highlight when scrolling in the corresponding section
var nav_link = 'nav a';
// class to add when a nav link is highlighted
var active_class = 'active';

// Cache selectors
var lastId,
    topMenu = $(nav),
    topMenuHeight = topMenu.outerHeight()+15,
    // All list items
    menuItems = topMenu.find("a"),
    // Anchors corresponding to menu items
    scrollItems = menuItems.map(function(){
      var item = $($(this).attr("href"));
      if (item.length) { return item; }
    });

// Bind click handler to menu items
// so we can get a fancy scroll animation

menuItems.click(function(e){
  var href = $(this).attr("href"),
      offsetTop = href === "#" ? 0 : $(href).offset().top-topMenuHeight+1;
  $('html, body').stop().animate({
      scrollTop: offsetTop
  }, 300);
  e.preventDefault();
});

// Bind to scroll
$window.scroll(function(){
   // Get container scroll position
   var fromTop = $(this).scrollTop()+topMenuHeight;

   // Get id of current scroll item
   var cur = scrollItems.map(function(){
     if ($(this).offset().top < fromTop)
       return this;
   });

   // Get the id of the current element
   cur = cur[cur.length-1];
   var id = cur && cur.length ? cur[0].id : "";

   if (lastId !== id) {
       lastId = id;
       // note: this section modified to make it work in a non ul-li-a structure
       var current_nav_link = 'nav a[href="#'+id+'"]';
       // clear any active classes on the nav links
       $(nav_link).removeClass(active_class);
       // add an active class to the current link corresponding to the section
       $(current_nav_link).addClass(active_class);
   }
});
