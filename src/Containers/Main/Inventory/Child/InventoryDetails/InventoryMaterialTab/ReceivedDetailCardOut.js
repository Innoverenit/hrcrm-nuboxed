import React, { useEffect, useState } from 'react'
import {
    getMaterialReceivedDetailData,
    updateReceivedDamagedUnit,
    generateGrnForPo,
    getGrnNoByPoId,
    handleReceiveScanModal
} from "../../../InventoryAction"
import AddReceiveScan from "./AddReceiveScan"
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { Button, DatePicker, Input, Modal, Select, Switch, Tooltip, message } from 'antd';
import PoReceiveToggle from './PoReceiveToggle';
import dayjs from 'dayjs'; 
import { trnasferGrnItemToStock } from "../../../InventoryAction"
import AllowGrnToggle from './AllowGrnToggle';
import InfiniteScroll from 'react-infinite-scroll-component';
import { MultiAvatar } from '../../../../../../Components/UI/Elements';
import InventoryIcon from '@mui/icons-material/Inventory';
import AttractionsIcon from '@mui/icons-material/Attractions'; 
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';

const { Option } = Select;

const ReceivedDetailCardOut = (props) => {
    const [receivedData, setReceivedData] = useState(props.receivedDetailData);
    const [existGrn, setExistGrn] = useState(false)
    const [formData, setFormData] = useState({ unitReceived: "", unitDamaged: "", remark: "", bestBeforeUse:"",
        batchNo:"",
         });
    useEffect(() => {
        props.getMaterialReceivedDetailData(props.row.poSupplierDetailsId)
        props.getGrnNoByPoId(props.row.poSupplierDetailsId)
    }, [])


    useEffect(() => {
        // Check if data is available
        if (props.receivedDetailData.length > 0) {
          // Update activeTab when data is available
          setReceivedData(props.receivedDetailData);
        }
      }, [props.receivedDetailData]);

      useEffect(() => {
        if (props.receivedScanData) {
          updateRow(props.receivedScanData);
        }
      }, [props.receivedScanData]);
    
      const updateRow = (newData) => {
        const updatedList = receivedData.map((list) =>
          list.poSupplierSuppliesId === newData.poSupplierSuppliesId ? { ...list, ...newData } : list
        );
        setReceivedData(updatedList);
      };
    
    const handleChange = () => {
        setExistGrn(!existGrn)
    }

    const [grnNo, setGrnNo] = useState("")
    const handleChangeGrnId = (val) => {
        console.log(val)
        setGrnNo(val)
    }

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
        props.generateGrnForPo({
            createGrnNo: result,
            grnNumber: "",
            grnId: grnNo,
            grnReceivedInd: true,
            poSupplierDetailsId: props.row.poSupplierDetailsId,
            userId: props.userId
        })
    };
    const handleCancelmodal = () => {
        setIsModalOpen(false);
    };

    const [rowData, setRowData] = useState({})
    const handleRowData = (item) => {
        setRowData(item)
    }
    const [showEdit, setShowEdit] = useState(false)
    const handleEditicon = (index) => {
        setShowEdit(!showEdit)
        setFormData({
            ...receivedData[index],
            // bestBeforeUse: dayjs(receivedData[index].bestBeforeUse).format('YYYY-MM-DD')
            bestBeforeUse: receivedData[index].bestBeforeUse ? dayjs(receivedData[index].bestBeforeUse) : null, 
          });
    }
    const [unitReceived, setUnitReceived] = useState("")
    const handleUnitReceived = (value) => {
        setUnitReceived(value)
    }

    const [unitDamaged, setUnitDamaged] = useState("")
    const handleUnitDamaged = (value) => {
        setUnitDamaged(value)
    }

    const [remark, setRemark] = useState("")
    const handleRemark = (value) => {
        setRemark(value)
    }

    const handleCallback = () => {
        setUnitReceived("")
        setUnitDamaged("")
        setRemark("")
        setShowEdit(false)
    }
    const handleCancel = () => {
        setShowEdit(false)
    }

    const result = props.receivedDetailData.filter((item) =>
        item.unitReceiveInd === true && item.grnReceivedInd === false && item.allowGrnInd === true).map((opt) => opt.poSupplierSuppliesId)
    const show = props.receivedDetailData.some((item) => item.grnReceivedInd === false && item.allowGrnInd === true)
    const checkall = props.receivedDetailData.every((item) => item.grnReceivedInd === true)
    console.log(show)

    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(0);
    const handleLoadMore = () => {
        setPage(page + 1);
    };

    const handleChangeData = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      };


      const handleDateChange = (date) => {
        console.log("Selected date:", date ? date.format('YYYY-MM-DD') : "No Date Selected"); // Log formatted date
        setFormData({
          ...formData,
          bestBeforeUse: date,
        });
        console.log("Form data after date change:", {
          ...formData,
          bestBeforeUse: date ? date.format('YYYY-MM-DD') : null, // Format date for better logging
        });
      };
