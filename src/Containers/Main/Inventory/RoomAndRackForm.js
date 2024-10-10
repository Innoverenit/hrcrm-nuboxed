// import { Button, Input, Select } from 'antd'
// import React, { useState, useEffect } from 'react'
// import { addRoomAndRackInInventory, getRoomRackByLocId, updateRoomRackId } from "./InventoryAction"
// import { bindActionCreators } from 'redux';
// import { connect } from 'react-redux';
// import { CloseOutlined } from "@ant-design/icons"
// import { FormattedMessage } from 'react-intl';
// import { BundleLoader } from '../../../Components/Placeholder';
// import BorderColorIcon from '@mui/icons-material/BorderColor';

// const { Option } = Select;

// const RoomAndRackForm = (props) => {

//   useEffect(() => {
//     props.getRoomRackByLocId(props.rowData.locationDetailsId, props.orgId);
//   }, []);

//   const [rows, setRows] = useState([]);

//   const [editedFields, setEditedFields] = useState({});
//   const [editroomRackId, setEditroomRackId] = useState(null);

//   const handleAddRow = () => {
//     const newRow = { zone: '', rack: '', zoneType: '', description: '' };
//     setRows([...rows, newRow]);
//   };

//   const handleRemoveRow = (index) => {
//     const updatedRows = [...rows];
//     updatedRows.splice(index, 1);
//     setRows(updatedRows);
//   };

//   const handleChange = (index, key, value) => {
//     const updatedRows = [...rows];
//     updatedRows[index][key] = value;
//     setRows(updatedRows);
//   };

//   const handleSubmit = (index) => {
//     const row = rows[index];
//     if (!row.zone || !row.rack || !row.zoneType) {
//       alert('Please fill all required fields (Zone, Rack, Zone Type) before submitting.');
//       return;
//     }
//     // Perform your API call here with the row data
//     console.log('Submitting Row:', row);
//     const payload = {
//       locationDetailsId: props.rowData.locationDetailsId,
//       userId: props.userId,
//       // roomRackList:row,
//       zone: row.zone, rack: row.rack, zoneType: row.zoneType, description: row.description,
//       orgId: props.orgId
//     };
//     props.addRoomAndRackInInventory(payload, props.rowData.locationDetailsId, props.orgId);
//     setRows([{ zone: '', rack: '', zoneType: '', description: '' }]);
//   };

//   if (props.fetchingRoomRack) {
//     return <BundleLoader />
//   }

//   const handleUpChange = (roomRackId, fieldName, value) => {
//     setEditedFields((prevFields) => ({
//       ...prevFields,
//       [roomRackId]: {
//         ...prevFields[roomRackId],
//         [fieldName]: value,
//       },
//     }));
//   };

//   const handleEditClick = (roomRackId) => {
//     setEditroomRackId(roomRackId);
//   };
//   const handleCancelClick = (roomRackId) => {
//     setEditedFields((prevFields) => ({ ...prevFields, [roomRackId]: undefined }));
//     setEditroomRackId(null);
//   };

//   function handleUpdate(roomRackId, zone, rack, zoneType, description) {
//     const updatedData = {
//       locationDetailsId: props.rowData.locationDetailsId,
//       userId: props.userId,
//       zone: editedFields[roomRackId]?.zone !== undefined ? editedFields[roomRackId].zone : zone,
//       rack: editedFields[roomRackId]?.rack !== undefined ? editedFields[roomRackId].rack : rack,
//       zoneType: editedFields[roomRackId]?.zoneType !== undefined ? editedFields[roomRackId].zoneType : zoneType,
//       description: editedFields[roomRackId]?.description !== undefined ? editedFields[roomRackId].description : description,
//       orgId: props.orgId
//     };
//     props.updateRoomRackId(updatedData, roomRackId);
//   }

//   return (
//     <>
//       <div>
//         <Button type="primary" onClick={handleAddRow} style={{ marginBottom: '10px' }}>
//           Add Zone
//         </Button>
//         {rows.map((row, index) => (
//           <div key={index} class="flex items-center">
//             <div class="flex justify-around w-[30rem]">
//               <div>
//                 <div class="font-bold text-xs font-poppins text-black">Zone Code</div>
//                 <div class="w-24">
//                   <Input

//                     value={row.zone}
//                     onChange={(e) => handleChange(index, 'zone', e.target.value)}
//                     placeholder="Zone"
//                     required 
//                   />
//                 </div>
//               </div>

