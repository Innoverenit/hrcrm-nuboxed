import React, { Component } from "react";
import { Popconfirm, Switch, Tooltip, } from "antd";
import ViewEditCard from "../../../../Components/UI/Elements/ViewEditCard";
import { Select } from "../../../../Components/UI/Elements";
import FWLogo from "../../../../Assets/Images/Erp.jpg";
import FWLogo1 from "../../../../Assets/Images/Production.jpg";
import FWLogo2 from "../../../../Assets/Images/repair.jpg";
import FWLogo3 from "../../../../Assets/Images/ordermanagement.jpg";
import FWLogo4 from "../../../../Assets/Images/logistic.jpg";
import FWLogo5 from "../../../../Assets/Images/proceurement.jpg";
const { Option } = Select;

class SingleModuleList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: '',
      departmentName: "",
      sectorId:"",
      sectorName:"",
      editInd:true,
    };
  }

  handleSectorId = (value) =>
    this.setState({ sectorId: value });
  render() {


    console.log("35l",this.props)
    // const disableDelete = linkedSources && linkedSources.includes(documentTypeId)
    return (
      <div class=" w-full cursor-pointer mt-8">
        <ViewEditCard>
          {({ viewType }, toggleViewType) =>
            viewType === "view" ? (
              <div class="flex" >
                <div class="w-full flex-row">
              <div class=" flex " >
             
              <div class="w-[13rem] h-[12rem] bg-white shadow-2xl border-2 flex flex-col rounded-lg scale-95 hover:scale-100">
             <img
              className="big-logo"
              src={FWLogo}
              style={{ height:"7rem" }}
              alt="Tekorero logo"
            />
            <div class="flex justify-center mt-1">
              <div class=" text-sm font-semibold ">ERP</div>
                    <div   class="  ml-2">
                    <Popconfirm
        title="Do you wish to change Status?"
        onConfirm={() => this.props.handleErpClick(!this.props.erpStatus)}
        okText="Yes"
        cancelText="No"
      >
                        <Switch
                              onChange={() => {}}
                        //  onChange={this.props.handleErpClick}
                          style={{ width: "4em" }}
                          checked={this.props.erpStatus || this.props.moduleList.erpInd}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      </Popconfirm>
                    </div>
                    </div>
                    </div>
           {this.props.moduleList.erpInd === true && ( 
            <> 
            <div class="w-[13rem] h-[12rem] bg-white shadow-2xl border-2 flex flex-col rounded-lg scale-95 hover:scale-100">
             <img
              className="big-logo"
              src={FWLogo1}
              style={{ height:"7rem" }}
              alt="Tekorero logo"
            />
            <div class="flex justify-center mt-1">
              <div class=" text-sm  ml-2 font-semibold">Production</div>
                    <div   class=" ml-2">
                    <Popconfirm
                        title="Do you wish to change Status ? "
                        onConfirm={() => this.props.handleProductionClick(!this.props.productionStatus)}
                        // onCancel={this.props.handleProductionCancel}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Switch
                          style={{ width: "4em" }}
                          onChange={() => {}}
                        //  onChange={this.props.handleProductionClick}
                         checked={this.props.productionStatus || this.props.moduleList.productionInd}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      </Popconfirm>
                    </div>
                    </div> 
                    </div>
                    <div class="w-[13rem] h-[12rem] bg-white shadow-2xl border-2 flex flex-col rounded-lg scale-95 hover:scale-100">
             <img
              className="big-logo"
              src={FWLogo2}
              style={{ height:"7rem" }}
              alt="Tekorero logo"
            />
            <div class="flex justify-center mt-1">
                    <div class=" text-sm  ml-2 font-semibold">Repair</div>
                    <div   class="  ml-2">
                    <Popconfirm
                        title="Do you wish to change Status ? "
                        onConfirm={() => this.props.handleRepairClick(!this.props.repairStatus)}
                        // onCancel={this.props.handleRepairCancel}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Switch
                                                onChange={() => {}}
                        // onChange={this.props.handleRepairClick}
                        checked={this.props.repairStatus || this.props.moduleList.repairInd}
                          style={{ width: "4em" }}
 
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      </Popconfirm>
                    </div>
</div>
</div>
                    {/* <div class=" text-sm  ml-2">Inventory</div>
                    <div   class=" w-[7%] ml-2">
              
                        <Switch
                         onChange={this.props.handleInventoryClick}
                         checked={this.props.inventoryStatus || this.props.moduleList.inventoryInd}
                          style={{ width: "4em" }}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                 
                    </div> */}
  <div class="w-[13rem] h-[12rem] bg-white shadow-2xl border-2 flex flex-col rounded-lg scale-95 hover:scale-100">
             <img
              className="big-logo"
              src={FWLogo3}
              style={{ height:"7rem" }}
              alt="Tekorero logo"
            />
            <div class="flex justify-center mt-1">
                    {/* <div class=" text-sm  ml-2">Order Management</div> */}
                    <Tooltip title="Order Management">
                    <div class=" text-sm  ml-2 font-semibold">OMS</div>
                    </Tooltip>
                    <div   class="  ml-2">
                    <Popconfirm
                        title="Do you wish to change Status ? "
                        onConfirm={() => this.props.handleOrderManagementClick(!this.props.orderManagStatus)}
                        // onCancel={this.props.handleOrderManagementCancel}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Switch
                          style={{ width: "4em" }}
                          onChange={() => {}}
                         checked={this.props.orderManagStatus || this.props.moduleList.orderManagementInd}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      </Popconfirm>
                    </div>
</div>
</div>
<div class="w-[13rem] h-[12rem] bg-white shadow-2xl border-2 flex flex-col rounded-lg scale-95 hover:scale-100">
             <img
              className="big-logo"
              src={FWLogo4}
              style={{ height:"7rem" }}
              alt="Tekorero logo"
            />
            <div class="flex justify-center mt-1">
                    <div class=" text-sm  ml-2 font-semibold">Logistics</div>
                    <div   class="  ml-2">
                    <Popconfirm
                        title="Do you wish to change Status ? "
                        onConfirm={() => this.props.handleLogisticClick(!this.props.logisticsStatus)}
                        // onCancel={this.props.handleLogisticCancel}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Switch
                               onChange={() => {}}
                         checked={this.props.logisticsStatus || this.props.moduleList.logisticsInd}
                          style={{ width: "4em" }}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      </Popconfirm>
                    </div>
</div>
</div>
<div class="w-[13rem] h-[12rem] bg-white shadow-2xl border-2 flex flex-col rounded-lg scale-95 hover:scale-100">
             <img
              className="big-logo"
              src={FWLogo5}
              style={{ height:"7rem" }}
              alt="Tekorero logo"
            />
            <div class="flex justify-center mt-1">
                    <div class=" text-sm  ml-2 font-semibold">Procurement</div>
                    <div   class="  ml-2">
                    <Popconfirm
                        title="Do you wish to change Status ? "
                        onConfirm={() => this.props.handleProcurmentClick(!this.props.procurmentStatus)}
                        // onCancel={this.props.handleProcurmentCancel}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Switch
                       onChange={() => {}}
                         checked={this.props.procurmentStatus || this.props.moduleList.procurementInd}
                          style={{ width: "4em" }}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      </Popconfirm>
                    </div>
                    </div>
                    </div>
                    </>   
              
              )}  
                
                   
                
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
      </div>
    );
  }
}

export default SingleModuleList;


