// import React, { Component, lazy, Suspense } from "react";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import {
//     setEditDistributorContact,
//     handleUpdateDistributorContactModal,
//     getLobList,
//     setContactRoleForAccount
// } from "../../AccountAction";
// import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
// import { getContactDistributorList, applyForLoginInContact } from "../../../Suppliers/SuppliersAction"
// import { Tooltip, Button, Input, Select } from "antd";
// import { getSaleCurrency } from "../../../../Auth/AuthAction";
// import BorderColorIcon from "@mui/icons-material/BorderColor";
// import { BundleLoader } from "../../../../../Components/Placeholder";
// import { FormattedMessage } from "react-intl";

// const UpdateAccountContactModal = lazy(() => import('./UpdateAccountContactModal'));
// const AccountContactJumpstartBoxDrawer = lazy(() => import('./AccountContactJumpstartBoxDrawer'));
// const ButtonGroup = Button.Group;
// const { Option } = Select;
// class AccountContactTable extends Component {
//     state = {
//         visible: false,
//       };

//       constructor(props) {
//         super(props);
//         this.state = {
//           translatedMenuItems: [],
//           rowData: {}
//         };
//       }
        
    
      
    
//       componentDidUpdate(prevProps) {
//         if (prevProps.selectedLanguage !== this.props.selectedLanguage) {
//           this.fetchMenuTranslations();
//         }
//       }
    
//       fetchMenuTranslations = async () => {
//         try {
//           const itemsToTranslate = [
//             "Name",//0 
//             "Email",//1
//             "Mobile ",//2
//             "Designation",//3
//             "Department",//4
//             "LOB",//5
//             "Potential",//6
//            ];
    
//           const translations = await this.props.translateText(itemsToTranslate, this.props.selectedLanguage);
//           this.setState({ translatedMenuItems: translations });
//         } catch (error) {
//           console.error('Error translating menu items:', error);
//         }
//       };
//     componentDidMount() {
//         this.props.getContactDistributorList(this.props.distributorId);
//         this.props.getLobList(this.props.orgId);
//         this.props.getSaleCurrency();
//         this.fetchMenuTranslations();
//     }
   
//     handleChangeRow(item) {
//         this.setState({ rowData: item })
//     }

//     handleAddPlusClick = (contactPersonId) => {

//         let data = {

//             icon: "C-Level",

//         };

//         this.props.setContactRoleForAccount(data, contactPersonId);
//     };
//     handleAddPlusClick1 = (contactPersonId) => {

//         let data = {

//             icon: "Strategic",

//         };

//         this.props.setContactRoleForAccount(data, contactPersonId);
//     };
//     handleAddPlusClick2 = (contactPersonId) => {

//         let data = {

//             icon: "Mid-Level",

//         };

//         this.props.setContactRoleForAccount(data, contactPersonId);
//     };

//     handleChange = (lobDetsilsId, contactPersonId) => {
//         let data = {

//             lobId: lobDetsilsId,

//         };
//         this.props.setContactRoleForAccount(data, lobDetsilsId, contactPersonId);
//     }

//     handleChange1 = (currencyId, contactPersonId) => {
//         let data = {

//             potentialCurrencyId: currencyId,

//         };
//         this.props.setContactRoleForAccount(data, currencyId, contactPersonId);
//     }

//     handleInputChange = (contactPersonId, e) => {
//         const inputValue = e.target.value.trim(); // Trim to remove leading/trailing whitespaces
//         if (inputValue !== '') {
//             // Call the API with the input value
//             this.setContactRoleForAccount(contactPersonId, inputValue);
//         }
//     }

//     handleKeyPress = (contactPersonId, e) => {
//         if (e.key === 'Enter') {
//             const inputValue = e.target.value.trim(); // Trim to remove leading/trailing whitespaces
//             if (inputValue !== '') {
//                 // Call the API with the input value
//                 this.setContactRoleForAccount(contactPersonId, inputValue);
//             }
//         }
//     }

//     showModal = () => {
//         this.setState({ visible: true });
//       };
    
//       handleOk = () => {
//         this.setState({ visible: false });
//       };
    
//       handleCancel = () => {
//         this.setState({ visible: false });
//       };

//     render() {
//         const {
//             fetchingContactDistributorsById,
//             setContactRoleForAccount
//         } = this.props;
//         if (fetchingContactDistributorsById) {
//             return <BundleLoader />;
//         }

