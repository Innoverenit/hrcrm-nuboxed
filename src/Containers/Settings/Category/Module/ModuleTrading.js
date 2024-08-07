import React, { Component } from "react";
import { Popconfirm, Switch, Tooltip, } from "antd";
import ViewEditCard from "../../../../Components/UI/Elements/ViewEditCard";
import { Select } from "../../../../Components/UI/Elements";
import FWLogo1 from "../../../../Assets/Images/Production.jpg";
import Trading from "../../../../Assets/Images/Trading.jpeg";

const { Option } = Select;

class ModuleTrading extends Component {
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
             
              <div class=" h-[12rem] bg-white shadow border-2 flex flex-col rounded-lg scale-95 hover:scale-100">
              <div className=" flex h-28 justify-center "> 
              <img
              className="big-logo w-36 h-24 m-2"
              src={Trading}
              alt="Tekorero logo"
            /></div>
            <div class="flex   flex-col justify-center mt-1">
            <div class="flex flex-row  justify-center"> 
              <div class=" text-sm font-semibold ">Trading</div>
                    <div   class="  ml-2">
                    <Popconfirm
        title="Do you wish to change Status?"
         onConfirm={() => this.props.handleTradingClick(!this.props.tradingStatus)}
        okText="Yes"
        cancelText="No"
      >
                        <Switch
                              onChange={() => {}}
                      
                          className="w-[4rem]"
                           checked={this.props.tradingStatus || this.props.moduleList.tradingInd}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      </Popconfirm>
                    </div>
                    </div>
                    <div class="text-xs text-center"> Match Order ~ Options.</div>
                    </div>
                    </div>
      
            <> 
            <div class=" h-[12rem] bg-white shadow border-2 flex flex-col rounded-lg scale-95 hover:scale-100">
            <div className=" flex h-28 justify-center "> 
              <img
              className="big-logo w-36 h-24 m-2"
              src={FWLogo1}
              alt="Tekorero logo"
            /></div>
            <div class="flex  flex-col justify-center mt-1">
            <div class="flex flex-row  justify-center"> 
              <div class=" text-sm  ml-2 font-semibold">Ecom</div>
                    <div   class=" ml-2">
                    <Popconfirm
                        title="Do you wish to change Status ? "
                         onConfirm={() => this.props.handleEcomClick(!this.props.ecomStatus)}
                       
                        okText="Yes"
                        cancelText="No"
                      >
                        <Switch
                          className="w-[4rem]"
                          onChange={() => {}}
                       
                          checked={this.props.ecomStatus || this.props.moduleList.catalogPublishInd}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      </Popconfirm>
                    </div>
                    </div>
                    <div class="text-xs text-center"> D2C / B2B / Customer portal / Supplier Portal.</div>
                    </div> 
                    </div>
   

                    <div class=" h-[12rem] bg-white shadow border-2 flex flex-col rounded-lg scale-95 hover:scale-100">
            <div className=" flex h-28 justify-center "> 
              <img
              className="big-logo w-36 h-24 m-2"
              src={FWLogo1}
              alt="Tekorero logo"
            /></div>
            <div class="flex  flex-col justify-center mt-1">
            <div class="flex flex-row  justify-center"> 
              <div class=" text-sm  ml-2 font-semibold">Catalouge</div>
                    <div   class=" ml-2">
                    <Popconfirm
                        title="Do you wish to change Status ? "
                         onConfirm={() => this.props.handleCatalougeClick(!this.props.catalogueStatus)}
                       
                        okText="Yes"
                        cancelText="No"
                      >
                        <Switch
                          className="w-[4rem]"
                          onChange={() => {}}
                       
                          checked={this.props.catalogueStatus || this.props.moduleList.catalogPublishInd}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      </Popconfirm>
                    </div>
                    </div>
                    <div class="text-xs text-center"> D2C / B2B / Customer portal / Supplier Portal.</div>
                    </div> 
                    </div>
          
                    <div class=" h-[12rem] bg-white shadow border-2 flex flex-col rounded-lg scale-95 hover:scale-100">
            <div className=" flex h-28 justify-center "> 
              <img
              className="big-logo w-36 h-24 m-2"
              src={FWLogo1}
              alt="Tekorero logo"
            /></div>
            <div class="flex  flex-col justify-center mt-1">
            <div class="flex flex-row  justify-center"> 
              <div class=" text-sm  ml-2 font-semibold">Material</div>
                    <div   class=" ml-2">
                    <Popconfirm
                        title="Do you wish to change Status ? "
                         onConfirm={() => this.props.handleMaterialClick(!this.props.materialStatus)}
                       
                        okText="Yes"
                        cancelText="No"
                      >
                        <Switch
                          className="w-[4rem]"
                          onChange={() => {}}
                       
                          checked={this.props.materialStatus || this.props.moduleList.materialPublishInd}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      </Popconfirm>
                    </div>
                    </div>
                    <div class="text-xs text-center"> D2C / B2B / Customer portal / Supplier Portal.</div>
                    </div> 
                    </div>

                    </>   
              
            
                
                   
                
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

export default ModuleTrading;


