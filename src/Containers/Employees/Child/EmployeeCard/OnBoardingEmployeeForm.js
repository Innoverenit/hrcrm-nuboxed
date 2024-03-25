import React, { useEffect,useState } from 'react';
import { ClockCircleOutlined } from '@ant-design/icons';
import { Button,Select,Steps,Tooltip } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
 import { getProcessForOnboarding ,getProcessStagesForOnboarding} from '../../../Settings/SettingsAction';
import { Field } from 'formik';
import {addOnboardingEmployee,addEmployeeWorkflow,getUserStageList} from "../../../Employees/EmployeeAction"
import { FormattedMessage } from 'react-intl';
import { SelectComponent } from '../../../../Components/Forms/Formik/SelectComponent';
const { Option } = Select;

const OnBoardingEmployeeForm = (props) => {
  const [selectedWork, setSelectedWork] = useState("");
  const [stage, setStage] = useState("")
  const [selectedStage, setSelectedStage] = useState("");
  useEffect(() => {
    props.getProcessForOnboarding(props.orgId);
    // props.getUserStageList(props.employeeName.employeeId);
  }, []);

  const { onboardingProcess, ratingValue } = props;
  const handleWorkflowChange = (val) => {
    setSelectedWork(val)
    props.getProcessStagesForOnboarding(val);
} 

const handleStages = (val) => {
  setStage(val);
  setSelectedStage(val); // Set the selected stage ID
};

  // const handleWorkflowChange = (event) => {
  //   const selectedWork = event.target.value;
  //   setSelectedWork(selectedWork);
  //   //  setSelectedUser("");
  //    props.getProcessStagesForOnboarding(selectedWork) // Assuming you want to pass the selected department and filtered roles to a parent component
  // };
  console.log("cgdf",props.currentEmployeeId)
  return (
    <>
      <div className="mt-4 flex">
      <div class=" w-[35%]" >
                                                    <label class=" text-[#444] font-bold text-[0.75rem]" >Workflow</label>
                                                    <Select
                        style={{
                            width: 170,
                        }}
                        value={selectedWork}
                        onChange={(value) => handleWorkflowChange(value)}
                    >
                        {onboardingProcess.map((a) => {
                            return <Option value={a.unboardingWorkflowDetailsId}>{a.workflowName}</Option>;
                        })}
                    </Select>
                                                    {/* <select className="customize-select" onChange={handleWorkflowChange}>
            <option value="">Select Workflow</option>
            {onboardingProcess.map((item, index) => (
              <option key={index} value={item.unboardingWorkflowDetailsId}>
                {item.workflowName}
              </option>
            ))}
          </select> */}
        </div>
        {/* {selectedWork && (
          <>                                           
          <div class="bg-white">
          <Steps direction="vertical" current={1}>
                {props.onboardingProcessStages.map((user, index) => (
                  <Steps.Item
                  value={selectedStage}
                  onChange={(value) => handleStages(value)}
                   key={index}  title={user.stageName} 
                   
                   >
                    <div>
                     
                      <Button value={user.UnboardingStagesId}> {user.stageName}</Button>
                    </div>
                  </Steps.Item>
                ))}
              </Steps>
  

    </div>              
</> 
        )}  */}
       
       <Button
                    type='primary'
                    onClick={() => props.addEmployeeWorkflow({
                      
                        employeeId: props.employeeName.employeeId,
                        workflowId: selectedWork,
                        stageId: selectedStage,
                    
                    },
                        // props.rowData.orderPhoneId,
                        // props.locationId
                    )}>
                    Submit
                </Button>
      
       
     
      </div>
      <div class=" flex justify-end">
        <Tooltip title="Release Registration Email to the user">
          <Button
           onClick={() => {
            props.addOnboardingEmployee(props.currentEmployeeId.employeeId);
           
          }}
          >Onboarding Completed</Button>
             </Tooltip>
        </div>
    </>
  );
};

const mapStateToProps = ({ settings, employee,auth }) => ({
  onboardingProcessStages:settings.onboardingProcessStages,
  orgId: auth.userDetails && auth.userDetails.organizationId,
  onboardingProcess: settings.onboardingProcess,
  userStageList:employee.userStageList,
  setEditingEmployee:employee.setEditingEmployee,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getProcessForOnboarding,
      getProcessStagesForOnboarding,
      addOnboardingEmployee,
      getUserStageList,
      addEmployeeWorkflow,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(OnBoardingEmployeeForm);
