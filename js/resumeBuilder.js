// JSON ready data objects
var bio = {
    "name": "Sunny Mui",
    "role": "Web Developer",
    "contacts": {
        "email": "sunnycmui@gmail.com",
        "github": "https://github.com/sunnymui/",
        "mobile": "510-266-2888",
        "location": "San Jose, CA"
    },
    "biopic": "https://sunnymui.github.io/one-page-portfolio/img/bw.png",
    "welcomeMessage": "I'm a San Jose, CA based designer, developer, and marketer who's worked in startups and in digital marketing.",
    "skills": [
        "Digital Marketing",
        "Design",
        "Web Development",
        "Conversion Optimization"
    ]
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
var main = '#main';
var header = '#header';
var skills = '#skills';
var header_contact = '#topContacts';
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

function format(formatted_html, raw_data) {
    /*
    Takes raw data and inserts that data into a preformatted html string,
     replacing a placeholder with the actual data.
     Placeholder string that the function looks for is set in the var.
     ex. <p>%data%</p> => <p>Hello</p>
     Args: the formatted html (string), the raw data to insert into that html (string/numbers)
     Return: the formatted html string with placeholder replaced by that data (string)
    */
    // the placeholder string to look for in the html
    var placeholder = '%data%';
    // check the html for the placeholder and replace with provided data
    return formatted_html.replace(placeholder, raw_data);
}

// header

bio.display = function() {
    /*
    Displays the info from the bio data object in the html page.
    Takes the raw data, formats using helpers containing the html template,
    then appends that into places in the dom.
    Args: none as passed parameters, but does get data from the object
    Returns: no returns, but does append formatted html to the page
    */

    // header
    var formatted_bio = format(HTMLheaderName, bio.name) +
                        format(HTMLheaderRole, bio.role) +
                        format(HTMLbioPic, bio.biopic) +
                        format(HTMLwelcomeMsg, bio.welcomeMessage);

    // add skills to page header if the skills array isn't empty
    if (bio.skills.length !== 0) {
        $(header).append(HTMLskillsStart);
        // loop through skills array to add each one as a list item
        for (var i = 0; i < bio.skills.length; i++) {
            // format each skill then append it
            var formatted_skills = format(HTMLskills, bio.skills[i]);
            $(skills).append(formatted_skills);
        }
    }

    // add formatted html to beginning of header
    $(header).prepend(formatted_bio);

};

// contacts

bio.displayContact = function(/* DOM location(s) as arguments */) {
  /*
  Displays the contact info from the bio in specified locations on the page.
  Takes raw data from the bio data object, formats it using the appropriate helper
  html template, and puts it in dom location(s) passed as arguments.
  Args: dom locations (string) for each argument
  Return: none, but does append the contact info to the page
  */

  // contact
  // store formatted as vars so we don't format stuff again for every dom location
  var formatted_email = format(HTMLemail, bio.contacts.email);
  var formatted_github = format(HTMLgithub, bio.contacts.github);
  var formatted_mobile = format(HTMLmobile, bio.contacts.mobile);
  var formatted_location = format(HTMLlocation, bio.contacts.location);

  // append the formatted contact info to the specified location
  // loop through arguments object to allow multiple dom locations to be passed
  for (var i = 0; i < arguments.length; i+=1) {
    var dom_location = arguments[i];
    $(dom_location).append(formatted_email,
                           formatted_github,
                           formatted_mobile,
                           formatted_location);
  }

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
bio.displayContact(header_contact, footer_contact);
work.display();
projects.display();
education.display();

// interactive map
$(map_section).append(googleMap);
