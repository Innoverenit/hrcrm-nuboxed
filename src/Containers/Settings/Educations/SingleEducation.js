import React, { Component } from "react";
import { Button, Tooltip,Popconfirm } from "antd";

import dayjs from "dayjs";
import { connect } from "react-redux";
import {removeEducation} from "../Educations/EducationAction"
import { bindActionCreators } from "redux";
import { DeleteOutlined } from "@ant-design/icons";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { TextInput } from "../../../Components/UI/Elements";
import ViewEditCard from "../../../Components/UI/Elements/ViewEditCard";
class SingleEducations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "",
      educationType: "",
      editInd: true,
    };
  }
  render() {
    const {
      education: { educationType,creationDate, educationTypeId },
      handleChange,
      name,
      value,
      linkedEducations,
      updatingEducations,
      handleUpdateEducation,
      handleDeleteEducation,
    } = this.props;
    console.log(linkedEducations);
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
                  {educationType}&nbsp;&nbsp;&nbsp;
            {date === currentdate ?<span class="text-xs text-[tomato] font-bold"
                                  >
                                    New
                                  </span> : null}
                </div>
                <div>
                  {this.props.education.editInd ? (
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
                          onConfirm={() => this.props.removeEducation(educationTypeId )}
                        >
                    <DeleteOutlined
                     
                      // onClick={() => handleDeleteEducation(educationTypeId)}
                    
                      style={{
                        verticalAlign: "center",
                        marginLeft: "1rem",
                        fontSize:"1rem",
                        color: "red",
                      }}
                    />
                        </Popconfirm>
                  </Tooltip>
   
                </div>
              </div>
            ) : (
              <div class=" flex">
                <TextInput
                  name={name}
                  // value={value || educationType}
                  defaultValue={educationType}
                  onChange={handleChange}
                  style={{ width: "60%" }}
                />
               
                <div class=" ml-auto" >
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={updatingEducations}
                    disabled={!value}
                    onClick={() =>
                      handleUpdateEducation(
                        educationTypeId,
                        value,
                        toggleViewType()
                      )
                    }
                  >
                    {/* Save */}
                    <FormattedMessage id="app.update" defaultMessage="Update" />
                  </Button>
                
                  <Button type="cancel"  onClick={() => toggleViewType()}>
                    {/* Cancel */}
                    <FormattedMessage id="app.cancel" defaultMessage="Cancel" />
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
      removeEducation,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(SingleEducations);



