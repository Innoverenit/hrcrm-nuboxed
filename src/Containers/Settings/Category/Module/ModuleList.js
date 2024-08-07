import React, { useEffect,useState,lazy } from "react";
import { connect } from "react-redux";
import ViewEditCard from "../../../../Components/UI/Elements/ViewEditCard";
import {addingModules,getModules} from "../Module/ModuleAction"
import { bindActionCreators } from "redux";
import { MainWrapper } from "../../../../Components/UI/Layout";
import { Select } from "../../../../Components/UI/Elements";
import {  Popconfirm, Switch } from "antd";
import dayjs from "dayjs";
import FWLogo from "../../../../Assets/Images/crm.jpg";
import FWLogo1 from "../../../../Assets/Images/Im.jpg";
import FWLogo2 from "../../../../Assets/Images/Hr.jpg";
import FWLogo3 from "../../../../Assets/Images/Recruitpro.jpg";
import FWLogo4 from "../../../../Assets/Images/elearning.jpg";
import FWLogo5 from "../../../../Assets/Images/payment.jpg";
import { BundleLoader } from "../../../../Components/Placeholder";
import ModuleTrading from "./ModuleTrading";
import {handleStripeModal} from "./ModuleAction";
import StripePaymentModal from "./Stripe/StripePaymentModal";

const SingleModuleList = lazy(() =>
  import("./SingleModuleList")
);


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

const { financeInd } = props.moduleList;
console.log(financeInd);
const [financeStatus, setFinanceStatus] = useState(financeInd);

useEffect(() => {
  setFinanceStatus(financeInd);
}, [financeInd]);

