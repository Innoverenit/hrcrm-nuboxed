import React, { useEffect,useState } from "react";
import { connect } from "react-redux";
import ViewEditCard from "../../../../Components/UI/Elements/ViewEditCard";
import styled from "styled-components";
import {addingModules,getModules} from "../Module/ModuleAction"
import { FlexContainer } from "../../../../Components/UI/Layout";
import { bindActionCreators } from "redux";
import { MainWrapper } from "../../../../Components/UI/Layout";
import { Select } from "../../../../Components/UI/Elements";
import { Popconfirm, Switch } from "antd";
import SingleModuleList from "./SingleModuleList";

const { Option } = Select;

const ModuleList = (props) => {

  const [rowdata, setrowData] = useState({});

  const handleRowData = (data) => {
    setrowData(data);
  };
  useEffect(() => {
    props.getModules(props.orgId);
    // props.getRequirementsDuration(props.orgId);
  }, []);

  const { crmInd } = props.moduleList;
console.log(crmInd);
const [crmStatus, setCrmStatus] = useState(crmInd);

useEffect(() => {
  setCrmStatus(crmInd);
}, [crmInd]);

const handleCrmClick = (checked) => {
  setCrmStatus(checked);
  let data = {
    value: checked,
    orgId: props.orgId,
    type: "crm",
  };
  props.addingModules(data, props.orgId);
};

  // const { mandetoryInd } = props.moduleList;
  // console.log(mandetoryInd);
  // const [mandatoryStatus, setMandatoryStatus] = useState(mandetoryInd);
  // function handleMandatoryClick(checked) {
  //   console.log(mandetoryInd);
  //   if (mandetoryInd) {
  //     //disable url
  //     props.addingModules({
  //       ...props.moduleList,
  //       orgId: props.orgId,
  //       type:"mandatory",
  //       mandetoryInd: mandetoryInd ? false : true,
  //     });
  //     setMandatoryStatus(mandetoryInd ? false : true);
  //   } else {
  //     props.addingModules(
  //       {
  //         ...props.moduleList,
  //         orgId: props.orgId,
  //         type:"mandatory",
  //         mandetoryInd: mandetoryInd ? false : true,
  //       },
  //       props.orgId
  //     );
  //     setMandatoryStatus(mandetoryInd ? false : true);
  //   }
  // }
  // function handleMandatoryCancel() {
  //   if (mandetoryInd) {
  //     setMandatoryStatus(true);
  //   } else {
  //     setMandatoryStatus(false);
  //   }
  // }


  const { erpInd } = props.moduleList;
  console.log(erpInd);
  const [erpStatus, setErpStatus] = useState(erpInd);
  useEffect(() => {
    setErpStatus(erpInd);
  }, [erpInd]);
  
  const handleErpClick = (checked) => {
    setErpStatus(checked);
    let data = {
      value: checked,
      orgId: props.orgId,
      type: "erp",
    };
    props.addingModules(data, props.orgId);
  };

  const { imInd } = props.moduleList;
  console.log(imInd);
  const [imStatus, setImStatus] = useState(imInd);
  
  useEffect(() => {
    setImStatus(imInd);
  }, [imInd]);
  
  const handleImClick = (checked) => {
    setImStatus(checked);
    let data = {
      value: checked,
      orgId: props.orgId,
      type: "im",
    };
    props.addingModules(data, props.orgId);
  };
 




  

  const { productionInd } = props.moduleList;
  console.log(productionInd);
  const [productionStatus, setProductionStatus] = useState(productionInd);
  useEffect(() => {
    setProductionStatus(productionInd);
  }, [productionInd]);
  
  const handleProductionClick = (checked) => {
    setProductionStatus(checked);
    let data = {
      value: checked,
      orgId: props.orgId,
      type: "production",
    };
    props.addingModules(data, props.orgId);
  };

  const { recruitProInd } = props.moduleList;
  console.log(recruitProInd);
  const [recruitProStatus, setRecruitProStatus] = useState(recruitProInd);

  useEffect(() => {
    setRecruitProStatus(recruitProInd);
  }, [recruitProInd]);
  
  const handleRecruitProClick = (checked) => {
    setRecruitProStatus(checked);
    let data = {
      value: checked,
      orgId: props.orgId,
      type: "recruitPro",
    };
    props.addingModules(data, props.orgId);
  };

  const { repairInd } = props.moduleList;
  console.log(repairInd);
  const [repairStatus, setRepairStatus] = useState(repairInd);
  useEffect(() => {
    setRepairStatus(repairInd);
  }, [repairInd]);
  
  const handleRepairClick = (checked) => {
    setRepairStatus(checked);
    let data = {
      value: checked,
      orgId: props.orgId,
      type: "repair",
    };
    props.addingModules(data, props.orgId);
  };

  const { inventoryInd } = props.moduleList;
  console.log(inventoryInd);
  const [inventoryStatus, setInventoryStatus] = useState(inventoryInd);
  useEffect(() => {
    setInventoryStatus(inventoryInd);
  }, [inventoryInd]);
  
  const handleInventoryClick = (checked) => {
    setInventoryStatus(checked);
    let data = {
      value: checked,
      orgId: props.orgId,
      type: "inventory",
    };
    props.addingModules(data, props.orgId);
  };

  const { orderManagementInd } = props.moduleList;
  console.log(orderManagementInd);
  const [orderManagStatus, setOrderManagStatus] = useState(orderManagementInd);
  useEffect(() => {
    setOrderManagStatus(orderManagementInd);
  }, [orderManagementInd]);
  
  const handleOrderManagementClick = (checked) => {
    setOrderManagStatus(checked);
    let data = {
      value: checked,
      orgId: props.orgId,
      type: "orderManagement",
    };
    props.addingModules(data, props.orgId);
  };

  const { logisticsInd } = props.moduleList;
  console.log(logisticsInd);
  const [logisticsStatus, setLogisticsStatus] = useState(logisticsInd);

  useEffect(() => {
    setLogisticsStatus(logisticsInd);
  }, [logisticsInd]);
  
  const handleLogisticClick = (checked) => {
    setLogisticsStatus(checked);
    let data = {
      value: checked,
      orgId: props.orgId,
      type: "logistics",
    };
    props.addingModules(data, props.orgId);
  };


  const { procurementInd } = props.moduleList;
  console.log(procurementInd);
  const [procurmentStatus, setProcurmentStatus] = useState(procurementInd);
  useEffect(() => {
    setProcurmentStatus(procurementInd);
  }, [procurementInd]);
  
  const handleProcurmentClick = (checked) => {
    setProcurmentStatus(checked);
    let data = {
      value: checked,
      orgId: props.orgId,
      type: "procurement",
    };
    props.addingModules(data, props.orgId);
  };

  const { eLearningInd } = props.moduleList;
  console.log(eLearningInd);
  const [elearningStatus, setElearningStatus] = useState(eLearningInd);
  useEffect(() => {
    setElearningStatus(eLearningInd);
  }, [eLearningInd]);
  
  const handleElearningClick = (checked) => {
    setElearningStatus(checked);
    let data = {
      value: checked,
      orgId: props.orgId,
      type: "elearning",
    };
    props.addingModules(data, props.orgId);
  };

    return (
      <>
        <div flexWrap="nowrap">
          <MainWrapper
            style={{
              flexBasis: "100%",
              overflow: "auto",
              color: "#FFFAFA",
            }}
          >
            <div class=" flex flex-col" >
              {/* <Title style={{ padding: 8 }}>Designation</Title> */}
              <MainWrapper style={{ height: "30em", marginTop: "0.625em" }}>
              <DepartmentWrapper>
        <ViewEditCard>
          {({ viewType }, toggleViewType) =>
            viewType === "view" ? (
              <div class="flex" >
                <div class="w-full flex-row">
              <div class=" flex " >
             
                    <h1>CRM</h1>
                    <div   class=" w-[7%] ml-2">
                    {/* <Popconfirm
                        title="Do you wish to change Status ? "
                        onConfirm={handleCrmClick}
                        // onCancel={handleCrmCancel}
                        okText="Yes"
                        cancelText="No"
                      > */}
                        <Switch
                          style={{ width: "5em" }}
                          onChange={handleCrmClick}
                          checked={crmStatus || crmInd}
                          // checked={crmStatus || crmInd}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      {/* </Popconfirm> */}
                    </div>
                
                  

                    <h1>IM</h1>
                    <div   class=" w-[7%] ml-2">
                    {/* <Popconfirm
                        title="Do you wish to change Status ? "
                        onConfirm={handleImClick}
                        onCancel={handleImCancel}
                        okText="Yes"
                        cancelText="No"
                      > */}
                        <Switch
                          style={{ width: "5em" }}
                          onChange={handleImClick}
                         
                          checked={imStatus || imInd}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      {/* </Popconfirm> */}
                    </div>

                    {/* <h1>Account</h1>
                    <div   class=" w-[7%] ml-2">
                    <Popconfirm
                        title="Do you wish to change Status ? "
                        onConfirm={handleAccountClick}
                        onCancel={handleAccountCancel}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Switch
                          style={{ width: "5em" }}
                          checked={accountStatus || accountInd}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      </Popconfirm>
                    </div> */}
                    {/* <h1>RecruitOpps</h1>
                    <div   class=" w-[7%] ml-2">
                    <Popconfirm
                        title="Do you wish to change Status ? "
                        onConfirm={handleRecruitClick}
                        onCancel={handleRecruitCancel}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Switch
                          style={{ width: "5em" }}
                          checked={recruitStatus || recruitOppsInd}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      </Popconfirm>
                    </div>
*/}
                    {/* <h1>HR</h1>
                    <div   class=" w-[7%] ml-2">
                    <Popconfirm
                        title="Do you wish to change Status ? "
                        onConfirm={handleHrClick}
                        onCancel={handleHrCancel}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Switch
                          style={{ width: "5em" }}
                          checked={hrStatus || hrInd}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      </Popconfirm>
                    </div>  */}


                   

                  
           
                    <h1>Rcruitpro</h1>
                    <div   class=" w-[7%] ml-2">
                    {/* <Popconfirm
                        title="Do you wish to change Status ? "
                        onConfirm={handleRecruitProClick}
                        // onCancel={handleRecruitProCancel}
                        okText="Yes"
                        cancelText="No"
                      > */}
                        <Switch
                          style={{ width: "5em" }}
                          onChange={handleRecruitProClick}
                          checked={recruitProStatus || recruitProInd}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      {/* </Popconfirm> */}
                    </div>
                    <h1>Elearning</h1>
                    <div   class=" w-[7%] ml-2">
                    {/* <Popconfirm
                        title="Do you wish to change Status ? "
                        onConfirm={handleElearningClick}
                        onCancel={handleElearningCancel}
                        okText="Yes"
                        cancelText="No"
                      > */}
                        <Switch
                          style={{ width: "5em" }}
                          onChange={handleElearningClick}
                          checked={elearningStatus || eLearningInd}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      {/* </Popconfirm> */}
                    </div>

                   

                   
                   
                
              </div>
              </div>
              <div>
                
              
                 
                </div> 
              </div>
              
            ) : (
                <FlexContainer>
                  {/* <TextInput
                    name={name}
                    // value={value || departmentName}
                    defaultValue={departmentName}
                    onChange={handleChange}
                    style={{ width: "60%" }}
                  />
                  <Select 
              defaultValue={sectorName}
               style={{width:"40%"}}
               placeholder="Select Sectors"
               onChange={this.handleSectorId}
               >
                            {this.props.sectors.map((item) => {
                                return <Option value={item.sectorId}>{item.sectorName} </Option>;
                            })}
               </Select> */}
                  <br />
                  <br />
              
                </FlexContainer>
              )
          }
        </ViewEditCard>
      </DepartmentWrapper>
                {/* {departments.length ? (
                  departments.map((department, i) => ( */}
                    <SingleModuleList
                    handleProcurmentClick={handleProcurmentClick}
                    // handleProcurmentCancel={handleProcurmentCancel}
                    procurmentStatus={procurmentStatus}

handleLogisticClick={handleLogisticClick}
// handleLogisticCancel={handleLogisticCancel}
logisticsStatus={logisticsStatus}
                      handleOrderManagementClick={handleOrderManagementClick}
                      // handleOrderManagementCancel={handleOrderManagementCancel}
                      orderManagStatus={orderManagStatus}
                   handleInventoryClick={handleInventoryClick}
                  //  handleInventoryCancel={handleInventoryCancel}
                   inventoryStatus={inventoryStatus}
                   moduleList={props.moduleList}
                      handleErpClick={handleErpClick}
                      // handleErpCancel={handleErpCancel}
                      erpStatus={erpStatus}
                      handleRepairClick={handleRepairClick}
                      // handleRepairCancel={handleRepairCancel}
                      repairStatus={repairStatus}
                      handleRowData={handleRowData}
                      rowdata={rowdata}
                      // handleSectorId={this.handleSectorId}
                      handleProductionClick={handleProductionClick}
                      productionStatus={productionStatus}
                      //  handleProductionCancel={handleProductionCancel}
                    //   handleSearchChange={this.handleSearchChange}
                    //   currentData={this.state.currentData}
                    //   setCurrentData={this.setCurrentData}
                    //  handleDeleteDepartment={this.handleDeleteDepartment}
                    />
                  {/* )) */}
                  {/* ) : (
                    <p>No Data Available</p>
                  )} */}

              </MainWrapper>
            </div>
           
          </MainWrapper>
         
        </div>
        {/* <h4>Updated on {moment(this.props.departments && this.props.departments.length && this.props.departments[0].updationDate).format("ll")} by {this.props.departments && this.props.departments.length && this.props.departments[0].name}</h4> */}
      </>
    );
  }


const mapStateToProps = ({ module, auth }) => ({
  userId: auth.userDetails.userId,
  orgId: auth.userDetails.organizationId,
  moduleList: module.moduleList,
  fetchingModules: module.fetchingModules,
  fetchingModulesError: module.fetchingModulesError,

});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getModules,
      addingModules
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(ModuleList);
const DepartmentWrapper = styled.div`
  width: 100%;
  cursor: pointer;
`;
const DepartmentName = styled.h3`
  color: ${(props) => props.theme.color || "teal"};
  font-weight: 600;
`;
const DepartmentValue = styled.h3`
  color: #999;
  font-size: 1.3rem;
`;