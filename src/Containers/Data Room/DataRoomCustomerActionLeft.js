import React,{lazy} from "react";
const DataRoomCustomerProfileCard= lazy(() =>
  import("./DataRoomCustomerProfileCard")
);


const UserData = [
  {
    name: "Ramesh",
    location: "Mumbai",
    age: "20",
    department: "IT",
  },
  {
    name: "Mukesh",
    location: "Odisha",
    age: "24",
    department: "Finance",
  },
];

function DataRoomCustomerActionLeft(props) {
  console.log(props.rules);


  const containerStyle = {
    maxHeight: "400px",
    overflowY: "auto",
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  };

  const cardStyle = {
    border: "1px solid #ddd",
    padding: "20px",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  };

  const headingStyle = {
    margin: "0 0 10px",
    fontSize: "1.5rem",
  };

  const paragraphStyle = {
    margin: "5px 0",
    fontSize: "1rem",
    color: "#555",
  };
  return (
    <div>
      <div class=" flex flex-col flex-block"
      // flexDirection="column" style={{ display: "block" }}
       >
        <div style={containerStyle}>
      {UserData.map((user, index) => (
        <div key={index} style={cardStyle}>
          <h2 style={headingStyle}>{user.name}</h2>
          <p style={paragraphStyle}>
            <strong>Location:</strong> {user.location}
          </p>
          <p style={paragraphStyle}>
            <strong>Age:</strong> {user.age}
          </p>
          <p style={paragraphStyle}>
            <strong>Department:</strong> {user.department}
          </p>
        </div>
      ))}
    </div>
      </div>
    </div>
  );
}
export default DataRoomCustomerActionLeft;