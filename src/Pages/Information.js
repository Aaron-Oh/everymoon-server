import {Text, View} from 'react-native'
import styled from 'styled-components/native'
import GoBack from '../Components/GoBack'
import RightImg from '../../assets/right.png'
import UnderImg from '../../assets/under.png'
import {useState} from 'react'

const Total = styled.ScrollView`
    background-color: #f1d5d4;
    flex: 1;
    padding-top: 50px;
`

const Contents = styled.View`
    margin-top: 60px;
    margin-bottom: 80px;
`
const Top = styled.Text`
    color: #294747;
    font-weight: 700;
    font-size: 40px;
    margin-left: 15px;
    margin-bottom: 16px;
`

const Box = styled.TouchableOpacity`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 26px 20px;
    width: 100%;
    /* height: 76px; */
    background: #f1d5d4;
    /* border: 1px solid #294747; */
`
const Dark = styled.TouchableOpacity`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    /* align-items: center; */
    padding: 26px 18px;
    width: 100%;
    /* height: 76px; */
    background: #e8c3c2;
    border: 1px solid #294747;
`

const BoxText = styled.Text`
    font-weight: 600;
    font-size: 20px;
    color: #294747;
`

const Detail = styled.Text`
    color: #294747;
    font-weight: 500;
    font-size: 25px;
    margin-left: 15px;
    margin-bottom: 36px;
`

const Right = styled.Image`
    width: 9px;
    height: 14px;
`
const Down = styled.Image`
    height: 9px;
    width: 14px;
`

const Explain = styled.Text`
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
    color: #294747;
    margin-top: 24px;
`
const Title = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

