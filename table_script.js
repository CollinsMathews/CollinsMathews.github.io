var shift_table_string = '';

var days_of_week = ['', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var shift_times = ['8:00AM - 12:00M', '10:00PM - 2:00PM', '12:00PM - 4:00PM', '2:00PM - 6:00PM'];

document.getElementById('shift_table').innerHTML += '<thead><tr>';
for (var i = 0; i < 8; i++) {
    shift_table_string += '<td>' + days_of_week[i] + '</td>';
}

shift_table_string += '</tr>';


for (var i = 0; i < 4; i++) {
    shift_table_string += '<tr><td>' + shift_times[i] + '</td>';
    for (var j = 0; j < 7; j++) {
        shift_table_string += '<td>' + '' + '</td>';
    }
    shift_table_string += '</tr>';
}


document.getElementById('shift_table').innerHTML = shift_table_string;