//         return (
//             <>
//                 <div className=' flex  sticky h-70 z-auto'>
//                     <div class="rounded m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
//                         <div className=" flex justify-between w-[100%]  p-1 bg-transparent font-bold sticky  z-10">
//                             <div className=" md:w-[5.1rem]">
//                             {this.state.translatedMenuItems[0]}{/* <FormattedMessage id="app.name" defaultMessage="Name" /> */}
//                                 </div>
//                             <div className=" md:w-[6.01rem]">
//                             {this.state.translatedMenuItems[1]} {/* <FormattedMessage id="app.email" defaultMessage="Email" /> */}
//                                 </div>
//                             <div className=" md:w-[4.8rem] ">
//                             {this.state.translatedMenuItems[2]} {/* <FormattedMessage id="app.Mobile No" defaultMessage="Mobile No" /> */}
//                                 </div>
//                             <div className="md:w-[5.9rem]">
//                             {this.state.translatedMenuItems[3]}{/* <FormattedMessage id="app.Designation" defaultMessage="Designation" /> */}
//                                 </div>
//                             <div className="md:w-[16.6rem]">
//                             {this.state.translatedMenuItems[4]}     {/* <FormattedMessage id="app.Department" defaultMessage="Department" /> */}
//                                 </div>
//                             <div className="md:w-[4.7rem]">
//                             {this.state.translatedMenuItems[5]} {/* LOB */}
//                                 </div>
//                             <div className="md:w-[18.8rem]">
//                             {this.state.translatedMenuItems[6]}  {/* Potential */}
//                                 </div>
//                         </div>
//                         {/* <InfiniteScroll
//         dataLength={customerByUserId.length}
//         next={handleLoadMore}
//         hasMore={hasMore}
//         loader={fetchingCustomers?<div style={{ textAlign: 'center' }}>Loading...</div>:null}
//         height={"75vh"}
//       > */}

//                         {this.props.contactDistributor.map((item) => {
//                             const data = {}
//                             return (
//                                 <div >
//                                     <div className="flex  rounded justify-between mt-1 bg-white h-8 items-center p-1  scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]"
//                                     >
//                                         <div class="flex">

//                                             <div className=" flex font-bold  md:w-[6.8rem] max-sm:flex-row w-full max-sm:justify-between  ">

//                                                 <div class=" text-xs  font-poppins">
//                                                     {`${item.salutation || ""} ${item.firstName || ""} ${item.middleName || ""
//                                                         } ${item.lastName || ""}`}
//                                                 </div>

//                                             </div>


//                                             <div className=" flex   md:w-[7.23rem] max-sm:flex-row w-full max-sm:justify-between  ">


//                                                 <div class=" text-xs  font-poppins">
//                                                     {item.emailId}
//                                                 </div>

//                                             </div>

//                                         </div>

//                                         <div className=" flex md:w-[6.023rem] max-sm:flex-row w-full max-sm:justify-between ">

//                                             <div class=" text-xs  font-poppins text-center">
//                                                 {` ${item.dialCode1 || ""} ${item.mobileNo || ""} `}

//                                             </div>
//                                         </div>
//                                         <div className=" flex md:w-[8.21rem] max-sm:flex-row w-full max-sm:justify-between ">


//                                             <div class=" text-xs  font-poppins text-center">
//                                                 {item.designationName}

//                                             </div>
//                                         </div>

//                                         <div className=" flex md:w-[9.01rem] max-sm:flex-row w-full max-sm:justify-between ">


//                                             <div class=" text-xs  font-poppins text-center">
//                                                 {item.departmentId}

//                                             </div>
//                                         </div>




                                       
//                                         <div className=" flex md:w-[7.27rem] max-sm:flex-row w-full max-sm:justify-between ">
//                                             <div class=" text-xs  font-poppins text-center">
//                                                 <div class=" flex justify-evenly" >
//                                                     <ButtonGroup>
//                                                         <RoleButton
//                                                             className=" !text-icon text-green-600"
//                                                             type="DecisionMaker"
//                                                             iconType="fa-vote-yea"
//                                                             tooltip="C-Level"
//                                                             role={item.contactRole}
//                                                             onClick={() =>
//                                                                 this.handleAddPlusClick(

//                                                                     item.contactPersonId,

//                                                                 )
//                                                             }
//                                                         />
//                                                         <RoleButton
//                                                           className=" !text-icon text-blue-600"
//                                                             type="Evaluator"
//                                                             iconType="fa-address-card"
//                                                             tooltip="Strategic"
//                                                             role={item.contactRole}
//                                                             onClick={() =>
//                                                                 this.handleAddPlusClick1(

