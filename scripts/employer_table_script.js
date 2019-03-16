shift_table_string = '';


var days_of_week = ['', 'Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'];
var shift_times = ['8:00AM - 12:00PM', '10:00PM - 2:00PM', '12:00PM - 4:00PM', '2:00PM - 6:00PM'];

document.getElementById('shift_table').innerHTML += '<thead><tr>';
for (var i = 0; i < 8; i++) {
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


for (var i = 0; i < 4; i++) {
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

var pref_array = [];

function onRetrieve() {
  firebase.database().ref('User').orderByKey().on("child_added", function (user_shift_data_object) {
      var employee_shift_pref = user_shift_data_object.shift_data();
      var templist = [];
      for (var i = 0; i < 28; i++) {
        templist.push(employee_shift_pref[i].credits());
      }
      pref_array.push(templist);
  });

  MunkresAlgorithm(pref_array)
}

