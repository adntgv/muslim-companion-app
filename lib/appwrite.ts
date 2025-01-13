import { Client, Account, Databases } from 'appwrite';

const client = new Client();

client
    .setEndpoint('http://appwrite.adntgv.com/v1')
    .setProject('67852f14003b2e275a82');

export const account = new Account(client);
export const databases = new Databases(client);

export { client }; 