
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledTable } from "../../../../Components/UI/Antd";
import { getSpareListById } from "../RefurbishAction"
import ReciveSpareItemToggle from "./ReciveSpareItemToggle";

function ReceivedSpareList(props) {
    useEffect(() => {
        props.getSpareListById(props.data.phoneId)
    }, [])

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
            title: "Recived",
            width: "10%",
            render: (text, item) => {
                return (
                    <>
                        <ReciveSpareItemToggle
                            spareReleaseInd={item.spareReleaseInd}
                            sparePacketId={item.sparePacketId}
                        />
                    </>

                )
            }

        },
        {
            title: "",
            width: "10%",
            render: (text, item) => {
                return (
                    <>
                        <ReciveSpareItemToggle
                            spareReleaseInd={item.spareReleaseInd}
                            sparePacketId={item.sparePacketId}
                        />
                    </>

                )
            }
        },

    ];

    return (
        <>
            <StyledTable
                columns={columns}
                dataSource={props.rcvSpareList}
                pagination={false}
                loading={props.fetchingSpareListById}
            />

        </>
    );
}

const mapStateToProps = ({ refurbish, auth }) => ({
    fetchingSpareListById: refurbish.fetchingSpareListById,
    rcvSpareList: refurbish.rcvSpareList,
    userId: auth.userDetails.userId,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getSpareListById,
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(ReceivedSpareList);
