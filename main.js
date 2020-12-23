prediction_1 = "";
prediction_2 = "";

Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 100
});

var camera = document.getElementById('camera');
Webcam.attach(camera);

function take_snapshot() {
    Webcam.snap(function(data_uri) {
        document.getElementById('result').innerHTML = "<img id='captured_image' src='" + data_uri +"' />";
    });
}

console.log('ml5 Version', ml5.version);
var classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/j0kAcOCPt/model.json', modelLoaded);

function modelLoaded() {
    console.log('Model loaded');
}

function speak() {
    var synth = window.speechSynthesis;
    var speak_data1 = "The first prediction is" + prediction_1;
    var speak_data2 = "And the second prediction is" + prediction_2;
    var utterThis = new SpeechSynthesisUtterance(speak_data1 + speak_data2);
    synth.speak(utterThis);
}

function check() {
    var img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        document.getElementById('result_emotion_name').innerHTML = results[0].label;
        document.getElementById('result_emotion_name2').innerHTML = results[1].label;
        prediction_1 = results[0].label;
        prediction_2 = results[1].label;
        speak();

        if (results[0].label == "Good Luck") {
            document.getElementById('updated_emoji').innerHTML = "&#128077;";
        }
        if (results[0].label == "Nice") {
            document.getElementById('updated_emoji').innerHTML = "&#128076;";
        }
        if (results[0].label == "Victory") {
            document.getElementById('updated_emoji').innerHTML = "&#9996;";
        }
        
        if (results[1].label == "Good Luck") {
            document.getElementById('updated_emoji2').innerHTML = "&#128077;";
        }
        if (results[1].label == "Nice") {
            document.getElementById('updated_emoji2').innerHTML = "&#128076;";
        }
        if (results[1].label == "Victory") {
            document.getElementById('updated_emoji2').innerHTML = "&#9996;";
        }
    }
}

