/* 
 * Restore username. Begins on load of document (options.html).
 */
window.onload = function(e){
	restoreOptions();
}

/*
 * Saves options to localStorage.
 */
function saveOptions() {
  var user = document.getElementById("user").value;
  var pass = document.getElementById("pass").value;
  if(user.trim()=="" || pass.trim()=="") {
    document.getElementById("status").innerHTML = "You must enter a valid username and password.";
    return;
  }
  localStorage["user"] = user;
  localStorage["pass"] = sjcl.encrypt("javascript",pass);

  // Update status to let user know options were saved.
  document.getElementById("status").innerHTML = "Saved successfully.";
}

/*
 * Restores username from localStorage and presets it as the value of the
 * username input.
 */
function restoreOptions() {
  var user = localStorage["user"];
  if(!user) {
    return;
  }
  document.getElementById("user").value = user;
}

/*
 * If .save is clicked, call saveOptions().
 */
function clickHandler(e) {
  saveOptions();
}

/*
 * On any keypress, clear status text. Check if keypress is <enter> and if so
 * call saveOptions().
 */
function keypressHandler(e) {
  document.getElementById("status").innerHTML = "";
  if(e.keyCode == 13) {
    saveOptions();
  }
}

/*
 * Add event listener for clicking the save button. Add event listener for
 * pressing keys in one of the input fields.
 */
document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('save').addEventListener('click', clickHandler);
  document.getElementById('user').addEventListener('keypress', keypressHandler);
  document.getElementById('pass').addEventListener('keypress', keypressHandler);
});
