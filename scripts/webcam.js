const elementWebcam = document.getElementById('webcam');
elementWebcam.playsInline = true;
elementWebcam.autoplay = true;

const constraints = window.constraints = {
  audio: false,
  // video: {width:{exact: 640}, height: {exact: 480}}
  video: {
    facingMode : { exact: "environment"}
  }
}

async function init(){
  try{
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    console.log(stream);
    handleSuccess(stream);

    
  }catch(e){
    console.log(e);
  }
}

function handleSuccess(stream){
  
  elementWebcam.srcObject = stream;
  console.log('completed!');

}


window.addEventListener('load', init);