// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app'
import {getAnalytics} from 'firebase/analytics'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyAjJxJ3U5wEWgp9WpHrxyTLdPHIiF6-YEU',
    authDomain: 'everymoon-725c7.firebaseapp.com',
    databaseURL: 'https://everymoon-725c7-default-rtdb.asia-southeast1.firebasedatabase.app',
    projectId: 'everymoon-725c7',
    storageBucket: 'everymoon-725c7.appspot.com',
    messagingSenderId: '528004938944',
    appId: '1:528004938944:web:a078ae859aa7980ac84125',
    measurementId: 'G-M0N3QEGZHD',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
