// utils/calculatePrice.js
const msPerDay = 24 * 60 * 60 * 1000;

function nightsBetween(checkIn, checkOut) {
  const diff = new Date(checkOut) - new Date(checkIn);
  return Math.ceil(diff / msPerDay);
}

function calculatePrice(pricePerNight, checkIn, checkOut) {
  const nights = nightsBetween(checkIn, checkOut);
  return pricePerNight * nights;
}

module.exports = { nightsBetween, calculatePrice };
