import React, { Component } from "react";
import { Button, Tooltip,Popconfirm } from "antd";

import dayjs from "dayjs";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {removeSectors} from "../Sectors/SectorsAction"
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { TextInput } from "../../../Components/UI/Elements";
import ViewEditCard from "../../../Components/UI/Elements/ViewEditCard";

class SingleSectors extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "",
      sectorName: "",
      editInd: true,
    };
  }
  render() {
    const {
      sector: { sectorName,creationDate, sectorId, EditInd },
      handleChange,
      name,
      value,
      linkedSectors,
      updatingSectors,
      handleUpdateSector,
      handleDeleteSector,
    } = this.props;
    // const sortedSectors = [...linkedSectors].sort((a, b) => a.sectorName.localeCompare(b.sectorName));
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
                  {sectorName}&nbsp;&nbsp;&nbsp;
            {date === currentdate ?<span class="text-xs text-[tomato] font-bold"
                                  >
                                    New
                                  </span> : null}
                </div>
                <div>
                  {this.props.sector.editInd ? (
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
                          onConfirm={() => this.props.removeSectors(sectorId )}
                        >
                   <DeleteOutlineIcon ClassName="!text-icon text-[tomato] cursor-pointer"  />
                      </Popconfirm>
                  </Tooltip>
                </div>
              </div>
            ) : (
              <div class=" flex">
                <TextInput
                  name={name}
                  // value={value || sectorName}
                  defaultValue={sectorName}
                  onChange={handleChange}
                  style={{ width: "60%" }}
                />
               
                <div class=" ml-auto">
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={updatingSectors}
                    disabled={!value}
                    onClick={() => {
                      console.log(value); // Log the 'value' before calling handleUpdateSector
                      handleUpdateSector(sectorId, value, toggleViewType());
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
      removeSectors,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(SingleSectors);



