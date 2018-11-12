$(document).ready(function(){
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
    
    var trainName = "";
    var trackNum = "";
    var firstTrain= "";
    var frequency = "";
        
    var trainData  = {
        trainName: trainName,
        trackNum: trackNum,
        firstTrain: firstTrain,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    }

    $("#submit-btn").on("click", function (){
        event.preventDefault();

        trainName = $("#name").val().trim();
        trackNum = $("#track").val().trim();
        firstTrain = $("#firstTrain").val().trim();
        frequency = $("#frequency").val().trim();
        console.log(trainName);
        
        database.ref().push(trainData);
    });
        
    database.ref().on("child_added", function(childsnapshot) {
        console.log(childsnapshot.val());
        
        trainName = childsnapshot.val().trainName;
        trackNum = childsnapshot.val().trackNum;
        firstTrain = childsnapshot.val().firsTrain;
        frequency = childsnapshot.val().frequency;

    var nextArrival =     
    var minutesAway =     
               
    });
    






})