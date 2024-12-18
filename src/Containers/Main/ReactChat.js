import React, { useEffect } from 'react';
import { Widget, addResponseMessage } from 'react-chat-widget';
import '../../Containers/Employees/Child/EmployeeTable/styled.css'

function ReactChat() {
  useEffect(() => {
    addResponseMessage('Welcome to this *awesome* chat!');
  }, []);

  const handleNewUserMessage = (newMessage) => {
    console.log(`New message incoming! ${newMessage}`);
    // Now send the message throught the backend API
  };

    return (
      <div className="App">
        <Widget
          handleNewUserMessage={handleNewUserMessage}
         // profileAvatar={logo}
          title="My new awesome title"
          subtitle="And my cool subtitle"
        />
      </div>
    );
}

export default ReactChat;