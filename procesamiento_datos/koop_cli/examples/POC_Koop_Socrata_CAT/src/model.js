/*
  model.js

  This file is required. It must export a class with at least one public function called `getData`

  Documentation: https://koopjs.github.io/docs/usage/provider
*/

const _ = require('lodash')
const fetch = require('node-fetch')
const rewind = require('geojson-rewind');
const MAXRECORDCOUNT = process.env["MAXRECORDCOUNT"] || 2000;

function addOBJECTID (arr) {
  return arr.map((o,i) => {
    let ao = o;
    ao.properties["OBJECTID"] = ++i;
    return ao;
  });
}


function Model (koop) {}


/**
 * Get data from the remote API, translate to GeoJSON, send to callback
 * @param {object} req - Express request object
 * @param {function} callback - callback function
 */
Model.prototype.getData = async function (req, callback) {

  // 0. If there are some query params append them
  const socrataParams = Object.keys(req.query)
    .filter(k => k.startsWith("_"));

  var queryStr = socrataParams.length > 0
    ?    socrataParams.map(k => `$${k.replace(/_/, "")}=${/ /.test(req.query[k]) ? req.query[k].replace(/ /g, "+") : req.query[k]}`)
        .join("&")
    : "";

  // 1. URL hacia SOCRATA endPoint
  //const url = `https://${req.params.host}/resource/${req.params.id}.geojson${queryStr.length > 0 ? `?${queryStr}` : ""}`;
  const url = `https://${req.params.host}/resource/${req.params.id}.geojson?$limit=${MAXRECORDCOUNT}`;
  console.log(url);

  try {
    // 2. Make the request to the remote API
    const result = await fetch(url);

    const resultJSON = await result.json();
    // 3. Right-Hand Rule Fix
    const fixedGeojson = rewind(resultJSON, false);

    // 4. Delete geojson old-spec CRS property
    delete(fixedGeojson.crs);

    // 5. Build GeoJSON
    let metadata = {
      metadata : {
        maxRecordCount: req.query["_limit"] || MAXRECORDCOUNT,
        name : req.params.id,
        idField : "OBJECTID"
      }
    };

    if(fixedGeojson.features[0].geometry !== null) {
      metadata.metadata.geometryType = fixedGeojson.features[0].geometry.type;
    };

    let features = {
      features : addOBJECTID(fixedGeojson.features)
    }

    let type = {
      type : fixedGeojson.type
    }

    let geojson = {...type, ...metadata, ...features};

    // 6. Fire callback
    callback(null, geojson)
  } catch (err) {
    // 6. Handle any errors
    callback(err, null)
  }
}


module.exports = Model
