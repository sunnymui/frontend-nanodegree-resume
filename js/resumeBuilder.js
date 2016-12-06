///////////////
// CONSTANTS //
///////////////

// DOM selectors
var main = 'main';
var header_contact = '.contact';
var footer_contact = '#footerContacts';
var work_exp = '#workExperience';
var work_entry = '.work-entry:last';
var education_section = '#education';
var education_entry = '.education-entry:last';
var projects_section = '#projects';
var project_entry = '.project-entry:last';
var map_section = '#mapDiv';

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

  html.prototype.format = function(raw_data, placeholder) {
      /*
      Takes raw data and inserts that data into a preformatted html string,
       replacing a placeholder with the actual data.
       Chainable function within the html function made by returning this.
       Placeholder string that the function looks for is set in the var.
       ex. <p>%data%</p> => <p>Hello</p>
       Args: the formatted html (string), the raw data to insert into that html (string/numbers)
       Return: the formatted html string with placeholder replaced by that data (string)
      */
      // the default placeholder string to look for in the html
      placeholder = default_for(placeholder,'%data%');
      // check the html for occurences of the placeholder and replace with provided data
      // set this.html to the result of the function so it can be returned
      this.html =  this.html.replaceAll(placeholder, raw_data);

      // return the results as an object to allow chaining
      // when using this function, put .html at the end to get the value of the html
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

function read_more(button, element, truncator_class) {
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
}

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
    var formatted_summary = html(HTMLsummary).format(bio.welcomeMessage, '%welcomemsg%')
                                             .format(formatted_qualifications, '%qualifications%')
                                             .format(formatted_skills_groups, '%skillsgroups%')
                                             .html;

    // APPEND SUMMARY HTML TO PAGE

    // add summary section html to the page
    $(main).append(formatted_summary);
    // add contacts html to the page
    displayContact(header_contact, footer_contact);

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

    // add all formatted work html subsections
    // to the main work entry template for the current job
    // then add the work entry html to the rest of the entries
    formatted_work_entries += html(HTMLworkEntry).format(current_job.logo, '%logo%')
                                                  .format(current_job.employer, '%employer%')
                                                  .format(current_job.title, '%role%')
                                                  .format(current_job.location, '%location%')
                                                  .format(current_job.dates.start, '%start%')
                                                  .format(current_job.dates.end, '%end%')
                                                  .format(current_job.description, '%description%')
                                                  .format(formatted_highlights, '%highlights%')
                                                  .format(formatted_testimonials, '%testimonials%')
                                                  .html;

  }

  // add the formatted work entries to the work section html template
  var formatted_work = html(HTMLwork).format(formatted_work_entries ,'%entries%').html;

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

    // loop through each project in the projects array of objects
    for (var i = 0; i < projects.projects.length; i++) {

        // current project in the array
        var current_project = projects.projects[i];

        // create formatted html elements for project data
        // then add the formatted data to the formatted project string
        // var formatted_project = format(HTMLprojectTitle, current_project.title) +
                                // format(HTMLprojectDates, current_project.dates) +
                                // format(HTMLprojectDescription, current_project.description);

        // loop through images array and add each image to the formatted project html
        for (var j = 0; j < current_project.images.length; j++) {
            // formatted_project += (format(HTMLprojectImage, current_project.images[j]));
        }

        // append all the formatted html elements to the appropiate section of the page
        // $(projects_section).append(HTMLprojectStart);
        // $(project_entry).append(formatted_project);
    }
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

    // education
    for (var i = 0; i < education.schools.length; i+=1) {
      // the current school in the schools array
      var current_school = education.schools[i];

      // put data into formatted html for this education entry
      // var formatted_education = format(HTMLschoolName, current_school.name) +
                                // format(HTMLschoolDegree, current_school.degree) +
                                // format(HTMLschoolDates, current_school.dates) +
                                // format(HTMLschoolLocation, current_school.location);

       // loop through the array of majors in the current schools and append
       // each to the formatted html string
       for (var j = 0; j < current_school.majors.length; j+=1) {
        //  formatted_education += format(HTMLschoolMajor, current_school.majors[j]);
       }

      // append the education entry div to the education section
      // $(education_section).append(HTMLschoolStart);
      // append the formatted html to the education entry
      // $(education_entry).append(formatted_education);
    }

    // online courses
    // $(education_section).append(HTMLonlineClasses);

    // loop through each online course to format and display it
    for (i=0; i < education.onlineCourses.length; i+=1 ) {
      var current_course = education.onlineCourses[i];

      // online course formatted html
      // var formatted_online_courses = format(HTMLonlineTitle, current_course.title) +
                                    //  format(HTMLonlineSchool, current_course.school) +
                                    //  format(HTMLonlineDates, current_course.dates) +
                                    //  format(HTMLonlineURL, current_course.url);

      // append the education entry div to the education section
      // $(education_section).append(HTMLschoolStart);
      // append the formatted html to the education entry
      // $(education_entry).append(formatted_online_courses);
    }

};

// Add all the formatted html to the page;

bio.display();
work.display();
projects.display();
education.display();

read_more('.read-more','.description','truncate lighter-gray');

// interactive map
//$('#mapDiv').append(googleMap);
