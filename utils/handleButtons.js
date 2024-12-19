// Import for fetch
import { BACK_IP } from "../env";

const goRequestScreen = (token, eventId) => {
  fetch(`${BACK_IP}/events/participantEvent`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: token,
    },
    body: JSON.stringify({
      eventId: eventId,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error("Error:", error.message);
    });
};

module.exports = {
  goRequestScreen,
};
