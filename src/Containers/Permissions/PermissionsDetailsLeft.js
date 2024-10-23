import React, { useEffect, useState, } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Switch, Popconfirm } from "antd";
import { MainWrapper } from "../../Components/UI/Layout";
import { getPermissions, addingPermissions } from "./PermissionsAction";

function PermissionsDetailsLeft(props) {

  const { candidateShareInd } = props.permissionsData;
  console.log(candidateShareInd);
  const [candidateInd, setCandidateInd] = useState(candidateShareInd);
  useEffect(() => {
    props.getPermissions(props.userId);
  }, []);
  function handleCandidateClick(checked) {
    console.log(candidateShareInd);
    if (candidateShareInd) {
      //disable url
      props.addingPermissions({
        ...props.permissionsData,
        userId: props.userId,
        candidateShareInd: candidateShareInd ? false : true,
      }, props.userId);
      setCandidateInd(candidateShareInd ? false : true);
    } else {

      props.addingPermissions({
        ...props.permissionsData,
        userId: props.userId,
        candidateShareInd: candidateShareInd ? false : true,
      }, props.userId);
      setCandidateInd(candidateShareInd ? false : true);
    }

  }
  function handleCancel() {
    if (candidateShareInd) {
      setCandidateInd(true);
    } else {
      setCandidateInd(false);
    }
  }


  const { plannerShareInd } = props.permissionsData;
  console.log(plannerShareInd);
  const [plannerInd, setPlannerInd] = useState(plannerShareInd);
  function handlePlannerClick(checked) {
    console.log(plannerShareInd);
    if (plannerShareInd) {
      //disable url
      props.addingPermissions({
        ...props.permissionsData,
        userId: props.userId,
        plannerShareInd: plannerShareInd ? false : true,
      }, props.userId);
      setPlannerInd(plannerShareInd ? false : true);
    } else {

      props.addingPermissions({
        ...props.permissionsData,
        userId: props.userId,
        plannerShareInd: plannerShareInd ? false : true,
      }, props.userId);
      setPlannerInd(plannerShareInd ? false : true);
    }

    //check if from backend we got candidate value true then add condition like if tru then call disable url else enable url
  }
  function handlePlannerCancel() {
    if (plannerShareInd) {
      setPlannerInd(true);
    } else {
      setPlannerInd(false);
    }
  }

  
  const { contactInd } = props.permissionsData;
  console.log(contactInd);
  const [contactToggleInd, setContactToggleInd] = useState(contactInd);
  function handleContactClick(checked) {
    console.log(contactInd);
    if (contactInd) {
      //disable url
      props.addingPermissions({
        ...props.permissionsData,
        userId: props.userId,
        contactInd: contactInd ? false : true,
      }, props.userId);
      setContactToggleInd(contactInd ? false : true);
    } else {

      props.addingPermissions({
        ...props.permissionsData,
        userId: props.userId,
        contactInd: contactInd ? false : true,
      }, props.userId);
      setContactToggleInd(contactInd ? false : true);
    }

    //check if from backend we got candidate value true then add condition like if tru then call disable url else enable url
  }
  function handleContactCancel() {
    if (contactInd) {
      setContactToggleInd(true);
    } else {
      setContactToggleInd(false);
    }
  }


  const { partnerInd } = props.permissionsData;
  console.log(partnerInd);
  const [partnerToggleInd, setPartnerToggleInd] = useState(partnerInd);
  function handlePartnerClick(checked) {
    console.log(partnerInd);
    if (partnerInd) {
      //disable url
      props.addingPermissions({
        ...props.permissionsData,
        userId: props.userId,
        partnerInd: partnerInd ? false : true,
      }, props.userId);
      setPartnerToggleInd(partnerInd ? false : true);
    } else {

      props.addingPermissions({
        ...props.permissionsData,
        userId: props.userId,
        partnerInd: partnerInd ? false : true,
      }, props.userId);
      setPartnerToggleInd(partnerInd ? false : true);
    }

    //check if from backend we got candidate value true then add condition like if tru then call disable url else enable url
  }
  function handlePartnerCancel() {
    if (partnerInd) {
      setPartnerToggleInd(true);
    } else {
      setPartnerToggleInd(false);
    }
  }


  const { partnerContactInd } = props.permissionsData;
  console.log(partnerContactInd);
  const [partnerContactToggleInd, setPartnerContactToggleInd] = useState(partnerContactInd);
  function handlePartnerContactClick(checked) {
    console.log(partnerContactInd);
    if (partnerContactInd) {
      //disable url
      props.addingPermissions({
        ...props.permissionsData,
        userId: props.userId,
        partnerContactInd: partnerContactInd ? false : true,
      }, props.userId);
      setPartnerContactToggleInd(partnerContactInd ? false : true);
    } else {

      props.addingPermissions({
        ...props.permissionsData,
        userId: props.userId,
        partnerContactInd: partnerContactInd ? false : true,
      }, props.userId);
      setPartnerContactToggleInd(partnerContactInd ? false : true);
    }

    //check if from backend we got candidate value true then add condition like if tru then call disable url else enable url
  }
  function handlePartnerContactCancel() {
    if (partnerContactInd) {
      setPartnerContactToggleInd(true);
    } else {
      setPartnerContactToggleInd(false);
    }
  }


  const { customerInd } = props.permissionsData;
  console.log(customerInd);
  const [customerToggleInd, setCustomerToggleInd] = useState(customerInd);
  function handleCustomerClick(checked) {
    console.log(customerInd);
    if (customerInd) {
      //disable url
      props.addingPermissions({
        ...props.permissionsData,
        userId: props.userId,
        customerInd: customerInd ? false : true,
      }, props.userId);
      setCustomerToggleInd(customerInd ? false : true);
    } else {

      props.addingPermissions({
        ...props.permissionsData,
        userId: props.userId,
        customerInd: customerInd ? false : true,
      }, props.userId);
      setCustomerToggleInd(customerInd ? false : true);
    }

    //check if from backend we got candidate value true then add condition like if tru then call disable url else enable url
  }
  function handleCustomerCancel() {
    if (customerInd) {
      setCustomerToggleInd(true);
    } else {
      setCustomerToggleInd(false);
    }
  }

  

  const { opportunityInd } = props.permissionsData;
  console.log(opportunityInd);
  const [opportunityToggleInd, setOpportunityToggleInd] = useState(opportunityInd);
  function handleOpportunityClick(checked) {
    console.log(opportunityInd);
    if (opportunityInd) {
      //disable url
      props.addingPermissions({
        ...props.permissionsData,
        userId: props.userId,
        opportunityInd: opportunityInd ? false : true,
      }, props.userId);
      setOpportunityToggleInd(opportunityInd ? false : true);
    } else {

      props.addingPermissions({
        ...props.permissionsData,
        userId: props.userId,
        opportunityInd: opportunityInd ? false : true,
      }, props.userId);
      setOpportunityToggleInd(opportunityInd ? false : true);
    }

    //check if from backend we got candidate value true then add condition like if tru then call disable url else enable url
  }
  function handleOpportunityCancel() {
    if (opportunityInd) {
      setOpportunityToggleInd(true);
    } else {
      setOpportunityToggleInd(false);
    }
  }
  

  const { callInd } = props.permissionsData;
  console.log(callInd);
  const [callToggleInd, setCallToggleInd] = useState(callInd);
  function handleCallClick(checked) {
    console.log(callInd);
    if (callInd) {
      //disable url
      props.addingPermissions({
        ...props.permissionsData,
        userId: props.userId,
        callInd: callInd ? false : true,
      }, props.userId);
      setCallToggleInd(callInd ? false : true);
    } else {

      props.addingPermissions({
        ...props.permissionsData,
        userId: props.userId,
        callInd: callInd ? false : true,
      }, props.userId);
      setCallToggleInd(callInd ? false : true);
    }

    //check if from backend we got candidate value true then add condition like if tru then call disable url else enable url
  }
  function handleCallCancel() {
    if (callInd) {
      setCallToggleInd(true);
    } else {
      setCallToggleInd(false);
    }
   }

   
  const { eventInd } = props.permissionsData;
  console.log(eventInd);
  const [eventToggleInd, setEventToggleInd] = useState(eventInd);
  function handleEventClick(checked) {
    console.log(eventInd);
    if (eventInd) {
      //disable url
      props.addingPermissions({
        ...props.permissionsData,
        userId: props.userId,
        eventInd: eventInd ? false : true,
      }, props.userId);
      setEventToggleInd(eventInd ? false : true);
    } else {

      props.addingPermissions({
        ...props.permissionsData,
        userId: props.userId,
        eventInd: eventInd ? false : true,
      }, props.userId);
      setEventToggleInd(eventInd ? false : true);
    }

    //check if from backend we got candidate value true then add condition like if tru then call disable url else enable url
  }
  function handleEventCancel() {
    if (eventInd) {
      setEventToggleInd(true);
    } else {
      setEventToggleInd(false);
    }
   }

   const { taskInd } = props.permissionsData;
  console.log(taskInd);
  const [taskToggleInd, setTaskToggleInd] = useState(taskInd);
  function handleTaskClick(checked) {
    console.log(taskInd);
    if (taskInd) {
      //disable url
      props.addingPermissions({
        ...props.permissionsData,
        userId: props.userId,
        taskInd: taskInd ? false : true,
      }, props.userId);
      setTaskToggleInd(taskInd ? false : true);
    } else {

      props.addingPermissions({
        ...props.permissionsData,
        userId: props.userId,
        taskInd: taskInd ? false : true,
      }, props.userId);
      setTaskToggleInd(taskInd ? false : true);
    }

    //check if from backend we got candidate value true then add condition like if tru then call disable url else enable url
  }
  function handleTaskCancel() {
    if (taskInd) {
      setTaskToggleInd(true);
    } else {
      setTaskToggleInd(false);
    }
   }
  return (
    <MainWrapper style={{ height: "446px", width:"", overflow: "auto" }}>
      
       <div>
      {/* <div class=" text-xs font-bold font-poppins text-black"> 
           Click To Share                   
      </div> */}
      {/* <PermissionForm /> */}
      </div>
      
  
      <div class=" mt-3">
       <h1 style={{textAlign:"center"}}>Permission</h1>
       </div>
       <div class=" flex justify-between w-[52%] mt-2" >
        <p>Talent</p>
        <div>
          <Popconfirm
            title="Do you wish to change Status ? "
            onConfirm={handleCandidateClick}
            onCancel={handleCancel}
            okText="Ok"
            cancelText="Cancel"
          >
            <Switch
              style={{ width: "5em" }}
              checked={candidateInd || candidateShareInd}
              checkedChildren="Share"
              unCheckedChildren="Withhold"
            />
          </Popconfirm>
        </div>
      </div> 

      <div class=" flex justify-between w-[52%] mt-2" >
        <p>Planner</p>
        <Popconfirm
          title="Do you wish to change Status ? "

          // onConfirm={this.props.contactId ? this.onChange : this.handleError}
          onConfirm={() => {
            handlePlannerClick();
          }}
          onCancel={handlePlannerCancel}
          okText="Ok"
          cancelText="Cancel"
        >
          <Switch
            style={{ width: "5em" }}
            checked={plannerInd || plannerShareInd}
            checkedChildren="Share"
            unCheckedChildren="Withhold"
          />
        </Popconfirm>
      </div>
      <div class=" flex justify-between w-[52%] mt-2" >
        <p>Contact</p>
        <Popconfirm
          title="Do you wish to change Status ? "
          onConfirm={() => {
            handleContactClick();
          }}
          onCancel={handleContactCancel}
          okText="Ok"
          cancelText="Cancel"
        >
          <Switch
            style={{ width: "5em" }}
            checked={contactToggleInd || contactInd}
            checkedChildren="Share"
            unCheckedChildren="Withhold"
          />
        </Popconfirm>
      </div>
      <div class=" flex justify-between w-[52%] mt-2" >
        <p>Partner</p>
        <Popconfirm
          title="Do you wish to change Status ? "

          // onConfirm={this.props.contactId ? this.onChange : this.handleError}
          onConfirm={() => {
            handlePartnerClick();
          }}
          onCancel={handlePartnerCancel}
          okText="Ok"
          cancelText="Cancel"
        >
          <Switch
            style={{ width: "5em" }}
            checked={partnerInd || partnerToggleInd}
            checkedChildren="Share"
            unCheckedChildren="Withhold"
          />
        </Popconfirm>
      </div>
      <div class=" flex justify-between w-[52%] mt-2" >
        <p>Partner Contact</p>
        <Popconfirm
          title="Do you wish to change Status ? "

          // onConfirm={this.props.contactId ? this.onChange : this.handleError}
          onConfirm={() => {
            handlePartnerContactClick();
          }}
          onCancel={handlePartnerContactCancel}
          okText="Ok"
          cancelText="Cancel"
        >
          <Switch
            style={{ width: "5em" }}
            checked={partnerContactInd || partnerContactToggleInd}
            checkedChildren="Share"
            unCheckedChildren="Withhold"
          />
        </Popconfirm>
      </div>
      <div class=" flex justify-between w-[52%] mt-2" >

        <p>Customer</p>
        <Popconfirm
          title="Do you wish to change Status ? "

          onConfirm={() => {
            handleCustomerClick();
          }}
          onCancel={handleCustomerCancel}
          okText="Ok"
          cancelText="Cancel"
        >
          <Switch
            style={{ width: "5em" }}
            checked={customerInd || customerToggleInd}
            checkedChildren="Share"
            unCheckedChildren="Withhold"
          />
        </Popconfirm>
      </div>
      <div class=" flex justify-between w-[52%] mt-2" >
        <p>Opportunity</p>
        <Popconfirm
          title="Do you wish to change Status ? "

          onConfirm={() => {
            handleOpportunityClick();
          }}
          onCancel={handleOpportunityCancel}
          okText="Ok"
          cancelText="Cancel"
        >

          <Switch
            style={{ width: "5em" }}
            checked={opportunityInd || opportunityToggleInd}
            checkedChildren="Share"
            unCheckedChildren="Withhold"
          />
        </Popconfirm>
      </div>
        <div class=" flex justify-between w-[52%] mt-2" >
        <p>Call</p>
        <Popconfirm
          title="Do you wish to change Status ? "

          onConfirm={() => {
            handleCallClick();
          }}
          onCancel={handleCallCancel}
          okText="Ok"
          cancelText="Cancel"
        >

          <Switch
            style={{ width: "5em" }}
            checked={callInd || callToggleInd}
            checkedChildren="Share"
            unCheckedChildren="Withhold"
          />
        </Popconfirm>
      </div>
      <div class=" flex justify-between w-[52%] mt-2" >
        <p>Events</p>
        <Popconfirm
          title="Do you wish to change Status ? "

          onConfirm={() => {
            handleEventClick();
          }}
          onCancel={handleEventCancel}
          okText="Ok"
          cancelText="Cancel"
        >

          <Switch
            style={{ width: "5em" }}
            checked={eventInd || eventToggleInd}
            checkedChildren="Share"
            unCheckedChildren="Withhold"
          />
        </Popconfirm>
      </div>
      <div class=" flex justify-between w-[52%] mt-2" >
        <p>Tasks</p>
        <Popconfirm
          title="Do you wish to change Status ? "

          onConfirm={() => {
            handleTaskClick();
          }}
           onCancel={handleTaskCancel}
          okText="Ok"
          cancelText="Cancel"
        >

          <Switch
            style={{ width: "5em" }}
            checked={taskInd || taskToggleInd}
            checkedChildren="Share"
            unCheckedChildren="Withhold"
          />
        </Popconfirm>
      </div>


    </MainWrapper>
  );
}

const mapStateToProps = ({ permissions, auth }) => ({
  permissionsData: permissions.permissionsData,
  userId: auth.userDetails.userId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getPermissions,
      addingPermissions
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PermissionsDetailsLeft);