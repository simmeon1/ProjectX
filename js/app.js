$(document).ready(function () {	

	//Goes through each item in the inventory (coming from inventory.js) and adds it to the table on the main page.
	$.each(inventory, function (i, val) {
		$( "#inventory > .table > tbody" ).append(
			'<tr a role="button" data-toggle="modal" data-id="' + i +'" class="result open-buyBook" href="#buyBook"><td> <p>' 
			+ val["Author"] + "</p></a></td><td>" 
			+ val["Title"] + "</td><td>£" 
			+ val["Price"].toFixed(2) + "</td><td>" 
			+ val["ID"] + '</td></tr>'
		);
		//Shows the count of all the visible books.
		$('#totalResultsMessage').text($('.result:visible').length + ' books total.');
	});

	//When clicking on a book, loads up a modal showing the data of the book pulled from the inventory.
	$('.buy-subpage').on('click','.open-buyBook',function() {
		var bookId = $(this).data('id');
		$('.buyBookAuthor > p').text(inventory[bookId]["Author"]);
		$('.buyBookTitle > p').text(inventory[bookId]["Title"]);
		$('.buyBookPrice > p').text("£" + inventory[bookId]["Price"].toFixed(2));
		$('.buyBookID > p').text(inventory[bookId]["ID"]);
	});

	//When clicking Buy A Book, goes through the inventory and makes all the book visible if not already, and shows the inventory.
	//When the page is loaded, the inventory is already loaded as well but hidden. Adding it dynamically works with Firefox but not with Chrome.
	//For the sake of the demo, the inventory will be available from the start.
	$(".load-inventory").click(function () {
		$.each(inventory, function (i, val) {
			$('[data-id=' + i +']').show();
		});
		$(".buy-subpage").show();
		$('#totalResultsMessage').text($('.result:visible').length + ' results found.');
	});

	//When clicking Buy From Amazon, the browser will open an Amazon search with the book author and title.
	$(".buyAmazon").click(function () {
		window.open('https://www.amazon.co.uk/s/field-keywords=' + $('.buyBookAuthor > p').html() + ' ' + $('.buyBookTitle > p').html(), '_blank');
	});

	//Upon clicking Buy Success, a transaction success message will appear.
	$(".buySuccess").click(function () {
		$( "#actionMessage" ).empty();
		$( "#actionMessage" ).append('<div class="alert alert-success"><strong>Success!</strong> Transaction was successful.</div>');
	});

	//Upon clicking Buy Success, a transaction failure message will appear.
	$(".buyFailure").click(function () {
		$( "#actionMessage" ).empty();
		$( "#actionMessage" ).append('<div class="alert alert-danger"><strong>Error!</strong> Transaction was not successful.</div>');
	});

	//Upon clicking Sell, a transaction failure message will appear, the app will first do a check for a valid RGU email and valid price.
	//If both checks are successful, the book will be added to the inventory and a success message will appear.
	//Otherwise there will be an aerror regarding one of the checks.
	$(".sellSuccess").click(function() {
		$( "#actionMessage" ).empty();
		var	bookPrice = parseFloat($('.sellBookPrice').val()) || 0;
		//RGU email needs to have @rgu.ac.uk to be valid
		if (!($('.rguEmail').val().includes('@rgu.ac.uk'))) {			
			$( "#actionMessage" ).append('<div class="alert alert-danger"><strong>Error!</strong> RGU email was not valid.</div>');
		}
		else if (bookPrice != 0) {
			inventory.push({ "Author": $('.sellBookAuthor').val(), "Title": $('.sellBookTitle').val(), "Price": parseFloat($('.sellBookPrice').val()) || 0, "ID": $('.sellBookID').val() });
			$( "#inventory > .table > tbody" ).append(
				'<tr a role="button" data-toggle="modal" data-id="' + (inventory.length-1) +'" class="result open-buyBook" href="#buyBook"><td> <p>' 
				+ inventory[inventory.length-1]["Author"] + "</p></a></td><td>" 
				+ inventory[inventory.length-1]["Title"] + "</td><td>£" 
				+ inventory[inventory.length-1]["Price"].toFixed(2) + "</td><td>" 
				+ inventory[inventory.length-1]["ID"] + '</td></tr>'
			);
			$( "#actionMessage" ).append('<div class="alert alert-success"><strong>Success!</strong> Book was successfully added to the inventory.</div>');
		} else {
			$( "#actionMessage" ).append('<div class="alert alert-danger"><strong>Error!</strong> Entered price was not valid.</div>');
		}
		$('#totalResultsMessage').text($('.result:visible').length + ' books total.');
	});

	//Upon typing in the search box, the inventory will be looped through and will only show results containing any of the typed phrases in its properties.
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