## A HealthCare Management System build with NextJs.

# TechStack Used
1. Nextjs
2. Appwrite for authentication, databases, Sms messaging
3. Shadcn for seamless UI and making the different functional Interfaces
4. Twilio for enabling SMS services.
5. Sentry for tracking the errors that occur in the application to make the debugging easier.

# Features-> User side

1. The user can register itself in the application.
2. The user can book iteself an appointment by providing all the necessary information in the registration form.
3. A user is allowed to book more than one appointment.
4. The user will receive updates through SMS if the admin schedules or cancels the appointment.

# Features-> Admin Side
1. The admin can log in only with a secret key.
2. The admin can schedule or cancel the user's appointment. The respective user will be notified through SMS about the respective action (cancellation or scheduled).
