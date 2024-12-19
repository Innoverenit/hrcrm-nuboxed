import React, { useEffect,useState} from 'react';
import { Card, Progress } from 'antd';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {getProductionCellList} from "../Production/ProductionAction"
import { MultiAvatar } from '../../Components/UI/Elements';

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

const ItemCards = (props) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Function to get today's date in the desired format
  const getTodayDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const dd = String(today.getDate()).padStart(2, '0');

    return `${yyyy}-${mm}-${dd}T00:00:00Z`;
  };
  useEffect(() => {
    const today = getTodayDate();
    setStartDate(today);
    setEndDate(today);
  }, []);
  console.log(startDate)

  useEffect(() => {
    props.getProductionCellList(props.orgId,startDate,endDate);
    // setPage(page + 1);
    // props.getRoomRackByLocId(props.locationId, props.orgId);
}, [startDate,endDate]);
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}>
      {/* {data.map((item, index) => ( */}
         {props.productionCellList.map((item, index) => (
        <Card key={index} title={`${item.locationName} - ${item.cellChamber}`}>
          <p><strong>Item Name:</strong> {item.productName}</p>
          <Progress percent={item.percent==="Infinity"?0:item.percent} />
          {item.userList.map((itemlist, ind) => {
              return (
          // <p><strong>User List:</strong> {item.userList.join(', ')}</p>
          <MultiAvatar
          primaryTitle={itemlist.userName}
          imgWidth={"1.8rem"}
          imgHeight={"1.8rem"}
          />
              )
        })}
        </Card>
      ))}
    </div>
  );
};


const mapStateToProps = ({ production,auth }) => ({
  
  productionCellList:production.productionCellList,
  userId: auth.userDetails.userId,
  orgId: auth.userDetails.organizationId,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
    
      getProductionCellList,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ItemCards);