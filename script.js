
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";

import {
    getFirestore,
    collection,
    addDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

// 1. Firebase configuration
const firebaseConfig = {
    apiKey:"AIzaSyD2OLXESL-u5V9VRpGPuHvilCUpCsiEdEk",
    authDomain: "mountains-web.firebaseapp.com",
    projectId: "mountains-web",
    storageBucket: "mountains-web.firebasestorage.app",
    messagingSenderId: "120915365336",
    appId: "1:120915365336:web:bc4124f2754e303d76b6ad"
};

// 2. Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

console.log("Firebase initialized successfully!");
alert("JAVASCRIPT IS WORKING!");

// 3. Mobile navigation
window.toggleMenu = function () {
    const navigation = document.getElementById("navigation");
    navigation.classList.toggle("active");
};

// 4. Contact form
const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", async function(event) {

        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        const formResult = document.getElementById("formResult");
        const submitButton = contactForm.querySelector(
            'button[type="submit"]'
        );

        if (!name || !email || !message) {
            formResult.textContent = "Please fill in all fields.";
            return;
        }

        submitButton.disabled = true;
        submitButton.textContent = "Sending...";

        try {
            // 5. Save message to Firestore
            await addDoc(collection(db, "messages"), {
                name: name,
                email: email,
                message: message,
                createdAt: serverTimestamp()
            });

            formResult.textContent =
                "Thank you, " + name +
                "! Your message has been sent successfully.";

            contactForm.reset();

        } catch (error) {

            console.error("Firebase error:", error);

            formResult.textContent =
                "Sorry, your message could not be sent. Please try again.";

        } finally {

            submitButton.disabled = false;
            submitButton.textContent = "Send Message";
        }
    });
}

// 6. Close mobile menu after clicking a link
document.querySelectorAll("#navigation a").forEach(link => {
    link.addEventListener("click", function() {
        document.getElementById("navigation")
            .classList.remove("active");
    });
});

// 7. MMU Student Registration
const studentForm = document.getElementById(
    "studentRegistrationForm"
);

if (studentForm) {

    studentForm.addEventListener("submit", async function(event) {

        event.preventDefault();

        const student = {
            fullName: document.getElementById("studentName").value.trim(),
            registrationNumber: document.getElementById("registrationNumber").value.trim(),
            email: document.getElementById("studentEmail").value.trim(),
            phone: document.getElementById("studentPhone").value.trim(),
            course: document.getElementById("studentCourse").value.trim(),
            studyYear: document.getElementById("studyYear").value,
            createdAt: serverTimestamp()
        };

        const result = document.getElementById(
            "registrationResult"
        );

        const button = studentForm.querySelector(
            'button[type="submit"]'
        );

        button.disabled = true;
        button.textContent = "Registering...";

        try {

            await addDoc(collection(db, "students"), student);

            result.textContent =
                "Registration submitted successfully!";

            studentForm.reset();

        } catch (error) {

            console.error("Registration error:", error);

            result.textContent =
                "Registration failed. Please try again.";

        } finally {

            button.disabled = false;
            button.textContent = "Register Student";

        }
    });
}
// STUDENT REGISTRATION FORM

const studentForm = document.getElementById(
    "studentRegistrationForm"
);

if (studentForm) {

    studentForm.addEventListener("submit", async function(event) {

        event.preventDefault();

        const student = {
            fullName: document.getElementById("studentName").value.trim(),
            registrationNumber: document.getElementById("registrationNumber").value.trim(),
            email: document.getElementById("studentEmail").value.trim(),
            phone: document.getElementById("studentPhone").value.trim(),
            course: document.getElementById("studentCourse").value.trim(),
            studyYear: document.getElementById("studyYear").value,
            createdAt: serverTimestamp()
        };

        const result = document.getElementById("registrationResult");
        const button = studentForm.querySelector('button[type="submit"]');

        button.disabled = true;
        button.textContent = "Registering...";

        try {

            await addDoc(collection(db, "students"), student);

            result.textContent = "Student registered successfully!";
            studentForm.reset();

        } catch (error) {

            console.error("Registration error:", error);
            result.textContent = "Registration failed. Please try again.";

        } finally {

            button.disabled = false;
            button.textContent = "Register Student";

        }

    });

}