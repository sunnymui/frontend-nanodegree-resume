// JSON ready data objects
var bio = {
    "name": "Sunny Mui",
    "role": "Web Developer",
    "contacts": [{
        "name" : "sunnycmui@gmail.com",
        "link" : "mailto:sunnycmui@gmail.com",
        "tooltip" : "Email me",
        "icon" : "email"
      },{
        "name" : "562-478-6694",
        "link" : "tel:+1-562-478-6694",
        "tooltip" : "Call or text me",
        "icon" : "phone"
      },{
        "name" : "linkedin.com/in/sunnymui",
        "link" : "https://www.linkedin.com/in/sunnymui",
        "tooltip" : "Check my professional profile on LinkedIn",
        "icon" : "linkedin"
      },{
        "name" : "github.com/sunnymui",
        "link" : "https://github.com/sunnymui/",
        "tooltip" : "View some of my work/code on GitHub",
        "icon" : "github"
      },{
        "name" : "San Jose, CA",
        "link" : "https://goo.gl/maps/namUDrRMPt42",
        "tooltip" : "Locate me on Google Maps",
        "icon" : "location"
      }
    ],
    "biopic": "https://sunnymui.github.io/one-page-portfolio/img/bw.png",
    "welcomeMessage": "Designer and web developer in San Jose, California who's worked several years in startups and freelance doing design, UX, UI, front end development, copywriting, and digital marketing. I've also done brochures, logos, branding, posters, pitch decks, and more. Committed to learning and continuous improvement.",
    "skills": [{
      "Business" : [
        "Digital Marketing",
        "Social Media Marketing",
        "Content Marketing",
        "Email Marketing",
        "Writing",
        "Presentations",
        "Infusionsoft",
        "Excel",
        "SEO",
        "Conversion Optimization",
        "A/B Testing",
        "Project Management",
        "Analytics"
      ]
    }, {
      "Design" : [
        "Photoshop",
        "Illustrator",
        "InDesign",
        "Logo",
        "Identity",
        "Branding Materials",
        "Brochures",
        "Websites",
        "Responsive Design",
        "User Interface",
        "Photography",
        "Prototyping/Mockups"
      ]
    }, {
      "Code" : [
        "HTML",
        "CSS",
        "jQuery",
        "Javascript",
        "PHP",
        "Python",
        "MySQL",
        "Grunt",
        "Wordpress",
        "HTML5 Boilerplate",
        "Atom",
        "Notepad++",
        "Web Development",
        "Front End Development",
        "Git",
        "FTP"
      ]
    }],
    "qualifications" : [{
        "name" : "Writer",
        "description" : "Wrote articles for online audiences of 1000+/day, wrote hundreds of marketing pieces, and I write short fiction for fun."
      }, {
        "name" : "Creative",
        "description" : "Designed dozens of brand identity pieces, led redesign of a 50,000 user website, and I work in print, web, Adobe, code, and beyond."
      }, {
        "name" : "Analytical",
        "description" : "Dug for analytics insights, optimized conversion with a/b tests/heat maps/data tools, and methodically tackled technical problems."
      }, {
        "name" : "Usability",
        "description" : "Tested usability in 1-on-1 sessions and implemented best practice usability heuristics in the real world."
      }, {
        "name" : "Adaptable",
        "description" : "Led marketing, design, and front end development in a start-up environment where learning skills everyday was essential."
      }]
};

var work = {
    "jobs": [{
        "employer": "Creative Audacity",
        "title": "Web Developer",
        "location": "San Jose, CA",
        "dates": "2016",
        "description": "Freelance web development and design agency",
        "images": [
            "http://placekitten.com/200/300",
            "http://placekitten.com/300/200"
        ]
    }, {
        "employer": "Globial",
        "title": "Designer/Front End Developer/Marketer",
        "location": "Sunnyvale, CA",
        "dates": "2012-2015",
        "description": "Global trade and B2B networking startup",
        "images": [
            "http://placekitten.com/200/300",
            "http://placekitten.com/300/200"
        ]
    }, {
        "employer": "Gate58",
        "title": "Online Marketing Intern",
        "location": "San Mateo, CA",
        "dates": "2011",
        "description": "A lead generation online marketing firm",
        "images": [
            "http://placekitten.com/200/300",
            "http://placekitten.com/300/200"
        ]
    }]
};

var projects = {
    "projects": [{
        "title": "One Page Responsive Portfolio",
        "dates": "2016",
        "description": "A single page responsive web page portfolio.",
        "images": [
            "http://placekitten.com/300/300",
            "http://placekitten.com/300/300"
        ]
    }, {
        "title": "Responsive Simple Single Page Site",
        "dates": "2016",
        "description": "A one page simple informational website that is responsive.",
        "images": [
            "http://placekitten.com/300/300",
            "http://placekitten.com/300/300"
        ]
    }]
};

var education = {
    "schools": [{
        "name": "San Francisco State University",
        "location": "San Francisco, CA",
        "majors": ["English Literature",
        "Business Admnistration: Marketing"],
        "dates": "2006 - 2010",
        "degree": "Bachelors"
    }],
    "onlineCourses": [{
        "title": "Complete Web Developer Course",
        "school": "Udemy",
        "dates": "2015",
        "url": "http://www.udemy.com"
    }, {
        "title": "Learn Python, It's Cake!",
        "school": "Udemy",
        "dates": "2015",
        "url": "http://www.udemy.com"
    }, {
        "title": "Front End Nanodegree",
        "school": "Udacity",
        "dates": "2016",
        "url": "http://www.udacity.com"
    }]
};

