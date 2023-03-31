const express = require('express');
const tf = require('@tensorflow/tfjs-node');
const cors = require('cors');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const jpeg = require('jpeg-js');

const app = express();
app.use(cors());

const port = process.env.PORT || 8080;

app.get('/', (req, res) => {
  res.send('Hello from TensorFlow.js Node.js server');
});

async function resizeImage(buffer, width, height) {
  const rawImageData = jpeg.decode(buffer);
  console.log(`1`);
  const pixels = tf.tensor3d(rawImageData.data, [rawImageData.height, rawImageData.width, 4], 'int32');
  console.log(`2`);
  const image = tf.image.resizeBilinear(pixels, [width, height]);
  console.log(`3`);
  const bufferResult = await tf.node.encodeJpeg(image);
  console.log(`4`);
  return bufferResult;
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