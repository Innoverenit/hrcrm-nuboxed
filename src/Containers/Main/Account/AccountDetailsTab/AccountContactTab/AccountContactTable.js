import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
    getContactDistributorList,
    setEditDistributorContact,
    applyForLoginInContact,
    handleUpdateDistributorContactModal
} from "../../AccountAction";
import UpdateAccountContactModal from "./UpdateAccountContactModal";
import { Button, Tooltip } from "antd";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { BundleLoader } from "../../../../../Components/Placeholder";
import { FormattedMessage } from "react-intl";

class AccountContactTable extends Component {

    componentDidMount() {
        this.props.getContactDistributorList(this.props.distributorId);
    }
    constructor(props) {
        super(props)

        this.state = {
            rowData: {}
        }
    }
    handleChangeRow(item) {
        this.setState({ rowData: item })
    }

    render() {
        const {
            fetchingContactDistributorsById

        } = this.props;
        if (fetchingContactDistributorsById) {
            return <BundleLoader />;
        }

        return (
            <>
                <div className=' flex justify-end sticky top-28 z-auto'>
                    <div class="rounded-lg m-5 p-2 w-[96%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
                        <div className=" flex justify-between w-[97.5%] px-2 bg-transparent font-bold sticky top-0 z-10">
                            <div className=" md:w-[3.1rem]"><FormattedMessage id="app.name" defaultMessage="Name" /></div>
                            <div className=" md:w-[3.1rem]"><FormattedMessage id="app.email" defaultMessage="Email" /></div>
                            <div className=" md:w-[4.8rem] "><FormattedMessage id="app.Mobile No" defaultMessage="Mobile No" /></div>
                            <div className="md:w-[2.9rem]"><FormattedMessage id="app.Designation" defaultMessage="Designation" /></div>
                            <div className="md:w-[27.8rem]"><FormattedMessage id="app.Department" defaultMessage="Department" /></div>


                        </div>
                        {/* <InfiniteScroll
        dataLength={customerByUserId.length}
        next={handleLoadMore}
        hasMore={hasMore}
        loader={fetchingCustomers?<div style={{ textAlign: 'center' }}>Loading...</div>:null}
        height={"75vh"}
      > */}

                        {this.props.contactDistributor.map((item) => {
                            const data = {}
                            return (
                                <div>
                                    <div className="flex rounded-xl justify-between mt-2 bg-white h-12 items-center p-3 "
                                    >
                                        <div class="flex">

                                            <div className=" flex font-medium flex-col  md:w-[10rem] max-sm:flex-row w-full max-sm:justify-between  ">

                                                <div class=" text-xs text-cardBody font-poppins">
                                                    {`${item.salutation || ""} ${item.firstName || ""} ${item.middleName || ""
                                                        } ${item.lastName || ""}`}
                                                </div>

                                            </div>


                                            <div className=" flex font-medium flex-col  md:w-28 max-sm:flex-row w-full max-sm:justify-between  ">


                                                <div class=" text-xs text-cardBody font-poppins">
                                                    {item.emailId}
                                                </div>

                                            </div>

                                        </div>

                                        <div className=" flex font-medium flex-col md:w-[16rem] max-sm:flex-row w-full max-sm:justify-between ">

                                            <div class=" text-xs text-cardBody font-poppins text-center">
                                                {` ${item.dialCode1 || ""} ${item.mobileNo || ""} `}

                                            </div>
                                        </div>
                                        <div className=" flex font-medium flex-col md:w-0 max-sm:flex-row w-full max-sm:justify-between ">


                                            <div class=" text-xs text-cardBody font-poppins text-center">
                                                {item.designationName}

                                            </div>
                                        </div>

                                        <div className=" flex font-medium flex-col md:w-96 max-sm:flex-row w-full max-sm:justify-between ">


                                            <div class=" text-xs text-cardBody font-poppins text-center">
                                                {item.departmentId}

                                            </div>
                                        </div>

                                        <div class="flex md:items-center">
                                            <div class="flex">
                                                <div className=" flex font-medium flex-col  md:w-28 max-sm:flex-row w-full max-sm:justify-between  ">


                                                    {!item.accessInd && <div class=" text-xs text-cardBody font-poppins">
                                                        <Button
                                                            type="primary"
                                                            loading={this.state.rowData.contactPersonId === item.contactPersonId && this.props.applyingForLoginInContact}
                                                            onClick={() => {
                                                                this.handleChangeRow(item)
                                                                this.props.setEditDistributorContact(item);
                                                                this.props.applyForLoginInContact(
                                                                    data,
                                                                    item.contactPersonId,
                                                                    this.props.distributorId,
                                                                    this.props.userId
                                                                )
                                                            }}
                                                        ><FormattedMessage id="app.applyforlogin" defaultMessage="Apply For Login" /></Button>
                                                    </div>}

                                                </div>
                                                <div className=" flex font-medium flex-col  md:w-28 max-sm:flex-row w-full max-sm:justify-between  ">


                                                    <div class=" text-xs text-cardBody font-poppins">
                                                        <Tooltip title="Edit">
                                                            <BorderColorIcon
                                                                className="!text-base cursor-pointer text-[grey]"
                                                                onClick={() => {
                                                                    this.props.setEditDistributorContact(item);
                                                                    this.props.handleUpdateDistributorContactModal(true);
                                                                }}
                                                            />
                                                        </Tooltip>
                                                    </div>

                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>


                            )
                        })}

                    </div>
                </div>

                <UpdateAccountContactModal
                    handleUpdateDistributorContactModal={this.props.handleUpdateDistributorContactModal}
                    updateDistributorContactModal={this.props.updateDistributorContactModal}
                />
            </>
        );
    }
}

