import { Button, Checkbox, Divider } from "antd";
import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
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
const accountOptions = [
  "Access",
  "Create",
  "Update",
  "Delete",
  "Full List",
  "Info",
];
const materialOptions = ["Access", "Create", "Update", "Delete"];
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
const userOptions = ["Access", "Create", "Update", "Delete", "Access Plus"];
const defaultCheckedList = ["Full List"];
const melCheckedList = ["Access", "Full List"];
const dashboardCheckedList = ["Access", "Full List", "Regional", "Location"];
const refurbishCheckedList = ["Workshop", "Adminview", "Adminassign"];
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
const callCheckedList = ["Access"];
const eventCheckedList = ["Access"];
const plannerCheckedList = ["Access"];

const AccessForm = (props) => {
  const [checkedCustomerList, setCheckedCustomerList] = useState(
    props.departmentAcces.customer
  );
  const [indeterminateCustomer, setIndeterminateCustomer] = useState(true);
  const [checkAllCustomer, setCheckAllCustomer] = useState(false);

  const [checkedOpportunityList, setCheckedOpportunityList] = useState(
    props.departmentAcces.opportunity
  );
  const [indeterminateOpportunity, setIndeterminateOpportunity] =
    useState(true);
  const [checkAllOpportunity, setCheckAllOpportunity] = useState(false);


  const [checkedTalentList, setCheckedTalentList] = useState(
    props.departmentAcces.talent
  );
  const [indeterminateTalent, setIndeterminateTalent] = useState(true);
  const [checkAllTalent, setCheckAllTalent] = useState(false);


  const [checkedContactList, setCheckedContactList] = useState(
    props.departmentAcces.contact
  );
  const [indeterminateContact, setIndeterminateContact] = useState(true);
  const [checkAllContact, setCheckAllContact] = useState(false);


  const [checkedRequirementList, setCheckedRequirementList] = useState(
    props.departmentAcces.requirement
  );
  const [indeterminateRequirement, setIndeterminateRequirement] =
    useState(true);
  const [checkAllRequirement, setCheckAllRequirement] = useState(false);

  const [checkedPublishList, setCheckedPublishList] = useState(
    props.departmentAcces.publish
  );
  const [indeterminatePublish, setIndeterminatePublish] = useState(true);
  const [checkAllPublish, setCheckAllPublish] = useState(false);

  const [checkedPulseList, setCheckedPulseList] = useState(
    props.departmentAcces.pulse
  );
  const [indeterminatePulse, setIndeterminatePulse] = useState(true);
  const [checkAllPulse, setCheckAllPulse] = useState(false);

  const [checkedLeadsList, setCheckedLeadsList] = useState(
    props.departmentAcces.leads
  );
  const [indeterminateLeads, setIndeterminateLeads] = useState(true);
  const [checkAllLeads, setCheckAllLeads] = useState(false);


  const [checkedCustomerCommercialsList, setCheckedCustomerCommercialsList] =
  useState(props.departmentAcces.comercial);
const [
  indeterminateCustomerCommercials,
  setIndeterminateCustomerCommercials,
] = useState(true);
const [checkAllCustomerCommercials, setCheckAllCustomerCommercials] =
  useState(false);


  const [checkedProgramList, setCheckedProgramList] = useState(
    props.departmentAcces.program
  );
  const [indeterminateProgram, setIndeterminateProgram] = useState(true);
  const [checkAllProgram, setCheckAllProgram] = useState(false);


  const [checkedCourseList, setCheckedCourseList] = useState(
    props.departmentAcces.course
  );
  const [indeterminateCourse, setIndeterminateCourse] = useState(true);
  const [checkAllCourse, setCheckAllCourse] = useState(false);

  const [checkedHoursList, setCheckedHoursList] = useState(
    props.departmentAcces.hours
  );
  const [indeterminateHours, setIndeterminateHours] = useState(true);
  const [checkAllHours, setCheckAllHours] = useState(false);
  const [checkedLocationList, setCheckedLocationList] = useState(
    props.departmentAcces.location
  );
  const [indeterminateLocation, setIndeterminateLocation] = useState(true);
  const [checkAllLocation, setCheckAllLocation] = useState(false);

  const [checkedMileageList, setCheckedMileageList] = useState(
    props.departmentAcces.mileage
  );
  const [indeterminateMileage, setIndeterminateMileage] = useState(true);
  const [checkAllMileage, setCheckAllMileage] = useState(false);

  const [checkedExpenseList, setCheckedExpenseList] = useState(
    props.departmentAcces.expense
  );
  const [indeterminateExpense, setIndeterminateExpense] = useState(true);
  const [checkAllExpense, setCheckAllExpense] = useState(false);

  const [checkedLeavesList, setCheckedLeavesList] = useState(
    props.departmentAcces.leave
  );
  const [indeterminateLeaves, setIndeterminateLeaves] = useState(true);
  const [checkAllLeaves, setCheckAllLeaves] = useState(false);

  const [checkedUserList, setCheckedUserList] = useState(
    props.departmentAcces.user
  );
  const [indeterminateUser, setIndeterminateUser] = useState(true);
  const [checkAllUser, setCheckAllUser] = useState(false);

  const [checkedOrderList, setCheckedOrderList] = useState(
    props.departmentAcces.order
  );
  const [indeterminateOrder, setIndeterminateOrder] = useState(true);
  const [checkAllOrder, setCheckAllOrder] = useState(false);


  const [checkedMaterialsList, setCheckedMaterialsList] = useState(
    ""
   );
   const [indeterminateMaterials, setIndeterminateMaterials] = useState(true);
   const [checkAllMaterials, setCheckAllMaterials] = useState(false);


   const [checkedSupplierList, setCheckedSupplierList] = useState(
    props.departmentAcces.supplier
  );
  const [indeterminateSupplier, setIndeterminateSupplier] = useState(true);
  const [checkAllSupplier, setCheckAllSupplier] = useState(false);

  const [checkedQualityList, setCheckedQualityList] = useState(
    props.departmentAcces.quality
  );
  const [indeterminateQuality, setIndeterminateQuality] = useState(true);
  const [checkAllQuality, setCheckAllQuality] = useState(false);

  const [checkedClubList, setCheckedClubList] = useState(
    props.departmentAcces.club
  );
  const [indeterminateClub, setIndeterminateClub] = useState(true);
  const [checkAllClub, setCheckAllClub] = useState(false);


  const [checkedInventoryList, setCheckedInventoryList] = useState(
    props.departmentAcces.inventory
  );
  const [indeterminateInventory, setIndeterminateInventory] = useState(true);
  const [checkAllInventory, setCheckAllInventory] = useState(false);


  const [checkedRefurbishList, setCheckedRefurbishList] = useState(
    props.departmentAcces.refurbish
  );
  const [indeterminateRefurbish, setIndeterminateRefurbish] = useState(true);
  const [checkAllRefurbish, setCheckAllRefurbish] = useState(false);


  const [checkedAccountList, setCheckedAccountList] = useState(
    props.departmentAcces.account
  );
  const [indeterminateAccount, setIndeterminateAccount] = useState(true);
  const [checkAllAccount, setCheckAllAccount] = useState(false);



  const [checkedDashboardList, setCheckedDashboardList] = useState(
    props.departmentAcces.dashboard
  );
  const [indeterminateDashboard, setIndeterminateDashboard] = useState(true);
  const [checkAllDashboard, setCheckAllDashboard] = useState(false);


  const [checkedReportList, setCheckedReportList] = useState(
    props.departmentAcces.report
  );
  const [indeterminateReport, setIndeterminateReport] = useState(true);
  const [checkAllReport, setCheckAllReport] = useState(false);


  const [checkedSettingsList, setCheckedSettingsList] = useState(
    props.departmentAcces.settings
  );
  const [indeterminateSettings, setIndeterminateSettings] = useState(true);
  const [checkAllSettings, setCheckAllSettings] = useState(false);


  const [checkedScannerList, setCheckedScannerList] = useState(
    props.departmentAcces.scanner
  );
  const [indeterminateScanner, setIndeterminateScanner] = useState(true);
  const [checkAllScanner, setCheckAllScanner] = useState(false);


  const [checkedBasicList, setCheckedBasicList] = useState(
    props.departmentAcces.basic
  );
  const [indeterminateBasic, setIndeterminateBasic] = useState(true);
  const [checkAllBasic, setCheckAllBasic] = useState(false);


  const [checkedCalenderList, setCheckedCalenderList] = useState(
    props.departmentAcces.calender
  );
  const [indeterminateCalender, setIndeterminateCalender] = useState(true);
  const [checkAllCalender, setCheckAllCalender] = useState(false);

  const [checkedHolidayList, setCheckedHolidayList] = useState(
    props.departmentAcces.holiday
  );
  const [indeterminateHoliday, setIndeterminateHoliday] = useState(true);
  const [checkAllHoliday, setCheckAllHoliday] = useState(false);


  const [checkedTasksList, setCheckedTasksList] = useState(
    props.departmentAcces.task
  );
  const [indeterminateTasks, setIndeterminateTasks] = useState(true);
  const [checkAllTasks, setCheckAllTasks] = useState(false);

  const [checkedJunkList, setCheckedJunkList] = useState(
    props.departmentAcces.junk
  );
  const [indeterminateJunk, setIndeterminateJunk] = useState(true);
  const [checkAllJunk, setCheckAllJunk] = useState(false);



  const [checkedInvestorList, setCheckedInvestorList] = useState(
    props.departmentAcces.investor
  );
  const [indeterminateInvestor, setIndeterminateInvestor] = useState(true);
  const [checkAllInvestor, setCheckAllInvestor] = useState(false);


  const [checkedInvestorContactList, setCheckedInvestorContactList] = useState(
    props.departmentAcces.investorContact
  );
  const [indeterminateInvestorContact, setIndeterminateInvestorContact] =
    useState(true);
  const [checkAllInvestorContact, setCheckAllInvestorContact] = useState(false);


  const [checkedDealList, setCheckedDealList] = useState(
    props.departmentAcces.deal
  );
  const [indeterminateDeal, setIndeterminateDeal] = useState(true);
  const [checkAllDeal, setCheckAllDeal] = useState(false);


  const [checkedDataRoomList, setCheckedDataRoomList] = useState(
    props.departmentAcces.dataRoom
  );
  const [indeterminateDataRoom, setIndeterminateDataRoom] = useState(true);
  const [checkAllDataRoom, setCheckAllDataRoom] = useState(false);


  const [checkedPromotionsList, setCheckedPromotionsList] = useState(
    props.departmentAcces.promotion
  );
  const [indeterminatePromotions, setIndeterminatePromotions] = useState(true);
  const [checkAllPromotions, setCheckAllPromotions] = useState(false);


  const [checkedPitchList, setCheckedPitchList] = useState(
    props.departmentAcces.pitch
  );
  const [indeterminatePitch, setIndeterminatePitch] = useState(true);
  const [checkAllPitch, setCheckAllPitch] = useState(false);


  const [checkedRepositoryList, setCheckedRepositoryList] = useState(
    props.departmentAcces.repository
  );
  const [indeterminateRepository, setIndeterminateRepository] = useState(true);
  const [checkAllRepository, setCheckAllRepository] = useState(false);

  const [checkedShipperList, setCheckedShipperList] = useState(
    props.departmentAcces.shipper
  );
  const [indeterminateShipper, setIndeterminateShipper] = useState(true);
  const [checkAllShipper, setCheckAllShipper] = useState(false);


  const [checkedProcurementList, setCheckedProcurementList] = useState(
    props.departmentAcces.procurement
  );
  const [indeterminateProcurement, setIndeterminateProcurement] =
    useState(true);
  const [checkAllProcurement, setCheckAllProcurement] = useState(false);



  const [checkedProductionList, setCheckedProductionList] = useState(
    props.departmentAcces.production
  );
  const [indeterminateProduction, setIndeterminateProduction] = useState(true);
  const [checkAllProduction, setCheckAllProduction] = useState(false);


  const [checkedSubscriptionList, setCheckedSubscriptionList] = useState(
    props.departmentAcces.subscription
  );
  const [indeterminateSubscription, setIndeterminateSubscription] =
    useState(true);
  const [checkAllSubscription, setCheckAllSubscription] = useState(false);



  const [checkedPlantList, setCheckedPlantList] = useState(
    props.departmentAcces.plant
  );
  const [indeterminatePlant, setIndeterminatePlant] = useState(true);
  const [checkAllPlant, setCheckAllPlant] = useState(false);


  const [checkedTeamsList, setCheckedTeamsList] = useState(
    props.departmentAcces.teams
  );
  const [indeterminateTeams, setIndeterminateTeams] = useState(true);
  const [checkAllTeams, setCheckAllTeams] = useState(false);


  const [checkedPaymentsList, setCheckedPaymentsList] = useState(
    props.departmentAcces.payment
  );
  const [indeterminatePayments, setIndeterminatePayments] = useState(true);
  const [checkAllPayments, setCheckAllPayments] = useState(false);


  const [checkedMaterialList, setCheckedMaterialList] = useState(
    []
  );
  const [indeterminateMaterial, setIndeterminateMaterial] = useState(true);
  const [checkAllMaterial, setCheckAllMaterial] = useState(false);


  const [checkedCatalougeList, setCheckedCatalougeList] = useState(
    props.departmentAcces.catalouge
  );
  const [indeterminateCatalouge, setIndeterminateCatalouge] = useState(true);
  const [checkAllCatalouge, setCheckAllCatalouge] = useState(false);


  const [checkedCollectionList, setCheckedCollectionList] = useState(
    props.departmentAcces.collection
  );
  const [indeterminateCollection, setIndeterminateCollection] = useState(true);
  const [checkAllCollection, setCheckAllCollection] = useState(false);

  const [checkedPlanner, setCheckedPlanner] = useState(props.departmentAcces.planner);
  const [indeterminatePlanner, setIndeterminatePlanner] = useState(true);
  const [checkAllPlanner, setCheckAllPlanner] = useState(false);

  const [checkedEvents, setCheckedEvents] = useState(
    props.departmentAcces.event
  );
  const [indeterminateEvents, setIndeterminateEvents] = useState(true);
  const [checkAllEvents, setCheckAllEvents] = useState(false);

  const [checkedCalls, setCheckedCalls] = useState(props.departmentAcces.call);
  const [indeterminateCalls, setIndeterminateCalls] = useState(true);
  const [checkAllCalls, setCheckAllCalls] = useState(false);

  const [checkedLanguage, setCheckedLanguage] = useState(
    props.departmentAcces.language
  );
  const [indeterminatLanguage, setIndeterminateLanguage] = useState(true);
  const [checkAllLanguage, setCheckAllLanguage] = useState(false);


  const [checkedTopicList, setCheckedTopicList] = useState(
    props.departmentAcces.topic
  );
  const [indeterminateTopic, setIndeterminateTopic] = useState(true);
  const [checkAllTopic, setCheckAllTopic] = useState(false);

  const [checkedAccessmentList, setCheckedAccessmentList] = useState(
    props.departmentAcces.assessment
  );
  const [indeterminateAccessment, setIndeterminateAccessment] = useState(true);
  const [checkAllAccessment, setCheckAllAccessment] = useState(false);


  const [checkedCatalogList, setCheckedCatalogList] = useState(
    props.departmentAcces.catalog
  );
  const [indeterminateCatalog, setIndeterminateCatalog] = useState(true);
  const [checkAllCatalog, setCheckAllCatalog] = useState(false);





  //Vendor
  const [checkedVendorList, setCheckedVendorList] = useState(
    props.departmentAcces.vendor
  );
  const [indeterminateVendor, setIndeterminateVendor] = useState(true);
  const [checkAllVendor, setCheckAllVendor] = useState(false);



  useEffect(() => {
    console.log(props.roleTypeId);
    props.getDepartmentAccess(props.roleTypeId);
  }, [props.roleTypeId]);
  useEffect(() => {
    setCheckedVendorList(props.departmentAcces.vendor);
    setCheckedCustomerList(props.departmentAcces.customer);
    setCheckedOpportunityList(props.departmentAcces.opportunity);
    setCheckedTalentList(props.departmentAcces.talent);
    setCheckedContactList(props.departmentAcces.contact);
    setCheckedRequirementList(props.departmentAcces.requirement);
    setCheckedPublishList(props.departmentAcces.publish);
    setCheckedPulseList(props.departmentAcces.pulse);
    setCheckedLeadsList(props.departmentAcces.leads);
    // setCheckedTaskList(props.departmentAcces.task)
    setCheckedCustomerCommercialsList(props.departmentAcces.comercial);
    setCheckedProgramList(props.departmentAcces.program);
    setCheckedTestList(props.departmentAcces.test);
    setCheckedCourseList(props.departmentAcces.course);
    setCheckedTestList(props.departmentAcces.hours);
    setCheckedLocationList(props.departmentAcces.location);
    setCheckedMileageList(props.departmentAcces.mileage);
    setCheckedExpenseList(props.departmentAcces.expense);
    setCheckedLeavesList(props.departmentAcces.leave);
    setCheckedUserList(props.departmentAcces.user);
    setCheckedOrderList(props.departmentAcces.order);
    setCheckedMaterialsList(props.departmentAcces.material);
    setCheckedSupplierList(props.departmentAcces.supplier);
    setCheckedQualityList(props.departmentAcces.quality);
    setCheckedClubList(props.departmentAcces.club);
    setCheckedInventoryList(props.departmentAcces.inventory);
    setCheckedRefurbishList(props.departmentAcces.refurbish);
    setCheckedAccountList(props.departmentAcces.account);
    setCheckedDashboardList(props.departmentAcces.dashboard);
    setCheckedSettingsList(props.departmentAcces.settings);
    setCheckedTasksList(props.departmentAcces.task);
    setCheckedJunkList(props.departmentAcces.junk);
    setCheckedInvestorList(props.departmentAcces.investor);
    setCheckedInvestorContactList(props.departmentAcces.investorContact);
    setCheckedDealList(props.departmentAcces.deal);
    setCheckedPitchList(props.departmentAcces.pitch);
    setCheckedRepositoryList(props.departmentAcces.repository);
    setCheckedBasicList(props.departmentAcces.basic);
    setCheckedCalenderList(props.departmentAcces.calender);
    setCheckedShipperList(props.departmentAcces.shipper);
    setCheckedProcurementList(props.departmentAcces.procurement);
    setCheckedProductionList(props.departmentAcces.production);
    setCheckedSubscriptionList(props.departmentAcces.subscription);
    setCheckedPlantList(props.departmentAcces.plant);
    setCheckedTeamsList(props.departmentAcces.teams);
    setCheckedPaymentsList(props.departmentAcces.payment);
    setCheckedCollectionList(props.departmentAcces.collection);
    setCheckedCatalogList(props.departmentAcces.catalog);
    setCheckedHolidayList(props.departmentAcces.holiday);
    setCheckedAccessmentList(props.departmentAcces.assessment);
    setCheckedTopicList(props.departmentAcces.topic);
    setCheckedReportList(props.departmentAcces.report);
    setCheckedDataRoomList(props.departmentAcces.dataRoom);
    setCheckedScannerList(props.departmentAcces.scanner);
    //setCheckedMaterialList(props.departmentAcces.material);
    setCheckedCatalougeList(props.departmentAcces.catalouge);
    setCheckedCatalougeList(props.departmentAcces.promotion);
    setCheckedLanguage(props.departmentAcces.language);
    setCheckedCalls(props.departmentAcces.call);
    setCheckedEvents(props.departmentAcces.event);
    setCheckedPlanner(props.departmentAcces.planner);

  }, [
    props.departmentAcces.vendor,
    props.departmentAcces.customer,
    props.departmentAcces.opportunity,
    props.departmentAcces.contact,
    props.departmentAcces.requirement,
    props.departmentAcces.publish,
    props.departmentAcces.pulse,
    props.departmentAcces.talent,
    props.departmentAcces.assessment,
    props.departmentAcces.leads,
    // props.departmentAcces.task,
    props.departmentAcces.comercial,
    props.departmentAcces.program,
    props.departmentAcces.test,
    props.departmentAcces.course,
    props.departmentAcces.hours,
    props.departmentAcces.location,
    props.departmentAcces.mileage,
    props.departmentAcces.expense,
    props.departmentAcces.leave,
    props.departmentAcces.user,
    props.departmentAcces.order,
    props.departmentAcces.material,
    props.departmentAcces.supplier,
    props.departmentAcces.quality,
    props.departmentAcces.club,
    props.departmentAcces.inventory,
    props.departmentAcces.refurbish,
    props.departmentAcces.account,
    props.departmentAcces.dashboard,
    props.departmentAcces.settings,
    props.departmentAcces.task,
    props.departmentAcces.junk,
    props.departmentAcces.basic,
    props.departmentAcces.calender,
    props.departmentAcces.investor,
    props.departmentAcces.investorContact,
    props.departmentAcces.deal,
    props.departmentAcces.pitch,
    props.departmentAcces.repository,
    props.departmentAcces.shipper,
    props.departmentAcces.procurement,
    props.departmentAcces.subscription,
    props.departmentAcces.plant,
    props.departmentAcces.teams,
    props.departmentAcces.payment,
    props.departmentAcces.collection,
    props.departmentAcces.catalog,
    props.departmentAcces.holiday,
    props.departmentAcces.topic,
    props.departmentAcces.production,
    props.departmentAcces.report,
    props.departmentAcces.dataRoom,
    props.departmentAcces.scanner,
    props.departmentAcces.material,
    props.departmentAcces.catalouge,
    props.departmentAcces.promotion,
    props.departmentAcces.language,
    props.departmentAcces.call,
    props.departmentAcces.event,
    props.departmentAcces.planner,
  ]);

  const onVendorChange = (list) => {
    setCheckedVendorList(list);
    setIndeterminateVendor(!!list.length && list.length < plainOptions.length);
    setCheckAllVendor(list.length === plainOptions.length);
  };

  const onCheckAllVendorChange = (e) => {
    setCheckedVendorList(e.target.checked ? plainOptions : []);
    setIndeterminateVendor(false);
    setCheckAllVendor(e.target.checked);
  };

  //Customer


  const onCustomerChange = (list) => {
    setCheckedCustomerList(list);
    setIndeterminateCustomer(
      !!list.length && list.length < plainOptions.length
    );
    setCheckAllCustomer(list.length === plainOptions.length);
  };

  const onCheckAllCustomerChange = (e) => {
    setCheckedCustomerList(e.target.checked ? plainOptions : []);
    setIndeterminateCustomer(false);
    setCheckAllCustomer(e.target.checked);
  };

  //Opportunity
 

  const onOpportunityChange = (list) => {
    setCheckedOpportunityList(list);
    setIndeterminateOpportunity(
      !!list.length && list.length < plainOptions.length
    );
    setCheckAllOpportunity(list.length === plainOptions.length);
  };

  const onCheckAllOpportunityChange = (e) => {
    setCheckedOpportunityList(e.target.checked ? plainOptions : []);
    setIndeterminateOpportunity(false);
    setCheckAllOpportunity(e.target.checked);
  };

  //Talent
 

  const onTalentChange = (list) => {
    setCheckedTalentList(list);
    setIndeterminateTalent(!!list.length && list.length < plainOptions.length);
    setCheckAllTalent(list.length === plainOptions.length);
  };

  const onCheckAllTalentChange = (e) => {
    setCheckedTalentList(e.target.checked ? plainOptions : []);
    setIndeterminateTalent(false);
    setCheckAllTalent(e.target.checked);
  };

  // Contact

  

  const onContactChange = (list) => {
    setCheckedContactList(list);
    setIndeterminateContact(!!list.length && list.length < plainOptions.length);
    setCheckAllContact(list.length === plainOptions.length);
  };

  const onCheckAllContactChange = (e) => {
    setCheckedContactList(e.target.checked ? plainOptions : []);
    setIndeterminateContact(false);
    setCheckAllContact(e.target.checked);
  };

  // Requirement

  

  const onRequirementChange = (list) => {
    setCheckedRequirementList(list);
    setIndeterminateRequirement(
      !!list.length && list.length < requirementCheckedList.length
    );
    setCheckAllRequirement(list.length === requirementCheckedList.length);
  };

  const onCheckAllRequirementChange = (e) => {
    setCheckedRequirementList(e.target.checked ? requirementCheckedList : []);
    setIndeterminateRequirement(false);
    setCheckAllRequirement(e.target.checked);
  };

  // Publish

  

  const onPublishChange = (list) => {
    setCheckedPublishList(list);
    setIndeterminatePublish(!!list.length && list.length < plainOptions.length);
    setCheckAllPublish(list.length === plainOptions.length);
  };

  const onCheckAllPublishChange = (e) => {
    setCheckedPublishList(e.target.checked ? plainOptions : []);
    setIndeterminatePublish(false);
    setCheckAllPublish(e.target.checked);
  };

  // Pulse

 

  const onPulseChange = (list) => {
    setCheckedPulseList(list);
    setIndeterminatePulse(!!list.length && list.length < plainOptions.length);
    setCheckAllPulse(list.length === plainOptions.length);
  };

  const onCheckAllPulseChange = (e) => {
    setCheckedPulseList(e.target.checked ? plainOptions : []);
    setIndeterminatePulse(false);
    setCheckAllPulse(e.target.checked);
  };

  //Leads
 

  const onLeadsChange = (list) => {
    setCheckedLeadsList(list);
    setIndeterminateLeads(!!list.length && list.length < plainOptions.length);
    setCheckAllLeads(list.length === plainOptions.length);
  };

  const onCheckAllLeadsChange = (e) => {
    setCheckedLeadsList(e.target.checked ? plainOptions : []);
    setIndeterminateLeads(false);
    setCheckAllLeads(e.target.checked);
  };
  // Customer Commercials

 

  const onCustomerCommercialsChange = (list) => {
    setCheckedCustomerCommercialsList(list);
    setIndeterminateCustomerCommercials(
      !!list.length && list.length < plainOptions.length
    );
    setCheckAllCustomerCommercials(list.length === plainOptions.length);
  };
  const onCheckAllCustomerCommercialsChange = (e) => {
    setCheckedCustomerCommercialsList(e.target.checked ? plainOptions : []);
    setIndeterminateCustomerCommercials(false);
    setCheckAllCustomerCommercials(e.target.checked);
  };
  // Program

 

  const onProgramChange = (list) => {
    setCheckedProgramList(list);
    setIndeterminateProgram(!!list.length && list.length < plainOptions.length);
    setCheckAllProgram(list.length === plainOptions.length);
  };

  const onCheckAllProgramChange = (e) => {
    setCheckedProgramList(e.target.checked ? plainOptions : []);
    setIndeterminateProgram(false);
    setCheckAllProgram(e.target.checked);
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
  };

  const onCheckAllTestChange = (e) => {
    setCheckedTestList(e.target.checked ? plainOptions : []);
    setIndeterminateTest(false);
    setCheckAllTest(e.target.checked);
  };
  // Course

  

  const onCourseChange = (list) => {
    setCheckedCourseList(list);
    setIndeterminateCourse(!!list.length && list.length < plainOptions.length);
    setCheckAllCourse(list.length === plainOptions.length);
  };

  const onCheckAllCourseChange = (e) => {
    setCheckedCourseList(e.target.checked ? plainOptions : []);
    setIndeterminateCourse(false);
    setCheckAllCourse(e.target.checked);
  };
  // Hours
  

  const onHoursChange = (list) => {
    setCheckedHoursList(list);
    setIndeterminateHours(!!list.length && list.length < plainOptions.length);
    setCheckAllHours(list.length === plainOptions.length);
  };

  const onCheckAllHoursChange = (e) => {
    setCheckedHoursList(e.target.checked ? plainOptions : []);
    setIndeterminateHours(false);
    setCheckAllHours(e.target.checked);
  };
  // Location

 

  const onLocationChange = (list) => {
    setCheckedLocationList(list);
    setIndeterminateLocation(
      !!list.length && list.length < plainOptions.length
    );
    setCheckAllLocation(list.length === plainOptions.length);
  };

  const onCheckAllLocationChange = (e) => {
    setCheckedLocationList(e.target.checked ? plainOptions : []);
    setIndeterminateLocation(false);
    setCheckAllLocation(e.target.checked);
  };
  // Mileage
  

  const onMileageChange = (list) => {
    setCheckedMileageList(list);
    setIndeterminateMileage(
      !!list.length && list.length < melCheckedList.length
    );
    setCheckAllMileage(list.length === melCheckedList.length);
  };

  const onCheckAllMileageChange = (e) => {
    setCheckedMileageList(e.target.checked ? melCheckedList : []);
    setIndeterminateMileage(false);
    setCheckAllMileage(e.target.checked);
  };
  // Expense
 

  const onExpenseChange = (list) => {
    setCheckedExpenseList(list);
    setIndeterminateExpense(
      !!list.length && list.length < melCheckedList.length
    );
    setCheckAllExpense(list.length === melCheckedList.length);
  };

  const onCheckAllExpenseChange = (e) => {
    setCheckedExpenseList(e.target.checked ? melCheckedList : []);
    setIndeterminateExpense(false);
    setCheckAllExpense(e.target.checked);
  };
  // Leaves
  

  const onLeavesChange = (list) => {
    setCheckedLeavesList(list);
    setIndeterminateLeaves(
      !!list.length && list.length < melCheckedList.length
    );
    setCheckAllLeaves(list.length === melCheckedList.length);
  };

  const onCheckAllLeavesChange = (e) => {
    setCheckedLeavesList(e.target.checked ? melCheckedList : []);
    setIndeterminateLeaves(false);
    setCheckAllLeaves(e.target.checked);
  };
  // User
 

  const onUserChange = (list) => {
    setCheckedUserList(list);
    setIndeterminateUser(!!list.length && list.length < userOptions.length);
    setCheckAllUser(list.length === userOptions.length);
  };

  const onCheckAllUserChange = (e) => {
    setCheckedUserList(e.target.checked ? userOptions : []);
    setIndeterminateUser(false);
    setCheckAllUser(e.target.checked);
  };
  // Order
 

  const onOrderChange = (list) => {
    setCheckedOrderList(list);
    setIndeterminateOrder(!!list.length && list.length < plainOptions.length);
    setCheckAllOrder(list.length === plainOptions.length);
  };

  const onCheckAllOrderChange = (e) => {
    setCheckedOrderList(e.target.checked ? plainOptions : []);
    setIndeterminateOrder(false);
    setCheckAllOrder(e.target.checked);
  };
  // Materials
  // const [checkedMaterialsList, setCheckedMaterialsList] = useState(
  //   props.departmentAcces.material
  // );
 
 
   const onMaterialsChange = (list) => {
     setCheckedMaterialsList(list);
     setIndeterminateMaterials(
       !!list.length && list.length < materialNewOptions.length
     );
     setCheckAllMaterials(list.length === materialNewOptions.length);
   };
 
   const onCheckAllMaterialsChange = (e) => {
     setCheckedMaterialsList(e.target.checked ? materialNewOptions : []);
     setIndeterminateMaterials(false);
     setCheckAllMaterials(e.target.checked);
   };
 
  // Supplier
  

  const onSupplierChange = (list) => {
    setCheckedSupplierList(list);
    setIndeterminateSupplier(
      !!list.length && list.length < supplierNewOptions.length
    );
    setCheckAllSupplier(list.length === supplierNewOptions.length);
  };

  const onCheckAllSupplierChange = (e) => {
    setCheckedSupplierList(e.target.checked ? supplierNewOptions : []);
    setIndeterminateSupplier(false);
    setCheckAllSupplier(e.target.checked);
  };
  // Quality

  

  const onQualityChange = (list) => {
    setCheckedQualityList(list);
    setIndeterminateQuality(!!list.length && list.length < plainOptions.length);
    setCheckAllQuality(list.length === plainOptions.length);
  };

  const onCheckAllQualityChange = (e) => {
    setCheckedQualityList(e.target.checked ? plainOptions : []);
    setIndeterminateQuality(false);
    setCheckAllQuality(e.target.checked);
  };
  // Club
  

  const onClubChange = (list) => {
    setCheckedClubList(list);
    setIndeterminateClub(!!list.length && list.length < plainOptions.length);
    setCheckAllClub(list.length === plainOptions.length);
  };

  const onCheckAllClubChange = (e) => {
    setCheckedClubList(e.target.checked ? plainOptions : []);
    setIndeterminateClub(false);
    setCheckAllClub(e.target.checked);
  };
  // Inventory
  

  const onInventoryChange = (list) => {
    setCheckedInventoryList(list);
    setIndeterminateInventory(
      !!list.length && list.length < inventoryNewOptions.length
    );
    setCheckAllInventory(list.length === inventoryNewOptions.length);
  };

  const onCheckAllInventoryChange = (e) => {
    setCheckedInventoryList(e.target.checked ? inventoryNewOptions : []);
    setIndeterminateInventory(false);
    setCheckAllInventory(e.target.checked);
  };
  // Refurbish
 

  const onRefurbishChange = (list) => {
    setCheckedRefurbishList(list);
    setIndeterminateRefurbish(
      !!list.length && list.length < refurbishCheckedList.length
    );
    setCheckAllRefurbish(list.length === refurbishCheckedList.length);
  };

  const onCheckAllRefurbishChange = (e) => {
    setCheckedRefurbishList(e.target.checked ? refurbishCheckedList : []);
    setIndeterminateRefurbish(false);
    setCheckAllRefurbish(e.target.checked);
  };
  // Account/Customer
 

  const onAccountChange = (list) => {
    setCheckedAccountList(list);
    setIndeterminateAccount(
      !!list.length && list.length < accountOptions.length
    );
    setCheckAllAccount(list.length === accountOptions.length);
  };

  const onCheckAllAccountChange = (e) => {
    setCheckedAccountList(e.target.checked ? accountOptions : []);
    setIndeterminateAccount(false);
    setCheckAllAccount(e.target.checked);
  };
  // Dashboard
 

  const onDashboardChange = (list) => {
    setCheckedDashboardList(list);
    setIndeterminateDashboard(
      !!list.length && list.length < dashboardCheckedList.length
    );
    setCheckAllDashboard(list.length === dashboardCheckedList.length);
  };

  const onCheckAllDashboardChange = (e) => {
    setCheckedDashboardList(e.target.checked ? dashboardCheckedList : []);
    setIndeterminateDashboard(false);
    setCheckAllDashboard(e.target.checked);
  };
  // Reports
 

  const onReportChange = (list) => {
    setCheckedReportList(list);
    setIndeterminateReport(
      !!list.length && list.length < defaultCheckedList.length
    );
    setCheckAllReport(list.length === defaultCheckedList.length);
  };

  const onCheckAllReportChange = (e) => {
    setCheckedReportList(e.target.checked ? defaultCheckedList : []);
    setIndeterminateReport(false);
    setCheckAllReport(e.target.checked);
  };
  // Settings
  

  const onSettingsChange = (list) => {
    setCheckedSettingsList(list);
    setIndeterminateSettings(
      !!list.length && list.length < settingsCheckedList.length
    );
    setCheckAllSettings(list.length === settingsCheckedList.length);
  };

  const onCheckAllSettingsChange = (e) => {
    setCheckedSettingsList(e.target.checked ? settingsCheckedList : []);
    setIndeterminateSettings(false);
    setCheckAllSettings(e.target.checked);
  };
  // Scanner
 

  const onScannerChange = (list) => {
    setCheckedScannerList(list);
    setIndeterminateScanner(
      !!list.length && list.length < settingsCheckedList.length
    );
    setCheckAllScanner(list.length === settingsCheckedList.length);
  };

  const onCheckAllScannerChange = (e) => {
    setCheckedScannerList(e.target.checked ? settingsCheckedList : []);
    setIndeterminateScanner(false);
    setCheckAllScanner(e.target.checked);
  };
  // Basic
  

  const onBasicChange = (list) => {
    setCheckedBasicList(list);
    setIndeterminateBasic(
      !!list.length && list.length < basicCheckedList.length
    );
    setCheckAllBasic(list.length === basicCheckedList.length);
  };

  const onCheckAllBasicChange = (e) => {
    setCheckedBasicList(e.target.checked ? basicCheckedList : []);
    setIndeterminateBasic(false);
    setCheckAllBasic(e.target.checked);
  };
  // Clender
  

  const onCalenderChange = (list) => {
    setCheckedCalenderList(list);
    setIndeterminateCalender(
      !!list.length && list.length < calenderCheckList.length
    );
    setCheckAllCalender(list.length === calenderCheckList.length);
  };

  const onCheckAllCalenderChange = (e) => {
    setCheckedCalenderList(e.target.checked ? calenderCheckList : []);
    setIndeterminateCalender(false);
    setCheckAllCalender(e.target.checked);
  };
  // Holiday
 

  const onHolidayChange = (list) => {
    setCheckedHolidayList(list);
    setIndeterminateHoliday(
      !!list.length && list.length < basicCheckedList.length
    );
    setCheckAllHoliday(list.length === basicCheckedList.length);
  };

  const onCheckAllHolidayChange = (e) => {
    setCheckedHolidayList(e.target.checked ? basicCheckedList : []);
    setIndeterminateHoliday(false);
    setCheckAllHoliday(e.target.checked);
  };
  // Tasks
  
  const onTasksChange = (list) => {
    setCheckedTasksList(list);
    setIndeterminateTasks(
      !!list.length && list.length < defaultCheckedList.length
    );
    setCheckAllTasks(list.length === defaultCheckedList.length);
  };

  const onCheckAllTasksChange = (e) => {
    setCheckedTasksList(e.target.checked ? defaultCheckedList : []);
    setIndeterminateTasks(false);
    setCheckAllTasks(e.target.checked);
  };
  // Junk
  
  const onJunkChange = (list) => {
    setCheckedJunkList(list);
    setIndeterminateJunk(!!list.length && list.length < junkCheckedList.length);
    setCheckAllJunk(list.length === junkCheckedList.length);
  };

  const onCheckAllJunkChange = (e) => {
    setCheckedJunkList(e.target.checked ? junkCheckedList : []);
    setIndeterminateJunk(false);
    setCheckAllJunk(e.target.checked);
  };
  // Investor
  

  const onInvestorChange = (list) => {
    setCheckedInvestorList(list);
    setIndeterminateInvestor(
      !!list.length && list.length < plainOptions.length
    );
    setCheckAllInvestor(list.length === plainOptions.length);
  };

  const onCheckAllInvestorChange = (e) => {
    setCheckedInvestorList(e.target.checked ? plainOptions : []);
    setIndeterminateInvestor(false);
    setCheckAllInvestor(e.target.checked);
  };
  //Investor Contact
 

  const onInvestorContactChange = (list) => {
    setCheckedInvestorContactList(list);
    setIndeterminateInvestorContact(
      !!list.length && list.length < plainOptions.length
    );
    setCheckAllInvestorContact(list.length === plainOptions.length);
  };

  const onCheckAllInvestorContactChange = (e) => {
    setCheckedInvestorContactList(e.target.checked ? plainOptions : []);
    setIndeterminateInvestorContact(false);
    setCheckAllInvestorContact(e.target.checked);
  };
  //Deal
 

  const onDealChange = (list) => {
    setCheckedDealList(list);
    setIndeterminateDeal(!!list.length && list.length < plainOptions.length);
    setCheckAllDeal(list.length === plainOptions.length);
  };

  const onCheckAllDealChange = (e) => {
    setCheckedDealList(e.target.checked ? plainOptions : []);
    setIndeterminateDeal(false);
    setCheckAllDeal(e.target.checked);
  };
  //Data Room
 

  const onDataRoomChange = (list) => {
    setCheckedDataRoomList(list);
    setIndeterminateDataRoom(
      !!list.length && list.length < plainOptions.length
    );
    setCheckAllDataRoom(list.length === plainOptions.length);
  };

  const onCheckAllDataRoomChange = (e) => {
    setCheckedDataRoomList(e.target.checked ? plainOptions : []);
    setIndeterminateDataRoom(false);
    setCheckAllDataRoom(e.target.checked);
  };
  // Promotions

 
  const onPromotionsChange = (list) => {
    setCheckedPromotionsList(list);
    setIndeterminatePromotions(
      !!list.length && list.length < materialOptions.length
    );
    setCheckAllPromotions(list.length === materialOptions.length);
  };

  const onCheckAllPromotionsChange = (e) => {
    setCheckedPromotionsList(e.target.checked ? materialOptions : []);
    setIndeterminatePromotions(false);
    setCheckAllPromotions(e.target.checked);
  };
  //Pitch
 

  const onPitchChange = (list) => {
    setCheckedPitchList(list);
    setIndeterminatePitch(!!list.length && list.length < plainOptions.length);
    setCheckAllPitch(list.length === plainOptions.length);
  };

  const onCheckAllPitchChange = (e) => {
    setCheckedPitchList(e.target.checked ? plainOptions : []);
    setIndeterminatePitch(false);
    setCheckAllPitch(e.target.checked);
  };
  //Repository


  const onRepositoryChange = (list) => {
    setCheckedRepositoryList(list);
    setIndeterminateRepository(
      !!list.length && list.length < repositoryCheckedList.length
    );
    setCheckAllRepository(list.length === repositoryCheckedList.length);
  };

  const onCheckAllRepositoryChange = (e) => {
    setCheckedRepositoryList(e.target.checked ? repositoryCheckedList : []);
    setIndeterminateRepository(false);
    setCheckAllRepository(e.target.checked);
  };
  // Shipper

 

  const onShipperChange = (list) => {
    setCheckedShipperList(list);
    setIndeterminateShipper(!!list.length && list.length < plainOptions.length);
    setCheckAllShipper(list.length === plainOptions.length);
  };

  const onCheckAllShipperChange = (e) => {
    setCheckedShipperList(e.target.checked ? plainOptions : []);
    setIndeterminateShipper(false);
    setCheckAllShipper(e.target.checked);
  };
  // Procurement

 

  const onProcurementChange = (list) => {
    setCheckedProcurementList(list);
    setIndeterminateProcurement(
      !!list.length && list.length < plainOptions.length
    );
    setCheckAllProcurement(list.length === plainOptions.length);
  };

  const onCheckAllProcurementChange = (e) => {
    setCheckedProcurementList(e.target.checked ? plainOptions : []);
    setIndeterminateProcurement(false);
    setCheckAllProcurement(e.target.checked);
  };
  // Production
 

  const onProductionChange = (list) => {
    setCheckedProductionList(list);
    setIndeterminateProduction(
      !!list.length && list.length < materialOptions.length
    );
    setCheckAllProduction(list.length === materialOptions.length);
  };

  const onCheckAllProductionChange = (e) => {
    setCheckedProductionList(e.target.checked ? materialOptions : []);
    setIndeterminateProduction(false);
    setCheckAllProduction(e.target.checked);
  };
  // Subscription
 

  const onSubscriptionChange = (list) => {
    setCheckedSubscriptionList(list);
    setIndeterminateSubscription(
      !!list.length && list.length < materialOptions.length
    );
    setCheckAllSubscription(list.length === materialOptions.length);
  };
  const onCheckAllSubscriptionChange = (e) => {
    setCheckedSubscriptionList(e.target.checked ? materialOptions : []);
    setIndeterminateSubscription(false);
    setCheckAllSubscription(e.target.checked);
  };
  // Plant

 

  const onPlantChange = (list) => {
    setCheckedPlantList(list);
    setIndeterminatePlant(!!list.length && list.length < plainOptions.length);
    setCheckAllPlant(list.length === plainOptions.length);
  };

  const onCheckAllPlantChange = (e) => {
    setCheckedPlantList(e.target.checked ? plainOptions : []);
    setIndeterminatePlant(false);
    setCheckAllPlant(e.target.checked);
  };
  // Teams
 

  const onTeamsChange = (list) => {
    setCheckedTeamsList(list);
    setIndeterminateTeams(!!list.length && list.length < plainOptions.length);
    setCheckAllTeams(list.length === plainOptions.length);
  };

  const onCheckAllTeamsChange = (e) => {
    setCheckedTeamsList(e.target.checked ? plainOptions : []);
    setIndeterminateTeams(false);
    setCheckAllTeams(e.target.checked);
  };
  // Payments
 

  const onPaymentsChange = (list) => {
    setCheckedPaymentsList(list);
    setIndeterminatePayments(
      !!list.length && list.length < accountingCheckedList.length
    );
    setCheckAllPayments(list.length === accountingCheckedList.length);
  };

  const onCheckAllPaymentsChange = (e) => {
    setCheckedPaymentsList(e.target.checked ? accountingCheckedList : []);
    setIndeterminatePayments(false);
    setCheckAllPayments(e.target.checked);
  };
  // Material
 

  const onMaterialChange = (list) => {
    setCheckedMaterialList(list);
    setIndeterminateMaterial(
      !!list.length && list.length < ecomChecklist.length
    );
    setCheckAllMaterial(list.length === ecomChecklist.length);
  };

  const onCheckAllMaterialChange = (e) => {
    setCheckedMaterialList(e.target.checked ? ecomChecklist : []);
    setIndeterminateMaterial(false);
    setCheckAllMaterial(e.target.checked);
  };
  // Catalouge
  

  const onCatalougeChange = (list) => {
    setCheckedCatalougeList(list);
    setIndeterminateCatalouge(
      !!list.length && list.length < ecomChecklist.length
    );
    setCheckAllCatalouge(list.length === ecomChecklist.length);
  };

  const onCheckAllCatalougeChange = (e) => {
    setCheckedCatalougeList(e.target.checked ? ecomChecklist : []);
    setIndeterminateCatalouge(false);
    setCheckAllCatalouge(e.target.checked);
  };
  // Collections
 

  const onCollectionChange = (list) => {
    setCheckedCollectionList(list);
    setIndeterminateCollection(
      !!list.length && list.length < collectionCheckedList.length
    );
    setCheckAllCollection(list.length === collectionCheckedList.length);
  };

  const onCheckAllCollectionChange = (e) => {
    setCheckedCollectionList(e.target.checked ? collectionCheckedList : []);
    setIndeterminateCollection(false);
    setCheckAllCollection(e.target.checked);
  };
  // Catalog
  

  const onCatalogChange = (list) => {
    setCheckedCatalogList(list);
    setIndeterminateCatalog(
      !!list.length && list.length < materialOptions.length
    );
    setCheckAllCatalog(list.length === materialOptions.length);
  };

  const onCheckAllCatalogChange = (e) => {
    setCheckedCatalogList(e.target.checked ? materialOptions : []);
    setIndeterminateCatalog(false);
    setCheckAllCatalog(e.target.checked);
  };
  //Assessment
 

  const onAccessmentChange = (list) => {
    setCheckedAccessmentList(list);
    setIndeterminateAccessment(
      !!list.length && list.length < plainOptions.length
    );
    setCheckAllAccessment(list.length === plainOptions.length);
  };

  const onCheckAllAccessmentChange = (e) => {
    setCheckedAccessmentList(e.target.checked ? plainOptions : []);
    setIndeterminateAccessment(false);
    setCheckAllAccessment(e.target.checked);
  };
  //Topic
  
  const onTopicChange = (list) => {
    setCheckedTopicList(list);
    setIndeterminateTopic(!!list.length && list.length < plainOptions.length);
    setCheckAllTopic(list.length === plainOptions.length);
  };

  const onCheckAllTopicChange = (e) => {
    setCheckedTopicList(e.target.checked ? plainOptions : []);
    setIndeterminateTopic(false);
    setCheckAllTopic(e.target.checked);
  };

  // Language
  

  const onLanguageChange = (list) => {
    setCheckedLanguage(list);
    setIndeterminateLanguage(
      !!list.length && list.length < multiLanguageCheckedList.length
    );
    setCheckAllLanguage(list.length === multiLanguageCheckedList.length);
  };

  const onCheckAllLanguageChange = (e) => {
    setCheckedLanguage(e.target.checked ? multiLanguageCheckedList : []);
    setIndeterminateLanguage(false);
    setCheckAllLanguage(e.target.checked);
  };
  // Calls
 
  const onCallsChange = (list) => {
    setCheckedCalls(list);
    setIndeterminateCalls(
      !!list.length && list.length < callCheckedList.length
    );
    setCheckAllCalls(list.length === callCheckedList.length);
  };

  const onCheckAllCallsChange = (e) => {
    setCheckedCalls(e.target.checked ? callCheckedList : []);
    setIndeterminateCalls(false);
    setCheckAllPayments(e.target.checked);
  };

  // Events
  

  const onEventsChange = (list) => {
    setCheckedEvents(list);
    setIndeterminateEvents(
      !!list.length && list.length < eventCheckedList.length
    );
    setCheckAllEvents(list.length === eventCheckedList.length);
  };

  const onCheckAllEventsChange = (e) => {
    setCheckedEvents(e.target.checked ? eventCheckedList : []);
    setIndeterminateEvents(false);
    setCheckAllEvents(e.target.checked);
  };
  // Planner
 

  const onPlannerChange = (list) => {
    setCheckedPlanner(list);
    setIndeterminatePlanner(
      !!list.length && list.length < plannerCheckedList.length
    );
    setCheckAllPlanner(list.length === plannerCheckedList.length);
  };

  const onCheckAllPlannerChange = (e) => {
    setCheckedPlanner(e.target.checked ? plannerCheckedList : []);
    setIndeterminatePlanner(false);
    setCheckAllPlanner(e.target.checked);
  };

  console.log(checkedMaterialList)
  function handleUpdateAccess() {
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
      // task:checkedTaskList || [],
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
      material: checkedMaterialsList||[] ,
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
      catalouge: checkedCatalougeList || [],
      // material: checkedMaterialsList || [],
      promotion: checkedPromotionsList || [],
      departmentId: props.departmentId,
      roleTypeId: props.roleTypeId,
      language: multiLanguageCheckedList || [],
      call: callCheckedList || [],
      event: eventCheckedList || [],
      planner: plannerCheckedList || [],
    };
    props.addDepartmentAccess(data, props.roleTypeId);
  }
  console.log("departmentData", props.departmentData);
  console.log(props.departmentAcces.vendor);
  console.log(checkedMaterialList)
  console.log(checkedMaterialsList)

  if (props.fetchingDepartmentAccess) {
    return <BundleLoader />;
  }
  return (
    <>
      <div
        class=" flex justify-between h-[75vh]  overflow-y-auto"
        style={{ scrollbarWidth: "thin" }}
      >
        <TabsWrapper
          style={{ height: "146rem", width: "-webkit-fill-available" }}
        >
          {props.departmentData.hrInd === true ? (
            <div class="flex flex-col">
              <div class="text-clr flex justify-center text-base font-bold  mt-6">
                General & Self Service
              </div>

              <div class="flex  ">
                {/* Left Box */}
                <div class=" border border-gray-300  w-1/2 p-1">
                  <div class="flex flex-col">
                    <div class="flex justify-between mt-2">
                      <div>
                        <div class="text-sm font-semibold">Users</div>
                        <Checkbox
                          indeterminate={indeterminateUser}
                          onChange={onCheckAllUserChange}
                          checked={checkAllUser}
                        >
                          <div class="text-xs"> Check all</div>
                        </Checkbox>
                        <Divider />
                        <CheckboxGroup
                          options={userOptions}
                          value={checkedUserList}
                          onChange={onUserChange}
                        />
                      </div>
                    </div>
                    <div class="flex justify-between mt-4">
                      <div>
                        <div class="text-sm font-semibold">Facility</div>
                        <Checkbox
                          indeterminate={indeterminatePlant}
                          onChange={onCheckAllPlantChange}
                          checked={checkAllPlant}
                        >
                          <div class="text-xs"> Check all</div>
                        </Checkbox>
                        <Divider />
                        <CheckboxGroup
                          options={plainOptions}
                          value={checkedPlantList}
                          onChange={onPlantChange}
                        />
                      </div>
                    </div>
                    <div class="flex justify-between mt-4">
                      <div>
                        <div class="text-sm font-semibold">Repository</div>
                        <Checkbox
                          indeterminate={indeterminateRepository}
                          onChange={onCheckAllRepositoryChange}
                          checked={checkAllRepository}
                        >
                          <div class="text-xs"> Check all</div>
                        </Checkbox>
                        <Divider />
                        <CheckboxGroup
                          options={repositoryCheckedList}
                          value={checkedRepositoryList}
                          onChange={onRepositoryChange}
                        />
                      </div>

                      <div>
                        <div class="text-sm font-semibold">Settings</div>
                        <Checkbox
                          indeterminate={indeterminateSettings}
                          onChange={onCheckAllSettingsChange}
                          checked={checkAllSettings}
                        >
                          <div class="text-xs"> Check all</div>
                        </Checkbox>
                        <Divider />
                        <CheckboxGroup
                          options={settingsCheckedList}
                          value={checkedSettingsList}
                          onChange={onSettingsChange}
                        />
                      </div>

                      <div>
                        <div class="text-sm font-semibold">Basic</div>
                        <Checkbox
                          indeterminate={indeterminateBasic}
                          onChange={onCheckAllBasicChange}
                          checked={checkAllBasic}
                        >
                          <div class="text-xs"> Check all</div>
                        </Checkbox>
                        <Divider />
                        <CheckboxGroup
                          options={basicCheckedList}
                          value={checkedBasicList}
                          onChange={onBasicChange}
                        />
                      </div>
                      <div>
                        <div class="text-sm font-semibold">Tasks</div>
                        <Checkbox
                          indeterminate={indeterminateTasks}
                          onChange={onCheckAllTasksChange}
                          checked={checkAllTasks}
                        >
                          <div class="text-xs">Check all</div>
                        </Checkbox>
                        <Divider />
                        <CheckboxGroup
                          options={defaultCheckedList}
                          value={checkedTasksList}
                          onChange={onTasksChange}
                        />
                      </div>
                    </div>

                    <div class="flex justify-between mt-4">
                      <div>
                        <div class="text-sm font-semibold">Dashboard</div>
                        <Checkbox
                          indeterminate={indeterminateDashboard}
                          onChange={onCheckAllDashboardChange}
                          checked={checkAllDashboard}
                        >
                          <div class="text-xs"> Check all</div>
                        </Checkbox>
                        <Divider />
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
                <div class="flex border border-gray-300  w-1/2  p-1">
                  <div class="flex flex-col">
                    <div class="flex justify-between mt-4">
                      <div>
                        <div class="text-sm font-semibold">Locations</div>
                        <Checkbox
                          indeterminate={indeterminateLocation}
                          onChange={onCheckAllLocationChange}
                          checked={checkAllLocation}
                        >
                          <div class="text-xs"> Check all</div>
                        </Checkbox>
                        <Divider />
                        <CheckboxGroup
                          options={plainOptions}
                          value={checkedLocationList}
                          onChange={onLocationChange}
                        />
                      </div>
                    </div>

                    <div class="flex justify-between mt-4">
                      <div>
                        <div class="text-sm font-semibold">Teams</div>
                        <Checkbox
                          indeterminate={indeterminateTeams}
                          onChange={onCheckAllTeamsChange}
                          checked={checkAllTeams}
                        >
                          <div class="text-xs"> Check all</div>
                        </Checkbox>
                        <Divider />
                        <CheckboxGroup
                          options={plainOptions}
                          value={checkedTeamsList}
                          onChange={onTeamsChange}
                        />
                      </div>
                    </div>

                    <div class="flex justify-between mt-4">
                      <div>
                        <div class="text-sm font-semibold">Reports</div>
                        <Checkbox
                          indeterminate={indeterminateReport}
                          onChange={onCheckAllReportChange}
                          checked={checkAllReport}
                        >
                          <div class="text-xs"> Check all</div>
                        </Checkbox>
                        <Divider />
                        <CheckboxGroup
                          options={defaultCheckedList}
                          value={checkedReportList}
                          onChange={onReportChange}
                        />
                      </div>

                      <div>
                        <div class="text-sm font-semibold">Language</div>
                        <Checkbox
                          indeterminate={indeterminatLanguage}
                          onChange={onCheckAllLanguageChange}
                          checked={checkAllLanguage}
                        >
                          <div class="text-xs"> Check all</div>
                        </Checkbox>
                        <Divider />
                        <CheckboxGroup
                          options={multiLanguageCheckedList}
                          value={checkedLanguage}
                          onChange={onLanguageChange}
                        />
                      </div>
                      <div>
                        <div class="text-sm font-semibold">Planner</div>
                        <Checkbox
                          indeterminate={indeterminatePlanner}
                          onChange={onCheckAllPlannerChange}
                          checked={checkAllPlanner}
                        >
                          <div class="text-xs"> Check all </div>
                        </Checkbox>
                        <Divider />
                        <CheckboxGroup
                          options={plannerCheckedList}
                          value={checkedPlanner}
                          onChange={onPlannerChange}
                        />
                      </div>
                    </div>
                    <div class="flex justify-between mt-4">
                    <div>
                        <div class="text-sm font-semibold">Calls</div>
                        <Checkbox
                          indeterminate={indeterminateCalls}
                          onChange={onCheckAllCallsChange}
                          checked={checkAllCalls}
                        >
                          <div class="text-xs"> Check all </div>
                        </Checkbox>
                        <Divider />
                        <CheckboxGroup
                          options={callCheckedList}
                          value={checkedCalls}
                          onChange={onCallsChange}
                        />
                      </div>
                      <div>
                        <div class="text-sm font-semibold">Events</div>
                        <Checkbox
                          indeterminate={indeterminateEvents}
                          onChange={onCheckAllEventsChange}
                          checked={checkAllEvents}
                        >
                          <div class="text-xs"> Check all </div>
                        </Checkbox>
                        <Divider />
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
              <div class="text-clr flex justify-center text-base font-bold  mt-6">
                HR
              </div>

              <div class="flex  ">
                {/* Left Box */}
                <div class=" border border-gray-300  w-1/2 p-1">
                  <div class="flex flex-col">
                    <div class="flex justify-between mt-4">
                      <div>
                        <div class="text-sm font-semibold">Mileage</div>
                        <Checkbox
                          indeterminate={indeterminateMileage}
                          onChange={onCheckAllMileageChange}
                          checked={checkAllMileage}
                        >
                          <div class="text-xs"> Check all</div>
                        </Checkbox>
                        <Divider />
                        <CheckboxGroup
                          options={melCheckedList}
                          value={checkedMileageList}
                          onChange={onMileageChange}
                        />
                      </div>

                      <div>
                        <div class="text-sm font-semibold">Expense</div>
                        <Checkbox
                          indeterminate={indeterminateExpense}
                          onChange={onCheckAllExpenseChange}
                          checked={checkAllExpense}
                        >
                          <div class="text-xs"> Check all</div>
                        </Checkbox>
                        <Divider />
                        <CheckboxGroup
                          options={melCheckedList}
                          value={checkedExpenseList}
                          onChange={onExpenseChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Box */}
                <div class="flex border border-gray-300  w-1/2  p-1">
                  <div class="flex flex-col">
                    <div class="flex justify-between mt-4">
                      <div>
                        <div class="text-sm font-semibold">Holiday</div>
                        <Checkbox
                          indeterminate={indeterminateHoliday}
                          onChange={onCheckAllHolidayChange}
                          checked={checkAllHoliday}
                        >
                          <div class="text-xs"> Check all</div>
                        </Checkbox>
                        <Divider />
                        <CheckboxGroup
                          options={basicCheckedList}
                          value={checkedHolidayList}
                          onChange={onHolidayChange}
                        />
                      </div>

                      <div>
                        <div class="text-sm font-semibold">Leaves</div>
                        <Checkbox
                          indeterminate={indeterminateLeaves}
                          onChange={onCheckAllLeavesChange}
                          checked={checkAllLeaves}
                        >
                          <div class="text-xs">Check all</div>
                        </Checkbox>
                        <Divider />
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
            </div>
          ) : null}

          {props.departmentData.crmInd === true ? (
            <div class="flex flex-col ">
              <div class=" text-clr mt-6 flex justify-center text-base  font-bold">
                CRM
              </div>
              <div class="flex ">
                {/* Left Box */}
                <div class="flex border border-gray-300  w-1/2 p-1">
                  <div class="flex flex-col">
                    <div class="flex justify-between mt-4">
                      <div>
                        <div class="text-sm font-semibold">Prospect</div>
                        <Checkbox
                          indeterminate={indeterminateCustomer}
                          onChange={onCheckAllCustomerChange}
                          checked={checkAllCustomer}
                        >
                          <div class="text-xs"> Check all </div>
                        </Checkbox>
                        <Divider />
                        <CheckboxGroup
                          options={plainOptions}
                          value={checkedCustomerList}
                          onChange={onCustomerChange}
                        />
                      </div>
                    </div>
                    <div class="flex justify-between mt-4">
                      <div>
                        <div class="text-sm font-semibold">Quotation</div>
                        <Checkbox
                          indeterminate={indeterminateOpportunity}
                          onChange={onCheckAllOpportunityChange}
                          checked={checkAllOpportunity}
                        >
                          <div class="text-xs"> Check all </div>
                        </Checkbox>
                        <Divider />
                        <CheckboxGroup
                          options={plainOptions}
                          value={checkedOpportunityList}
                          onChange={onOpportunityChange}
                        />
                      </div>
                    </div>
                    <div class="flex justify-between mt-4">
                      <div>
                        <div class="text-sm font-semibold">Leads</div>
                        <Checkbox
                          indeterminate={indeterminateLeads}
                          onChange={onCheckAllLeadsChange}
                          checked={checkAllLeads}
                        >
                          <div class="text-xs"> Check all </div>
                        </Checkbox>
                        <Divider />
                        <CheckboxGroup
                          options={plainOptions}
                          value={checkedLeadsList}
                          onChange={onLeadsChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/* Right Box */}
                <div class="flex border border-gray-300  w-1/2 p-1">
                  <div class="flex flex-col">
                    <div class="flex justify-between mt-4">
                      <div>
                        <div class="text-sm font-semibold">Contact</div>
                        <Checkbox
                          indeterminate={indeterminateContact}
                          onChange={onCheckAllContactChange}
                          checked={checkAllContact}
                        >
                          <div class="text-xs"> Check all</div>
                        </Checkbox>
                        <Divider />
                        <CheckboxGroup
                          options={plainOptions}
                          value={checkedContactList}
                          onChange={onContactChange}
                        />
                      </div>
                    </div>
                    <div class="flex justify-between mt-4">
                      <div>
                        <div class="text-sm font-semibold">Junk Leads</div>
                        <Checkbox
                          indeterminate={indeterminateJunk}
                          onChange={onCheckAllJunkChange}
                          checked={checkAllJunk}
                        >
                          <div class="text-xs"> Check all</div>
                        </Checkbox>
                        <Divider />
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
            </div>
          ) : null}
          {props.departmentData.erpInd === true ? (
            <div class="flex flex-col ">
              <div class=" text-clr text-base flex justify-center mt-6 font-bold">
                ERP
              </div>

              <div class="flex ">
                {/* Left Box */}
                <div class="flex border border-gray-300  w-1/2 p-1">
                  <div class="flex flex-col">
                    <div class="flex justify-between mt-4">
                      <div>
                        <div class="text-sm font-semibold">Shipper</div>
                        <Checkbox
                          indeterminate={indeterminateShipper}
                          onChange={onCheckAllShipperChange}
                          checked={checkAllShipper}
                        >
                          <div class="text-xs"> Check all</div>
                        </Checkbox>
                        <Divider />
                        <CheckboxGroup
                          options={plainOptions}
                          value={checkedShipperList}
                          onChange={onShipperChange}
                        />
                      </div>
                    </div>
                    <div class="flex justify-between mt-4">
                      <div>
                        <div class="text-sm font-semibold">Order</div>
                        <Checkbox
                          indeterminate={indeterminateOrder}
                          onChange={onCheckAllOrderChange}
                          checked={checkAllOrder}
                        >
                          <div class="text-xs"> Check all</div>
                        </Checkbox>
                        <Divider />
                        <CheckboxGroup
                          options={plainOptions}
                          value={checkedOrderList}
                          onChange={onOrderChange}
                        />
                      </div>
                    </div>
                    <div class="flex justify-between mt-4">
                      <div>
                        <div class="text-sm font-semibold">Materials</div>
                        <Checkbox
          indeterminate={indeterminateMaterials}
          onChange={onCheckAllMaterialsChange}
          checked={checkAllMaterials}
        >
          <div className="text-xs"> Check all </div>
        </Checkbox>
        <Divider />
        <Checkbox.Group
          options={materialNewOptions}
          value={checkedMaterialsList}
          onChange={onMaterialsChange}
        />
                      </div>
                    </div>
                    <div class="flex justify-between mt-4">
                      <div>
                        <div class="text-sm font-semibold">Inventory</div>
                        <Checkbox
                          indeterminate={indeterminateInventory}
                          onChange={onCheckAllInventoryChange}
                          checked={checkAllInventory}
                        >
                          <div class="text-xs"> Check all </div>
                        </Checkbox>
                        <Divider />
                        <CheckboxGroup
                          options={inventoryNewOptions}
                          value={checkedInventoryList}
                          onChange={onInventoryChange}
                        />
                      </div>
                    </div>

                    <div class="flex justify-between mt-4">
                      <div>
                        <div class="text-sm font-semibold">Procurement</div>
                        <Checkbox
                          indeterminate={indeterminateProcurement}
                          onChange={onCheckAllProcurementChange}
                          checked={checkAllProcurement}
                        >
                          <div class="text-xs"> Check all</div>
                        </Checkbox>
                        <Divider />
                        <CheckboxGroup
                          options={plainOptions}
                          value={checkedProcurementList}
                          onChange={onProcurementChange}
                        />
                      </div>
                    </div>
                    <div class="flex justify-between mt-4">
                      <div>
                        <div class="text-sm font-semibold">Production</div>
                        <Checkbox
                          indeterminate={indeterminateProduction}
                          onChange={onCheckAllProductionChange}
                          checked={checkAllProduction}
                        >
                          <div class="text-xs"> Check all</div>
                        </Checkbox>
                        <Divider />
                        <CheckboxGroup
                          options={materialOptions}
                          value={checkedProductionList}
                          onChange={onProductionChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Box */}
                <div class="flex border border-gray-300  w-1/2 p-1">
                  <div class="flex flex-col">
                    <div class="flex justify-between mt-4">
                      <div>
                        <div class="text-sm font-semibold">Customer</div>
                        <Checkbox
                          indeterminate={indeterminateAccount}
                          onChange={onCheckAllAccountChange}
                          checked={checkAllAccount}
                        >
                          <div class="text-xs"> Check all</div>
                        </Checkbox>
                        <Divider />
                        <CheckboxGroup
                          options={accountOptions}
                          value={checkedAccountList}
                          onChange={onAccountChange}
                        />
                      </div>
                    </div>
                    <div class="flex justify-between mt-4">
                      <div>
                        <div class="text-sm font-semibold">Catalog</div>
                        <Checkbox
                          indeterminate={indeterminateCatalog}
                          onChange={onCheckAllCatalogChange}
                          checked={checkAllCatalog}
                        >
                          <div class="text-xs"> Check all </div>
                        </Checkbox>
                        <Divider />
                        <CheckboxGroup
                          options={materialOptions}
                          value={checkedCatalogList}
                          onChange={onCatalogChange}
                        />
                      </div>
                    </div>

                    <div class="flex justify-between mt-4">
                      <div>
                        <div class="text-sm font-semibold">Supplier</div>
                        <Checkbox
                          indeterminate={indeterminateSupplier}
                          onChange={onCheckAllSupplierChange}
                          checked={checkAllSupplier}
                        >
                          <div class="text-xs"> Check all </div>
                        </Checkbox>
                        <Divider />
                        <CheckboxGroup
                          options={supplierNewOptions}
                          value={checkedSupplierList}
                          onChange={onSupplierChange}
                        />
                      </div>
                    </div>

                    <div class="flex justify-between mt-4">
                      <div>
                        <div class="text-sm font-semibold">Refurbish</div>
                        <Checkbox
                          indeterminate={indeterminateRefurbish}
                          onChange={onCheckAllRefurbishChange}
                          checked={checkAllRefurbish}
                        >
                          <div class="text-xs"> Check all </div>
                        </Checkbox>
                        <Divider />
                        <CheckboxGroup
                          options={refurbishCheckedList}
                          value={checkedRefurbishList}
                          onChange={onRefurbishChange}
                        />
                      </div>
                      <div>
                        <div class="text-sm font-semibold">Scanner</div>
                        <Checkbox
                          indeterminate={indeterminateScanner}
                          onChange={onCheckAllScannerChange}
                          checked={checkAllScanner}
                        >
                          <div class="text-xs"> Check all</div>
                        </Checkbox>
                        <Divider />
                        <CheckboxGroup
                          options={settingsCheckedList}
                          value={checkedScannerList}
                          onChange={onScannerChange}
                        />
                      </div>
                    </div>
                    <div class="flex justify-between mt-4">
                      <div>
                        <div class="text-sm font-semibold">Subscription</div>
                        <Checkbox
                          indeterminate={indeterminateSubscription}
                          onChange={onCheckAllSubscriptionChange}
                          checked={checkAllSubscription}
                        >
                          <div class="text-xs"> Check all</div>
                        </Checkbox>
                        <Divider />
                        <CheckboxGroup
                          options={materialOptions}
                          value={checkedSubscriptionList}
                          onChange={onSubscriptionChange}
                        />
                      </div>
                    </div>
                    <div>
                      <div class="text-sm font-semibold">Quality</div>
                      <Checkbox
                        indeterminate={indeterminateQuality}
                        onChange={onCheckAllQualityChange}
                        checked={checkAllQuality}
                      >
                        <div class="text-xs"> Check all</div>
                      </Checkbox>
                      <Divider />
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
              <div class=" text-clr text-base flex justify-center mt-6 font-bold">
                Accounting
              </div>

              <div class="flex  ">
                {/* Left Box */}
                <div class="flex border border-gray-300  w-1/2 p-1">
                  <div class="flex flex-col">
                    <div class="flex justify-between mt-4">
                      <div>
                        <div class="text-sm font-semibold">Collections</div>
                        <Checkbox
                          indeterminate={indeterminateCollection}
                          onChange={onCheckAllCollectionChange}
                          checked={checkAllCollection}
                        >
                          <div class="text-xs"> Check all</div>
                        </Checkbox>
                        <Divider />
                        <CheckboxGroup
                          options={collectionCheckedList}
                          value={checkedCollectionList}
                          onChange={onCollectionChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Box */}
                <div class="flex border border-gray-300  w-1/2 p-1">
                  <div class="flex flex-col">
                    <div class="flex justify-between mt-4">
                      <div>
                        <div class="text-sm font-semibold">Payments</div>
                        <Checkbox
                          indeterminate={indeterminatePayments}
                          onChange={onCheckAllPaymentsChange}
                          checked={checkAllPayments}
                        >
                          <div class="text-xs"> Check all </div>
                        </Checkbox>
                        <Divider />
                        <CheckboxGroup
                          options={accountingCheckedList}
                          value={checkedPaymentsList}
                          onChange={onPaymentsChange}
                        />
                      </div>
                    </div>
                    <div class="flex justify-between mt-4"></div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}

          <div class="flex flex-col ">
            <div class=" text-clr text-base flex justify-center mt-6 font-bold">
              Ecom
            </div>
            <div class="flex  ">
              <div class="flex border border-gray-300  w-1/2 p-1">
                <div class="flex flex-col">
                  <div class="flex justify-between mt-4">
                    <div>
                      <div class="text-sm font-semibold">Promotions</div>
                      <Checkbox
                        indeterminate={indeterminatePromotions}
                        onChange={onCheckAllPromotionsChange}
                        checked={checkAllPromotions}
                      >
                        <div class="text-xs"> Check all</div>
                      </Checkbox>
                      <Divider />
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
          </div>

          {props.departmentData.recruitProInd === true ? (
            <div class="flex flex-col ">
              <div class=" text-clr text-base flex justify-center mt-6 font-bold">
                RecruitPro
              </div>

              <div class="flex mt-4 ">
                {/* Left Box */}
                <div class="flex border border-gray-300  w-1/2 p-1">
                  <div class="flex flex-col">
                    <div class="flex justify-between mt-4">
                      <div>
                        <div class="text-sm font-semibold">Talent</div>
                        <Checkbox
                          indeterminate={indeterminateTalent}
                          onChange={onCheckAllTalentChange}
                          checked={checkAllTalent}
                        >
                          <div class="text-xs"> Check all </div>
                        </Checkbox>
                        <Divider />
                        <CheckboxGroup
                          options={plainOptions}
                          value={checkedTalentList}
                          onChange={onTalentChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Box */}
                <div class="flex border border-gray-300  w-1/2 p-1">
                  <div class="flex flex-col">
                    <div class="flex justify-between mt-4">
                      <div>
                        <div class="text-sm font-semibold">Requirement</div>
                        <Checkbox
                          indeterminate={indeterminateRequirement}
                          onChange={onCheckAllRequirementChange}
                          checked={checkAllRequirement}
                        >
                          <div class="text-xs"> Check all </div>
                        </Checkbox>
                        <Divider />
                        <CheckboxGroup
                          options={requirementCheckedList}
                          value={checkedRequirementList}
                          onChange={onRequirementChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
          {props.departmentData.imInd === true ? (
            <div class="flex flex-col ">
              <div class=" text-clr text-base mt-6 flex justify-center font-bold">
                IM
              </div>
              <div class="flex  ">
                {/* Left Box */}
                <div class="flex border border-gray-300  w-1/2 p-1">
                  <div class="flex flex-col">
                    <div class="flex justify-between mt-4">
                      <div>
                        <div class="text-sm font-semibold">Investor</div>
                        <Checkbox
                          indeterminate={indeterminateInvestor}
                          onChange={onCheckAllInvestorChange}
                          checked={checkAllInvestor}
                        >
                          <div class="text-xs"> Check all </div>
                        </Checkbox>
                        <Divider />
                        <CheckboxGroup
                          options={plainOptions}
                          value={checkedInvestorList}
                          onChange={onInvestorChange}
                        />
                      </div>
                    </div>
                    <div class="flex justify-between mt-4">
                      <div>
                        <div class="text-sm font-semibold">Deals</div>
                        <Checkbox
                          indeterminate={indeterminateDeal}
                          onChange={onCheckAllDealChange}
                          checked={checkAllDeal}
                        >
                          <div class="text-xs"> Check all </div>
                        </Checkbox>
                        <Divider />
                        <CheckboxGroup
                          options={plainOptions}
                          value={checkedDealList}
                          onChange={onDealChange}
                        />
                      </div>
                    </div>

                    <div class=" flex justify-between mt-4">
                      <div>
                        <div class="text-sm font-semibold">Data Room</div>
                        <Checkbox
                          indeterminate={indeterminateDataRoom}
                          onChange={onCheckAllDataRoomChange}
                          checked={checkAllDataRoom}
                        >
                          <div class="text-xs"> Check all </div>
                        </Checkbox>
                        <Divider />
                        <CheckboxGroup
                          options={plainOptions}
                          value={checkedDataRoomList}
                          onChange={onDataRoomChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/* Right Box */}
                <div class="flex border border-gray-300  w-1/2 p-1">
                  <div class="flex flex-col">
                    <div class="flex justify-between mt-4">
                      <div>
                        <div class="text-sm font-semibold">
                          Investor Contact
                        </div>
                        <Checkbox
                          indeterminate={indeterminateInvestorContact}
                          onChange={onCheckAllInvestorContactChange}
                          checked={checkAllInvestorContact}
                        >
                          <div class="text-xs"> Check all</div>
                        </Checkbox>
                        <Divider />
                        <CheckboxGroup
                          options={plainOptions}
                          value={checkedInvestorContactList}
                          onChange={onInvestorContactChange}
                        />
                      </div>
                    </div>

                    <div class="flex justify-between mt-4">
                      <div>
                        <div class="text-sm font-semibold">Pitch</div>
                        <Checkbox
                          indeterminate={indeterminatePitch}
                          onChange={onCheckAllPitchChange}
                          checked={checkAllPitch}
                        >
                          <div class="text-xs"> Check all </div>
                        </Checkbox>
                        <Divider />
                        <CheckboxGroup
                          options={plainOptions}
                          value={checkedPitchList}
                          onChange={onPitchChange}
                        />
                      </div>
                    </div>
                    <div class="flex justify-between mt-4">
                      <div>
                        <div class="text-sm font-semibold">Club</div>
                        <Checkbox
                          indeterminate={indeterminateClub}
                          onChange={onCheckAllClubChange}
                          checked={checkAllClub}
                        >
                          <div class="text-xs"> Check all </div>
                        </Checkbox>
                        <Divider />
                        <CheckboxGroup
                          options={plainOptions}
                          value={checkedClubList}
                          onChange={onClubChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}

          {props.departmentData.elearningInd === true ? (
            <div class="flex flex-col ">
              <div class=" text-clr mt-6 text-base flex justify-center font-bold">
                E-Learning
              </div>
              <div class="flex  ">
                {/* Left Box */}
                <div class="flex border border-gray-300  w-1/2 p-1">
                  <div class="flex flex-col">
                    <div class="flex justify-between mt-4">
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

                    <div class="flex justify-between mt-4">
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
                    <div class=" flex justify-between mt-4">
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
                    <div class="flex justify-between mt-4">
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

                    <div class="flex justify-between mt-4">
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

          <div class="mt-2">
            Updated on{" "}
            {dayjs(props.departmentAcces.lastUpdatedOn).format("DD/MM/YYYY")} by{" "}
            {props.departmentAcces.name}
          </div>

          <div class=" flex justify-end">
            <FloatButton.Group>
              <Button
                type="primary"
                htmlType="submit"
                loading={props.addingDepartmentAccess}
                onClick={() => {
                  handleUpdateAccess();
                }}
              >
                <FormattedMessage id="app.Update" defaultMessage="Update" />
              </Button>
            </FloatButton.Group>
          </div>
        </TabsWrapper>
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
