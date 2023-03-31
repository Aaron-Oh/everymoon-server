import styled from 'styled-components/native'
import {useEffect, useState} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {Text} from 'react-native'
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
    margin-bottom: 18px;
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
    margin-top: 18px;
`

const Box = styled.TouchableOpacity`
    height: 61px;
    width: 100%;
    border: 3px solid #294747;
    border-radius: 15px;
    margin-bottom: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${(props) => (props.isChecked ? '#294747' : '#f1d5d4')};
`
const BoxText = styled.Text`
    color: ${(props) => (props.isChecked ? 'white' : '#294747')};
    font-weight: 400;
    font-size: 24px;
`

function ChangePick({navigation}) {
    const [periodData, setPeriodData] = useState([])
    const [pass, setPass] = useState(false)
    useEffect(() => {
        const getPeriodData = async () => {
            try {
                const storageData = JSON.parse(await AsyncStorage.getItem('periodData'))
                if (storageData) {
                    setPeriodData(storageData.map((period) => ({...period, checked: false})))
                    setPass(false)
                }
            } catch {
                alert('데이터가 없어요')
            }
        }
        getPeriodData()
    }, [])

    const handleClick = (idx) => {
        setPeriodData((prevPeriodData) =>
            prevPeriodData.map((period, index) => {
                if (idx === index) {
                    return {...period, checked: true}
                }
                return {...period, checked: false}
            }),
        )
        setPass(idx)
    }

    return (
        <Total>
            <GoBack navigation={navigation} />
            <Contents>
                <Top>수정하고 싶은 {'\n'}날짜를 선택해주세요.</Top>
                <Middle>최근 월경 순</Middle>
                {periodData?.map((data, idx) => (
                    <Box activeOpacity={1} key={idx} isChecked={data.checked} onPressOut={() => handleClick(idx)}>
                        <BoxText isChecked={data.checked}>
                            {data.year}-{data.month}-{data.date}
                        </BoxText>
                    </Box>
                ))}
                {pass !== false ? (
                    <Btn
                        onPress={() => {
                            navigation.navigate('ChangeDate', {dates: {pass}})
                        }}
                    >
                        <BtnText>선택했어요</BtnText>
                    </Btn>
                ) : (
                    <Btn2>
                        <BtnText>날짜를 선택해주세요</BtnText>
                    </Btn2>
                )}
            </Contents>
        </Total>
    )
}

export default ChangePick
