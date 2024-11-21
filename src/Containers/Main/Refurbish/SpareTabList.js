
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledTable } from "../../../Components/UI/Antd";
import { updateSparePacket } from "./RefurbishAction"
import CloseIcon from '@mui/icons-material/Close';
import { getSpareListByPhoneTaskId, deleteSpareList } from "../Account/AccountAction";
import DeleteIcon from '@mui/icons-material/Delete';
import { Popconfirm } from "antd";



function SpareTabList(props) {
    useEffect(() => {
        props.getSpareListByPhoneTaskId(props.phoneTaskId)
    }, [])

    const columns = [
        {
            title: "",
            dataIndex: "",
            width: "1%",
        },
        {
            title: "Spares",
            dataIndex: "suppliesName",
            width: "30%",
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
                        {item.attributeName} {item.subAttributeName}
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
            title: "Effort (hours)",
            dataIndex: "hours",
            width: "15%",
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
                                onConfirm={() => props.deleteSpareList({
                                    userId: props.userId
                                }, item.phoneTaskId)}
                            >

                                <DeleteIcon
                                    className="!text-icon cursor-pointer text-[red]"
                                />
                            </Popconfirm>
                        }
                    </>

                )
            }

        },

    ];
    console.log(props.phoneTaskId)
    console.log(props.phoneTaskIdSpareList)
    return (
        <>
        <div class="w-wk flex justify-end">
         <CloseIcon className='!text-icon cursor-pointer' onClick={props.onClose}/>
         </div>
            <StyledTable
                columns={columns}
                dataSource={props.phoneTaskIdSpareList}
                pagination={false}
                loading={props.fetchingSpareListByPhoneTaskId}
            />
            
        </>
    );
}

const mapStateToProps = ({ distributor, refurbish, auth }) => ({
    fetchingSpareListByPhoneId: distributor.fetchingSpareListByPhoneId,
    updatingSparePacket: refurbish.updatingSparePacket,
    spareList: distributor.spareList,
    userId: auth.userDetails.userId,
    phoneTaskIdSpareList:distributor.phoneTaskIdSpareList,
    fetchingSpareListByPhoneTaskId: distributor.fetchingSpareListByPhoneTaskId
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getSpareListByPhoneTaskId,
            deleteSpareList,
            updateSparePacket
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(SpareTabList);
