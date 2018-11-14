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
        
        $("#name").val("");
        $("#destination").val(""); 
        $("#firstTrain").val("");
        $("#frequency").val("");
        
        
    });
    
    database.ref().on("child_added", function(childsnapshot, prevChildKey) {
        // console.log(childsnapshot.val());
        destination = childsnapshot.val().destination;
        trainName = childsnapshot.val().trainName;
        firstTrain = childsnapshot.val().firstTrain;
        frequency = childsnapshot.val().frequency;
    });    
    
    
    var firstTrainConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
    console.log("converted:  "+ firstTrainConverted);
    var timeNow = moment();
        console.log("Time now is: " + timeNow)
    var timeDiff = moment().diff(moment(firstTrainConverted), "minutes");
        console.log("Difference in time: " + timeDiff);
    var timeRemain = timeDiff % frequency;
    var minutesAway = frequency - timeRemain;
        console.log("MINUTES TILL TRAIN: " + minutesAway);
    var nextTrain = moment().add(minutesAway, "minutes").format("HH:mm");
        console.log("ARRIVAL TIME: " + moment(nextTrain));    

database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(childsnapshot){
    
    var trainRow = $('<tr>');
    var tableName = $('<td>');
    tableName.text(childsnapshot.val().trainName);
    
    var destination = $('<td>');
    destination.text(childsnapshot.val().destination);

    var nextTraindata = $('<td>');
    nextTraindata.text(nextTrain);

    var frequency = $('<td>');
    frequency.text(childsnapshot.val().frequency);

    var minutesAwaydata = $('<td>');
    minutesAwaydata.text(minutesAway);

    trainRow.append(tableName);
    trainRow.append(destination);
    trainRow.append(nextTraindata);
    trainRow.append(frequency);
    trainRow.append(minutesAwaydata);

    $('tbody').append(trainRow);

});


});