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
        "majors": [
            "English Literature",
            "Business Admnistration: Marketing"
        ],
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
        "name": "Front End Nanodegree",
        "provider": "Udacity",
        "dates": "2016",
        "url": "http://www.udacity.com"
    }]
};

// VARIABLES

// DOM selectors
var main = '#main';
var header = '#header';
var skills = '#skills';
var header_contact = '#topContacts';
var footer_contact = '#footerContacts';
var work_exp = '#workExperience';
var last_work = '.work-entry:last';
var education_section = '#education';
var projects_section = '#projects';
var project_entry = '.project-entry:last';
var map_section = '#mapDiv';

//
// FUNCTIONS
//

function format(formatted_html, raw_data) {
    /*
    Takes raw data and inserts that data into a preformatted html string,
     replacing a placeholder with the actual data.
     Placeholder string that the function looks for is set in the var.
     ex. <p>%data%</p> => <p>Hello</p>
     In: the formatted html (string), the raw data to insert into that html (string/numbers)
     Out: the formatted html string with placeholder replaced by that data (string)
    */
    // the placeholder string to look for in the html
    var placeholder = '%data%';
    // check the html for the placeholder and replace with provided data
    return formatted_html.replace(placeholder, raw_data);
}

// header

bio.display = function() {

    // header
    var formatted_name = format(HTMLheaderName, bio.name);
    var formatted_role = format(HTMLheaderRole, bio.role);
    var formatted_pic = format(HTMLbioPic, bio.biopic);
    var formatted_welcome_msg = format(HTMLwelcomeMsg, bio.welcomeMessage);
    var formatted_skills ;
    // add skills to page header if the skills array isn't empty
    if (bio.skills.length !== 0) {
        $(header).append(HTMLskillsStart);
        // loop through skills array to add each one as a list item
        for (var i = 0; i < bio.skills.length; i++) {
            // format each skill then append it
            formatted_skills = format(HTMLskills, bio.skills[i]);
            $(skills).append(formatted_skills);
        }
    }

    // add formatted html to the dom
    $(header).prepend(formatted_pic,
        formatted_name,
        formatted_role);
    $(header).append(formatted_welcome_msg);

};

// contacts

bio.displayContact = function(dom_location) {
  // contact
  var formatted_email = format(HTMLemail, bio.contacts.email);
  var formatted_github = format(HTMLgithub, bio.contacts.github);
  var formatted_mobile = format(HTMLmobile, bio.contacts.mobile);
  var formatted_location = format(HTMLlocation, bio.contacts.location);

  // append the formatted contact info to the specified location
  $(dom_location).append(formatted_email,
                         formatted_github,
                         formatted_mobile,
                         formatted_location);
};

// work experience

work.display = function() {
    // work experience
    var formatted_employer;
    var formatted_title;
    var employer_and_title;
    var formatted_dates;
    var formatted_location;
    var formatted_description;

    // adds the info to the experience section for each job in the work object
    for (var i = 0; i < work.jobs.length; i++) {
        $(work_exp).append(HTMLworkStart);
        // format the info with the helper functions

        // note that i in a for-in loop returns the index, not the value
        // use forEach if your array is just values and not key-value pairs
        // regular for loops are cool in most situations

        formatted_employer = HTMLworkEmployer.replace('%data%', work.jobs[i].employer);
        formatted_title = HTMLworkTitle.replace('%data%', work.jobs[i].title);
        formatted_dates = HTMLworkDates.replace('%data%', work.jobs[i].dates);
        formatted_location = HTMLworkLocation.replace('%data%', work.jobs[i].location);
        formatted_description = HTMLworkDescription.replace('%data%', work.jobs[i].description);
        // concatenate employer and title into one text string
        employer_and_title = formatted_employer + formatted_title;
        // append to the work entry
        $(last_work).append(employer_and_title,
            formatted_dates,
            formatted_location,
            formatted_description);
    }
};

// projects

// encapsulate display function in the projects object
projects.display = function() {
    // loop through each project in the projects array of objects
    for (var i = 0; i < projects.projects.length; i++) {

        // current project in the array
        var current_project = projects.projects[i];
        // string to store all the formatted html
        var formatted_project = '';

        // create formatted html elements for project data
        // then add the formatted data to the formatted project string
        formatted_project += (format(HTMLprojectTitle, current_project.title) +
                              format(HTMLprojectDates, current_project.dates) +
                              format(HTMLprojectDescription, current_project.description));

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
    // education
    var formatted_edu_name = HTMLschoolName.replace('%data%', education.schools[0].name);
};

//bio.display();
work.display();
projects.display();
bio.display();
bio.displayContact(header_contact);
bio.displayContact(footer_contact);

// interactive map
$(map_section).append(googleMap);
