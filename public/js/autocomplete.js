$(function() {
	var availableTags = [
		"Driver",
		"Frat Boy",
		"Home Cleaner",
		"Pitch Man",
		"Software Engineer",
		"Web Developer"
	];
	$( "#job-tag" ).autocomplete({
		source: availableTags
	});
});