//               <div>
//                 <div class="font-bold text-xs font-poppins text-black">#Rack</div>
//                 <div class="w-24"></div>
//                 <Input

//                   value={row.rack}
//                   onChange={(e) => handleChange(index, 'rack', e.target.value)}
//                   placeholder="# Number"
//                   type="number"
//                   min="0"  
//                   step="1"
//                   required 
//                 /></div>
//               <div>
//                 <div class="font-bold text-xs font-poppins text-black">Zone Type</div>
//                 <div class="w-24">
//                   <Select
//                     value={row.zoneType}
//                     onChange={(value) => handleChange(index, 'zoneType', value)}
//                     placeholder="Select"
//                   >
//                      <Option value="" disabled>Select</Option>
//                     <Option value="entry">Entry</Option>
//                     <Option value="exit">Exit</Option>
//                   </Select></div></div>
//               <div>
//                 <div class="font-bold text-xs font-poppins text-black">Description</div>
//                 <div class="w-24">
//                   <Input

//                     value={row.description}
//                     onChange={(e) => handleChange(index, 'description', e.target.value)}
//                     placeholder="Description"
//                   />
//                 </div>
//               </div>
//             </div>
//             <div class="mt-4">
//             <Button type="primary" onClick={() => handleSubmit(index)}>
//               Submit
//             </Button>
//             </div>
//             <CloseOutlined onClick={() => handleRemoveRow(index)} />
//           </div>
//         ))}

//         <div className=' flex justify-end sticky z-auto'>
//           <div class="rounded-lg m-5 p-2 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
//             <div className=" flex justify-between w-[100%]  px-2 bg-transparent font-bold sticky top-0 z-10">          
//               <div className=" md:w-[6rem]">Zone Code</div>
//               <div className=" md:w-[4.2rem] ">#Rack</div>
//               <div className=" md:w-[5.2rem] ">Zone Type</div>
//               <div className=" md:w-[5.1rem]">Description</div>
//               <div className="w-12"></div>          
//                  </div>

//             {props.roomRackbyLoc.map((item) => {
//               return (
//                 <div key={item.roomRackId}>
//                   <div className="flex rounded-xl justify-between mt-2 bg-white h-[2.75rem] items-center p-3 "
//                   >

//                     <div className=" flex font-medium flex-col md:w-[9.1rem] max-sm:w-full  ">
//                       <div class="text-sm  font-semibold  font-poppins cursor-pointer">
//                         {editroomRackId === item.roomRackId ? (
//                           <Input
//                             class="border-[2px] border-black w-12"
//                             //  style={{border:"2px solid black"}}
//                             value={editedFields[item.roomRackId]?.zone !== undefined ? editedFields[item.roomRackId].zone : item.zone}
//                             onChange={(e) => handleUpChange(item.roomRackId, 'zone', e.target.value)}
//                           />

//                         ) : (
//                           <div className="font-normal text-sm  font-poppins">
//                             <div> {item.zone}</div>
//                           </div>
//                         )}
//                       </div>
//                     </div>

//                     <div className=" flex font-medium flex-col  md:w-[7.1rem] max-sm:flex-row w-full max-sm:justify-between  ">

//                       <div class=" text-xs  font-poppins">
//                         {editroomRackId === item.roomRackId ? (
//                           <Input
//                             class="border-[2px] border-black w-12"
//                             //  style={{border:"2px solid black"}}
//                             value={editedFields[item.roomRackId]?.rack !== undefined ? editedFields[item.roomRackId].rack : item.rack}
//                             onChange={(e) => handleUpChange(item.roomRackId, 'rack', e.target.value)}
//                           />

//                         ) : (
//                           <div className="font-normal text-sm  font-poppins">
//                             <div> {item.rack}</div>
//                           </div>
//                         )}
//                       </div>

//                     </div>
//                     <div className=" flex font-medium flex-col md:w-[6.5rem] max-sm:flex-row w-full max-sm:justify-between ">
//                       <div class=" text-xs  font-poppins">
//                         {editroomRackId === item.roomRackId ? (
//                           <Select
//                             classNames="w-32"
//                             value={editedFields[item.roomRackId]?.zoneType !== undefined ? editedFields[item.roomRackId].zoneType : item.zoneType}
//                             onChange={(value) => handleUpChange(value, item.key, 'zoneType')}
//                           >
//                             <Option value="entry">Entry</Option>
//                             <Option value="exit">Exit</Option>
//                           </Select>
//                         ) : (
//                           <div className="font-normal text-sm  font-poppins">
//                             <div> {item.zoneType}</div>
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                     <div className=" flex font-medium flex-col md:w-[6.2rem] max-sm:flex-row w-full max-sm:justify-between ">
//                       {editroomRackId === item.roomRackId ? (
//                         <Input
//                           class="border-[2px] border-black w-12"
//                           //  style={{border:"2px solid black"}}
//                           value={editedFields[item.roomRackId]?.description !== undefined ? editedFields[item.roomRackId].description : item.description}
//                           onChange={(e) => handleUpChange(item.roomRackId, 'description', e.target.value)}
//                         />

