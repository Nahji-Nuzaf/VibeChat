export const validateFirstName = (name: string): string | null => {
    if (!name || name.trim().length === 0) {
        return "First Name is required";
    }
    return null;
};

export const validateLastName = (name: string): string | null => {
    if (!name || name.trim().length === 0) {
        return "Last Name is required";
    }
    return null;
};

export const validateCountryCode = (countryCode: string): string | null => {
    const regex = /^\+[1-9]\d{0,3}$/;
    if (!countryCode) {
        return "Country Code is Required"
    }
    if (!regex.test(countryCode)) {
        return "Enter a valid Country Code";
    }
    return null;
};

export const validatePhoneNo = (phoneNo: string): string | null => {
    const regex = /^[1-9][0-9]{6,14}$/;
    if (!phoneNo) {
        return "Contact Number is Required"
    }
    if (!regex.test(phoneNo)) {
        return "Enter a valid Contact Number";
    }
    return null;
}

export const validateProfileImage = (
    image: {
        uri: string;
        type?: string;
        fileSize?: number;
    } | null
): string | null => {
    if (!image) {
        return "Profile image is required!";
    }

    if (
        image.type &&
        !["image/jpeg", "image/jpg", "image/png"].includes(image.type)
    ) {
        return "Select a valid image type (JPEG, JPG, PNG)";
    }
    if (image.fileSize && image.fileSize > 18 * 1024 * 1024) {
        // 5MB
        return "Profile must be Less than 10MB";
    }
    return null;
};


export const validateEventTitle = (name: string): string | null => {
    if (!name || name.trim().length === 0) {
        return "Event Title is required";
    }
    return null;
};
export const validateEventDescription = (name: string): string | null => {
    if (!name || name.trim().length === 0) {
        return "Event Description is required";
    }
    return null;
};
export const validateEventDate = (name: string): string | null => {
    if (!name || name.trim().length === 0) {
        return "Event Date is required";
    }
    return null;
};
export const validateEventTime = (name: string): string | null => {
    if (!name || name.trim().length === 0) {
        return "Event Time is required";
    }
    return null;
};
export const validateEventLocation = (name: string): string | null => {
    if (!name || name.trim().length === 0) {
        return "Event Location is required";
    }
    return null;
};
export const validateEventCategory = (name: string): string | null => {
    if (!name || name.trim().length === 0) {
        return "Event Category is required";
    }
    return null;
};
export const validateEventMaxAttendees = (name: string): string | null => {
    if (!name || name.trim().length === 0) {
        return "Event Max Attendees is required";
    }
    return null;
};