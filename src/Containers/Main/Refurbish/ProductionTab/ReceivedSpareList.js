
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Tooltip } from "antd";
import { StyledTable } from "../../../../Components/UI/Antd";
// import { updateSparePacket } from "./RefurbishAction"
// import { getSpareListByPhoneId, deleteSpareList } from "../Account/AccountAction";
// import RepairSpareApproveToggle from "./RepairSpareApproveToggle"
import DeleteIcon from '@mui/icons-material/Delete';
import { Popconfirm } from "antd";


function ReceivedSpareList(props) {
    // useEffect(() => {
    //     props.getSpareListByPhoneId(props.RowData.phoneId)
    // }, [])

    // let data = props.spareList.every((item) => item.spareUseInd)
    // console.log(data)
    // let phoneSpare = props.spareList.map((item) => item.phoneSpareId)
    const columns = [
        {
            title: "",
            dataIndex: "",
            width: "1%",
        },
        {
            title: "Spare",
            dataIndex: "suppliesName",
            width: "20%",
        },
        {
            title: "Category",
            width: "15%",
            render: (text, item) => {
                return (
                    <>
                        {item.categoryName} {item.subCategoryName}
                    </>
                )
            },
        },
        {
            title: "Attribute",
            render: (text, item) => {
                return (
                    <>
                        {item.attribute} {item.subAttribute}
                    </>
                )
            },
            width: "15%",
        },
        {
            title: "Units",
            dataIndex: "noOfSpare",
            width: "15%",
        },
        {
            title: "Hours",
            dataIndex: "hours",
            width: "15%",
        },

        {
            title: "Recived",
            width: "10%",
            render: (text, item) => {
                return (
                    <></>
                    // <RepairSpareApproveToggle
                    //     spareUseInd={item.spareUseInd}
                    //     phoneSpareId={item.phoneSpareId}
                    // />
                )
            }

        },
        {
            title: "",
            width: "10%",
            render: (text, item) => {
                return (
                    <>
                        {!item.spareUseInd &&
                            <Popconfirm
                                title="Do you want to delete?"
                            // onConfirm={() => props.deleteSpareList({
                            //     userId: props.userId
                            // }, item.phoneSpareId)}
                            >

                                <DeleteIcon
                                    className="text-base cursor-pointer text-[red]"
                                />
                            </Popconfirm>
                        }
                    </>

                )
            }

        },

    ];

    return (
        <>
            <StyledTable
                columns={columns}
                // dataSource={props.spareList}
                pagination={false}
                loading={props.fetchingSpareListByPhoneId}
            />
            {/* {data && <div class=" flex justify-end"> */}

            <Button
                // loading={props.updatingSparePacket}
                type="primary"
            // onClick={() => {
            //     props.updateSparePacket({
            //         sparePacketId: "",
            //         phoneId: props.RowData.phoneId,
            //         orderPhoneId: props.orderPhoneId,
            //         spareList: phoneSpare
            //     });
            // }}
            >Release Spare Packet</Button>
            {/* </div>} */}
        </>
    );
}

const mapStateToProps = ({ distributor, refurbish, auth }) => ({
    fetchingSpareListByPhoneId: distributor.fetchingSpareListByPhoneId,
    updatingSparePacket: refurbish.updatingSparePacket,
    spareList: distributor.spareList,
    userId: auth.userDetails.userId,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            // getSpareListByPhoneId,
            // deleteSpareList,
            // updateSparePacket
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(ReceivedSpareList);
