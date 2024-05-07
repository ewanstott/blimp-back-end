//function will retrieve distinct patients who have messaged the specified practitioner
function getMessagedPatients(practitionerId) {
  return `
    SELECT DISTINCT name, id FROM messages
    JOIN patients ON messages.sender_id = patients.id
    WHERE receiver_id = ${practitionerId};
  `;
}

module.exports = {
  getMessagedPatients,
};
