const express = require('express');
const cors = require('cors');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const tf = require('@tensorflow/tfjs-node');
const sharp = require('sharp');

const app = express();
app.use(cors());

const port = process.env.PORT || 8080;

app.get('/', (req, res) => {
  res.send('Hello from TensorFlow.js Node.js server');
});

async function resizeImage(buffer, width, height) {
  const tfimage = tf.node.decodeImage(buffer);
  const tfresized = tf.image.resizeBilinear(tfimage, [width, height]);
  return tfresized;
}

app.post('/predict', upload.single('image'), async (req, res) => {
  try {
    // 요청에 대한 정보를 로그로 출력
    console.log('Received POST request at /predict with image:', req.file.originalname);

    // 파일 버퍼를 리사이즈하여 이미지 데이터 생성
    const resizedImage = await resizeImage(req.file.buffer, 224, 224);
    const castedImage = resizedImage.cast('float32');
    const expandedImage = castedImage.expandDims(0);
    const normalizedImage = expandedImage.div(255);

    // 모델 로드 및 예측
    const model = await tf.loadGraphModel('file://./tf_js/model.json');
    const prediction = await model.predict(normalizedImage).data();
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