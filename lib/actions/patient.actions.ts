// We are receiving the data here from the patient form.
"use server";
import { ID, Query } from "node-appwrite";
import {
  BUCKET_ID,
  DATABASE_ID,
  databases,
  ENDPOINT,
  PATIENT_COLLECTION_ID,
  PROJECT_ID,
  storage,
  users,
} from "../appwrite.config";
import { parseStringify } from "../utils";
import { InputFile } from "node-appwrite/file";
export const createUser = async (user: CreateUserParams) => {
  //from the docs of appwrite we know we need to pass request ot create a user.
  try {
    console.log("Creating user with data", user);
    const newUser = await users.create(
      ID.unique(),
      user.email,
      user.phone,
      undefined,
      user.name
    );
    console.log("user created");
    console.log({ newUser });
    return parseStringify(newUser);
  } catch (error: any) {
    console.log("Error creating user: ", error);
    if (error && error?.code === 409) {
      const documents = await users.list([Query.equal("email", [user.email])]);
      return documents?.users[0];
    }
  }
};

export const getUser = async (userId: string) => {
  try {
    //Get the user form the id
    const user = await users.get(userId);
    return parseStringify(user);
  } catch (error) {
    console.log(error);
  }
};

export const registerPatient = async ({
  identificationDocument,
  ...patient
}: RegisterUserParams) => {
  // First we need to upload the file. For that we are using the appwrite storage.
  try {
    let file;
    if (identificationDocument) {
      const inputFile = InputFile.fromBuffer(
        identificationDocument?.get("blobfile") as Blob,
        identificationDocument?.get("fileName") as string
      );
      file = await storage.createFile(
        "669f51650033e36311cd",
        ID.unique(),
        inputFile
      );
    }
    console.log({ gender: patient.gender });

    const newPatient = await databases.createDocument(
      DATABASE_ID!,
      PATIENT_COLLECTION_ID!,
      ID.unique(),
      {
        identificationDocumentId: file?.$id ? file.$id : null,
        identificationDocumentUrl: file?.$id
          ? `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file.$id}/view??project=${PROJECT_ID}`
          : null,
        ...patient,
      }
    );
    return parseStringify(newPatient);
  } catch (error) {
    console.log("Error registering patients: ", error);
  }
};

export const getPatient = async (userId: string) => {
  try {
    //Get the user form the id
    const patients = await databases.listDocuments(
      DATABASE_ID!,
      PATIENT_COLLECTION_ID!,
      [Query.equal("userId", userId)]
    );
    //
    return parseStringify(patients.documents[0]);
  } catch (error) {
    console.log(error);
  }
};
