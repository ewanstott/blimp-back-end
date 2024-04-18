function addMessage(message_id, sender_id, receiver_id, userType, sent_at) {
  return `INSERT INTO messages
                (message_id, sender_id, receiver_id, userType, sent_at)
                    VALUES
                      ("${message_id}", "${sender_id}", "${receiver_id}", "${message}", "${sent_at}");`;
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
