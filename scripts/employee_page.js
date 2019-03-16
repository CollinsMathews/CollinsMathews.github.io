shift_table_string = '';


var days_of_week = ['', 'Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'];
var shift_times = ['8:00AM - 11:00AM', '11:00AM - 2:00PM', '2:00PM - 5:00PM', '5:00PM - 8:00PM'];

document.getElementById('shift_table').innerHTML += '<thead><tr>';
for (var i = 0; i < days_of_week.length; i++) {
    if (i == 0) {
        shift_table_string += '<th id="days_cell" class="mdl-data-table__cell--non-numeric">' + '<form action="#">\
        <div class="mdl-textfield mdl-js-textfield">\
          <input class="mdl-textfield__input" type="text" id="name_input">\
          <label class="mdl-textfield__label" for="name_input">Name...</label>\
        </div>\
      </form>' + '</th>';
    } else {
        shift_table_string += '<th id="days_cell" class="mdl-data-table__cell--non-numeric">' + days_of_week[i] + '</th>';
    }
}

shift_table_string += '</tr></thead>';


for (var i = 0; i < shift_times.length; i++) {
    shift_table_string += '<tr id="row_' + (i) + '"><td class="shift_times_cell">' + shift_times[i] + '</td>';
    for (var j = 0; j < 7; j++) {
        shift_table_string += '<td class="shift_cell">' + '<form action="#" id="credit_input">\
        <div class="mdl-textfield mdl-js-textfield">\
        <input id="' + days_of_week[j + 1] + '_' + shift_times[i] + '" class="mdl-textfield__input" type="text" pattern="-?[0-9]*(\.[0-9]+)?" id="sample2">\
        <label class="mdl-textfield__label" for="sample2">Credits...</label>\
        </div>\
        </form>' + '</td>';
    }
    shift_table_string += '</tr>';
}


document.getElementById('shift_table').innerHTML = shift_table_string;

// Set the configuration for your app
// TODO: Replace with your project's config object
// Initialize Firebase
var config = {
    apiKey: "AIzaSyCllerIGsbDSRfbkXKBfQvMLnHqC_vUZwI",
    authDomain: "prefers-12cd2.firebaseapp.com",
    databaseURL: "https://prefers-12cd2.firebaseio.com",
    projectId: "prefers-12cd2",
    storageBucket: "prefers-12cd2.appspot.com",
    messagingSenderId: "412064070833"
};
firebase.initializeApp(config);

// Get a reference to the database service
var database = firebase.database();

function onSubmit() {
    var credits_used;
    shift_array = [];
    for (var i = 0; i < shift_times.length; i++) {
        for (var j = 0; j < days_of_week.length - 1; j++) {
            var day_on = days_of_week[j + 1];
            var shift_time_on = shift_times[i];

            if (document.getElementById(day_on + '_' + shift_time_on) == undefined || (credits_used = document.getElementById(day_on + '_' + shift_time_on).value) == "") {
                credits_used = 0;
            }


            shift_array.push({
                day: day_on,
                shift_time: shift_time_on,
                credits: credits_used
            });
        }
    }

    var username;

    try {
        username = document.getElementById("name_input").value;
    } catch (err) {
        username = "DID NOT PUT USERNAME";
    }

    var JSON_send = {
        user: username,
        shift_data: shift_array
    };

    firebase.database().ref("User").child(JSON_send.user).set(JSON_send);
}
