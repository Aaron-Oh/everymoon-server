import AsyncStorage from '@react-native-async-storage/async-storage'
import {format, getMonth, getDate, differenceInDays, add, isBefore, addDays} from 'date-fns'
import {useEffect, useState} from 'react'
import {Text, View} from 'react-native'
import styled from 'styled-components/native'
import GoBack from '../Components/GoBack'

const Total = styled.SafeAreaView`
    background-color: #f1d5d4;
    flex: 1;
`

const Contents = styled.View`
    margin-left: 15px;
    margin-right: 15px;
    margin-top: 60px;
`
const Top = styled.Text`
    color: #294747;
    font-weight: 700;
    font-size: 40px;
    margin-bottom: 50px;
`

const RealTop = styled.Text`
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
    margin-bottom: 50px;
`
const Top2 = styled.Text`
    color: #294747;
    font-weight: 700;
    font-size: 40px;
    margin-bottom: 20px;
`

function Calendar({navigation}) {
    let date = new Date()
    const nowMonth = getMonth(date)
    const nowDay = getDate(date)
    const [periodDuration, setPeriodDuration] = useState(null)
    const [expectation, setExpectation] = useState()
    const [mostRecent, setMostRecent] = useState()

    useEffect(() => {
        const getPeriodData = async () => {
            try {
                const storageData = JSON.parse(await AsyncStorage.getItem('periodData'))
                const durationData = JSON.parse(await AsyncStorage.getItem('durationData'))
                if (storageData.length >= 2) {
                    // console.log('hey get the data! ', storageData)
                    // console.log('my duration is : ', durationData)
                    const {date: date1, month: month1, year: year1} = storageData[0]
                    const {date: date2, month: month2, year: year2} = storageData[1]
                    const recentData = new Date(`${year1}-${month1}-${date1}`)
                    const recentData2 = new Date(`${year2}-${month2}-${date2}`)
                    setMostRecent(recentData)
                    setPeriodDuration(durationData)
                    setExpectation(addDays(recentData, differenceInDays(recentData, recentData2)))
                }
            } catch (e) {
                console.log(e)
            }
        }
        getPeriodData()
    }, [])
    console.log('가장 최근 생리 : ', mostRecent)
    console.log('today : ', date)
    console.log('생리 기간 : ', periodDuration)
    console.log('예상 다음 생리 날짜 : ', expectation)
    console.log('날짜 차이 : ', differenceInDays(date, mostRecent))
    console.log('nyang : ', differenceInDays(expectation, date))

    return (
        <Total>
            <GoBack navigation={navigation} />
            <Contents>
                <RealTop>
                    {nowMonth + 1}월 {nowDay}일, 오늘
                </RealTop>
                {differenceInDays(date, mostRecent) <= periodDuration && differenceInDays(date, mostRecent) >= 0 && (
                    <Top>월경 때문에 힘들죠?{'\n'}힘들면 말해요.</Top>
                )}
                {differenceInDays(expectation, date) === 0 && (
                    <View>
                        <Top2>월경 예정일이에요</Top2>
                        <Middle>월경을 시작했다면 {'\n'}월경일 등록을 해주세요.</Middle>
                    </View>
                )}
                {differenceInDays(expectation, date) !== 0 &&
                    differenceInDays(date, mostRecent) > periodDuration &&
                    isBefore(date, expectation) && (
                        <Top>
                            예상 월경 시작일이{'\n'}
                            {differenceInDays(expectation, date)}일 남았어요.
                        </Top>
                    )}

                {differenceInDays(expectation, date) !== 0 &&
                    differenceInDays(date, mostRecent) > periodDuration &&
                    isBefore(expectation, date) && (
                        <Top>
                            예상 월경 시작일이{'\n'}
                            {differenceInDays(date, expectation)}일 지났어요.
                        </Top>
                    )}

                <Btn
                    onPress={() => {
                        navigation.push('New')
                    }}
                >
                    <BtnText>월경일 등록</BtnText>
                </Btn>
                <Btn
                    onPress={() => {
                        navigation.push('ChangePick')
                    }}
                >
                    <BtnText>월경일 편집</BtnText>
                </Btn>
                <Btn
                    onPress={() => {
                        navigation.push('Symptom')
                    }}
                >
                    <BtnText>증상, 기분 기록 추가</BtnText>
                </Btn>
                {/* <Btn>
                    <BtnText>성생활 기록 추가</BtnText>
                </Btn> */}
            </Contents>
        </Total>
    )
}

export default Calendar
