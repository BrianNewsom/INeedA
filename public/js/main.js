$(document).ready(function(){

	$("#ineeda-form").submit(function(event) {

		/* stop form from submitting normally */
		event.preventDefault();

		/* get some values from elements on the page: */
		var $form = $( this ),
				url = $form.attr( 'action' );

		var jobTag = $('#job-tag').val();
		var payRate =$('#pay-rate').val();

		if (jobTag && payRate){
			/* Send the data using post */
			var posting = $.post( url, { job_tag: jobTag , pay_rate: payRate } );
		} else {
			sweetAlert('Oops!', 'Please fill out both fields with valid information.', "error")
			return false;
		}


		/* Alerts the results */
		posting.done(function( data ) {
			var data = JSON.parse(data)
			var jobTag = data.job_tag;
			var payRate = data.pay_rate;	
			if (jobTag && payRate){
				// Successful query
				sweetAlert('Success!', 'Successfully posted a job request for ' + jobTag + ' with rate $' + payRate + ' per hour.  You will be contacted as soon as we find a match.', "success" );
				// Clear the form
				clearForm($form);
			} 
		});

		return false;
	});

	function clearForm(form){
		$('#job-tag').val('');
		$('#pay-rate').val('');
	}

});