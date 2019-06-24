var mycanvas = document.querySelector(`#myCanvas`);

function webcam_init(video) {
  if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.enumerateDevices()
      .then(gotDevices)
      .catch(errorCallback);
  } else {
    let reason = isMobile() &&
       !/https/.test(window.location.protocol)
      ? `On mobile devices, getUserMedia only works on https`
      : `Unknown reason: try to plug your device on USB port and open chrome://inspect`;
    alert(`Cannot get Video Feed : ${reason}`);
  }
}

function errorCallback(err) {
  console.error(err);
}

function isMobile () {
  return /arm/.test(window.navigator.platform);
}

function gotDevices(deviceInfos) {
  console.log(deviceInfos);

  navigator.mediaDevices
    .getUserMedia({
      audio: false,
      video: {
          facingMode: isMobile()
            ? "environment"
            : "user"
      }
     })
    .then(stream => {
       video.srcObject = stream;
       video.onloadedmetadata = () => {
         video.play();
       };
    });
}

function hasToSend(obj) {
  let matches = Object.keys(obj.detections);
  return matches.length > 0 &&
         obj.detections.hasOwnProperty("car");
}

var detectFrame = async (video, model,ctx, api_url) => {
  let predictions = await model.detect(video);
  let payload = predictions.reduce((old,cur,i,arr) => {
    if (!old.detections.hasOwnProperty(cur.class)) {
        old.detections[cur.class] = 0;
      }
      old.detections[cur.class] += 1;
      return old;
    },{
      timestamp : new Date().getTime(),
      detections : {}
  });

  renderPredictions(ctx,predictions);
  if (hasToSend(payload)) {
    let imgSrc = mycanvas.toDataURL('image/jpeg', 1.0);
    let res = await fetch(api_url, {
      method : "POST",
      headers : {
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify({
        ...payload,
        imgSrc : imgSrc
      })
    });
    console.log(res.status);
  }
  requestAnimationFrame(() => {
    detectFrame(video, model,ctx,api_url);
  });

}

var renderPredictions = (ctx,predictions) => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  // Font options.
  const font = "16px sans-serif";
  ctx.font = font;
  ctx.textBaseline = "top";
  ctx.drawImage(this.video,0, 0,ctx.canvas.width,ctx.canvas.height);

  predictions.forEach(prediction => {
    const x = prediction.bbox[0];
    const y = prediction.bbox[1];
    const width = prediction.bbox[2];
    const height = prediction.bbox[3];
    // Draw the bounding box.
    ctx.strokeStyle = "#00FFFF";
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, width, height);
    // Draw the label background.
    ctx.fillStyle = "#00FFFF";
    const textWidth = ctx.measureText(prediction.class).width;
    const textHeight = parseInt(font, 10); // base 10
    ctx.fillRect(x, y, textWidth + 4, textHeight + 4);

  });

  predictions.forEach(prediction => {
    const x = prediction.bbox[0];
    const y = prediction.bbox[1];
    // Draw the text last to ensure it's on top.
    ctx.fillStyle = "#000000";
    ctx.fillText(prediction.class, x, y);
  });
};

function sendPrediction(obj) {
  socket.send(obj);
}

async function predictWithCocoModel(video,ctx,soc){
  const model = await cocoSsd.load('lite_mobilenet_v2');
  video.addEventListener("playing", () => detectFrame(video,model,ctx,soc) , false);
  console.log('model loaded');
}
