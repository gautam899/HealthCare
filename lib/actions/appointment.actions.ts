"use server";
import { ID, Query } from "node-appwrite";
import {
  APPOINTMENT_COLLECTION_ID,
  DATABASE_ID,
  databases,
  messaging,
} from "../appwrite.config";
import { formatDateTime, parseStringify } from "../utils";
import { Appointment } from "@/types/appwrite.types";
import { revalidatePath } from "next/cache";

export const createAppointment = async (
  appointment: CreateAppointmentParams
) => {
  try {
    const newAppointment = await databases.createDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      ID.unique(),
      appointment
    );
    return parseStringify(newAppointment);
  } catch (error) {
    console.log("Error creating appointment", error);
  }
};

export const getAppointment = async (appointmentId: string) => {
  try {
    const appointment = await databases.getDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      appointmentId
    );
    return parseStringify(appointment);
  } catch (error) {
    console.log(error);
  }
};

export const getRecentAppointmentsList = async () => {
  try {
    const appointments = await databases.listDocuments(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      [Query.orderDesc("$createdAt")]
    );
    const intialCounts = {
      scheduledCounts: 0,
      pendingCounts: 0,
      cancelledCounts: 0,
    };
    // Iterate over the appointments and increment the count of the respective appointments.
    const counts = (appointments.documents as Appointment[]).reduce(
      (acc, appointment) => {
        if (appointment.status === "scheduled") {
          acc.scheduledCounts += 1;
        } else if (appointment.status === "pending") {
          acc.pendingCounts += 1;
        } else if (appointment.status === "cancelled") {
          acc.cancelledCounts += 1;
        }
        return acc;
      },
      intialCounts
    );
    const data = {
      totalCount: appointments.total,
      ...counts,
      documents: appointments.documents,
    };
    console.log({ data });
    return parseStringify(data);
  } catch (error) {
    console.log(error);
  }
};

export const updateAppointment = async ({
  appointmentId,
  userId,
  appointment,
  type,
}: UpdateAppointmentParams) => {
  try {
    const updatedAppointment = await databases.updateDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      appointmentId,
      appointment
    );
    if (!updatedAppointment) {
      throw new Error("Appointment not found");
    }
    //TODO SMS notfication
    const smsMessage = `
    Hi, it's CareConnect.
    ${
      type === "schedule"
        ? `Your appoint has been scheduled for ${formatDateTime(
            appointment.schedule!
          ).dateTime} with Dr. ${appointment.primaryPhysician}`
        : `We regret to inform you that your appointment has been cancelled for the following reason:${appointment.cancellationReason}`
    }`;

    await sendSMSNotification(userId,smsMessage);
    revalidatePath("/admin");
    return parseStringify(updatedAppointment);
  } catch (error) {
    console.log(error);
  }
};

export const sendSMSNotification = async (userId: string, content: string) => {
  try {
    const message = await messaging.createSms(
      ID.unique(),
      content,
      [],
      [userId]
    );
    return parseStringify(message);
  } catch (error) {
    console.log(error);
  }
};
