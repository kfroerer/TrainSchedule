$(document).ready(function(){
    var displayTime = function(){
    var currentTime = moment().format("h:mm:ss a");
    $("#currentTime").text("Current Time is " + currentTime);
 }

setInterval(displayTime, 1000);

var config = {
    apiKey: "AIzaSyCO83hdTWvoo7hakBLQk3HMe1EKig4Z--k",
    authDomain: "train-schedule-721b9.firebaseapp.com",
    databaseURL: "https://train-schedule-721b9.firebaseio.com",
    projectId: "train-schedule-721b9",
    storageBucket: "train-schedule-721b9.appspot.com",
    messagingSenderId: "115646008961"
    };
    firebase.initializeApp(config);
    var database = firebase.database();

var destination = "";
var trainName = "";
var firstTrain = "";
var frequency = "";
// var nextTrain
// var minutesAway
        
$("#submit-btn").on("click", function (){
    event.preventDefault();
    destination = $("#destination").val().trim();
    trainName = $("#name").val().trim();
    firstTrain = $("#firstTrain").val().trim();
    frequency = $("#frequency").val().trim();
    console.log(trainName);
    
    
    database.ref().push({
        destination: destination,
        trainName: trainName,
        firstTrain: firstTrain,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
   
    $("#destination").text(""); 

});
        
  
database.ref().on("child_added", function(childsnapshot) {
    console.log(childsnapshot.val());
    destination = childsnapshot.val().destination;
    trainName = childsnapshot.val().trainName;
    firstTrain = childsnapshot.val().firstTrain;
    frequency = childsnapshot.val().frequency;

    var convFirstTrain = moment(firstTrain, "HH:mm").subtract(1, "years");
    console.log("converted:  "+ convFirstTrain);
    var timeNow = moment();
    console.log("Time now is: " + timeNow)
    // var firstTrainconverted = moment().diff(convFirstTrain, "hh:mm");
    var timeDiff = moment().diff(moment(convFirstTrain), "minutes");
    console.log("Difference in time: " + timeDiff);
    var timeRemain = timeDiff % frequency;
    var minutesAway = frequency - timeRemain;
    console.log("MINUTES TILL TRAIN: " + minutesAway);
    var nextTrain = moment().add(minutesAway, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    // var trainRow = $('<tr>');
    // var tableName = $('<td>');
    // tableName.text(childsnapshot.val().trainName);
    
    // var destination = $('<td>');
    // destination.text(childsnapshot.val().destination);

    // var nextTrain = $('<td>');
    // nextTrain.text(childsnapshot.val().nextTrain);

    // var frequency = $('<td>');
    // frequency.text(childsnapshot.val().frequency);

    // var minutesAway = $('<td>');
    // minutesAway.text(childsnapshot.val().minutesAway);

    // trainRow.append(tableName);
    // trainRow.append(destination);
    // trainRow.append(nextTrain);
    // trainRow.append(frequency);
    // trainRow.append(minutesAway);

    // $('tbody').append(trainRow);
});
        
// database.ref.limitToLast(1).on("child_added", function(childsnapshot){

// })    


});