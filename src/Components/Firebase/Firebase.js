import app from 'firebase/app'
import 'firebase/auth'
import React from 'react'
import 'firebase/firestore'


const config={//you can leave api key and auth Domain as they are or use local envs
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
}


class FireBase{
    constructor(){
        app.initializeApp(config);
        this.auth= app.auth()
        this.db=app.firestore()
    }


    //inscription
    signupUser=(email,password)=> this.auth.createUserWithEmailAndPassword(email,password)

    //connection
    loginUser=(email,password)=> this.auth.signInWithEmailAndPassword(email,password)

    //deconnection
    signOutUser=()=>this.auth.signOut()

    //Restore password
    passwordReset=email=>this.auth.sendPasswordResetEmail(email)

    //db
    user=uid=>this.db.doc('users/'+uid);


    render(){
        const { children } = this.props
        const { signupUser,signOutUser,loginUser } = this
        return (
            <FireBase.Provider
              value={{
                loginUser,
                signOutUser,
                signupUser,
              }}
            >
              {children}
            </FireBase.Provider>
        )}
}

export default FireBase
