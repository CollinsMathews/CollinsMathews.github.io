var shift_table_string = '';
var creds_init = 1000;
var creds_remaining = creds_init;
var name = localStorage.getItem('name');
var image = localStorage.getItem('image');

function handleClientLoad() {

    gapi.client.init({
        'apiKey': 'YOUR_API_KEY',
        'clientId': 'YOUR_CLIENT_ID',
        'scope': SCOPE
    }).then(function () {
      GoogleAuth = gapi.auth2.getAuthInstance();

      // Listen for sign-in state changes.
      GoogleAuth.isSignedIn.listen(updateSigninStatus);

      // Handle initial sign-in state. (Determine if user is already signed in.)
      var user = GoogleAuth.currentUser.get();
      setSigninStatus();

      // Call handleAuthClick function when user clicks on
      //      "Sign In/Authorize" button.
      $('#sign-in-or-out-button').click(function() {
        handleAuthClick();
      }); 
      $('#revoke-access-button').click(function() {
        revokeAccess();
      }); 
    });
  }


var days_of_week = ['Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'];
var shift_times = ['8:00AM - 11:00AM', '11:00AM - 2:00PM', '2:00PM - 5:00PM', '5:00PM - 8:00PM'];

document.getElementsByClassName('creds_remaining')[0].innerHTML += "You have " + creds_init + " credits left.";
document.getElementById('shift_table').innerHTML += '<thead><tr>';
for (var i = 0; i < days_of_week.length + 1; i++) {
    if (i == 0) {
        if (name != "null") {
            shift_table_string += '<th id="days_cell" class="mdl-data-table__cell--non-numeric">You are logged in as: <br/><br/><div id="name_input">' + name + '</div>';
        } else {
            shift_table_string += '<th id="days_cell" class="mdl-data-table__cell--non-numeric">' +
                '<form action="#">\
        <div class="mdl-textfield mdl-js-textfield">\
          <input class="mdl-textfield__input" type="text" id="name_input">\
          <label class="mdl-textfield__label" for="name_input">' + 'Name...' + ' ...</label>\
        </div>\
      </form>';
        }

        shift_table_string += '<form action="#" id="credit_input">\
      <div class="mdl-textfield mdl-js-textfield">\
      <input class="mdl-textfield__input" type="number" pattern="-?[0-9]*(\.[0-9]+)?" id="no_of_shift">\
      <label class="mdl-textfield__label" for="no_of_shift">No of Shifts....</label>\
      </div>\
      </form>'
        '</th>';
    } else {
        shift_table_string += '<th id="days_cell" class="mdl-data-table__cell--non-numeric">' + days_of_week[i - 1] + '</th>';
    }
}

shift_table_string += '</tr></thead>';


for (var i = 0; i < shift_times.length; i++) {
    shift_table_string += '<tr id="row_' + (i) + '"><td class="shift_times_cell">' + shift_times[i] + '</td>';
    for (var j = 0; j < days_of_week.length; j++) {
        shift_table_string += '<td class="shift_cell">' + '<form action="#" id="credit_input">\
        <div class="mdl-textfield mdl-js-textfield">\
        <input id="' + days_of_week[j] + '_' + shift_times[i] + '" class="mdl-textfield__input shift_cell" type="text" oninput="credChange(\'' + days_of_week[j] + '_' + shift_times[i] + '\')" pattern="-?[0-9]*(\.[0-9]+)?" id="sample2">\
        <label class="mdl-textfield__label" for="sample2">Credits...</label>\
        </div>\
        </form>' + '</td>';
    }
    shift_table_string += '</tr>';
}


document.getElementById('shift_table').innerHTML = shift_table_string;