//                                                                     item.contactPersonId,

//                                                                 )
//                                                             }
//                                                         />
//                                                         <RoleButton
//                                                           className=" !text-icon text-blue-600"
//                                                             type="Influencer"
//                                                             iconType="fa-hands-helping"
//                                                             tooltip="Mid-Level"
//                                                             role={item.contactRole}
//                                                             onClick={() =>
//                                                                 this.handleAddPlusClick2(

//                                                                     item.contactPersonId,

//                                                                 )
//                                                             }
//                                                         />

//                                                     </ButtonGroup>

//                                                 </div>

//                                             </div>
//                                         </div>
//                                         <div className=" flex w-[1.01rem] max-sm:flex-row  max-sm:justify-between  ">


// <div class=" !text-icon  font-poppins">
//     <Tooltip title="Edit">
//         <BorderColorIcon
//             className="!text-icon cursor-pointer text-red-600"
//             onClick={() => {
//                 this.props.setEditDistributorContact(item);
//                 this.props.handleUpdateDistributorContactModal(true);
//             }}
//         />
//     </Tooltip>
// </div>

// </div>
//                                         <div className=" flex   md:w-[8.2rem] max-sm:flex-row w-full max-sm:justify-between  ">
//                                             <div class=" text-xs  font-poppins text-center">
//                                                 <Select
//                                                     style={{ width: "8rem" }}
//                                                     onChange={() =>
//                                                         this.handleChange(

//                                                             item.contactPersonId,

//                                                         )
//                                                     }
//                                                 //value={item.zone}
//                                                 // onChange={(e) => handleChangeRoomRack(e, item.manufactureId)}
//                                                 //onChange={this.handleChange}
//                                                 >
//                                                     {this.props.lobList.map((sd) => (
//                                                         <Option key={sd.lobDetsilsId} value={sd.lobDetsilsId}  >
//                                                             {sd.name}
//                                                         </Option>
//                                                     ))}
//                                                 </Select>
//                                             </div>
//                                         </div>
//                                         <div className=" flex  md:w-[6.2rem] max-sm:flex-row w-full max-sm:justify-between  ">

//                                             <div class=" text-xs  font-poppins text-center">
//                                                 <Input
//                                                     onPressEnter={(e) => this.handleKeyPress(item.contactPersonId, e)} // Call handleKeyPress when Enter key is pressed
//                                                     onChange={(e) => this.handleInputChange(item.contactPersonId, e)} // Call handleInputChange on input change
//                                                 />
//                                             </div>
//                                         </div>
//                                         <div className=" flex   md:w-[8.41rem] max-sm:flex-row w-full max-sm:justify-between  ">

//                                             <div class=" text-xs  font-poppins text-center">
//                                                 <Select
//                                                     style={{ width: "5rem" }}
//                                                     onChange={() =>
//                                                         this.handleChange1(
//                                                             item.contactPersonId,
//                                                         )
//                                                     }
//                                                 >
//                                                     {this.props.saleCurrencies.map((sd) => (
//                                                         <Option key={sd.currency_id} value={sd.currency_id}>
//                                                             {sd.currency_name}
//                                                         </Option>
//                                                     ))}
//                                                 </Select>
//                                             </div>
//                                         </div>

//                                         <div className=" flex  md:w-[7.03rem] max-sm:flex-row w-full max-sm:justify-between  ">


//                                             {item.accessInd === 0 ? <div class=" text-xs  font-poppins">
//                                                 <Button
//                                                     type="primary"
//                                                     loading={this.state.rowData.contactPersonId === item.contactPersonId && this.props.applyingForLoginInContact}
//                                                     onClick={() => {
//                                                         this.handleChangeRow(item)
//                                                         this.props.setEditDistributorContact(item);
//                                                         this.props.applyForLoginInContact(
//                                                             data,
//                                                             item.contactPersonId,
//                                                             this.props.userId,
//                                                               "Customer Contact To User",
//                                                             this.props.distributorId,
                                                          
//                                                         )
//                                                     }}
//                                                 ><FormattedMessage id="app.applyforlogin" defaultMessage="Apply For Login" /></Button>
//                                             </div> : item.accessInd === 2 ? <b>Login Applied</b> : <b style={{ color: "#32CD32" }}>Login Approved</b>

//                                             }

