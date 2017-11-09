$(document).ready(function () {	

	$.each(inventory, function (i, val) {
		$( "#inventory" ).append(
			'<a role="button" data-toggle="modal" data-target="#buyBook"><p>' + val["Author"] + ", " + val["Title"] + ", " + val["Price"] + ", " + val["ID"] + '</p></a>'
		);
	});

	$(".sellSuccess").click(function() {
		$( ".container" ).append('<div class="alert alert-success"><strong>Success!</strong> Indicates a successful or positive action.</div>');
	});
});


//'<a class="btn btn-default" href="#" role="button" data-toggle="modal" data-target="#sellBook"><p>+ val["Author"] + ", " + val["Title"] + ", " + val["Price"] + ", " + val["ID"] + </p></a>'