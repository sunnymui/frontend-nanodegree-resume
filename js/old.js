function capitalize(word) {
  /*
  Capitalizes the first letter of a word string. String should be one word only.
  Also will trim spaces on each end of the string.
  ex: "john" becomes "John" and " max " would become "Max"
  In: (string) one word
  Out: (string) Capitalized one word string at the first letter of the word
  */

  // trim out spaces so we start at the first letter
  var trimmed_word = word.trim();
  console.log(trimmed_word);

  // take & make the first character uppercase then add to the rest of the word
  return trimmed_word.charAt(0).toUpperCase() + trimmed_word.slice(1);
}

function inName(names) {
  /*
  Converts a string of first and last name into an internationalized version.
  Internationalized version has first name capitalized and the last name all uppercase.
  ex: John DOE
  In: names - string containing the first and last name to transform
  Out: a string with first name capitalized and last name uppercased
  */

  // split the name into an array of strings of each word
  var name_array = names.split(' ');

  // loop through each name word in case people have weird multipart names
  // like joe jacobs jackson
  for (var i = 0; i < name_array.length; i++) {
    name_array[i] = capitalize(name_array[i]);
  }

  // make the last word all uppercase letters
  // get the last word in the names array
  var last_name = name_array.length - 1;
  name_array[last_name] = name_array[last_name].toUpperCase();

  // concatenate the names array back into a single string
  // then return the value
  return name_array.join(' ');
}

$(document).click(function(loc) {
  var x = loc.pageX;
  var y = loc.pageY;
  logClicks(x,y);
});

$(document).on('keyup', function(e){
  console.log(e);
  var key = e.keyCode;
  console.log(key);
  if (key === 70) {
    window.alert('you pressed f');
  }
  console.log(e.type);
});


  $('#skills-h3').click(function() {
  console.log('clicked');
  $(skills).append('<li class="flex-item"><span class="white-text">New Skill</span></li>');
});


// event delegation practice
$(skills).on('click', '.white-text', function() {
  $(this).css('background', 'red');
});
