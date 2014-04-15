//Problem: User when clicking on image goes to a dead end
//Solution: Create an overlay with the large image - Lightbox

var $overlay = $('<div id="overlay"></div>');
var $image = $("<img>");
var $caption = $("<p></p>");
var $closer = $("<span class='close'>x</span>")

// Add closer to overlay
$overlay.append($closer);

//An image to overlay
$overlay.append($image);

//A caption to overlay
$overlay.append($caption);

//Add overlay
$("body").append($overlay);

//Capture the click event on a link to an image
$(".img-wrap img").click(function(event){
  //event.preventDefault();
  var imageLocation = $(this).data("fullimg");
  //Update overlay with the image linked in the link
  $image.attr("src", imageLocation);

  // set height of the image
  var height = $(window).height() - 32;
  $image.css({"max-height": height});

  //Get child's alt attribute and set caption
  var captionText = $(this).attr("alt");
  $caption.text(captionText);

  //Show the overlay.
  $overlay.show();
  
});

//When overlay is clicked
$overlay.click(function(){
  //Hide the overlay
  $overlay.hide();
});