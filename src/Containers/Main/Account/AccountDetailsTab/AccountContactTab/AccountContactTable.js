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
 const [currencyOpts, setcurrencyOpts] = useState([]);
  const [isCurrencyDropdownClick, setIsCurrencyDropdownClick] = useState(false);
  const [LOBOpts, setLOBOpts] = useState([]);
  const [IsLOBdropdownClick, setIsLOBdropdownClick] = useState(false);


    useEffect(() => {
        props.getContactDistributorList(props.uniqueId,props.type);
    }, []);

    const fetchLOBlist = () => {
        if (!IsLOBdropdownClick) {
            props.getLobList(props.orgId);
            setIsLOBdropdownClick(true);
        }
      };
      useEffect(() => {
        if (props.lobList && props.lobList.length > 0) {
            setLOBOpts(props.lobList);
        }
      }, [props.lobList]);

 const fetchCurrency = () => {
    if (!isCurrencyDropdownClick) {
      props.getSaleCurrency();
      setIsCurrencyDropdownClick(true);
    }
  };
  useEffect(() => {
    if (props.saleCurrencies && props.saleCurrencies.length > 0) {
      setcurrencyOpts(props.saleCurrencies);
    }
  }, [props.saleCurrencies]);

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
                        <LocationCityIcon className='!text-icon  '  /> {props.translatedMenuItems[122]} </div>
                        <div className="w-[11rem] truncate max-md:w-[10rem]">
                        <MarkEmailUnreadIcon className='!text-icon mr-1 text-[#ff9f1c] '/>{props.translatedMenuItems[148]}</div>
                        <div className="w-[8.9rem] truncate  max-md:w-[5.5rem]">
                              <MobileFriendlyIcon className='!text-icon text-[#41ead4] '/> {props.translatedMenuItems[149]}</div>
                        <div className="w-[8.9rem] truncate max-md:w-[5.9rem]">
                        
                        <WorkHistoryIcon className="!text-icon text-[#b744b8] "/>
                        {props.translatedMenuItems[150]}</div>
                        <div className="w-[14.6rem] truncate max-md:w-[21.6rem]">
                        <ApartmentIcon className="!text-icon text-[#f0386b] "/>{props.translatedMenuItems[83]}</div>
                        <div className="w-[15.7rem] truncate max-md:w-[4.7rem]">{props.translatedMenuItems[39]}</div>
                        <div className=" w-[17.8rem] truncate max-md:w-[18.8rem]">{props.translatedMenuItems[151]}</div>
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
                                                    tooltip= {props.translatedMenuItems[152]}
                                                    // "C-Level"
                                                    role={item.contactRole}
                                                    onClick={() => handleAddPlusClick(item.contactPersonId, "C-Level")}
                                                />
                                                <RoleButton
                                                    className="!text-icon text-blue-600"
                                                    type="Evaluator"
                                                    iconType="fa-address-card"
                                                    tooltip={props.translatedMenuItems[153]}
                                                    // "Strategic"
                                                    role={item.contactRole}
                                                    onClick={() => handleAddPlusClick(item.contactPersonId, "Strategic")}
                                                />
                                                <RoleButton
                                                    className="!text-icon text-blue-600"
                                                    type="Influencer"
                                                    iconType="fa-hands-helping"
                                                    tooltip={props.translatedMenuItems[154]}
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
                                            onClick={fetchLOBlist}
                                        >
                                            {LOBOpts.map((sd) => (
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
                                            placeholder={props.translatedMenuItems[151]}
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
                                            onClick={fetchCurrency}
                                        >
                                            {currencyOpts.map((sd) => (
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
                       {props.translatedMenuItems[155]} {/*"Apply For Login" /> */}
                    </Button>
                </div>
            ) : item.accessInd === 2 ? (
                <b className="flex items-center justify-center text-[#32CD32] font-poppins text-xs w-[9rem]">
                   {props.translatedMenuItems[156]} {/* Login Applied */}
                    </b>
            ) : (
                <b className="flex items-center justify-center text-[#32CD32] font-poppins text-xs  w-[9rem]">
                  {props.translatedMenuItems[157]}  {/* Login Approved */}
                    </b>
            )}
      <div className="flex items-center justify-center h-8 bg-[#eef2f9]">
            <Tooltip title={props.translatedMenuItems[158]}>
            {/* "Pulse"> */}
                <MonitorHeartIcon
                    className="!text-icon cursor-pointer text-[#df9697]"
                    onClick={() => {
                        showModal();
                        handleChangeRow(item);
                    }}
                />
            </Tooltip>
            </div>
            <div className="flex max-sm:flex-row max-sm:justify-between">
                                    <div className=" flex font-poppins  items-center justify-center h-8 bg-[#eef2f9]">
                                        <Tooltip title={props.translatedMenuItems[58]}>
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
                                        <Tooltip title={props.translatedMenuItems[58]}>
                                       
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
