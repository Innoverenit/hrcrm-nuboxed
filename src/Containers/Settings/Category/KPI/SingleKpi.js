import React, { Component } from "react";
import { Button, Tooltip, Popconfirm} from "antd";
import {removeKpi} from "../KPI/KPIAction"
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import dayjs from "dayjs";
import { Select } from "../../../../Components/UI/Elements";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { TextInput } from "../../../../Components/UI/Elements";
import ViewEditCard from "../../../../Components/UI/Elements/ViewEditCard";

class SingleKpi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "",
      kpi: "",
      frequency:"",
      editInd: true,
    };
  }
  handleFrequency=(value)=>
  this.setState({frequency:value});
  render() {
    const {
        kpi: { kpi, creationDate,performanceManagementId,frequency, EditInd },
      handleChange,
      name1,
      value,
      linkedSectors,
      updatingKpi,
      handleupdateKpi,
      handleDeleteKpi,
    } = this.props;
    console.log(linkedSectors);
    console.log("kpi", kpi);
    const currentdate = dayjs().format("DD/MM/YYYY");
    const date = dayjs(creationDate).format("DD/MM/YYYY");
    // const disableDelete = linkedCustomers && linkedCustomers.includes(typeId)
    return (
      <div class=" w-full cursor-pointer">
        <ViewEditCard>
          {({ viewType }, toggleViewType) =>
            viewType === "view" ? (
              <div class=" flex justify-between" >
                <div class=" flex  flex-col w-48 justify-between ml-4">
                 <div class=" flex text-base text-[#40A9FF]">KPI</div>
                 <div class=" font-semibold" >
                  {kpi}&nbsp;&nbsp;&nbsp;
            {date === currentdate ?<span class="text-xs text-[tomato] font-bold"
                                  >
                                    New
                                  </span> : null}
                </div>
                </div>
                <div class=" flex  flex-col  w-[8rem] justify-between">
                <div class=" flex text-base text-[#40A9FF]">Frequency</div>
                <div class=" font-semibold" >
                  {frequency}
                </div>
                </div>
                <div>
                {/* {this.props.kpi.editInd ? ( */}
                    <BorderColorIcon
                   
                      tooltipTitle="Edit"
                      iconType="edit"
                      onClick={toggleViewType}
                      style={{fontSize:"1rem"}}
                    />
                    {/* ) : null} */}
                  
                  <Tooltip title="Delete">
                  <Popconfirm
                          title="Do you want to delete?"
                          okText="Yes"
                          cancelText="No"
                          onConfirm={() => this.props.removeKpi(performanceManagementId )}
                        >
                  <DeleteOutlineIcon ClassName="!text-icon text-[tomato] cursor-pointer"  />
                        </Popconfirm>
                  </Tooltip>
                </div>
              </div>
            ) : (
              <div class=" flex">
                <TextInput
                  name={name1}
                  // value={value || sectorName}
                  defaultValue={kpi}
                  onChange={handleChange}
                  style={{ width: "60%" }}
                />
                
                <Select 
              defaultValue={frequency}
               style={{width:"25%"}}
               placeholder="Select Frequency"
               onChange={this.handleFrequency}
               >
         <option value="Monthly">Monthly</option>
                      <option value="Quarterly">Quarterly</option>
                      <option value="Half yearly">Half yearly</option>
                  <option value="Annual">Annual</option>
               </Select>
                <div class=" ml-auto" >
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={updatingKpi}
                    // disabled={!value}
                    onClick={() => {
                      console.log(value); 
                      handleupdateKpi(performanceManagementId, value, this.state.frequency, toggleViewType());
                    }}>

                  
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
  }
}

const mapStateToProps = ({ departments, sector }) => ({

});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      removeKpi,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(SingleKpi);


