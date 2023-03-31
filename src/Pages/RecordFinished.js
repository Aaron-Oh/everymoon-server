import styled from 'styled-components/native'
import DatePickerModal from 'react-native-modal-datetime-picker'
import {useState} from 'react'
import {addDays, differenceInDays, format, getDate, getMonth, getYear} from 'date-fns'

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

function RecordFinished({navigation}) {
    return (
        <Total>
            <Contents>
                <Top>기록 완료!</Top>
                <Btn
                    onPress={() => {
                        navigation.replace('Main')
                    }}
                >
                    <BtnText>처음으로 돌아가기</BtnText>
                </Btn>
            </Contents>
        </Total>
    )
}

export default RecordFinished
