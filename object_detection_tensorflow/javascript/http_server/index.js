const http = require('http');
const {promisify} = require('util');
const {img} = require('base64-img');
const convertToImg = promisify(img);

const IMG_FOLDER_PATH = `../inspeccion`;
function setDefaultRes(response){
  // CORS
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Request-Method', '*');
  response.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
  response.setHeader('Access-Control-Allow-Headers', '*');

  response.writeHead(200, {
    'Content-Type': 'application/json',
  });
}

let server = http.createServer(function(req, res) {
  setDefaultRes(res);
  if (req.method == 'POST') {
    var body = '';
    req.on('data', function(data) {
      body += data;
    });
    req.on('end', async function() {
      try {
        let {imgSrc,detections} = JSON.parse(body);
        console.log(detections);
        let filename = `inspeccion_${new Date().getTime()}`;
        await convertToImg(imgSrc, IMG_FOLDER_PATH, filename)
          .then((filepath) => console.log(`Written in [${filepath}]`))
          .catch((err) => console.log(`Error saving file : [${err}]`))


        res.end(JSON.stringify({
          status : "ok",
          message : "Image saved"
        }));
      } catch(err) {
        res.writeHead(500, {
          'Content-Type': 'application/json',
        });
        res.end(JSON.stringify({
          status: "error",
          message : "Unable to process image"
        }));
      }
    })
  }
  res.end()
}).listen(8000);
