// document on ready
function documentOnReady () {

    // insert test element
    insertElementIntoMemex("In <b>\"As We May Think\"</b>, Vannevar Bush describes a memex as an electromechanical device enabling individuals to develop and read a large self-contained research library, create and follow associative trails of links and personal annotations, and recall these trails at any time to share them with other researchers.", "a");
    
    // fetch the memex compiled data
    fetch("data/memex.mmx").then(response => response.text()).then(text => insertCompiledIntoMemex(text));

    // set up pop-up window
    $(".memexReadMore").click(showPopup);
    $("#memexPopupBlackout").click(hidePopup).children().click(e => e.stopPropagation());
    $("#memexPopupClose").click(hidePopup);
}
$(document).ready(documentOnReady);

// show pop-up
function showPopup () {

    // get popup content
    var memexPopupContent = $("#memexPopupContent");

    // load popup content
    fetch("data/" + $(this).attr("mmx-source")).then(response => response.text()).then(text => memexPopupContent.text(text));

    // show pop-up and scroll to top
    $("#memexPopupBlackout").show();
    memexPopupContent.scrollTop(0);
}

// hide pop-up
function hidePopup () {

    // hide pop-up
    $("#memexPopupBlackout").hide();
}

// insert compiled memex into container
function insertCompiledIntoMemex (compiled) {

    // split compiled into single lines
    var lines = compiled.split(/\n/);
    for (var i = 0; i < lines.length; i += 3) {

        // interpret lines as data
        var summary = lines[i];
        var source = lines[i + 1];

        // insert element into container
        insertElementIntoMemex(summary, source);
    }
}

// insert memex element into container
function insertElementIntoMemex (summary, source) {

    // make html element
    var div = "<div class=\"memexElement\"><p>" + summary + "<p>";

    // add read-more button
    if (source != "") {
        div += "<button class=\"memexReadMore\" mmx-source=\"" + source + "\">read more</button>";
    }

    // insert div
    $("#memexContainer").append(div + "</div>");
}
