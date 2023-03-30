const tf = require('@tensorflow/tfjs-node');

const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

// 모델 로드
async function loadModel() {
  const model = await tf.loadLayersModel('file://./tf_js/model.json');
  return model;
}

// 이미지 예측
async function predict(model, imagePath) {
  const image = await tf.node.decodeImage(tf.node.readFileSync(imagePath));
  const processedImage = image.expandDims(0).toFloat().div(tf.scalar(255));
  const prediction = await model.predict(processedImage).data();
  const classId = prediction.indexOf(Math.max(...prediction));
  const classNames = ['large', 'medium'];
  return classNames[classId];
}

// API 엔드포인트
app.get('/predict', async (req, res) => {
  try {
    const imagePath = req.query.image_path;
    const model = await loadModel();
    const prediction = await predict(model, imagePath);
    res.send(prediction);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error');
  }
});

// 서버 시작
app.listen(port, () => {
  console.log(`Server listening on port ${port}...`);
});

// 모델 언로드
process.on('SIGINT', () => {
  tf.tidy(() => model.dispose());
  console.log('model disposed.');
  process.exit();
});