console.log(formData)
      const handleSave = (index,item) => {
      
        setShowEdit(null);
        let data={
            unitReceived: formData.unitReceived,
            unitDamaged: formData.unitDamaged,
            remark:formData.remark,
            poReceivedInd: true,
            unitReceiveInd: true,
            userId: props.userId,
            bestBeforeUse:formData?`${formData.bestBeforeUse.format('YYYY-MM-DD')}T00:00:00Z`:null,
            batchNo:formData.batchNo,
            
            poSupplierSuppliesId: item.poSupplierSuppliesId

      
        }

        props.updateReceivedDamagedUnit(data,props.row.poSupplierDetailsId,item.suppliesId)
    
       
        
        // // Logging only name, age, and availableDate with userId
        // console.log({
        //   userId,
        //   name: formData.name,
        //   age: formData.age,
        //   availableDate: formData.availableDate
        // });
      };
     // const allEmpty = receivedData.every(group => group.barCodeList.length === 0);   
    return (
        <>
           <Button
             onClick={() => {

                
                // if (allEmpty) {
                                               
                //     message.success("Barcode is not available.")
                //   } else {
                    props.handleReceiveScanModal(true)
                //   }
                // ;
            //  handleSetScandata(item);
              }}
           >Scan</Button>
            <div className=' flex  sticky z-auto'>
             
                <div class="rounded m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
                    <div className=" flex  w-[100%]  p-1 bg-transparent font-bold font-poppins text-xs items-end sticky  z-10">
                        <div className=""></div>
                        <div className=" w-[18.01rem] truncate max-md:w-[29.51rem]">
                            {/*Name" /> */}   <InventoryIcon className='!text-icon  mr-1 text-[#e4eb2f]'/>{props.translatedMenuItems[0]}
                        </div>
                        <div className=" w-[14.3rem] truncate max-md:w-[23.02rem]">
                            {/* Category" /> */}   <FormatListNumberedIcon className='!text-icon    text-[#42858c]' /> {props.translatedMenuItems[24]}
                            </div>
                        <div className=" w-[8.6rem] truncate max-md:w-[13.01rem]">
                            {/* Attribute" /> */}   <AttractionsIcon className="  !text-icon" /> {props.translatedMenuItems[25]}
                        </div>
                      
                        <div className=" w-[6.8rem] truncate max-md:w-[12.02rem]">
                            {/* "Units" /> */} {props.translatedMenuItems[26]}
                        </div>
                        <div className=" w-[11.02rem] truncate max-md:w-[18.12rem]">
                            {/*Received" /> */}
                            {props.translatedMenuItems[17]}
                        </div>
                        <div className=" w-[10.21rem] truncate max-md:w-[15.21rem]">
                            {/* Receive" /> */} {props.translatedMenuItems[27]}
                        </div>
                      
                        <div className=" w-[44.47rem] truncate max-md:w-[28.47rem]">
                            {/* "Remark" /> */}
                        {props.translatedMenuItems[28]}
                        </div>

                        <div className=""></div>
                        <div className=" w-[7.19rem] truncate max-md:w-[15.19rem]">
                            {/*Create GRN" />*/}
                            GRN {props.translatedMenuItems[21]}
                            </div>
                        
                        <div className=""></div>
                    </div>
                    <InfiniteScroll
                        dataLength={props.receivedDetailData.length}
                        next={handleLoadMore}
                        hasMore={hasMore} 
                        loader={props.fetchingMaterialReceiveDetailData ? <div class="text-center font-semibold text-xs">{props.translatedMenuItems[10]}...</div> : null}
                        height={"87vh"}
                        style={{ scrollbarWidth:"thin"}}
                    >
                        {receivedData.map((item,index) => {

                            return (
                                <div>
                                    <div className="flex rounded  mt-1 bg-white  items-center py-ygap scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid   leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] ">
                                        <div class="flex">
                                            <div className=" flex  w-[12.422rem] max-md:w-[12.422rem] h-8 border-l-2 border-green-500 bg-[#eef2f9]  max-sm:w-full  ">
                                                <div class="flex items-center ml-gap justify-between text-xs  font-semibold  font-poppins ">
                                                    {item.suppliesFullName.substring(0, 20)}
                                                </div>
                                            </div>
                                        </div>
                                        <div className=" flex  w-[10.22rem] bg-[#eef2f9] h-8 ml-gap items-center justify-center max-sm:flex-row  max-sm:justify-between  ">
                                            <div class=" text-xs ml-gap font-poppins">
                                                {item.categoryName} {item.subCategoryName}
                                            </div>

                                        </div>
                                        <div className=" flex  w-[6.13rem] bg-[#eef2f9] h-8 ml-gap items-center justify-center max-sm:flex-row  max-sm:justify-between  ">
                                            <div class=" text-xs ml-gap font-poppins">
                                                {item.attributeName} {item.subAttributeName}
                                            </div>
                                        </div>
                                        {/* <div className=" flex font-medium flex-col  w-[5.02rem] max-sm:flex-row  max-sm:justify-between  ">
                                            <div class=" text-xs  font-poppins">
                                                {item.price}
                                            </div>
                                        </div> */}
                                        <div className=" flex  w-[5.10rem] bg-[#eef2f9] h-8 ml-gap items-center justify-center max-sm:flex-row  max-sm:justify-between  ">
                                            <div class=" text-xs  font-poppins">
                                                {item.unit}
                                            </div>
                                        </div>
                                        <div className=" flex   w-[8.03rem] bg-[#eef2f9] h-8 ml-gap items-center justify-center max-sm:flex-row  max-sm:justify-between  ">
                                            <div class="flex items-center">
                                            <div class=" text-xs  font-poppins mr-1">
                                                <PoReceiveToggle
                                                    poSupplierDetailsId={props.row.poSupplierDetailsId}
                                                    suppliesId={item.suppliesId}
                                                    poReceivedInd={item.poReceivedInd}
                                                    unitReceiveInd={item.unitReceiveInd}
                                                />
                                            </div>
                                            <MultiAvatar
                                                    primaryTitle={item.userName}
                                                    imgWidth={"1.8rem"}
                                                    imgHeight={"1.8rem"}
                                                />
                                                </div>
                                        </div>
                                        {/* <div className=" flex font-medium flex-col  w-[8.04rem] max-sm:flex-row  max-sm:justify-between  ">
                                            <div class=" text-xs  font-poppins">
                                                {item.userName}
                                            </div>
                                        </div> */}
                                        <div className=" flex  w-[7.12rem] bg-[#eef2f9] h-8 ml-gap items-center justify-center max-sm:flex-row  max-sm:justify-between  ">
                                            <div class=" text-xs  font-poppins">
                                                {showEdit && rowData.poSupplierSuppliesId === item.poSupplierSuppliesId ?
                                                     <Input
                                                     name="unitReceived"
                                                     value={formData.unitReceived}
                                                     onChange={handleChangeData}
                                                     placeholder="unitReceived"
                                                   />
                                                    : item.unitReceived}
                                            </div>
                                        </div>
                                        <div className=" flex  w-[6.12rem] bg-[#eef2f9] h-8 ml-gap items-center justify-center max-sm:flex-row  max-sm:justify-between  ">
                                            <div class=" text-xs  font-poppins">
                                                {showEdit && rowData.poSupplierSuppliesId === item.poSupplierSuppliesId ?
                                                    <Input
                                                    name="unitDamaged"
                                                    value={formData.unitDamaged}
                                                    onChange={handleChangeData}
                                                    placeholder="unitDamaged"
                                                  />
                                                    : item.unitDamaged}
                                            </div>
                                        </div>
                                        <div className=" flex w-[6.20rem] bg-[#eef2f9] h-8 ml-gap items-center justify-start max-sm:flex-row  max-sm:justify-between  ">
                                            <div class=" text-xs ml-gap font-poppins">
                                                {showEdit && rowData.poSupplierSuppliesId === item.poSupplierSuppliesId ?
                                                    <Input
                                                    name="remark"
                                                    value={formData.remark}
                                                    onChange={handleChangeData}
                                                    placeholder="remark"
                                                  />
                                                    : item.remark}
                                            </div>
                                        </div>



                                        <div className=" flex w-[6.21rem] bg-[#eef2f9] h-8 ml-gap items-center justify-center max-sm:flex-row  max-sm:justify-between  ">
                                            <div class=" text-xs  font-poppins">
                                                {showEdit && rowData.poSupplierSuppliesId === item.poSupplierSuppliesId ?
                                                    <Input
                                                    name="batchNo"
                                                    value={formData.batchNo}
                                                    onChange={handleChangeData}
                                                    placeholder="batchNo"
                                                  />
                                                    : item.batchNo}
                                            </div>
                                        </div>




                                        <div className=" flex w-[6.22rem] bg-[#eef2f9] h-8 ml-gap items-center justify-center max-sm:flex-row  max-sm:justify-between  ">
                                            <div class=" text-xs  font-poppins">
                                                {showEdit && rowData.poSupplierSuppliesId === item.poSupplierSuppliesId ?
                                                    //   <DatePicker
                                                    //   type="date"
                                                    //   name="bestBeforeUse"
                                                    //   //value={formData.bestBeforeUse}
                                                    //   onChange={handleChangeData}
                                                    // />
                                                    <DatePicker
                                                    value={formData.bestBeforeUse}
                                                    onChange={handleDateChange}
                                                    format="YYYY-MM-DD"
                                                    style={{ width: '100%' }}
                                                  />
                                                    : dayjs(item.bestBeforeUse).format('YYYY-MM-DD')}
                                                   
                                            </div>
                                        </div>

                                        <div className=" flex  w-[7.32rem] bg-[#eef2f9] h-8 ml-gap items-center justify-center max-sm:flex-row  max-sm:justify-between  ">
                                            <div class=" text-xs  font-poppins">
                                                {showEdit && rowData.poSupplierSuppliesId === item.poSupplierSuppliesId ?
                                                    <>
                                                        <Button
                                                            type="primary"
                                                            // onClick={() => {
                                                            //     if ((unitReceived <= item.unit && unitReceived >= 0) && (unitDamaged <= item.unit && unitDamaged >= 0)) {
                                                            //         props.updateReceivedDamagedUnit({
                                                            //             unitReceived: unitReceived,
                                                            //             unitDamaged: unitDamaged,
                                                            //             remark: remark,
                                                            //             userId: props.userId,
                                                            //             poSupplierSuppliesId: item.poSupplierSuppliesId,
                                                            //             poReceivedInd: true,
                                                            //             unitReceiveInd: true,

                                                            //         },
                                                            //             props.row.poSupplierDetailsId,
                                                            //             item.suppliesId,
                                                            //             handleCallback())
                                                            //     } else {
                                                            //         message.error("Receive and damage unit should be less than unit !")
                                                            //     }
                                                            // }}

                                                            onClick={() => handleSave(index,item)}
                                                            >
                                                                Update {props.translatedMenuItems[23]}
                                                                </Button>
                                                        <Button onClick={handleCancel}>
                                                            Cancel 
                                                            {/* {props.translatedMenuItems[24]} */}
                                                            </Button>
                                                    </>
                                                    : item.grnReceivedInd ? null :
                                                        item.poReceivedInd ?
                                                            <BorderColorIcon
                                                                className=" !text-icon cursor-pointer text-[tomato]"
                                                                onClick={() => {
                                                                    handleRowData(item);
                                                                    handleEditicon(index)
                                                                }}
                                                            /> : null
                                                }
                                            </div>
                                        </div>
                                        <div className=" flex w-[5.52rem] bg-[#eef2f9] h-8 ml-gap items-center justify-center max-sm:flex-row  max-sm:justify-between  ">
                                            <div class=" text-xs  font-poppins">
                                                {item.unitReceiveInd && !item.grnReceivedInd ? <Tooltip 
                                                // title="Check for grn"
                                                title={`${props.translatedMenuItems[25]} grn`}
                                                >
                                                    <AllowGrnToggle
                                                        allowGrnInd={item.allowGrnInd}
                                                        grnStockInd={item.grnStockInd}
                                                        poSupplierSuppliesId={item.poSupplierSuppliesId}
                                                        poSupplierDetailsId={props.row.poSupplierDetailsId}
                                                        translatedMenuItems={props.translatedMenuItems}
                                                    />

                                                </Tooltip> : null}
                                            </div>
                                        </div>

                                    </div>

                                </div>
                            );
                        })}
                    </InfiniteScroll>
                </div>
            </div>
            <div className=' flex justify-end mt-1'>
                {show &&
                    <Button
                        type='primary'
                        onClick={showModal}
                    >
                        {/* Generate GRN */} {props.translatedMenuItems[26]}
                    </Button>}
                <Modal
                    title=""
                    open={isModalOpen}
                    onOk={handleOk}
                    onCancel={handleCancelmodal}
                >
                    <div class=" text-xs font-bold font-poppins text-black">
                        {/* Select from existing GRN */} {props.translatedMenuItems[27]}

                    </div>
                    <div class=" flex justify-evenly">
                        <Switch
                            checked={existGrn}
                            checkedChildren="Yes"
                            unCheckedChildren="No"
                            onChange={handleChange}
                        />
                        {existGrn ?
                            <Select
                                width="100"
                                value={grnNo}
                                onChange={(value) =>
                                    handleChangeGrnId(value)
                                }
                            >
                                {props.grnNoByPo.map((a) => {
                                    return <Option value={a.grnId}>{a.grnNumber}</Option>;
                                })}
                            </Select> : null}
                    </div>


                </Modal>
            </div>
            <AddReceiveScan
            receivedData={receivedData}
            poSupplierDetailsId={props.row.poSupplierDetailsId}
            handleReceiveScanModal={props.handleReceiveScanModal}
            addReceivedScanModal={props.addReceivedScanModal}
            />

        </>
    );
}


const mapStateToProps = ({ inventory, auth }) => ({
    receivedDetailData: inventory.receivedDetailData,
    userId: auth.userDetails.userId,
    receivedScanData:inventory.receivedScanData,
    grnNoByPo: inventory.grnNoByPo,
    addReceivedScanModal:inventory.addReceivedScanModal,
    fetchingMaterialReceiveDetailData: inventory.fetchingMaterialReceiveDetailData
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getMaterialReceivedDetailData,
            updateReceivedDamagedUnit,
            generateGrnForPo,
            trnasferGrnItemToStock,
            getGrnNoByPoId,
            handleReceiveScanModal
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(ReceivedDetailCardOut);


