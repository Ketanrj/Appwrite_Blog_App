//This file handels login and logout 
import {account, OAuthProvider} from '../appwrite.js'



export const googleLogin = async () => {
    try {
        await account.createOAuth2Session(
            OAuthProvider.Google,
            'http://localhost:5173/', // redirect here on success
            'http://localhost:5173/fail', // redirect here on failure
        )
        console.log('Success');
    } catch (error) {
        console.log(error)
    }
}

export const logoutUser = async () =>{
    try {
        account.deleteSession('current');
    } catch (error) {
        console.log(error)
    }
}

export const getCurrentUser = async () => {
    try {
      return await account.get()
    } catch (error) {
      console.error("Appwrite serive : getCurrentUser : error", error);
    }
}

 