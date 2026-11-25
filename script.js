
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
