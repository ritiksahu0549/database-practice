const form = document.getElementById("bookingForm");
const bookingsList = document.getElementById("bookingsList");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const bookingId = document.getElementById("bookingId").value;

  const bookingData = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    busType: document.getElementById("busType").value,
    checkInDate: document.getElementById("checkInDate").value,
    checkOutDate: document.getElementById("checkOutDate").value,
  };

  if (bookingId) {
    // UPDATE
    await fetch(`http://localhost:5000/api/bookings/${bookingId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bookingData),
    });
  } else {
    // CREATE
    await fetch("http://localhost:5000/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bookingData),
    });
  }

  form.reset();
  document.getElementById("bookingId").value = "";
  loadBookings();
});

// LOAD BOOKINGS
async function loadBookings() {
  const res = await fetch("http://localhost:5000/api/bookings");
  const data = await res.json();

  bookingsList.innerHTML = "";
  data.forEach(b => {
    const div = document.createElement("div");
    div.classList.add("booking-item");
    div.innerHTML = `
      <p><strong>${b.name}</strong> (${b.email})</p>
      <p>Bus Type: ${b.busType}</p>
      <p>${new Date(b.checkInDate).toDateString()} - ${new Date(b.checkOutDate).toDateString()}</p>
      <div class="actions">
        <button onclick="editBooking('${b._id}','${b.name}','${b.email}','${b.busType}','${b.checkInDate}','${b.checkOutDate}')">Edit</button>
        <button class="delete" onclick="deleteBooking('${b._id}')">Delete</button>
      </div>
    `;
    bookingsList.appendChild(div);
  });
}

// EDIT Booking
function editBooking(id, name, email, busType, checkInDate, checkOutDate) {
  document.getElementById("bookingId").value = id;
  document.getElementById("name").value = name;
  document.getElementById("email").value = email;
  document.getElementById("busType").value = busType;
  document.getElementById("checkInDate").value = checkInDate.split("T")[0];
  document.getElementById("checkOutDate").value = checkOutDate.split("T")[0];
}

// DELETE Booking
async function deleteBooking(id) {
  if (confirm("Are you sure you want to delete this booking?")) {
    await fetch(`http://localhost:5000/api/bookings/${id}`, { method: "DELETE" });
    loadBookings();
  }
}

fetch("http://localhost:5000/api/bookings", {
    method: "GET"
})
.then(res => res.json())
.then(data => console.log(data))
.catch(err => console.log(err));

loadBookings();
