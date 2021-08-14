//song 2
fineLine = "";
//song 1
hs1 = "";
scoreLeftWrist = 0;
scoreRightWrist = 0;
songStatus = "";

function preload() {
 fineLine = loadSound('music.mp3');
 hs1 = loadSound('music2.mp3');
 console.log("music is loaded");
}
function setup() {
 canvas = createCanvas(400, 400);
 canvas.center();

 video = createCapture(VIDEO);
 video.hide();

 poseNet = ml5.poseNet(video, modelLoaded);
 poseNet.on('pose', gotPoses);
}
function draw() {
 image(video, 0, 0, 400, 400);
    
    fill("#FF0000");
    stroke("#FF0000");

    //Song I code

    songStatus = hs1.isPlaying();

 if(scoreLeftWrist > 0.0002) {

    circle(leftWristX, leftWristY, 30);
    fineLine.stop();
    if(hs1.isPlaying() == false) {
        hs1.play();
        document.getElementById('name').innerHTML = "Song Name : Peter Pan Song";
    }
 }

//Song II code

 songStatus = fineLine.isPlaying();
  
 if(scoreRightWrist > 0.0002) {
     circle(rightWristX, rightWristY, 30);
     hs1.stop();
     if(fineLine.isPlaying() == false) {
         fineLine.play();
         document.getElementById('name').innerHTML = "Song Name : Peter Pan Song 2.0";
     }
 }
}

leftWristX = 0;
leftWristY = 0;

rightWristX = 0;
rightWristY = 0;

function modelLoaded() {
    console.log("Model is loadedddddddddd");
}

function gotPoses(results) {
    if(results.length > 0) {
        console.log(results);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("right wrist score = " + scoreRightWrist);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("left wrist score = " + scoreLeftWrist);

        leftWristX = results[0].pose.leftWrist.x;
        rightWristX = results[0].pose.rightWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("left wrist x = " + leftWristX + " left wrist y = " + leftWristY);
        console.log("right wrist x = " + rightWristX + " right wrist y = " + rightWristY);
    }
}