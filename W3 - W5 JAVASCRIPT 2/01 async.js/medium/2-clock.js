function showClock() {
  const now = new Date();

  // Format: HH:MM:SS (24-hour)
  const hours24 = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  const time24 = `${hours24}:${minutes}:${seconds}`;

  // Format: HH:MM:SS AM/PM (12-hour)
  let hours12 = now.getHours();
  const ampm = hours12 >= 12 ? "PM" : "AM";
  hours12 = hours12 % 12;
  hours12 = hours12 ? hours12 : 12; // 0 becomes 12
  const time12 = `${String(hours12).padStart(2, "0")}:${minutes}:${seconds} ${ampm}`;

  console.log("24-hour format:", time24);
  console.log("12-hour format:", time12);
  console.log("----------------------");
}

// Update every second
setInterval(showClock, 1000);
