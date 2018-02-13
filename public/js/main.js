function rawOpenPage(page, callback) {
	$("title").text(page);
	window.location.hash = page;

	// Load into the loading container
	$('#loading-container').empty().hide().load(page + '.html', function (res, stat, req) {
		if (callback)
			callback(res, stat, req);
	});
}

function openPage(page) {
	// Start fading
	$('#loading-blocker').stop().fadeIn('fast');
	$('#loaded-container').stop().fadeOut('fast', function () {
		// Start loading
		rawOpenPage(page, function (responseText, textStatus, req) {
			if (textStatus == "error") {
				rawOpenPage("startsida", pageLoaded);
			} else {
				pageLoaded();
			}
		});
	});

	var pageLoaded = function () {
		// Fade out blocker & empty
		$('#loading-blocker').stop().fadeOut();
		$('#loaded-container').empty().stop().hide();

		// Move between divs
		$('#loading-container').children().appendTo('#loaded-container');
		applyImgModalEvent();
		applyHideableDataTag();

		// Fade in
		$('#loaded-container').fadeIn('slow');
	}
}

var modal;
var modalImg;
var captionText;

$(function () {
	var startPage = window.location.hash.substr(1);
	if (startPage.length == 0)
		startPage = "startsida";


	// Get the modal
	modal = $('#modal-img-container');

	// Get the image and insert it inside the modal - use its "alt" text as a caption
	modalImg = $('#modal-img');
	captionText = $('#modal-img-caption');

	$('#modal-img-container .close').on('click', function () {
		// When the user clicks on <span> (x), close the modal
		modal.css('display', 'none');
	});

	openPage(startPage);
})

/* MODAL IMAGE */

function applyImgModalEvent() {
	$('#loaded-container .modal-img-link').on('click', function () {
		modal.css('display', 'block');
		modalImg.attr('src', $(this).attr('src'));
		captionText.text($(this).attr('alt'));
	});
}

function applyHideableDataTag() {
	$("#loaded-container [data-hide]").on("click", function () {
		$(this).closest("." + $(this).attr("data-hide")).each((i, elm) => {
			var o = $(elm);
			if (o.hasClass('fade')) o.fadeOut('fast')
			else o.hide();
		});
	});
}
