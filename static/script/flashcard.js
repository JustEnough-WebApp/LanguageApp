var words = ["Word 1", "Word 2", "Word 3"];
var definitions = ["Definition 1", "Definition 2", "Definition 3"];
var index = 0;

function toggleDefinition() {
	var definition = document.getElementById("definition");
	if (definition.style.display === "none") {
		definition.style.display = "block";
		document.getElementById("show-def-button").innerHTML = "Hide Definition";
	} else {
		definition.style.display = "none";
	    document.getElementById("show-def-button").innerHTML = "Show Definition";
	}	
}

function nextCard() {
	index++;
	if (index >= words.length) {
		index = 0;
    }
	document.getElementById("word").innerHTML = words[index];
	document.getElementById("definition").innerHTML = definitions[index];
	document.getElementById("definition").style.display = "none";
	document.getElementById("show-def-button").innerHTML = "Show Definition";
}

document.getElementById("flashcard").addEventListener("click", function(event) {
	if (event.target !== this) {
		return;
	}
		toggleDefinition();
});