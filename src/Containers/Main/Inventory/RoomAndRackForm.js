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
props.getRoomRackByLocId(props.rowData.locationDetailsId)
  },[]);

    const [rows, setRows] = useState([{ zone: '', rack: '',zoneType:''}]);
    const [zonetype, setZonetype]=useState("");

    const handleChange = (index, key, value) => {
      const updatedRows = [...rows];
      updatedRows[index][key] = value;
      setRows(updatedRows);
    };
  
    const handleAddRow = () => {
      setRows([...rows, { zone: '', rack: '',zoneType:'' }]);
    };
  
    const handleRemoveRow = (index) => {
      const updatedRows = [...rows];
      updatedRows.splice(index, 1);
      setRows(updatedRows);
    };
    const handleSubmit = () => {
      const dataToSend = rows.map((row) => ({
        zone: row.zone,
        rack: row.rack,
        userId: props.userId,
        zoneType:row.zoneType,
        chamberList: ['A1', 'A2', 'A3'], 
      }));

      const payload = {
        locationDetailsId: props.rowData.locationDetailsId,
        roomRackList: dataToSend,
      };
      props.addRoomAndRackInInventory(payload);
      setRows([{ zone: '', rack: '',zoneType:''}]);
    };

    useEffect(() => {
      if (props.roomRackbyLoc) {
        const initialRows = props.roomRackbyLoc.map((rack) => ({
          zone: rack.zone,
          rack: rack.rack.toString(),
        }));
        setRows(initialRows);
      }
    }, [props.roomRackbyLoc]);

    const handleSelectChange = (index, value) => {
      const updatedRows = [...rows];
      updatedRows[index]['zoneType'] = value;
      setRows(updatedRows);
    };

   const handleUpdate = () => {
    const updatedData = rows.map((row) => ({
      zone: row.zone,
      rack: row.rack,
      userId: props.userId,
      zoneType: row.zoneType,
      // Include other fields as needed
    }));
  
    const payload = {
      locationDetailsId: props.rowData.locationDetailsId,
      roomRackList: updatedData,
    };

      // const payload = {
      //   locationDetailsId: props.rowData.locationDetailsId,
       
      //   roomRackList: [
      //    {
      //     roomRackChamberLinkId: "",
      //  chamber: "A1"
      // },
      // {
      //   roomRackChamberLinkId: "",
      //  chamber: "V1"
      // }
      //   ],
      //   userId:  props.userId,
    
      // };
      props.updateRoomRackId(payload);
     
    };

    return (
        <>
      <div>
        <div>
        {rows.map((row, index) => (
          
          <div class="flex" key={index}>
             <div class="flex justify-around w-[30rem]">
             <div>
                    {/* <b>{`Word ${index + 1}`}</b> */}
                    <Button type="primary" onClick={handleAddRow}><FormattedMessage
                id="app.addrow"
                defaultMessage="Add Row"
              /></Button>
                  </div>
              <div>
              <label>Zone</label>
             <div class="w-24">
            <Input
              type="text"
              value={row.zone}
              onChange={(e) => handleChange(index, 'zone', e.target.value)}
              placeholder="Zone"
            />
            </div>
            </div>
            <div>
              <label>Zone Type</label>
             <div class="w-24">
             <Select
                  value={row.zoneType}
                  defaultValue={row.zoneType}
                  onChange={(value) => handleSelectChange(index, value)}>
          <Option value="entry">Entry</Option>
          <Option value="exit">Exit</Option>
        </Select>
           
            </div>
            </div>
            <div>
              <label>#Rack</label>
            <div class="w-24">
            <Input
              type="text"
              value={row.rack}
              onChange={(e) => handleChange(index, 'rack', e.target.value)}
              placeholder="Rack"
            />
            </div>
            </div>
          
            
         </div>
         <div class="flex justify-around">
         <div>
              <label>Rack 2</label>
            <div class="w-24">
            <Input
              type="text"
              value={row.input2}
              onChange={(e) => handleChange(index, 'input2', e.target.value)}
              placeholder="Input 2"
            />
            </div>
            </div>
            <div>
              <label>Rack 3</label>
            <div class="w-24">
            <Input
              type="text"
              value={row.input2}
              onChange={(e) => handleChange(index, 'input2', e.target.value)}
              placeholder="Input 2"
            />
            </div>
            </div>
            <div>
              <label>Rack 4</label>
            <div class="w-24">
            <Input
              type="text"
              value={row.input2}
              onChange={(e) => handleChange(index, 'input2', e.target.value)}
              placeholder="Input 2"
            />
            </div>
            </div>
            <div class="w-4">
         <CloseOutlined onClick={() => handleRemoveRow(index)}/>
         </div>
          </div>
          </div>
        ))}
         </div>
         </div>
         <div class="flex justify-end">
        <Button type="primary" loading={props.addingRoomAndRackInInventory} onClick={handleUpdate}> <FormattedMessage
                id="app.update"
                defaultMessage="Update"
              /></Button>
              <Button type="primary" loading={props.addingRoomAndRackInInventory} onClick={handleSubmit}> <FormattedMessage
                id="app.Submit"
                defaultMessage="Submit"
              /></Button>
     </div>
</>
    )
}

