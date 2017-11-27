$(document).ready(function () {	

	$(".buy-subpage").hide();

	$.each(inventory, function (i, val) {
		$( "#inventory > .table > tbody" ).append(
			'<tr a role="button" data-toggle="modal" data-id="' + i +'" class="result open-buyBook" href="#buyBook"><td> <p>' 
			+ val["Author"] + "</p></a></td><td>" 
			+ val["Title"] + "</td><td>£" 
			+ val["Price"].toFixed(2) + "</td><td>" 
			+ val["ID"] + '</td></tr>'
		);
		$('#totalResultsMessage').text($('.result:visible').length + ' books total.');
	});


	$(".open-buyBook").click(function () {
		var bookId = $(this).data('id');
		$('.buyBookAuthor > p').text(inventory[bookId]["Author"]);
		$('.buyBookTitle > p').text(inventory[bookId]["Title"]);
		$('.buyBookPrice > p').text(inventory[bookId]["Price"]);
		$('.buyBookID > p').text(inventory[bookId]["ID"]);
	});

	$(".load-inventory").click(function () {
		$(".buy-subpage").show();
		$('#totalResultsMessage').text($('.result:visible').length + ' results found.');
	});

	$(".buyAmazon").click(function () {
		window.open('https://www.amazon.co.uk/s/field-keywords=' + $('.buyBookAuthor > p').html() + ' ' + $('.buyBookTitle > p').html(), '_blank');
	});

	$(".buySuccess").click(function () {
		$( "#actionMessage" ).empty();
		$( "#actionMessage" ).append('<div class="alert alert-success"><strong>Success!</strong> Transaction was successful.</div>');
	});

	$(".buyFailure").click(function () {
		$( "#actionMessage" ).empty();
		$( "#actionMessage" ).append('<div class="alert alert-danger"><strong>Error!</strong> Transaction was not successful.</div>');
	});

	$(".sellSuccess").click(function() {
		var	bookPrice = parseInt($('.sellBookPrice').val()) || 0;
		if (!($('.rguEmail').val().includes('@rgu.ac.uk'))) {
			$( "#actionMessage" ).empty();
			$( "#actionMessage" ).append('<div class="alert alert-danger"><strong>Error!</strong> RGU email was not valid.</div>');
		}
		else if (bookPrice != 0) {
			inventory.push({ "Author": $('.sellBookAuthor').val(), "Title": $('.sellBookTitle').val(), "Price": parseInt($('.sellBookPrice').val()) || 0, "ID": $('.sellBookID').val() });
			$( "#inventory > .table > tbody" ).append(
				'<tr a role="button" data-toggle="modal" data-id="' + (inventory.length-1) +'" class="result open-buyBook" href="#buyBook"><td> <p>' 
				+ inventory[inventory.length-1]["Author"] + "</p></a></td><td>" 
				+ inventory[inventory.length-1]["Title"] + "</td><td>£" 
				+ inventory[inventory.length-1]["Price"].toFixed(2) + "</td><td>" 
				+ inventory[inventory.length-1]["ID"] + '</td></tr>'
			);
			$( "#actionMessage" ).empty();
			$( "#actionMessage" ).append('<div class="alert alert-success"><strong>Success!</strong> Book was successfully added to the inventory.</div>');
		} else {
			$( "#actionMessage" ).empty();
			$( "#actionMessage" ).append('<div class="alert alert-danger"><strong>Error!</strong> Entered price was not valid.</div>');
		}
		$('#totalResultsMessage').text($('.result:visible').length + ' books total.');
	});

	$('#searchBooks').keyup(function (e) {
		var input, filter, totalResults = 0, lastTotalResults = 1;
		input = $('#searchBooks').val();
		filter = input.toUpperCase();

		$.each(inventory, function (i, val) {
			if (val["Author"].toUpperCase().includes(filter) || val["Title"].toUpperCase().includes(filter) || val["Price"].toFixed(2).toString().includes(filter) || val["ID"].toUpperCase().includes(filter)) {
				$('[data-id=' + i +']').show();
			} else {
				$('[data-id=' + i +']').hide();
			}
		});
		$('#totalResultsMessage').text($('.result:visible').length + ' results found.');
	});
});