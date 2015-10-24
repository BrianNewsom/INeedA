$(function() {
	var availableTags = [
		"Driver",
		"Home Cleaner",
		"Software Engineer",
		"Frat Boy"
	];
	$( "#job-tag" ).autocomplete({
		source: availableTags
	});
});