const mapStateToProps = ({ distributor, auth }) => ({
    applyingForLoginInContact: distributor.applyingForLoginInContact,
    contactDistributor: distributor.contactDistributor,
    updateDistributorContactModal: distributor.updateDistributorContactModal,
    fetchingContactDistributorsById: distributor.fetchingContactDistributorsById,
    userId: auth.userDetails.userId,
    setEditingDistributorContact: distributor.setEditingDistributorContact,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            setEditDistributorContact,
            getContactDistributorList,
            applyForLoginInContact,
            handleUpdateDistributorContactModal
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(AccountContactTable);

// const columns = [
//     {
//         title: "",
//         width: "2%",
//     },

//     {
//         title: "Name",
//         width: "15%",
//         render: (name, item, i) => {
//             return ` ${item.salutation || ""} ${item.firstName ||
//                 ""} ${item.middleName || ""} ${item.lastName || ""}`
//         }

//     },
//     {
//         title: "Email",
//         width: "15%",
//         dataIndex: "emailId",
//     },
//     {
//         title: "Mobile No",
//         width: "15%",
//         render: (name, item, i) => {
//             return ` ${item.dialCode1 || ""} ${item.mobileNo || ""} `
//         }
//     },
//     {
//         title: "Designation",
//         dataIndex: "designationName",
//         width: "15%",
//     },
//     {
//         title: "Department",
//         dataIndex: "departmentName",
//         width: "15%",
//     },
//     {
//         title: "",
//         width: "12%",
//         render: (name, item, i) => {
//             const data = {}
//             return (

//                 <>
//                     {/* {!item.accessInd && */}
//                     <Button
//                         onClick={() =>
//                             this.props.applyForLoginInContact(
//                                 data,
//                                 item.contactPersonId,
//                                 this.props.distributorId,
//                                 this.props.userId
//                             )}
//                         style={{ backgroundColor: "blue", color: "white" }}
//                     >Apply For Login</Button>
//                     {/* } */}
//                 </>
//             )
//         }
//     },
//     {
//         title: "",
//         width: "3%",
//         render: (name, item, i) => {
//             return (
//                 <Tooltip title="Edit">
//                     <BorderColorOutlined
//                         style={{ cursor: "pointer" }}
//                         onClick={() => {
//                             this.props.setEditDistributorContact(item);
//                             this.props.handleUpdateDistributorContactModal(true);
//                         }}
//                     />
//                 </Tooltip>
//             );
//         },
//     },
// ];


