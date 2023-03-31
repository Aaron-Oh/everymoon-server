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
  try {
    const image = tf.node.decodeImage(buffer);
    const resizedImage = tf.image.resizeBilinear(image, [width, height]);
    const castedImg = resizedImage.cast('float32');
    const expandedImg = castedImg.expandDims(0);
    const prediction = await model.predict(expandedImg).data();
    const result = prediction[0] > 0.5 ? 'large' : 'medium';
    return result;
  } catch (error) {
    console.error(error);
    throw new Error('Invalid image file');
  }
}

app.post('/predict', upload.single('image'), async (req, res) => {
  try {
    console.log('Received POST request at /predict with image:', req.file.originalname);

    const model = await tf.loadGraphModel('file://./tf_js/model.json');

    const imageBuffer = req.file.buffer;

    // Check if image is valid JPEG image
    const decodedImage = jpeg.decode(imageBuffer, { toRaw: true });
    if (decodedImage.data.byteLength === 0) {
      throw new Error('Invalid image file');
    }

    const result = await resizeImage(imageBuffer, 224, 224);

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