localStorage.clear('name');
localStorage.clear('image');
localStorage.clear('id_token');

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
        for (var j = 0; j < days_of_week.length; j++) {
            var day_on = days_of_week[j];
            var shift_time_on = shift_times[i];

            if (document.getElementById(day_on + '_' + shift_time_on) == undefined || (credits_used = document.getElementById(day_on + '_' + shift_time_on).value) == "") {
                credits_used = 0;
            }


            shift_array.push({
                day: day_on,
                shift_time: shift_time_on,
                credits: Number(credits_used),
                credits_remaining: creds_remaining
            });
        }
    }

    var username;
    var no_of_shifts;
    var username_valid_flag = 0;
    var no_of_shifts_flag = 0;

    try {
        if (name != "null") {
            username = name;
            username_valid_flag = 1;
        } else if ((username = document.getElementById("name_input").value) == "") {
            alert("Please Enter A Name!");
        } else {
            username_valid_flag = 1;
        }

    } catch (err) {
        alert("Please Enter A Name!");
    }

    try {
        if ((no_of_shifts = document.getElementById("no_of_shift").value) == "") {
            alert("Please Enter How Many Shifts You Want!");
        } else {
            no_of_shifts_flag = 1;
        }
    } catch (err) {
        alert("Please Enter How Many Shifts You Want!");
    }

    if (username_valid_flag && no_of_shifts_flag) {

        var JSON_send = {
            user: username,
            shift_data: shift_array,
            no_of_shift: Number(no_of_shifts)
        };

        firebase.database().ref("User").child(JSON_send.user).set(JSON_send);

        var animated_style = document.getElementsByClassName('animated')[0].style;
        animated_style['background-color'] = 'white';
        animated_style['background-repeat'] = 'no-repeat';
        animated_style['background-position'] = 'left top';
        animated_style['padding-top'] = '95px';
        animated_style['margin-bottom'] = '60px';
        animated_style['-webkit-animation-duration'] = '5s';
        animated_style['animation-duration'] = '5s';
        animated_style['-webkit-animation-fill-mode'] = 'both';
        animated_style['animation-fill-mode'] = 'both';

        var popup_style = document.getElementById('animated-example').style;
        popup_style['z-index'] = 1
        popup_style['animation-play-state'] = 'running';

        document.getElementById('animated-example').innerText = 'prefer.io will now log out.'
        animated_style['text-align'] = 'center';
        animated_style['font-size'] = '5em';
        animated_style['padding-top'] = '40%';

        setTimeout(function () {
            var auth2 = gapi.auth2.getAuthInstance();
            auth2.signOut().then(function () {
                console.log('User signed out.');
            });
            window.href('index.html');

        }, 2000);

    }


}

function credChange(cell_id) {
    var sum = 0
    for (var i = 0; i < days_of_week.length; i++) {
        for (var j = 0; j < shift_times.length; j++) {
            if ((the_value = document.getElementById(days_of_week[i] + '_' + shift_times[j]).value) == "") {
                sum += 0;
            } else {
                sum += Number(the_value);

            }
        }
    }

    if ((Number(creds_init) - Number(sum)) < 0) {
        alert("You Cannot Use More Credits Than You Have!");
        document.getElementById(cell_id).value = "";

        sum = 0
        for (var i = 0; i < days_of_week.length; i++) {
            for (var j = 0; j < shift_times.length; j++) {
                if ((the_value = document.getElementById(days_of_week[i] + '_' + shift_times[j]).value) == "") {
                    sum += 0;
                } else {
                    sum += Number(the_value);

                }
            }
        }
    }

    creds_remaining = (Number(creds_init) - Number(sum))

    document.getElementsByClassName('creds_remaining')[0].innerHTML = "You have " + creds_remaining + " credits left.";

}

for (var i = 0; i < days_of_week.length * shift_times.length; i++) {
    document.getElementsByClassName('shift_cell')[i].addEventListener('keydown', function (e) {
        var key = e.keyCode ? e.keyCode : e.which;

        if (!([8, 9, 13, 27, 46, 110, 190].indexOf(key) !== -1 ||
                (key == 65 && (e.ctrlKey || e.metaKey)) ||
                (key >= 35 && key <= 40) ||
                (key >= 48 && key <= 57 && !(e.shiftKey || e.altKey)) ||
                (key >= 96 && key <= 105)
            )) e.preventDefault();
    });
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  }