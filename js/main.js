// Main JS file
$(function() {
    $("img.lazy").lazyload();
});

var error = false;
var success = false;
var hash = document.location.hash;

$(function() {
	if(hash == "#status=error") {
		error = true;
	}
	if(hash == "#status=thanks") {
		success = true;
	}

	if(error == true) {
		$('.errormessage').show();
		
		var target = $('.errormessage');
		$('html,body').animate({
			scrollTop: target.offset().top
		}, 1000);
		
	}

	if(success == true) {
		$('.contactform').hide();
		$('.thanks-message').show();
	}

});

	