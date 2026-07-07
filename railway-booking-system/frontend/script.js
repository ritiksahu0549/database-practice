const API = "http://localhost:5000/api/bookings";

const form = document.getElementById("bookingForm");
const bookingsDiv = document.getElementById("bookings");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    passengerName: document.getElementById("name").value,
    age: Number(document.getElementById("age").value),
    source: document.getElementById("source").value,
    destination: document.getElementById("destination").value,
    journeyDate: document.getElementById("date").value,
    trainNumber: document.getElementById("train").value,
  };

  const res = await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await res.json();
  console.log(result);

  loadBookings();
  form.reset();
});

async function loadBookings() {
  const res = await fetch(API);
  const bookings = await res.json();

  bookingsDiv.innerHTML = "";

  bookings.forEach((b) => {
    bookingsDiv.innerHTML += `
      <div class="booking">
        <b>${b.passengerName}</b><br>
        ${b.source} → ${b.destination}<br>
        Train: ${b.trainNumber}<br>
        Date: ${new Date(b.journeyDate).toDateString()}
      </div>
    `;
  });
}

loadBookings();