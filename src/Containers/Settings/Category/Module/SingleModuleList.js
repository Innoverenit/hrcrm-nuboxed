import React, { Component } from "react";
import { Popconfirm, Switch, Tooltip, } from "antd";
import ViewEditCard from "../../../../Components/UI/Elements/ViewEditCard";
import { Select } from "../../../../Components/UI/Elements";
import FWLogo from "../../../../Assets/Images/Erp.webp";
import FWLogo1 from "../../../../Assets/Images/Production.webp";
import FWLogo2 from "../../../../Assets/Images/repair.webp";
import FWLogo3 from "../../../../Assets/Images/ordermanagement.jpg";
import FWLogo4 from "../../../../Assets/Images/logistic.jpg";
import FWLogo5 from "../../../../Assets/Images/proceurement.webp";

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
  
  // componentDidMount() {
  //   const loadStripeScript = () => {
  //     const script = document.createElement('script');
  //     script.src = 'https://js.stripe.com/v3/';
  //     script.async = true;
  //     script.onload = () => {
  //       console.log('Stripe script loaded successfully!');
  //       const stripe = window.Stripe('your-public-key'); 
  
  //     };
  //     document.body.appendChild(script);
  //   };

  //   loadStripeScript();
  // }

  // componentWillUnmount() {
 
  //   const script = document.querySelector('script[src="https://js.stripe.com/v3/"]');
  //   if (script) {
  //     document.body.removeChild(script);
  //   }
  // }
  render() {


    console.log("35l",this.props)
    return (
      <div class=" w-full cursor-pointer mt-8">
        <ViewEditCard>
          {({ viewType }, toggleViewType) =>
            viewType === "view" ? (
              <div class="flex" >
                <div class="w-full flex-row">
              <div class=" flex " >
             
              <div class=" h-[12rem] w-[12rem] bg-white shadow border-2 flex flex-col rounded-lg scale-95 hover:scale-100">
              <div className=" flex h-28 w-[10rem] justify-center "> 
              <img
              className="w-18 h-18 m-2"
              src={FWLogo}
              alt="Tekorero logo"
            /></div>
            <div class="flex flex-col justify-center   ">
            <div class="flex flex-row  justify-center"> 
              <div class=" text-sm font-semibold " onClick={()=> this.props.handleStripeModal(true)} >ERP</div>
                    <div   class="  ml-2" >
                    <Popconfirm
        title="Do you wish to change Status?"
        onConfirm={() => this.props.handleErpClick(!this.props.erpStatus)}
        okText="Yes"
        cancelText="No"
      >
                        <Switch
                              onChange={() => {}}                          
                          checked={this.props.erpStatus || this.props.moduleList.erpInd}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      </Popconfirm>
                    </div>
                    </div>
                    <div class="text-xs text-center"></div>
                    </div>
                    </div>
           {this.props.moduleList.erpInd === true && ( 
            <> 
            <div class=" h-[12rem] w-[12rem] bg-white shadow border-2 flex flex-col rounded-lg scale-95 hover:scale-100">
            <div className=" flex h-28 w-[10rem] justify-center "> 
              <img
              className="w-18 h-18 m-2"
              src={FWLogo1}
              alt="Tekorero logo"
            /></div>
            <div class="flex flex-col justify-center ">
            <div class="flex flex-row  justify-center"> 
              <div class=" text-sm  ml-2 font-semibold">Production</div>
                    <div   class=" ml-2">
                    <Popconfirm
                        title="Do you wish to change Status ? "
                        onConfirm={() => this.props.handleProductionClick(!this.props.productionStatus)}             
                        okText="Yes"
                        cancelText="No"
                      >
                        <Switch                  
                          onChange={() => {}}              
                         checked={this.props.productionStatus || this.props.moduleList.productionInd}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      </Popconfirm>
                    </div>
                    </div> 
                    <div class="text-xs text-center"> Cellular & Batch Manufacturing processes.</div>
                    </div>
                    </div>
                    <div class=" h-[12rem] w-[12rem] bg-white shadow border-2 flex flex-col rounded-lg scale-95 hover:scale-100">
                    <div className=" flex h-28 w-[10rem] justify-center "> 
              <img
              className="w-18 h-18 m-2"
              src={FWLogo2}
              alt="Tekorero logo"
            /></div>
            <div class="flex flex-col justify-center   ">
            <div class="flex flex-row  justify-center"> 
                    <div class=" text-sm  ml-2 font-semibold">Repair</div>
                    <div   class="  ml-2">
                    <Popconfirm
                        title="Do you wish to change Status ? "
                        onConfirm={() => this.props.handleRepairClick(!this.props.repairStatus)}                 
                        okText="Yes"
                        cancelText="No"
                      >
                        <Switch
                                                onChange={() => {}}           
                        checked={this.props.repairStatus || this.props.moduleList.repairInd}                 
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      </Popconfirm>
                    </div>
                    </div>
                    <div class="text-xs text-center">  Track parts, suppliers, manage productivity.</div>
</div>
</div>                  
  <div class=" h-[12rem] w-[12rem] bg-white shadow border-2 flex flex-col rounded-lg scale-95 hover:scale-100">
  <div className=" flex h-28 w-[10rem] justify-center "> 
              <img
              className="w-18 h-18 m-2"
              src={FWLogo3}
              alt="Tekorero logo"
            /></div>
            <div class="flex flex-col justify-center   ">
                    {/* Order Management */}
                    <div class="flex flex-row  justify-center"> 
                    <Tooltip title="Order Management">
                    <div class=" text-sm  ml-2 font-semibold">OMS</div>
                    </Tooltip>
                    <div   class="  ml-2">
                    <Popconfirm
                        title="Do you wish to change Status ? "
                        onConfirm={() => this.props.handleOrderManagementClick(!this.props.orderManagStatus)}                    
                        okText="Yes"
                        cancelText="No"
                      >
                        <Switch                    
                          onChange={() => {}}
                         checked={this.props.orderManagStatus || this.props.moduleList.orderManagementInd}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      </Popconfirm>
                    </div>
                    </div>
                    <div class="text-xs text-center"> Order to Cash.</div>
</div>
</div>
<div class=" h-[12rem] w-[12rem] bg-white shadow border-2 flex flex-col rounded-lg scale-95 hover:scale-100">
<div className=" flex h-28 w-[10rem] justify-center "> 
              <img
              className="w-18 h-18 m-2"
              src={FWLogo4}
              alt="Tekorero logo"
            /></div>
            <div class="flex flex-col justify-center   ">
            <div class="flex flex-row  justify-center"> 
                    <div class=" text-sm  ml-2 font-semibold">Logistics</div>
                    <div   class="  ml-2">
                    <Popconfirm
                        title="Do you wish to change Status ? "
                        onConfirm={() => this.props.handleLogisticClick(!this.props.logisticsStatus)}           
                        okText="Yes"
                        cancelText="No"
                      >
                        <Switch
                               onChange={() => {}}
                         checked={this.props.logisticsStatus || this.props.moduleList.logisticsInd}                     
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      </Popconfirm>
                    </div>
                    </div>
                    <div class="text-xs text-center">  Track shipments.</div>
</div>
</div>
<div class=" h-[12rem] w-[12rem] bg-white shadow border-2 flex flex-col rounded-lg scale-95 hover:scale-100">
<div className=" flex h-28  w-[10rem] justify-center "> 
              <img
              className="w-18 h-18 m-2"
              src={FWLogo5}
              alt="Tekorero logo"
            /></div>
            <div class="flex flex-col justify-center   ">
            <div class="flex flex-row  justify-center"> 
                    <div class=" text-sm  ml-2 font-semibold">Procurement</div>
                    <div   class="  ml-2">
                    <Popconfirm
                        title="Do you wish to change Status ? "
                        onConfirm={() => this.props.handleProcurmentClick(!this.props.procurmentStatus)}            
                        okText="Yes"
                        cancelText="No"
                      >
                        <Switch
                       onChange={() => {}}
                         checked={this.props.procurmentStatus || this.props.moduleList.procurementInd}                    
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      </Popconfirm>
                    </div>
                    </div>
                    <div class="text-xs text-center"> Supplier evaluation, procure to pay.</div>
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
                </div>
              )
          }
        </ViewEditCard>
      </div>
    );
  }
}

export default SingleModuleList;


