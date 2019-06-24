const socket = new WebSocket('wss://1c6d0cab.ngrok.io');

function webcam_init(video) {
  navigator.mediaDevices
    .getUserMedia({
      audio: false,
      video: {
          facingMode: "user",
      }
     })
    .then(stream => {
       video.srcObject = stream;
       video.onloadedmetadata = () => {
         video.play();
       };
    });
}

var detectFrame = (video, model,ctx) => {
  model.detect(video).then(predictions => {
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
    socket.send(JSON.stringify(payload));
    renderPredictions(ctx,predictions);
    requestAnimationFrame(() => {
      detectFrame(video, model,ctx);
    });
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

async function predictWithCocoModel(video,ctx){
  const model = await cocoSsd.load('lite_mobilenet_v2');
  detectFrame(video,model,ctx);
  console.log('model loaded');
}
