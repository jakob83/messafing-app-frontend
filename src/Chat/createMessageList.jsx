import { Message } from '@chatscope/chat-ui-kit-react';

function createMessageList(messages) {
  return messages.map((msg) => {
    return (
      <Message
        key={msg.id}
        model={{
          message: msg.content,
          sentTime: new Date(msg.sendAt).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
          sender: msg.sender.name,
          direction: msg.direction,
        }}
      >
        <Message.Footer>
          {new Date(msg.sendAt).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </Message.Footer>
      </Message>
    );
  });
}

export default createMessageList;
