// document on ready
function documentOnReady () {

    // fetch the memex compiled data
    fetch('data/memex.mmx').then(response => response.text()).then(text => insertIntoMemex(text));
}
$(document).ready(documentOnReady);

// insert memex into container
function insertIntoMemex (compiled) {

    // split compiled into single lines
    var lines = compiled.split(/\n/);
    for (var i = 0; i < lines.length; ++i) {

        // temporary: insert everything
        $("#memexContainer").append("<div class=\"memexElement\">" + lines[i] + "</div>");
    }
}
