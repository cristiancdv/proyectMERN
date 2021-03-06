const config = {
    apiConfig: {
        host: process.env.REACT_APP_AXIOS_HOST,
        port: process.env.REACT_APP_AXIOS_PORT
    },
    firebaseConfig: {
        apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
        authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
        projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
        storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
        messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
        appId: process.env.REACT_APP_FIREBASE_APPID
    },
    cloudynari: {
        url: process.env.REACT_APP_CLOUDYNARI_URL
    }
}

module.exports = config