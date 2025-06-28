import { Client, Account, OAuthProvider } from 'appwrite'
import conf from '/connection/conf'

// console.log(conf);

const client = new Client();

client
.setEndpoint(conf.Endpoint)
.setProject(conf.ProjectID)

const account = new Account(client);

export {account, OAuthProvider } 
