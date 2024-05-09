import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
    setEditDistributorContact,
    handleUpdateDistributorContactModal,
    getLobList,
    setContactRoleForAccount
} from "../../AccountAction";
import { getContactDistributorList, applyForLoginInContact } from "../../../Suppliers/SuppliersAction"
import { Tooltip, Button, Input, Select } from "antd";
import UpdateAccountContactModal from "./UpdateAccountContactModal";
import { getSaleCurrency } from "../../../../Auth/AuthAction";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { BundleLoader } from "../../../../../Components/Placeholder";
import { FormattedMessage } from "react-intl";
const ButtonGroup = Button.Group;
const { Option } = Select;
class AccountContactTable extends Component {

    componentDidMount() {
        this.props.getContactDistributorList(this.props.distributorId);
        this.props.getLobList(this.props.orgId);
        this.props.getSaleCurrency();
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

    handleAddPlusClick = (contactPersonId) => {

        let data = {

            icon: "C-Level",

        };

        this.props.setContactRoleForAccount(data, contactPersonId);
    };
    handleAddPlusClick1 = (contactPersonId) => {

        let data = {

            icon: "Strategic",

        };

        this.props.setContactRoleForAccount(data, contactPersonId);
    };
    handleAddPlusClick2 = (contactPersonId) => {

        let data = {

            icon: "Mid-Level",

        };

        this.props.setContactRoleForAccount(data, contactPersonId);
    };

    handleChange = (lobDetsilsId, contactPersonId) => {
        let data = {

            lobId: lobDetsilsId,

        };
        this.props.setContactRoleForAccount(data, lobDetsilsId, contactPersonId);
    }

    handleChange1 = (currencyId, contactPersonId) => {
        let data = {

            potentialCurrencyId: currencyId,

        };
        this.props.setContactRoleForAccount(data, currencyId, contactPersonId);
    }

    handleInputChange = (contactPersonId, e) => {
        const inputValue = e.target.value.trim(); // Trim to remove leading/trailing whitespaces
        if (inputValue !== '') {
            // Call the API with the input value
            this.setContactRoleForAccount(contactPersonId, inputValue);
        }
    }

    handleKeyPress = (contactPersonId, e) => {
        if (e.key === 'Enter') {
            const inputValue = e.target.value.trim(); // Trim to remove leading/trailing whitespaces
            if (inputValue !== '') {
                // Call the API with the input value
                this.setContactRoleForAccount(contactPersonId, inputValue);
            }
        }
    }

    render() {
        const {
            fetchingContactDistributorsById,
            setContactRoleForAccount
        } = this.props;
        if (fetchingContactDistributorsById) {
            return <BundleLoader />;
        }

        return (
            <>
                <div className=' flex justify-end sticky top-28 z-auto'>
                    <div class="rounded-lg m-5 p-2 w-[96%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
                        <div className=" flex justify-between w-[97.5%] px-2 bg-transparent font-bold sticky top-0 z-10">
                            <div className=" md:w-[5.1rem]"><FormattedMessage id="app.name" defaultMessage="Name" /></div>
                            <div className=" md:w-[6.01rem]"><FormattedMessage id="app.email" defaultMessage="Email" /></div>
                            <div className=" md:w-[4.8rem] "><FormattedMessage id="app.Mobile No" defaultMessage="Mobile No" /></div>
                            <div className="md:w-[5.9rem]"><FormattedMessage id="app.Designation" defaultMessage="Designation" /></div>
                            <div className="md:w-[16.6rem]"><FormattedMessage id="app.Department" defaultMessage="Department" /></div>
                            <div className="md:w-[4.7rem]">LOB</div>
                            <div className="md:w-[18.8rem]">Potential</div>
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

                                            <div className=" flex font-medium flex-col  md:w-[6.8rem] max-sm:flex-row w-full max-sm:justify-between  ">

                                                <div class=" text-xs text-cardBody font-poppins">
                                                    {`${item.salutation || ""} ${item.firstName || ""} ${item.middleName || ""
                                                        } ${item.lastName || ""}`}
                                                </div>

                                            </div>


                                            <div className=" flex font-medium flex-col  md:w-[7.23rem] max-sm:flex-row w-full max-sm:justify-between  ">


                                                <div class=" text-xs text-cardBody font-poppins">
                                                    {item.emailId}
                                                </div>

                                            </div>

                                        </div>

                                        <div className=" flex font-medium flex-col md:w-[6.023rem] max-sm:flex-row w-full max-sm:justify-between ">

                                            <div class=" text-xs text-cardBody font-poppins text-center">
                                                {` ${item.dialCode1 || ""} ${item.mobileNo || ""} `}

                                            </div>
                                        </div>
                                        <div className=" flex font-medium flex-col md:w-[8.21rem] max-sm:flex-row w-full max-sm:justify-between ">


                                            <div class=" text-xs text-cardBody font-poppins text-center">
                                                {item.designationName}

                                            </div>
                                        </div>

                                        <div className=" flex font-medium flex-col md:w-[9.01rem] max-sm:flex-row w-full max-sm:justify-between ">


                                            <div class=" text-xs text-cardBody font-poppins text-center">
                                                {item.departmentId}

                                            </div>
                                        </div>




                                        <div className=" flex font-medium flex-col w-[1.01rem] max-sm:flex-row  max-sm:justify-between  ">


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
                                        <div className=" flex font-medium  md:w-[7.27rem] max-sm:flex-row w-full max-sm:justify-between ">
                                            <div class=" text-xs text-cardBody font-poppins text-center">
                                                <div class=" flex justify-evenly" >
                                                    <ButtonGroup>
                                                        <RoleButton
                                                            type="DecisionMaker"
                                                            iconType="fa-vote-yea"
                                                            tooltip="C-Level"
                                                            role={item.contactRole}
                                                            onClick={() =>
                                                                this.handleAddPlusClick(

                                                                    item.contactPersonId,

                                                                )
                                                            }
                                                        />
                                                        <RoleButton
                                                            type="Evaluator"
                                                            iconType="fa-address-card"
                                                            tooltip="Strategic"
                                                            role={item.contactRole}
                                                            onClick={() =>
                                                                this.handleAddPlusClick1(

                                                                    item.contactPersonId,

                                                                )
                                                            }
                                                        />
                                                        <RoleButton
                                                            type="Influencer"
                                                            iconType="fa-hands-helping"
                                                            tooltip="Mid-Level"
                                                            role={item.contactRole}
                                                            onClick={() =>
                                                                this.handleAddPlusClick2(

                                                                    item.contactPersonId,

                                                                )
                                                            }
                                                        />

                                                    </ButtonGroup>

                                                </div>

                                            </div>
                                        </div>
                                        <div className=" flex font-medium flex-col  md:w-[8.2rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                            <div class=" text-xs text-cardBody font-poppins text-center">
                                                <Select
                                                    style={{ width: "8rem" }}
                                                    onChange={() =>
                                                        this.handleChange(

                                                            item.contactPersonId,

                                                        )
                                                    }
                                                //value={item.zone}
                                                // onChange={(e) => handleChangeRoomRack(e, item.manufactureId)}
                                                //onChange={this.handleChange}
                                                >
                                                    {this.props.lobList.map((sd) => (
                                                        <Option key={sd.lobId} value={sd.lobId}  >
                                                            {sd.name}
                                                        </Option>
                                                    ))}
                                                </Select>
                                            </div>
                                        </div>
                                        <div className=" flex font-medium   md:w-[6.2rem] max-sm:flex-row w-full max-sm:justify-between  ">

                                            <div class=" text-xs text-cardBody font-poppins text-center">
                                                <Input
                                                    onPressEnter={(e) => this.handleKeyPress(item.contactPersonId, e)} // Call handleKeyPress when Enter key is pressed
                                                    onChange={(e) => this.handleInputChange(item.contactPersonId, e)} // Call handleInputChange on input change
                                                />
                                            </div>
                                        </div>
                                        <div className=" flex font-medium   md:w-[8.41rem] max-sm:flex-row w-full max-sm:justify-between  ">

                                            <div class=" text-xs text-cardBody font-poppins text-center">
                                                <Select
                                                    style={{ width: "5rem" }}
                                                    onChange={() =>
                                                        this.handleChange1(
                                                            item.contactPersonId,
                                                        )
                                                    }
                                                >
                                                    {this.props.saleCurrencies.map((sd) => (
                                                        <Option key={sd.roomRackId} value={sd.roomRackId}>
                                                            {sd.currency_name}
                                                        </Option>
                                                    ))}
                                                </Select>
                                            </div>
                                        </div>

                                        <div className=" flex font-medium flex-col  md:w-[6.03rem] max-sm:flex-row w-full max-sm:justify-between  ">


                                            {item.accessInd === 0 ? <div class=" text-xs text-cardBody font-poppins">
                                                <Button
                                                    type="primary"
                                                    loading={this.state.rowData.contactPersonId === item.contactPersonId && this.props.applyingForLoginInContact}
                                                    onClick={() => {
                                                        this.handleChangeRow(item)
                                                        this.props.setEditDistributorContact(item);
                                                        this.props.applyForLoginInContact(
                                                            data,
                                                            item.contactPersonId,
                                                            this.props.userId,
                                                            this.props.distributorId,
                                                        )
                                                    }}
                                                ><FormattedMessage id="app.applyforlogin" defaultMessage="Apply For Login" /></Button>
                                            </div> : item.accessInd === 2 ? <b>Login Applied</b> : <b style={{ color: "#32CD32" }}>Login Approved</b>

                                            }

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

const mapStateToProps = ({ distributor, suppliers, auth }) => ({
    applyingForLoginInContact: suppliers.applyingForLoginInContact,
    contactDistributor: suppliers.contactDistributor,
    updateDistributorContactModal: distributor.updateDistributorContactModal,
    fetchingContactDistributorsById: distributor.fetchingContactDistributorsById,
    userId: auth.userDetails.userId,
    setEditingDistributorContact: distributor.setEditingDistributorContact,
    orgId: auth.userDetails.organizationId,
    lobList: distributor.lobList,
    saleCurrencies: auth.saleCurrencies
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            setEditDistributorContact,
            getContactDistributorList,
            applyForLoginInContact,
            handleUpdateDistributorContactModal,
            getLobList,
            getSaleCurrency,
            setContactRoleForAccount
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(AccountContactTable);
function RoleButton({ type, iconType, tooltip, role, size, onClick }) {
    if (role === type) {
        size = "1.375em";
    } else {
        size = "1em";
    }
    return (
        <Tooltip title={tooltip}>
            <Button
                style={{
                    padding: "0.375em",
                    borderColor: "transparent",
                    color: role === type ? "#1890ff" : "grey",
                }}
                ghost={role !== type}
                onClick={onClick}
            >
                <i className={`fas ${iconType}`} style={{ fontSize: "1.25em" }}></i>
            </Button>
        </Tooltip>
    );
}