function Information({navigation}) {
    const [q1, setQ1] = useState(false)
    const [q2, setQ2] = useState(false)
    const [q3, setQ3] = useState(false)
    const [q4, setQ4] = useState(false)
    const [q5, setQ5] = useState(false)
    const [q6, setQ6] = useState(false)
    const [q7, setQ7] = useState(false)

    return (
        <Total>
            <GoBack navigation={navigation} />
            <Contents>
                <Top>월경용품 사용법을{'\n'}알려드릴게요.</Top>
                <Detail>궁금한 질문을 클릭하면{'\n'}자세한 내용이 나와요</Detail>
                <Dark
                    onPress={() => {
                        setQ1((prev) => !prev)
                    }}
                >
                    <Title>
                        <BoxText>Q. 월경용품이란 무엇인가요?</BoxText>
                        {q1 ? <Down source={UnderImg} /> : <Right source={RightImg} />}
                    </Title>
                    {q1 && (
                        <Explain>
                            월경용품은 여성이 생리 주기 동안 사용하는 제품으로 생리혈을 흡수하거나 붙잡아 놓는 역할을
                            합니다. 대표적인 월경용품으로는 생리대, 탐폰, 월경컵 등이 있습니다. 생리대는 일회용이나
                            재사용 가능한 제품으로 생리혈을 흡수합니다. 탐폰은 생리혈을 붙잡아 놓는 제품으로
                            일회용입니다. 월경컵은 실리콘이나 라텍스로 만들어져 생리혈을 붙잡아 놓는 제품으로 재사용
                            가능합니다.
                        </Explain>
                    )}
                </Dark>
                <Box
                    onPress={() => {
                        setQ2((prev) => !prev)
                    }}
                >
                    <Title>
                        <BoxText>Q. 생리란 무엇인가요?</BoxText>
                        {q2 ? <Down source={UnderImg} /> : <Right source={RightImg} />}
                    </Title>
                    {q2 && (
                        <Explain>
                            생리는 여성의 생식기관에서 매월 일어나는 과정으로, 자궁 내막이 축적된 후, 만일 임신하지
                            않았을 경우에는 자궁 내막이 탈락하여 생리혈이 나오는 과정입니다. 일반적으로 생리주기는
                            21일에서 35일 사이이며, 생리 기간은 보통 3일에서 7일까지 지속됩니다.
                        </Explain>
                    )}
                </Box>
                <Dark
                    onPress={() => {
                        setQ3((prev) => !prev)
                    }}
                >
                    <Title>
                        <BoxText>Q. 배란이란 무엇인가요?</BoxText>
                        {q3 ? <Down source={UnderImg} /> : <Right source={RightImg} />}
                    </Title>
                    {q3 && (
                        <Explain>
                            배란은 난소에서 약 28일마다 한쪽 난소에서 알이 방출되는 과정입니다. 이때, 방출된 알은
                            자궁으로 이동하여 정자와 만나면 임신이 시작됩니다. 여성의 생리주기와 같이 개인별로 차이가
                            있을 수 있으며, 일반적으로 한 달에 한 번 일어납니다.
                        </Explain>
                    )}
                </Dark>
                <Box
                    onPress={() => {
                        setQ4((prev) => !prev)
                    }}
                >
                    <Title>
                        <BoxText>Q. 가임기는 언제인가요?</BoxText>
                        {q4 ? <Down source={UnderImg} /> : <Right source={RightImg} />}
                    </Title>
                    {q4 && (
                        <Explain>
                            여성의 가임기는 배란이 일어나는 기간을 말합니다. 일반적으로 여성의 가임기는 생리 주기의
                            중간부터 다음 생리 시작 전까지의 기간으로 약 5~7일 정도입니다. 여성의 생리 주기는 여러
                            요인에 의해 영향을 받기 때문에, 개인마다 차이가 있을 수 있습니다. 따라서 여성은 생리 주기와
                            배란에 대해 자신의 몸을 관찰하고, 가임기를 예측하는 방법을 학습하는 것이 좋습니다. 이를 통해
                            임신을 원하는 시기에 임신 가능성이 높은 기간을 파악하여, 임신을 계획할 수 있습니다.
                        </Explain>
                    )}
                </Box>
                <Dark
                    onPress={() => {
                        setQ5((prev) => !prev)
                    }}
                >
                    <Title>
                        <BoxText>Q. 탐폰은 어떻게 착용 하나요?</BoxText>
                        {q5 ? <Down source={UnderImg} /> : <Right source={RightImg} />}
                    </Title>
                    {q5 && (
                        <Explain>
                            탐폰은 직접 질 내부에 삽입하여 사용합니다. 1. 삽입 준비 • 균이 질 내로 들어가지 않도록 손을
                            깨끗이 씻는다 • 포장을 뜯어 탐폰을 꺼낸다 2. 삽입 방법 • 엄지와 중지로 손잡이 부분을 꽉 잡고
                            검지는 내통 끝에 살짝 올려 삽입할 준비를 한다 • 변기에 걸터앉기, 서서 다리 벌리기, 한쪽
                            다리를 올리기 등 편한 자세를 찾는다 • 뒤쪽으로 조금 기울어진 질의 각도에 맞춰 비스듬히
                            탐폰을 삽입한다 3. 제거 방법 • 실을 앞쪽으로 당겨 탐폰을 제거한다
                        </Explain>
                    )}
                </Dark>
                <Box
                    onPress={() => {
                        setQ6((prev) => !prev)
                    }}
                >
                    <Title>
                        <BoxText>Q. 일반 생리대는 어떻게 착용 하나요?</BoxText>
                        {q6 ? <Down source={UnderImg} /> : <Right source={RightImg} />}
                    </Title>
                    {q6 && (
                        <Explain>
                            1. 개별 포장지를 뜯어, 생리대를 펼쳐요. 2. 생리대를 팬티에 붙여요. 3. 속옷을 감싸듯이 날개를
                            반대편으로 접어주고, 두 겹으로 된 위생팬티라면 날개를 안으로 넣어주면 돼요. 4. 3번에서
                            날개형 생리대는 날개와 팬티의 가장 좁은 부분을 맞춰 주세요.
                        </Explain>
                    )}
                </Box>
                <Dark
                    onPress={() => {
                        setQ7((prev) => !prev)
                    }}
                >
                    <Title>
                        <BoxText>Q. 생리컵은 어떻게 사용하나요?</BoxText>
                        {q7 ? <Down source={UnderImg} /> : <Right source={RightImg} />}
                    </Title>
                    {q7 && (
                        <Explain>
                            탐폰은 직접 질 내부에 삽입하여 사용합니다. 1. 생리컵 삽입 전에 손을 깨끗이 씻는다. 2. 쪼그려
                            앉거나 변기에 앉아 편안한 자세를 취한다. 3. 사용자가 이용하기 가장 편한 생리컵 접기를
                            선택하여 생리컵을 접는다. 4. 접은 상태를 유지하며 질 안으로 삽입한다.
                        </Explain>
                    )}
                </Dark>
            </Contents>
        </Total>
    )
}

export default Information