const handleFinanceClick = (checked) => {
  setFinanceStatus(checked);
  let data = {
    value: checked,
    orgId: props.orgId,
    type: "finance",
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
  // props.handleStripeModal(true);
    setErpStatus(checked);
    let data = {
      value: checked,
      orgId: props.orgId,
      type: "erp",
    };
    props.addingModules(data, props.orgId);
    
  };


  
  const { tradingInd } = props.moduleList;
  console.log(tradingInd);
  const [tradingStatus, setTradingStatus] = useState(tradingInd);
  useEffect(() => {
    setTradingStatus(tradingInd);
  }, [tradingInd]);
  
  const handleTradingClick = (checked) => {
    setTradingStatus(checked);
    let data = {
      value: checked,
      orgId: props.orgId,
      type: "trading",
    };
    props.addingModules(data, props.orgId);
  };


  const { ecomModInd } = props.moduleList;
  console.log(ecomModInd);
  const [ecomStatus, setEcomStatus] = useState(ecomModInd);
  useEffect(() => {
    setEcomStatus(ecomModInd);
  }, [ecomModInd]);
  
  const handleEcomClick = (checked) => {
    setEcomStatus(checked);
    let data = {
      value: checked,
      orgId: props.orgId,
      type: "ecomModule",
    };
    props.addingModules(data, props.orgId);
  };

  const { catalogPublishInd } = props.moduleList;
  console.log(catalogPublishInd);
  const [catalogueStatus, setCatalogueStatus] = useState(catalogPublishInd);
  useEffect(() => {
    setCatalogueStatus(catalogPublishInd);
  }, [catalogPublishInd]);
  
  const handleCatalougeClick = (checked) => {
    setCatalogueStatus(checked);
    let data = {
      value: checked,
      orgId: props.orgId,
      type: "erp",
    };
    props.addingModules(data, props.orgId);
  };

  const { materialPublishInd } = props.moduleList;
  console.log(materialPublishInd);
  const [materialStatus, setMaterialStatus] = useState(materialPublishInd);
  useEffect(() => {
    setMaterialStatus(materialPublishInd);
  }, [materialPublishInd]);
  
  const handleMaterialClick = (checked) => {
    setMaterialStatus(checked);
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

  const { hrInd } = props.moduleList;
  console.log(hrInd);
  const [hrStatus, setHrStatus] = useState(hrInd);
  
  useEffect(() => {
    setHrStatus(hrInd);
  }, [hrInd]);
  
  const handleHrClick = (checked) => {
    setHrStatus(checked);
    let data = {
      value: checked,
      orgId: props.orgId,
      type: "hr",
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

  const { elearningInd } = props.moduleList;
  console.log(elearningInd);
  const [elearningStatus, setElearningStatus] = useState(elearningInd);
  useEffect(() => {
    setElearningStatus(elearningInd);
  }, [elearningInd]);
  
  const handleElearningClick = (checked) => {
    setElearningStatus(checked);
    let data = {
      value: checked,
      orgId: props.orgId,
      type: "elearning",
    };
    props.addingModules(data, props.orgId);
  };
  
  if (props.fetchingModules) return <BundleLoader/>;
    return (
      <>
        <div flexWrap="nowrap">
          {/* <MainWrapper
            style={{
              flexBasis: "100%",
              overflow: "auto",
              color: "#FFFAFA",
              
            }}
          > */}
            <div class=" flex flex-col" >
              {/* <Title style={{ padding: 8 }}>Designation</Title> */}
              <MainWrapper style={{  marginTop: "0.625em", cursor:"pointer",height: "79vh", }}>
              {/* <div class=" w-full cursor-pointer"> */}
        <ViewEditCard>
          {({ viewType }, toggleViewType) =>
            viewType === "view" ? (
              <div class="flex" >
                <div class="w-full flex-row">
              <div class=" flex " >
             <div class=" h-[12rem] bg-white shadow border-2 flex flex-col rounded-lg scale-95 hover:scale-100">
             <div className=" flex h-28 justify-center "> 
              <img
              className="big-logo w-36 h-24 m-2"
              src={FWLogo}
              alt="Tekorero logo"
            /></div>
            <div class="flex  flex-col justify-center mt-1">
                <div class="flex flex-row  justify-center"> 
                  <div class=" text-sm font-semibold">CRM</div>
                    <div   class=" ml-2">
                    <Popconfirm
                        title="Do you wish to change Status ? "
                        onConfirm={() => handleCrmClick(!crmStatus)}
                        // onCancel={handleCrmCancel}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Switch className="w-[5rem]"
                          onChange={() => {}}
                          // onChange={handleCrmClick}
                          checked={crmStatus || crmInd}
                          // checked={crmStatus || crmInd}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      </Popconfirm>
                      
                    </div>
                    </div>
                   
                    <div class="text-xs text-center"> Manage interactions and relationships, streamline processes.</div>
                    </div>
                    
                    </div>
                    <div class=" h-[12rem] bg-white shadow border-2 flex flex-col rounded-lg scale-95 hover:scale-100">
           <div className=" flex h-28 justify-center"> 
              <img
              className="big-logo w-36 h-24 m-2"
              src={FWLogo5}
            
              alt="Tekorero logo"
            /></div>
            <div class="flex flex-col justify-center mt-1">
              <div class="flex flex-row  justify-center">
              <div class=" text-sm font-semibold ">Finance</div>
                    <div   class="  ml-2">
                    <Popconfirm
                              title="Do you wish to change Status?"
                              onConfirm={() => handleFinanceClick(!financeStatus)}
                              okText="Yes"
                              cancelText="No"
                            >
                                              <Switch
                              onChange={() => {}}
                        //  onChange={this.props.handleErpClick}
                          style={{ width: "4em" }}
                          checked={financeStatus || props.moduleList.financeInd}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      </Popconfirm>
                    </div>
                    </div>
                    <div class="text-xs text-center">Handle transactions and invoicing, track budgets.</div>
                    </div>
                    </div>
                    <div class=" h-[12rem] bg-white shadow border-2 flex flex-col rounded-lg scale-95 hover:scale-100">
                     <div className=" flex h-28 justify-center"> 
              <img
              className="big-logo w-36 h-24 m-2"
              src={FWLogo1}
              alt="Tekorero logo"
            /></div>
             <div class="flex flex-col justify-center mt-1">
             <div class="flex flex-row  justify-center">
                    <div class=" text-sm font-semibold  ml-2">IM</div>
                    <div   class="  ml-2">
                    <Popconfirm
                        title="Do you wish to change Status ? "
                        onConfirm={() => handleImClick(!imStatus)}
                        // onCancel={handleImCancel}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Switch
                          className="w-[5rem]"
                          // onChange={handleImClick}
                          onChange={() => {}}
                          checked={imStatus || imInd}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      </Popconfirm>
                    </div>
                    </div>
                    <div class="text-xs text-center"> Investor outreach and fund management.</div>
                    </div>
                    </div>
                    {/* <div>Account</div>
                    <div   class=" w-[7%] ml-2">
                    <Popconfirm
                        title="Do you wish to change Status ? "
                        onConfirm={handleAccountClick}
                        onCancel={handleAccountCancel}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Switch
                          className="w-[5rem]"
                          checked={accountStatus || accountInd}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      </Popconfirm>
                    </div> */}
                    {/* <div>RecruitOpps</div>
                    <div   class=" w-[7%] ml-2">
                    <Popconfirm
                        title="Do you wish to change Status ? "
                        onConfirm={handleRecruitClick}
                        onCancel={handleRecruitCancel}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Switch
                          className="w-[5rem]"
                          checked={recruitStatus || recruitOppsInd}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      </Popconfirm>
                    </div>
*/}
 <div class=" h-[12rem] bg-white shadow border-2 flex flex-col rounded-lg scale-95 hover:scale-100">
 <div className=" flex h-28 justify-center"> 
              <img
              className="big-logo w-36 h-24 m-2"
              src={FWLogo2}
              alt="Tekorero logo"
            /></div>
            <div class="flex flex-col justify-center mt-1">
              
             <div class="flex flex-row  justify-center">
                      <div class=" text-sm  ml-2 font-semibold">HR</div>
                    <div   class="  ml-2">
                    <Popconfirm
                        title="Do you wish to change Status ? "
                        onConfirm={() => handleHrClick(!hrStatus)}
                        // onCancel={handleHrCancel}
                        okText="Yes"
                        cancelText="No"
                      >
                   
                        <Switch
                         className="w-[5rem]"
                         onChange={() => {}}
                        
                         checked={hrStatus || hrInd}
                         checkedChildren="Yes"
                         unCheckedChildren="No"
                         
                        />
                              </Popconfirm>
                    
                    </div> 
                    </div>
                    <div class="text-xs text-center"> Manage employee goals and performance.</div>
                    </div>
                    </div>

                   

                    <div class=" h-[12rem] bg-white shadow border-2 flex flex-col rounded-lg scale-95 hover:scale-100">
                    <div className=" flex h-28 justify-center"> 
              <img
              className="big-logo w-36 h-24 m-2"
              src={FWLogo3}
              alt="Tekorero logo"
            /></div>
            <div class="flex flex-col justify-center mt-1">
           
            <div class="flex flex-row  justify-center">
                    <div class=" text-sm  ml-2 font-semibold">RecruitPro</div>
                    <div   class=" ml-2">
                    <Popconfirm
                        title="Do you wish to change Status ? "
                        onConfirm={() => handleRecruitProClick(!recruitProStatus)}
                        // onCancel={handleRecruitProCancel}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Switch
                          className="w-[5rem]"
                          onChange={() => {}}
                          // onChange={handleRecruitProClick}
                          checked={recruitProStatus || recruitProInd}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      </Popconfirm>
                    </div>
                    </div>
                    <div class="text-xs text-center"> Hire @ Scale.</div>
                    </div>
                    </div>
                    <div class=" h-[12rem] bg-white shadow border-2 flex flex-col rounded-lg scale-95 hover:scale-100">
                    <div className=" flex h-28 justify-center"> 
              <img
              className="big-logo w-36 h-24 m-2"
              src={FWLogo4}
              alt="Tekorero logo"
            /></div>
            <div class="flex flex-col justify-center mt-1">
            <div class="flex flex-row  justify-center">
                    <div class=" text-sm  ml-2 font-semibold">Elearning</div>
                    <div   class="  ml-2">
                    <Popconfirm
                        title="Do you wish to change Status ? "
                        onConfirm={() => handleElearningClick(!elearningStatus)}
                        // onCancel={handleElearningCancel}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Switch
                          className="w-[5rem]"
                          onChange={() => {}}
                          // onChange={handleElearningClick}
                          checked={elearningStatus || elearningInd}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      </Popconfirm>
                    </div>
                    </div>
                    <div class="text-xs text-center"> Interactive lessons, assessment tools.</div>
                    </div> 
                    </div>
                   

                   
                   
                
              </div>
              </div>
              <div>
                
              
                 
                </div> 
              </div>
              
            ) : (
              <div class=" flex">
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
           
              
                </div>
              )
          }
        </ViewEditCard>
      {/* </div> */}
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
                    handleStripeModal={props.handleStripeModal}
                    addStripeModal={props.addStripeModal}

                    />
                    <ModuleTrading
                     handleRowData={handleRowData}
                     rowdata={rowdata}
                          moduleList={props.moduleList}
                    tradingStatus={tradingStatus}
                    handleTradingClick={handleTradingClick}
                    ecomStatus={ecomStatus}
                    handleEcomClick={handleEcomClick}
                    handleCatalougeClick={handleCatalougeClick}
                    catalogueStatus={catalogueStatus}
                    handleMaterialClick={handleMaterialClick}
                    materialStatus={materialStatus}
                    />
                  {/* )) */}
                  {/* ) : (
                    <p>None Available</p>
                  )} */}

              </MainWrapper>
            </div>
           
          {/* </MainWrapper> */}
          <div class=" font-bold">Updated on {dayjs(props.moduleList.updationDate).format('YYYY-MM-DD')} by {props.moduleList.updatedBy}</div>
        </div>
     <StripePaymentModal
addStripeModal={props.addStripeModal}
     handleStripeModal={props.handleStripeModal}
     />
      </>
    );
  }


const mapStateToProps = ({ module, auth }) => ({
  userId: auth.userDetails.userId,
  orgId: auth.userDetails.organizationId,
  moduleList: module.moduleList,
  fetchingModules: module.fetchingModules,
  fetchingModulesError: module.fetchingModulesError,
  addStripeModal:module.addStripeModal,

});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getModules,
      addingModules,
      handleStripeModal
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(ModuleList);
