const express = require('express');
const tf = require('@tensorflow/tfjs-node');
const cors = require('cors');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const jpeg = require('jpeg-js');
const { createCanvas, loadImage } = require('canvas');

const app = express();
app.use(cors());

const port = process.env.PORT || 8080;

app.get('/', (req, res) => {
  res.send('Hello from TensorFlow.js Node.js server');
});

async function resizeImage(buffer, width, height) {
  const imgData = jpeg.decode(buffer);
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');
  const img = await loadImage(imgData.data);
  ctx.drawImage(img, 0, 0, width, height);
  return canvas.toBuffer('image/jpeg');
}

app.post('/predict', upload.single('image'), async (req, res) => {
  try {
    console.log('Received POST request at /predict with image:', req.file.originalname);
    const model = await tf.loadGraphModel('file://./tf_js/model.json');
    const imageBuffer = await resizeImage(req.file.buffer, 224, 224);
    const decodedImage = tf.node.decodeImage(imageBuffer);
    const castedImg = decodedImage.cast('float32');
    const expandedImg = castedImg.expandDims(0);
    const prediction = await model.predict(expandedImg).data();
    const result = prediction[0] > 0.5 ? 'large' : 'medium';
    console.log(`Prediction result: ${result}`);
    res.json({ result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