const mapStateToProps = ({ inventory, auth, locations }) => ({
    addingRoomAndRackInInventory: inventory.addingRoomAndRackInInventory,
    userId:auth.userDetails.userId,
    roomRackbyLoc:inventory.roomRackbyLoc
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


// import { Button, Input } from 'antd'
// import React, { useState } from 'react'
// import { addRoomAndRackInInventory } from "./InventoryAction"
// import { bindActionCreators } from 'redux';
// import { connect } from 'react-redux';
// import { CloseOutlined } from "@ant-design/icons"
// import { FormattedMessage } from 'react-intl';

// const RoomAndRackForm = (props) => {

//     const [rows, setRows] = useState([{ zone: "", rack: "", id: 1, roomFullInd: 0 }]);
//     const [id, setId] = useState(1);
//     const [level, setLevel] = useState(1);

//     function buttonOnClick() {
//         let data = {
//             roomRackList: rows,
//             locationtypeId: props.rowData.locationtypeId,
//             locationDetailsId: props.rowData.locationDetailsId,
//         }
//         props.addRoomAndRackInInventory(data);
//     };

//     function handleChangeValue1(value, a) {
//         setRows((v) => {
//             return v.map((d) => {
//                 if (`${d.id}_value` === a) {
//                     return { ...d, zone: value };
//                 } else {
//                     return d;
//                 }
//             });
//         });
//     }
//     function handleChangeValue2(value, a) {
//         setRows((v) => {
//             return v.map((d) => {
//                 if (`${d.id}_value` === a) {
//                     return { ...d, rack: value };
//                 } else {
//                     return d;
//                 }
//             });
//         });
//     }
//     function handleAddRowClick() {
//         setId((v) => v + 1);
//         setLevel((v) => v + 1);
//         setRows((v) => [...v, { zone: "", rack: "", id: id + 1, roomFullInd: 0 }]);
//     }
//     function handleDelete(row) {
//         setRows((v) => v.filter((d) => d.id !== row.id));
//         setLevel((v) => v - 1);
//     }
//     console.log(rows);
//     return (
//         <>
//             {rows.map((row, i) => {
//                 return (
//                     <>
//                         <div class=" flex justify-between" >
//                             <div class=" w-[39%]" >
//                                 <label>{`Zone ${i + 1}`}</label>
//                                 <Input
//                                     type='text'
//                                     value={`${row.zone}`}
//                                     onChange={(e) =>
//                                         handleChangeValue1(e.target.value, `${row.id}_value`)
//                                     }
//                                 />
//                             </div>
//                             <div class=" w-[39%]" >
//                                 <label>
//                                 <FormattedMessage
//                 id="app.rack"
//                 defaultMessage="Rack"
//               />
//                                     </label>
//                                 <Input
//                                     type='text'
//                                     value={`${row.rack}`}
//                                     onChange={(e) =>
//                                         handleChangeValue2(e.target.value, `${row.id}_value`)
//                                     }
//                                 />
//                             </div>
//                             {rows.length > 1 && (row.id + 1 > row.id) ? (
//                                 <div class=" w-[15%] mt-[1.875rem]" >
//                                     <CloseOutlined
//                                         onClick={() => handleDelete(row)}
//                                         style={{ fontSize: "16px", color: "red" }} />
//                                 </div>
//                             ) : null}

//                         </div>
//                     </>
//                 )
//             })}
//             <div class=" flex justify-end mt-[1.5625rem] mr-[2.9375rem] " 
//            >
//                 <Button
//                     style={{
//                         backgroundColor: "#24a3fb",
//                         marginRight: "15px",
//                         border: "none",
//                     }}
//                     type="primary"
//                     onClick={handleAddRowClick}
//                 >
//                                       <FormattedMessage
//                 id="app.addMore"
//                 defaultMessage="Add More"
//               />
                    
//                 </Button>
//                 <Button
//                     htmlType='submit'
//                     type='primary'
//                     onClick={buttonOnClick}
//                     loading={props.addingRoomAndRackInInventory}
//                 >
//                                              <FormattedMessage
//                 id="app.save"
//                 defaultMessage="Save"
//               />
                    
//                 </Button>
//             </div>

//         </>

//     )
// }

// const mapStateToProps = ({ inventory, auth, locations }) => ({
//     addingRoomAndRackInInventory: inventory.addingRoomAndRackInInventory
// });

// const mapDispatchToProps = (dispatch) =>
//     bindActionCreators(
//         {
//             addRoomAndRackInInventory
//         },
//         dispatch
//     );

// export default connect(mapStateToProps, mapDispatchToProps)(RoomAndRackForm);
