import React, { useState,useEffect,lazy } from "react";
import { connect } from "react-redux";

import { bindActionCreators } from "redux";
import {linkDepartmentDocumentToggle,removeDepartments} from "../Department/DepartmentAction"
import { Button, Popconfirm, Switch, Tooltip } from "antd";
import {addingDeptModules} from "../Department/DepartmentAction"
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { TextInput } from "../../../Components/UI/Elements";
import dayjs from "dayjs";
import ViewEditCard from "../../../Components/UI/Elements/ViewEditCard";
import { Select } from "../../../Components/UI/Elements";
const DepartmentStatusToggle = lazy(() =>
  import("./DepartmentStatusToggle")
);

const { Option } = Select;

const SingleDepartment = (props) => {

  const [viewType, setViewType] = useState("view");

  const toggleViewType = () => {
    setViewType((prevViewType) => (prevViewType === "view" ? "edit" : "view"));
  };
  const {
    department: { departmentName,creationDate,editInd,moduleMapper,crmInd,financeInd,procurementInd,imInd,recruitOppsInd,hrInd,orderManagementInd,logisticsInd, departmentId,repairInd,inventoryInd,recruitProInd,sectorId,productionInd,elearningInd,mandetoryInd,sectorName,erpInd ,accountInd},
   handleChange,
   name,
   value,
   linkedDepartments,
   updatingDepartments,
   handleUpdateDepartment,
   handleDeleteDepartment,

 } = props;
 const currentdate = dayjs().format("DD/MM/YYYY");
 const date = dayjs(creationDate).format("DD/MM/YYYY");
  // const { crmInd } = department;
  console.log("moduleMapper",moduleMapper);
  // console.log("erpInd", moduleMapper.erpInd);
  const [crmStatus, setCrmStatus] = useState(crmInd);
  useEffect(() => {
    setCrmStatus(crmInd);
  }, [crmInd]);
  
  const handleCrmClick = (checked) => {
    setCrmStatus(checked);
    let data = {
      value: checked,
      departmentId:departmentId,
      orgId: props.orgId,
      type: "crm",
    };
    props.addingDeptModules(data, departmentId);
  };
  const [toggle, setToggle] = React.useState(mandetoryInd);
  function handleToggleCollection(item) {
    if (mandetoryInd) {
      props.linkDepartmentDocumentToggle({
        departmentName:departmentName,
        departmentId: departmentId,
        editInd:false,
        mandetoryInd: mandetoryInd ? false : true,
      },
      departmentId,
      );

    } else {
      props.linkDepartmentDocumentToggle({
        departmentName: departmentName,
        departmentId: departmentId,
        editInd:false,
        mandetoryInd: mandetoryInd ? false : true,
      },
      departmentId,
      );
    }
  }

  function handleCancel() {
    if (mandetoryInd) {
      setToggle(true);
    } else {
      setToggle(false);
    }
  }
  // useEffect(() => {
  //   setMandatoryStatus(mandetoryInd);
  // }, [mandetoryInd]);
  
  // const handleMandatoryClick = (checked) => {
  //   setMandatoryStatus(checked);
  //   let data = {
  //     value: checked,
     
  //     departmentId:departmentId,
  //     orgId: props.orgId,
  //     type: "mandatory",
  //   };
  //   props.linkDepartmentDocumentToggle(data, departmentId);
  // };

  const [erpStatus, setErpStatus] = useState(erpInd);

  useEffect(() => {
    setErpStatus(erpInd);
  }, [erpInd]);
  
  const handleErpClick = (checked) => {
    setErpStatus(checked);
    let data = {
      value: checked,
      departmentId:departmentId,
      orgId: props.orgId,
      type: "erp",
    };
    props.addingDeptModules(data, departmentId);
  };
  const [imStatus, setImStatus] = useState(imInd);
  useEffect(() => {
    setImStatus(imInd);
  }, [imInd]);
  
  const handleImClick = (checked) => {
    setImStatus(checked);
    let data = {
      value: checked,
      departmentId:departmentId,
      orgId: props.orgId,
      type: "im",
    };
    props.addingDeptModules(data, departmentId);
  };


  console.log(accountInd);
  const [accountStatus, setAccountStatus] = useState(accountInd);
  useEffect(() => {
    setAccountStatus(accountInd);
  }, [accountInd]);
  
  const handleAccountClick = (checked) => {
    setAccountStatus(checked);
    let data = {
      value: checked,
      departmentId:departmentId,
      orgId: props.orgId,
      type: "account",
    };
    props.addingDeptModules(data, departmentId);
  };
  const [recruitStatus, setRecruitStatus] = useState(recruitOppsInd);

  useEffect(() => {
    setRecruitStatus(recruitOppsInd);
  }, [recruitOppsInd]);
  
  const handleRecruitClick = (checked) => {
    setRecruitStatus(checked);
    let data = {
      value: checked,
      departmentId:departmentId,
      orgId: props.orgId,
      type: "recruitopps",
    };
    props.addingDeptModules(data, departmentId);
  };
  const [hrStatus, setHrStatus] = useState(hrInd);
  useEffect(() => {
    setHrStatus(hrInd);
  }, [hrInd]);
  
  const handleHrClick = (checked) => {
    setHrStatus(checked);
    let data = {
      value: checked,
      departmentId:departmentId,
      orgId: props.orgId,
      type: "hr",
    };
    props.addingDeptModules(data, departmentId);
  };

  const [productionStatus, setProductionStatus] = useState(productionInd);
  useEffect(() => {
    setProductionStatus(productionInd);
  }, [productionInd]);
  
  const handleProductionClick = (checked) => {
    setProductionStatus(checked);
    let data = {
      value: checked,
      departmentId:departmentId,
      orgId: props.orgId,
      type: "production",
    };
    props.addingDeptModules(data, departmentId);
  };

  const [recruitProStatus, setRecruitProStatus] = useState(recruitProInd);

  useEffect(() => {
    setRecruitProStatus(recruitProInd);
  }, [recruitProInd]);
  
  const handleRecruitProClick = (checked) => {
    setRecruitProStatus(checked);
    let data = {
      value: checked,
      departmentId:departmentId,
      orgId: props.orgId,
      type: "recruitPro",
    };
    props.addingDeptModules(data, departmentId);
  };

  const [repairStatus, setRepairStatus] = useState(repairInd);

  useEffect(() => {
    setRepairStatus(repairInd);
  }, [repairInd]);
  
  const handleRepairClick = (checked) => {
    setRepairStatus(checked);
    let data = {
      value: checked,
      departmentId:departmentId,
      orgId: props.orgId,
      type: "repair",
    };
    props.addingDeptModules(data, departmentId);
  };
  const [inventoryStatus, setInventoryStatus] = useState(inventoryInd);

  useEffect(() => {
    setInventoryStatus(inventoryInd);
  }, [inventoryInd]);
  
  const handleInventoryClick = (checked) => {
    setInventoryStatus(checked);
    let data = {
      value: checked,
      departmentId:departmentId,
      orgId: props.orgId,
      type: "inventory",
    };
    props.addingDeptModules(data, departmentId);
  };
  


  const [accountingStatus, setAccountingStatus] = useState(financeInd);

  useEffect(() => {
    setAccountingStatus(financeInd);
  }, [financeInd]);
  
  const handleAccountingClick = (checked) => {
    setAccountingStatus(checked);
    let data = {
      value: checked,
      departmentId:departmentId,
      orgId: props.orgId,
      type: "finance",
    };
    props.addingDeptModules(data, departmentId);
  };
  const [orderManagStatus, setOrderManagStatus] = useState(orderManagementInd);

  useEffect(() => {
    setOrderManagStatus(orderManagementInd);
  }, [orderManagementInd]);
  
  const handleOrderManagementClick = (checked) => {
    setOrderManagStatus(checked);
    let data = {
      value: checked,
      departmentId:departmentId,
      orgId: props.orgId,
      type: "orderManagement",
    };
    props.addingDeptModules(data, departmentId);
  };

  const [logisticsStatus, setLogisticsStatus] = useState(logisticsInd);

  useEffect(() => {
    setLogisticsStatus(logisticsInd);
  }, [logisticsInd]);
  
  const handleLogisticClick = (checked) => {
    setLogisticsStatus(checked);
    let data = {
      value: checked,
      departmentId:departmentId,
      orgId: props.orgId,
      type: "logistics",
    };
    props.addingDeptModules(data, departmentId);
  };

  const [procurmentStatus, setProcurmentStatus] = useState(procurementInd);

  useEffect(() => {
    setProcurmentStatus(procurementInd);
  }, [procurementInd]);
  
  const handleProcurmentClick = (checked) => {
    setProcurmentStatus(checked);
    let data = {
      value: checked,
      departmentId:departmentId,
      orgId: props.orgId,
      type: "procurement",
    };
    props.addingDeptModules(data, departmentId);
  };
  const [elearningStatus, setElearningStatus] = useState(elearningInd);

  useEffect(() => {
    setElearningStatus(elearningInd);
  }, [elearningInd]);
  
  const handleElearningClick = (checked) => {
    setElearningStatus(checked);
    let data = {
      value: checked,
      departmentId:departmentId,
      orgId: props.orgId,
      type: "elearning",
    };
    props.addingDeptModules(data, departmentId);
  };



  return (
    <div class=" w-full cursor-pointer">
      <ViewEditCard>
        {({ viewType: cardViewType }, toggleCardViewType) =>
          cardViewType === "view" ? (
            <div className="flex">
              <div className="w-full flex-row">
                <div className="flex justify-between items-center">
                  <div className="w-[11%]">
                  <div class=" font-semibold" >{departmentName}&nbsp;&nbsp;&nbsp;
            {date === currentdate ?<span class="text-xs text-[tomato] font-bold"
                                  >
                                    New
                                  </span> : null}</div>
                  </div>
                  {/* {mandetoryInd === true && ( */}
  <>
  
                    <div   class=" w-[12%] ml-2">
                    
                    <DepartmentStatusToggle
                      mandetoryInd={mandetoryInd}
                      departmentName={departmentName}
                      departmentId={departmentId}
                    />  
                    </div>
                    {/* <Popconfirm
                        title="Do you wish to change Status ? "
                        onConfirm={handleMandatoryClick}
                        onCancel={handleMandatoryCancel}
                        okText="Yes"
                        cancelText="No"
                      > */}
                        {/* <Switch
                         className="w-[4rem]"
                          onChange={handleMandatoryClick}
                          checked={mandatoryStatus || mandetoryInd}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        /> */}
                      {/* </Popconfirm> */}
                    {/* </div> */}
                    </>
{/* )} */}
<div class=" flex flex-col w-[70%] ">
<div class=" flex flex-row ">
  

{moduleMapper.financeInd === true && (
  <>
  <div class=" flex items-center">
                    <div class=" text-xs w-[4.5rem] ml-4">Accounting</div>
                    <div   class=" w-[7%]">
                    <Popconfirm
                        title="Do you wish to change Status ? "
                        onConfirm={() => handleAccountingClick(!accountingStatus)}
                        // onCancel={handleOrderManagementCancel}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Switch
                         className="w-[4rem]"
                          onChange={() => {}}
                          checked={financeInd||accountingStatus}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      </Popconfirm>
                    </div>
                    </div>
                    </>
)}
{moduleMapper.crmInd === true && (
  <>
  <div class=" flex">
                  <div class="flex items-center text-xs w-[2rem] ml-4 ">CRM</div>
                    <div   class=" w-[7%] ">
                    <Popconfirm
                        title="Do you wish to change Status ? "
                        onConfirm={() => handleCrmClick(!crmStatus)}
                        // onCancel={handleCrmCancel}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Switch
                         className="w-[4rem]"
                          onChange={() => {}}
                          // onChange={handleCrmClick}
                          checked={crmInd||crmStatus}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      </Popconfirm>
                    </div>
                    </div>
                    </>
)}
{moduleMapper.imInd === true && (
  <>
    <div class=" flex">
                    <div class="flex items-center text-xs w-[1.5rem] ml-4">IM</div>
                    <div   class=" w-[7%] ">
                    <Popconfirm
        title="Do you wish to change Status?"
        onConfirm={() => handleImClick(!imStatus)}
        okText="Yes"
        cancelText="No"
      >
                        <Switch
                         className="w-[4rem]"
                          onChange={() => {}}
                          checked={imInd||imStatus }
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                    </Popconfirm>
                    </div>
                    </div>
                    </>
)}
{moduleMapper.recruitProInd === true && (
  <>
   <div class=" flex">
                    <div class="flex items-center text-xs w-[4rem] ml-4">Recruitpro</div>
                    <div   class=" w-[7%] ">
                    <Popconfirm
                        title="Do you wish to change Status ? "
                        onConfirm={() => handleRecruitProClick(!recruitProStatus)}
                        // onCancel={handleRecruitProCancel}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Switch
                         className="w-[4rem]"
                          onChange={() => {}}
                          checked={recruitProStatus || recruitProInd}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      </Popconfirm>
                    </div>
                    </div>
                    </>
)}
{moduleMapper.hrInd === true && (
  <>
   <div class=" flex">

                    <div class="flex items-center text-xs w-[1.5rem] ml-4">HR</div>
                    <div   class=" w-[7%] ">
                    <Popconfirm
                        title="Do you wish to change Status ? "
                        onConfirm={() => handleHrClick(!hrStatus)}
                        // onCancel={handleHrCancel}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Switch
                         className="w-[4rem]"
                          onChange={() => {}}
                          checked={hrInd||hrStatus}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      </Popconfirm>
                    </div>
                    </div>
                    </>
)}
{moduleMapper.elearningInd === true && (
  <>
     <div class=" flex">

                    <div class="flex items-center text-xs w-[5rem]  ml-4">Elearning</div>
                    <div   class=" w-[7%] ">
                    <Popconfirm
                        title="Do you wish to change Status ? "
                        onConfirm={() => handleElearningClick(!elearningStatus)}
                        // onCancel={handleElearningCancel}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Switch
                         className="w-[4rem]"
                          onChange={() => {}}
                          checked={elearningInd||elearningStatus}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      </Popconfirm>
                    </div>
                    </div>
                    </>
)}
</div>

<div class=" flex flex-row mt-2 ">

{/* {accountInd === true && (
  <>
                    <div class=" text-xs  ml-2">Account</div>
                    <div   class=" w-[7%] ml-2">
                 
                        <Switch
                         className="w-[4rem]"
                          onChange={handleAccountClick}
                          checked={accountStatus || accountInd}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
               
                    </div>
                    </>
)} */}
{/* {recruitOppsInd === true && (
  <>

                    <div class=" text-xs  ml-2">RecruitOpps</div>
                    <div   class=" w-[7%] ml-2">
                  
                        <Switch
                         className="w-[4rem]"
                          onChange={handleRecruitClick}
                          checked={recruitStatus || recruitOppsInd}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                    
                    </div>
                    </>
)} */}

{moduleMapper.erpInd === true && (
  <>
  <div class=" flex">
    <div class="flex items-center text-xs w-[1.5rem] ml-4">ERP</div>
    <div class="w-[7%] ">
      <Popconfirm
        title="Do you wish to change Status?"
        onConfirm={() => handleErpClick(!erpStatus)}
        okText="Yes"
        cancelText="No"
      >
        <Switch
         className="w-[4rem]"
          onChange={() => {}}
          checked={erpStatus || erpInd}
          checkedChildren="Yes"
          unCheckedChildren="No"
        />
      </Popconfirm>
    </div>
    </div>
  </>
)}

{moduleMapper.productionInd === true && erpStatus && (
  <>
    <div class=" flex">

                    <div class="flex items-center text-xs w-[4rem] ml-4">Production</div>
                    <div   class=" w-[7%] ">
                    <Popconfirm
                        title="Do you wish to change Status ? "
                        onConfirm={() => handleProductionClick(!productionStatus)}
                        // onCancel={handleProductionCancel}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Switch
                         className="w-[4rem]"
                          onChange={() => {}}
                          checked={productionInd||productionStatus }
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      </Popconfirm>
                    </div>
                    </div>
                    </>
)}

{moduleMapper.repairInd === true && erpStatus && (
  <>
   <div class=" flex">
                    <div class="flex items-center text-xs w-[3rem]  ml-4">Repair</div>
                    <div   class=" w-[7%]">
                    <Popconfirm
                        title="Do you wish to change Status ? "
                        onConfirm={() => handleRepairClick(!repairStatus)}
                        // onCancel={handleRepairCancel}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Switch
                         className="w-[4rem]"
                          onChange={() => {}}
                          checked={repairInd||repairStatus}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      </Popconfirm>
                    </div>
                    </div>
                    </>
)}
{/* {inventoryInd === true && (
  <>
                    <div class=" text-xs  ml-2">Inventory</div>
                    <div   class=" w-[7%] ml-2">
                
                        <Switch
                         className="w-[4rem]"
                          onChange={handleInventoryClick}
                          checked={inventoryInd||inventoryStatus}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                    
                    </div>
                    </>
)} */}
{moduleMapper.orderManagementInd === true && erpStatus && (
  <>
   <div class=" flex">
                    <div class="flex items-center text-xs w-[8rem] ml-4">Order Management</div>
                    <div   class=" w-[7%] ">
                    <Popconfirm
                        title="Do you wish to change Status ? "
                        onConfirm={() => handleOrderManagementClick(!orderManagStatus)}
                        // onCancel={handleOrderManagementCancel}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Switch
                         className="w-[4rem]"
                          onChange={() => {}}
                          checked={orderManagementInd||orderManagStatus}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      </Popconfirm>
                    </div>
                    </div>
                    </>
)}


{moduleMapper.logisticsInd === true && erpStatus && (
  <>
   <div class=" flex">
                    <div class="flex items-center text-xs w-[3rem]  ml-4 mr-1">Logistics</div>
                    <div   class=" w-[7%] ">
                    <Popconfirm
                        title="Do you wish to change Status ? "
                        onConfirm={() => handleLogisticClick(!logisticsStatus)}
                        // onCancel={handleLogisticCancel}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Switch
                         className="w-[4rem]"
                          onChange={() => {}}
                          checked={logisticsInd||logisticsStatus }
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      </Popconfirm>
                    </div>
                    </div>
                    </>
)}
{moduleMapper.procurementInd === true && erpStatus && (
  <>
    <div class=" flex">
                    <div class="flex items-center text-xs w-[6rem] ml-4">Procurement</div>
                    <div   class=" w-[7%]">
                    <Popconfirm
                        title="Do you wish to change Status ? "
                        onConfirm={() => handleProcurmentClick(!procurmentStatus)}
                        // onCancel={handleProcurmentCancel}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Switch
                         className="w-[4rem]"
                          onChange={() => {}}
                          checked={procurementInd||procurmentStatus}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      </Popconfirm>
                    </div>
                    </div>
                    </>
)}
</div>
</div>
    <div class="ml-2">
                    {mandetoryInd !== true && editInd === true && (
                      <BorderColorIcon
                        tooltipTitle="Edit"
                        iconType="edit"
                        onClick={toggleViewType}
                        style={{ fontSize: "1rem",cursor:"pointer" }}
                      />
                    )}
  <Tooltip title="Delete">
                    {mandetoryInd !== true && (
                          <Popconfirm
                          title="Do you want to delete?"
                          okText="Yes"
                          cancelText="No"
                          onConfirm={() => props.removeDepartments(departmentId,props.orgId )}
                        >
                    
                     
                        <DeleteOutlineIcon ClassName="!text-icon text-[tomato] cursor-pointer"  />
                       </Popconfirm>
                    )}
                    </Tooltip>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div class=" flex">
              <TextInput
                name={props.name}
                defaultValue={departmentName}
                onChange={props.handleChange}
                style={{ width: "60%" }}
              />
            <div class=" flex justify-end" >
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={updatingDepartments}
                    disabled={!value}
                    onClick={() => {
                      console.log(value); // Log the 'value' before calling handleUpdateSector
                      handleUpdateDepartment(departmentId,value,sectorId,sectorName,value, toggleViewType());
                    }}
                  // onClick={() => handleUpdateDepartment(departmentId,value,sectorId,sectorName,value, toggleViewType())}
                  >
                    Save
                   
                </Button>
            
                  <Button type="cancel"  onClick={() => toggleViewType()}>
                    Cancel
                   
                </Button>
                </div>
            </div>
          )
        }
      </ViewEditCard>
    </div>
  );
};

const mapStateToProps = ({ departments,auth, sector }) => ({
  orgId: auth.userDetails.organizationId,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addingDeptModules,
      linkDepartmentDocumentToggle,
      removeDepartments,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(SingleDepartment);

