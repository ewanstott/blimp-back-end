function addMessage(sender_id, receiver_id, message) {
  return `INSERT INTO messages
                (sender_id, receiver_id, message)
                    VALUES
                      (${sender_id}, ${receiver_id}, "${message}");`;
}

function deleteMessage(id) {
  return `DELETE messages FROM messages
                            WHERE messages.id = ${id}`;
}

function getReceived(user_id, practitionerId) {
  return `SELECT message_id AS messageId, sender_id AS senderId, sent_at message FROM messages
                      WHERE messages.receiver_id = ${user_id} AND sender_id = "${practitionerId}"`;
}

function getSent(user_id, practitionerId) {
  return `SELECT message_id AS messageId, receiver_id AS receiverId, message FROM messages
  WHERE messages.sender_id = ${user_id} AND receiver_id = "${practitionerId}";`;
}

////////////////NEW///////////////
function getMessagedPractitioners(userId) {
  return `
  SELECT * FROM messages
	JOIN practitioners on messages.sender_id = practitioners.id
	WHERE receiver_id = ${userId};
  `;
}
////////////////NEW///////////////

////////////////NEW///////////////
function getMessageHistory(userId, practitionerId) {
  return `
    SELECT *
    FROM messages
    WHERE (sender_id = ${userId} AND receiver_id = ${practitionerId})
    OR (sender_id = ${practitionerId} AND receiver_id = ${userId})
  `;
}
////////////////NEW///////////////

module.exports = {
  addMessage,
  deleteMessage,
  getReceived,
  getSent,
  getMessagedPractitioners,
  getMessageHistory,
};
