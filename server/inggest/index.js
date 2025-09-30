import { Inngest } from "inngest";
import { User } from "../models/User.js"; // Your Mongoose model

// 🧠 Create a client to send and receive events
export const inngest = new Inngest({ id: "movie-ticket-booking" });

/**
 * 📝 Inngest function to sync new user creation (from Clerk) into your DB
 */
const syncUserCreation = inngest.createFunction(
  { id: "sync-user-from-clerk" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } = event.data;

    const userData = {
      _id: id,
      name: `${first_name} ${last_name}`,
      email: email_addresses?.[0]?.email_address,
      image: image_url,
    };

    await User.create(userData);

    console.log(`✅ Synced user: ${userData.name} (${userData.email})`);
    return { message: "User synced successfully", userId: id };
  }
);

/**
 * 🗑️ Inngest function to sync user deletion (from Clerk) into your DB
 */
const syncUserDeletion = inngest.createFunction(
  { id: "delete-user-from-clerk" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    const { id } = event.data;

    await User.findByIdAndDelete(id);

    console.log(`🗑️ Deleted user with ID: ${id}`);
    return { message: "User deleted successfully", userId: id };
  }
);

/**
 * ✏️ Inngest function to sync user updation (from Clerk) into your DB
 */
const syncUserUpdation = inngest.createFunction(
  { id: "update-user-from-clerk" },
  { event: "clerk/user.updated" },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } = event.data;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        name: `${first_name} ${last_name}`,
        email: email_addresses?.[0]?.email_address,
        image: image_url,
      },
      await User.findByIdAndUpdate(id, userData)
    );

  }
)

// 👇 Export all functions for Inngest's dev server or deployment
export const functions = [
    syncUserCreation, syncUserDeletion, syncUserUpdation
];
