// document on ready
function documentOnReady () {

    // insert test element
    insertElementIntoMemex("In <b>\"As We May Think\"</b>, Vannevar Bush describes a memex as an electromechanical device enabling individuals to develop and read a large self-contained research library, create and follow associative trails of links and personal annotations, and recall these trails at any time to share them with other researchers.", "");

    // fetch the memex compiled data
    fetch('data/memex.mmx').then(response => response.text()).then(text => insertIntoMemex(text));
}
$(document).ready(documentOnReady);

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

    // insert div
    $("#memexContainer").append("<div class=\"memexElement\">" + summary + "</div>");
}
