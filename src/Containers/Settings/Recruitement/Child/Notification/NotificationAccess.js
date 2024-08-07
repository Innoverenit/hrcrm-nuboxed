import { Button, Checkbox, Divider } from "antd";
import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import dayjs from "dayjs";
import {
  addNotificationAccess,
  getNotificationAccess,
} from "../../../SettingsAction";
import { BundleLoader } from "../../../../../Components/Placeholder";
import { bindActionCreators } from "redux";
import {
  TabsWrapper,
} from "../../../../../Components/UI/Layout";

const CheckboxGroup = Checkbox.Group;
const plainOptions = ["Self", "Management", "Report"];

const NotificationAccess = (props) => {
  useEffect(() => {
    console.log(props.userId);
    props.getNotificationAccess(props.userId);
  }, [props.userId]);
  useEffect(() => {
    setCheckedVendorList(props.notificationAcces.vendor);
    setCheckedVendorLoginList(props.notificationAcces.vendorLogin);
    setCheckedCustomerList(props.notificationAcces.customer);
    setCheckedCustomerLoginList(props.notificationAcces.customerLogin);
    setCheckedOpportunityList(props.notificationAcces.opportunity);
    setCheckedTalentList(props.notificationAcces.talent);
    setCheckedContactList(props.notificationAcces.contact);
    setCheckedRequirementList(props.notificationAcces.requirementCreate);
    setCheckedCloseRequirementList(props.notificationAcces.requirementClose);
    setCheckedCustomerLoginList(props.notificationAcces.publish);
    setCheckedCandidateSelectList(props.notificationAcces.talentSelect);
    setCheckedCandidateOnboardList(props.notificationAcces.talentOnboard);
    setCheckedCandidateDropList(props.notificationAcces.talentDrop);
    setCheckedTaskList(props.notificationAcces.task);
    setCheckedCallList(props.notificationAcces.call);
    setCheckedPublishJobList(props.notificationAcces.publishJob);
    setCheckedWebsiteList(props.notificationAcces.publishJobOnWebsite);
    setCheckedPublishJobBoardList(props.notificationAcces.publishJobOnJobboard);
    setCheckedUnpublishJobList(props.notificationAcces.unpublishJob);
  }, [
    props.notificationAcces.vendor,
    props.notificationAcces.vendorLogin,
    props.notificationAcces.customer,
    props.notificationAcces.customerLogin,
    props.notificationAcces.opportunity,
    props.notificationAcces.talent,
    props.notificationAcces.contact,
    props.notificationAcces.requirementCreate,
    props.notificationAcces.requirementClose,
    props.notificationAcces.publishJob,
    props.notificationAcces.publishJobOnWebsite,
    props.notificationAcces.pulse,
    props.notificationAcces.call,
    props.notificationAcces.event,
    props.notificationAcces.talentDrop,
    props.notificationAcces.talentOnboard,
    props.notificationAcces.talentSelect,
    props.notificationAcces.publishJobOnJobboard,
    props.notificationAcces.unpublishJob,
  ]);
  //Vendor
  const [checkedVendorList, setCheckedVendorList] = useState(
    props.notificationAcces.vendor
  );
  const [indeterminateVendor, setIndeterminateVendor] = useState(true);
  const [checkAllVendor, setCheckAllVendor] = useState(false);

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
  const [checkedCustomerList, setCheckedCustomerList] = useState(
    props.notificationAcces.customer
  );
  const [indeterminateCustomer, setIndeterminateCustomer] = useState(true);
  const [checkAllCustomer, setCheckAllCustomer] = useState(false);

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
  const [checkedOpportunityList, setCheckedOpportunityList] = useState(
    props.notificationAcces.opportunity
  );
  const [indeterminateOpportunity, setIndeterminateOpportunity] = useState(
    true
  );
  const [checkAllOpportunity, setCheckAllOpportunity] = useState(false);

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
  const [checkedTalentList, setCheckedTalentList] = useState(
    props.notificationAcces.talent
  );
  const [indeterminateTalent, setIndeterminateTalent] = useState(true);
  const [checkAllTalent, setCheckAllTalent] = useState(false);

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

  const [checkedContactList, setCheckedContactList] = useState(
    props.notificationAcces.contact
  );
  const [indeterminateContact, setIndeterminateContact] = useState(true);
  const [checkAllContact, setCheckAllContact] = useState(false);

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

  const [checkedRequirementList, setCheckedRequirementList] = useState(
    props.notificationAcces.requirement
  );
  const [indeterminateRequirement, setIndeterminateRequirement] = useState(
    true
  );
  const [checkAllRequirement, setCheckAllRequirement] = useState(false);

  const onRequirementChange = (list) => {
    setCheckedRequirementList(list);
    setIndeterminateRequirement(
      !!list.length && list.length < plainOptions.length
    );
    setCheckAllRequirement(list.length === plainOptions.length);
  };

  const onCheckAllRequirementChange = (e) => {
    setCheckedRequirementList(e.target.checked ? plainOptions : []);
    setIndeterminateRequirement(false);
    setCheckAllRequirement(e.target.checked);
  };

  // Close Requirement

  const [
    checkedCloseRequirementList,
    setCheckedCloseRequirementList,
  ] = useState(props.notificationAcces.requirementClose
    );
  const [
    indeterminateCloseRequirement,
    setIndeterminateCloseRequirement,
  ] = useState(true);
  const [checkAllCloseRequirement, setCheckAllCloseRequirement] = useState(
    false
  );

  const onCloseRequirementChange = (list) => {
    setCheckedCloseRequirementList(list);
    indeterminateCloseRequirement(
      !!list.length && list.length < plainOptions.length
    );
    setCheckAllCloseRequirement(list.length === plainOptions.length);
  };

  const onCheckAllCloseRequirementChange = (e) => {
    setCheckAllCloseRequirement(e.target.checked ? plainOptions : []);
    setIndeterminateCloseRequirement(false);
    setCheckAllCloseRequirement(e.target.checked);
  };

  // Publish

  const [checkedPublishList, setCheckedPublishList] = useState(
    props.notificationAcces.publish
  );
  const [indeterminatePublish, setIndeterminatePublish] = useState(true);
  const [checkAllPublish, setCheckAllPublish] = useState(false);

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

  // VendorLogin

  const [checkedVendorLoginList, setCheckedVendorLoginList] = useState(
    props.notificationAcces.vendorLogin

  );
  const [indeterminateVendorLogin, setIndeterminateVendorLogin] = useState(
    true
  );
  const [checkAllVendorLogin, setCheckAllVendorLogin] = useState(false);

  const onVendorLoginChange = (list) => {
    setCheckedVendorLoginList(list);
    setIndeterminateVendorLogin(
      !!list.length && list.length < plainOptions.length
    );
    setCheckAllVendorLogin(list.length === plainOptions.length);
  };

  const onCheckAllVendorLoginChange = (e) => {
    setCheckedVendorLoginList(e.target.checked ? plainOptions : []);
    setIndeterminateVendorLogin(false);
    setCheckAllVendorLogin(e.target.checked);
  };
  // CustomerLogin

  const [checkedCustomerLoginList, setCheckedCustomerLoginList] = useState(
    props.notificationAcces.customerLogin
  );
  const [indeterminateCustomerLogin, setIndeterminateCustomerLogin] = useState(
    true
  );
  const [checkAllCustomerLogin, setCheckAllCustomerLogin] = useState(false);

  const onCustomerLoginChange = (list) => {
    setCheckedCustomerLoginList(list);
    setIndeterminateCustomerLogin(
      !!list.length && list.length < plainOptions.length
    );
    setCheckAllCustomerLogin(list.length === plainOptions.length);
  };

  const onCheckAllCustomerLoginChange = (e) => {
    setCheckedCustomerLoginList(e.target.checked ? plainOptions : []);
    setIndeterminateCustomerLogin(false);
    setCheckAllCustomerLogin(e.target.checked);
  };
  // CandidateSelect
  const [checkedCandidateSelectList, setCheckedCandidateSelectList] = useState(
    props.notificationAcces.talentSelect
  );
  const [
    indeterminateCandidateSelect,
    setIndeterminateCandidateSelect,
  ] = useState(true);
  const [checkAllCandidateSelect, setCheckAllCandidateSelect] = useState(false);

  const onCandidateSelectChange = (list) => {
    setCheckedCandidateSelectList(list);
    setIndeterminateCandidateSelect(
      !!list.length && list.length < plainOptions.length
    );
    setCheckAllCandidateSelect(list.length === plainOptions.length);
  };

  const onCheckAllCandidateSelectChange = (e) => {
    setCheckedCandidateSelectList(e.target.checked ? plainOptions : []);
    setIndeterminateCandidateSelect(false);
    setCheckAllCandidateSelect(e.target.checked);
  };
  //CandidateOnboard

  const [
    checkedCandidateOnboardList,
    setCheckedCandidateOnboardList,
  ] = useState(props.notificationAcces.talentOnboard
    );
  const [
    indeterminateCandidateOnboard,
    setIndeterminateCandidateOnboard,
  ] = useState(true);
  const [checkAllCandidateOnboard, setCheckAllCandidateOnboard] = useState(
    false
  );

  const onCandidateOnboardChange = (list) => {
    setCheckedCandidateOnboardList(list);
    setIndeterminateCandidateOnboard(
      !!list.length && list.length < plainOptions.length
    );
    setCheckAllCandidateOnboard(list.length === plainOptions.length);
  };

  const onCheckAllCandidateOnboardChange = (e) => {
    setCheckedCandidateOnboardList(e.target.checked ? plainOptions : []);
    setIndeterminateCandidateOnboard(false);
    setCheckAllCandidateOnboard(e.target.checked);
  };
  //CandidateDrop

  const [checkedCandidateDropList, setCheckedCandidateDropList] = useState(
    props.notificationAcces.talentDrop

  );
  const [indeterminateCandidateDrop, setIndeterminateCandidateDrop] = useState(
    true
  );
  const [checkAllCandidateDrop, setCheckAllCandidateDrop] = useState(false);

  const onCandidateDropChange = (list) => {
    setCheckedCandidateDropList(list);
    setIndeterminateCandidateDrop(
      !!list.length && list.length < plainOptions.length
    );
    setCheckAllCandidateDrop(list.length === plainOptions.length);
  };

  const onCheckAllCandidateDropChange = (e) => {
    setCheckedCandidateDropList(e.target.checked ? plainOptions : []);
    setIndeterminateCandidateDrop(false);
    setCheckAllCandidateDrop(e.target.checked);
  };
  //Task

  const [checkedTaskList, setCheckedTaskList] = useState(
    props.notificationAcces.task
  );
  const [indeterminateTask, setIndeterminateTask] = useState(true);
  const [checkAllTask, setCheckAllTask] = useState(false);

  const onTaskChange = (list) => {
    setCheckedTaskList(list);
    setIndeterminateTask(!!list.length && list.length < plainOptions.length);
    setCheckAllTask(list.length === plainOptions.length);
  };

  const onCheckAllTaskChange = (e) => {
    setCheckedTaskList(e.target.checked ? plainOptions : []);
    setIndeterminateTask(false);
    setCheckAllTask(e.target.checked);
  };
  //Event
  const [checkedEventList, setCheckedEventList] = useState(
    props.notificationAcces.event
  );
  const [indeterminateEvent, setIndeterminateEvent] = useState(true);
  const [checkAllEvent, setCheckAllEvent] = useState(false);

  const onEventChange = (list) => {
    setCheckedEventList(list);
    setIndeterminateEvent(!!list.length && list.length < plainOptions.length);
    setCheckAllEvent(list.length === plainOptions.length);
  };

  const onCheckAllEventChange = (e) => {
    setCheckedEventList(e.target.checked ? plainOptions : []);
    setIndeterminateEvent(false);
    setCheckAllEvent(e.target.checked);
  };
  //Call
  const [checkedCallList, setCheckedCallList] = useState(
    props.notificationAcces.call
  );
  const [indeterminateCall, setIndeterminateCall] = useState(true);
  const [checkAllCall, setCheckAllCall] = useState(false);

  const onCallChange = (list) => {
    setCheckedCallList(list);
    setIndeterminateCall(!!list.length && list.length < plainOptions.length);
    setCheckAllCall(list.length === plainOptions.length);
  };

  const onCheckAllCallChange = (e) => {
    setCheckedCallList(e.target.checked ? plainOptions : []);
    setIndeterminateCall(false);
    setCheckAllCall(e.target.checked);
  };
  //PublishJob

  const [checkedPublishJobList, setCheckedPublishJobList] = useState(
    props.notificationAcces.publishJob
  );
  const [indeterminatePublishJob, setIndeterminatePublishJob] = useState(true);
  const [checkAllPublishJob, setCheckAllPublishJob] = useState(false);

  const onPublishJobChange = (list) => {
    setCheckedPublishJobList(list);
    setIndeterminatePublishJob(
      !!list.length && list.length < plainOptions.length
    );
    setCheckAllPublishJob(list.length === plainOptions.length);
  };

  const onCheckAllPublishJobChange = (e) => {
    setCheckedPublishJobList(e.target.checked ? plainOptions : []);
    setIndeterminatePublishJob(false);
    setCheckAllPublishJob(e.target.checked);
  };
  // publish job on Website

  const [checkedWebsiteList, setCheckedWebsiteList] = useState(
    props.notificationAcces.publishJobOnWebsite
  );
  const [indeterminateWebsite, setIndeterminateWebsite] = useState(true);
  const [checkAllWebsite, setCheckAllWebsite] = useState(false);

  const onWebsiteChange = (list) => {
    setCheckedWebsiteList(list);
    setIndeterminateWebsite(!!list.length && list.length < plainOptions.length);
    setCheckAllWebsite(list.length === plainOptions.length);
  };

  const onCheckAllWebsiteChange = (e) => {
    setCheckedWebsiteList(e.target.checked ? plainOptions : []);
    setIndeterminateWebsite(false);
    setCheckAllWebsite(e.target.checked);
  };

  //publish jobBoard

  const [checkedPublishJobBoardList, setCheckedPublishJobBoardList] = useState(
    props.notificationAcces.publishJobOnJobboard
  );
  const [
    indeterminatePublishJobBoard,
    setIndeterminatePublishJobBoard,
  ] = useState(true);
  const [checkAllPublishJobBoard, setCheckAllPublishJobBoard] = useState(false);

  const onPublishJobBoardChange = (list) => {
    setCheckedPublishJobBoardList(list);
    setIndeterminatePublishJobBoard(
      !!list.length && list.length < plainOptions.length
    );
    setCheckAllPublishJob(list.length === plainOptions.length);
  };

  const onCheckAllPublishJobBoardChange = (e) => {
    setCheckedPublishJobBoardList(e.target.checked ? plainOptions : []);
    setIndeterminatePublishJobBoard(false);
    setCheckAllPublishJobBoard(e.target.checked);
  };

  //UnpublisJob

  const [checkedUnpublishJobList, setCheckedUnpublishJobList] = useState(
    props.notificationAcces.unpublishJob
  );
  const [indeterminateUnpublishJob, setIndeterminateUnpublishJob] = useState(
    true
  );
  const [checkAllUnpublishJob, setCheckAllUnpublishJob] = useState(false);

  const onUnpublishJobChange = (list) => {
    setCheckedUnpublishJobList(list);
    setIndeterminateUnpublishJob(
      !!list.length && list.length < plainOptions.length
    );
    setCheckAllUnpublishJob(list.length === plainOptions.length);
  };

  const onCheckAllUnpublishJobChange = (e) => {
    setCheckedUnpublishJobList(e.target.checked ? plainOptions : []);
    setIndeterminateUnpublishJob(false);
    setCheckAllUnpublishJob(e.target.checked);
  };

  function handleUpdateAccess() {
    let data = {
      vendor: checkedVendorList || [],
      vendorLogin: checkedVendorLoginList || [],
      customer: checkedCustomerList || [],
      customerLogin: checkedCustomerLoginList || [],
      opportunity: checkedOpportunityList || [],
      talent: checkedTalentList || [],
      contact: checkedContactList || [],
      talentSelect: checkedCandidateSelectList || [],
      requirementCreate: checkedRequirementList || [],
      requirementClose: checkedCloseRequirementList || [],
      talentOnboard: checkedCandidateOnboardList || [],
      talentDrop: checkedCandidateDropList || [],
      task: checkedTaskList || [],
      call: checkedCallList || [],
      event:checkedEventList || [],
      publishJob: checkedPublishJobList || [],
      publishJobOnWebsite: checkedWebsiteList || [],
      publishJobOnJobboard: checkedPublishJobBoardList || [],
      unpublishJob: checkedUnpublishJobList || [],

      userId: props.userId,
      organizationId: props.organizationId,
    };
    props.addNotificationAccess(data, props.userId);
  }
  console.log("avc", props.notificationAcces.customer);
  return (
    <>
      {/* <Form className="form-background"> */}
      <div style={{ display: "flex", justifyContent: "space-between", height:"80vh", overflow: "scroll", paddingRight: "0.6em" }}>
          {props.fetchingNotificationAccess ? (
            <BundleLoader />
          ) : (
            <TabsWrapper style={{overflow: "auto"}}>
              {/* customer */}
              <div class=" flex flex-row flex-wrap items-start self-start justify-around grow shrink h-auto mr-auto ">
                <div >
                  <h1>Create Customer</h1>
                  <Checkbox
                    indeterminate={indeterminateCustomer}
                    onChange={onCheckAllCustomerChange}
                    checked={checkAllCustomer}
                  >
                    Check all
                  </Checkbox>
                  <Divider />
                  <CheckboxGroup
                    options={plainOptions}
                    value={checkedCustomerList}
                    onChange={onCustomerChange}
                  />
                </div>
                <mt-3  />

                {/* Customer */}
                <div>
                  <h1> Create Contact</h1>
                  <Checkbox
                    indeterminate={indeterminateContact}
                    onChange={onCheckAllContactChange}
                    checked={checkAllContact}
                  >
                    Check all
                  </Checkbox>
                  <Divider />
                  <CheckboxGroup
                    options={plainOptions}
                    value={checkedContactList}
                    onChange={onContactChange}
                  />
                </div>
              </div>
              <mt-3 
              // style={{ marginTop: "2.2em" }}
               />

              {/* Opportunity */}
              <div class=" flex flex-row flex-wrap items-start self-start justify-around grow shrink h-auto mr-auto ">
                <div>
                  <h1> Create Opportunity</h1>
                  <Checkbox
                    indeterminate={indeterminateOpportunity}
                    onChange={onCheckAllOpportunityChange}
                    checked={checkAllOpportunity}
                  >
                    Check all
                  </Checkbox>
                  <Divider />
                  <CheckboxGroup
                    options={plainOptions}
                    value={checkedOpportunityList}
                    onChange={onOpportunityChange}
                  />
                </div>
                <mt-3 />
                {/* Contact */}
                <div>
                  <h1>Create Requirement</h1>
                  <Checkbox
                    indeterminate={indeterminateRequirement}
                    onChange={onCheckAllRequirementChange}
                    checked={checkAllRequirement}
                  >
                    Check all
                  </Checkbox>
                  <Divider />
                  <CheckboxGroup
                    options={plainOptions}
                    value={checkedRequirementList}
                    onChange={onRequirementChange}
                  />
                </div>
              </div>
              <mt-3 />

              {/* Talent */}
              <div class=" flex flex-row flex-wrap items-start self-start justify-around grow shrink h-auto mr-auto ">
                <div>
                  <h1>Create Talent</h1>
                  <Checkbox
                    indeterminate={indeterminateTalent}
                    onChange={onCheckAllTalentChange}
                    checked={checkAllTalent}
                  >
                    Check all
                  </Checkbox>
                  <Divider />
                  <CheckboxGroup
                    options={plainOptions}
                    value={checkedTalentList}
                    onChange={onTalentChange}
                  />
                </div>

                <mt-3 />
                <div>
                  <h1>Close Requirement</h1>
                  <Checkbox
                    indeterminate={indeterminateCloseRequirement}
                    onChange={onCheckAllCloseRequirementChange}
                    checked={checkAllCloseRequirement}
                  >
                    Check all
                  </Checkbox>
                  <Divider />
                  <CheckboxGroup
                    options={plainOptions}
                    value={checkedCloseRequirementList}
                    onChange={onCloseRequirementChange}
                  />
                </div>
              </div>
              <mt-3 />
              <div class=" flex flex-row flex-wrap items-start self-start justify-around grow shrink h-auto mr-auto ">
                <div>
                  <h1>Add Vendor</h1>
                  <Checkbox
                    indeterminate={indeterminateVendor}
                    onChange={onCheckAllVendorChange}
                    checked={checkAllVendor}
                  >
                    Check all
                  </Checkbox>
                  <Divider />
                  <CheckboxGroup
                    options={plainOptions}
                    value={checkedVendorList}
                    onChange={onVendorChange}
                  />
                </div>
                <mt-3 />
                <div>
                  <h1>Customer Login</h1>
                  <Checkbox
                    indeterminate={indeterminateCustomerLogin}
                    onChange={onCheckAllCustomerLoginChange}
                    checked={checkAllCustomerLogin}
                  >
                    Check all
                  </Checkbox>
                  <Divider />
                  <CheckboxGroup
                    options={plainOptions}
                    value={checkedCustomerLoginList}
                    onChange={onCustomerLoginChange}
                  />
                </div>
              </div>
              <mt-3  />
              <div class=" flex flex-row flex-wrap items-start self-start justify-around grow shrink h-auto mr-auto ">
                <div>
                  <h1>Vendor Login</h1>
                  <Checkbox
                    indeterminate={indeterminateVendorLogin}
                    onChange={onCheckAllVendorLoginChange}
                    checked={checkAllVendorLogin}
                  >
                    Check all
                  </Checkbox>
                  <Divider />
                  <CheckboxGroup
                    options={plainOptions}
                    value={checkedVendorLoginList}
                    onChange={onVendorLoginChange}
                  />
                </div>
                <mt-3 />
                <div>
                  <h1>Candidate Select</h1>
                  <Checkbox
                    indeterminate={indeterminateCandidateSelect}
                    onChange={onCheckAllCandidateSelectChange}
                    checked={checkAllCandidateSelect}
                  >
                    Check all
                  </Checkbox>
                  <Divider />
                  <CheckboxGroup
                    options={plainOptions}
                    value={checkedCandidateSelectList}
                    onChange={onCandidateSelectChange}
                  />
                </div>
              </div>
              <mt-3 />
              <div class=" flex flex-row flex-wrap items-start self-start justify-around grow shrink h-auto mr-auto ">
                <div>
                  <h1>Candidate Onboarded</h1>
                  <Checkbox
                    indeterminate={indeterminateCandidateOnboard}
                    onChange={onCheckAllCandidateOnboardChange}
                    checked={checkAllCandidateOnboard}
                  >
                    Check all
                  </Checkbox>
                  <Divider />
                  <CheckboxGroup
                    options={plainOptions}
                    value={checkedCandidateOnboardList}
                    onChange={onCandidateOnboardChange}
                  />
                </div>
                <mt-3 />
                <div>
                  <h1>Candidate Drop</h1>
                  <Checkbox
                    indeterminate={indeterminateCandidateDrop}
                    onChange={onCheckAllCandidateDropChange}
                    checked={checkAllCandidateDrop}
                  >
                    Check all
                  </Checkbox>
                  <Divider />
                  <CheckboxGroup
                    options={plainOptions}
                    value={checkedCandidateDropList}
                    onChange={onCandidateDropChange}
                  />
                </div>
              </div>
              <mt-3 />
              <div class=" flex flex-row flex-wrap items-start self-start justify-around grow shrink h-auto mr-auto ">
                <div>
                  <h1>Task</h1>
                  <Checkbox
                    indeterminate={indeterminateTask}
                    onChange={onCheckAllTaskChange}
                    checked={checkAllTask}
                  >
                    Check all
                  </Checkbox>
                  <Divider />
                  <CheckboxGroup
                    options={plainOptions}
                    value={checkedTaskList}
                    onChange={onTaskChange}
                  />
                </div>
                <mt-3 />
                <div>
                  <h1>Event</h1>
                  <Checkbox
                    indeterminate={indeterminateEvent}
                    onChange={onCheckAllEventChange}
                    checked={checkAllEvent}
                  >
                    Check all
                  </Checkbox>
                  <Divider />
                  <CheckboxGroup
                    options={plainOptions}
                    value={checkedEventList}
                    onChange={onEventChange}
                  />
                </div>
              </div>
              <mt-3 />
              <div class=" flex flex-row flex-wrap items-start self-start justify-around grow shrink h-auto mr-auto ">
                <div>
                  <h1>Call</h1>
                  <Checkbox
                    indeterminate={indeterminateCall}
                    onChange={onCheckAllCallChange}
                    checked={checkAllCall}
                  >
                    Check all
                  </Checkbox>
                  <Divider />
                  <CheckboxGroup
                    options={plainOptions}
                    value={checkedCallList}
                    onChange={onCallChange}
                  />
                </div>
                <mt-3 />
                <div>
                  <h1> Publish Job</h1>
                  <Checkbox
                    indeterminate={indeterminatePublishJob}
                    onChange={onCheckAllPublishJobChange}
                    checked={checkAllPublishJob}
                  >
                    Check all
                  </Checkbox>
                  <Divider />
                  <CheckboxGroup
                    options={plainOptions}
                    value={checkedPublishJobList}
                    onChange={onPublishJobChange}
                  />
                </div>
              </div>
              <mt-3/>
              <div class=" flex flex-row flex-wrap items-start self-start justify-around grow shrink h-auto mr-auto ">
                <div>
                  <h1> Publish Job on Website</h1>
                  <Checkbox
                    indeterminate={indeterminateWebsite}
                    onChange={onCheckAllWebsiteChange}
                    checked={checkAllWebsite}
                  >
                    Check all
                  </Checkbox>
                  <Divider />
                  <CheckboxGroup
                    options={plainOptions}
                    value={checkedWebsiteList}
                    onChange={onWebsiteChange}
                  />
                </div>
                <mt-3 />
                <div>
                  <h1> Publish Job on JobBoard</h1>
                  <Checkbox
                    indeterminate={indeterminatePublishJobBoard}
                    onChange={onCheckAllPublishJobBoardChange}
                    checked={checkAllPublishJobBoard}
                  >
                    Check all
                  </Checkbox>
                  <Divider />
                  <CheckboxGroup
                    options={plainOptions}
                    value={checkedPublishJobBoardList}
                    onChange={onPublishJobBoardChange}
                  />
                </div>
              </div>
              <mt-3  />
              <div class=" flex flex-row flex-wrap items-start self-start justify-around grow shrink h-auto mr-auto ">
                <div>
                  <h1>UnPublish Job</h1>
                  <Checkbox
                    indeterminate={indeterminateUnpublishJob}
                    onChange={onCheckAllUnpublishJobChange}
                    checked={checkAllUnpublishJob}
                  >
                    Check all
                  </Checkbox>
                  <Divider />
                  <CheckboxGroup
                    options={plainOptions}
                    value={checkedUnpublishJobList}
                    onChange={onUnpublishJobChange}
                  />
                </div>
              </div>

              <div>
                Updated on{" "}
                {dayjs(props.notificationAcces.lastUpdatedOn).format("ll")} by{" "}
                {props.notificationAcces.name}
              </div>

              <div class=" flex flex-row flex-wrap items-start self-start justify-end grow shrink h-auto mr-auto ">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={props.addingNotificationAccess}
                  onClick={() => {
                    handleUpdateAccess();
                  }}
                >
                  <FormattedMessage id="app.Update" defaultMessage="Update" />
                </Button>
              </div>
            </TabsWrapper>
          )}
        </div>
      {/* </Form> */}
    </>
  );
};

const mapStateToProps = ({ settings, auth }) => ({
  addingNotificationAccess: settings.addingNotificationAccess,
  userId: auth.userDetails.userId,
  organizationId: auth.userDetails.organizationId,
  notificationAcces: settings.notificationAcces,
  fetchingNotificationAccess: settings.fetchingNotificationAccess,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addNotificationAccess,
      getNotificationAccess,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(NotificationAccess);