//                       ) : (
//                         <div className="font-normal text-sm  font-poppins">
//                           <div> {item.description}</div>
//                         </div>
//                       )}
//                     </div>

//                     <div class="flex md:items-center">


//                       <div class="flex  w-28 max-sm:flex-row max-sm:w-[10%]">
//                         <div>
//                           {editroomRackId === item.roomRackId ? (
//                             <>
//                               <Button
//                                 type="primary"
//                                 onClick={() => handleUpdate(item.roomRackId, item.zone, item.rack, item.zoneType, item.description)}>
//                                 Save
//                               </Button>
//                               <Button
//                                 type="primary"
//                                 onClick={() => handleCancelClick(item.roomRackId)} className="ml-[0.5rem]">
//                                 Cancel
//                               </Button>
//                             </>

//                           ) : (
//                             <BorderColorIcon
//                               className="!text-base cursor-pointer text-[tomato] flex justify-center items-center mt-1 ml-1"
//                               tooltipTitle="Edit"
//                               iconType="edit"
//                               onClick={() => handleEditClick(item.roomRackId)}
//                             />
//                           )}
//                         </div>

//                       </div>
//                     </div>

//                   </div>
//                 </div>
//               );
//             })}

//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// const mapStateToProps = ({ inventory, auth, locations }) => ({
//   addingRoomAndRackInInventory: inventory.addingRoomAndRackInInventory,
//   userId: auth.userDetails.userId,
//   roomRackbyLoc: inventory.roomRackbyLoc,
//   orgId: auth.userDetails.organizationId,
//   fetchingRoomRack: inventory.fetchingRoomRack
// });

// const mapDispatchToProps = (dispatch) =>
//   bindActionCreators(
//     {
//       addRoomAndRackInInventory,
//       getRoomRackByLocId,
//       updateRoomRackId
//     },
//     dispatch
//   );

// export default connect(mapStateToProps, mapDispatchToProps)(RoomAndRackForm);

import { Button, Input, Select } from 'antd';
import React, { useState, useEffect } from 'react';
import { addRoomAndRackInInventory, getRoomRackByLocId, updateRoomRackId } from './InventoryAction';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { CloseOutlined } from '@ant-design/icons';
import { BundleLoader } from '../../../Components/Placeholder';
import BorderColorIcon from '@mui/icons-material/BorderColor';

const { Option } = Select;

