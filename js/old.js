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