//                                         </div>
// <div><Tooltip title="Pulse">
//                             <MonitorHeartIcon
//                               className=" !text-icon cursor-pointer text-[#df9697]"
//                               onClick={() => {
//                                 this.showModal();
//                                 this.handleChangeRow(item)
//                                 // handleSetCurrentCustomer(item);
//                               }}

//                             />
//                           </Tooltip></div>
//                                     </div>
//                                 </div>


//                             )
//                         })}

//                     </div>
//                 </div>
//                 <Suspense fallback={<BundleLoader />}>
//                 <UpdateAccountContactModal
//                     selectedLanguage={this.props.selectedLanguage}
//                     translateText={this.props.translateText}
//                     handleUpdateDistributorContactModal={this.props.handleUpdateDistributorContactModal}
//                     updateDistributorContactModal={this.props.updateDistributorContactModal}
//                 />
//                 <AccountContactJumpstartBoxDrawer
//                     selectedLanguage={this.props.selectedLanguage}
//                     translateText={this.props.translateText}
//                 showModal={this.showModal}
//                 rowData={this.state.rowData}
//                 handleCancel={this.handleCancel}
//                 visible={this.state.visible}
//                 />
//                 </Suspense>
//             </>
//         );
//     }
// }

// const mapStateToProps = ({ distributor, suppliers, auth }) => ({
//     applyingForLoginInContact: suppliers.applyingForLoginInContact,
//     contactDistributor: suppliers.contactDistributor,
//     updateDistributorContactModal: distributor.updateDistributorContactModal,
//     fetchingContactDistributorsById: distributor.fetchingContactDistributorsById,
//     userId: auth.userDetails.userId,
//     setEditingDistributorContact: distributor.setEditingDistributorContact,
//     orgId: auth.userDetails.organizationId,
//     lobList: distributor.lobList,
//     saleCurrencies: auth.saleCurrencies
// });

// const mapDispatchToProps = (dispatch) =>
//     bindActionCreators(
//         {
//             setEditDistributorContact,
//             getContactDistributorList,
//             applyForLoginInContact,
//             handleUpdateDistributorContactModal,
//             getLobList,
//             getSaleCurrency,
//             setContactRoleForAccount
//         },
//         dispatch
//     );

// export default connect(mapStateToProps, mapDispatchToProps)(AccountContactTable);
// function RoleButton({ type, iconType, tooltip, role, size, onClick }) {
//     if (role === type) {
//         size = "1.375em";
//     } else {
//         size = "1em";
//     }
//     return (
//         <Tooltip title={tooltip}>
//             <Button
//                 style={{
//                     padding: "0.375em",
//                     borderColor: "transparent",
//                     color: role === type ? "#1890ff" : "grey",
//                 }}
//                 ghost={role !== type}
//                 onClick={onClick}
//             >
//                 <i className={`fas ${iconType}`} style={{ fontSize: "1.25em" }}></i>
//             </Button>
//         </Tooltip>
//     );
// }


import React, { useState, useEffect, lazy, Suspense, useCallback } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
    setEditDistributorContact,
    handleUpdateDistributorContactModal,
    getLobList,
    setContactRoleForAccount
} from "../../AccountAction";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import { getContactDistributorList, applyForLoginInContact } from "../../../Suppliers/SuppliersAction";
import { Tooltip, Button, Input, Select } from "antd";
import { getSaleCurrency } from "../../../../Auth/AuthAction";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { BundleLoader } from "../../../../../Components/Placeholder";
import { FormattedMessage } from "react-intl";

const UpdateAccountContactModal = lazy(() => import('./UpdateAccountContactModal'));
const AccountContactJumpstartBoxDrawer = lazy(() => import('./AccountContactJumpstartBoxDrawer'));
const ButtonGroup = Button.Group;
const { Option } = Select;

