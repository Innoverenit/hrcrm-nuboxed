import { Button, Checkbox, Divider } from "antd";
import React, { useEffect, useState } from "react";

import { connect } from "react-redux";
import dayjs from "dayjs";
import { FloatButton } from "antd";
import { bindActionCreators } from "redux";
import { TabsWrapper } from "../../../../../Components/UI/Layout";
import {
  getDepartmentAccess,
  addDepartmentAccess,
} from "../../../SettingsAction";
import { BundleLoader } from "../../../../../Components/Placeholder";
const CheckboxGroup = Checkbox.Group;
const plainOptions = ["Access", "Create", "Update", "Delete", "Full List"];
const propspectOptions = ["Access", "Create", "Update", "Delete", "Full List","MFA Approve"];
const orderOptions = ["Access", "Create", "Update", "Delete", "Full List","MFA Update","MFA Delete"];
const clubOption = ["Access", "Create", "Update", "Delete", "Full List","Activity","Pulse","Note"];
const accountOptions = [
  "Access",
  "Create",
  "Update",
  "Delete",
  "Full List",
  "Info",
  "MFA Delete"
];
const materialOptions = ["Access", "Create", "Update", "Delete"];
const materialMfaOptions = ["Access", "Create", "Update", "Delete","MFA Update","MFA Delete"];
const materialNewOptions = [
  "Access",
  "Create",
  "Update",
  "Delete",
 
];
const inventoryNewOptions = [
  "Access",
  "Create",
  "Update",
  "Delete",
  "Full List",
  "Material"
 
];

const supplierNewOptions = [
  "Access",
  "Create",
  "Update",
  "Delete",
  "Full List",
  "Inventory"
 
];
const userOptions = ["Access", "Create", "Update", "Delete", "Access Plus","MFA Update","MFA Delete"];
const defaultCheckedList = ["Full List"];
const melCheckedList = ["Access", "Full List"];
const dashboardCheckedList = ["Access", "Full List", "Regional", "Location"];
const refurbishCheckedList = ["Workshop", "Adminview", "Adminassign", "Qc", "Process"];
const settingsCheckedList = ["Access"];
const accountingCheckedList = ["Access"];
const collectionCheckedList = ["Access", "Approve"];
const requirementCheckedList = ["Access"];
const ecomChecklist = ["Publish on Portal"];
const basicCheckedList = ["Access"];
const calenderCheckList = ["View", "Manage"];
const repositoryCheckedList = ["Create"];
const junkCheckedList = ["Access", "Transfer"];
const multiLanguageCheckedList = ["Multiple"];
// const callCheckedList = ["Access"];
const eventCheckedList = ["Access"];
const plannerCheckedList = ["Access"];
const newCallCheckedList = ["Access"];
const downloadCheckedList = ["All"];
const calculateCheckedList = ["Calculator"];
const warrentyCheckedList = ["Access" , "Update"]
const priceDiscountCheckedList = ["Access" , "Create", "Update","MFA Access","MFA Create","MFA Update"]
const dataRoomOption = ["Access", "Create", "Update", "Delete", "Full List","MFA Access"];


