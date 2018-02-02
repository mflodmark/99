function rawOpenPage(page, callback) {
    $("#container").load(page + '.html', callback);
    $("title").text(page);
    window.location.hash = page;
}

function openPage(page) {
    rawOpenPage(page, function (responseText, textStatus, req) {
        console.log(textStatus);
        if (textStatus == "error") {
            rawOpenPage("startsida");
        }
    });
}

$(function () {
    var startPage = window.location.hash.substr(1);
    if (startPage.length == 0)
        startPage = "startsida";

    openPage(startPage);
})