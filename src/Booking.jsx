import React, { useState, useEffect } from "react";
import axios from "axios";

function Booking() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [message, setMessage] = useState("");

  const fetchSlots = async () => {
    try {
      const response = await axios.get(
        `https://slot-bookingdb-default-rtdb.firebaseio.com/meetingSlot.json`
      );
      setSlots(response.data);
      console.log(response.data);
      
    } catch (error) {
      console.error("Error fetching slots:", error);
    }
  };

  const bookSlot = async () => {
    const userName = sessionStorage.getItem("userName");
    try {
      const response = await axios.post(
        "https://slot-bookingdb-default-rtdb.firebaseio.com/meetingSlot.json",
        {
          date,
          time: time || selectedSlot,
          userId: userName,
        }
      );
      setMessage(
        response.data.success
          ? "Slot booked successfully!"
          : response.data.error
      );
      fetchSlots(); // Refresh slots
    } catch (error) {
      console.error("Error booking slot:", error);
    }
  };

  useEffect(() => {
    if (date) fetchSlots();
  }, [date]);

  return (
    <div className="container">
      <h1>Book an Appointment</h1>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <input
        type="time"
        value={time}
        min="09:00" max="18:00"
        onChange={(e) => setTime(e.target.value)}
      />
      <div className="slots">
        {slots.length > 0 ? (
          slots.map((slot, index) => (
            <button key={index} onClick={() => setSelectedSlot(slot)}>
              {slot}
            </button>
          ))
        ) : (
          <p>No slots available for this date.</p>
        )}
      </div>
      {<button onClick={bookSlot}>Book {selectedSlot}</button>}
      {message && <p>{message}</p>}
    </div> //selectedSlot &&
  );
}

export default Booking;
