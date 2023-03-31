import styled from 'styled-components/native'
import {useEffect, useState} from 'react'
import DatePickerModal from 'react-native-modal-datetime-picker'
import {addDays, differenceInDays, format, getDate, getMonth, getYear} from 'date-fns'
import AsyncStorage from '@react-native-async-storage/async-storage'

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

const Middle = styled.Text`
    color: #294747;
    font-weight: 700;
    font-size: 30px;
    margin-top: 18px;
`
const PressCustom = styled.TouchableOpacity`
    width: 100%;
    height: 61px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 3px solid #294747;
    border-radius: 15px;
    margin-top: 18px;
`

const DateText = styled.Text`
    color: #294747;
    font-weight: 400;
    font-size: 24px;
`

function Before({navigation}) {
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(startDate)
    const [visible, setVisible] = useState(false)
    const [visible2, setVisible2] = useState(false)
    const [currentData, setCurrentData] = useState()
    const onPressDate = () => {
        setVisible(true)
    }

    const onPressDate2 = () => {
        setVisible2(true)
    }

    const onCancel = () => {
        setVisible(false)
    }

    const onCancel2 = () => {
        setVisible2(false)
    }

    const handleSubmit = async () => {
        try {
            const newData = [{year: getYear(startDate), month: getMonth(startDate) + 1, date: getDate(startDate)}]
            const addingData = [...currentData, ...newData]
            await AsyncStorage.setItem('periodData', JSON.stringify(addingData))
        } catch (e) {
            console.log('error : ', e)
        }
    }

    useEffect(() => {
        const getPeriodData = async () => {
            try {
                const storageData = JSON.parse(await AsyncStorage.getItem('periodData'))
                if (storageData) {
                    console.log('heyheyhey : ', storageData)
                    setCurrentData(storageData)
                }
            } catch (e) {
                console.log(e)
            }
        }
        getPeriodData()
    }, [])
    return (
        <Total>
            <Contents>
                <Top>이전 월경 날짜를{'\n'}입력해주세요.</Top>
                <Middle>월경 시작</Middle>
                <PressCustom onPress={onPressDate}>
                    <DateText>{format(startDate, 'yyyy / MM / dd')} </DateText>
                </PressCustom>
                <DatePickerModal
                    isVisible={visible}
                    onConfirm={(d) => {
                        setVisible(false)
                        setStartDate(d)
                        setEndDate(addDays(d, 5))
                    }}
                    onCancel={onCancel}
                    date={startDate}
                    textColor="black"
                    locale="ko"
                />
                <Middle>월경 끝</Middle>
                <PressCustom onPress={onPressDate2}>
                    <DateText>{format(endDate, 'yyyy / MM / dd')} </DateText>
                </PressCustom>
                <DatePickerModal
                    isVisible={visible2}
                    onConfirm={(d2) => {
                        setVisible2(false)
                        setEndDate(d2)
                    }}
                    onCancel={onCancel2}
                    date={endDate}
                    textColor="black"
                    locale="ko"
                />
                <Btn
                    onPress={() => {
                        handleSubmit()
                        navigation.replace('Last')
                    }}
                >
                    <BtnText>입력했어요</BtnText>
                </Btn>
            </Contents>
        </Total>
    )
}

export default Before
