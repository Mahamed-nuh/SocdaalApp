import { Client, Account, Avatars} from 'react-native-appwrite';

export const client = new Client()
    .setEndpoint('https://fra.cloud.appwrite.io/v1')
    .setProject('68190580001a4c8a9a9a')
    .setPlatform('dev.mahamed.socdaal');

export const account = new Account(client);
export const avatars = new Avatars(client);
