import React from 'react';
import { Card, Progress } from 'antd';

const data = [
  {
    location: 'Head Office',
    cellname: 'Cell 1',
    itemName: 'Item X',
    userList: ['User1', 'User2', 'User3'],
    progress: 40  // Assuming progress is a percentage (e.g., 40%)
  },
  {
    location: 'Dordrecht',
    cellname: 'Cell 2',
    itemName: 'Item Y',
    userList: ['User4', 'User5'],
    progress: 70
  },
  {
    location: 'Test',
    cellname: 'Cell 2',
    itemName: 'Item Y',
    userList: ['User4', 'User5'],
    progress: 60
  },
  // Add more objects as needed
];

const ItemCards = () => {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}>
      {data.map((item, index) => (
        <Card key={index} title={`${item.location} - ${item.cellname}`}>
          <p><strong>Item Name:</strong> {item.itemName}</p>
          <p><strong>User List:</strong> {item.userList.join(', ')}</p>
          <Progress percent={item.progress} />
        </Card>
      ))}
    </div>
  );
};

export default ItemCards;