import { Button, Input,Select } from 'antd'
import React, { useState,useEffect } from 'react'
import { addRoomAndRackInInventory,getRoomRackByLocId,updateRoomRackId } from "./InventoryAction"
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { CloseOutlined } from "@ant-design/icons"
import { FormattedMessage } from 'react-intl';

const { Option } = Select;

const RoomAndRackForm = (props) => {

  useEffect(()=>{
props.getRoomRackByLocId(props.rowData.locationDetailsId,props.orgId);
  },[]);
  
  const [rows, setRows] = useState([]);

  const handleAddRow = () => {
    const newRow = { zone: '', rack: '', zoneType: '',description:'' };
    setRows([...rows, newRow]);
  };

  const handleRemoveRow = (index) => {
    const updatedRows = [...rows];
    updatedRows.splice(index, 1);
    setRows(updatedRows);
  };

  const handleChange = (index, key, value) => {
    const updatedRows = [...rows];
    updatedRows[index][key] = value;
    setRows(updatedRows);
  };

  const handleSubmit = (index) => {
    const row = rows[index];
    if (!row.zone || !row.rack || !row.zoneType) {
      alert('Please fill all required fields (Zone, Rack, Zone Type) before submitting.');
      return;
    }
    // Perform your API call here with the row data
    console.log('Submitting Row:', row);
    const payload = {
              locationDetailsId: props.rowData.locationDetailsId,
              userId: props.userId,
              // roomRackList:row,
              zone: row.zone, rack:row.rack,zoneType:row.zoneType,description:row.description,
              orgId:props.orgId
            };
            props.addRoomAndRackInInventory(payload);
            setRows([{ zone: '', rack: '',zoneType:'',description:''}]);
          };
  return (
    <div>
      <Button type="primary" onClick={handleAddRow} style={{ marginBottom: '10px' }}>
        Add Row
      </Button>
      {rows.map((row, index) => (
        <div key={index} class="flex">
          <div class="flex justify-around w-[30rem]">
          <div>
              <label>Zone Code</label>
             <div class="w-24">
          <Input
            
            value={row.zone}
            onChange={(e) => handleChange(index, 'zone', e.target.value)}
            placeholder="Zone"
          />
          </div>
             </div>
             <div>
              <label>Description</label>
             <div class="w-24">
          <Input
            
            value={row.description}
            onChange={(e) => handleChange(index, 'description', e.target.value)}
            placeholder="Description"
          />
          </div>
             </div>
             <div>
              <label>#Rack</label>
             <div class="w-24"></div>
          <Input
           
            value={row.rack}
            onChange={(e) => handleChange(index, 'rack', e.target.value)}
            placeholder="Rack"
          /></div>
          <div>
              <label>Zone Type</label>
             <div class="w-24">
          <Select
            value={row.zoneType}
            onChange={(value) => handleChange(index, 'zoneType', value)}
            placeholder="Zone Type"
          >
            <Option value="entry">Entry</Option>
            <Option value="exit">Exit</Option>
          </Select></div></div>
          </div>
          
          <Button type="primary" onClick={() => handleSubmit(index)}>
            Submit
          </Button>
          <CloseOutlined onClick={() => handleRemoveRow(index)}/>
          </div>
      ))}
    </div>
  );
};

