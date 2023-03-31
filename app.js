const express = require('express');
const tf = require('@tensorflow/tfjs-node');
const cors = require('cors');
const multer = require('multer');

const app = express();
app.use(cors());

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const port = process.env.PORT || 8080;

app.get('/', (req, res) => {
  res.send('Hello from TensorFlow.js Node.js server');
});

app.post('/predict', upload.single('image'), async (req, res) => {
  try {
    const model = await tf.loadGraphModel('file://./tf_js/model.json');

    const imageBuffer = req.file.buffer;
    const decodedImage = tf.node.decodeImage(imageBuffer);
    const resizedImage = await sharp(decodedImage.data)
    .resize(224, 224)
    .toBuffer();
    const castedImg = decodedImage(resizedImage).cast('float32');
    const expandedImg = castedImg.expandDims(0);
    const prediction = await model.predict(expandedImg).data();
    const result = prediction[0] > 0.5 ? 'large' : 'medium';

    res.json({ result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});