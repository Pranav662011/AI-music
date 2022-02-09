song1="";
song2="";

leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
song1status="";
song2status="";
RightWristScore=0;
LeftWristScore=0;

function preload(){
    song1=loadSound("believer.mp3");
    song2=loadSound("safari.mp3");
}

function setup(){
    canvas=createCanvas(600,500);
    canvas.center();

    video= createCapture(VIDEO);
    video.hide();

    poseNet=ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);

}



function gotPoses(results){
if(results.length>0){
    console.log(results);
    RightWristScore=results[0].pose.keypoints[10].score;
    LeftWristScore=results[0].pose.keypoints[9].score;
    console.log(" LeftWristScore = "+ LeftWristScore);
    console.log(" RightWristScore = "+ RightWristScore);
    leftWristX=results[0].pose.leftWrist.x;
    leftWristY=results[0].pose.leftWrist.y;
    console.log("LeftwristX = "+leftWristX+", leftwristY = "+leftWristY);
    

    rightWristX=results[0].pose.rightWrist.x;
    rightWristY=results[0].pose.rightWrist.y;
    console.log("rightwristX = "+rightWristX+", rightwristY = "+rightWristY);
 }
}

function modelLoaded(){
    console.log("model is loaded");
}

function draw(){
    image(video, 0,0, 600, 500);
     fill("#fc0303");
     stroke("#fc0303");
     

     if(LeftWristScore > 0.2){
        circle(leftWristX,leftWristY,20);
        song2.stop();
        song1.play();
        
     }

     if(RightWristScore > 0.2){
        circle(rightWristX,rightWristY,20);
         song1.stop();
        song2.play();

     }
}


function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}


