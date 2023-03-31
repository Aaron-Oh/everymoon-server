import {Text, View} from 'react-native'
import styled from 'styled-components/native'

const Total = styled.SafeAreaView`
    background-color: #f1d5d4;
    flex: 1;
`

function Year() {
    return (
        <Total>
            <Text>생년월일 입력</Text>
        </Total>
    )
}

export default Year
