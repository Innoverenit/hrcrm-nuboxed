import React, { useEffect, useState} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { handleSequenceModal } from "../../../../Settings/SettingsAction";
import {  Switch, Popconfirm } from "antd";
import {
  MainWrapper,
} from "../../../../../Components/UI/Layout";
import {
  addingCommunicationAccess,
  getCommunicationAccess,
} from "../../../../Settings/SettingsAction";
import SequenceForm from "./SequenceForm";

function JobPortalForm(props) {
  useEffect(() => {
    props.getCommunicationAccess(props.orgId);
  }, []);

  const { emailCustomerInd } = props.communicationAccess;
  console.log(emailCustomerInd);
  const [toggle, setToggle] = useState(emailCustomerInd);

  function handleEmailClick(checked) {
    console.log(emailCustomerInd);
    if (emailCustomerInd) {
      //disable url
      props.addingCommunicationAccess({
        ...props.communicationAccess,
        orgId: props.orgId,
        emailCustomerInd: emailCustomerInd ? false : true,
      });
      setToggle(emailCustomerInd ? false : true);
    } else {
      props.addingCommunicationAccess(
        {
          ...props.communicationAccess,
          orgId: props.orgId,
          emailCustomerInd: emailCustomerInd ? false : true,
        },
        props.orgId
      );
      setToggle(emailCustomerInd ? false : true);
    }
  }
  function handleCancel() {
    if (emailCustomerInd) {
      setToggle(true);
    } else {
      setToggle(false);
    }
  }

  const { emailJobDesInd } = props.communicationAccess;
  console.log(emailJobDesInd);
  const [jobDesInd, setemailJobDesInd] = useState(emailJobDesInd);

  function handleEmailJobClick(checked) {
    console.log(emailJobDesInd);
    if (emailJobDesInd) {
      //disable url
      props.addingCommunicationAccess({
        ...props.communicationAccess,
        orgId: props.orgId,
        emailJobDesInd: emailJobDesInd ? false : true,
      });
      setemailJobDesInd(emailJobDesInd ? false : true);
    } else {
      props.addingCommunicationAccess(
        {
          ...props.communicationAccess,
          orgId: props.orgId,
          emailJobDesInd: emailJobDesInd ? false : true,
        },
        props.orgId
      );
      setemailJobDesInd(emailJobDesInd ? false : true);
    }
  }
  function handleCancel() {
    if (emailJobDesInd) {
      setemailJobDesInd(true);
    } else {
      setemailJobDesInd(false);
    }
  }

  const { whatsappCustomerInd } = props.communicationAccess;
  console.log(whatsappCustomerInd);
  const [whatsappsCustomerInd, setwhatsappsCustomerInd] = useState(
    whatsappCustomerInd
  );

  function handleWpClick(checked) {
    console.log(whatsappCustomerInd);
    if (whatsappCustomerInd) {
      //disable url
      props.addingCommunicationAccess({
        ...props.communicationAccess,
        orgId: props.orgId,
        whatsappCustomerInd: whatsappCustomerInd ? false : true,
      });
      setwhatsappsCustomerInd(whatsappCustomerInd ? false : true);
    } else {
      props.addingCommunicationAccess(
        {
          ...props.communicationAccess,
          orgId: props.orgId,
          whatsappCustomerInd: whatsappCustomerInd ? false : true,
        },
        props.orgId
      );
      setwhatsappsCustomerInd(whatsappCustomerInd ? false : true);
    }
  }
  function handleCancel() {
    if (whatsappCustomerInd) {
      setwhatsappsCustomerInd(true);
    } else {
      setwhatsappsCustomerInd(false);
    }
  }

  const { whatsappJobDesInd } = props.communicationAccess;
  console.log(whatsappJobDesInd);
  const [jobInd, setwhatsappJobDesInd] = useState(emailJobDesInd);

  function handleWpJobClick(checked) {
    console.log(whatsappJobDesInd);
    if (whatsappJobDesInd) {
      //disable url
      props.addingCommunicationAccess({
        ...props.communicationAccess,
        orgId: props.orgId,
        whatsappJobDesInd: whatsappJobDesInd ? false : true,
      });
      setwhatsappJobDesInd(whatsappJobDesInd ? false : true);
    } else {
      props.addingCommunicationAccess(
        {
          ...props.communicationAccess,
          orgId: props.orgId,
          whatsappJobDesInd: whatsappJobDesInd ? false : true,
        },
        props.orgId
      );
      setwhatsappJobDesInd(whatsappJobDesInd ? false : true);
    }
  }
  function handleCancel() {
    if (whatsappJobDesInd) {
      setwhatsappJobDesInd(true);
    } else {
      setwhatsappJobDesInd(false);
    }
  }


  const { candidateEventUpdateInd } = props.communicationAccess;
  console.log(candidateEventUpdateInd);
  const [updateInd, setUpdateInd] = useState(candidateEventUpdateInd);

  function handleUpdateEventClick(checked) {
    console.log(candidateEventUpdateInd);
    if (candidateEventUpdateInd) {
      //disable url
      props.addingCommunicationAccess({
        ...props.communicationAccess,
        orgId: props.orgId,
        candidateEventUpdateInd: candidateEventUpdateInd ? false : true,
      });
      setUpdateInd(candidateEventUpdateInd ? false : true);
    } else {
      props.addingCommunicationAccess(
        {
          ...props.communicationAccess,
          orgId: props.orgId,
          candidateEventUpdateInd: candidateEventUpdateInd ? false : true,
        },
        props.orgId
      );
      setUpdateInd(candidateEventUpdateInd ? false : true);
    }
  }
  function handleCancel() {
    if (candidateEventUpdateInd) {
      setUpdateInd(true);
    } else {
      setUpdateInd(false);
    }
  }


  const { candiPipelineEmailInd } = props.communicationAccess;
  console.log(candiPipelineEmailInd);
  const [pipelineInd, setEmailPipelineInd] = useState(candiPipelineEmailInd);

  function handleEmailPipelineClick(checked) {
    console.log(candiPipelineEmailInd);
    if (candiPipelineEmailInd) {
      //disable url
      props.addingCommunicationAccess({
        ...props.communicationAccess,
        orgId: props.orgId,
        candiPipelineEmailInd: candiPipelineEmailInd ? false : true,
      });
      setEmailPipelineInd(candiPipelineEmailInd ? false : true);
    } else {
      props.addingCommunicationAccess(
        {
          ...props.communicationAccess,
          orgId: props.orgId,
          candiPipelineEmailInd: candiPipelineEmailInd ? false : true,
        },
        props.orgId
      );
      setEmailPipelineInd(candiPipelineEmailInd ? false : true);
    }
  }
  function handleCancel() {
    if (candiPipelineEmailInd) {
      setEmailPipelineInd(true);
    } else {
      setEmailPipelineInd(false);
    }
  }



  const { candiWorkflowEnabledInstInd } = props.communicationAccess;
  console.log(candiWorkflowEnabledInstInd);
  const [workflowInd, setWorkflowEnabledInd] = useState(candiWorkflowEnabledInstInd);

  function handleWorkflowClick(checked) {
    console.log(candiWorkflowEnabledInstInd);
    if (candiWorkflowEnabledInstInd) {
      //disable url
      props.addingCommunicationAccess({
        ...props.communicationAccess,
        orgId: props.orgId,
        candiWorkflowEnabledInstInd: candiWorkflowEnabledInstInd ? false : true,
      });
      setWorkflowEnabledInd(candiWorkflowEnabledInstInd ? false : true);
    } else {
      props.addingCommunicationAccess(
        {
          ...props.communicationAccess,
          orgId: props.orgId,
          candiWorkflowEnabledInstInd: candiWorkflowEnabledInstInd ? false : true,
        },
        props.orgId
      );
      setWorkflowEnabledInd(candiWorkflowEnabledInstInd ? false : true);
    }
  }
  function handleCancel() {
    if (candiWorkflowEnabledInstInd) {
      setWorkflowEnabledInd(true);
    } else {
      setWorkflowEnabledInd(false);
    }
  }

  const { addSequenceModal, handleSequenceModal } = props;

  return (
    <MainWrapper style={{ height: "446px", width: "", overflow: "auto" }}>
      <div class=" mt-3" />
      <div class=" flex flex-row flex-wrap items-start self-start justify-between grow shrink h-auto w-full mr-auto ">
      
          <div>
            <div class=" text-xs  font-bold font-poppins  "
              style={{
                flexBasis: "13%",
                // marginTop: "0.625em",
                fontSize: "1em",
                fontStyle: "italic",
              }}
            >
              Email
            </div>
          </div>
          <div class=" mt-3" />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <p>Share Talent data with Customer</p>
            <div>
              <Popconfirm
                title="Do you wish to change Status ? "
                onConfirm={handleEmailClick}
                onCancel={handleCancel}
                okText="Yes"
                cancelText="No"
              >
                <Switch
                  style={{ width: "5em" }}
                  checked={toggle || emailCustomerInd}
                  checkedChildren="Yes"
                  unCheckedChildren="No"
                />
              </Popconfirm>
            </div>
          </div>

          <div class=" mt-3" />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <p>Share Job Description with Talent</p>
            <div>
              <Popconfirm
                title="Do you wish to change Status ? "
                onConfirm={handleEmailJobClick}
                onCancel={handleCancel}
                okText="Yes"
                cancelText="No"
              >
                <Switch
                  style={{ width: "5em" }}
                  checked={jobDesInd || emailJobDesInd}
                  checkedChildren="Yes"
                  unCheckedChildren="No"
                />
              </Popconfirm>
            </div>
          </div>
          <div class=" mt-3" />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <p>Update Candidate On Events</p>
            <div>
              <Popconfirm
                title="Do you wish to change Status ? "
                 onConfirm={handleUpdateEventClick}
                onCancel={handleCancel}
                okText="Yes"
                cancelText="No"
              >
                <Switch
                  style={{ width: "5em" }}
                   checked={updateInd||candidateEventUpdateInd}
                  checkedChildren="Yes"
                  unCheckedChildren="No"
                />
              </Popconfirm>
            </div>
          </div>
          <div class=" mt-3" />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <p>Share hiring pipeline with customer</p>
            <div>
              <Popconfirm
                title="Do you wish to change Status ? "
                 onConfirm={handleEmailPipelineClick}
                onCancel={handleCancel}
                okText="Yes"
                cancelText="No"
              >
                <Switch
                  style={{ width: "5em" }}
                   checked={pipelineInd||candiPipelineEmailInd}
                  checkedChildren="Yes"
                  unCheckedChildren="No"
                />
              </Popconfirm>
            </div>
          </div>
          {/* <div style={{ width: "50%" }}>
            <Button
              // onClick={handleSequenceButtonClick}

              onClick={() => handleSequenceModal(true)}
            >
              + Sequence
            </Button>
          </div> */}
          <div class=" mt-3" />
      

        <div
          style={{
            height: "100%",
            width: "44%",
            // marginTop: "0.625em",
            marginRight: "0.75em",
          }}
        >
          <div>
            <div class=" text-xs  font-bold font-poppins  "
              style={{
                flexBasis: "13%",
                // marginTop: "0.625em",
                fontSize: "1em",
                fontStyle: "italic",
              }}
            >
              Whatsapp
            </div>
          </div>
          <div class=" mt-3" />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            {" "}
            <p>Share Talent data with Customer</p>
            <div>
              <Popconfirm
                title="Do you wish to change Status ? "
                onConfirm={handleWpClick}
                onCancel={handleCancel}
                okText="Yes"
                cancelText="No"
              >
                <Switch
                  style={{ width: "5em" }}
                  checked={whatsappsCustomerInd || whatsappCustomerInd}
                  checkedChildren="Yes"
                  unCheckedChildren="No"
                />
              </Popconfirm>
            </div>
          </div>
          <div class=" mt-3" />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <p>Share Job Description with Talent</p>
            <div>
              <Popconfirm
                title="Do you wish to change Status ? "
                onConfirm={handleWpJobClick}
                onCancel={handleCancel}
                okText="Yes"
                cancelText="No"
              >
                <Switch
                  style={{ width: "5em" }}
                  checked={jobInd || whatsappJobDesInd}
                  checkedChildren="Yes"
                  unCheckedChildren="No"
                />
              </Popconfirm>
            </div>
          </div>
          <div class=" mt-3" />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <p>Workflow will be enabled if candidate is interested</p>
            <div>
              <Popconfirm
                title="Do you wish to change Status ? "
                onConfirm={handleWorkflowClick}
                onCancel={handleCancel}
                okText="Yes"
                cancelText="No"
              >
                <Switch
                  style={{ width: "5em" }}
                  checked={workflowInd || candiWorkflowEnabledInstInd}
                  checkedChildren="Yes"
                  unCheckedChildren="No"
                />
              </Popconfirm>
            </div>
          </div>
        </div>
      </div>
      <SequenceForm />

      {/* <AddSequenceModal
        addSequenceModal={addSequenceModal}
        handleSequenceModal={handleSequenceModal}
      /> */}
    </MainWrapper>
  );
}

const mapStateToProps = ({ settings, auth }) => ({
  orgId: auth.userDetails.organizationId,
  userId: auth.userDetails.userId,
  addSequenceModal: settings.addSequenceModal,
  communicationAccess: settings.communicationAccess,
  fetchingCommunicationAccess: settings.fetchingCommunicationAccess,
  fetchingCommunicationAccessError: settings.fetchingCommunicationAccessError,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getCommunicationAccess,
      addingCommunicationAccess,
      handleSequenceModal,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(JobPortalForm);
