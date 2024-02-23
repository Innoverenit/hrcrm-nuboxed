import React, { Component } from "react";
import { Button, Tooltip,Popconfirm } from "antd";
import { FormattedMessage } from "react-intl";
import dayjs from "dayjs";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {removeIdProof} from "../Id Proof/IdProofAction"
import { TextInput } from "../../../Components/UI/Elements";
import { DeleteOutlined } from "@ant-design/icons";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import ViewEditCard from "../../../Components/UI/Elements/ViewEditCard";


class SingleIdProof extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "",
      IdProofType: "",
    };
  }
  render() {
    const {
      idProof: { IdProofType,creationDate, IdProofTypeId },
      handleChange,
      name,
      value,
      linkedIdProofs,
      updatingIdProofs,
      handleUpdateIdProof,
      handleDeleteIdProof,
    } = this.props;
    console.log(linkedIdProofs);
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
                  {IdProofType}&nbsp;&nbsp;&nbsp;
            {date === currentdate ?<span class="text-xs text-[tomato] font-bold"
                                  >
                                    New
                                  </span> : null}
                </div>
                <div>
                  {this.props.idProof.editInd ? (
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
                          onConfirm={() => this.props.removeIdProof(IdProofTypeId )}
                        >
                    <DeleteOutlined
                    
                      // onClick={() => handleDeleteIdProof(IdProofTypeId)}
                    
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
                  // value={value || idProofType}
                  defaultValue={IdProofType}
                  onChange={handleChange}
                  style={{ width: "60%" }}
                />
               
                <div class=" ml-auto" >
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={updatingIdProofs}
                    disabled={!value}
                    onClick={() =>
                      handleUpdateIdProof(
                        IdProofTypeId,
                        value,
                        toggleViewType()
                      )
                    }
                  >
                    {/* Save */}
                    <FormattedMessage id="app.update" defaultMessage="Update" />
                  </Button>
               
                  <Button type="primary" ghost onClick={() => toggleViewType()}>
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
      removeIdProof,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(SingleIdProof);



