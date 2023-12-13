$.get("nav.html", function(data){
    $("#nav-placeholder").replaceWith(data);
});

function updateText() {
    var daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var today = new Date();
    var currentDay = today.getDay();
    document.getElementById("dayOfWeek").innerHTML = daysOfWeek[currentDay];
    setTimeout(updateText, getNextUpdate());
}


function getNextUpdate() {
    var now = new Date();
    var tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    var midnight = new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), 0, 0, 0);
    var timeUntilMidnight = midnight - now;
    return timeUntilMidnight;
}

// TODO: add back in once multiple langauges are implemented
// updateText()