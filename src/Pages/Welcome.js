import AsyncStorage from '@react-native-async-storage/async-storage'
import {useRef, useState} from 'react'
import {Button, Keyboard, Text, TextInput, View} from 'react-native'
import styled from 'styled-components/native'

const Total = styled.SafeAreaView`
    background-color: #f1d5d4;
    flex: 1;
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
    margin-top: 46px;
`

const BtnText = styled.Text`
    color: #ffffff;
    font-weight: 400;
    font-size: 24px;
`

const Contents = styled.View`
    margin-left: 15px;
    margin-right: 15px;
    margin-top: 90px;
`

const Big = styled.Text`
    color: #294747;
    font-weight: 700;
    font-size: 40px;
    margin-bottom: 24px;
`
const Middle = styled.Text`
    font-weight: 700;
    font-size: 30px;
    line-height: 36px;
    color: #294747;
`
const Test = styled.TextInput`
    width: 100px;
    height: 50px;
    border-radius: 10px;
    padding: 10px;
    border: 1px;
`

function Welcome({navigation}) {
    // const secondRef = useRef()
    // const thirdRef = useRef()
    // const [inputs, setInputs] = useState({
    //     year: '',
    //     month: '',
    //     date: '',
    // })
    // // const [dataList, setDataList] = useState([])
    // const {year, month, date} = inputs

    // const onChange = (keyValue, e) => {
    //     const {text} = e.nativeEvent
    //     setInputs({
    //         ...inputs,
    //         [keyValue]: text,
    //     })
    // }
    // const handleSubmit = async () => {
    //     try {
    //         const newData = [{year: year, month: month, date: date}]
    //         await AsyncStorage.setItem('periodData', JSON.stringify(newData))
    //     } catch (e) {
    //         console.log('error : ', e)
    //     }
    // }

    // console.log('year : ', year)
    // console.log('month : ', month)
    // console.log('date : ', date)
    return (
        <Total>
            <Contents>
                <Big>환영합니다!</Big>
                <Middle>에브리문을 시작해볼까요?</Middle>
                <Middle>간단하게 세팅할 수 있어요.</Middle>
                <Btn
                    onPress={() => {
                        navigation.push('Birth')
                    }}
                >
                    <BtnText>시작하기</BtnText>
                </Btn>
                {/* <Test
                    value={year}
                    onChange={(e) => onChange('year', e)}
                    keyboardType="number-pad"
                    maxLength={4}
                    onSubmitEditing={() => secondRef.current.focus()}
                    returnKeyType="done"
                />
                <Test
                    value={month}
                    onChange={(e) => onChange('month', e)}
                    keyboardType="number-pad"
                    maxLength={2}
                    ref={secondRef}
                    onSubmitEditing={() => thirdRef.current.focus()}
                    returnKeyType="done"
                />
                <Test
                    value={date}
                    onChange={(e) => onChange('date', e)}
                    keyboardType="number-pad"
                    maxLength={2}
                    onSubmitEditing={Keyboard.dismiss}
                    returnKeyType="done"
                    ref={thirdRef}
                /> */}
            </Contents>
        </Total>
    )
}

export default Welcome
