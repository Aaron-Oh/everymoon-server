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

const PressCustom = styled.TouchableOpacity`
    width: 100%;
    height: 61px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 3px solid #294747;
    border-radius: 15px;
`

const DateText = styled.Text`
    color: #294747;
    font-weight: 400;
    font-size: 24px;
`

function Birth({navigation}) {
    const [birthday, setBirthDay] = useState(new Date('2000-01-01'))
    const [visible, setVisible] = useState(false)

    const onPressDate = () => {
        setVisible(true)
    }

    const onCancel = () => {
        setVisible(false)
    }

    return (
        <Total>
            <Contents>
                <Top>
                    첫째, {'\n'}생년 월일을{'\n'}입력해주세요.
                </Top>
                <PressCustom onPress={onPressDate}>
                    <DateText>{format(birthday, 'yyyy / MM / dd')} </DateText>
                </PressCustom>
                <DatePickerModal
                    isVisible={visible}
                    onConfirm={(d) => {
                        setVisible(false)
                        setBirthDay(d)
                    }}
                    onCancel={onCancel}
                    date={birthday}
                    textColor="black"
                    locale="ko"
                />

                <Btn
                    onPress={() => {
                        navigation.push('Recent')
                    }}
                >
                    <BtnText>입력했어요</BtnText>
                </Btn>
            </Contents>
        </Total>
    )
}

export default Birth
