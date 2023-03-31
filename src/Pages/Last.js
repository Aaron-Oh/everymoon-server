import {useState} from 'react'
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
    margin-top: 8px;
`

const Btn2 = styled.View`
    width: 100%;
    height: 61px;
    background: rgba(2, 46, 46, 0.5);
    border-radius: 15px;
    display: flex;
    justify-content: center;
    text-align: center;
    align-items: center;
    margin-top: 8px;
`

const BtnText = styled.Text`
    color: #ffffff;
    font-weight: 400;
    font-size: 24px;
`

const Before = styled.TouchableOpacity`
    height: 61px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border: 3px solid #294747;
    border-radius: 15px;
    margin-bottom: 16px;
`

const BeforeText = styled.Text`
    font-weight: 400;
    font-size: 24px;
    color: #294747;
`

const After = styled.TouchableOpacity`
    height: 61px;
    width: 100%;
    background: rgba(2, 46, 46, 0.7);
    border-radius: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 16px;
`

const AfterText = styled.Text`
    color: #ffffff;
    font-weight: 400;
    font-size: 24px;
`

function Last({navigation}) {
    const [clicked, setClicked] = useState(false)
    const [clicked2, setClicked2] = useState(false)
    const [clicked3, setClicked3] = useState(false)
    const [clicked4, setClicked4] = useState(false)
    const [clicked5, setClicked5] = useState(false)

    return (
        <Total>
            <Contents>
                <Top>
                    마지막으로,{'\n'}월경 시 증상을{'\n'}입력해주세요.
                </Top>
                {clicked ? (
                    <After
                        onPressOut={() => {
                            setClicked((prev) => !prev)
                        }}
                        activeOpacity={1}
                    >
                        <AfterText>경련통</AfterText>
                    </After>
                ) : (
                    <Before
                        onPressOut={() => {
                            setClicked((prev) => !prev)
                        }}
                        activeOpacity={1}
                    >
                        <BeforeText>경련통</BeforeText>
                    </Before>
                )}
                {clicked2 ? (
                    <After
                        onPressOut={() => {
                            setClicked2((prev) => !prev)
                        }}
                        activeOpacity={1}
                    >
                        <AfterText>특이한 분비물</AfterText>
                    </After>
                ) : (
                    <Before
                        onPressOut={() => {
                            setClicked2((prev) => !prev)
                        }}
                        activeOpacity={1}
                    >
                        <BeforeText>특이한 분비물</BeforeText>
                    </Before>
                )}
                {clicked3 ? (
                    <After
                        onPressOut={() => {
                            setClicked3((prev) => !prev)
                        }}
                        activeOpacity={1}
                    >
                        <AfterText>많은 생리 양</AfterText>
                    </After>
                ) : (
                    <Before
                        onPressOut={() => {
                            setClicked3((prev) => !prev)
                        }}
                        activeOpacity={1}
                    >
                        <BeforeText>많은 생리 양</BeforeText>
                    </Before>
                )}
                {clicked4 ? (
                    <After
                        onPressOut={() => {
                            setClicked4((prev) => !prev)
                        }}
                        activeOpacity={1}
                    >
                        <AfterText>너무 변덕스러움</AfterText>
                    </After>
                ) : (
                    <Before
                        onPressOut={() => {
                            setClicked4((prev) => !prev)
                        }}
                        activeOpacity={1}
                    >
                        <BeforeText>너무 변덕스러움</BeforeText>
                    </Before>
                )}
                {clicked5 ? (
                    <After
                        onPressOut={() => {
                            setClicked5((prev) => !prev)
                        }}
                        activeOpacity={1}
                    >
                        <AfterText>이상 증상 없음</AfterText>
                    </After>
                ) : (
                    <Before
                        onPressOut={() => {
                            setClicked5((prev) => !prev)
                        }}
                        activeOpacity={1}
                    >
                        <BeforeText>이상 증상 없음</BeforeText>
                    </Before>
                )}
                {clicked || clicked2 || clicked3 || clicked4 || clicked5 ? (
                    <Btn
                        onPressOut={() => {
                            navigation.replace('Finished')
                        }}
                    >
                        <BtnText>입력했어요</BtnText>
                    </Btn>
                ) : (
                    <Btn2>
                        <BtnText>입력했어요</BtnText>
                    </Btn2>
                )}
            </Contents>
        </Total>
    )
}

export default Last
