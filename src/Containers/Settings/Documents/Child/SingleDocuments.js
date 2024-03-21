import React, { Component,lazy } from "react";
import { FormattedMessage } from "react-intl";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { DeleteOutlined } from "@ant-design/icons";
import {linkTypeToggle,removeDocuments} from "../DocumentsAction";
import { connect } from "react-redux";
import dayjs from "dayjs";
import { bindActionCreators } from "redux";
import { Button,Tooltip, Select,Popconfirm } from "antd";
import { TextInput } from "../../../../Components/UI/Elements";
import ViewEditCard from "../../../../Components/UI/Elements/ViewEditCard";
const DocumentStatusToggle = lazy(() =>
  import("./DocumentStatusToggle")
);
class SingleDocuments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      documentTypeName: "",
      type:"",
      
      
    };
  }
  handleStageType=(value)=>{
    const { documentTypeId } = this.props.document;
    console.log(value)
    this.setState({type:value});
    let data={
      userType:value,
      documentTypeId: documentTypeId,
    }
    this.props.linkTypeToggle(data);
    // this.props.linkTypeToggle(value);
  }

  render() {
    const {
      document: { documentTypeName,creationDate,editInd, mandatoryInd, userType, documentTypeId },
      handleChange,
      name,
      value,
  
      documents,
      linkedDocuments,
      updatingDocuments,
      handleUpdateDocument,
      handleDeleteDocument,
    } = this.props;
    const currentdate = dayjs().format("DD/MM/YYYY");
    const date = dayjs(creationDate).format("DD/MM/YYYY");
    console.log(linkedDocuments);
    return (
      <div class=" w-full cursor-pointer">
        <ViewEditCard>
          {({ viewType }, toggleViewType) =>
            viewType === "view" ? (
              <div>
                <div class=" flex" >
                  <div class=" w-60">
                  <div class=" font-semibold" >
                    {documentTypeName}&nbsp;&nbsp;&nbsp;
            {date === currentdate ?<span class="text-xs text-[tomato] font-bold"
                                  >
                                    New
                                  </span> : null}
                  </div>
                  </div>
                  {/* <FlexContainer style={{justifyContent:"flex-end",marginTop:"-31px"}} > */}
                  <div class="flex justify-between w-96">
                  <div class=" w-[8rem]"  >
                    <Select style={{ width: "100%"}}
                onChange={this.handleStageType}
                value={userType}
                // defaultValue={this.state.type}
                placeholder="Select Entity"
                >
                  <option value="User">User</option>
        <option value="Customer">Customer</option>
        <option value="Supplier">Supplier</option>
      
                </Select> 
                    </div>
                  <div >
                    <DocumentStatusToggle
                  editInd={editInd}
                      mandatoryInd={mandatoryInd}
                      documentTypeName={documentTypeName}
                      documentTypeId={documentTypeId}
                    />  
                    </div>
                  
                    <div >               
                   {editInd && !mandatoryInd &&(
                      <BorderColorIcon
                      
                        tooltipTitle="Edit"
                        iconType="edit"
                        onClick={toggleViewType}
                        style={{fontSize:"1rem"}}
                      />
                    ) }  
                 
                 {editInd && !mandatoryInd &&(
                     <Tooltip title="Delete">
                        <Popconfirm
                          title="Do you want to delete?"
                          okText="Yes"
                          cancelText="No"
                          onConfirm={() => this.props.removeDocuments(documentTypeId )}
                        >
                    <DeleteOutlined
                    
                      // onClick={() => handleDeleteDocument(documentTypeId)}
                     
                      style={{
                        verticalAlign: "center",
                        marginLeft: "1rem",
                        fontSize:"1rem",
                        color: "red",
                      }}
                    />
                    </Popconfirm>
                  </Tooltip>  
                      ) }                
                  </div>
                  </div>
                </div>
                {/* </FlexContainer> */}
              </div>
            ) : (
              <div class=" flex" >
                <TextInput
                  name={name}
                  // value={value || documentTypeName}
                  defaultValue={documentTypeName}
                  onChange={handleChange}
                  style={{ width: "60%" }}
                />
              
              <div class=" flex justify-end" >
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={updatingDocuments}
                    disabled={!value}
                    onClick={() =>
                      handleUpdateDocument(
                        documentTypeId,
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
const mapStateToProps = ({ document }) => ({
 
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      linkTypeToggle,
      removeDocuments
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(SingleDocuments);

