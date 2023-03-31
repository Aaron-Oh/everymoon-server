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
    margin-top: 60px;
    margin-bottom: 80px;
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

const Btn2 = styled.View`
    width: 100%;
    height: 61px;
    background: #022e2e80;
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
const MiniBox = styled.TouchableOpacity`
    width: 100%;
    height: 61px;
    border-radius: 15px;
    display: flex;
    justify-content: center;
    text-align: center;
    align-items: center;
    border: 3px solid #294747;
    margin-top: 6px;
    margin-bottom: 6px;
    background-color: ${(props) => (props.isClicked ? '#294747' : '#f1d5d4')};
`

const MiniText = styled.Text`
    color: ${(props) => (props.isClicked ? 'white' : '#294747')};
    font-weight: 400;
    font-size: 24px;
`
const BtnBox = styled.View`
    display: flex;
    flex-direction: row;
    width: 100%;
    flex-wrap: wrap;
    justify-content: space-between;
`

const Nothing = styled.TouchableOpacity`
    width: 100%;
    height: 61px;
    border-radius: 15px;
    display: flex;
    justify-content: center;
    text-align: center;
    align-items: center;
    border: 3px solid #294747;
    margin-top: 6px;
    margin-bottom: 6px;
    background-color: ${(props) => (props.isClicked ? '#294747' : '#f1d5d4')};
`

function Blood({navigation}) {
    const types = ['극소량의 출혈', '월경과 비슷한 출혈', '월경과는 다른, 다량의 출혈']
    const [openList, setOpenList] = useState(Array.from({length: types.length}).fill(false))
    const [nothing, setNothing] = useState(false)

    const handleChange = (idx) => {
        if (nothing) {
            setNothing(false)
        }
        setOpenList((prev) =>
            prev.map((x, i) => {
                if (idx === i) {
                    return !x
                } else return x
            }),
        )
    }
    return (
        <Total>
            <GoBack navigation={navigation} />
            <Contents>
                <Top>어떤 양상의{'\n'}출혈이었나요?</Top>
                <BtnBox>
                    {types.map((data, idx) => (
                        <MiniBox key={idx} isClicked={openList[idx]} onPress={() => handleChange(idx)}>
                            <MiniText isClicked={openList[idx]}>{data}</MiniText>
                        </MiniBox>
                    ))}
                </BtnBox>

                <Nothing
                    isClicked={nothing}
                    onPress={() => {
                        setNothing((prev) => !prev)
                        setOpenList(Array.from({length: types.length}).fill(false))
                    }}
                >
                    <MiniText isClicked={nothing}>해당 사항 없음</MiniText>
                </Nothing>
                {nothing || openList.includes(true) ? (
                    <Btn
                        onPress={() => {
                            navigation.push('RecordFinished')
                        }}
                    >
                        <BtnText>선택했어요</BtnText>
                    </Btn>
                ) : (
                    <Btn2>
                        <BtnText>상태를 골라주세요</BtnText>
                    </Btn2>
                )}
            </Contents>
        </Total>
    )
}

export default Blood
