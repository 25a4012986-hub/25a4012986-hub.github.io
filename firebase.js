import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, runTransaction, onValue } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const firebaseConfig = {
  databaseURL: "https://view-counter-9e8b3-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const viewRef = ref(db, "views");

runTransaction(viewRef, v => (v || 0) + 1);

onValue(viewRef, snap => {
  const el = document.getElementById("viewCount");
  if (el) el.innerText = (snap.val() || 0).toLocaleString("vi-VN");
});