const AccessForm = (props) => {
  const [checkedCustomerList, setCheckedCustomerList] = useState(
    props.departmentAcces.customer || []
      );
      // const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
      // useEffect(() => {
      //   const fetchMenuTranslations = async () => {
      //     try {
      //       const itemsToTranslate = [
      //  "110",  // "Name",//0
      //       ];
    
      //       const translations = await props.translateText(itemsToTranslate, props.selectedLanguage);
      //       setTranslatedMenuItems(translations);
      //     } catch (error) {
      //       console.error('Error translating menu items:', error);
      //     }
      //   };
    
      //   fetchMenuTranslations();
      // }, [props.selectedLanguage, props.translateText]);   

  const [indeterminateCustomer, setIndeterminateCustomer] = useState(true);
  const [checkAllCustomer, setCheckAllCustomer] = useState(false);

  const [checkedOpportunityList, setCheckedOpportunityList] = useState(
    props.departmentAcces.opportunity || []
  );
  const [indeterminateOpportunity, setIndeterminateOpportunity] =
    useState(true);
  const [checkAllOpportunity, setCheckAllOpportunity] = useState(false);


  const [checkedTalentList, setCheckedTalentList] = useState(
    props.departmentAcces.talent || []
  );
  const [indeterminateTalent, setIndeterminateTalent] = useState(true);
  const [checkAllTalent, setCheckAllTalent] = useState(false);


  const [checkedProjectList, setCheckedProjectList] = useState(
    props.departmentAcces.project || []
  );
  const [indeterminateProject, setIndeterminateProject] = useState(true);
  const [checkAllProject, setCheckAllProject] = useState(false);

  const [checkedBillingList, setCheckedBillingList] = useState(
    props.departmentAcces.billing || []
  );
  const [indeterminateBilling, setIndeterminateBilling] = useState(true);
  const [checkAllBilling, setCheckAllBilling] = useState(false);


  const [checkedContactList, setCheckedContactList] = useState(
    props.departmentAcces.contact || []
  );
  const [indeterminateContact, setIndeterminateContact] = useState(true);
  const [checkAllContact, setCheckAllContact] = useState(false);


  const [checkedRequirementList, setCheckedRequirementList] = useState(
    props.departmentAcces.requirement || []
  );
  const [indeterminateRequirement, setIndeterminateRequirement] =
    useState(true);
  const [checkAllRequirement, setCheckAllRequirement] = useState(false);

  const [checkedPublishList, setCheckedPublishList] = useState(
    props.departmentAcces.publish || []
  );
  const [indeterminatePublish, setIndeterminatePublish] = useState(true);
  const [checkAllPublish, setCheckAllPublish] = useState(false);

  const [checkedPulseList, setCheckedPulseList] = useState(
    props.departmentAcces.pulse || []
  );
  const [indeterminatePulse, setIndeterminatePulse] = useState(true);
  const [checkAllPulse, setCheckAllPulse] = useState(false);

  const [checkedLeadsList, setCheckedLeadsList] = useState(
    props.departmentAcces.leads || []
  );
  const [indeterminateLeads, setIndeterminateLeads] = useState(true);
  const [checkAllLeads, setCheckAllLeads] = useState(false);


  const [checkedCustomerCommercialsList, setCheckedCustomerCommercialsList] =
  useState(props.departmentAcces.comercial || []);
const [
  indeterminateCustomerCommercials,
  setIndeterminateCustomerCommercials,
] = useState(true);
const [checkAllCustomerCommercials, setCheckAllCustomerCommercials] =
  useState(false);


  const [checkedProgramList, setCheckedProgramList] = useState(
    props.departmentAcces.program || []
  );
  const [indeterminateProgram, setIndeterminateProgram] = useState(true);
  const [checkAllProgram, setCheckAllProgram] = useState(false);


  const [checkedCourseList, setCheckedCourseList] = useState(
    props.departmentAcces.course || []
  );
  const [indeterminateCourse, setIndeterminateCourse] = useState(true);
  const [checkAllCourse, setCheckAllCourse] = useState(false);

  const [checkedHoursList, setCheckedHoursList] = useState(
    props.departmentAcces.hours || []
  );
  const [indeterminateHours, setIndeterminateHours] = useState(true);
  const [checkAllHours, setCheckAllHours] = useState(false);
  const [checkedLocationList, setCheckedLocationList] = useState(
    props.departmentAcces.location || []
  );
  const [indeterminateLocation, setIndeterminateLocation] = useState(true);
  const [checkAllLocation, setCheckAllLocation] = useState(false);

  const [checkedMileageList, setCheckedMileageList] = useState(
    props.departmentAcces.mileage || []
  );
  const [indeterminateMileage, setIndeterminateMileage] = useState(true);
  const [checkAllMileage, setCheckAllMileage] = useState(false);

  const [checkedExpenseList, setCheckedExpenseList] = useState(
    props.departmentAcces.expense || []
  );
  const [indeterminateExpense, setIndeterminateExpense] = useState(true);
  const [checkAllExpense, setCheckAllExpense] = useState(false);

  const [checkedLeavesList, setCheckedLeavesList] = useState(
    props.departmentAcces.leave || []
  );
  const [indeterminateLeaves, setIndeterminateLeaves] = useState(true);
  const [checkAllLeaves, setCheckAllLeaves] = useState(false);


  const [checkedUserList, setCheckedUserList] = useState(
    props.departmentAcces.user || []);
  const [indeterminateUser, setIndeterminateUser] = useState(true);
  const [checkAllUser, setCheckAllUser] = useState(false);

  const [checkedOrderList, setCheckedOrderList] = useState(
    props.departmentAcces.order || []
  );
  const [indeterminateOrder, setIndeterminateOrder] = useState(true);
  const [checkAllOrder, setCheckAllOrder] = useState(false);


  const [checkedMaterialsList, setCheckedMaterialsList] = useState(
    ""
   );
   const [indeterminateMaterials, setIndeterminateMaterials] = useState(true);
   const [checkAllMaterials, setCheckAllMaterials] = useState(false);


   const [checkedSupplierList, setCheckedSupplierList] = useState(
    props.departmentAcces.supplier || []
  );
  const [indeterminateSupplier, setIndeterminateSupplier] = useState(true);
  const [checkAllSupplier, setCheckAllSupplier] = useState(false);

  const [checkedQualityList, setCheckedQualityList] = useState(
    props.departmentAcces.quality || []
  );
  const [indeterminateQuality, setIndeterminateQuality] = useState(true);
  const [checkAllQuality, setCheckAllQuality] = useState(false);

  const [checkedClubList, setCheckedClubList] = useState(
    props.departmentAcces.club || []
  );
  const [indeterminateClub, setIndeterminateClub] = useState(true);
  const [checkAllClub, setCheckAllClub] = useState(false);


  const [checkedInventoryList, setCheckedInventoryList] = useState(
    props.departmentAcces.inventory || []
  );
  const [indeterminateInventory, setIndeterminateInventory] = useState(true);
  const [checkAllInventory, setCheckAllInventory] = useState(false);


  const [checkedRefurbishList, setCheckedRefurbishList] = useState(
    props.departmentAcces.refurbish || []
  );
  const [indeterminateRefurbish, setIndeterminateRefurbish] = useState(true);
  const [checkAllRefurbish, setCheckAllRefurbish] = useState(false);


  const [checkedAccountList, setCheckedAccountList] = useState(
    props.departmentAcces.account || []
  );
  const [indeterminateAccount, setIndeterminateAccount] = useState(true);
  const [checkAllAccount, setCheckAllAccount] = useState(false);



  const [checkedDashboardList, setCheckedDashboardList] = useState(
    props.departmentAcces.dashboard || []
  );
  const [indeterminateDashboard, setIndeterminateDashboard] = useState(true);
  const [checkAllDashboard, setCheckAllDashboard] = useState(false);


  const [checkedReportList, setCheckedReportList] = useState(
    props.departmentAcces.report || []
  );
  const [indeterminateReport, setIndeterminateReport] = useState(true);
  const [checkAllReport, setCheckAllReport] = useState(false);


  const [checkedSettingsList, setCheckedSettingsList] = useState(
    props.departmentAcces.settings || []
  );
  const [indeterminateSettings, setIndeterminateSettings] = useState(true);
  const [checkAllSettings, setCheckAllSettings] = useState(false);


  const [checkedScannerList, setCheckedScannerList] = useState(
    props.departmentAcces.scanner || []
  );
  const [indeterminateScanner, setIndeterminateScanner] = useState(true);
  const [checkAllScanner, setCheckAllScanner] = useState(false);


  const [checkedBasicList, setCheckedBasicList] = useState(
    props.departmentAcces.basic || []
  );
  const [indeterminateBasic, setIndeterminateBasic] = useState(true);
  const [checkAllBasic, setCheckAllBasic] = useState(false);


  const [checkedCalenderList, setCheckedCalenderList] = useState(
    props.departmentAcces.calender || []
  );
  const [indeterminateCalender, setIndeterminateCalender] = useState(true);
  const [checkAllCalender, setCheckAllCalender] = useState(false);

  const [checkedHolidayList, setCheckedHolidayList] = useState(
    props.departmentAcces.holiday || []
  );
  const [indeterminateHoliday, setIndeterminateHoliday] = useState(true);
  const [checkAllHoliday, setCheckAllHoliday] = useState(false);


  const [checkedTasksList, setCheckedTasksList] = useState(
    props.departmentAcces.task || []
  );
  const [indeterminateTasks, setIndeterminateTasks] = useState(true);
  const [checkAllTasks, setCheckAllTasks] = useState(false);

  const [checkedJunkList, setCheckedJunkList] = useState(
    props.departmentAcces.junk || []
  );
  const [indeterminateJunk, setIndeterminateJunk] = useState(true);
  const [checkAllJunk, setCheckAllJunk] = useState(false);



  const [checkedInvestorList, setCheckedInvestorList] = useState(
    props.departmentAcces.investor || []
  );
  const [indeterminateInvestor, setIndeterminateInvestor] = useState(true);
  const [checkAllInvestor, setCheckAllInvestor] = useState(false);


  const [checkedInvestorContactList, setCheckedInvestorContactList] = useState(
    props.departmentAcces.investorContact || []
  );
  const [indeterminateInvestorContact, setIndeterminateInvestorContact] =
    useState(true);
  const [checkAllInvestorContact, setCheckAllInvestorContact] = useState(false);


  const [checkedDealList, setCheckedDealList] = useState(
    props.departmentAcces.deal || []
  );
  const [indeterminateDeal, setIndeterminateDeal] = useState(true);
  const [checkAllDeal, setCheckAllDeal] = useState(false);


  const [checkedDataRoomList, setCheckedDataRoomList] = useState(
    props.departmentAcces.dataRoom || []
  );
  const [indeterminateDataRoom, setIndeterminateDataRoom] = useState(true);
  const [checkAllDataRoom, setCheckAllDataRoom] = useState(false);


  const [checkedPromotionsList, setCheckedPromotionsList] = useState(
    props.departmentAcces.promotion || []
  );
  const [indeterminatePromotions, setIndeterminatePromotions] = useState(true);
  const [checkAllPromotions, setCheckAllPromotions] = useState(false);


  const [checkedPitchList, setCheckedPitchList] = useState(
    props.departmentAcces.pitch|| []
  );
  const [indeterminatePitch, setIndeterminatePitch] = useState(true);
  const [checkAllPitch, setCheckAllPitch] = useState(false);


  const [checkedRepositoryList, setCheckedRepositoryList] = useState(
    props.departmentAcces.repository || []
  );
  const [indeterminateRepository, setIndeterminateRepository] = useState(true);
  const [checkAllRepository, setCheckAllRepository] = useState(false);

  const [checkedShipperList, setCheckedShipperList] = useState(
    props.departmentAcces.shipper || []
  );
  const [indeterminateShipper, setIndeterminateShipper] = useState(true);
  const [checkAllShipper, setCheckAllShipper] = useState(false);


  const [checkedProcurementList, setCheckedProcurementList] = useState(
    props.departmentAcces.procurement || []
  );
  const [indeterminateProcurement, setIndeterminateProcurement] =
    useState(true);
  const [checkAllProcurement, setCheckAllProcurement] = useState(false);



  const [checkedProductionList, setCheckedProductionList] = useState(
    props.departmentAcces.production || []
  );
  const [indeterminateProduction, setIndeterminateProduction] = useState(true);
  const [checkAllProduction, setCheckAllProduction] = useState(false);


  const [checkedSubscriptionList, setCheckedSubscriptionList] = useState(
    props.departmentAcces.subscription || []
  );
  const [indeterminateSubscription, setIndeterminateSubscription] =
    useState(true);
  const [checkAllSubscription, setCheckAllSubscription] = useState(false);



  const [checkedPlantList, setCheckedPlantList] = useState(
    props.departmentAcces.plant || []
  );
  const [indeterminatePlant, setIndeterminatePlant] = useState(true);
  const [checkAllPlant, setCheckAllPlant] = useState(false);


  const [checkedTeamsList, setCheckedTeamsList] = useState(
    props.departmentAcces.teams || []
  );
  const [indeterminateTeams, setIndeterminateTeams] = useState(true);
  const [checkAllTeams, setCheckAllTeams] = useState(false);


  const [checkedPaymentsList, setCheckedPaymentsList] = useState(
    props.departmentAcces.payment || []
  );
  const [indeterminatePayments, setIndeterminatePayments] = useState(true);
  const [checkAllPayments, setCheckAllPayments] = useState(false);


  const [checkedMaterialList, setCheckedMaterialList] = useState(
    []
  );
  const [indeterminateMaterial, setIndeterminateMaterial] = useState(true);
  const [checkAllMaterial, setCheckAllMaterial] = useState(false);


  // const [checkedCatalougeList, setCheckedCatalougeList] = useState(
  //   props.departmentAcces.catalouge || []
  // );
  // const [indeterminateCatalouge, setIndeterminateCatalouge] = useState(true);
  // const [checkAllCatalouge, setCheckAllCatalouge] = useState(false);


  const [checkedCollectionList, setCheckedCollectionList] = useState(
    props.departmentAcces.collection || []
  );
  const [indeterminateCollection, setIndeterminateCollection] = useState(true);
  const [checkAllCollection, setCheckAllCollection] = useState(false);

  const [checkedPlanner, setCheckedPlanner] = useState(props.departmentAcces.planner || []);
  const [indeterminatePlanner, setIndeterminatePlanner] = useState(true);
  const [checkAllPlanner, setCheckAllPlanner] = useState(false);

  const [checkedEvents, setCheckedEvents] = useState(
    props.departmentAcces.event || []
  );
  const [indeterminateEvents, setIndeterminateEvents] = useState(true);
  const [checkAllEvents, setCheckAllEvents] = useState(false);

  // const [checkedCalls, setCheckedCalls] = useState(props.departmentAcces.call || []);
  // const [indeterminateCalls, setIndeterminateCalls] = useState(true);
  // const [checkAllCalls, setCheckAllCalls] = useState(false);
  const [checkedCall, setCheckedCall] = useState(props.departmentAcces.call || []);
  const [indeterminateCall, setIndeterminateCall] = useState(true);
  const [checkAllCall, setCheckAllCall] = useState(false);



  const [checkedDownload, setCheckedDownload] = useState(props.departmentAcces.download || []);
  const [indeterminateDownload, setIndeterminateDownload] = useState(true);
  const [checkAllDownload, setCheckAllDownload] = useState(false);


  const [checkedLanguage, setCheckedLanguage] = useState(
    props.departmentAcces.language || []
  );
  const [indeterminatLanguage, setIndeterminateLanguage] = useState(true);
  const [checkAllLanguage, setCheckAllLanguage] = useState(false);


  const [checkedTopicList, setCheckedTopicList] = useState(
    props.departmentAcces.topic || []
  );
  const [indeterminateTopic, setIndeterminateTopic] = useState(true);
  const [checkAllTopic, setCheckAllTopic] = useState(false);

  const [checkedAccessmentList, setCheckedAccessmentList] = useState(
    props.departmentAcces.assessment || []
  );
  const [indeterminateAccessment, setIndeterminateAccessment] = useState(true);
  const [checkAllAccessment, setCheckAllAccessment] = useState(false);


  const [checkedCatalogList, setCheckedCatalogList] = useState(
    props.departmentAcces.catalog || []
  );
  const [indeterminateCatalog, setIndeterminateCatalog] = useState(true);
  const [checkAllCatalog, setCheckAllCatalog] = useState(false);





  //Vendor
  const [checkedVendorList, setCheckedVendorList] = useState(
    props.departmentAcces.vendor || []
  );
  const [indeterminateVendor, setIndeterminateVendor] = useState(true);
  const [checkAllVendor, setCheckAllVendor] = useState(false);

//Calculate

  const [checkedCalculateList, setCheckedCalculateList] = useState(
    props.departmentAcces.calculator || []
  );
  const [indeterminateCalculate, setIndeterminateCalculate] = useState(true);
  const [checkAllCalculate, setCheckAllCalculate] = useState(false);


//Warrenty

const [checkedWarrentyList, setCheckedWarrentyList] = useState(
  props.departmentAcces.warrenty || []
);
const [indeterminateWarrenty, setIndeterminateWarrenty] = useState(true);
const [checkAllWarrenty, setCheckAllWarrenty] = useState(false);

//Price and Discount

const [checkedPriceDiscountList, setCheckedPriceDiscountList] = useState(
  props.departmentAcces.pnd || []
);
const [indeterminatePriceDiscount, setIndeterminatePriceDiscount] = useState(true);
const [checkAllPriceDiscount, setCheckAllPriceDiscount] = useState(false);

  useEffect(() => {
    console.log(props.roleTypeId);
    props.getDepartmentAccess(props.roleTypeId);
}, [props.roleTypeId]);

useEffect(() => {
    // Set checked lists based on props
    setCheckedUserList(props.departmentAcces.user || []);
    setCheckedPlantList(props.departmentAcces.plant || []);
    setCheckedCustomerList(props.departmentAcces.customer || []);
    setCheckedOpportunityList(props.departmentAcces.opportunity || [])
    setCheckedTalentList(props.departmentAcces.talent || []);
    setCheckedContactList(props.departmentAcces.contact || []);
    setCheckedRequirementList(props.departmentAcces.requirement || []);
    setCheckedPublishList(props.departmentAcces.publish || []);
    setCheckedPulseList(props.departmentAcces.pulse || []);
    setCheckedLeadsList(props.departmentAcces.leads || []);
    setCheckedCustomerCommercialsList(props.departmentAcces.comercial || []);
    setCheckedProgramList(props.departmentAcces.program || []);
    setCheckedCourseList(props.departmentAcces.course || []);
    setCheckedHoursList(props.departmentAcces.hours || []);
    setCheckedLocationList(props.departmentAcces.location || []);
    setCheckedMileageList(props.departmentAcces.mileage || []);
    setCheckedExpenseList(props.departmentAcces.expense || []);
    setCheckedLeavesList(props.departmentAcces.leave || []);
    setCheckedUserList(props.departmentAcces.user || []);
    setCheckedOrderList(props.departmentAcces.order || []);
    setCheckedMaterialsList(props.departmentAcces.material || []);
    setCheckedSupplierList(props.departmentAcces.supplier || []);
    setCheckedQualityList(props.departmentAcces.quality || []);
    setCheckedClubList(props.departmentAcces.club || []);
    setCheckedInventoryList(props.departmentAcces.inventory || []);
    setCheckedRefurbishList(props.departmentAcces.refurbish || []);
    setCheckedAccountList(props.departmentAcces.account || []);
    setCheckedDashboardList(props.departmentAcces.dashboard || []);
    setCheckedReportList(props.departmentAcces.report || []);
    setCheckedSettingsList(props.departmentAcces.settings || []);
    setCheckedScannerList(props.departmentAcces.scanner || []);
    setCheckedBasicList(props.departmentAcces.basic || []);
    setCheckedCalenderList(props.departmentAcces.calender || []);
    setCheckedHolidayList(props.departmentAcces.holiday || []);
    setCheckedTasksList(props.departmentAcces.task || []);
    setCheckedJunkList(props.departmentAcces.junk || []);
    setCheckedInvestorList(props.departmentAcces.investor || []);
    setCheckedInvestorContactList(props.departmentAcces.investorContact || []);
    setCheckedDealList(props.departmentAcces.deal || []);
    setCheckedDataRoomList(props.departmentAcces.dataRoom || []);
    setCheckedPromotionsList(props.departmentAcces.promotion || []);
    setCheckedPitchList(props.departmentAcces.pitch|| []);
    setCheckedRepositoryList(props.departmentAcces.repository || []);
    setCheckedShipperList(props.departmentAcces.shipper || []);
    setCheckedProcurementList(props.departmentAcces.procurement || []);
    setCheckedProductionList(props.departmentAcces.production || []);
    setCheckedSubscriptionList(props.departmentAcces.subscription || []);
    setCheckedPlantList(props.departmentAcces.plant || []);
    setCheckedTeamsList(props.departmentAcces.teams || []);
    setCheckedPaymentsList(props.departmentAcces.payment || []);
    setCheckedMaterialList([]);
    // setCheckedCatalougeList(props.departmentAcces.catalouge || []);
    setCheckedCollectionList(props.departmentAcces.collection || []);
    setCheckedPlanner(props.departmentAcces.planner || []);
    setCheckedEvents(props.departmentAcces.event || []);
    // setCheckedCalls(props.departmentAcces.call || []);
    setCheckedCall(props.departmentAcces.call || []);
    setCheckedDownload(props.departmentAcces.download || []);
    setCheckedLanguage( props.departmentAcces.language || []);
    setCheckedTopicList(props.departmentAcces.topic || []);
    setCheckedAccessmentList(props.departmentAcces.assessment || []);
    setCheckedCatalogList(props.departmentAcces.catalog || []);
    setCheckedVendorList( props.departmentAcces.vendor || []);
    setCheckedCalculateList(props.departmentAcces.calculator || [])
    setCheckedWarrentyList(props.departmentAcces.warrenty || [])
    setCheckedPriceDiscountList(props.departmentAcces.pnd || [])
    setCheckedProjectList(props.departmentAcces.project || [])
    setCheckedBillingList(props.departmentAcces.billing || [])
}, [props.departmentAcces]);

  const updateAccessForCategory = (category, selectedList) => {
    // Create the full payload by gathering existing values
    let data = {
      vendor: checkedVendorList || [],
      customer: checkedCustomerList || [],
      opportunity: checkedOpportunityList || [],
      talent: checkedTalentList || [],
      contact: checkedContactList || [],
      requirement: checkedRequirementList || [],
      publish: checkedPublishList || [],
      pulse: checkedPulseList || [],
      assessment: checkedAccessmentList || [],
      leads: checkedLeadsList || [],
      comercial: checkedCustomerCommercialsList || [],
      program: checkedProgramList || [],
      test: checkedTestList || [],
      course: checkedCourseList || [],
      hours: checkedHoursList || [],
      location: checkedLocationList || [],
      mileage: checkedMileageList || [],
      expense: checkedExpenseList || [],
      leave: checkedLeavesList || [],
      user: checkedUserList || [],
      order: checkedOrderList || [],
      material: checkedMaterialsList || [],
      supplier: checkedSupplierList || [],
      quality: checkedQualityList || [],
      club: checkedClubList || [],
      inventory: checkedInventoryList || [],
      refurbish: checkedRefurbishList || [],
      account: checkedAccountList || [],
      dashboard: checkedDashboardList || [],
      settings: checkedSettingsList || [],
      task: checkedTasksList || [],
      junk: checkedJunkList || [],
      investor: checkedInvestorList || [],
      investorContact: checkedInvestorContactList || [],
      deal: checkedDealList || [],
      pitch: checkedPitchList || [],
      repository: checkedRepositoryList || [],
      basic: checkedBasicList || [],
      calender: checkedCalenderList || [],
      shipper: checkedShipperList || [],
      procurement: checkedProcurementList || [],
      production: checkedProductionList || [],
      subscription: checkedSubscriptionList || [],
      plant: checkedPlantList || [],
      teams: checkedTeamsList || [],
      payment: checkedPaymentsList || [],
      collection: checkedCollectionList || [],
      catalog: checkedCatalogList || [],
      holiday: checkedHolidayList || [],
      topic: checkedTopicList || [],
      report: checkedReportList || [],
      dataRoom: checkedDataRoomList || [],
      scanner: checkedScannerList || [],
      // catalouge: checkedCatalougeList || [],
      promotion: checkedPromotionsList || [],
      departmentId: props.departmentId,
      roleTypeId: props.roleTypeId,
      language: multiLanguageCheckedList || [],
      call: [],
      // call: callCheckedList || [],
      download: downloadCheckedList || [],
      event: eventCheckedList || [],
      planner: plannerCheckedList || [],
      calculator : calculateCheckedList || [],
      warrenty : warrentyCheckedList || [],
      pnd : priceDiscountCheckedList || [],
      project : checkedProjectList || [],
      billing : checkedBillingList || []
    };
  
    // Update only the specified category with the selectedList
    data[category] = selectedList || [];
  
    // Logging the payload for debugging
    console.log("Payload being sent for category update: ", data);
  
    // Call the API to update the department access for all categories
    props.addDepartmentAccess(data, props.roleTypeId);
  };

  const onVendorChange = (list) => {
    setCheckedVendorList(list);
    setIndeterminateVendor(!!list.length && list.length < plainOptions.length);
    setCheckAllVendor(list.length === plainOptions.length);
    updateAccessForCategory('vendor', list);
  };

  const onCheckAllVendorChange = (e) => {
    const checked = e.target.checked ? plainOptions : [];
    setCheckedVendorList(checked);
    setIndeterminateVendor(false);
    setCheckAllVendor(e.target.checked);
    updateAccessForCategory('vendor', checked);
  };

  //Customer


  const onCustomerChange = (list) => {
    setCheckedCustomerList(list);
    setIndeterminateCustomer(
      !!list.length && list.length < propspectOptions.length
    );
    setCheckAllCustomer(list.length === propspectOptions.length);
    updateAccessForCategory('customer', list);
  };

  const onCheckAllCustomerChange = (e) => {
    const checked = e.target.checked ? propspectOptions : [];
    setCheckedCustomerList(checked);
    setIndeterminateCustomer(false);
    setCheckAllCustomer(e.target.checked);
    updateAccessForCategory('customer', checked); 
  };

  //Opportunity
 

  const onOpportunityChange = (list) => {
    setCheckedOpportunityList(list);
    setIndeterminateOpportunity(
      !!list.length && list.length < orderOptions.length
    );
    setCheckAllOpportunity(list.length === orderOptions.length);
    updateAccessForCategory('opportunity', list);
  };

  const onCheckAllOpportunityChange = (e) => {
    const checked = e.target.checked ? orderOptions : [];
    setCheckedOpportunityList(checked);
    setIndeterminateOpportunity(false);
    setCheckAllOpportunity(e.target.checked);
    updateAccessForCategory('opportunity', checked);
  };

  //Talent
 

  const onTalentChange = (list) => {
    setCheckedTalentList(list);
    setIndeterminateTalent(!!list.length && list.length < orderOptions.length);
    setCheckAllTalent(list.length === orderOptions.length);
    updateAccessForCategory('talent', list);
  };

  const onCheckAllTalentChange = (e) => {
    const checked = e.target.checked ? orderOptions : [];
    setCheckedTalentList(checked);
    setIndeterminateTalent(false);
    setCheckAllTalent(e.target.checked);
    updateAccessForCategory('talent', checked);
  };

   //Project
 

   const onProjectChange = (list) => {
    setCheckedProjectList(list);
    setIndeterminateProject(!!list.length && list.length < materialNewOptions.length);
    setCheckAllProject(list.length === materialNewOptions.length);
    updateAccessForCategory('project', list);
  };

  const onCheckAllProjectChange = (e) => {
    const checked = e.target.checked ? materialNewOptions : [];
    setCheckedProjectList(checked);
    setIndeterminateProject(false);
    setCheckAllProject(e.target.checked);
    updateAccessForCategory('project', checked);
  };

   //Billing
 

   const onBillingChange = (list) => {
    setCheckedBillingList(list);
    setIndeterminateBilling(!!list.length && list.length < materialNewOptions.length);
    setCheckAllBilling(list.length === materialNewOptions.length);
    updateAccessForCategory('billing', list);
  };

  const onCheckAllBillingChange = (e) => {
    const checked = e.target.checked ? materialNewOptions : [];
    setCheckedBillingList(checked);
    setIndeterminateBilling(false);
    setCheckAllBilling(e.target.checked);
    updateAccessForCategory('billing', checked);
  };

  // Contact

  

  const onContactChange = (list) => {
    setCheckedContactList(list);
    setIndeterminateContact(!!list.length && list.length < plainOptions.length);
    setCheckAllContact(list.length === plainOptions.length);
    updateAccessForCategory('contact', list);
  };

  const onCheckAllContactChange = (e) => {
    const checked = e.target.checked ? plainOptions : [];
    setCheckedContactList(checked);
    setIndeterminateContact(false);
    setCheckAllContact(e.target.checked);
    updateAccessForCategory('contact', checked);
  };

  // Requirement

  

  const onRequirementChange = (list) => {
    setCheckedRequirementList(list);
    setIndeterminateRequirement(
      !!list.length && list.length < requirementCheckedList.length
    );
    setCheckAllRequirement(list.length === requirementCheckedList.length);
    updateAccessForCategory('requirement', list);
  };

  const onCheckAllRequirementChange = (e) => {
    const checked = e.target.checked ? requirementCheckedList : [];
    setCheckedRequirementList(checked);
    setIndeterminateRequirement(false);
    setCheckAllRequirement(e.target.checked);
    updateAccessForCategory('requirement', checked);
  };

  // Publish

  

  const onPublishChange = (list) => {
    setCheckedPublishList(list);
    setIndeterminatePublish(!!list.length && list.length < plainOptions.length);
    setCheckAllPublish(list.length === plainOptions.length);
    updateAccessForCategory('publish', list);
  };

  const onCheckAllPublishChange = (e) => {
    const checked = e.target.checked ? plainOptions : [];
    setCheckedPublishList(checked);
    setIndeterminatePublish(false);
    setCheckAllPublish(e.target.checked);
    updateAccessForCategory('publish', checked);
  };

  // Pulse

 

  const onPulseChange = (list) => {
    setCheckedPulseList(list);
    setIndeterminatePulse(!!list.length && list.length < plainOptions.length);
    setCheckAllPulse(list.length === plainOptions.length);
    updateAccessForCategory('pulse', list);
  };

  const onCheckAllPulseChange = (e) => {
    const checked = e.target.checked ? plainOptions : [];
    setCheckedPulseList(checked);
    setIndeterminatePulse(false);
    setCheckAllPulse(e.target.checked);
    updateAccessForCategory('pulse', checked);
  };

  //Leads
 

  const onLeadsChange = (list) => {
    setCheckedLeadsList(list);
    setIndeterminateLeads(!!list.length && list.length < plainOptions.length);
    setCheckAllLeads(list.length === plainOptions.length);
    updateAccessForCategory('leads', list);
  };

  const onCheckAllLeadsChange = (e) => {
    const checked = e.target.checked ? plainOptions : [];
    setCheckedLeadsList(checked);
    setIndeterminateLeads(false);
    setCheckAllLeads(e.target.checked);
    updateAccessForCategory('leads', checked);
  };
  // Customer Commercials

 

  const onCustomerCommercialsChange = (list) => {
    setCheckedCustomerCommercialsList(list);
    setIndeterminateCustomerCommercials(
      !!list.length && list.length < plainOptions.length
    );
    setCheckAllCustomerCommercials(list.length === plainOptions.length);
    updateAccessForCategory('comercial', list);
  };
  const onCheckAllCustomerCommercialsChange = (e) => {
    const checked = e.target.checked ? plainOptions : [];
    setCheckedCustomerCommercialsList(checked);
    setIndeterminateCustomerCommercials(false);
    setCheckAllCustomerCommercials(e.target.checked);
    updateAccessForCategory('comercial', checked);
  };
  // Program

 

  const onProgramChange = (list) => {
    setCheckedProgramList(list);
    setIndeterminateProgram(!!list.length && list.length < plainOptions.length);
    setCheckAllProgram(list.length === plainOptions.length);
    updateAccessForCategory('program', list);
  };

  const onCheckAllProgramChange = (e) => {
    const checked = e.target.checked ? plainOptions : [];
    setCheckedProgramList(checked);
    setIndeterminateProgram(false);
    setCheckAllProgram(e.target.checked);
    updateAccessForCategory('program', checked);
  };
  // Test
  const [checkedTestList, setCheckedTestList] = useState(
    props.departmentAcces.test
  );
  const [indeterminateTest, setIndeterminateTest] = useState(true);
  const [checkAllTest, setCheckAllTest] = useState(false);

  const onTestChange = (list) => {
    setCheckedTestList(list);
    setIndeterminateTest(!!list.length && list.length < plainOptions.length);
    setCheckAllTest(list.length === plainOptions.length);
    updateAccessForCategory('test', list);
  };

  const onCheckAllTestChange = (e) => {
    const checked = e.target.checked ? plainOptions : [];
    setCheckedTestList(checked);
    setIndeterminateTest(false);
    setCheckAllTest(e.target.checked);
    updateAccessForCategory('test', checked);
  };
  // Course

  

  const onCourseChange = (list) => {
    setCheckedCourseList(list);
    setIndeterminateCourse(!!list.length && list.length < plainOptions.length);
    setCheckAllCourse(list.length === plainOptions.length);
    updateAccessForCategory('course', list);
  };

  const onCheckAllCourseChange = (e) => {
    const checked = e.target.checked ? plainOptions : [];
    setCheckedCourseList(checked);
    setIndeterminateCourse(false);
    setCheckAllCourse(e.target.checked);
    updateAccessForCategory('course', checked);
  };
  // Hours
  

  const onHoursChange = (list) => {
    setCheckedHoursList(list);
    setIndeterminateHours(!!list.length && list.length < plainOptions.length);
    setCheckAllHours(list.length === plainOptions.length);
    updateAccessForCategory('hours', list);
  };

  const onCheckAllHoursChange = (e) => {
    const checked = e.target.checked ? plainOptions : [];
    setCheckedHoursList(checked);
    setIndeterminateHours(false);
    setCheckAllHours(e.target.checked);
    updateAccessForCategory('hours', checked);
  };
  // Location

 

  const onLocationChange = (list) => {
    setCheckedLocationList(list);
    setIndeterminateLocation(
      !!list.length && list.length < plainOptions.length
    );
    setCheckAllLocation(list.length === plainOptions.length);
    updateAccessForCategory('location', list);
  };

  const onCheckAllLocationChange = (e) => {
    const checked = e.target.checked ? plainOptions : [];
    setCheckedLocationList(checked);
    setIndeterminateLocation(false);
    setCheckAllLocation(e.target.checked);
    updateAccessForCategory('location', checked);
  };
  // Mileage
  

  const onMileageChange = (list) => {
    setCheckedMileageList(list);
    setIndeterminateMileage(
      !!list.length && list.length < melCheckedList.length
    );
    setCheckAllMileage(list.length === melCheckedList.length);
    updateAccessForCategory('mileage', list);
  };

  const onCheckAllMileageChange = (e) => {
    const checked = e.target.checked ? melCheckedList : [];
    setCheckedMileageList(checked);
    setIndeterminateMileage(false);
    setCheckAllMileage(e.target.checked);
    updateAccessForCategory('mileage', checked);
  };
  // Expense
 

  const onExpenseChange = (list) => {
    setCheckedExpenseList(list);
    setIndeterminateExpense(
      !!list.length && list.length < melCheckedList.length
    );
    setCheckAllExpense(list.length === melCheckedList.length);
    updateAccessForCategory('expense', list);
  };

  const onCheckAllExpenseChange = (e) => {
    const checked = e.target.checked ? melCheckedList : [];
    setCheckedExpenseList(checked);
    setIndeterminateExpense(false);
    setCheckAllExpense(e.target.checked);
    updateAccessForCategory('expense', checked);
  };
  // Leaves
  

  const onLeavesChange = (list) => {
    setCheckedLeavesList(list);
    setIndeterminateLeaves(
      !!list.length && list.length < melCheckedList.length
    );
    setCheckAllLeaves(list.length === melCheckedList.length);
    updateAccessForCategory('leave', list);
  };

  const onCheckAllLeavesChange = (e) => {
    const checked = e.target.checked ? melCheckedList : [];
    setCheckedLeavesList(checked);
    setIndeterminateLeaves(false);
    setCheckAllLeaves(e.target.checked);
    updateAccessForCategory('leave', checked);
  };
  // User
 

  const onUserChange = (list) => {
    setCheckedUserList(list);
    setIndeterminateUser(!!list.length && list.length < userOptions.length);
    setCheckAllUser(list.length === userOptions.length);
    updateAccessForCategory('user', list);
  };

  const onCheckAllUserChange = (e) => {
    const checked = e.target.checked ? userOptions : [];
    setCheckedUserList(checked);
    setIndeterminateUser(false);
    setCheckAllUser(e.target.checked);

    // Update access after checking/unchecking all
    updateAccessForCategory('user', checked);
  };
  // Order
 

  const onOrderChange = (list) => {
    setCheckedOrderList(list);
    setIndeterminateOrder(!!list.length && list.length < orderOptions.length);
    setCheckAllOrder(list.length === orderOptions.length);
    updateAccessForCategory('order', list);
  };

  const onCheckAllOrderChange = (e) => {
    const checked = e.target.checked ? orderOptions : [];
    setCheckedOrderList(checked);
    setIndeterminateOrder(false);
    setCheckAllOrder(e.target.checked);
    updateAccessForCategory('order', checked);
  };
  // Materials
  // const [checkedMaterialsList, setCheckedMaterialsList] = useState(
  //   props.departmentAcces.material
  // );
 
 
   const onMaterialsChange = (list) => {
     setCheckedMaterialsList(list);
     setIndeterminateMaterials(
       !!list.length && list.length < materialMfaOptions.length
     );
     setCheckAllMaterials(list.length === materialMfaOptions.length);
     updateAccessForCategory('material', list);
   };
 
   const onCheckAllMaterialsChange = (e) => {
    const checked = e.target.checked ? materialMfaOptions : [];
     setCheckedMaterialsList(checked);
     setIndeterminateMaterials(false);
     setCheckAllMaterials(e.target.checked);
     updateAccessForCategory('material', checked);
   };
 
  // Supplier
  

  const onSupplierChange = (list) => {
    setCheckedSupplierList(list);
    setIndeterminateSupplier(
      !!list.length && list.length < supplierNewOptions.length
    );
    setCheckAllSupplier(list.length === supplierNewOptions.length);
    updateAccessForCategory('supplier', list);
  };

  const onCheckAllSupplierChange = (e) => {
    const checked = e.target.checked ? supplierNewOptions : [];
    setCheckedSupplierList(checked);
    setIndeterminateSupplier(false);
    setCheckAllSupplier(e.target.checked);
    updateAccessForCategory('supplier', checked);
  };
  // Quality

  

  const onQualityChange = (list) => {
    setCheckedQualityList(list);
    setIndeterminateQuality(!!list.length && list.length < plainOptions.length);
    setCheckAllQuality(list.length === plainOptions.length);
    updateAccessForCategory('quality', list);
  };

  const onCheckAllQualityChange = (e) => {
    const checked = e.target.checked ? plainOptions : [];
    setCheckedQualityList(checked);
    setIndeterminateQuality(false);
    setCheckAllQuality(e.target.checked);
    updateAccessForCategory('quality', checked);
  };
  // Club
  

  const onClubChange = (list) => {
    setCheckedClubList(list);
    setIndeterminateClub(!!list.length && list.length < clubOption.length);
    setCheckAllClub(list.length === clubOption.length);
    updateAccessForCategory('club', list);
  };

  const onCheckAllClubChange = (e) => {
    const checked = e.target.checked ? clubOption : [];
    setCheckedClubList(checked);
    setIndeterminateClub(false);
    setCheckAllClub(e.target.checked);
    updateAccessForCategory('club', checked);
  };
  // Inventory
  

  const onInventoryChange = (list) => {
    setCheckedInventoryList(list);
    setIndeterminateInventory(
      !!list.length && list.length < inventoryNewOptions.length
    );
    setCheckAllInventory(list.length === inventoryNewOptions.length);
    updateAccessForCategory('inventory', list);
  };

  const onCheckAllInventoryChange = (e) => {
    const checked = e.target.checked ? inventoryNewOptions : [];
    setCheckedInventoryList(checked);
    setIndeterminateInventory(false);
    setCheckAllInventory(e.target.checked);
    updateAccessForCategory('inventory', checked);
  };
  // Refurbish
 

  const onRefurbishChange = (list) => {
    setCheckedRefurbishList(list);
    setIndeterminateRefurbish(
      !!list.length && list.length < refurbishCheckedList.length
    );
    setCheckAllRefurbish(list.length === refurbishCheckedList.length);
    updateAccessForCategory('refurbish', list);
  };

  const onCheckAllRefurbishChange = (e) => {
    const checked = e.target.checked ? refurbishCheckedList : [];
    setCheckedRefurbishList(checked);
    setIndeterminateRefurbish(false);
    setCheckAllRefurbish(e.target.checked);
    updateAccessForCategory('refurbish', checked);
  };
  // Account/Customer
 

  const onAccountChange = (list) => {
    setCheckedAccountList(list);
    setIndeterminateAccount(
      !!list.length && list.length < accountOptions.length
    );
    setCheckAllAccount(list.length === accountOptions.length);
    updateAccessForCategory('account', list);
  };

  const onCheckAllAccountChange = (e) => {
    const checked = e.target.checked ? accountOptions : [];
    setCheckedAccountList(checked);
    setIndeterminateAccount(false);
    setCheckAllAccount(e.target.checked);
    updateAccessForCategory('account', checked);
  };
  // Dashboard
 

  const onDashboardChange = (list) => {
    setCheckedDashboardList(list);
    setIndeterminateDashboard(
      !!list.length && list.length < dashboardCheckedList.length
    );
    setCheckAllDashboard(list.length === dashboardCheckedList.length);
    updateAccessForCategory('dashboard', list);
  };

  const onCheckAllDashboardChange = (e) => {
    const checked = e.target.checked ? dashboardCheckedList : [];
    setCheckedDashboardList(checked);
    setIndeterminateDashboard(false);
    setCheckAllDashboard(e.target.checked);
    updateAccessForCategory('dashboard', checked);
  };
  // Reports
 

  const onReportChange = (list) => {
    setCheckedReportList(list);
    setIndeterminateReport(
      !!list.length && list.length < defaultCheckedList.length
    );
    setCheckAllReport(list.length === defaultCheckedList.length);
    updateAccessForCategory('report', list);
  };

  const onCheckAllReportChange = (e) => {
    const checked = e.target.checked ? defaultCheckedList : [];
    setCheckedReportList(checked);
    setIndeterminateReport(false);
    setCheckAllReport(e.target.checked);
    updateAccessForCategory('report', checked);
  };
  // Settings
  

  const onSettingsChange = (list) => {
    setCheckedSettingsList(list);
    setIndeterminateSettings(
      !!list.length && list.length < settingsCheckedList.length
    );
    setCheckAllSettings(list.length === settingsCheckedList.length);
    updateAccessForCategory('settings', list);
  };

  const onCheckAllSettingsChange = (e) => {
    const checked = e.target.checked ? settingsCheckedList : [];
    setCheckedSettingsList(checked);
    setIndeterminateSettings(false);
    setCheckAllSettings(e.target.checked);
    updateAccessForCategory('settings', checked);
  };
  // Scanner
 

  const onScannerChange = (list) => {
    setCheckedScannerList(list);
    setIndeterminateScanner(
      !!list.length && list.length < settingsCheckedList.length
    );
    setCheckAllScanner(list.length === settingsCheckedList.length);
    updateAccessForCategory('scanner', list);
  };

  const onCheckAllScannerChange = (e) => {
    const checked = e.target.checked ? settingsCheckedList : [];
    setCheckedScannerList(checked);
    setIndeterminateScanner(false);
    setCheckAllScanner(e.target.checked);
    updateAccessForCategory('scanner', checked);
  };
  // Basic
  

  const onBasicChange = (list) => {
    setCheckedBasicList(list);
    setIndeterminateBasic(
      !!list.length && list.length < basicCheckedList.length
    );
    setCheckAllBasic(list.length === basicCheckedList.length);
    updateAccessForCategory('basic', list);
  };

  const onCheckAllBasicChange = (e) => {
    const checked = e.target.checked ? basicCheckedList : [];
    setCheckedBasicList(checked);
    setIndeterminateBasic(false);
    setCheckAllBasic(e.target.checked);
    updateAccessForCategory('basic', checked);
  };
  // Clender
  

  const onCalenderChange = (list) => {
    setCheckedCalenderList(list);
    setIndeterminateCalender(
      !!list.length && list.length < calenderCheckList.length
    );
    setCheckAllCalender(list.length === calenderCheckList.length);
    updateAccessForCategory('calender', list);
  };

  const onCheckAllCalenderChange = (e) => {
    const checked = e.target.checked ? calenderCheckList : [];
    setCheckedCalenderList(checked);
    setIndeterminateCalender(false);
    setCheckAllCalender(e.target.checked);
    updateAccessForCategory('calender', checked);
  };
  // Holiday
 

  const onHolidayChange = (list) => {
    setCheckedHolidayList(list);
    setIndeterminateHoliday(
      !!list.length && list.length < basicCheckedList.length
    );
    setCheckAllHoliday(list.length === basicCheckedList.length);
    updateAccessForCategory('holiday', list);
  };

  const onCheckAllHolidayChange = (e) => {
    const checked = e.target.checked ? basicCheckedList : [];
    setCheckedHolidayList(checked);
    setIndeterminateHoliday(false);
    setCheckAllHoliday(e.target.checked);
    updateAccessForCategory('holiday', checked);
  };
  // Tasks
  
  const onTasksChange = (list) => {
    setCheckedTasksList(list);
    setIndeterminateTasks(
      !!list.length && list.length < defaultCheckedList.length
    );
    setCheckAllTasks(list.length === defaultCheckedList.length);
    updateAccessForCategory('task', list);
  };

  const onCheckAllTasksChange = (e) => {
    const checked = e.target.checked ? defaultCheckedList : [];
    setCheckedTasksList(checked);
    setIndeterminateTasks(false);
    setCheckAllTasks(e.target.checked);
    updateAccessForCategory('task', checked);
  };
  // Junk
  
  const onJunkChange = (list) => {
    setCheckedJunkList(list);
    setIndeterminateJunk(!!list.length && list.length < junkCheckedList.length);
    setCheckAllJunk(list.length === junkCheckedList.length);
    updateAccessForCategory('junk', list);
  };

  const onCheckAllJunkChange = (e) => {
    const checked = e.target.checked ? junkCheckedList : [];
    setCheckedJunkList(checked);
    setIndeterminateJunk(false);
    setCheckAllJunk(e.target.checked);
    updateAccessForCategory('junk', checked);
  };
  // Investor
  

  const onInvestorChange = (list) => {
    setCheckedInvestorList(list);
    setIndeterminateInvestor(
      !!list.length && list.length < plainOptions.length
    );
    setCheckAllInvestor(list.length === plainOptions.length);
    updateAccessForCategory('investor', list);
  };

  const onCheckAllInvestorChange = (e) => {
    const checked = e.target.checked ? plainOptions : [];
    setCheckedInvestorList(checked);
    setIndeterminateInvestor(false);
    setCheckAllInvestor(e.target.checked);
    updateAccessForCategory('investor', checked);
  };
  //Investor Contact
 

  const onInvestorContactChange = (list) => {
    setCheckedInvestorContactList(list);
    setIndeterminateInvestorContact(
      !!list.length && list.length < plainOptions.length
    );
    setCheckAllInvestorContact(list.length === plainOptions.length);
    updateAccessForCategory('investorContact', list);
  };

  const onCheckAllInvestorContactChange = (e) => {
    const checked = e.target.checked ? plainOptions : [];
    setCheckedInvestorContactList(checked);
    setIndeterminateInvestorContact(false);
    setCheckAllInvestorContact(e.target.checked);
    updateAccessForCategory('investorContact', checked);
  };
  //Deal
 

  const onDealChange = (list) => {
    setCheckedDealList(list);
    setIndeterminateDeal(!!list.length && list.length < plainOptions.length);
    setCheckAllDeal(list.length === plainOptions.length);
    updateAccessForCategory('deal', list);
  };

  const onCheckAllDealChange = (e) => {
    const checked = e.target.checked ? plainOptions : [];
    setCheckedDealList(checked);
    setIndeterminateDeal(false);
    setCheckAllDeal(e.target.checked);
    updateAccessForCategory('deal', checked);
  };
  //Data Room
 

  const onDataRoomChange = (list) => {
    setCheckedDataRoomList(list);
    setIndeterminateDataRoom(
      !!list.length && list.length < dataRoomOption.length
    );
    setCheckAllDataRoom(list.length === dataRoomOption.length);
    updateAccessForCategory('dataRoom', list);
  };

  const onCheckAllDataRoomChange = (e) => {
    const checked = e.target.checked ? dataRoomOption : [];
    setCheckedDataRoomList(checked);
    setIndeterminateDataRoom(false);
    setCheckAllDataRoom(e.target.checked);
    updateAccessForCategory('dataRoom', checked);
  };
  // Promotions

 
  const onPromotionsChange = (list) => {
    setCheckedPromotionsList(list);
    setIndeterminatePromotions(
      !!list.length && list.length < materialOptions.length
    );
    setCheckAllPromotions(list.length === materialOptions.length);
    updateAccessForCategory('promotion', list);
  };

  const onCheckAllPromotionsChange = (e) => {
    const checked = e.target.checked ? materialOptions : [];
    setCheckedPromotionsList(checked);
    setIndeterminatePromotions(false);
    setCheckAllPromotions(e.target.checked);
    updateAccessForCategory('promotion', checked);
  };
  //Pitch
 

  const onPitchChange = (list) => {
    setCheckedPitchList(list);
    setIndeterminatePitch(!!list.length && list.length < plainOptions.length);
    setCheckAllPitch(list.length === plainOptions.length);
    updateAccessForCategory('pitch', list);
  };

  const onCheckAllPitchChange = (e) => {
    const checked = e.target.checked ? plainOptions : [];
    setCheckedPitchList(checked);
    setIndeterminatePitch(false);
    setCheckAllPitch(e.target.checked);
    updateAccessForCategory('pitch', checked);
  };
  //Repository


  const onRepositoryChange = (list) => {
    setCheckedRepositoryList(list);
    setIndeterminateRepository(
      !!list.length && list.length < repositoryCheckedList.length
    );
    setCheckAllRepository(list.length === repositoryCheckedList.length);
    updateAccessForCategory('repository', list);
  };

  const onCheckAllRepositoryChange = (e) => {
    const checked = e.target.checked ? repositoryCheckedList : [];
    setCheckedRepositoryList(checked);
    setIndeterminateRepository(false);
    setCheckAllRepository(e.target.checked);
    updateAccessForCategory('repository', checked);
  };
  // Shipper

 

  const onShipperChange = (list) => {
    setCheckedShipperList(list);
    setIndeterminateShipper(!!list.length && list.length < plainOptions.length);
    setCheckAllShipper(list.length === plainOptions.length);
    updateAccessForCategory('shipper', list);
  };

  const onCheckAllShipperChange = (e) => {
    const checked = e.target.checked ? plainOptions : [];
    setCheckedShipperList(checked);
    setIndeterminateShipper(false);
    setCheckAllShipper(e.target.checked);
    updateAccessForCategory('shipper', checked);
  };
  // Procurement

 

  const onProcurementChange = (list) => {
    setCheckedProcurementList(list);
    setIndeterminateProcurement(
      !!list.length && list.length < plainOptions.length
    );
    setCheckAllProcurement(list.length === plainOptions.length);
    updateAccessForCategory('procurement', list);
  };

  const onCheckAllProcurementChange = (e) => {
    const checked = e.target.checked ? plainOptions : [];
    setCheckedProcurementList(checked);
    setIndeterminateProcurement(false);
    setCheckAllProcurement(e.target.checked);
    updateAccessForCategory('procurement', checked);
  };
  // Production
 

  const onProductionChange = (list) => {
    setCheckedProductionList(list);
    setIndeterminateProduction(
      !!list.length && list.length < materialOptions.length
    );
    setCheckAllProduction(list.length === materialOptions.length);
    updateAccessForCategory('production', list);
  };

  const onCheckAllProductionChange = (e) => {
    const checked = e.target.checked ? materialOptions : [];
    setCheckedProductionList(checked);
    setIndeterminateProduction(false);
    setCheckAllProduction(e.target.checked);
    updateAccessForCategory('production', checked);
  };
  // Subscription
 

  const onSubscriptionChange = (list) => {
    setCheckedSubscriptionList(list);
    setIndeterminateSubscription(
      !!list.length && list.length < materialOptions.length
    );
    setCheckAllSubscription(list.length === materialOptions.length);
    updateAccessForCategory('subscription', list);
  };
  const onCheckAllSubscriptionChange = (e) => {
    const checked = e.target.checked ? materialOptions : [];
    setCheckedSubscriptionList(checked);
    setIndeterminateSubscription(false);
    setCheckAllSubscription(e.target.checked);
    updateAccessForCategory('subscription', checked);
  };
  // Plant

 

  const onPlantChange = (list) => {
    setCheckedPlantList(list);
    setIndeterminatePlant(!!list.length && list.length < orderOptions.length);
    setCheckAllPlant(list.length === orderOptions.length);
    updateAccessForCategory('plant', list);
  };

  const onCheckAllPlantChange = (e) => {
    const checked = e.target.checked ? orderOptions : [];
    setCheckedPlantList(checked);
    setIndeterminatePlant(false);
    setCheckAllPlant(e.target.checked);
    updateAccessForCategory('plant', checked);
  };
  // Teams
 

  const onTeamsChange = (list) => {
    setCheckedTeamsList(list);
    setIndeterminateTeams(!!list.length && list.length < orderOptions.length);
    setCheckAllTeams(list.length === orderOptions.length);
    updateAccessForCategory('teams', list);
  };

  const onCheckAllTeamsChange = (e) => {
    const checked = e.target.checked ? orderOptions : [];
    setCheckedTeamsList(checked);
    setIndeterminateTeams(false);
    setCheckAllTeams(e.target.checked);
    updateAccessForCategory('teams', checked);
  };
  // Payments
 

  const onPaymentsChange = (list) => {
    setCheckedPaymentsList(list);
    setIndeterminatePayments(
      !!list.length && list.length < accountingCheckedList.length
    );
    setCheckAllPayments(list.length === accountingCheckedList.length);
    updateAccessForCategory('payment', list);
  };

  const onCheckAllPaymentsChange = (e) => {
    const checked = e.target.checked ? accountingCheckedList : [];
    setCheckedPaymentsList(checked);
    setIndeterminatePayments(false);
    setCheckAllPayments(e.target.checked);
    updateAccessForCategory('payment', checked);
  };
  // Material
 

  const onMaterialChange = (list) => {
    setCheckedMaterialList(list);
    setIndeterminateMaterial(
      !!list.length && list.length < ecomChecklist.length
    );
    setCheckAllMaterial(list.length === ecomChecklist.length);
    updateAccessForCategory('material', list);
  };

  const onCheckAllMaterialChange = (e) => {
    const checked = e.target.checked ? ecomChecklist : [];
    setCheckedMaterialList(checked);
    setIndeterminateMaterial(false);
    setCheckAllMaterial(e.target.checked);
    updateAccessForCategory('material', checked);
  };
  // Catalouge
  

  // const onCatalougeChange = (list) => {
  //   setCheckedCatalougeList(list);
  //   setIndeterminateCatalouge(
  //     !!list.length && list.length < ecomChecklist.length
  //   );
  //   setCheckAllCatalouge(list.length === ecomChecklist.length);
  //   updateAccessForCategory('catalouge', list);
  // };

  // const onCheckAllCatalougeChange = (e) => {
  //   const checked = e.target.checked ? ecomChecklist : [];
  //   setCheckedCatalougeList(checked);
  //   setIndeterminateCatalouge(false);
  //   setCheckAllCatalouge(e.target.checked);
  //   updateAccessForCategory('catalouge', checked);
  // };
  // Collections
 

  const onCollectionChange = (list) => {
    setCheckedCollectionList(list);
    setIndeterminateCollection(
      !!list.length && list.length < collectionCheckedList.length
    );
    setCheckAllCollection(list.length === collectionCheckedList.length);
    updateAccessForCategory('collection', list);
  };

  const onCheckAllCollectionChange = (e) => {
    const checked = e.target.checked ? collectionCheckedList : [];
    setCheckedCollectionList(e.target.checked ? collectionCheckedList : []);
    setIndeterminateCollection(false);
    setCheckAllCollection(e.target.checked);
    updateAccessForCategory('collection', checked);
  };
  // Catalog
  

  const onCatalogChange = (list) => {
    setCheckedCatalogList(list);
    setIndeterminateCatalog(
      !!list.length && list.length < materialMfaOptions.length
    );
    setCheckAllCatalog(list.length === materialMfaOptions.length);
    updateAccessForCategory('catalog', list);
  };

  const onCheckAllCatalogChange = (e) => {
    const checked = e.target.checked ? materialMfaOptions : [];
    setCheckedCatalogList(checked);
    setIndeterminateCatalog(false);
    setCheckAllCatalog(e.target.checked);
    updateAccessForCategory('catalog', checked);
  };
  //Assessment
 

  const onAccessmentChange = (list) => {
    setCheckedAccessmentList(list);
    setIndeterminateAccessment(
      !!list.length && list.length < plainOptions.length
    );
    setCheckAllAccessment(list.length === plainOptions.length);
    updateAccessForCategory('assessment', list);
  };

  const onCheckAllAccessmentChange = (e) => {
    const checked = e.target.checked ? plainOptions : [];
    setCheckedAccessmentList(checked);
    setIndeterminateAccessment(false);
    setCheckAllAccessment(e.target.checked);
    updateAccessForCategory('assessment', checked);
  };
  //Topic
  
  const onTopicChange = (list) => {
    setCheckedTopicList(list);
    setIndeterminateTopic(!!list.length && list.length < plainOptions.length);
    setCheckAllTopic(list.length === plainOptions.length);
    updateAccessForCategory('topic', list);
  };

  const onCheckAllTopicChange = (e) => {
    const checked = e.target.checked ? plainOptions : [];
    setCheckedTopicList(checked);
    setIndeterminateTopic(false);
    setCheckAllTopic(e.target.checked);
    updateAccessForCategory('topic', checked);
  };

  // Language
  

  const onLanguageChange = (list) => {
    setCheckedLanguage(list);
    setIndeterminateLanguage(
      !!list.length && list.length < multiLanguageCheckedList.length
    );
    setCheckAllLanguage(list.length === multiLanguageCheckedList.length);
    updateAccessForCategory('language', list);
  };

  const onCheckAllLanguageChange = (e) => {
    const checked = e.target.checked ? multiLanguageCheckedList : [];
    setCheckedLanguage(checked);
    setIndeterminateLanguage(false);
    setCheckAllLanguage(e.target.checked);
    updateAccessForCategory('language', checked);
  };
  // Calls
 
  // const onCallsChange = (list) => {
  //   setCheckedCalls(list);
  //   setIndeterminateCalls(
  //     !!list.length && list.length < callCheckedList.length
  //   );
  //   setCheckAllCalls(list.length === callCheckedList.length);
  //   updateAccessForCategory('call', list);
  // };

  // const onCheckAllCallsChange = (e) => {
  //   const checked = e.target.checked ? callCheckedList : [];
  //   setCheckedCalls(checked);
  //   setIndeterminateCalls(false);
  //   setCheckAllCalls(e.target.checked);
  //   updateAccessForCategory('call', checked);
  // };
  const onCallChange = (list) => {
    setCheckedCall(list);
    setIndeterminateCall(
      !!list.length && list.length < newCallCheckedList.length
    );
    setCheckAllCall(list.length === newCallCheckedList.length);
    updateAccessForCategory("call", list);
  };
  
  const onCheckAllCallChange = (e) => {
    const checked = e.target.checked ? newCallCheckedList : [];
    setCheckedCall(checked);
    setIndeterminateCall(false);
    setCheckAllCall(e.target.checked);
    updateAccessForCategory("call",checked);
  };

 // Download
 
 const onDownloadChange = (list) => {
  setCheckedDownload(list);
  setIndeterminateDownload(
    !!list.length && list.length < downloadCheckedList.length
  );
  setCheckAllDownload(list.length === downloadCheckedList.length);
  updateAccessForCategory('download', list);
};

const onCheckAllDownloadChange = (e) => {
  const checked = e.target.checked ? downloadCheckedList : [];
  setCheckedDownload(checked);
  setIndeterminateDownload(false);
  setCheckAllDownload(e.target.checked);
  updateAccessForCategory('download', checked);
};


  // Events
  

  const onEventsChange = (list) => {
    setCheckedEvents(list);
    setIndeterminateEvents(
      !!list.length && list.length < eventCheckedList.length
    );
    setCheckAllEvents(list.length === eventCheckedList.length);
    updateAccessForCategory('event', list);
  };

  const onCheckAllEventsChange = (e) => {
    const checked = e.target.checked ? eventCheckedList : [];
    setCheckedEvents(checked);
    setIndeterminateEvents(false);
    setCheckAllEvents(e.target.checked);
    updateAccessForCategory('event', checked);
  };
  // Planner
 

  const onPlannerChange = (list) => {
    setCheckedPlanner(list);
    setIndeterminatePlanner(
      !!list.length && list.length < plannerCheckedList.length
    );
    setCheckAllPlanner(list.length === plannerCheckedList.length);
    updateAccessForCategory('planner', list);
  };

  const onCheckAllPlannerChange = (e) => {
    const checked = e.target.checked ? plannerCheckedList : [];
    setCheckedPlanner(checked);
    setIndeterminatePlanner(false);
    setCheckAllPlanner(e.target.checked);
    updateAccessForCategory('planner', checked);
  };

  //Calculate


  const onCalculateChange = (list) => {
    setCheckedCalculateList(list);
    setIndeterminateCalculate(
      !!list.length && list.length < calculateCheckedList.length
    );
    setCheckAllCalculate(list.length === calculateCheckedList.length);
    updateAccessForCategory('calculator', list);
  };

  const onCheckAllCalculateChange = (e) => {
    const checked = e.target.checked ? calculateCheckedList : [];
    setCheckedCalculateList(checked);
    setIndeterminateCalculate(false);
    setCheckAllCalculate(e.target.checked);
    updateAccessForCategory('calculator', checked);
  };

 //Warrenty


 const onWarrentyChange = (list) => {
  setCheckedWarrentyList(list);
  setIndeterminateWarrenty(
    !!list.length && list.length < warrentyCheckedList.length
  );
  setCheckAllWarrenty(list.length === warrentyCheckedList.length);
  updateAccessForCategory('warrenty', list);
};

const onCheckAllWarrentyChange = (e) => {
  const checked = e.target.checked ? warrentyCheckedList : [];
  setCheckedWarrentyList(checked);
  setIndeterminateWarrenty(false);
  setCheckAllWarrenty(e.target.checked);
  updateAccessForCategory('warrenty', checked);
};


 //Price And Discount


 const onePriceDiscountChange = (list) => {
  setCheckedPriceDiscountList(list);
  setIndeterminatePriceDiscount(
    !!list.length && list.length < priceDiscountCheckedList.length
  );
  setCheckAllPriceDiscount(list.length === priceDiscountCheckedList.length);
  updateAccessForCategory('pnd', list);
};

const onCheckAllePriceDiscountChange = (e) => {
  const checked = e.target.checked ? priceDiscountCheckedList : [];
  setCheckedPriceDiscountList(checked);
  setIndeterminatePriceDiscount(false);
  setCheckAllPriceDiscount(e.target.checked);
  updateAccessForCategory('pnd', checked);
};

  console.log(checkedMaterialList)
  console.log("departmentData", props.departmentData);
  console.log(props.departmentAcces.vendor);
  console.log(checkedMaterialList)
  console.log(checkedMaterialsList)

  if (props.fetchingDepartmentAccess) {
    return <BundleLoader />;
  }
  return (
    <>
    <div className="flex flex-col">
      <div
        class=" flex justify-between h-[70vh]  overflow-y-auto"
        style={{ scrollbarWidth: "thin" }}
      >
       
          <div>
          {props.departmentData.hrInd === true ? (
          <div class="flex flex-col">
              <div class="text-clr flex text-base font-bold  ml-2 mt-8">
                General & Self Service
              </div>

              <div class="flex flex-col  ">
                {/* Left Box */}
                <div class=" w-[100%] p-1">
                  <div class="flex flex-col ">
                    <div class="flex justify-between  border  mt-2 w-[100%] h-20">
                      <div className=" flex w-2/5 flex-col">
                        <div className="text-sm font-semibold ml-2 mt-1"> Users </div>
                        <div className=" flex justify-evenly ml-2">Role-Based Access, Customizable Dashboards, Enhanced Collaboration, Multi departments and roles</div>
                      </div>
                      <div  className=" flex w-3/5 flex-col ml-4 mt-2">
                        
                        <Checkbox
                          indeterminate={indeterminateUser}
                          onChange={onCheckAllUserChange}
                          checked={checkAllUser}
                        >
                          <div class="text-xs"> Check all</div>
                        </Checkbox>
                       
                        <CheckboxGroup
                          options={userOptions}
                          value={checkedUserList}
                          onChange={onUserChange}
                        />
                      </div>
                    </div>
                    <div class="flex justify-between border  mt-2 w-[100%] h-20">
                    <div className=" flex w-2/5 flex-col">
                        <div className="text-sm font-semibold ml-2 mt-1">Facility</div>
                        <div className=" flex justify-evenly ml-2">Space Allocation and Utilization, Stock Control, Automated Reordering, Workforce Scheduling and Resource Allocation.
                        </div>
                      </div>
                      <div className=" flex w-3/5 flex-col ml-4 mt-2">
                       
                        <Checkbox
                          indeterminate={indeterminatePlant}
                          onChange={onCheckAllPlantChange}
                          checked={checkAllPlant}
                        >
                          <div class="text-xs"> Check all</div>
                        </Checkbox>
                       
                        <CheckboxGroup
                          options={orderOptions}
                          value={checkedPlantList}
                          onChange={onPlantChange}
                        />
                      </div>
                    </div>
                    <div class="flex justify-between  border  mt-2 w-[100%] h-20">
                    <div className=" flex w-2/5 flex-col">
                        <div className="text-sm font-semibold ml-2 mt-1">Repository</div>
                        <div className=" flex justify-evenly ml-2">Central location for storing data, resources or digital assets - managed and maintain efficiently and effectively.</div>
                      </div>
                      <div className=" flex w-3/5 flex-col ml-4 mt-2">
                        <Checkbox
                          indeterminate={indeterminateRepository}
                          onChange={onCheckAllRepositoryChange}
                          checked={checkAllRepository}
                        >
                          <div class="text-xs"> Check all</div>
                        </Checkbox>
                       
                        <CheckboxGroup
                          options={repositoryCheckedList}
                          value={checkedRepositoryList}
                          onChange={onRepositoryChange}
                        />
                      </div>
                        </div>
                        <div class="flex justify-between  border  mt-2 w-[100%] h-20">
                        <div className=" flex w-2/5 flex-col">
                        <div className="text-sm font-semibold ml-2 mt-1">Settings</div>
                        <div className=" flex justify-evenly ml-2"></div>
                      </div>
                      <div className=" flex w-3/5 flex-col ml-4 mt-2">
                        <Checkbox
                          indeterminate={indeterminateSettings}
                          onChange={onCheckAllSettingsChange}
                          checked={checkAllSettings}
                        >
                          <div class="text-xs"> Check all</div>
                        </Checkbox>
                       
                        <CheckboxGroup
                          options={settingsCheckedList}
                          value={checkedSettingsList}
                          onChange={onSettingsChange}
                        />
                      </div>
</div> 
<div class="flex justify-between  border  mt-2 w-[100%] h-20">
            <div className="  flex w-2/5 flex-col">
            <div className="text-sm font-semibold ml-2 mt-1">Basic</div>
            <div className=" flex justify-evenly ml-2"></div>
                      </div>
                      <div className=" flex w-3/5 flex-col ml-4 mt-2">
                        
                        <Checkbox
                          indeterminate={indeterminateBasic}
                          onChange={onCheckAllBasicChange}
                          checked={checkAllBasic}
                        >
                          <div class="text-xs"> Check all</div>
                        </Checkbox>
                       
                        <CheckboxGroup
                          options={basicCheckedList}
                          value={checkedBasicList}
                          onChange={onBasicChange}
                        />
                      </div>
                      </div>
                      <div class="flex justify-between  border  mt-2 w-[100%] h-20">
                      <div className=" flex w-2/5 flex-col">
                      <div className="text-sm font-semibold ml-2 mt-1">Tasks</div>
                      <div className=" flex justify-evenly ml-2">Quick Task Creation, Shared Tasks, Comments and Notes, Notify team members by tagging, Progress Indicators and audit trail.</div>

                      </div>
                      <div className=" flex w-3/5 flex-col ml-4 mt-2">
                        <Checkbox
                          indeterminate={indeterminateTasks}
                          onChange={onCheckAllTasksChange}
                          checked={checkAllTasks}
                        >
                          <div class="text-xs">Check all</div>
                        </Checkbox>
                       
                        <CheckboxGroup
                          options={defaultCheckedList}
                          value={checkedTasksList}
                          onChange={onTasksChange}
                        />
                      </div>
                    </div>

                   <div class="flex justify-between  border  mt-2 w-[100%] h-20">
                   <div className="  flex w-2/5 flex-col">
                   <div className="text-sm font-semibold ml-2 mt-1">Dashboard</div>
                   <div className=" flex justify-evenly ml-2"></div>
                      </div>
                      <div className=" flex w-3/5 flex-col ml-4 mt-2">
                        <Checkbox
                          indeterminate={indeterminateDashboard}
                          onChange={onCheckAllDashboardChange}
                          checked={checkAllDashboard}
                        >
                          <div class="text-xs"> Check all</div>
                        </Checkbox>
                       
                        <CheckboxGroup
                          options={dashboardCheckedList}
                          value={checkedDashboardList}
                          onChange={onDashboardChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Box */}
                <div class=" w-[100%]  p-1">
                  <div class="flex flex-col">
                  <div class="flex justify-between  border  mt-2 w-[100%] h-20">
                  <div className="  flex w-2/5 flex-col">
                  <div className="text-sm font-semibold ml-2 mt-1">Locations</div>
                  <div className=" flex justify-evenly ml-2">Space Allocation and Utilization, Stock Control, Automated Reordering, Workforce Scheduling and Resource Allocation.
                 </div>
                      </div>
                      <div className=" flex w-3/5 flex-col ml-4 mt-2">
                        <Checkbox
                          indeterminate={indeterminateLocation}
                          onChange={onCheckAllLocationChange}
                          checked={checkAllLocation}
                        >
                          <div class="text-xs"> Check all</div>
                        </Checkbox>
                    
                        <CheckboxGroup
                          options={plainOptions}
                          value={checkedLocationList}
                          onChange={onLocationChange}
                        />
                      </div>
                    </div>

                    <div class="flex justify-between  border  mt-2 w-[100%] h-20">
                    <div className="  flex w-2/5 flex-col">
                    <div className="text-sm font-semibold ml-2 mt-1">Teams</div>
                    <div className=" flex justify-evenly ml-2"></div>
                      </div>
                      <div  className=" flex w-3/5 flex-col ml-4 mt-2">
                        <Checkbox
                          indeterminate={indeterminateTeams}
                          onChange={onCheckAllTeamsChange}
                          checked={checkAllTeams}
                        >
                          <div class="text-xs"> Check all</div>
                        </Checkbox>
                       
                        <CheckboxGroup
                          options={orderOptions}
                          value={checkedTeamsList}
                          onChange={onTeamsChange}
                        />
                      </div>
                    </div>

                    <div class="flex justify-between  border  mt-2 w-[100%] h-20">
                    <div className="  flex w-2/5 flex-col">
                    <div className="text-sm font-semibold ml-2 mt-1">Reports</div>
                    <div className=" flex justify-evenly ml-2"></div>
                      </div>
                      <div  className=" flex w-3/5 flex-col ml-4 mt-2">
                        
                        <Checkbox
                          indeterminate={indeterminateReport}
                          onChange={onCheckAllReportChange}
                          checked={checkAllReport}
                        >
                          <div class="text-xs"> Check all</div>
                        </Checkbox>
                       
                        <CheckboxGroup
                          options={defaultCheckedList}
                          value={checkedReportList}
                          onChange={onReportChange}
                        />
                      </div>
                      </div>

                      <div class="flex justify-between  border  mt-2 w-[100%] h-20">
                      <div className="  flex w-2/5 flex-col">
                      <div className="text-sm font-semibold ml-2 mt-1">Language</div>
                        <div className=" flex justify-evenly ml-2">Supports multi lingual, user can personalize, admin can edit the translated version of the words.</div>
                      </div>
                      <div  className=" flex w-3/5 flex-col ml-4 mt-2">
                        
                        <Checkbox
                          indeterminate={indeterminatLanguage}
                          onChange={onCheckAllLanguageChange}
                          checked={checkAllLanguage}
                        >
                          <div class="text-xs"> Check all</div>
                        </Checkbox>
                  
                        <CheckboxGroup
                          options={multiLanguageCheckedList}
                          value={checkedLanguage}
                          onChange={onLanguageChange}
                        />
                      </div>
                      </div>
                      <div class="flex justify-between  border  mt-2 w-[100%] h-20">
                      <div className="  flex w-2/5 flex-col">
                      <div className="text-sm font-semibold ml-2 mt-1">Planner</div>
                      <div className=" flex justify-evenly ml-2"></div>
                      </div>
                      <div  className=" flex w-3/5 flex-col ml-4 mt-2">
                        
                        <Checkbox
                          indeterminate={indeterminatePlanner}
                          onChange={onCheckAllPlannerChange}
                          checked={checkAllPlanner}
                        >
                          <div class="text-xs"> Check all </div>
                        </Checkbox>
                       
                        <CheckboxGroup
                          options={plannerCheckedList}
                          value={checkedPlanner}
                          onChange={onPlannerChange}
                        />
                      </div>
                    </div>
                  
<div class="flex justify-between  border  mt-2 w-[100%] h-20">
                      <div className="  flex w-2/5 flex-col">
                      <div className="text-sm font-semibold ml-2 mt-1">Calls</div>
                      <div className=" flex justify-evenly ml-2"></div>
                      </div>
                      <div  className=" flex w-3/5 flex-col ml-4 mt-2">
                        
                        <Checkbox
                          indeterminate={indeterminateCall}
                          onChange={onCheckAllCallChange}
                          checked={checkAllCall}
                        >
                          <div class="text-xs"> Check all </div>
                        </Checkbox>
                       
                        <CheckboxGroup
                          options={newCallCheckedList}
                          value={checkedCall}
                          onChange={onCallChange}
                        />
                      </div>
</div>
<div class="flex justify-between  border  mt-2 w-[100%] h-20">
      <div className="  flex w-2/5 flex-col">
                    <div className="text-sm font-semibold ml-2 mt-1">Download</div>
                    <div className=" flex justify-evenly ml-2"></div>
                      </div>
                      <div  className=" flex w-3/5 flex-col ml-4 mt-2">
                        
                        <Checkbox
                          indeterminate={indeterminateDownload}
                          onChange={onCheckAllDownloadChange}
                          checked={checkAllDownload}
                        >
                          <div class="text-xs"> Check all </div>
                        </Checkbox>
                       
                        <CheckboxGroup
                          options={downloadCheckedList}
                          value={checkedDownload}
                          onChange={onDownloadChange}
                        />
                      </div>
                      </div>
                      <div class="flex justify-between  border  mt-2 w-[100%] h-20">
                      <div className="  flex w-2/5 flex-col">
                      <div className="text-sm font-semibold ml-2 mt-1">Events</div>
                        <div className=" flex justify-evenly ml-2"></div>
                      </div>
                      <div  className=" flex w-3/5 flex-col ml-4 mt-2">
                        
                        <Checkbox
                          indeterminate={indeterminateEvents}
                          onChange={onCheckAllEventsChange}
                          checked={checkAllEvents}
                        >
                          <div class="text-xs"> Check all </div>
                        </Checkbox>
                       
                        <CheckboxGroup
                          options={eventCheckedList}
                          value={checkedEvents}
                          onChange={onEventsChange}
                        />
                        </div>
                      </div>
                      </div>
                  </div>
                </div>
              </div>
         ) : null}
        
          {props.departmentData.hrInd === true ? (
          <div class="flex flex-col">
          <div class="text-clr flex  text-base font-bold   ml-2 mt-8">
                HR
              </div>
              <div class="flex flex-col  ">
                <div class="flex flex-col w-[100%] p-1">
                <div class="flex justify-between  border  mt-2 w-[100%] h-20">
                      <div className="  flex w-2/5 flex-col">
                      <div className="text-sm font-semibold ml-2 mt-1">Mileage</div>
                      <div className=" flex justify-evenly ml-2"></div>
                      </div>
                      <div  className=" flex w-3/5 flex-col ml-4 mt-2">
                      
                        <Checkbox
                          indeterminate={indeterminateMileage}
                          onChange={onCheckAllMileageChange}
                          checked={checkAllMileage}
                        >
                          <div class="text-xs"> Check all</div>
                        </Checkbox>
                       
                        <CheckboxGroup
                          options={melCheckedList}
                          value={checkedMileageList}
                          onChange={onMileageChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div class="flex flex-col w-[100%] p-1">
                <div class="flex justify-between  border  mt-2 w-[100%] h-20">
                      <div className="  flex w-2/5 flex-col">
                      <div className="text-sm font-semibold ml-2 mt-1">Expense</div>
                        <div className=" flex justify-evenly ml-2"></div>
                      </div>
                      <div  className=" flex w-3/5 flex-col ml-4 mt-2">
                      
                        <Checkbox
                          indeterminate={indeterminateExpense}
                          onChange={onCheckAllExpenseChange}
                          checked={checkAllExpense}
                        >
                          <div class="text-xs"> Check all</div>
                        </Checkbox>
                       
                        <CheckboxGroup
                          options={melCheckedList}
                          value={checkedExpenseList}
                          onChange={onExpenseChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div class="flex flex-col w-[100%] p-1">
                <div class="flex justify-between  border  mt-2 w-[100%] h-20">
                      <div className="  flex w-2/5 flex-col">
                      <div className="text-sm font-semibold ml-2 mt-1">Holiday</div>
                      <div className=" flex justify-evenly ml-2"></div>
                      </div>
                      <div  className=" flex w-3/5 flex-col ml-4 mt-2">
                      
                        <Checkbox
                          indeterminate={indeterminateHoliday}
                          onChange={onCheckAllHolidayChange}
                          checked={checkAllHoliday}
                        >
                          <div class="text-xs"> Check all</div>
                        </Checkbox>
                       
                        <CheckboxGroup
                          options={basicCheckedList}
                          value={checkedHolidayList}
                          onChange={onHolidayChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div class="flex flex-col w-[100%] p-1">
                <div class="flex justify-between  border  mt-2 w-[100%] h-20">
                      <div className="  flex w-2/5 flex-col">
                      <div className="text-sm font-semibold ml-2 mt-1">Leaves</div>
                      <div className=" flex justify-evenly ml-2"></div>
                      </div>
                      <div  className=" flex w-3/5 flex-col ml-4 mt-2">
                      
                        <Checkbox
                          indeterminate={indeterminateLeaves}
                          onChange={onCheckAllLeavesChange}
                          checked={checkAllLeaves}
                        >
                          <div class="text-xs">Check all</div>
                        </Checkbox>
                       
                        <CheckboxGroup
                          options={melCheckedList}
                          value={checkedLeavesList}
                          onChange={onLeavesChange}
                        />
                      </div>
                    </div>
                  </div>
                  </div>

            </div>
  ) : null}
       
   {props.departmentData.crmInd === true ? (
          <div class="flex flex-col">
          <div class="text-clr flex  text-base font-bold   ml-2 mt-8">
               CRM
              </div>
              <div class="flex flex-col  ">
                <div class="flex flex-col w-[100%] p-1">
                <div class="flex justify-between  border  mt-2 w-[100%] h-20">
                      <div className="  flex w-2/5 flex-col">
                      <div className="text-sm font-semibold ml-2 mt-1">Prospect</div>
                      <div className=" flex justify-evenly ml-2"></div>
                      </div>
                      <div  className=" flex w-3/5 flex-col ml-4 mt-2">
                      
                        <Checkbox
                          indeterminate={indeterminateCustomer}
                          onChange={onCheckAllCustomerChange}
                          checked={checkAllCustomer}
                        >
                          <div class="text-xs"> Check all </div>
                        </Checkbox>
                       
                        <CheckboxGroup
                          options={propspectOptions}
                          value={checkedCustomerList}
                          onChange={onCustomerChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div class="flex flex-col w-[100%] p-1">
                <div class="flex justify-between  border  mt-2 w-[100%] h-20">
                      <div className="  flex w-2/5 flex-col">
                      <div className="text-sm font-semibold ml-2 mt-1">Quotation</div>
                        <div className=" flex justify-evenly ml-2"></div>
                      </div>
                      <div  className=" flex w-3/5 flex-col ml-4 mt-2">
                      
                        <Checkbox
                          indeterminate={indeterminateOpportunity}
                          onChange={onCheckAllOpportunityChange}
                          checked={checkAllOpportunity}
                        >
                          <div class="text-xs"> Check all </div>
                        </Checkbox>
                       
                        <CheckboxGroup
                          options={orderOptions}
                          value={checkedOpportunityList}
                          onChange={onOpportunityChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div class="flex flex-col w-[100%] p-1">
                <div class="flex justify-between  border  mt-2 w-[100%] h-20">
                      <div className="  flex w-2/5 flex-col">
                      <div className="text-sm font-semibold ml-2 mt-1">Leads</div>
                      <div className=" flex justify-evenly ml-2"></div>
                      </div>
                      <div  className=" flex w-3/5 flex-col ml-4 mt-2">
                      
                        <Checkbox
                          indeterminate={indeterminateLeads}
                          onChange={onCheckAllLeadsChange}
                          checked={checkAllLeads}
                        >
                          <div class="text-xs"> Check all </div>
                        </Checkbox>
                       
                        <CheckboxGroup
                          options={plainOptions}
                          value={checkedLeadsList}
                          onChange={onLeadsChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div class="flex flex-col w-[100%] p-1">
                <div class="flex justify-between  border  mt-2 w-[100%] h-20">
                      <div className="  flex w-2/5 flex-col">
                      <div className="text-sm font-semibold ml-2 mt-1">Contact</div>
                        <div className=" flex justify-evenly ml-2"></div>
                      </div>
                      <div  className=" flex w-3/5 flex-col ml-4 mt-2">
                      
                        <Checkbox
                          indeterminate={indeterminateContact}
                          onChange={onCheckAllContactChange}
                          checked={checkAllContact}
                        >
                          <div class="text-xs"> Check all</div>
                        </Checkbox>
                       
                        <CheckboxGroup
                          options={plainOptions}
                          value={checkedContactList}
                          onChange={onContactChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div class="flex flex-col w-[100%] p-1">
                <div class="flex justify-between  border  mt-2 w-[100%] h-20">
                      <div className="  flex w-2/5 flex-col">
                      <div className="text-sm font-semibold ml-2 mt-1">Junk Leads</div>
                      <div className=" flex justify-evenly ml-2"></div>
                      </div>
                      <div  className=" flex w-3/5 flex-col ml-4 mt-2">
                      
                        <Checkbox
                          indeterminate={indeterminateJunk}
                          onChange={onCheckAllJunkChange}
                          checked={checkAllJunk}
                        >
                          <div class="text-xs"> Check all</div>
                        </Checkbox>
                       
                        <CheckboxGroup
                          options={junkCheckedList}
                          value={checkedJunkList}
                          onChange={onJunkChange}
                        />
                      </div>
                    </div>
                  </div>
                  
                  </div>

            </div>
  ) : null}
       
          {props.departmentData.erpInd === true ? (
          <div class="flex flex-col">
          <div class="text-clr flex  text-base font-bold   ml-2 mt-8">
        ERP
              </div>
              <div class="flex flex-col  ">
                <div class="flex flex-col w-[100%] p-1">
                <div class="flex justify-between  border  mt-2 w-[100%] h-20">
                      <div className="  flex w-2/5 flex-col">
                      <div className="text-sm font-semibold ml-2 mt-1">Shipper</div>
                      <div className=" flex justify-evenly ml-2"></div>
                      </div>
                      <div  className=" flex w-3/5 flex-col ml-4 mt-2">
                      
                        <Checkbox
                          indeterminate={indeterminateShipper}
                          onChange={onCheckAllShipperChange}
                          checked={checkAllShipper}
                        >
                          <div class="text-xs"> Check all</div>
                        </Checkbox>
                       
                        <CheckboxGroup
                          options={plainOptions}
                          value={checkedShipperList}
                          onChange={onShipperChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div class="flex flex-col w-[100%] p-1">
                <div class="flex justify-between  border  mt-2 w-[100%] h-20">
                      <div className="  flex w-2/5 flex-col">
                      <div className="text-sm font-semibold ml-2 mt-1">Order</div>
                      <div className=" flex justify-evenly ml-2"></div>
                      </div>
                      <div  className=" flex w-3/5 flex-col ml-4 mt-2">
                      
                        <Checkbox
                          indeterminate={indeterminateOrder}
                          onChange={onCheckAllOrderChange}
                          checked={checkAllOrder}
                        >
                          <div class="text-xs"> Check all</div>
                        </Checkbox>
                       
                        <CheckboxGroup
                          options={orderOptions}
                          value={checkedOrderList}
                          onChange={onOrderChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div class="flex flex-col w-[100%] p-1">
                <div class="flex justify-between  border  mt-2 w-[100%] h-20">
                      <div className="  flex w-2/5 flex-col">
                      <div className="text-sm font-semibold ml-2 mt-1">Materials</div>
                      <div className=" flex justify-evenly ml-2"></div>
                      </div>
                      <div  className=" flex w-3/5 flex-col ml-4 mt-2">
                      
                        <Checkbox
          indeterminate={indeterminateMaterials}
          onChange={onCheckAllMaterialsChange}
          checked={checkAllMaterials}
        >
          <div className="text-xs"> Check all </div>
        </Checkbox>
       
        <Checkbox.Group
          options={materialMfaOptions}
          value={checkedMaterialsList}
          onChange={onMaterialsChange}
        />
                      </div>
                    </div>
                  </div>
                
                  <div class="flex flex-col w-[100%] p-1">
                <div class="flex justify-between  border  mt-2 w-[100%] h-20">
                      <div className="  flex w-2/5 flex-col">
                      <div className="text-sm font-semibold ml-2 mt-1">Inventory</div>
                      <div className=" flex justify-evenly ml-2"></div>
                      </div>
                      <div  className=" flex w-3/5 flex-col ml-4 mt-2">
                      
                        <Checkbox
                          indeterminate={indeterminateInventory}
                          onChange={onCheckAllInventoryChange}
                          checked={checkAllInventory}
                        >
                          <div class="text-xs"> Check all </div>
                        </Checkbox>
                       
                        <CheckboxGroup
                          options={inventoryNewOptions}
                          value={checkedInventoryList}
                          onChange={onInventoryChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div class="flex flex-col w-[100%] p-1">
                <div class="flex justify-between  border  mt-2 w-[100%] h-20">
                      <div className="  flex w-2/5 flex-col">
                      <div className="text-sm font-semibold ml-2 mt-1">Procurement</div>
                      <div className=" flex justify-evenly ml-2"></div>
                      </div>
                      <div  className=" flex w-3/5 flex-col ml-4 mt-2">
                      
                        <Checkbox
                          indeterminate={indeterminateProcurement}
                          onChange={onCheckAllProcurementChange}
                          checked={checkAllProcurement}
                        >
                          <div class="text-xs"> Check all</div>
                        </Checkbox>
                       
                        <CheckboxGroup
                          options={plainOptions}
                          value={checkedProcurementList}
                          onChange={onProcurementChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div class="flex flex-col w-[100%] p-1">
                <div class="flex justify-between  border  mt-2 w-[100%] h-20">
                      <div className="  flex w-2/5 flex-col">
                      <div className="text-sm font-semibold ml-2 mt-1">Production</div>
                      <div className=" flex justify-evenly ml-2"></div>
                      </div>
                      <div  className=" flex w-3/5 flex-col ml-4 mt-2">
                      
                        <Checkbox
                          indeterminate={indeterminateProduction}
                          onChange={onCheckAllProductionChange}
                          checked={checkAllProduction}
                        >
                          <div class="text-xs"> Check all</div>
                        </Checkbox>
                       
                        <CheckboxGroup
                          options={materialOptions}
                          value={checkedProductionList}
                          onChange={onProductionChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div class="flex flex-col w-[100%] p-1">
                <div class="flex justify-between  border  mt-2 w-[100%] h-20">
                      <div className="  flex w-2/5 flex-col">
                      <div className="text-sm font-semibold ml-2 mt-1">Warrenty</div>
                      <div className=" flex justify-evenly ml-2"></div>
                      </div>
                      <div  className=" flex w-3/5 flex-col ml-4 mt-2">
                      
                        <Checkbox
                          indeterminate={indeterminateWarrenty}
                          onChange={onCheckAllWarrentyChange}
                          checked={checkAllWarrenty}
                        >
                          <div class="text-xs"> Check all</div>
                        </Checkbox>
                       
                        <CheckboxGroup
                          options={warrentyCheckedList}
                          value={checkedWarrentyList}
                          onChange={onWarrentyChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div class="flex flex-col w-[100%] p-1">
                <div class="flex justify-between  border  mt-2 w-[100%] h-20">
                      <div className="  flex w-2/5 flex-col">
                      <div className="text-sm font-semibold ml-2 mt-1">Price and Discount</div>
                      <div className=" flex justify-evenly ml-2"></div>
                      </div>
                      <div  className=" flex w-3/5 flex-col ml-4 mt-2">
                      
                        <Checkbox
                          indeterminate={indeterminatePriceDiscount}
                          onChange={onCheckAllePriceDiscountChange}
                          checked={checkAllPriceDiscount}
                        >
                          <div class="text-xs"> Check all</div>
                        </Checkbox>
                       
                        <CheckboxGroup
                          options={priceDiscountCheckedList}
                          value={checkedPriceDiscountList}
                          onChange={onePriceDiscountChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div class="flex flex-col w-[100%] p-1">
                <div class="flex justify-between  border  mt-2 w-[100%] h-20">
                      <div className="  flex w-2/5 flex-col">
                      <div className="text-sm font-semibold ml-2 mt-1">Customer</div>
                      <div className=" flex justify-evenly ml-2"></div>
                      </div>
                      <div  className=" flex w-3/5 flex-col ml-4 mt-2">
                      
                        <Checkbox
                          indeterminate={indeterminateAccount}
                          onChange={onCheckAllAccountChange}
                          checked={checkAllAccount}
                        >
                          <div class="text-xs"> Check all</div>
                        </Checkbox>
                       
                        <CheckboxGroup
                          options={accountOptions}
                          value={checkedAccountList}
                          onChange={onAccountChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div class="flex flex-col w-[100%] p-1">
                <div class="flex justify-between  border  mt-2 w-[100%] h-20">
                      <div className="  flex w-2/5 flex-col">
                      <div className="text-sm font-semibold ml-2 mt-1">Catalogue</div>
                      <div className=" flex justify-evenly ml-2"></div>
                      </div>
                      <div  className=" flex w-3/5 flex-col ml-4 mt-2">
                      
                        <Checkbox
                          indeterminate={indeterminateCatalog}
                          onChange={onCheckAllCatalogChange}
                          checked={checkAllCatalog}
                        >
                          <div class="text-xs"> Check all </div>
                        </Checkbox>
                       
                        <CheckboxGroup
                          options={materialMfaOptions}
                          value={checkedCatalogList}
                          onChange={onCatalogChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div class="flex flex-col w-[100%] p-1">
                <div class="flex justify-between  border  mt-2 w-[100%] h-20">
                      <div className="  flex w-2/5 flex-col">
                      <div className="text-sm font-semibold ml-2 mt-1">Supplier</div>
                      <div className=" flex justify-evenly ml-2"></div>
                      </div>
                      <div  className=" flex w-3/5 flex-col ml-4 mt-2">
                      
                        <Checkbox
                          indeterminate={indeterminateSupplier}
                          onChange={onCheckAllSupplierChange}
                          checked={checkAllSupplier}
                        >
                          <div class="text-xs"> Check all </div>
                        </Checkbox>
                       
                        <CheckboxGroup
                          options={supplierNewOptions}
                          value={checkedSupplierList}
                          onChange={onSupplierChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div class="flex flex-col w-[100%] p-1">
                <div class="flex justify-between  border  mt-2 w-[100%] h-20">
                      <div className="  flex w-2/5 flex-col">
                      <div className="text-sm font-semibold ml-2 mt-1">Refurbish</div>
                        <div className=" flex justify-evenly ml-2"></div>
                      </div>
                      <div  className=" flex w-3/5 flex-col ml-4 mt-2">
                      
                        <Checkbox
                          indeterminate={indeterminateRefurbish}
                          onChange={onCheckAllRefurbishChange}
                          checked={checkAllRefurbish}
                        >
                          <div class="text-xs"> Check all </div>
                        </Checkbox>
                       
                        <CheckboxGroup
                          options={refurbishCheckedList}
                          value={checkedRefurbishList}
                          onChange={onRefurbishChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div class="flex flex-col w-[100%] p-1">
                <div class="flex justify-between  border  mt-2 w-[100%] h-20">
                      <div className="  flex w-2/5 flex-col">
                      <div className="text-sm font-semibold ml-2 mt-1">Subscription</div>
                      <div className=" flex justify-evenly ml-2"></div>
                      </div>
                      <div  className=" flex w-3/5 flex-col ml-4 mt-2">
                      
                        <Checkbox
                          indeterminate={indeterminateSubscription}
                          onChange={onCheckAllSubscriptionChange}
                          checked={checkAllSubscription}
                        >
                          <div class="text-xs"> Check all</div>
                        </Checkbox>
                       
                        <CheckboxGroup
                          options={materialOptions}
                          value={checkedSubscriptionList}
                          onChange={onSubscriptionChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div class="flex flex-col w-[100%] p-1">
                <div class="flex justify-between  border  mt-2 w-[100%] h-20">
                      <div className="  flex w-2/5 flex-col">
                      <div className="text-sm font-semibold ml-2 mt-1">Scanner</div>
                      <div className=" flex justify-evenly ml-2"></div>
                      </div>
                      <div  className=" flex w-3/5 flex-col ml-4 mt-2">
                      
                        <Checkbox
                          indeterminate={indeterminateScanner}
                          onChange={onCheckAllScannerChange}
                          checked={checkAllScanner}
                        >
                          <div class="text-xs"> Check all</div>
                        </Checkbox>
                       
                        <CheckboxGroup
                          options={settingsCheckedList}
                          value={checkedScannerList}
                          onChange={onScannerChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div class="flex flex-col w-[100%] p-1">
                <div class="flex justify-between  border  mt-2 w-[100%] h-20">
                      <div className="  flex w-2/5 flex-col">
                      <div className="text-sm font-semibold ml-2 mt-1">Quality</div>
                      <div className=" flex justify-evenly ml-2"></div>
                      </div>
                      <div  className=" flex w-3/5 flex-col ml-4 mt-2">
                      
                      <Checkbox
                        indeterminate={indeterminateQuality}
                        onChange={onCheckAllQualityChange}
                        checked={checkAllQuality}
                      >
                        <div class="text-xs"> Check all</div>
                      </Checkbox>
                     
                      <CheckboxGroup
                        options={plainOptions}
                        value={checkedQualityList}
                        onChange={onQualityChange}
                      />
                      </div>
                    </div>
                  </div>
                  </div>

            </div>
  ) : null}
        

          {props.departmentData.financeInd === true ? (
            <div class="flex flex-col ">
              <div class=" text-clr text-base flex   ml-2 mt-8 font-bold">
                Accounting
              </div>
              <div class="flex flex-col  ">
                <div class="flex flex-col w-[100%] p-1">
                <div class="flex justify-between  border  mt-2 w-[100%] h-20">
                      <div className="  flex w-2/5 flex-col">
                      <div className="text-sm font-semibold ml-2 mt-1">Collections</div>
                      <div className=" flex justify-evenly ml-2"></div>
                      </div>
                      <div  className=" flex w-3/5 flex-col ml-4 mt-2">
                        <Checkbox
                          indeterminate={indeterminateCollection}
                          onChange={onCheckAllCollectionChange}
                          checked={checkAllCollection}
                        >
                          <div class="text-xs"> Check all</div>
                        </Checkbox>
                       
                        <CheckboxGroup
                          options={collectionCheckedList}
                          value={checkedCollectionList}
                          onChange={onCollectionChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div class="flex flex-col w-[100%] p-1">
                <div class="flex justify-between  border  mt-2 w-[100%] h-20">
                      <div className="  flex w-2/5 flex-col">
                      <div className="text-sm font-semibold ml-2 mt-1">Payments</div>
                      <div className=" flex justify-evenly ml-2"></div>
                      </div>
                      <div  className=" flex w-3/5 flex-col ml-4 mt-2">
                        <Checkbox
                          indeterminate={indeterminatePayments}
                          onChange={onCheckAllPaymentsChange}
                          checked={checkAllPayments}
                        >
                          <div class="text-xs"> Check all </div>
                        </Checkbox>
                       
                        <CheckboxGroup
                          options={accountingCheckedList}
                          value={checkedPaymentsList}
                          onChange={onPaymentsChange}
                        />
                      </div>
                    </div>
                  </div>
                 
                
              </div>
            </div>
          ) : null}

          <div class="flex flex-col ">
            <div class=" text-clr text-base flex   ml-2 mt-8 font-bold">
              Ecom
            </div>
            <div class="flex flex-col  ">
                <div class="flex flex-col w-[100%] p-1">
                <div class="flex justify-between  border  mt-2 w-[100%] h-20">
                      <div className="  flex w-2/5 flex-col">
                      <div className="text-sm font-semibold ml-2 mt-1">Promotions</div>
                      <div className=" flex justify-evenly ml-2"></div>
                      </div>
                      <div  className=" flex w-3/5 flex-col ml-4 mt-2">
                      <Checkbox
                        indeterminate={indeterminatePromotions}
                        onChange={onCheckAllPromotionsChange}
                        checked={checkAllPromotions}
                      >
                        <div class="text-xs"> Check all</div>
                      </Checkbox>
                     
                      <CheckboxGroup
                        options={materialOptions}
                        value={checkedPromotionsList}
                        onChange={onPromotionsChange}
                      />
                      </div>
                    </div>
                  </div>
                  </div>
            
          </div>

          {/* {props.departmentData.recruitProInd === true ? ( */}
            <div class="flex flex-col ">
              <div class=" text-clr text-base flex   ml-2 mt-8 font-bold">
                RecruitPro
              </div>
              <div class="flex flex-col  ">
                <div class="flex flex-col w-[100%] p-1">
                <div class="flex justify-between  border  mt-2 w-[100%] h-20">
                      <div className="  flex w-2/5 flex-col">
                      <div className="text-sm font-semibold ml-2 mt-1">Talent</div>
                        <div className=" flex justify-evenly ml-2"></div>
                      </div>
                      <div  className=" flex w-3/5 flex-col ml-4 mt-2">
                        <Checkbox
                          indeterminate={indeterminateTalent}
                          onChange={onCheckAllTalentChange}
                          checked={checkAllTalent}
                        >
                          <div class="text-xs"> Check all </div>
                        </Checkbox>
                       
                        <CheckboxGroup
                          options={orderOptions}
                          value={checkedTalentList}
                          onChange={onTalentChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div class="flex flex-col w-[100%] p-1">
                <div class="flex justify-between  border  mt-2 w-[100%] h-20">
                      <div className="  flex w-2/5 flex-col">
                      <div className="text-sm font-semibold ml-2 mt-1">Requirement</div>
                      <div className=" flex justify-evenly ml-2"></div>
                      </div>
                      <div  className=" flex w-3/5 flex-col ml-4 mt-2">
                        <Checkbox
                          indeterminate={indeterminateRequirement}
                          onChange={onCheckAllRequirementChange}
                          checked={checkAllRequirement}
                        >
                          <div class="text-xs"> Check all </div>
                        </Checkbox>
                       
                        <CheckboxGroup
                          options={requirementCheckedList}
                          value={checkedRequirementList}
                          onChange={onRequirementChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div class="flex flex-col w-[100%] p-1">
                <div class="flex justify-between  border  mt-2 w-[100%] h-20">
                      <div className="  flex w-2/5 flex-col">
                      <div className="text-sm font-semibold ml-2 mt-1">Project</div>
                        <div className=" flex justify-evenly ml-2"></div>
                      </div>
                      <div  className=" flex w-3/5 flex-col ml-4 mt-2">
                        <Checkbox
                          indeterminate={indeterminateProject}
                          onChange={onCheckAllProjectChange}
                          checked={checkAllProject}
                        >
                          <div class="text-xs"> Check all </div>
                        </Checkbox>
                       
                        <CheckboxGroup
                          options={materialNewOptions}
                          value={checkedProjectList}
                          onChange={onProjectChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div class="flex flex-col w-[100%] p-1">
                <div class="flex justify-between  border  mt-2 w-[100%] h-20">
                      <div className="  flex w-2/5 flex-col">
                      <div className="text-sm font-semibold ml-2 mt-1">Billing</div>
                        <div className=" flex justify-evenly ml-2"></div>
                      </div>
                      <div  className=" flex w-3/5 flex-col ml-4 mt-2">
                        <Checkbox
                          indeterminate={indeterminateBilling}
                          onChange={onCheckAllBillingChange}
                          checked={checkAllBilling}
                        >
                          <div class="text-xs"> Check all </div>
                        </Checkbox>
                       
                        <CheckboxGroup
                          options={materialNewOptions}
                          value={checkedBillingList}
                          onChange={onBillingChange}
                        />
                      </div>
                    </div>
                  </div>
              </div>
              <div class="flex mt-2 ">
              
              </div>
            </div>
          {/* ) : null} */}
          {props.departmentData.imInd === true ? (
            <div class="flex flex-col ">
              <div class=" text-clr text-base  ml-2 mt-8 flex  font-bold">
                IM
              </div>
              <div class="flex flex-col ">
                {/* Left Box */}
                <div class="flex flex-col w-[100%] p-1">
                <div class="flex justify-between  border  mt-2 w-[100%] h-20">
                      <div className="  flex w-2/5 flex-col">
                      <div className="text-sm font-semibold ml-2 mt-1">Investor</div>
                      <div className=" flex justify-evenly ml-2"></div>
                      </div>
                      <div  className=" flex w-3/5 flex-col ml-4 mt-2">
                 
                        <Checkbox
                          indeterminate={indeterminateInvestor}
                          onChange={onCheckAllInvestorChange}
                          checked={checkAllInvestor}
                        >
                          <div class="text-xs"> Check all </div>
                        </Checkbox>
                       
                        <CheckboxGroup
                          options={plainOptions}
                          value={checkedInvestorList}
                          onChange={onInvestorChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div class="flex flex-col w-[100%] p-1">
                <div class="flex justify-between  border  mt-2 w-[100%] h-20">
                      <div className="  flex w-2/5 flex-col">
                      <div className="text-sm font-semibold ml-2 mt-1">Deals</div>
                      <div className=" flex justify-evenly ml-2"></div>
                      </div>
                      <div  className=" flex w-3/5 flex-col ml-4 mt-2">
                
                        <Checkbox
                          indeterminate={indeterminateDeal}
                          onChange={onCheckAllDealChange}
                          checked={checkAllDeal}
                        >
                          <div class="text-xs"> Check all </div>
                        </Checkbox>
                       
                        <CheckboxGroup
                          options={plainOptions}
                          value={checkedDealList}
                          onChange={onDealChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div class="flex flex-col w-[100%] p-1">
                <div class="flex justify-between  border  mt-2 w-[100%] h-20">
                      <div className="  flex w-2/5 flex-col">
                      <div className="text-sm font-semibold ml-2 mt-1">Data Room</div>
                      <div className=" flex justify-evenly ml-2"></div>
                      </div>
                      <div  className=" flex w-3/5 flex-col ml-4 mt-2">
                        <Checkbox
                          indeterminate={indeterminateDataRoom}
                          onChange={onCheckAllDataRoomChange}
                          checked={checkAllDataRoom}
                        >
                          <div class="text-xs"> Check all </div>
                        </Checkbox>
                       
                        <CheckboxGroup
                          options={dataRoomOption}
                          value={checkedDataRoomList}
                          onChange={onDataRoomChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div class="flex flex-col w-[100%] p-1">
                <div class="flex justify-between  border  mt-2 w-[100%] h-20">
                      <div className="  flex w-2/5 flex-col">
                      <div className="text-sm font-semibold ml-2 mt-1">  Investor Contact</div>
                      <div className=" flex justify-evenly ml-2"></div>
                      </div>
                      <div  className=" flex w-3/5 flex-col ml-4 mt-2">
                        <Checkbox
                          indeterminate={indeterminateInvestorContact}
                          onChange={onCheckAllInvestorContactChange}
                          checked={checkAllInvestorContact}
                        >
                          <div class="text-xs"> Check all</div>
                        </Checkbox>
                       
                        <CheckboxGroup
                          options={plainOptions}
                          value={checkedInvestorContactList}
                          onChange={onInvestorContactChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div class="flex flex-col w-[100%] p-1">
                <div class="flex justify-between  border  mt-2 w-[100%] h-20">
                      <div className="  flex w-2/5 flex-col">
                      <div className="text-sm font-semibold ml-2 mt-1">Pitch</div>
                      <div className=" flex justify-evenly ml-2"></div>
                      </div>
                      <div  className=" flex w-3/5 flex-col ml-4 mt-2">
                        <Checkbox
                          indeterminate={indeterminatePitch}
                          onChange={onCheckAllPitchChange}
                          checked={checkAllPitch}
                        >
                          <div class="text-xs"> Check all </div>
                        </Checkbox>
                       
                        <CheckboxGroup
                          options={plainOptions}
                          value={checkedPitchList}
                          onChange={onPitchChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div class="flex flex-col w-[100%] p-1">
                <div class="flex justify-between  border  mt-2 w-[100%] h-20">
                      <div className="  flex w-2/5 flex-col">
                      <div className="text-sm font-semibold ml-2 mt-1">Club</div>
                      <div className=" flex justify-evenly ml-2"></div>
                      </div>
                      <div  className=" flex w-3/5 flex-col ml-4 mt-2">
                        <Checkbox
                          indeterminate={indeterminateClub}
                          onChange={onCheckAllClubChange}
                          checked={checkAllClub}
                        >
                          <div class="text-xs"> Check all </div>
                        </Checkbox>
                       
                        <CheckboxGroup
                          options={clubOption}
                          value={checkedClubList}
                          onChange={onClubChange}
                        />
                      </div>
                    </div>
                  </div>
              
              </div>
            </div>
          ) : null}

          {props.departmentData.elearningInd === true ? (
            <div class="flex flex-col ">
              <div class=" text-clr  ml-2 mt-8 text-base flex justify-center font-bold">
                E-Learning
              </div>
              <div class="flex  ">
                {/* Left Box */}
                <div class="flex border border-gray-300  w-1/2 p-1">
                  <div class="flex flex-col">
                    <div class="flex justify-between mt-2">
                      <div>
                        <div class="text-sm font-semibold">Assessment</div>
                        <Checkbox
                          indeterminate={indeterminateAccessment}
                          onChange={onCheckAllAccessmentChange}
                          checked={checkAllAccessment}
                        >
                          <div class="text-xs"> Check all </div>
                        </Checkbox>
                        <Divider />
                        <CheckboxGroup
                          options={plainOptions}
                          value={checkedAccessmentList}
                          onChange={onAccessmentChange}
                        />
                      </div>
                    </div>

                    <div class="flex justify-between mt-2">
                      <div>
                        <div class="text-sm font-semibold">Course</div>
                        <Checkbox
                          indeterminate={indeterminateCourse}
                          onChange={onCheckAllCourseChange}
                          checked={checkAllCourse}
                        >
                          <div class="text-xs"> Check all</div>
                        </Checkbox>
                        <Divider />
                        <CheckboxGroup
                          options={plainOptions}
                          value={checkedCourseList}
                          onChange={onCourseChange}
                        />
                      </div>
                    </div>
                    <div class=" flex justify-between mt-2">
                      <div>
                        <div class="text-sm font-semibold">Program</div>
                        <Checkbox
                          indeterminate={indeterminateProgram}
                          onChange={onCheckAllProgramChange}
                          checked={checkAllProgram}
                        >
                          <div class="text-xs"> Check all </div>
                        </Checkbox>
                        <Divider />
                        <CheckboxGroup
                          options={plainOptions}
                          value={checkedProgramList}
                          onChange={onProgramChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Box */}
                <div class="flex border border-gray-300  w-1/2 p-1">
                  <div class="flex flex-col">
                    <div class="flex justify-between mt-2">
                      <div>
                        <div class="text-sm font-semibold">Test</div>
                        <Checkbox
                          indeterminate={indeterminateTest}
                          onChange={onCheckAllTestChange}
                          checked={checkAllTest}
                        >
                          <div class="text-xs"> Check all </div>
                        </Checkbox>
                        <Divider />
                        <CheckboxGroup
                          options={plainOptions}
                          value={checkedTestList}
                          onChange={onTestChange}
                        />
                      </div>
                    </div>

                    <div class="flex justify-between mt-2">
                      <div>
                        <div class="text-sm font-semibold">Topic</div>
                        <Checkbox
                          indeterminate={indeterminateTopic}
                          onChange={onCheckAllTopicChange}
                          checked={checkAllTopic}
                        >
                          <div class="text-xs"> Check all </div>
                        </Checkbox>
                        <Divider />
                        <CheckboxGroup
                          options={plainOptions}
                          value={checkedTopicList}
                          onChange={onTopicChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}

</div>

        
        
      </div> 
      <hr/>
      <div class="mt-2">
            Updated on{" "}
            {dayjs(props.departmentAcces.lastUpdatedOn).format("DD/MM/YYYY")} by{" "}
            {props.departmentAcces.name}
          </div>
          </div>
    </>
  );
};

const mapStateToProps = ({ settings }) => ({
  addingDepartmentAccess: settings.addingDepartmentAccess,
  departmentList: settings.departmentList,
  departmentAcces: settings.departmentAcces,
  departmentRoleData: settings.departmentRoleData,
  fetchingDepartmentAccess: settings.fetchingDepartmentAccess,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addDepartmentAccess,
      getDepartmentAccess,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(AccessForm);

