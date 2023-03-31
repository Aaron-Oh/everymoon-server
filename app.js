const express = require('express');
const tf = require('@tensorflow/tfjs-node');
const cors = require('cors');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const app = express();
app.use(cors());

const port = process.env.PORT || 8080;

app.get('/', (req, res) => {
  res.send('Hello from TensorFlow.js Node.js server');
});

async function resizeImage(buffer, width, height) {
  const decodedImage = tf.node.decodeImage(buffer);
  const resizedImage = tf.image.resizeBilinear(decodedImage, [width, height]);
  const castedImg = resizedImage.cast('float32');
  const expandedImg = castedImg.expandDims(0);
  const imgData = await expandedImg.data();
  return Buffer.from(imgData);
}

app.post('/predict', upload.single('image'), async (req, res) => {
  try {
    // 요청에 대한 정보를 로그로 출력
    console.log('Received POST request at /predict with image:', req.file.originalname);

    const model = await tf.loadGraphModel('file://./tf_js/model.json');
    const imageBuffer = await resizeImage(req.file.buffer, 224, 224);
    const prediction = await model.predict(tf.tensor(imageBuffer)).data();
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
