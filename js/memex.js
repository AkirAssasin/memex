// document on ready
function documentOnReady () {

    // fetch the memex compiled data
    fetch('data/memex.mmx').then(response => response.text()).then(text => console.log(text));
}
$(document).ready(documentOnReady);
