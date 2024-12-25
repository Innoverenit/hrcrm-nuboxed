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
// import { getSaleCurrency } from "../../../../Auth/AuthAction";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { BundleLoader } from "../../../../../Components/Placeholder";
import EditNoteIcon from '@mui/icons-material/EditNote';
import ContactHistoryDrawer from "./ContactHistoryDrawer";
import ApartmentIcon from '@mui/icons-material/Apartment';
import MobileFriendlyIcon from '@mui/icons-material/MobileFriendly';
import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
const UpdateAccountContactModal = lazy(() => import('./UpdateAccountContactModal'));
const AccountContactJumpstartBoxDrawer = lazy(() => import('./AccountContactJumpstartBoxDrawer'));

const ButtonGroup = Button.Group;
const { Option } = Select;

const AccountContactTable = (props) => {
    const [visible, setVisible] = useState(false);
    const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
    const [rowData, setRowData] = useState("");

    const [modalContactHistory, setmodalContactHistory] =useState(false);

    useEffect(() => {
        props.getContactDistributorList(props.uniqueId,props.type);
        props.getLobList(props.orgId);
        // props.getSaleCurrency();
        fetchMenuTranslations();
    }, [props.selectedLanguage]);

    const fetchMenuTranslations = async () => {
        try {
            const itemsToTranslate = [
               "110", // "Name",0
               "140", // "Email",1
               "546",  // "Mobile",2
               "325", // "Designation",3
               "326",  // "Department",4
               "280",  // "LOB",5
               "407",  // "Potential"6
               "170", // "Edit" 7
               "1349", // Apply For Login8
               "1347", // Login Applied9
               "1348",  // Login Approved10
               "392",  // "Pulse"11
               "1342",  // "Mid-Level"12
               "1343",  // "Strategic"13
               "1344", // "C-Level"14
                
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

    if (props.fetchingContactDistributorsById || props.updateDisributorContactById) {
        return <BundleLoader/>;
    }

    return (
        <>
            <div className='flex sticky h-[79vh] z-auto'>
                <div className="rounded m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
                    <div className="flex justify-between w-[100%]  p-1 bg-transparent font-bold sticky items-end font-poppins !text-lm z-10">
                        <div className="w-[8.1rem] text-[#00A2E8] truncate text-sm max-md:w-[4.1rem]">
                        <LocationCityIcon className='!text-icon  '  />{translatedMenuItems[0]} </div>
                        <div className="w-[11rem] truncate max-md:w-[10rem]">
                        <MarkEmailUnreadIcon className='!text-icon mr-1 text-[#ff9f1c] '/>{translatedMenuItems[1]}</div>
                        <div className="w-[8.9rem] truncate  max-md:w-[5.5rem]">
                              <MobileFriendlyIcon className='!text-icon text-[#41ead4] '/> {translatedMenuItems[2]}</div>
                        <div className="w-[8.9rem] truncate max-md:w-[5.9rem]">
                        
                        <WorkHistoryIcon className="!text-icon text-[#b744b8] "/>
                        {translatedMenuItems[3]}</div>
                        <div className="w-[14.6rem] truncate max-md:w-[21.6rem]">
                        <ApartmentIcon className="!text-icon text-[#f0386b] "/>{translatedMenuItems[4]}</div>
                        <div className="w-[15.7rem] truncate max-md:w-[4.7rem]">{translatedMenuItems[5]}</div>
                        <div className=" w-[17.8rem] truncate max-md:w-[18.8rem]">{translatedMenuItems[6]}</div>
                    </div>

                    {props.contactDistributor.map((item) => (
                        <div key={item.contactPersonId}>
                            <div className="flex rounded justify-between mt-1 bg-white py-ygap items-center  scale-[0.99] hover:scale-100 ease-in duration-100 shadow border-solid  leading-3 hover:border hover:border-[#23A0BE] hover:shadow-[#23A0BE]">
                                <div className="flex">
                                    <div className="flex font-bold items-center justify-start max-md:w-[6.8rem] w-[7.8rem] border-l-2 border-green-500 bg-[#eef2f9] max-sm:flex-row  max-sm:justify-between">
                                        <div className="flex text-xs ml-gap items-center  font-poppins">
                                            {`${item.salutation || ""} ${item.firstName || ""} ${item.middleName || ""} ${item.lastName || ""}`}
                                        </div>
                                    </div>

                                    <div className="flex max-md:w-[11.23rem] w-[10.23rem] items-center justify-start h-8 ml-gap  bg-[#eef2f9] max-sm:flex-row  max-sm:justify-between">
                                        <div className="flex items-center ml-gap text-xs font-poppins">{item.emailId}</div>
                                    </div>
                                </div>

                                <div className="flex max-md:w-[19.023rem] w-[19.023rem] items-center justify-start h-8 ml-gap  bg-[#eef2f9] max-sm:flex-row  max-sm:justify-between">
                                    <div className="text-xs font-poppins ml-gap text-center">{`${item.dialCode1 || ""} ${item.mobileNo || ""}`}</div>
                                </div>
                                <div className="flex max-md:w-[19.21rem] w-[19.21rem] items-center justify-start h-8 ml-gap  bg-[#eef2f9] max-sm:flex-row  max-sm:justify-between">
                                    <div className="text-xs font-poppins ml-gap text-center">{item.designationName}</div>
                                </div>

                                <div className="flex max-md:w-[19.01rem] w-[16.01rem] items-center justify-start h-8 ml-gap  bg-[#eef2f9] max-sm:flex-row  max-sm:justify-between">
                                    <div className="text-xs font-poppins  ml-gap text-center">{item.departmentName}</div>
                                </div>
                                                    
                                <div className="flex justify-end items-center max-sm:flex-row  max-sm:justify-between">
                                <div className="flex max-md:w-[6.27rem] w-[6.27rem] items-center justify-center h-8 ml-gap  bg-[#eef2f9] max-sm:flex-row  max-sm:justify-between">
                                    <div className="text-xs font-poppins text-center">
                                        <div className="flex justify-evenly">
                                            <ButtonGroup>
                                                <RoleButton
                                                    className="!text-icon text-green-600"
                                                    type="DecisionMaker"
                                                    iconType="fa-vote-yea"
                                                    tooltip= {translatedMenuItems[14]}
                                                    // "C-Level"
                                                    role={item.contactRole}
                                                    onClick={() => handleAddPlusClick(item.contactPersonId, "C-Level")}
                                                />
                                                <RoleButton
                                                    className="!text-icon text-blue-600"
                                                    type="Evaluator"
                                                    iconType="fa-address-card"
                                                    tooltip={translatedMenuItems[13]}
                                                    // "Strategic"
                                                    role={item.contactRole}
                                                    onClick={() => handleAddPlusClick(item.contactPersonId, "Strategic")}
                                                />
                                                <RoleButton
                                                    className="!text-icon text-blue-600"
                                                    type="Influencer"
                                                    iconType="fa-hands-helping"
                                                    tooltip={translatedMenuItems[12]}
                                                    // "Mid-Level"
                                                    role={item.contactRole}
                                                    onClick={() => handleAddPlusClick(item.contactPersonId, "Mid-Level")}
                                                />
                                            </ButtonGroup>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex max-md:w-[8.2rem] w-[8.2rem] items-center justify-center h-8 ml-gap  bg-[#eef2f9] max-sm:flex-row max-sm:justify-between">
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

                                <div className="flex max-md:w-[6.2rem] w-[6.2rem] items-center justify-center h-8 ml-gap  bg-[#eef2f9] max-sm:flex-row 
                                 max-sm:justify-between ">
                                    <div className="text-xs font-poppins text-center">
                                        <Input
                                            onPressEnter={(e) => handleKeyPress(item.contactPersonId, e)}
                                            onChange={(e) => handleInputChange(item.contactPersonId, e)}
                                            placeholder={translatedMenuItems[6]}
                                            // "Potential"
                                            defaultValue={item.potential}
                                            style={{ width: "6rem" }}
                                        />
                                    </div>
                                </div>

                                <div className="flex max-md:w-[10.01rem] w-[6.01rem] items-center justify-center h-8 ml-gap  bg-[#eef2f9] max-sm:flex-row  max-sm:justify-between">
                                    <div className="text-xs font-poppins text-center">
                                        <Select
                                            style={{ width: "5rem" }}
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
            {item.accessInd === 0 ? (
                <div className="text-xs w-[9rem]  font-poppins items-center justify-center h-8 ml-gap  bg-[#eef2f9]">
                    <Button className="w-[8rem]"
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
                                props.uniqueId,
                            );
                        }}
                    >
                       {translatedMenuItems[8]} {/*"Apply For Login" /> */}
                    </Button>
                </div>
            ) : item.accessInd === 2 ? (
                <b className="flex items-center justify-center text-[#32CD32] font-poppins text-xs w-[9rem]">
                   {translatedMenuItems[9]} {/* Login Applied */}
                    </b>
            ) : (
                <b className="flex items-center justify-center text-[#32CD32] font-poppins text-xs  w-[9rem]">
                  {translatedMenuItems[10]}  {/* Login Approved */}
                    </b>
            )}
      <div className="flex items-center justify-center h-8 bg-[#eef2f9]">
            <Tooltip title={translatedMenuItems[11]}>
            {/* "Pulse"> */}
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
            <div className="flex max-sm:flex-row max-sm:justify-between">
                                    <div className=" flex font-poppins  items-center justify-center h-8 bg-[#eef2f9]">
                                        <Tooltip title={translatedMenuItems[7]}>
                                        {/* "Edit"> -*/}
                                            <BorderColorIcon
                                                className="!text-icon cursor-pointer text-red-600"
                                                onClick={() => {
                                                    props.setEditDistributorContact(item);
                                                    props.handleUpdateDistributorContactModal(true);
                                                }}
                                            />
                                        </Tooltip>
                                    </div>
                                    <div className=" flex  font-poppins  items-center justify-center h-8 bg-[#eef2f9]">
                                        <Tooltip title={translatedMenuItems[7]}>
                                       
                                          <EditNoteIcon
                                                className="!text-icon cursor-pointer text-red-600"
                                                onClick={() => {
                                                    handleChangeRow(item);
                                                    setmodalContactHistory(true);
                                                }}
                                            />
                                        </Tooltip>
                                    </div>
                                </div>
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

    <ContactHistoryDrawer
     rowData={rowData}
     modalContactHistory={modalContactHistory}
     setmodalContactHistory={setmodalContactHistory}
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
        saleCurrencies: auth.saleCurrencies,
        updateDisributorContactById: distributor.updateDisributorContactById,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            setEditDistributorContact,
            getContactDistributorList,
            applyForLoginInContact,
            handleUpdateDistributorContactModal,
            getLobList,
            // getSaleCurrency,
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