///////////////
// CONSTANTS //
///////////////

// DOM selectors
var main = 'main';
var header = '#header';
var skills = '#skills';
var header_contact = '.contact';
var footer_contact = '#footerContacts';
var work_exp = '#workExperience';
var work_entry = '.work-entry:last';
var education_section = '#education';
var education_entry = '.education-entry:last';
var projects_section = '#projects';
var project_entry = '.project-entry:last';
var map_section = '#mapDiv';

// Navigation Sections
var nav_links = ['summary', 'work', 'projects', 'education', 'contact'];

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

    // create the nav bar html
    var formatted_nav = '';
    // loop through the nav links array and format them to add to the hero
    for (var i = 0; i < nav_links.length; i+=1) {
      formatted_nav += html(HTMLnav).format(nav_links[i]).html;
    }

    // create the hero area html with the data added to the hero template
    var formatted_hero = html(HTMLhero).format(bio.biopic,'%pic%')
                                       .format(bio.name,'%name%')
                                       .format(bio.role,'%role%')
                                       .format(formatted_nav,'%nav%')
                                       .html; // returns the html value from the html object

    // add the hero html to the page
    $(main).prepend(formatted_hero);

    //
    // SUMMARY SECTION
    //

    // CONTACTS
    // Function useful so we don't format the contact data again for every section.

    function displayContact(/* DOM location(s) as arguments */) {
      /*
      Displays the contact info from the bio in specified locations on the page.
      Takes raw data from the bio data object, formats it using the appropriate helper
      html template, and puts it in dom location(s) passed as arguments.
      Args: dom locations (string) for each argument
      Return: none, but does append the contact info to the page
      */

      // initialize var to store formatted contact html string
      // cached so we don't redo the format functions for every dom location
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

    // SUMMARY SECTION APPEND TO PAGE

    // add summary section html to the page
    $(main).append(formatted_summary);
    // add contacts html to the page
    displayContact(header_contact, footer_contact);

};

// work experience

work.display = function() {
  /*
  Displays the info from the work data object in the html page.
  Takes the raw data, formats using helpers containing the html template,
  then appends that into places in the dom.
  Args: none as passed parameters, but does get data from the object
  Returns: no returns, but does append formatted html to the page
  */

  // work experience
  // adds the info to the experience section for each job in the work object
  for (var i = 0; i < work.jobs.length; i++) {
    $(work_exp).append(HTMLworkStart);
    // format the info with the helper functions

    // note that i in a for-in loop returns the index, not the value
    // use forEach if your array is just values and not key-value pairs
    // regular for loops are cool in most situations

    var formatted_work = format(HTMLworkEmployer, work.jobs[i].employer) +
                         format(HTMLworkTitle, work.jobs[i].title) +
                         format(HTMLworkDates, work.jobs[i].dates) +
                         format(HTMLworkLocation, work.jobs[i].location) +
                         format(HTMLworkDescription, work.jobs[i].description);

    // add formatted html to the work section of the page
    $(work_entry).append(formatted_work);
  }
};

// projects

// encapsulate display function in the projects object
projects.display = function() {
  /*
  Displays the info from the projects data object in the html page.
  Takes the raw data, formats using helpers containing the html template,
  then appends that into places in the dom.
  Args: none as passed parameters, but does get data from the object
  Returns: no returns, but does append formatted html to the page
  */

    // loop through each project in the projects array of objects
    for (var i = 0; i < projects.projects.length; i++) {

        // current project in the array
        var current_project = projects.projects[i];

        // create formatted html elements for project data
        // then add the formatted data to the formatted project string
        var formatted_project = format(HTMLprojectTitle, current_project.title) +
                                format(HTMLprojectDates, current_project.dates) +
                                format(HTMLprojectDescription, current_project.description);

        // loop through images array and add each image to the formatted project html
        for (var j = 0; j < current_project.images.length; j++) {
            formatted_project += (format(HTMLprojectImage, current_project.images[j]));
        }

        // append all the formatted html elements to the appropiate section of the page
        $(projects_section).append(HTMLprojectStart);
        $(project_entry).append(formatted_project);
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
      var formatted_education = format(HTMLschoolName, current_school.name) +
                                format(HTMLschoolDegree, current_school.degree) +
                                format(HTMLschoolDates, current_school.dates) +
                                format(HTMLschoolLocation, current_school.location);

       // loop through the array of majors in the current schools and append
       // each to the formatted html string
       for (var j = 0; j < current_school.majors.length; j+=1) {
         formatted_education += format(HTMLschoolMajor, current_school.majors[j]);
       }

      // append the education entry div to the education section
      $(education_section).append(HTMLschoolStart);
      // append the formatted html to the education entry
      $(education_entry).append(formatted_education);
    }

    // online courses
    $(education_section).append(HTMLonlineClasses);

    // loop through each online course to format and display it
    for (i=0; i < education.onlineCourses.length; i+=1 ) {
      var current_course = education.onlineCourses[i];

      // online course formatted html
      var formatted_online_courses = format(HTMLonlineTitle, current_course.title) +
                                     format(HTMLonlineSchool, current_course.school) +
                                     format(HTMLonlineDates, current_course.dates) +
                                     format(HTMLonlineURL, current_course.url);

      // append the education entry div to the education section
      $(education_section).append(HTMLschoolStart);
      // append the formatted html to the education entry
      $(education_entry).append(formatted_online_courses);
    }

};

// Add all the formatted html to the page;

bio.display();
work.display();
projects.display();
education.display();

// interactive map
$(map_section).append(googleMap);
