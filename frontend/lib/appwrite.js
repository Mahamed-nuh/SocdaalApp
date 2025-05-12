import { Client, Account, Avatars } from 'react-native-appwrite';

export const client = new Client()
    .setEndpoint('https://fra.cloud.appwrite.io/v1')
    .setProject('682205bc0018a317ee64')
    .setPlatform('dev.mahamed.socdaal');

export const account = new Account(client);
export const avatars = new Avatars(client); 
 