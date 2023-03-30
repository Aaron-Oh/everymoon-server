const express = require('express');
const tf = require('@tensorflow/tfjs-node');
const multer = require('multer');
const upload = multer();
const app = express();

// 모델 로딩
const model = await tf.loadLayersModel('file://./tf_js/model.json');

// POST /predict 요청 처리
app.post('/predict', upload.single('image'), async (req, res) => {
  try {
    // 요청으로부터 이미지 데이터 추출
    const imgData = req.file.buffer;

    // 이미지를 텐서로 변환
    const tensor = tf.node.decodeImage(imgData);

    // 이미지 크기 조정 및 정규화
    const resized = tf.image.resizeBilinear(tensor, [224, 224]).div(255);

    // 모델에 이미지를 입력하여 예측 수행
    const output = model.predict(resized);

    // 예측 결과 추출 및 응답 전송
    const predictions = output.arraySync()[0];
    const prediction = predictions.indexOf(Math.max(...predictions));

    res.json({
      result: (prediction === 0) ? 'medium' : 'large'
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// 서버 구동
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});