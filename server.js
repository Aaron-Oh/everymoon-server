const express = require('express');
const bodyParser = require('body-parser');
const tf = require('@tensorflow/tfjs-node');
const app = express();

// 모델 로드
async function loadModel() {
    const model = await tf.loadGraphModel('file:/Users/jay/Desktop/code/JS/nodejs/tf_js/model.json');
    return model;
  }
                                                                                                                                                
// 요청 본문 파싱
app.use(bodyParser.json());

// POST /predict 요청 핸들러
app.post('/predict', async (req, res) => {
//요청 받은 후 모델 로드 
  const model = await loadModel();
  const imageBuffer = Buffer.from(req.body.image, 'base64');
  const image = tf.node.decodeImage(imageBuffer);

  // 이미지 전처리
  const preprocessedImage = preprocessImage(image);

  // 예측
  const predictions = model.predict(preprocessedImage);

  // 예측 결과 전송
  res.json({ predictions: predictions.arraySync() });
});

// 서버 시작
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

// 이미지 전처리 함수
function preprocessImage(image) {
  const resizedImage = tf.image.resizeBilinear(image, [224, 224]);
  const normalizedImage = resizedImage.div(255.0);
  const batchedImage = normalizedImage.expandDims(0);
  return batchedImage;
}