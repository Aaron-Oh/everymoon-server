import styled from 'styled-components/native'
import DatePickerModal from 'react-native-modal-datetime-picker'
import {useState} from 'react'
import {addDays, differenceInDays, format, getDate, getMonth, getYear} from 'date-fns'
import GoBack from '../Components/GoBack'

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

function Symptom({navigation}) {
    const [bodyFeeling, setBodyFeeling] = useState(false)
    const [texture, setTexture] = useState(false)
    const [blood, setBlood] = useState(false)

    const onPressBtn = () => {
        if (bodyFeeling) {
            return navigation.push('Body')
        } else if (texture) {
            return navigation.push('Texture')
        } else {
            return navigation.push('Blood')
        }
    }

    return (
        <Total>
            <GoBack navigation={navigation} />
            <Contents>
                <Top>추가하고 싶은{'\n'}정보를 선택해주세요.</Top>
                {bodyFeeling ? (
                    <After
                        onPress={() => {
                            setTexture(false)
                            setBlood(false)
                            setBodyFeeling((prev) => !prev)
                        }}
                    >
                        <AfterText>몸 상태 및 기분</AfterText>
                    </After>
                ) : (
                    <Before
                        onPress={() => {
                            setTexture(false)
                            setBlood(false)
                            setBodyFeeling((prev) => !prev)
                        }}
                    >
                        <BeforeText>몸 상태 및 기분</BeforeText>
                    </Before>
                )}
                {texture ? (
                    <After
                        onPress={() => {
                            setBodyFeeling(false)
                            setBlood(false)
                            setTexture((prev) => !prev)
                        }}
                    >
                        <AfterText>질 분비물</AfterText>
                    </After>
                ) : (
                    <Before
                        onPress={() => {
                            setBodyFeeling(false)
                            setBlood(false)
                            setTexture((prev) => !prev)
                        }}
                    >
                        <BeforeText>질 분비물</BeforeText>
                    </Before>
                )}
                {blood ? (
                    <After
                        onPress={() => {
                            setBodyFeeling(false)
                            setTexture(false)
                            setBlood((prev) => !prev)
                        }}
                    >
                        <AfterText>부정출혈</AfterText>
                    </After>
                ) : (
                    <Before
                        onPress={() => {
                            setBodyFeeling(false)
                            setTexture(false)
                            setBlood((prev) => !prev)
                        }}
                    >
                        <BeforeText>부정출혈</BeforeText>
                    </Before>
                )}
                {bodyFeeling || texture || blood ? (
                    <Btn onPress={() => onPressBtn()}>
                        <BtnText>선택했어요</BtnText>
                    </Btn>
                ) : (
                    <Btn2>
                        <BtnText>선택했어요</BtnText>
                    </Btn2>
                )}
            </Contents>
        </Total>
    )
}

export default Symptom
