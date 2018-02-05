function rawOpenPage(page, callback) {
	$("title").text(page);
	window.location.hash = page;

    $("#container").load(page + '.html', function(res, stat, req) {
		applyImgModalEvent();
		if (callback) callback(res, stat, req);
	});
}

function openPage(page) {
    rawOpenPage(page, function (responseText, textStatus, req) {
        console.log(textStatus);
        if (textStatus == "error") {
            rawOpenPage("startsida");
        }
    });
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
	
	$('#modal-img-container .close').on('click', function() {
		// When the user clicks on <span> (x), close the modal
		modal.css('display', 'none');
	});

	openPage(startPage);
})

/* MODAL IMAGE */

function applyImgModalEvent() {
	$('.modal-img-link').on('click', function(){
		modal.css('display', 'block');
		modalImg.attr('src', this.src);
		captionText.text(this.alt);
	});
}
