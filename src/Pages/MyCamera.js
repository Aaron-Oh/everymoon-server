import styled from 'styled-components/native'
import DatePickerModal from 'react-native-modal-datetime-picker'
import {addDays, differenceInDays, format, getDate, getMonth, getYear} from 'date-fns'
import React, {useState, useEffect} from 'react'
import {Text, View, TouchableOpacity, ImageBackground} from 'react-native'
import {Camera} from 'expo-camera'
import ml from '@react-native-firebase/ml'
import axios from 'axios'

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
    width: 45%;
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

function MyCamera({navigation}) {
    const [hasPermission, setHasPermission] = useState(null)
    const [previewVisible, setPreviewVisible] = useState(false)
    const [capturedImage, setCapturedImage] = useState(null)
    const [type, setType] = useState(Camera.Constants.Type.back)

    useEffect(() => {
        ;(async () => {
            const {status} = await Camera.requestCameraPermissionsAsync()
            setHasPermission(status === 'granted')
        })()
    }, [])
    if (hasPermission === null) {
        return <View />
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>
    }

    const takePicture = async () => {
        if (!camera) return
        let photo = await camera.takePictureAsync()
        setPreviewVisible(true)
        setCapturedImage(photo)
        const localUri = photo.uri
        const fileName = localUri.split('/').pop()
        const match = /\.(\w+)$/.exec(fileName ?? '')
        const type = match ? `image/${match[1]}` : `image`
        const formData = new FormData()
        formData.append('image', {uri: localUri, name: fileName, type})
        console.log(formData)

        await axios({
            method: 'post',
            url: 'http://34.64.180.70:8080/predict',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            data: formData,
        })
            .then(function (response) {
                console.log('response : ', response)
                console.log('성공인가?')
            })
            .catch(function (error) {
                console.log('error : ', error)
                console.log('에러면 말해줘')
            })
    }

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: '#F1D5D4',
            }}
        >
            {previewVisible ? (
                <ImageBackground
                    source={{uri: capturedImage && capturedImage.uri}}
                    style={{
                        flex: 0.4,
                        ratio: {1: 1},
                    }}
                >
                    <View
                        style={{
                            flex: 1,
                            flexDirection: 'column',
                            padding: 15,
                            justifyContent: 'flex-end',
                        }}
                    >
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                            }}
                        >
                            <TouchableOpacity
                                onPress={() => setPreviewVisible(false)}
                                style={{
                                    width: 130,
                                    height: 40,
                                    alignItems: 'center',
                                    borderRadius: 4,
                                }}
                            >
                                <Text
                                    style={{
                                        color: '#fff',
                                        fontSize: 20,
                                    }}
                                >
                                    다시 찍기
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ImageBackground>
            ) : (
                <View style={{flex: 1}}>
                    <Camera
                        style={{width: 400, height: 600, marginLeft: 'auto', marginRight: 'auto', marginTop: 50}}
                        type={type}
                        ratio={'1:1'}
                        ref={(ref) => {
                            this.camera = ref
                        }}
                    ></Camera>
                    <View
                        style={{
                            flex: 0.9,
                            backgroundColor: 'transparent',
                            flexDirection: 'row',
                        }}
                    >
                        <View
                            style={{
                                position: 'absolute',
                                bottom: 0,
                                flex: 1,
                                width: '100%',
                                paddingBottom: 50,
                                // justifyContent: 'space-between',
                            }}
                        >
                            <View
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-around',
                                    flexDirection: 'row',
                                }}
                            >
                                <Btn onPress={takePicture}>
                                    <BtnText>촬영</BtnText>
                                </Btn>
                                <Btn
                                    onPress={() => {
                                        navigation.replace('Main')
                                    }}
                                >
                                    <BtnText>뒤로 가기</BtnText>
                                </Btn>
                            </View>
                        </View>
                    </View>
                </View>
            )}
        </View>
    )
}

export default MyCamera
