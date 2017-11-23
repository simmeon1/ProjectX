$(document).ready(function () {	

	$.each(inventory, function (i, val) {
		$( "#inventory > .table > tbody" ).append(
			'<tr a role="button" data-toggle="modal" data-id="' + i +'" class="result open-buyBook" href="#buyBook">><td> <p>' + val["Author"] + "</p></a></td><td>" + val["Title"] + "</td><td>£" + val["Price"].toFixed(2) + "</td><td>" + val["ID"] + '</td></tr>');
		$('#totalResultsMessage').text($('.result:visible').length + ' books total.');
	});

	$(".sellSuccess").click(function() {
		$( ".container" ).append('<div class="alert alert-success"><strong>Success!</strong> Indicates a successful or positive action.</div>');
	});

	$(document).on("click", ".open-buyBook", function () {
		var bookId = $(this).data('id');
		$('.buyBookAuthor > p').text(inventory[bookId]["Author"]);
		$('.buyBookTitle > p').text(inventory[bookId]["Title"]);
		$('.buyBookPrice > p').text(inventory[bookId]["Price"]);
		$('.buyBookID > p').text(inventory[bookId]["ID"]);
	});

	$('#searchBooks').keyup(function (e) {
		var input, filter, totalResults = 0, lastTotalResults = 1;
		input = $('#searchBooks').val();
		filter = input.toUpperCase();

		// Loop through all list items, and hide those who don't match the search query
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