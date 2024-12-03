

import { Button, Input, Select } from 'antd';
import React, { useState, useEffect } from 'react';
import { addRoomAndRackInInventory, getRoomRackByLocId, updateRoomRackId } from './InventoryAction';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  getUOM,
 
} from "../../Settings/SettingsAction";
import CloseIcon from '@mui/icons-material/Close';
import { BundleLoader } from '../../../Components/Placeholder';
import BorderColorIcon from '@mui/icons-material/BorderColor';

const { Option } = Select;

const RoomAndRackForm = (props) => {
  useEffect(() => {
    props.getUOM();
    props.getRoomRackByLocId(props.rowData.locationDetailsId, props.orgId);
  }, []);


 
  const [rows, setRows] = useState([]);
  const [asileRack, setAsileRack] = useState(props.roomRackbyLoc);


  const [newUom, setNewUom] = useState("");
  const [newChWt, setNewChWt] = useState("");
  const [newStockUnit, setNewStockUnit] = useState("");
  const [newWtUom, setNewWtUom] = useState("");
  const [newChbhth, setNewChbhth] = useState("");
  const [newChbWdh, setNewChbWdh] = useState("");
  const [newChbLth, setNewChbLth] = useState("");
  const [editedFields, setEditedFields] = useState({});
  const [editroomRackId, setEditroomRackId] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  const handleAddRow = () => {
    const newRow = { zone: '', rack: '', zoneType: '', description: '',aisle:"" };
    setRows([...rows, newRow]);
  };



  useEffect(() => {
    // Check if data is available
    if (props.roomRackbyLoc.length > 0) {
      // Update activeTab when data is available
      setAsileRack(props.roomRackbyLoc);
    }
  }, [props.roomRackbyLoc]);

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

  const handleEditClick = (roomRackChamberLinkId,chbrLth,chbrWdh,chbrhth,chbrUom,chbrWt,wtUom,stockData) => {
    setEditroomRackId(roomRackChamberLinkId);
    setNewChbLth(chbrLth);
    setNewChbWdh(chbrWdh);
    setNewChbhth(chbrhth);
    setNewUom(chbrUom)
    setNewChWt(chbrWt)
    setNewWtUom(wtUom)
    setNewStockUnit(stockData)
  };

  const handleCancelClick = (roomRackId) => {
    setEditedFields((prevFields) => ({ ...prevFields, [roomRackId]: undefined }));
    setEditroomRackId(null);
  };

  const handleUpdate = (roomRackChamberLinkId, zone, rack, zoneType, description) => {
    const updatedData = {
    chbrLth:newChbLth,
    chbrUom:newUom,
    chbrWdh:newChbWdh,
    chbrhth:newChbhth,
    chbrWt:newChWt,
    wtUom:newWtUom,
    restock:newStockUnit
    };
    props.updateRoomRackId(updatedData, roomRackChamberLinkId);
    setEditroomRackId(null);
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
            <CloseIcon onClick={() => handleRemoveRow(index)} />
          </div>
        ))}

        <div className="flex sticky z-auto h-[75vh]" >
          <div className="rounded m-1 p-1 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
            <div className="flex justify-between w-[100%]  p-1 bg-transparent font-bold sticky  z-10">
              <div className="md:w-[6rem]">{props.translatedMenuItems[12]} </div>
              <div className="md:w-[4.2rem]">Aisle</div>
              <div className="md:w-[5.2rem]">Rack</div>
              <div className="md:w-[9.1rem]">Length</div>
              <div className="md:w-[9.1rem]">Width</div>
              <div className="md:w-[9.1rem]">Height</div>
              <div className="md:w-[9.1rem]">UOM</div>
              <div className="md:w-[9.1rem]">Weight</div>
              <div className="md:w-[9.1rem]">UOM</div>
              <div className="md:w-[9.1rem]">Zone Type</div>
              <div className="md:w-[9.1rem]">Restock Percentage</div>
              
              <div className="w-12"></div>
            </div>

            {asileRack.map((item) => {
              const stockData=item.restock===0?50:item.restock
              return (
                <div key={item.roomRackChamberLinkId}>
                  <div className="flex rounded justify-between mt-1 bg-white h-8 items-center p-1">
                    <div className="flex font-medium flex-col md:w-[9.1rem] max-sm:w-full">
                      <div className="text-sm  font-semibold font-poppins cursor-pointer">
                      
                          <div className="font-normal text-sm  font-poppins">
                            <div>{item.zone}</div>
                          </div>
                      
                      </div>
                    </div>

                    <div className="flex font-medium flex-col md:w-[7.1rem] max-sm:flex-row w-full max-sm:justify-between">
                      <div className="text-xs  font-poppins">
                      
                          <div className="font-normal text-sm  font-poppins">
                            <div style={{marginLeft:"-2em"}}>{item.aisle}</div>
                          </div>
                       
                      </div>
                    </div>




                    <div className="flex font-medium flex-col md:w-[7.1rem] max-sm:flex-row w-full max-sm:justify-between">
                      <div className="text-xs  font-poppins">
                      
                          <div className="font-normal text-sm  font-poppins">
                            <div style={{marginLeft:"-4em"}}>{item.chamber}</div>
                          </div>
                     
                      </div>
                    </div>



                    <div className="flex font-medium flex-col md:w-[7.1rem] max-sm:flex-row w-full max-sm:justify-between">
                      <div className="text-xs  font-poppins">
                        {editroomRackId === item.roomRackChamberLinkId ? (
                          <Input
                            className="border-[2px] border-black w-12"
                        value={newChbLth}
                          onChange={(e) => setNewChbLth(e.target.value)}
                          />
                        ) : (
                          <div className="font-normal text-sm  font-poppins">
                            <div style={{marginLeft:"-5em"}}>{item.chbrLth}</div>
                          </div>
                        )}
                      </div>
                    </div>



                    <div className="flex font-medium flex-col md:w-[7.1rem] max-sm:flex-row w-full max-sm:justify-between">
                      <div className="text-xs  font-poppins">
                        {editroomRackId === item.roomRackChamberLinkId ? (
                          <Input
                            className="border-[2px] border-black w-12"
                          value={newChbWdh}
                        onChange={(e) =>  setNewChbWdh(e.target.value)}
                          />
                        ) : (
                          <div className="font-normal text-sm  font-poppins">
                            <div style={{marginLeft:"-4em"}}>{item.chbrWdh}</div>
                          </div>
                        )}
                      </div>
                    </div>




                    <div className="flex font-medium flex-col md:w-[7.1rem] max-sm:flex-row w-full max-sm:justify-between">
                      <div className="text-xs  font-poppins">
                        {editroomRackId === item.roomRackChamberLinkId ? (
                          <Input
                            className="border-[2px] border-black w-12"
                    value={newChbhth}
                    onChange={(e) => setNewChbhth(e.target.value)}
                          />
                        ) : (
                          <div className="font-normal text-sm  font-poppins">
                            <div style={{marginLeft:"-2em"}}>{item.chbrhth}</div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex font-medium flex-col md:w-[6.5rem] max-sm:flex-row w-full max-sm:justify-between">
                      <div className="text-xs  font-poppins">
                        {editroomRackId === item.roomRackChamberLinkId ? (
                        <Select
                        className="w-32"
                      value={newUom}
                        onChange={(value) => setNewUom(value)} // `value` is passed directly by Select's onChange handler
                      >
                        {props.UOMListData.map((item) => (
                          <Option key={item.unitName} value={item.unitName}>
                            {item.unitName}
                          </Option>
                        ))}
                      </Select>
                        ) : (
                          <div className="font-normal text-sm  font-poppins">
                            <div style={{marginLeft:"-1em"}}>
                           {item.chbrUom}
                              {/* {item.zoneType} */}
                              </div>
                          </div>
                        )}
                      </div>
                    </div>


                    <div className="flex font-medium flex-col md:w-[7.1rem] max-sm:flex-row w-full max-sm:justify-between">
                      <div className="text-xs  font-poppins">
                        {editroomRackId === item.roomRackChamberLinkId ? (
                          <Input
                            className="border-[2px] border-black w-12"
                    value={newChWt}
                    onChange={(e) => setNewChWt(e.target.value)}
                          />
                        ) : (
                          <div className="font-normal text-sm  font-poppins">
                            <div style={{marginLeft:"1em"}}>{item.chbrWt}</div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex font-medium flex-col md:w-[6.5rem] max-sm:flex-row w-full max-sm:justify-between">
                      <div className="text-xs  font-poppins">
                        {editroomRackId === item.roomRackChamberLinkId ? (
                        <Select
                        className="w-32"
                      value={newWtUom}
                        onChange={(value) => setNewWtUom(value)} // `value` is passed directly by Select's onChange handler
                      >
                        {props.UOMListData.map((item) => (
                          <Option key={item.unitName} value={item.unitName}>
                            {item.unitName}
                          </Option>
                        ))}
                      </Select>
                        ) : (
                          <div className="font-normal text-sm  font-poppins">
                            <div style={{marginLeft:"2em"}}>
                           {item.wtUom}
                              {/* {item.zoneType} */}
                              </div>
                          </div>
                        )}
                      </div>
                    </div>


                    <div className="flex font-medium flex-col md:w-[6.5rem] max-sm:flex-row w-full max-sm:justify-between">
                      <div style={{marginLeft:'44px'}} className="text-xs  font-poppins">
                        {/* {editroomRackId === item.roomRackChamberLinkId ? (
                          <Select
                            className="w-32"
                            value={editedFields[item.roomRackId]?.zoneType !== undefined ? editedFields[item.roomRackId].zoneType : item.zoneType}
                            onChange={(value) => handleUpChange(item.roomRackId, 'zoneType', value)}
                          >
                            <Option value="entry">Entry</Option>
                            <Option value="exit">Exit</Option>
                          </Select>
                        ) : ( */}
                          <div className="font-normal text-sm  font-poppins">
                            <div >{item.zoneType}</div>
                          </div>
                        {/* )} */}
                      </div>
                    </div>

                    <div className="flex font-medium flex-col md:w-[7.2rem] max-sm:flex-row w-full max-sm:justify-between">
                      {editroomRackId === item.roomRackChamberLinkId ? (
                        <Input
                          className="border-[2px] border-black w-12"
                          value={newStockUnit}
                          onChange={(e) => setNewStockUnit(e.target.value)}
                          // value={editedFields[item.roomRackId]?.description !== undefined ? editedFields[item.roomRackId].description : item.description}
                          //onChange={(e) => handleUpChange(item.roomRackId, 'description', e.target.value)}
                        />
                      ) : (
                        <div className="font-normal text-sm  font-poppins">
                          <div style={{marginLeft:"2em"}}>
                            {stockData}
                            </div>
                        </div>
                    )}
                    </div>

                 

                    <div className="flex   md:items-center">
                      <div className="flex w-28 justify-end max-sm:flex-row max-sm:w-[10%]">
                        <div>
                          {editroomRackId === item.roomRackChamberLinkId ? (
                            <>
                              <Button type="primary" onClick={() => handleUpdate(item.roomRackChamberLinkId, item.zone, item.rack, item.zoneType, item.description)}>
                                Save 
                              </Button>
                              <Button type="primary" onClick={() => handleCancelClick(item.roomRackId)} className="ml-[0.5rem]">
                                Cancel 
                              </Button>
                            </>
                          ) : (
                            <BorderColorIcon
                              className="!text-icon cursor-pointer text-[tomato] flex justify-center items-center mt-1 ml-1"
                              tooltipTitle="Edit"
                              iconType="edit"
                              onClick={() => handleEditClick(item.roomRackChamberLinkId,item.chbrLth,item.chbrWdh,item.chbrhth,item.chbrUom,item.chbrWt,item.wtUom,stockData)}
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

const mapStateToProps = ({ inventory, auth,settings }) => ({
  addingRoomAndRackInInventory: inventory.addingRoomAndRackInInventory,
  userId: auth.userDetails.userId,
  roomRackbyLoc: inventory.roomRackbyLoc,
  orgId: auth.userDetails.organizationId,
  fetchingRoomRack: inventory.fetchingRoomRack,
  UOMListData:settings.UOMListData,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addRoomAndRackInInventory,
      getRoomRackByLocId,
      getUOM,
      updateRoomRackId,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(RoomAndRackForm);
