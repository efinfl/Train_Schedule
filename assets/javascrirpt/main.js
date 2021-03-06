
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

  /* Sumit button is clicked to capture and send data to database */
  $("#submitTrain").on("click", function (event) {


    event.preventDefault();

    // Creates variables that hold the values from each filed

    var trainName = $("#trainName").val().trim();
    var destination = $("#destination").val().trim();
    var firstTrain = $("#firstTrain").val().trim();
    var frequency = $("#frequency").val().trim();


    /* Pushes values from the defined variabls above and 
      pushes them into database into properties nameed the same.*/

    var newTrain = {
      trainName: trainName,
      destination: destination,
      firstTrain: firstTrain,
      frequency: frequency,
      dateAdded: firebase.database.ServerValue.TIMESTAMP
    }
    
    database.ref().push(newTrain);

    $("#trainName").val("");
    $("#destination").val("");
    $("#firstTrain").val("");
    $("#frequency").val("");

  });

  database.ref().on("child_added", function (childSnapshot) {

    var trainName = childSnapshot.val().trainName;
    var destination = childSnapshot.val().destination;
    var firstTrain = childSnapshot.val().firstTrain;
    var frequency = childSnapshot.val().frequency;

    // Convert firstTrain time to the past
    var firstTrainNew = moment(firstTrain, "HH:mm").subtract(1, "year");

    var currentTime = moment().format("hh:mm")

    // Difference From now and firstTrain
    var nowFirstDiff = moment().diff(firstTrainNew, "minutes");

    // Remainder of nowFirstDiff and frequency
    var remainder = nowFirstDiff % frequency;

    // Minutes away
    var minutesAway = frequency - remainder;

    var nextArrival = moment().add(minutesAway, "minutes").format("HH:mm");

    /* variable is created that places each of 
      those varaiables as table data in a table row */
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(destination),
      $("<td>").text(frequency),
      $("<td>").text(nextArrival),
      $("<td>").text(minutesAway),
    );
    /* Generates rows by taking newRow varaibales above */
    $("#trainTable > tbody").append(newRow);
  
  
  });
  


});

















