import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig)
const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db };

// import { initializeApp } from "firebase/app"
// import { getAuth } from "firebase/auth"
// import { getFirestore, doc, setDoc } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: "AIzaSyBpSjG07zjKJ8MQiw0RpTqx8RWmW2aQFZE",
//   authDomain: "tu-student.firebaseapp.com",
//   projectId: "tu-student",
//   storageBucket: "tu-student.firebasestorage.app",
//   messagingSenderId: "1089599288081",
//   appId: "1:1089599288081:web:f0244037b410c7766152b0",
//   measurementId: "G-9P9BN205MK"
// };

// const app = initializeApp(firebaseConfig)
// const auth = getAuth(app);
// const db = getFirestore(app);

// const exerciseData = {
//   "title": "pre-university-calculus",
//   "slug": "what-is-a-polynomial",
//   "description": "What is a polynomial?",
//   "questions": [
//       {
//           "title": "Rewrite given polynomials to standard form",
//           "context": "$$f(x) = (1-2x)^{3}$$",
//           "answer": "$$f(x)=-8x^{3}+12x^{2}-6x+1$$",
//           "explanation": {
//               "0": "Expand the brackets: this gives $1-6x+12x^{2}-8x^{3}$",
//               "1": "Order terms from high power to low: $-8x^{3}+12x^{2}-6x+1$"
//           }
//       },
//       {
//           "title": "Rewrite given polynomials to standard form",
//           "context": "$$f(x) = (x+2)^{2}$$",
//           "answer": "$$f(x)=x^{2}+4x+4$$",
//           "explanation": {
//           "0": "Expand the brackets: this gives $x^{2}+4x+4$",
//           "1": "Order terms from high power to low: $x^{2}+4x+4$"
//           }
//       },
//       {
//           "title": "Rewrite given polynomials to standard form",
//           "context": "$$f(x) = (3x+2)^{2}(x-1) - x(5x^{2}-2)$$",
//           "answer": "$$f(x)=27x^{3}-9x^{2}-4x+2$$",
//           "explanation": {
//               "0": "Expand the brackets: this gives $(3x+2)^{2}(x-1) - x(5x^{2}-2)$",
//               "1": "First expand $(3x+2)^{2}$ to get $9x^{2}+12x+4$",
//               "2": "Then multiply by $(x-1)$ to get $(9x^{2}+12x+4)(x-1)$",
//               "3": "Expand to get $9x^{3}-9x^{2}+12x^{2}-12x+4x-4$",
//               "4": "Combine like terms to get $9x^{3}+3x^{2}-8x-4$",
//               "5": "Now expand $-x(5x^{2}-2)$ to get $-5x^{3}+2x$",
//               "6": "Combine the two results: $9x^{3}+3x^{2}-8x-4 - 5x^{3}+2x$",
//               "7": "Simplify to get $4x^{3}+3x^{2}-6x-4$"
//           }
//       },
//       {
//           "title": "Rewrite given polynomials to standard form",
//           "context": "$$f(x) = (2x-3)^{2}(x+4) + x(4x^{2}-1)$$",
//           "answer": "$$f(x)=8x^{3}+14x^{2}-23x-36$$",
//           "explanation": {
//               "0": "Expand the brackets: this gives $(2x-3)^{2}(x+4) + x(4x^{2}-1)$",
//               "1": "First expand $(2x-3)^{2}$ to get $4x^{2}-12x+9$",
//               "2": "Then multiply by $(x+4)$ to get $(4x^{2}-12x+9)(x+4)$",
//               "3": "Expand to get $4x^{3}+16x^{2}-12x^{2}-48x+9x+36$",
//               "4": "Combine like terms to get $4x^{3}+4x^{2}-39x+36$",
//               "5": "Now expand $x(4x^{2}-1)$ to get $4x^{3}-x$",
//               "6": "Combine the two results: $4x^{3}+4x^{2}-39x+36 + 4x^{3}-x$",
//               "7": "Simplify to get $8x^{3}+4x^{2}-40x+36$"
//           }
//       }
//   ]
// }

// const exerciseRef = doc(db, "exercises", "what-is-a-polynomial");

// async function writeData() {
//   try {
//     await setDoc(exerciseRef, exerciseData);
//     console.log("Document successfully written!");
//   } catch (e) {
//     console.error("Error writing document: ", e);
//   }
// }

// // Call the function to write data
// writeData();