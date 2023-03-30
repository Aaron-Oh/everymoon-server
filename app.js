const express = require('express');
const tf = require('@tensorflow/tfjs-node');
const multer = require('multer');

const app = express();
const port = 8080;

// 모델 로드
async function loadModel() {
    const model = await tf.loadGraphModel('file:./tf_js/model.json');
    return model;
  }
// 이미지 처리 및 예측
const upload = multer().single('image');
app.post('/predict', upload, async (req, res) => {
  const img = tf.node.decodeImage(req.file.buffer);
  const prediction = model.predict(img);
  const result = prediction.dataSync();
  res.json(result);
});

// 서버 시작
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});