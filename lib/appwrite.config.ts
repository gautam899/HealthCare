import * as sdk from "node-appwrite";

export const {
  NEXT_PUBLIC_ENDPOINT: ENDPOINT,
  PROJECT_ID,
  API_KEY,
  DATABASE_ID,
  PATIENT_COLLECTION_ID,
  DOCTOR_COLLECTION_ID,
  APPOINTMENT_COLLECTION_ID,
  NEXT_PUBLIC_BUCKET_ID: BUCKET_ID,
} = process.env;

const client = new sdk.Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("669f4fec002e2d38eec5")
  .setKey(
    "2c8cc4d9eef858f9736c934aa394cb5fcd0aaf6a82ad7855bfea9ce739a78d055eebe81b2cc6d61a14496b159225fcda8adfd6b746f93df045f1d99d2f84cf1b25d63375609556aafa0ae9b8eb93aad5d6ecebf48986679a001ae3b91cdcbe4d3c8a5f6b406f7a45d5e495fe62ff57a28fcccd79e0ea491cc33ffa31ffe62ac8"
  );

export const databases = new sdk.Databases(client);
export const users = new sdk.Users(client);
export const messaging = new sdk.Messaging(client);
export const storage = new sdk.Storage(client);
  