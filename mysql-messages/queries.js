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

// function updateMessage(key, value, id) {
//   return `UPDATE messages
//                       SET ${key} = "${value}"
//                           WHERE messages.id = ${id};`;
// }

function getReceived(user_id, practitionerId) {
  return `SELECT message_id AS messageId, sender_id AS senderId, sent_at message FROM messages
                      WHERE messages.receiver_id = ${user_id} AND sender_id = "${practitionerId}"`;
}

function getSent(user_id, practitionerId) {
  return `SELECT message_id AS messageId, receiver_id AS receiverId, message FROM messages
  WHERE messages.sender_id = ${user_id} AND receiver_id = "${practitionerId}";`;
}

// JOIN sessions ON messages.id = sessions.id

module.exports = {
  addMessage,
  deleteMessage,
  // updateMessage,
  getReceived,
  getSent,
};
