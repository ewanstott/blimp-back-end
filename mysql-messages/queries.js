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

function getMessage(token) {
  return `SELECT * FROM messages
                      WHERE messaged.id = "${id}";`;
}

// JOIN sessions ON messages.id = sessions.id

module.exports = {
  addMessage,
  deleteMessage,
  // updateMessage,
  getMessage,
};
