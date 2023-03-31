import {useState} from 'react'
import {Text, View, SafeAreaView, TouchableOpacity, Image, Button} from 'react-native'
import styled from 'styled-components/native'
import Yes from '../../assets/agreeClicked.png'
import No from '../../assets/agreeUnclicked.png'

const Total = styled.SafeAreaView`
    background-color: #f1d5d4;
    flex: 1;
`

const Title = styled.Text`
    font-weight: 700;
    font-size: 40px;
    color: #294747;
    margin-top: 90px;
    margin-left: 30px;
`

const Contents = styled.View`
    margin-left: 30px;
    margin-right: 30px;
    margin-top: 46px;
`

const Lines = styled.View``

const Line = styled.TouchableOpacity`
    display: flex;
    flex-direction: row;
    margin-right: 30px;
    margin-bottom: 24px;
`

const LineText = styled.Text`
    color: #294747;
    font-weight: 400;
    font-size: 20px;
    line-height: 23.87px;
`
const Img = styled.Image`
    width: 20px;
    height: 20px;
    margin-right: 20px;
    margin-top: 3.5px;
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
    position: absolute;
    top: 300px;
`

const NoClickBtn = styled.View`
    width: 100%;
    height: 61px;
    background: #022e2e80;

    border-radius: 15px;
    display: flex;
    justify-content: center;
    text-align: center;
    align-items: center;
    position: absolute;
    top: 300px;
`

const BtnText = styled.Text`
    color: #ffffff;
    font-weight: 400;
    font-size: 24px;
`

const AllAgree = styled.Text`
    color: #294747;
    font-weight: 700;
    font-size: 20px;
    text-align: center;
    margin-top: 46px;
`

const BtnBox = styled.View`
    margin-left: 30px;
    margin-right: 30px;
`

function Agree({navigation}) {
    const [agree1, setAgree1] = useState(false)
    const [agree2, setAgree2] = useState(false)

    return (
        <Total>
            <Title>개인정보중시 </Title>
            <Contents>
                <Lines>
                    <Line
                        activeOpacity={1}
                        onPressOut={() => {
                            setAgree1((prev) => !prev)
                        }}
                    >
                        {agree1 ? <Img source={Yes} /> : <Img source={No} />}
                        <LineText>
                            Everymoon 앱 기능을 제공할 목적으로 개인 건강 데이터를 처리하는 데 동의합니다. 자세한 내용은
                            개인 정보 보호 정책을 참조하십시오.
                        </LineText>
                    </Line>

                    <Line
                        activeOpacity={1}
                        onPressOut={() => {
                            setAgree2((prev) => !prev)
                        }}
                    >
                        {agree2 ? <Img source={Yes} /> : <Img source={No} />}
                        <LineText>개인 정보 보호 정책과 이용 약관에 동의합니다.</LineText>
                    </Line>
                </Lines>
                {agree1 && agree2 ? null : (
                    <TouchableOpacity
                        onPressOut={() => {
                            setAgree1(true)
                            setAgree2(true)
                        }}
                    >
                        <AllAgree>모두 동의</AllAgree>
                    </TouchableOpacity>
                )}
                {agree1 && agree2 ? (
                    <Btn
                        onPress={() => {
                            navigation.replace('Start')
                        }}
                    >
                        <BtnText>다음</BtnText>
                    </Btn>
                ) : (
                    <NoClickBtn>
                        <BtnText>다음</BtnText>
                    </NoClickBtn>
                )}
            </Contents>
        </Total>
    )
}

export default Agree