const AccountContactTable = (props) => {
    const [visible, setVisible] = useState(false);
    const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
    const [rowData, setRowData] = useState("");

    useEffect(() => {
        props.getContactDistributorList(props.distributorId);
        props.getLobList(props.orgId);
        props.getSaleCurrency();
        fetchMenuTranslations();
    }, [props.selectedLanguage]);

    const fetchMenuTranslations = async () => {
        try {
            const itemsToTranslate = [
                "Name",
                "Email",
                "Mobile",
                "Designation",
                "Department",
                "LOB",
                "Potential"
            ];

            const translations = await props.translateText(itemsToTranslate, props.selectedLanguage);
            setTranslatedMenuItems(translations);
        } catch (error) {
            console.error('Error translating menu items:', error);
        }
    };

    const handleChangeRow = (item) => {
        setRowData(item);
    };

    const handleAddPlusClick = (contactPersonId, icon) => {
        const data = { icon };
        props.setContactRoleForAccount(data, contactPersonId);
    };

    const handleChange = (lobDetsilsId, contactPersonId) => {
        const data = { lobId: lobDetsilsId };
        props.setContactRoleForAccount(data, contactPersonId);
    };

    const handleChange1 = (currencyId, contactPersonId) => {
        const data = { potentialCurrencyId: currencyId };
        props.setContactRoleForAccount(data, contactPersonId);
    };

    const handleInputChange = useCallback((contactPersonId, e) => {
        const inputValue = e.target.value.trim();
        if (inputValue !== '') {
            setContactRoleForAccount(contactPersonId, inputValue);
        }
    }, [props.setContactRoleForAccount]);

    const handleKeyPress = useCallback((contactPersonId, e) => {
        if (e.key === 'Enter') {
            const inputValue = e.target.value.trim();
            if (inputValue !== '') {
                setContactRoleForAccount(contactPersonId, inputValue);
            }
        }
    }, [props.setContactRoleForAccount]);

    const showModal = () => {
        setVisible(true);
    };

    const handleOk = () => {
        setVisible(false);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    if (props.fetchingContactDistributorsById) {
        return <BundleLoader />;
    }

    return (
        <>
            <div className='flex sticky h-70 z-auto'>
                <div className="rounded m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
                    <div className="flex justify-between w-[100%]  p-1 bg-transparent font-bold sticky z-10">
                        <div className="md:w-[5.1rem]">{translatedMenuItems[0]}</div>
                        <div className="md:w-[6.01rem]">{translatedMenuItems[1]}</div>
                        <div className="md:w-[4.8rem]">{translatedMenuItems[2]}</div>
                        <div className="md:w-[5.9rem]">{translatedMenuItems[3]}</div>
                        <div className="md:w-[16.6rem]">{translatedMenuItems[4]}</div>
                        <div className="md:w-[4.7rem]">{translatedMenuItems[5]}</div>
                        <div className="md:w-[18.8rem]">{translatedMenuItems[6]}</div>
                    </div>

                    {props.contactDistributor.map((item) => (
                        <div key={item.contactPersonId}>
                            <div className="flex rounded justify-between mt-1 bg-white h-8 items-center p-1 scale-[0.99] hover:scale-100 ease-in duration-100 shadow border-solid m-1 leading-3 hover:border hover:border-[#23A0BE] hover:shadow-[#23A0BE]">
                                <div className="flex">
                                    <div className="flex font-bold md:w-[6.8rem] max-sm:flex-row w-full max-sm:justify-between">
                                        <div className="text-xs font-poppins">
                                            {`${item.salutation || ""} ${item.firstName || ""} ${item.middleName || ""} ${item.lastName || ""}`}
                                        </div>
                                    </div>

                                    <div className="flex md:w-[7.23rem] max-sm:flex-row w-full max-sm:justify-between">
                                        <div className="text-xs font-poppins">{item.emailId}</div>
                                    </div>
                                </div>

                                <div className="flex md:w-[6.023rem] max-sm:flex-row w-full max-sm:justify-between">
                                    <div className="text-xs font-poppins text-center">{`${item.dialCode1 || ""} ${item.mobileNo || ""}`}</div>
                                </div>
                                <div className="flex md:w-[8.21rem] max-sm:flex-row w-full max-sm:justify-between">
                                    <div className="text-xs font-poppins text-center">{item.designationName}</div>
                                </div>

                                <div className="flex md:w-[9.01rem] max-sm:flex-row w-full max-sm:justify-between">
                                    <div className="text-xs font-poppins text-center">{item.departmentId}</div>
                                </div>

                                <div className="flex md:w-[7.27rem] max-sm:flex-row w-full max-sm:justify-between">
                                    <div className="text-xs font-poppins text-center">
                                        <div className="flex justify-evenly">
                                            <ButtonGroup>
                                                <RoleButton
                                                    className="!text-icon text-green-600"
                                                    type="DecisionMaker"
                                                    iconType="fa-vote-yea"
                                                    tooltip="C-Level"
                                                    role={item.contactRole}
                                                    onClick={() => handleAddPlusClick(item.contactPersonId, "C-Level")}
                                                />
                                                <RoleButton
                                                    className="!text-icon text-blue-600"
                                                    type="Evaluator"
                                                    iconType="fa-address-card"
                                                    tooltip="Strategic"
                                                    role={item.contactRole}
                                                    onClick={() => handleAddPlusClick(item.contactPersonId, "Strategic")}
                                                />
                                                <RoleButton
                                                    className="!text-icon text-blue-600"
                                                    type="Influencer"
                                                    iconType="fa-hands-helping"
                                                    tooltip="Mid-Level"
                                                    role={item.contactRole}
                                                    onClick={() => handleAddPlusClick(item.contactPersonId, "Mid-Level")}
                                                />
                                            </ButtonGroup>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex w-[1.01rem] max-sm:flex-row max-sm:justify-between">
                                    <div className="!text-icon font-poppins">
                                        <Tooltip title="Edit">
                                            <BorderColorIcon
                                                className="!text-icon cursor-pointer text-red-600"
                                                onClick={() => {
                                                    props.setEditDistributorContact(item);
                                                    props.handleUpdateDistributorContactModal(true);
                                                }}
                                            />
                                        </Tooltip>
                                    </div>
                                </div>

                                <div className="flex md:w-[8.2rem] max-sm:flex-row w-full max-sm:justify-between">
                                    <div className="text-xs font-poppins text-center">
                                        <Select
                                            style={{ width: "8rem" }}
                                            onChange={(lobDetsilsId) => handleChange(lobDetsilsId, item.contactPersonId)}
                                        >
                                            {props.lobList.map((sd) => (
                                                <Option key={sd.lobDetsilsId} value={sd.lobDetsilsId}>
                                                    {sd.name}
                                                </Option>
                                            ))}
                                        </Select>
                                    </div>
                                </div>

                                <div className="flex md:w-[6.2rem] max-sm:flex-row w-full max-sm:justify-between">
                                    <div className="text-xs font-poppins text-center">
                                        <Input
                                            onPressEnter={(e) => handleKeyPress(item.contactPersonId, e)}
                                            onChange={(e) => handleInputChange(item.contactPersonId, e)}
                                            placeholder="Potential"
                                            defaultValue={item.potential}
                                            style={{ width: "6rem" }}
                                        />
                                    </div>
                                </div>

                                <div className="flex md:w-[6.01rem] max-sm:flex-row w-full max-sm:justify-between">
                                    <div className="text-xs font-poppins text-center">
                                        <Select
                                            style={{ width: "6rem" }}
                                            onChange={(currencyId) => handleChange1(currencyId, item.contactPersonId)}
                                        >
                                            {props.saleCurrencies.map((sd) => (
                                                <Option key={sd.currency_id} value={sd.currency_id}>
                                                      {sd.currency_name}
                                                </Option>
                                            ))}
                                        </Select>
                                    </div>
                                </div>

                                <div className="flex md:w-[7.03rem] max-sm:flex-row w-full max-sm:justify-between">
            {item.accessInd === 0 ? (
                <div className="text-xs font-poppins">
                    <Button
                        type="primary"
                        loading={rowData.contactPersonId === item.contactPersonId && props.applyingForLoginInContact}
                        onClick={() => {
                            handleChangeRow(item);
                            setEditDistributorContact(item);
                            props.applyForLoginInContact(
                                {},  
                                item.contactPersonId,
                                props.userId,
                                "Customer Contact To User",
                                props.distributorId,
                            );
                        }}
                    >
                        <FormattedMessage id="app.applyforlogin" defaultMessage="Apply For Login" />
                    </Button>
                </div>
            ) : item.accessInd === 2 ? (
                <b>Login Applied</b>
            ) : (
                <b style={{ color: "#32CD32" }}>Login Approved</b>
            )}

            <Tooltip title="Pulse">
                <MonitorHeartIcon
                    className="!text-icon cursor-pointer text-[#df9697]"
                    onClick={() => {
                        showModal();
                        handleChangeRow(item);
                        // handleSetCurrentCustomer(item);  // Assuming this is defined elsewhere
                    }}
                />
            </Tooltip>
        </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Suspense fallback={<BundleLoader />}>
    <UpdateAccountContactModal
        selectedLanguage={props.selectedLanguage}
        translateText={props.translateText}
        handleUpdateDistributorContactModal={props.handleUpdateDistributorContactModal}
        updateDistributorContactModal={props.updateDistributorContactModal}
    />
    <AccountContactJumpstartBoxDrawer
        selectedLanguage={props.selectedLanguage}
        translateText={props.translateText}
        showModal={showModal}
        rowData={rowData}
        handleCancel={handleCancel}
        visible={visible}
    />
</Suspense>
        </>
    );
};

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