const RoomAndRackForm = (props) => {
  useEffect(() => {
    props.getRoomRackByLocId(props.rowData.locationDetailsId, props.orgId);
  }, []);

  const [rows, setRows] = useState([]);
  const [editedFields, setEditedFields] = useState({});
  const [editroomRackId, setEditroomRackId] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  const handleAddRow = () => {
    const newRow = { zone: '', rack: '', zoneType: '', description: '',aisle:"" };
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

    // Clear validation error for the changed field
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [`${index}-${key}`]: undefined,
    }));
  };

  const handleSubmit = (index) => {
    const row = rows[index];
    const errors = {};

    if (!row.zone) {
      errors[`${index}-zone`] = 'Input required';
    }

    if (!row.rack) {
      errors[`${index}-rack`] = 'Input required';
    }
    if (!row.aisle) {
      errors[`${index}-aisle`] = 'Input required';
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    // Perform your API call here with the row data
    console.log('Submitting Row:', row);
    const payload = {
      locationDetailsId: props.rowData.locationDetailsId,
      userId: props.userId,
      zone: row.zone,
      rack: row.rack,
      zoneType: row.zoneType,
      aisle:row.aisle,
      description: row.description,
      orgId: props.orgId,
    };
    props.addRoomAndRackInInventory(payload, props.rowData.locationDetailsId, props.orgId);
    setRows([{ zone: '', rack: '', zoneType: '', description: '' }]);
  };

  if (props.fetchingRoomRack) {
    return <BundleLoader />;
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

  const handleUpdate = (roomRackId, zone, rack, zoneType, description) => {
    const updatedData = {
      locationDetailsId: props.rowData.locationDetailsId,
      userId: props.userId,
      zone: editedFields[roomRackId]?.zone !== undefined ? editedFields[roomRackId].zone : zone,
      rack: editedFields[roomRackId]?.rack !== undefined ? editedFields[roomRackId].rack : rack,
      zoneType: editedFields[roomRackId]?.zoneType !== undefined ? editedFields[roomRackId].zoneType : zoneType,
      description: editedFields[roomRackId]?.description !== undefined ? editedFields[roomRackId].description : description,
      orgId: props.orgId,
    };
    props.updateRoomRackId(updatedData, roomRackId);
  };

  return (
    <>
      <div>
        <Button type="primary" onClick={handleAddRow} style={{ marginBottom: '10px' }}>
          {/* Add Zone  */} {props.translatedMenuItems[6]}
        </Button>
        {rows.map((row, index) => (
          <div key={index} className="flex items-center">
            <div className="flex justify-around w-[30rem]">
              <div>
                <div class="font-bold text-xs font-poppins text-black">
                  {/* Zone Code */}
                  {props.translatedMenuItems[7]}
                </div>
                <div className="w-24">
                  <Input
                    value={row.zone}
                    onChange={(e) => handleChange(index, 'zone', e.target.value)}
                    placeholder="Zone"
                    required
                    style={{ borderColor: validationErrors[`${index}-zone`] ? 'red' : undefined }}
                  />
                  {validationErrors[`${index}-zone`] && <span style={{ color: 'red' }}>{validationErrors[`${index}-zone`]}</span>}
                </div>
              </div>



              <div>
                <div class="font-bold text-xs font-poppins text-black">
                 Aisle
                  </div>
                <div className="w-24">
                  <Input
                    value={row.aisle}
                    onChange={(e) => handleChange(index, 'aisle', e.target.value)}
                    placeholder="# Aisle"
                    type="text"
                    min="0"
                    step="1"
                    required
                    style={{ borderColor: validationErrors[`${index}-rack`] ? 'red' : undefined }}
                  />
                  {validationErrors[`${index}-aisle`] && <span style={{ color: 'red' }}>{validationErrors[`${index}-aisle`]}</span>}
                </div>
              </div>

              <div>
  {row.aisle && ( // Check if row.aisle exists
    <div>
      <div className="font-bold text-xs font-poppins text-black">
        {/* #Rack */} #{props.translatedMenuItems[8]}
      </div>
      <div className="w-24">
        <Input
          value={row.rack}
          onChange={(e) => handleChange(index, 'rack', e.target.value)}
          placeholder="# Number"
          type="number"
          min="0"
          step="1"
          required
          style={{ borderColor: validationErrors[`${index}-rack`] ? 'red' : undefined }}
        />
        {validationErrors[`${index}-rack`] && (
          <span style={{ color: 'red' }}>
            {validationErrors[`${index}-rack`]}
          </span>
        )}
      </div>
    </div>
  )}
</div>


              <div>
                <div class="font-bold text-xs font-poppins text-black">
                  {/* Zone Type */} {props.translatedMenuItems[9]}
                  </div>
                <div className="w-24">
                  <Select
                    value={row.zoneType}
                    onChange={(value) => handleChange(index, 'zoneType', value)}
                    placeholder="Select"
                  >
                    <Option value="" disabled>
                      Select
                    </Option>
                    <Option value="entry">Entry</Option>
                    <Option value="exit">Exit</Option>
                    <Option value="quality">Quality</Option>
                  </Select>
                </div>
              </div>

              <div>
                <div class="font-bold text-xs font-poppins text-black">
                  {/* Description */} {props.translatedMenuItems[10]}
                  </div>
                <div className="w-24">
                  <Input
                    value={row.description}
                    onChange={(e) => handleChange(index, 'description', e.target.value)}
                    placeholder="Description"
                  />
                </div>
              </div>
            </div>
            <div className="mt-4">
              <Button type="primary" onClick={() => handleSubmit(index)}>
                {/* Submit */} {props.translatedMenuItems[11]}
              </Button>
            </div>
            <CloseOutlined onClick={() => handleRemoveRow(index)} />
          </div>
        ))}

        <div className="flex sticky z-auto h-[75vh]" >
          <div className="rounded m-1 p-1 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
            <div className="flex justify-between w-[100%]  p-1 bg-transparent font-bold sticky  z-10">
              <div className="md:w-[6rem]">{props.translatedMenuItems[12]} </div>
              <div className="md:w-[4.2rem]">Asile</div>
              <div className="md:w-[5.2rem]">Rack</div>
              <div className="md:w-[9.1rem]">Length</div>
              <div className="md:w-[9.1rem]">Width</div>
              <div className="md:w-[9.1rem]">Height</div>
              <div className="md:w-[9.1rem]">UOM</div>
              <div className="w-12"></div>
            </div>

            {props.roomRackbyLoc.map((item) => {
              return (
                <div key={item.roomRackId}>
                  <div className="flex rounded justify-between mt-1 bg-white h-8 items-center p-1">
                    <div className="flex font-medium flex-col md:w-[9.1rem] max-sm:w-full">
                      <div className="text-sm  font-semibold font-poppins cursor-pointer">
                        {editroomRackId === item.roomRackId ? (
                          <Input
                            className="border-[2px] border-black w-12"
                            value={editedFields[item.roomRackId]?.zone !== undefined ? editedFields[item.roomRackId].zone : item.zone}
                            onChange={(e) => handleUpChange(item.roomRackId, 'zone', e.target.value)}
                          />
                        ) : (
                          <div className="font-normal text-sm  font-poppins">
                            <div>{item.zone}</div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex font-medium flex-col md:w-[7.1rem] max-sm:flex-row w-full max-sm:justify-between">
                      <div className="text-xs  font-poppins">
                        {editroomRackId === item.roomRackId ? (
                          <Input
                            className="border-[2px] border-black w-12"
                            value={editedFields[item.roomRackId]?.rack !== undefined ? editedFields[item.roomRackId].rack : item.rack}
                            onChange={(e) => handleUpChange(item.roomRackId, 'rack', e.target.value)}
                          />
                        ) : (
                          <div className="font-normal text-sm  font-poppins">
                            <div>{item.rack}</div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex font-medium flex-col md:w-[6.5rem] max-sm:flex-row w-full max-sm:justify-between">
                      <div className="text-xs  font-poppins">
                        {editroomRackId === item.roomRackId ? (
                          <Select
                            className="w-32"
                            value={editedFields[item.roomRackId]?.zoneType !== undefined ? editedFields[item.roomRackId].zoneType : item.zoneType}
                            onChange={(value) => handleUpChange(item.roomRackId, 'zoneType', value)}
                          >
                            <Option value="entry">Entry</Option>
                            <Option value="exit">Exit</Option>
                          </Select>
                        ) : (
                          <div className="font-normal text-sm  font-poppins">
                            <div>{item.zoneType}</div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex font-medium flex-col md:w-[7.2rem] max-sm:flex-row w-full max-sm:justify-between">
                      {editroomRackId === item.roomRackId ? (
                        <Input
                          className="border-[2px] border-black w-12"
                          value={editedFields[item.roomRackId]?.description !== undefined ? editedFields[item.roomRackId].description : item.description}
                          onChange={(e) => handleUpChange(item.roomRackId, 'description', e.target.value)}
                        />
                      ) : (
                        <div className="font-normal text-sm  font-poppins">
                          <div>{item.description}</div>
                        </div>
                      )}
                    </div>

                    <div className="flex   md:items-center">
                      <div className="flex w-28 justify-end max-sm:flex-row max-sm:w-[10%]">
                        <div>
                          {editroomRackId === item.roomRackId ? (
                            <>
                              <Button type="primary" onClick={() => handleUpdate(item.roomRackId, item.zone, item.rack, item.zoneType, item.description)}>
                                {/* Save */} {props.translatedMenuItems[17]}
                              </Button>
                              <Button type="primary" onClick={() => handleCancelClick(item.roomRackId)} className="ml-[0.5rem]">
                                {/* Cancel */} {props.translatedMenuItems[18]}
                              </Button>
                            </>
                          ) : (
                            <BorderColorIcon
                              className="!text-icon cursor-pointer text-[tomato] flex justify-center items-center mt-1 ml-1"
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

const mapStateToProps = ({ inventory, auth }) => ({
  addingRoomAndRackInInventory: inventory.addingRoomAndRackInInventory,
  userId: auth.userDetails.userId,
  roomRackbyLoc: inventory.roomRackbyLoc,
  orgId: auth.userDetails.organizationId,
  fetchingRoomRack: inventory.fetchingRoomRack,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addRoomAndRackInInventory,
      getRoomRackByLocId,
      updateRoomRackId,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(RoomAndRackForm);
