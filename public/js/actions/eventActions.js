//This file should not be exported!
//This file is for necesery events that should be on all the time
//This file is invoked in index.html

$('#search').change(function(ev) {
    let target = $(ev.target);
    let inputVal = target.val();
    if (inputVal) {
        window.location = window.location.origin + '/#/search/' + inputVal;
    } else {
        window.location = window.location.origin + '/#/';
    }

    target.val('');
});