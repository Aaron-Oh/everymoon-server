import styled from 'styled-components/native'
import DatePickerModal from 'react-native-modal-datetime-picker'
import {useState} from 'react'
import {addDays, differenceInDays, format, getDate, getMonth, getYear} from 'date-fns'
import symbolicateStackTrace from 'react-native/Libraries/Core/Devtools/symbolicateStackTrace'
import GoBack from '../Components/GoBack'

const Total = styled.ScrollView`
    background-color: #f1d5d4;
    flex: 1;
    padding-top: 50px;
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
    width: 48%;
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

function Body({navigation}) {
    const types = [
        '두통',
        '복통',
        '허리통증',
        '피부 트러블',
        '변비',
        '설사',
        '소화불량',
        '메스꺼움 / 구토',
        '복부팽만',
        '민감한 가슴',
        '부종',
        '근육통',
        '발열',
        '오한',
        '손발저림',
        '어지러움',
    ]
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
                <Top>몸 상태는{'\n'}어떤가요?</Top>
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
                            navigation.push('Feeling')
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

export default Body
