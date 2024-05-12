function addMessage(sender_id, receiver_id, message) {
  return `INSERT INTO messages
                (sender_id, receiver_id, message, sent_at)
                    VALUES
                      (${sender_id}, ${receiver_id}, "${message}", NOW());`;
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

function getMessagedPractitioners(userId) {
  return `
  SELECT DISTINCT name, id FROM messages
  JOIN practitioners on messages.receiver_id = practitioners.id
  WHERE sender_id = ${userId};
  `;
}

//function will retrieve distinct patients who have messaged the specified practitioner
function getMessagedPatients(practitionerId) {
  return `
    SELECT DISTINCT name, id FROM messages
    JOIN patients ON messages.sender_id = patients.id
    WHERE receiver_id = ${practitionerId};
  `;
}

////////////////NEW///////////////
// function getMessageHistory(userId, practitionerId) {
//   return `
//     SELECT *
//     FROM messages
//     WHERE (sender_id = ${userId} AND receiver_id = ${practitionerId})
//     OR (sender_id = ${practitionerId} AND receiver_id = ${userId})
//   `;
// }

// In your MySQL queries file

function getMessageHistory(userId, practitionerId) {
  return `
    SELECT 
      m.*, 
      p.name AS senderName, 
      'practitioner' AS senderType
    FROM messages m
    JOIN practitioners p ON m.sender_id = p.id
    WHERE (m.sender_id = ${userId} AND m.receiver_id = ${practitionerId})
    OR (m.sender_id = ${practitionerId} AND m.receiver_id = ${userId})
    UNION
    SELECT 
      m.*, 
      pt.name AS senderName, 
      'patient' AS senderType
    FROM messages m
    JOIN patients pt ON m.sender_id = pt.id
    WHERE (m.sender_id = ${userId} AND m.receiver_id = ${practitionerId})
    OR (m.sender_id = ${practitionerId} AND m.receiver_id = ${userId})
  `;
}

////////////////NEW///////////////

module.exports = {
  addMessage,
  deleteMessage,
  getReceived,
  getSent,
  getMessagedPractitioners,
  getMessagedPatients,
  getMessageHistory,
};
