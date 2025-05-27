function sortMessages(contact) {
  let result = [];
  // Messages that contact sent to the user
  contact.messagesSent.forEach((msg) => {
    result.push({ ...msg, direction: 'incoming' });
  });
  // Messages that the user sent to contact
  contact.messagesReceived.forEach((msg) => {
    result.push({ ...msg, direction: 'outgoing' });
  });
  result = result.sort((a, b) => new Date(a.sendAt) - new Date(b.sendAt));
  return result;
}

export default sortMessages;
