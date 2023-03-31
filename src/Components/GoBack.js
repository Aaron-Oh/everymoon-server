import {TouchableOpacity, View} from 'react-native'
import Back from '../../assets/Back.png'
import styled from 'styled-components/native'

const Container = styled.View`
    height: 54px;
    width: 100%;
    padding-left: 15px;
`
const T = styled.TouchableOpacity`
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
`

const Img = styled.Image`
    width: 17px;
    height: 26px;
    margin-right: 17px;
`

const BackText = styled.Text`
    font-weight: 600;
    font-size: 24px;
    color: #294747;
`

function GoBack({navigation}) {
    return (
        <Container>
            <T
                onPress={() => {
                    navigation.pop()
                }}
            >
                <Img source={Back} />
                <BackText>뒤로 가기</BackText>
            </T>
        </Container>
    )
}

export default GoBack
