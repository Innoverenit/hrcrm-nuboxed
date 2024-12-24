import React, { useEffect, useState,lazy,Suspense  } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PinIcon from '@mui/icons-material/Pin';
import CategoryIcon from '@mui/icons-material/Category'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import TerminalSharp from "@mui/icons-material/TerminalSharp";
import DateRangeIcon from '@mui/icons-material/DateRange';
import FactoryIcon from '@mui/icons-material/Factory';
import ShareLocationIcon from '@mui/icons-material/ShareLocation';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import RepartitionIcon from '@mui/icons-material/Repartition';
import {
  getMaterialBestBefore,
  addToWaste,
  addAsileInbest,
} from "../Inventory/InventoryAction";
import { handleTermsnConditionModal } from "../Suppliers/SuppliersAction";
import dayjs from "dayjs";
import { withRouter } from "react-router";
import { Tooltip, Select, Button } from "antd";
import { base_url2 } from "../../../Config/Auth";

const TermsnConditionModal = lazy(() =>import("../Suppliers/Child/SupplierDetails/SupplierDetailTab/TermsnConditionModal") );
const EmptyPage = lazy(() =>import("../EmptyPage") );
const { Option } = Select;

const InventoryMaterialBestBefore = (props) => {
  const [row, setRow] = useState({})
  const [rowsBest, setRowBest] = useState(props.materialBestBefore);
  const [zone, setZone] = useState([]);
  const [aisleData, setAisleData] = useState([]);
  const [rackData, setRackData] = useState([]);
  const [isLoadingZone, setIsLoadingZone] = useState(false);
  const [isLoadingAisle, setIsLoadingAisle] = useState(false);
  const [isLoadingRack, setIsLoadingRack] = useState(false);

  useEffect(() => {
    // Fetch zones initially
    fetchZone();
    props.getMaterialBestBefore(props.locationId);
  }, []);

  useEffect(() => {
    if (props.materialBestBefore.length > 0) {
      setRowBest(props.materialBestBefore);
    }
  }, [props.materialBestBefore]);

  useEffect(() => {
    rowsBest.forEach((row) => {
      if (row.roomRackId) {
        fetchAisle(row.roomRackId);
        fetchRack(row.roomRackId);
      }
    });
  }, [rowsBest]);

    const handleRow = (item) => {
        setRow(item)
    }
  const fetchZone = async () => {
    setIsLoadingZone(true);
    try {
      const apiEndpoint = `${base_url2}/roomrack/notUsed/roomAndRackDetails/${props.locationId}/${props.orgId}`;
      const response = await fetch(apiEndpoint, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${props.token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setZone(data);
    } catch (error) {
      console.error("Error fetching zone data:", error);
    } finally {
      setIsLoadingZone(false);
    }
  };

  const fetchAisle = async (roomRackId) => {
    setIsLoadingAisle(true);
    try {
      const apiEndpoint = `${base_url2}/roomrack/notUesedAisle/${roomRackId}`;
      const response = await fetch(apiEndpoint, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${props.token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setAisleData(data);
    } catch (error) {
      console.error("Error fetching aisle data:", error);
    } finally {
      setIsLoadingAisle(false);
    }
  };

  const fetchRack = async (roomRackId) => {
    setIsLoadingRack(true);
    try {
      const apiEndpoint = `${base_url2}/roomrack/notUesedChamber/${roomRackId}`;
      const response = await fetch(apiEndpoint, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${props.token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setRackData(data);
    } catch (error) {
      console.error("Error fetching rack data:", error);
    } finally {
      setIsLoadingRack(false);
    }
  };

  const handleZoneChange = (value, index) => {
    const updatedRows = [...rowsBest];
    updatedRows[index].roomRackId = value;
    setRowBest(updatedRows);

    // Fetch aisle and rack for the selected zone
    // fetchAisle(value);
    // fetchRack(value);
  };

  const handleAisleChange = (value, index) => {
    const updatedRows = [...rowsBest];
    updatedRows[index].aisle = value;
    setRowBest(updatedRows);
  };

  const handleRackChange = (value, index) => {
    const updatedRows = [...rowsBest];
    updatedRows[index].chamber = value;
    setRowBest(updatedRows);

    const payload = {
      roomRackId: updatedRows[index].roomRackId,
      roomRackChamberLinkId: value,
    };
    props.addAsileInbest(payload, updatedRows[index].poSupplierSuppliesId);
  };

  return (
    <>
    <div className="flex sticky z-auto h-[79vh]">
      <div className="rounded m-1 p-1 w-[100%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
        <div className="flex w-[100%] p-1 bg-transparent font-bold font-poppins !text-lm items-end sticky z-10">
          <div className="w-[14.9rem] text-sm text-[#00A2E8] truncate max-md:w-[11.52rem]"> 
            <AddShoppingCartIcon className="!text-icon "/>{props.translatedMenuItems[38]}</div>
          <div className="w-[9.9rem] truncate max-md:w-[12.122rem]">
              <FactoryIcon className='!text-icon mr-1 text-[#e4eb2f]' />{props.translatedMenuItems[36]} {props.translatedMenuItems[0]} </div>
          <div className="w-[4.6rem] truncate max-md:w-[4.122rem]">
            <PinIcon className=" !text-icon mr-1"/>HSN</div>
          <div className="w-[6.12rem] truncate max-md:w-[8.12rem]"> 
             <CategoryIcon className='!text-icon  text-[#e4eb2f]'/> {props.translatedMenuItems[36]}  Id</div>
          <div className="w-[5.8rem] truncate max-md:w-[5.12rem]">{props.translatedMenuItems[1]}</div>
          <div className="w-[4.4rem] truncate max-md:w-[8.12rem]">{props.translatedMenuItems[26]}</div>     {/* Unit */}
          <div className="w-[6.66rem] truncate max-md:w-[8.12rem]"><DateRangeIcon className="!text-icon "/>{props.translatedMenuItems[42]}</div>   
          <div className="w-[6.6rem] truncate max-md:w-[8.12rem]"></div>     
          <div className="w-[7.7rem] truncate max-md:w-[9.2rem]">< ShareLocationIcon className=" !text-icon"/>{props.translatedMenuItems[32]}</div>
          <div className="w-[7.8rem] truncate max-md:w-[9.2rem]">< MeetingRoomIcon className=" !text-icon"/>{props.translatedMenuItems[44]}</div>
          <div className="w-[7.12rem] truncate max-md:w-[7.12rem]">< RepartitionIcon className=" !text-icon"/>{props.translatedMenuItems[33]}</div>
          <div className="w-[7.22rem] truncate max-md:w-[3.22rem]">{props.translatedMenuItems[41]}</div>
        </div>

        {rowsBest.map((item, index) => (
          <div
            key={item.poSupplierSuppliesId}
            className="flex rounded py-ygap mt-1 bg-white items-center scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid   leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]"
          >
            <div className="flex w-[18.12rem] items-center justify-start truncate h-8 border-l-2 border-green-500 bg-[#eef2f9]">
            <div class=" text-xs  font-poppins ml-gap max-sm:text-sm  ">
              {item.suppliesFullName}
              </div>
              </div>
            <div className=" flex w-[12.02rem] truncate items-center justify-start h-8 ml-gap bg-[#eef2f9]">
            <div class=" text-xs  font-poppins ml-gap max-sm:text-sm  ">{item.supplierName}
              </div>
            </div>
            <div className="flex w-[5.25rem] truncate items-center justify-start h-8 ml-gap bg-[#eef2f9]">
            <div class=" text-xs  font-poppins ml-gap max-sm:text-sm  ">{item.hsn}
              </div>
            </div>
            <div className="flex w-[7.4rem] truncate items-center justify-start h-8 ml-gap bg-[#eef2f9]">
            <div class=" text-xs  font-poppins ml-gap max-sm:text-sm  ">{item.newSuppliesNo}</div></div>
            <div className="flex w-[7.4rem] truncate items-center justify-start h-8 ml-gap bg-[#eef2f9]">
            <div class=" text-xs  font-poppins ml-gap max-sm:text-sm  ">{item.countryName}</div></div>
            <div className=" flex w-[5.8rem] truncate items-center justify-center h-8 ml-gap bg-[#eef2f9]">
            <div class=" text-xs  font-poppins max-sm:text-sm  ">{item.remainingCorrectUnit}</div></div>
            <div className="  flex w-[8.22rem] truncate items-center justify-start h-8 ml-gap bg-[#eef2f9]">
            <div class=" text-xs  font-poppins max-sm:text-sm  ">{dayjs(item.creationDate).format("DD/MM/YYYY")}</div>
            </div>
            <div className=" flex items-center  justify-center h-8 ml-gap bg-[#eef2f9] md:w-[5.6rem] max-sm:flex-row w-full max-sm:justify-between ">
                                       <Button 
                                       type="primary"
                                        onClick={() => {
                                          props.addToWaste({
                                            poSupplierSuppliesId:item.poSupplierSuppliesId,
                                            poSupplierDetailsId:item.poSupplierDetailsId,
                                            suppliesId:item.suppliesId,
                                            userId:item.userId,
                                            locationId:item.locationId,
                                            orgId:props.orgId,
                                            moveToWasteInd:true
                                          },
                                          item.poSupplierSuppliesId
                                        );
                                          
                                        }}
                         
                                        >To Waste</Button>
                                        </div>
            <div className=" flex w-[9.2rem] truncate items-center justify-center h-8 ml-gap bg-[#eef2f9]">
              <Select
                placeholder="Select Zone"
                value={item.roomRackId}
                onChange={(value) => handleZoneChange(value, index)}
                loading={isLoadingZone}
                style={{ width: "55%" }}
              >
                {zone.map((zoneItem) => (
                  <Option key={zoneItem.roomRackId} value={zoneItem.roomRackId}>
                    {zoneItem.zone}
                  </Option>
                ))}
              </Select>
            </div>
            <div className=" flex w-[9.2rem] items-center justify-center h-8 ml-gap bg-[#eef2f9]">
              <Select
                placeholder="Select Aisle"
                value={item.aisle}
                onChange={(value) => handleAisleChange(value, index)}
                loading={isLoadingAisle}
                style={{ width: "55%" }}
              >
                {aisleData.map((aisleItem) => (
                  <Option key={aisleItem.aisel} value={aisleItem.aisel}>
                    {aisleItem.aisel}
                  </Option>
                ))}
              </Select>
            </div>
            <div className=" flex w-[9.2rem] items-center justify-center h-8 ml-gap bg-[#eef2f9]">
              <Select
                placeholder="Select Rack"
                value={item.chamber}
                onChange={(value) => handleRackChange(value, index)}
                loading={isLoadingRack}
                style={{ width: "55%" }}
              >
                {rackData.map((rackItem) => (
                  <Option
                    key={rackItem.roomRackChamberLinkId}
                    value={rackItem.roomRackChamberLinkId}
                  >
                    {rackItem.chamber}
                  </Option>
                ))}
              </Select>
            </div>
            <div className=" flex w-[6.2rem] items-center justify-center h-8 ml-gap bg-[#eef2f9]">
              {/* Discount */}
              </div>
            <div className=" flex  items-center justify-end h-8 ml-gap bg-[#eef2f9] truncate w-[2rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class=" cursor-pointer max-xl:text-[0.65rem] font-xl text-xs items-center font-poppins">
                                                            <Tooltip title="Terms and conditions">
                                                               <TerminalSharp className="!text-icon text-[#c3b20b]"
                                                                    onClick={() => {
                                                                    handleRow(item)
                                                                        props.handleTermsnConditionModal(true)
                                                                    }}
                                                                />
                                                            </Tooltip>
                                                        </div>
                                                    </div> 
          </div>
        ))}
      </div>
    </div>
    <Suspense fallback={"Loading..."}>
    <TermsnConditionModal
                rowData={row}
                addTermsnCondition={props.addTermsnCondition}
                handleTermsnConditionModal={props.handleTermsnConditionModal}
                translateText={props.translateText}
                selectedLanguage={props.selectedLanguage}
            />
            </Suspense>
            </>

  );
};

const mapStateToProps = ({ inventory, suppliers, auth }) => ({
  userId: auth.userDetails.userId,
  locationId: auth.userDetails.locationId,
  orgId: auth.userDetails.organizationId,
  token: auth.token,
  materialBestBefore: inventory.materialBestBefore,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getMaterialBestBefore,
      handleTermsnConditionModal,
      addToWaste,
      addAsileInbest,
    },
    dispatch
  );

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(InventoryMaterialBestBefore)
);


