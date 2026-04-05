import { useContext } from "react";
import { UserRegistrationData } from "../components/UserContext";
import { EventRegistrationData } from "../components/EventContext";

const API = process.env.EXPO_PUBLIC_APP_URL + "/VibeChat";

export const createNewAccount = async (
  userRegistrationData: UserRegistrationData
) => {
  let formData = new FormData();
  formData.append("countryCode", userRegistrationData.countryCode);
  formData.append("contactNo", userRegistrationData.contactNo);
  formData.append("firstName", userRegistrationData.firstName);
  formData.append("lastName", userRegistrationData.lastName);
  formData.append("profileImage", {
    uri: userRegistrationData.profileImage,
    name: "profile.png",
    type: "image/png",
  } as any);

  console.log(JSON.stringify(formData));

  console.log("Sending to:", API + "/UserController");
  console.log("FormData:", JSON.stringify({
    countryCode: userRegistrationData.countryCode,
    contactNo: userRegistrationData.contactNo,
    firstName: userRegistrationData.firstName,
    lastName: userRegistrationData.lastName,
    profileImage: userRegistrationData.profileImage,
  }));

  const response = await fetch(API + "/UserController", {
    method: "POST",
    body: formData,
  });

  if (response.ok) {
    const json = await response.json();
    console.log(json.message);
    return json;
  } else {
    return "OOPS! Account creation failed!";
  }
};

export const uploadProfileImage = async (userId: string, imageUri: string) => {
  let formData = new FormData();
  formData.append("userId", userId);
  formData.append("profileImage", {
    uri: imageUri,
    type: "image/png", // change if PNG
    name: "profile.png",
  } as any);

  const response = await fetch(API + "/ProfileController", {
    method: "POST",
    body: formData,
  });
  if (response.ok) {
    return await response.json();
  } else {
    console.warn("Profile image uploading failed!");
  }
};

export const loginUser = async (countryCode: string, contactNo: string) => {
  try {
    const response = await fetch(API + "/LoginController", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        countryCode,
        contactNo,
      }),
    });

    if (response.ok) {
      const json = await response.json();
      return json;
    } else {
      return { status: false, message: "Server error" };
    }
  } catch (error) {
    console.log("Login error:", error);
    return { status: false, message: "Network error" };
  }
};


// export const createNewEvent = async (
//   eventRegistrationData: EventRegistrationData
// ) => {
//   let formData = new FormData();
//   formData.append("title", eventRegistrationData.title);
//   formData.append("description", eventRegistrationData.description);
//   formData.append("date", eventRegistrationData.date);
//   formData.append("time", eventRegistrationData.time);
//   formData.append("location", eventRegistrationData.location);
//   formData.append("category", eventRegistrationData.category);
//   formData.append("maxAttendees", eventRegistrationData.maxAttendees);
//   // formData.append("profileImage", {
//   //   uri: userRegistrationData.profileImage,
//   //   name: "profile.png",
//   //   type: "image/png",
//   // } as any);

//   console.log(JSON.stringify(formData));

//   console.log("Sending to:", API + "/EventController");
//   console.log("FormData:", JSON.stringify({
//     title: eventRegistrationData.title,
//     description: eventRegistrationData.description,
//     date: eventRegistrationData.date,
//     time: eventRegistrationData.time,
//     location: eventRegistrationData.location,
//     category: eventRegistrationData.category,
//     maxAttendees: eventRegistrationData.maxAttendees,
//     // profileImage: eventRegistrationData.profileImage,
//   }));

//   const response = await fetch(API + "/EventController", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(eventRegistrationData),
//   });

//   if (response.ok) {
//     const json = await response.json();
//     console.log(json.message);
//     return json;
//   } else {
//     return "OOPS! Event creation failed!";
//   }
// };


export const createNewEvent = async (eventData: EventRegistrationData) => {

  let formData = new FormData();
  formData.append("title", eventData.title);
  formData.append("description", eventData.description);
  formData.append("date", eventData.date);
  formData.append("time", eventData.time);
  formData.append("location", eventData.location);
  formData.append("category", eventData.category);
  formData.append("maxAttendees", eventData.maxAttendees);

  // 🔥 Add image
  // formData.append("image", {
  //   uri: eventData.imageUri,
  //   type: "image/jpeg",
  //   name: "event.jpg",
  // });

  const response = await fetch(API + "/EventController", {
    method: "POST",
    body: formData, // ❗IMPORTANT: do NOT set Content-Type here
  });

  return await response.json();
};


