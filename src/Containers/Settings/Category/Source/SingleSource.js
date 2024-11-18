import React, { Component } from "react";
import { Button, Tooltip,Popconfirm } from "antd";
import dayjs from "dayjs";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { TextInput } from "../../../../Components/UI/Elements";
import { Select } from "../../../../Components/UI/Elements";
import {removeSource} from "../Source/SourceAction"
import ViewEditCard from "../../../../Components/UI/Elements/ViewEditCard";

class SingleSource extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "",
      name: "",
      listType:"",
      editInd: true,
    };
  }
  handleType=(value)=>
  this.setState({listType:value});
  render() {
    const {
      source: { name,creationDate, sourceId,listType, EditInd },
      handleChange,
      name1,
      value,
      linkedSectors,
      updatingSources,
      handleUpdateSource,
      handleDeleteSource,
    } = this.props;
    console.log(linkedSectors);
    console.log("name", name);
    const currentdate = dayjs().format("DD/MM/YYYY");
    const date = dayjs(creationDate).format("DD/MM/YYYY");
    // const disableDelete = linkedCustomers && linkedCustomers.includes(typeId)
    return (
      <div class=" w-full cursor-pointer">
        <ViewEditCard>
          {({ viewType }, toggleViewType) =>
            viewType === "view" ? (
              <div class=" flex justify-between" >
                <div class=" font-semibold" >
                  {name}&nbsp;&nbsp;&nbsp;
            {date === currentdate ?<span class="text-xs text-[tomato] font-bold"
                                  >
                                    New
                                  </span> : null}
                </div>
                <div>
                  {this.props.source.editInd ? (
                    <BorderColorIcon
                   
                      tooltipTitle="Edit"
                      iconType="edit"
                      onClick={toggleViewType}
                      style={{fontSize:"1rem"}}
                    />
                  ) : null}  
                 
                  <Tooltip title="Delete">
                  <Popconfirm
                          title="Do you want to delete?"
                          okText="Yes"
                          cancelText="No"
                          onConfirm={() => this.props.removeSource(sourceId )}
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
                  defaultValue={name}
                  onChange={handleChange}
                  style={{ width: "45%" }}
                />
               
                <Select 
              defaultValue={listType}
               style={{width:"25%",marginLeft:"0.5rem"}}
               placeholder="Select Type"
               onChange={this.handleType}
               >
           <option value="Event">Event</option>
                      <option value="Employee">Employee</option>
                      <option value="Customer">Customer</option>
                  <option value="Investor">Investor</option>
               </Select>
                <div style={{ marginLeft: "auto" }}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={updatingSources}
                    // disabled={!value}
                    onClick={() => {
                      console.log(value); 
                      handleUpdateSource(sourceId, value,
                        this.state.listType,
                         toggleViewType());
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
      removeSource,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(SingleSource);



