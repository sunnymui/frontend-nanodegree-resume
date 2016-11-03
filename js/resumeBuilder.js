// dom ids
var header = '#header';
var skills = '#skills';
var top_contact = '#topContacts';
var footer_contact = '#footerContacts';
var experience = '#workExperience';
var education_section = '#education';

// data
var bio = {
  "name" : "Sunny Mui",
  "role" : "Web Developer",
  "contact" : {
    "email" : "sunnycmui@gmail.com",
    "github" : "https://github.com/sunnymui/",
    "mobile" : "510-266-2888",
    "location" : "San Jose, CA"
  },
  "biopic" : "https://sunnymui.github.io/one-page-portfolio/img/bw.png",
  "welcomeMessage" : "Hi there!",
  "skills" : [
    "awesomeness",
    "being cool",
    "developing"
  ]
};

var work = {
  "jobs": [
    {
      "employer" : "Creative Audacity",
      "title" : "Web Developer",
      "location" : "San Jose, CA",
      "dates" : "2016",
      "description" : "Freelance web development and design agency",
      "images" : [
        "http://placekitten.com/200/300",
        "http://placekitten.com/300/200"
      ]
    },
    {
      "employer" : "Globial",
      "title" : "Designer/Front End Developer/Marketer",
      "location" : "Sunnyvale, CA",
      "dates" : "2012-2015",
      "description" : "Global trade and B2B networking startup",
      "images" : [
        "http://placekitten.com/200/300",
        "http://placekitten.com/300/200"
      ]
    },
    {
      "employer" : "Gate58",
      "title" : "Online Marketing Intern",
      "location" : "San Mateo, CA",
      "dates" : "2011",
      "description" : "A lead generation online marketing firm",
      "images" : [
        "http://placekitten.com/200/300",
        "http://placekitten.com/300/200"
      ]
    }
  ]
};

var projects = {
  "projects": [
    {
      "title" : "One Page Responsive Portfolio",
      "dates" : "2016",
      "description" : "A single page responsive web page portfolio.",
      "images" : [
        "http://placekitten.com/300/300",
        "http://placekitten.com/300/300"
       ]
    },
    {
      "title" : "Responsive Simple Single Page Site",
      "dates" : "2016",
      "description" : "A one page simple informational website that is responsive.",
      "images" : [
        "http://placekitten.com/300/300",
        "http://placekitten.com/300/300"
       ]
    }
  ]
};

var education = {
  "schools":[
    {
      "name" : "San Francisco State University",
      "location" : "San Francisco, CA",
      "majors" : [
        "English Literature",
        "Business Admnistration: Marketing"
      ],
      "dates" : "2006 - 2010",
      "degree" : "Bachelors"
    }
  ],
  "onlineCourses" : [
    {
      "title" : "Complete Web Developer Course",
      "school" : "Udemy",
      "dates" : "2015",
      "url" : "http://www.udemy.com"
    },
    {
      "title" : "Learn Python, It's Cake!",
      "school" : "Udemy",
      "dates" : "2015",
      "url" : "http://www.udemy.com"
    },
    {
      "name" : "Front End Nanodegree",
      "provider" : "Udacity",
      "dates" : "2016",
      "url" : "http://www.udacity.com"
    }
  ]
};

//
// FORMAT AND INSERT RAW DATA INTO HTML ELEMENTS
//
// header
var formatted_name = HTMLheaderName.replace('%data%', bio.name);
var formatted_role = HTMLheaderRole.replace('%data%', bio.role);
var formatted_pic = HTMLbioPic.replace('%data%',bio.biopic);

// contact
var formatted_email = HTMLemail.replace('%data%',bio.contact.email);
var formatted_github = HTMLgithub.replace('%data%',bio.contact.github);
var formatted_mobile = HTMLmobile.replace('%data%',bio.contact.mobile);
var formatted_location = HTMLlocation.replace('%data%',bio.contact.location);

// work experience
var formatted_employer = HTMLworkEmployer.replace('%data%', work.employer);
var formatted_position = HTMLworkTitle.replace('%data%', work.position);

// education
var formatted_edu_name = HTMLschoolName.replace('%data%', education.schools[0].name);

// other
var formatted_welcome_msg = HTMLwelcomeMsg.replace('%data%',bio.welcomeMessage);
var formatted_skills ;

// add the html elements to the page

// add skills to page if the skills array isn't empty
if (bio.skills.length !== 0 ) {
  $(header).append(HTMLskillsStart);
  // loop through skills array to add each one as a list item
  for (i=0; i < bio.skills.length; i++) {
    // format each skill then append it
    formatted_skills = HTMLskills.replace('%data%',bio.skills[i]);
    $(skills).append(formatted_skills);
  }
}

$(header).prepend(formatted_pic, formatted_name, formatted_role);
$(top_contact).append(formatted_email,
                      formatted_github,
                      formatted_mobile,
                      formatted_location);
$(footer_contact).append(formatted_email,
                      formatted_github,
                      formatted_mobile,
                      formatted_location);
$(header).append(formatted_welcome_msg);
$(experience).append(formatted_employer, formatted_position);
