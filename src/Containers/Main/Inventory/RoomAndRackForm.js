import { Button, Input,Select } from 'antd'
import React, { useState,useEffect } from 'react'
import { addRoomAndRackInInventory,getRoomRackByLocId,updateRoomRackId } from "./InventoryAction"
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { CloseOutlined } from "@ant-design/icons"
import { FormattedMessage } from 'react-intl';
import { BundleLoader } from '../../../Components/Placeholder';
import BorderColorIcon from '@mui/icons-material/BorderColor';

const { Option } = Select;

const RoomAndRackForm = (props) => {

  useEffect(()=>{
props.getRoomRackByLocId(props.rowData.locationDetailsId,props.orgId);
  },[]);
  
  const [rows, setRows] = useState([]);

  const [editedFields, setEditedFields] = useState({});
  const [editroomRackId, setEditroomRackId] = useState(null);

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

     if(props.fetchingRoomRack) {
      return <BundleLoader/>
     }    

     const handleUpChange = (roomRackId, fieldName, value) => {
      setEditedFields((prevFields) => ({
        ...prevFields,
        [roomRackId]: {
          ...prevFields[roomRackId],
          [fieldName]: value,
        },
      }));
    };
  
    const handleEditClick = (roomRackId) => {
      setEditroomRackId(roomRackId);
    };
    const handleCancelClick = (roomRackId) => {
      setEditedFields((prevFields) => ({ ...prevFields, [roomRackId]: undefined }));
      setEditroomRackId(null);
    };

    function handleUpdate(roomRackId,zone,rack,zoneType,description){
      const updatedData = {
        locationDetailsId: props.rowData.locationDetailsId,
        userId: props.userId,
        zone: editedFields[roomRackId]?.zone !== undefined ? editedFields[roomRackId].zone : zone,
        rack: editedFields[roomRackId]?.rack !== undefined ? editedFields[roomRackId].rack : rack,
        zoneType: editedFields[roomRackId]?.zoneType !== undefined ? editedFields[roomRackId].zoneType : zoneType,
        description: editedFields[roomRackId]?.description !== undefined ? editedFields[roomRackId].description : description,
        orgId:props.orgId
      };
      props.updateRoomRackId(updatedData,roomRackId);
    }

  return (
    <>
    <div>
      <Button type="primary" onClick={handleAddRow} style={{ marginBottom: '10px' }}>
        Add Zone
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
          </div>
          
          <Button type="primary" onClick={() => handleSubmit(index)}>
            Submit
          </Button>
          <CloseOutlined onClick={() => handleRemoveRow(index)}/>
          </div>
      ))}

        <div className=' flex justify-end sticky z-auto'>
        <div class="rounded-lg m-5 p-2 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
          <div className=" flex justify-between w-[99%] px-2 bg-transparent font-bold sticky top-0 z-10">          <div className=""></div>
            <div className=" md:w-[5rem]">Zone Code</div>
            <div className=" md:w-[4.2rem] ">#Rack</div>
            <div className=" md:w-[5.2rem] ">Zone Type</div>
            <div className=" md:w-[5.1rem]">Description</div>
            <div className="w-12"></div>             </div>

          {props.roomRackbyLoc.map((item) => {
            return (
              <div key={item.roomRackId}>
                <div className="flex rounded-xl justify-between mt-2 bg-white h-[2.75rem] items-center p-3 "
                >

                  <div className=" flex font-medium flex-col md:w-[9.1rem] max-sm:w-full  ">
                    <div class="text-sm text-cardBody font-semibold  font-poppins cursor-pointer">
                    {editroomRackId === item.roomRackId ? (
                       <Input
                       class="border-[2px] border-black w-12"
                      //  style={{border:"2px solid black"}}
                       value={editedFields[item.roomRackId]?.zone !== undefined ? editedFields[item.roomRackId].zone : item.zone}
                       onChange={(e) => handleUpChange(item.roomRackId, 'zone', e.target.value)}
                       />
                       
                    ) : (
                      <div className="font-normal text-sm text-cardBody font-poppins">
                        <div> {item.zone}</div>
                      </div>
                    )}
                    </div>
                  </div>

                  <div className=" flex font-medium flex-col  md:w-[7.1rem] max-sm:flex-row w-full max-sm:justify-between  ">

                    <div class=" text-xs text-cardBody font-poppins">
                    {editroomRackId === item.roomRackId ? (
                       <Input
                       class="border-[2px] border-black w-12"
                      //  style={{border:"2px solid black"}}
                       value={editedFields[item.roomRackId]?.rack !== undefined ? editedFields[item.roomRackId].rack : item.rack}
                       onChange={(e) => handleUpChange(item.roomRackId, 'rack', e.target.value)}
                       />
                       
                    ) : (
                      <div className="font-normal text-sm text-cardBody font-poppins">
                        <div> {item.rack}</div>
                      </div>
                    )}
                    </div>

                  </div>
                  <div className=" flex font-medium flex-col md:w-[6.5rem] max-sm:flex-row w-full max-sm:justify-between ">
                    <div class=" text-xs text-cardBody font-poppins">
                    {editroomRackId === item.roomRackId ? (
                       <Select
                       classNames="w-32"
                       value={editedFields[item.roomRackId]?.zoneType !== undefined ? editedFields[item.roomRackId].zoneType : item.zoneType}
                       onChange={(value) => handleUpChange(value, item.key, 'zoneType')}
                       >
                       <Option value="entry">Entry</Option>
                      <Option value="exit">Exit</Option>
                      </Select>
                    ) : (
                      <div className="font-normal text-sm text-cardBody font-poppins">
                        <div> {item.zoneType}</div>
                      </div>
                    )}
                    </div>
                  </div>
                  <div className=" flex font-medium flex-col md:w-[6.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                  {editroomRackId === item.roomRackId ? (
                       <Input
                       class="border-[2px] border-black w-12"
                      //  style={{border:"2px solid black"}}
                       value={editedFields[item.roomRackId]?.description !== undefined ? editedFields[item.roomRackId].description : item.description}
                       onChange={(e) => handleUpChange(item.roomRackId, 'description', e.target.value)}
                       />
                       
                    ) : (
                      <div className="font-normal text-sm text-cardBody font-poppins">
                        <div> {item.description}</div>
                      </div>
                    )}
                  </div>

                  <div class="flex md:items-center">


                    <div class="flex flex-col w-20 max-sm:flex-row max-sm:w-[10%]">
                      <div>
                      {editroomRackId === item.roomRackId ? (
                        <>
                      <Button 
                      type="primary"
                      onClick={() => handleUpdate(item.roomRackId,item.zone,item.rack,item.zoneType,item.description )}>
                        Save
                      </Button>
                        <Button 
                         type="primary"
                        onClick={() => handleCancelClick(item.roomRackId)} className="ml-[0.5rem]">
                        Cancel
                      </Button>
                      </>
                      
                    ) : (
                      <BorderColorIcon
                      className="!text-base cursor-pointer text-[tomato] flex justify-center items-center mt-1 ml-1"
                        tooltipTitle="Edit"
                        iconType="edit"
                        onClick={() => handleEditClick(item.roomRackId)}
                      />
                    )}
                      </div>

                    </div>
                  </div>

                </div>
              </div>
            );
          })}

        </div>
      </div>
      </div>
      </>
  );
};

const mapStateToProps = ({ inventory, auth, locations }) => ({
    addingRoomAndRackInInventory: inventory.addingRoomAndRackInInventory,
    userId:auth.userDetails.userId,
    roomRackbyLoc:inventory.roomRackbyLoc,
    orgId:auth.userDetails.organizationId,
    fetchingRoomRack:inventory.fetchingRoomRack
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