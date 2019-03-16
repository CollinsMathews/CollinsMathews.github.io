shift_table_string = '';

var days_of_week = ['', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var shift_times = ['8:00AM - 12:00M', '10:00PM - 2:00PM', '12:00PM - 4:00PM', '2:00PM - 6:00PM'];

document.getElementById('shift_table').innerHTML += '<thead><tr>';
for (var i = 0; i < 8; i++) {
    shift_table_string += '<th id="days_cell" class="mdl-data-table__cell--non-numeric">' + days_of_week[i] + '</th>';
}

shift_table_string += '</tr></thead>';


for (var i = 0; i < 4; i++) {
    shift_table_string += '<tr id="row_' + (i+1) + '"><td class="shift_times_cell">' + shift_times[i] + '</td>';
    for (var j = 0; j < 7; j++) {
        shift_table_string += '<td class="shift_cell">' + '' + '</td>';
    }
    shift_table_string += '</tr>';
}


document.getElementById('shift_table').innerHTML = shift_table_string;