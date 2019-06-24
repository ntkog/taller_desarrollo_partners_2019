/*
  model.js

  This file is required. It must export a class with at least one public function called `getData`

  Documentation: http://koopjs.github.io/docs/usage/provider
*/
const request = require('request').defaults({gzip: true, json: true})
const config = require('config');
var GIS_MODEL = require('./acometidas.json');

function Model (koop) {}

// Public function to return data from the
// Return: GeoJSON FeatureCollection
//
// Config parameters (config/default.json)
// req.
//
// URL path parameters:
// req.params.host (if index.js:hosts true)
// req.params.id  (if index.js:disableIdParam false)
// req.params.layer
// req.params.method
const NOW_ERP_FAKE_URL = "https://demoerp-lanswysvme.now.sh";

Model.prototype.getData = function (req, callback) {

  request(`${NOW_ERP_FAKE_URL}/cups${req.query.group ? `?group=${req.query.group}` : ''}`, (err, res, body) => {
    if (err) return callback(err)

    var geojson = match_properties(GIS_MODEL,body,"group",req.query.group || "ALL");
    if (geojson) {
      geojson.metadata = {
        title: 'Koop ERP Provider',
        description: `Test`,
        idField : "OBJECTID"
      }
      callback(null, geojson)
    } else {
      callback({ "error" : `No results for ${req.query.group || ""}`}, null);
    }

  })
}

function match_properties (gis, baseObj, key, val) {
  let geojson = {
    "type": "FeatureCollection",
    "features": []
  };
  let candidates = val === "ALL"
    ? gis.features
    : gis.features.filter(el => el.properties[key] === val);
  if (candidates.length > 0) {
    candidates.map((feature,i) => geojson.features.push({
      "type" : feature.type,
      "geometry" : feature.geometry,
      "properties" : baseObj[i]
    }));

  }

  return geojson.features.length > 0
    ? geojson
    : null;
}



module.exports = Model
