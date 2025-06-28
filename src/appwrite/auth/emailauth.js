import { account} from "../appwrite";
import { ID } from 'appwrite'

const createAccount = async ({email, password, name}) =>{
    try {
        const userAccount = await account.create(
            ID.unique(),
            email,
            password,
            name,  
        )
        if(userAccount) 
        console.log(userAccount);
        return userAccount;

    } catch (error) {
        console.error("Error in create acc", error)
    }
}

const login = async ({email, password}) => {
    try {
        const user = await account.createEmailPasswordSession(email, password);
        return user;
    } catch (error) {
        console.error('Error in user Login', error)
    }
}

const getCurrentuser = async () => {
    try {
       return await account.get()
    } catch (error) {
        console.error('error in getting curent user', error)
    }
    return null;
}

const logout = async () =>{
    try {
        return await account.deleteSessions();
    } catch (error) {
        console.error('User', error);
    }
}

const authService =  { createAccount, login, getCurrentuser, logout };

export default authService;