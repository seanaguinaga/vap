import { IonLoading } from "@ionic/react";
import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { FirebaseAppProvider } from "reactfire";
import reportWebVitals from "./reportWebVitals";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

let App = React.lazy(() => import("./App"));

let firebaseConfig = {
  apiKey: "AIzaSyDyP1YBV0EBLY5p1V0YCXnKZo1F9pDetYY",
  authDomain: "dashreel-demo.firebaseapp.com",
  projectId: "dashreel-demo",
  storageBucket: "dashreel-demo.appspot.com",
  messagingSenderId: "374615537020",
  appId: "1:374615537020:web:fc8a69efd807b117a4a0f9",
  measurementId: "G-J97E1797FM",
};
let root = document.getElementById("root");

root &&
  ReactDOM.unstable_createRoot(root).render(
    <React.StrictMode>
      <FirebaseAppProvider firebaseConfig={firebaseConfig} suspense>
        <Suspense fallback={<IonLoading isOpen />}>
          <App />
        </Suspense>
      </FirebaseAppProvider>
    </React.StrictMode>
  );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
