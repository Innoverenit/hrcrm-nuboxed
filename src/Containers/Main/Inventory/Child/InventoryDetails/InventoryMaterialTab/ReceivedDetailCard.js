import React, { useEffect, useState } from 'react'
import {
    getMaterialReceivedDetailData,
    updateReceivedDamagedUnit,
    generateGrnForPo,
    getGrnNoByPoId
} from "../../../InventoryAction"
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { Button, Input, Modal, Select, Switch, Tooltip, message } from 'antd';
import PoReceiveToggle from './PoReceiveToggle';
import { FormattedMessage } from 'react-intl';
import { trnasferGrnItemToStock } from "../../../InventoryAction"
import AllowGrnToggle from './AllowGrnToggle';
import InfiniteScroll from 'react-infinite-scroll-component';
import { StyledLabel } from '../../../../../../Components/UI/Elements';

const { Option } = Select;

const ReceivedDetailCard = (props) => {
    useEffect(() => {
        props.getMaterialReceivedDetailData(props.row.poSupplierDetailsId)
        props.getGrnNoByPoId(props.row.poSupplierDetailsId)
    }, [])
    const [existGrn, setExistGrn] = useState(true)
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
    const handleEditicon = () => {
        setShowEdit(!showEdit)
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
    return (
        <>
            <div className=' flex justify-end sticky z-auto'>
                <div class="rounded-lg m-5 p-2 w-[96%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
                    <div className=" flex  w-[100%] px-2 bg-transparent font-bold sticky top-0 z-10">
                        <div className=""></div>
                        <div className=" w-[28.51rem]"><FormattedMessage id="app.name" defaultMessage="Name" /></div>
                        <div className=" w-[22.02rem]"><FormattedMessage id="app.Category" defaultMessage="Category" /></div>
                        <div className=" w-[13.01rem]"><FormattedMessage id="app.Attribute" defaultMessage="Attribute" /></div>
                        <div className=" w-[10.12rem]"><FormattedMessage id="app.Price" defaultMessage="Price" /></div>
                        <div className=" w-[11.02rem]"><FormattedMessage id="app.Unit" defaultMessage="Units" /></div>
                        <div className=" w-[15.12rem]"><FormattedMessage id="app.Received" defaultMessage="Received" /></div>
                        <div className=" w-[10.14rem]"><FormattedMessage id="app.created" defaultMessage="Created" /></div>
                        <div className=" w-[15.21rem]"><FormattedMessage id="app.Received" defaultMessage="Receive" /></div>
                        <div className=" w-[15.17rem]"><FormattedMessage id="app.Damaged" defaultMessage="Damaged" /></div>
                        <div className=" w-[28.47rem]"><FormattedMessage id="app.Remark" defaultMessage="Remark" /></div>

                        <div className=""></div>
                        <div className=" w-[15.19rem]"><FormattedMessage id="app.creategrn" defaultMessage="Create GRN" /></div>
                        <div className=""></div>
                    </div>
                    <InfiniteScroll
                        dataLength={props.receivedDetailData.length}
                        next={handleLoadMore}
                        hasMore={hasMore}
                        loader={props.fetchingMaterialReceiveDetailData ? <div class="text-center font-semibold text-xs">Loading...</div> : null}
                        height={"60vh"}
                    >
                        {props.receivedDetailData.map((item) => {

                            return (
                                <div>
                                    <div className="flex rounded-xl  mt-2 bg-white h-12 items-center p-3 ">
                                        <div class="flex">
                                            <div className=" flex font-medium flex-col w-[11.122rem] max-sm:w-full  ">
                                                <div class="flex justify-between text-sm text-cardBody font-semibold  font-poppins ">
                                                    {item.suppliesFullName.substring(0, 20)}
                                                </div>
                                            </div>
                                        </div>
                                        <div className=" flex font-medium flex-col  w-[11.22rem] max-sm:flex-row  max-sm:justify-between  ">
                                            <div class=" text-xs text-cardBody font-poppins">
                                                {item.categoryName} {item.subCategoryName}
                                            </div>

                                        </div>
                                        <div className=" flex font-medium flex-col  w-[6.13rem] max-sm:flex-row  max-sm:justify-between  ">
                                            <div class=" text-xs text-cardBody font-poppins">
                                                {item.attributeName} {item.subAttributeName}
                                            </div>
                                        </div>
                                        <div className=" flex font-medium flex-col  w-[5.02rem] max-sm:flex-row  max-sm:justify-between  ">
                                            <div class=" text-xs text-cardBody font-poppins">
                                                {item.price}
                                            </div>
                                        </div>
                                        <div className=" flex font-medium flex-col  w-[4.10rem] max-sm:flex-row  max-sm:justify-between  ">
                                            <div class=" text-xs text-cardBody font-poppins">
                                                {item.unit}
                                            </div>
                                        </div>
                                        <div className=" flex font-medium flex-col  w-[4.03rem] max-sm:flex-row  max-sm:justify-between  ">
                                            <div class=" text-xs text-cardBody font-poppins">
                                                <PoReceiveToggle
                                                    poSupplierDetailsId={props.row.poSupplierDetailsId}
                                                    suppliesId={item.suppliesId}
                                                    poReceivedInd={item.poReceivedInd}
                                                    unitReceiveInd={item.unitReceiveInd}
                                                />
                                            </div>
                                        </div>
                                        <div className=" flex font-medium flex-col  w-[8.04rem] max-sm:flex-row  max-sm:justify-between  ">
                                            <div class=" text-xs text-cardBody font-poppins">
                                                {item.userName}
                                            </div>
                                        </div>
                                        <div className=" flex font-medium flex-col  w-[7.12rem] max-sm:flex-row  max-sm:justify-between  ">
                                            <div class=" text-xs text-cardBody font-poppins">
                                                {showEdit && rowData.poSupplierSuppliesId === item.poSupplierSuppliesId ?
                                                    <Input
                                                        value={unitReceived}
                                                        type="text"
                                                        placeholder='Received'
                                                        onChange={(e) => handleUnitReceived(e.target.value)}
                                                    />
                                                    : item.unitReceived}
                                            </div>
                                        </div>
                                        <div className=" flex font-medium flex-col  w-[6.12rem] max-sm:flex-row  max-sm:justify-between  ">
                                            <div class=" text-xs text-cardBody font-poppins">
                                                {showEdit && rowData.poSupplierSuppliesId === item.poSupplierSuppliesId ?
                                                    <Input
                                                        value={unitDamaged}
                                                        type="text"
                                                        placeholder='Damaged'
                                                        onChange={(e) => handleUnitDamaged(e.target.value)}
                                                    />
                                                    : item.unitDamaged}
                                            </div>
                                        </div>
                                        <div className=" flex font-medium flex-col w-[6.22rem] max-sm:flex-row  max-sm:justify-between  ">
                                            <div class=" text-xs text-cardBody font-poppins">
                                                {showEdit && rowData.poSupplierSuppliesId === item.poSupplierSuppliesId ?
                                                    <Input
                                                        value={remark}
                                                        type="text"
                                                        placeholder='Remark'
                                                        onChange={(e) => handleRemark(e.target.value)}
                                                    />
                                                    : item.remark}
                                            </div>
                                        </div>

                                        <div className=" flex font-medium flex-col  w-[7.32rem] max-sm:flex-row  max-sm:justify-between  ">
                                            <div class=" text-xs text-cardBody font-poppins">
                                                {showEdit && rowData.poSupplierSuppliesId === item.poSupplierSuppliesId ?
                                                    <>
                                                        <Button
                                                            type="primary"
                                                            onClick={() => {
                                                                if ((unitReceived <= item.unit && unitReceived >= 0) && (unitDamaged <= item.unit && unitDamaged >= 0)) {
                                                                    props.updateReceivedDamagedUnit({
                                                                        unitReceived: unitReceived,
                                                                        unitDamaged: unitDamaged,
                                                                        remark: remark,
                                                                        userId: props.userId,
                                                                        poSupplierSuppliesId: item.poSupplierSuppliesId,
                                                                        poReceivedInd: true,
                                                                        unitReceiveInd: true,

                                                                    },
                                                                        props.row.poSupplierDetailsId,
                                                                        item.suppliesId,
                                                                        handleCallback())
                                                                } else {
                                                                    message.error("Receive and damage unit should be less than unit !")
                                                                }
                                                            }}
                                                        >Add</Button>
                                                        <Button onClick={handleCancel}>Cancel</Button>
                                                    </>
                                                    : item.grnReceivedInd ? null :
                                                        item.poReceivedInd ?
                                                            <BorderColorIcon
                                                                className=" !text-base cursor-pointer text-[tomato]"
                                                                onClick={() => {
                                                                    handleRowData(item);
                                                                    handleEditicon()
                                                                }}
                                                            /> : null
                                                }
                                            </div>
                                        </div>
                                        <div className=" flex font-medium flex-col  w-[5.52rem] max-sm:flex-row  max-sm:justify-between  ">
                                            <div class=" text-xs text-cardBody font-poppins">
                                                {item.unitReceiveInd && !item.grnReceivedInd ? <Tooltip title="Check for grn">
                                                    <AllowGrnToggle
                                                        allowGrnInd={item.allowGrnInd}
                                                        grnStockInd={item.grnStockInd}
                                                        poSupplierSuppliesId={item.poSupplierSuppliesId}
                                                        poSupplierDetailsId={props.row.poSupplierDetailsId}
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
                    Generate GRN
                </Button>}
                <Modal
                    title=""
                    open={isModalOpen}
                    onOk={handleOk}
                    onCancel={handleCancelmodal}
                >
                    <StyledLabel>Select from existing GRN</StyledLabel>
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

        </>
    );
}


const mapStateToProps = ({ inventory, auth }) => ({
    receivedDetailData: inventory.receivedDetailData,
    userId: auth.userDetails.userId,
    grnNoByPo: inventory.grnNoByPo,
    fetchingMaterialReceiveDetailData: inventory.fetchingMaterialReceiveDetailData
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getMaterialReceivedDetailData,
            updateReceivedDamagedUnit,
            generateGrnForPo,
            trnasferGrnItemToStock,
            getGrnNoByPoId
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(ReceivedDetailCard);


