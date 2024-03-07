var previusResult=""


function setup() {
  canvas = createCanvas(300, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier= ml5.imageClassifier("MobileNet", modelLoaded)
}

function draw(){
  image (video, 0,0,300,300)
  classifier.classify(video, gotResult)
}

function modelLoaded(){
  console.log("modelLoaded")
}

function gotResult(error,result){
  if(error){
    console.error(error)
  }
  else{
    if((result[0].confidence>0.5) && (previusResult !== result[0].label)){
      console.log(result)
      previusResult = result[0].label;
      var synth = window.speechSynthesis
      speakData = "Object Detected Is -"+ result[0].label
      var utterThis = new SpeechSynthesisUtterance(speakData)
      synth.speak(utterThis)
      document.getElementById("result_object_name").innerHTML= result[0].label
      document.getElementById("result_confidence").innerHTML= result[0].confidence.toFixed(3)*100 + "%"
    }
  }
}



