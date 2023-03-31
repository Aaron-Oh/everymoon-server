const express = require('express');
const tf = require('@tensorflow/tfjs-node');
const cors = require('cors');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const { createCanvas, loadImage } = require('canvas');

const app = express();
app.use(cors());

const port = process.env.PORT || 8080;

app.get('/', (req, res) => {
  res.send('Hello from TensorFlow.js Node.js server');
});

function loadImage(buffer) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = buffer;
  });
}

async function resizeImage(buffer, width, height) {
  const image = await loadImage(buffer);
  console.log(`img is well loaded`);
  const canvas = createCanvas(width, height);
  console.log(`canvas is successfully assigned`);
  const ctx = canvas.getContext('2d');
  console.log(`ctx is well defined`);
  ctx.drawImage(image, 0, 0, width, height);
  console.log(`draw img is well defined`);
  return canvas.toBuffer('image/jpeg');
}

app.post('/predict', upload.single('image'), async (req, res) => {
  try {
    // 요청에 대한 정보를 로그로 출력
    console.log('Received POST request at /predict with image:', req.file.originalname);
    const model = await tf.loadGraphModel('file://./tf_js/model.json');
    console.log(`Model is well defined`);
    const imageBuffer = await resizeImage(req.file.buffer, 224, 224);
    console.log(`imageBuffer is well defined`);
    const decodedImage = tf.node.decodeImage(imageBuffer);
    console.log(`decodedImage is well defined`);
    const castedImg = decodedImage.cast('float32');
    console.log(`castedImg is well defined`);
    const expandedImg = castedImg.expandDims(0);
    console.log(`expandedImg is well defined`);
    const prediction = await model.predict(expandedImg).data();
    console.log(`prediction is well defined`);
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
