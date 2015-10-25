$(function() {
	var availableTags = [
		"Driver",
		"Frat Boy",
		"Home Cleaner",
		"Pitch Man",
		"Software Engineer",
		"Web Developer",
		"Demo Man",
		"Developer",
		"Dance Partner",
		"Dirt Removal"
	];
	$( "#job-tag" ).autocomplete({
		source: availableTags
	});
});