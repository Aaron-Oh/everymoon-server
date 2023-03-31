import {Text, View} from 'react-native'
import styled from 'styled-components/native'

const Total = styled.SafeAreaView`
    background-color: #f1d5d4;
    flex: 1;
`

const Contents = styled.View`
    margin-left: 15px;
    margin-right: 15px;
    margin-top: 90px;
`
const Top = styled.Text`
    color: #294747;
    font-weight: 700;
    font-size: 40px;
    margin-bottom: 46px;
`

const Btn = styled.TouchableOpacity`
    width: 100%;
    height: 61px;
    background: #294747;
    border-radius: 15px;
    display: flex;
    justify-content: center;
    text-align: center;
    align-items: center;
    margin-top: 18px;
`

const BtnText = styled.Text`
    color: #ffffff;
    font-weight: 400;
    font-size: 24px;
`

const Block = styled.View`
    width: 100%;
    height: 46px;
`

function Main({navigation}) {
    return (
        <Total>
            <Contents>
                <Top>
                    당신의 월경권,{'\n'}이젠 에브리문이{'\n'}보장할게요.
                </Top>
                <Btn
                    onPressOut={() => {
                        navigation.push('Calendar')
                    }}
                >
                    <BtnText>월경 달력 확인</BtnText>
                </Btn>
                <Btn
                    onPressOut={() => {
                        navigation.push('MyCamera')
                    }}
                >
                    <BtnText>생리대 카메라 스캔</BtnText>
                </Btn>
                <Btn>
                    <BtnText>월경 주기 알람 설정</BtnText>
                </Btn>
                <Btn
                    onPress={() => {
                        navigation.push('Information')
                    }}
                >
                    <BtnText>생리대 사용법</BtnText>
                </Btn>
            </Contents>
        </Total>
    )
}

export default Main
