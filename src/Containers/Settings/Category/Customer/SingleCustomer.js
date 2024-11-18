import React, { Component } from "react";
import { Button, Tooltip,Popconfirm } from "antd";

import dayjs from "dayjs";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {removeCustomer} from "../Customer/CustomerAction"
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { TextInput } from "../../../../Components/UI/Elements";

import ViewEditCard from "../../../../Components/UI/Elements/ViewEditCard";

class SingleCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "",
      name: "",
      editInd: true,
    };
  }
  render() {
    const {
      customer: { name,creationDate, customerTypeId, EditInd },
      handleChange,
      name1,
      value,
      linkedSectors,
      updatingCustomer,
      handleupdateCustomer,
      handleDeleteCustomer,
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
                  {this.props.customer.editInd ? (
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
                          onConfirm={() => this.props.removeCustomer(customerTypeId )}
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
                  style={{ width: "60%" }}
                />
             
                <div class=" ml-auto" >
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={updatingCustomer}
                    // disabled={!value}
                    onClick={() => {
                      console.log(value); 
                      handleupdateCustomer(customerTypeId, value, toggleViewType());
                    }}>

                  
                   Update
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
      removeCustomer,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(SingleCustomer);


