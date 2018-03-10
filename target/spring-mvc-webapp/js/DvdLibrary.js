
$(document).ready(function () {
    loadDvdLibrary();
    $('#add-button').click(function (event) {
        event.preventDefault();
        // Submit Via Ajax
        $.ajax({
            type: 'POST',
            url: 'dvd',
            //Make JSON dvd
            data: JSON.stringify({
                title: $('#add-dvd-title').val(),
                year: $('#add-dvd-year').val(),
                rating: $('#add-dvd-mpaa-rating').val(),
                director: $('#add-dvd-director').val(),
                studio: $('#add-dvd-studio').val(),
                userRating: $('#add-dvd-user-rating').val()
            }),
            contentType: 'application/json; charset=utf-8',
            headers: {
                'Accept': 'application/json',
                'contentType': 'application/json'
            },
            dataType: 'json'
        }).success(function (data, status) {
            //clear the form input
            $('#add-dvd-title').val('');
            $('#add-dvd-year').val('');
            $('#add-dvd-mpaa-rating').val('');
            $('#add-dvd-director').val('');
            $('#add-dvd-studio').val('');
            $('#add-dvd-user-rating').val('');

            loadDvdLibrary();
        }).error(function (data, status) {
            $('#validationErrors').empty();
            $.each(data.responseJSON.fieldErrors, function (index, validationError) {
                var errorDiv = $('#validationErrors');
                errorDiv.append(validationError.message).append($('<br>'));
            });
        });
    });
    $('#edit-button').click(function (event) {
        event.preventDefault();
        // Submit Via Ajax
        $.ajax({
            type: 'PUT',
            url: 'dvd/' + $('#edit-dvd-id').val(),
            data: JSON.stringify({
                title: $('#edit-dvd-title').val(),
                year: $('#edit-dvd-year').val(),
                rating: $('#edit-dvd-mpaa-rating').val(),
                director: $('#edit-dvd-director').val(),
                studio: $('#edit-dvd-studio').val(),
                userRating: $('#edit-dvd-user-rating').val()
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            'dataType': 'json'
        }).success(function () {
            loadDvdLibrary();
        }).error(function (data, status) {
            $('#validationErrorsEdit').empty();
            $.each(data.responseJSON.fieldErrors, function (index, validationErrorEdit) {
                var errorDiv = $('#validationErrorsEdit');
                errorDiv.append(validationErrorEdit.message).append($('<br>'));
            });
        });
    });
});
function loadDvdLibrary() {
    $.ajax({
        url: 'dvds'
    }).success(function (data, status) {
        fillDvdTable(data);
    });
}

function fillDvdTable(dvdList, status) {
    clearDvdTable();

    var summaryTable = $('#contentRows');

    $.each(dvdList, function (index, dvd) {
        summaryTable.append($('<tr>')
                .append($('<td>')
                        .append($('<a>')
                                .attr({
                                    'data-dvd-id': dvd.dvdId,
                                    'data-toggle': 'modal',
                                    'data-target': '#detailsModal'
                                })
                                .text((index) + ' - ' + dvd.title + " " + dvd.year)))
                .append($('<td>')
                        .append($('<a>')
                                .attr({
                                    'data-dvd-id': dvd.dvdId,
                                    'data-toggle': 'modal',
                                    'data-target': '#editModal'
                                })
                                .text('Edit')))
                .append($('<td>')
                        .append($('<a>')
                                .attr({
                                    'onClick': 'deleteDvd(' + dvd.dvdId + ')'
                                })
                                .text('Delete'))));

    });
}

$('#detailsModal').on('show.bs.modal', function (event) {
    var element = $(event.relatedTarget);
    var dvdId = element.data('dvd-id');
    var modal = $(this);

    $.ajax({
        type: 'GET',
        url: 'dvd/' + dvdId
    }).success(function (dvd) {
        modal.find('#dvd-id').text(dvd.dvdId);
        modal.find('#dvd-title').text(dvd.title);
        modal.find('#dvd-year').text(dvd.year);
        modal.find('#dvd-mpaa-rating').text(dvd.rating);
        modal.find('#dvd-director').text(dvd.director);
        modal.find('#dvd-studio').text(dvd.studio);
        modal.find('#dvd-user-rating').text(dvd.userRating);

    });
});

$('#editModal').on('show.bs.modal', function (event) {
    var element = $(event.relatedTarget);
    var dvdId = element.data('dvd-id');
    var modal = $(this);

    $.ajax({
        type: 'GET',
        url: 'dvd/' + dvdId
    }).success(function (dvd) {
        modal.find('#edit-dvd-id').val(dvd.dvdId);
        modal.find('#edit-dvd-title').val(dvd.title);
        modal.find('#edit-dvd-year').val(dvd.year);
        modal.find('#edit-dvd-mpaa-rating').val(dvd.rating);
        modal.find('#edit-dvd-director').val(dvd.director);
        modal.find('#edit-dvd-studio').val(dvd.studio);
        modal.find('#edit-dvd-user-rating').val(dvd.userRating);

    });
});

function clearDvdTable() {
    $('#contentRows').empty();
}

function deleteDvd(id) {
    var answer = confirm('Are you sure you want to remove this DVD?');

    if (answer === true) {
        $.ajax({
            type: 'DELETE',
            url: 'dvd/' + id

        }).success(function () {
            loadDvdLibrary();
        });
    }
}