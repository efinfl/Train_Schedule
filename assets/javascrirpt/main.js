
$(document).ready(function () {

  var config = {
    apiKey: "AIzaSyDXGNeVxdUR2FunZlJMfhMO9DSNot3uHK4",
    authDomain: "trainschedule-27928.firebaseapp.com",
    databaseURL: "https://trainschedule-27928.firebaseio.com",
    projectId: "trainschedule-27928",
    storageBucket: "trainschedule-27928.appspot.com",
    messagingSenderId: "488763904874"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  // Time conversion variables
  var timeFormat = "HH:mm"

  
  /* Sumit button is clicked to capture text input in fields,
  sends it to database and displays in table by doing the following */
  $("#submitTrain").on("click", function (event) {

    event.preventDefault();

    console.log("Submit clicked");

    // Creates variables that hold the values from each filed
    var trainName = $("#trainName").val().trim();
    var destination = $("#destination").val().trim();
    var firstTrain = $("#firstTrain").val().trim();
    var frequency = $("#frequency").val().trim();

    /* Then a variable is created that places each of 
    those varaiables as table data in a table row */
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(destination),
      $("<td>").text(frequency),
      // These need calculations
      // $("<td>").text(nextArrival),
      // $("<td>").text(minutesAway),
    )

    /* Generates rows by taking newRow varaibales above */
    $("#trainTable > tbody").append(newRow);

    /* Pushes values from the defined variabls above and 
    pushes them into database into properties nameed the same.*/
    database.ref().push({
      trainName: trainName,
      destination: destination,
      frequency: frequency,
      // nextArrival: nextArrival,
      // minutesAway: minutesAway,
  });









  })


















});