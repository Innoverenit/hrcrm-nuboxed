import React, { useState,useEffect } from 'react';
import { Input, Button, Select } from 'antd';
import { connect } from "react-redux";
import { base_url } from "../../../../../Config/Auth";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import MoveToggleTaskStage from "../../Child/RecruitmentTab/MoveToggleTaskStage"
import {addProcessTaskStage,getProcessTaskStage,deleteTaskStageData} from "../../../SettingsAction"
import { StyledPopconfirm } from '../../../../../Components/UI/Antd';
import { DeleteOutlined } from '@ant-design/icons';

const { Option } = Select;

const MyForm = (props) => {
  const [name, setName] = useState('');
  const [department, setDepartment] = useState([]);

  const [selectedDepartment, setSelectedDepartment] = useState(null);

  const [touchedDepartment, setTouchedDepartment] = useState(false);


  const [isLoadingDepartment, setIsLoadingDepartment] = useState(false);

  useEffect(() => {
    props.getProcessTaskStage(props.orgId,props.currentItem.stagesId);  
}, [props.currentItem.stagesId,props.orgId])

  const handleSubmit = (e) => {
    e.preventDefault();
    const data={
        stageTaskName:name,
        departmentId:selectedDepartment,
        stageId:props.currentItem.stagesId,
    }
    console.log(data)
    props.addProcessTaskStage(data)
    // console.log('Form Values:', { name, department });
  };




  const fetchDepartment = async () => {
    setIsLoadingDepartment(true);
    try {
      const apiEndpoint = `${base_url}/department/accesss/${props.orgId}`;
      const response = await fetch(apiEndpoint,{
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${props.token}`,
          'Content-Type': 'application/json',
          // Add any other headers if needed
        },
      });
      const data = await response.json();
      setDepartment(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setIsLoadingDepartment(false);
    }
  };



  const handleSelectDepartmentFocus = () => {
    if (!touchedDepartment) {
     
      fetchDepartment();

      setTouchedDepartment(true);
    }
  };

  const handleSelectDepartment = (value) => {
    setSelectedDepartment(value)
    console.log('Selected user:', value);
  };

  return (
    <>
    <div>
      <div style={{ marginBottom: '16px' }}>
        <label style={{ display: 'block', marginBottom: '8px' }}>Name</label>
        <Input 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="Enter your name" 
          required 
        />
      </div>

      <div style={{ marginBottom: '16px' }}>
        <label style={{ display: 'block', marginBottom: '8px' }}>Department</label>
        {/* <Select
          value={department}
          onChange={(value) => setDepartment(value)}
          placeholder="Select your department"
          style={{ width: '100%' }}
          required
        >
          <Option value="hr">HR</Option>
          <Option value="engineering">Engineering</Option>
          <Option value="marketing">Marketing</Option>
          <Option value="sales">Sales</Option>
        </Select> */}


<Select
        showSearch
        style={{ width: 100 }}
        //value={selectedDepartment}
        placeholder="Search or select currency"
        optionFilterProp="children"
        loading={isLoadingDepartment}
        onFocus={handleSelectDepartmentFocus}
         onChange={handleSelectDepartment}
        //onChange={(value) => setSelectedDepartment(value)}
      >
        {department.map(dept => (
          <Option key={dept.departmentId} value={dept.departmentId}>
            {dept.departmentName}
          </Option>
        ))}
      </Select>
      </div>

      <Button type="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </div>
    <div className='flex sticky z-auto' style={{width:"62em"}}>
            <div className="rounded m-1 p-1 w-[99%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
                <div className="flex w-[99%] p-1 bg-transparent font-bold sticky  z-10">
                    <div className=""></div>
                    <div className="md:w-[22.12rem]">
                  
                      <FormattedMessage id="app.name" defaultMessage="Name" />
                      </div>
                   
                    <div className=""></div>
                    <div className="md:w-[15.5rem]"><FormattedMessage id="app.department" defaultMessage="Department" /></div>
                
                </div>
            
                {props.processTaskedStage.map((item, index) => {
                    return (
                        <div key={index}>
                            <div className="flex rounded mt-1 bg-white h-8 items-center p-1 scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1 leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]">
                                <div className="flex font-medium flex-col md:w-[36.1rem] max-sm:w-full">
                                    <div 
                                    className="flex justify-between text-sm  font-semibold font-poppins"
                                    //style={{ color: idsFromData1.includes(item.cellChamberLinkId) ? 'blue' : 'black' }}
                                    >
                                        {item.stageTaskName}
                                    </div>
                                </div>

                                <div className="flex font-medium flex-col md:w-26 max-sm:justify-between w-full max-sm:flex-row">
                                    <div className="font-normal text-[0.85rem]  font-poppins" style={{ marginLeft: "9em" }}>
                                   {item.department} 
                                    </div>
                                </div>


                                <div className="flex font-medium flex-col md:w-26 max-sm:justify-between w-full max-sm:flex-row">
                                    <div className="font-normal text-[0.85rem]  font-poppins" style={{ marginLeft: "9em" }}>
                                    <StyledPopconfirm
            title="Do you want to delete?"
            onConfirm={() => props.deleteTaskStageData(item.stagesTaskId,false)}
          >
           
            <DeleteOutlined
            // loading={props.deleteOpportunityData}
            type="delete" className="!text-icon cursor-pointer text-[red]" />
           
          </StyledPopconfirm>
                                    </div>
                                </div>


                                <div className="flex font-medium flex-col md:w-26 max-sm:justify-between w-full max-sm:flex-row">
                                    <div className="font-normal text-[0.85rem]  font-poppins" style={{ marginLeft: "9em" }}>
              <MoveToggleTaskStage
              item={item}
              />
                                    </div>
                                </div>




                               






       

                               
                            </div>
                        </div>
                    );
                })} 
               
            </div>
        </div>
    </>
  );
};



const mapStateToProps = ({ auth, customer,settings,employee ,catgCustomer,sector,leads}) => ({
   
    token: auth.token,
    
    orgId: auth.userDetails.organizationId,
    processTaskedStage:settings.processTaskedStage,
  });
  
  const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
      {
        addProcessTaskStage,
        getProcessTaskStage,
        deleteTaskStageData
      },
      dispatch
    );
  
  export default connect(mapStateToProps, mapDispatchToProps)(MyForm);


