const tf = require('@tensorflow/tfjs-node');
const express = require('express');
const multer = require('multer');
const IMAGE_SIZE = 224;

// 모델 로드
async function loadModel() {
    const model = await tf.loadLayersModel('file:./tf_js/model.json');
    return model;
  }

// 서버 시작
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 이미지 처리 및 예측
const upload = multer().single('image');

app.post('/predict', upload, async (req, res) => {
  const model = await loadModel();
  const img = tf.node.decodeImage(req.file.buffer);
  const resized = tf.image.resizeBilinear(img, [IMAGE_SIZE, IMAGE_SIZE]);
  const expanded = tf.expandDims(resized, 0);
  const prediction = model.predict(expanded);
  const result = prediction.dataSync();
  res.json(result);
});

// 서버 포트 열기
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});