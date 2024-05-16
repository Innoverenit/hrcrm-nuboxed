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
             
              <div class="w-[13rem] h-[12rem] bg-white shadow-2xl border-2 flex flex-col rounded-lg scale-95 hover:scale-100">
             <img
              className="big-logo"
              src={Trading}
              style={{ height:"7rem" }}
              alt="Tekorero logo"
            />
            <div class="flex justify-center mt-1">
              <div class=" text-sm font-semibold ">Trading</div>
                    <div   class="  ml-2">
                    <Popconfirm
        title="Do you wish to change Status?"
        // onConfirm={() => this.props.handleErpClick(!this.props.erpStatus)}
        okText="Yes"
        cancelText="No"
      >
                        <Switch
                              onChange={() => {}}
                      
                          className="w-[4rem]"
                        //   checked={this.props.erpStatus || this.props.moduleList.erpInd}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      </Popconfirm>
                    </div>
                    </div>
                    </div>
      
            <> 
            <div class="w-[13rem] h-[12rem] bg-white shadow-2xl border-2 flex flex-col rounded-lg scale-95 hover:scale-100">
             <img
              className="big-logo"
              src={FWLogo1}
              style={{ height:"7rem" }}
              alt="Tekorero logo"
            />
            <div class="flex justify-center mt-1">
              <div class=" text-sm  ml-2 font-semibold">Ecom</div>
                    <div   class=" ml-2">
                    <Popconfirm
                        title="Do you wish to change Status ? "
                        // onConfirm={() => this.props.handleProductionClick(!this.props.productionStatus)}
                        // onCancel={this.props.handleProductionCancel}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Switch
                          className="w-[4rem]"
                          onChange={() => {}}
                        //  onChange={this.props.handleProductionClick}
                        //  checked={this.props.productionStatus || this.props.moduleList.productionInd}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      </Popconfirm>
                    </div>
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