const mapStateToProps = ({ inventory, auth, locations }) => ({
    addingRoomAndRackInInventory: inventory.addingRoomAndRackInInventory,
    userId:auth.userDetails.userId,
    roomRackbyLoc:inventory.roomRackbyLoc,
    orgId:auth.userDetails.organizationId
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            addRoomAndRackInInventory,
            getRoomRackByLocId,
            updateRoomRackId
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(RoomAndRackForm);


// const RoomAndRackForm = (props) => {

//   useEffect(()=>{
// props.getRoomRackByLocId(props.rowData.locationDetailsId)
//   },[]);

//     const [rows, setRows] = useState([{ zone: '', rack: '',zoneType:''}]);
//     const [zonetype, setZonetype]=useState("");

//     const handleChange = (index, key, value) => {
//       const updatedRows = [...rows];
//       updatedRows[index][key] = value;
//       setRows(updatedRows);
//     };
  
//     const handleAddRow = () => {
//       setRows([...rows, { zone: '', rack: '',zoneType:'' }]);
//     };
  
//     const handleRemoveRow = (index) => {
//       const updatedRows = [...rows];
//       updatedRows.splice(index, 1);
//       setRows(updatedRows);
//     };
//     const handleSubmit = () => {
//       const dataToSend = rows.map((row) => ({
//         zone: row.zone,
//         rack: row.rack,
//         userId: props.userId,
//         zoneType:row.zoneType,
//         chamberList: ['A1', 'A2', 'A3'], 
//       }));

//       const payload = {
//         locationDetailsId: props.rowData.locationDetailsId,
//         roomRackList: dataToSend,
//       };
//       props.addRoomAndRackInInventory(payload);
//       setRows([{ zone: '', rack: '',zoneType:''}]);
//     };

//     useEffect(() => {
//       if (props.roomRackbyLoc) {
//         const initialRows = props.roomRackbyLoc.map((rack) => ({
//           zone: rack.zone,
//           rack: rack.rack.toString(),
//         }));
//         setRows(initialRows);
//       }
//     }, [props.roomRackbyLoc]);

//     const handleSelectChange = (index, value) => {
//       const updatedRows = [...rows];
//       updatedRows[index]['zoneType'] = value;
//       setRows(updatedRows);
//     };

//    const handleUpdate = () => {
//     const updatedData = rows.map((row) => ({
//       zone: row.zone,
//       rack: row.rack,
//       userId: props.userId,
//       zoneType: row.zoneType,
//       // Include other fields as needed
//     }));
  
//     const payload = {
//       locationDetailsId: props.rowData.locationDetailsId,
//       roomRackList: updatedData,
//     };

//       // const payload = {
//       //   locationDetailsId: props.rowData.locationDetailsId,
       
//       //   roomRackList: [
//       //    {
//       //     roomRackChamberLinkId: "",
//       //  chamber: "A1"
//       // },
//       // {
//       //   roomRackChamberLinkId: "",
//       //  chamber: "V1"
//       // }
//       //   ],
//       //   userId:  props.userId,
    
//       // };
//       props.updateRoomRackId(payload);
     
//     };

//     return (
//         <>
//       <div>
//         <div>
//         {rows.map((row, index) => (
          
//           <div class="flex" key={index}>
//              <div class="flex justify-around w-[30rem]">
//              <div>
//                     {/* <b>{`Word ${index + 1}`}</b> */}
//                     <Button type="primary" onClick={handleAddRow}><FormattedMessage
//                 id="app.addrow"
//                 defaultMessage="Add Row"
//               /></Button>
//                   </div>
//               <div>
//               <label>Zone</label>
//              <div class="w-24">
//             <Input
//               type="text"
//               value={row.zone}
//               onChange={(e) => handleChange(index, 'zone', e.target.value)}
//               placeholder="Zone"
//             />
//             </div>
//             </div>
//             <div>
//               <label>Zone Type</label>
//              <div class="w-24">
//              <Select
//                   value={row.zoneType}
//                   defaultValue={row.zoneType}
//                   onChange={(value) => handleSelectChange(index, value)}>
//           <Option value="entry">Entry</Option>
//           <Option value="exit">Exit</Option>
//         </Select>
           
//             </div>
//             </div>
//             <div>
//               <label>#Rack</label>
//             <div class="w-24">
//             <Input
//               type="text"
//               value={row.rack}
//               onChange={(e) => handleChange(index, 'rack', e.target.value)}
//               placeholder="Rack"
//             />
//             </div>
//             </div>
          
            
//          </div>
//       <div class="flex justify-around">   
//         {/*  <div>
//               <label>Rack 2</label>
//             <div class="w-24">
//             <Input
//               type="text"
//               value={row.input2}
//               onChange={(e) => handleChange(index, 'input2', e.target.value)}
//               placeholder="Input 2"
//             />
//             </div>
//             </div>
//             <div>
//               <label>Rack 3</label>
//             <div class="w-24">
//             <Input
//               type="text"
//               value={row.input2}
//               onChange={(e) => handleChange(index, 'input2', e.target.value)}
//               placeholder="Input 2"
//             />
//             </div>
//             </div>
//             <div>
//               <label>Rack 4</label>
//             <div class="w-24">
//             <Input
//               type="text"
//               value={row.input2}
//               onChange={(e) => handleChange(index, 'input2', e.target.value)}
//               placeholder="Input 2"
//             />
//             </div>
//             </div>*/}
//             <div class="w-4">
//          <CloseOutlined onClick={() => handleRemoveRow(index)}/>
//          </div>
//           </div> 
//              <Button type="primary" loading={props.addingRoomAndRackInInventory} onClick={handleSubmit}> <FormattedMessage
//                 id="app.Submit"
//                 defaultMessage="Submit"
//               /></Button>
//           </div>
//         ))}
//          </div>
//          </div>
//          <div class="flex justify-end">
//         {/* <Button type="primary" loading={props.addingRoomAndRackInInventory} onClick={handleUpdate}> <FormattedMessage
//                 id="app.update"
//                 defaultMessage="Update"
//               /></Button>
//               <Button type="primary" loading={props.addingRoomAndRackInInventory} onClick={handleSubmit}> <FormattedMessage
//                 id="app.Submit"
//                 defaultMessage="Submit"
//               /></Button> */}
//      </div>
// </>
//     )
// }