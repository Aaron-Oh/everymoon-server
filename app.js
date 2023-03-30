const express = require('express');
const tf = require('@tensorflow/tfjs-node');
const path = require('path');

const app = express();
const port = 8080;

const modelPath = path.join(__dirname, 'tf_js', 'model.json');

async function loadModel() {
  const model = await tf.loadLayersModel(`file://${modelPath}`);
  console.log('model loaded');
  return model;
}

let modelPromise = null;

app.get('/', async (req, res) => {
  if (!modelPromise) {
    modelPromise = loadModel();
  }

  try {
    const model = await modelPromise;
    const input = tf.ones([1, 224, 224, 3]);
    const prediction = model.predict(input);
    const output = prediction.dataSync();
    const result = output[0] > output[1] ? 'large' : 'medium';
    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}...`);
});