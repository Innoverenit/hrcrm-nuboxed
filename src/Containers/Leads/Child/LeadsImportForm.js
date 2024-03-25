import React, { lazy, Suspense, Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Button, Switch, Tooltip, Icon,Select } from "antd";

// import { RightSquareOutlined, ToTopOutlined } from '@ant-design/icons';
import { Formik, Form, Field, FieldArray,FastField } from "formik";
import { StyledDrawer, StyledModal } from "../../../Components/UI/Antd";
import { Spacer, StyledLabel } from "../../../Components/UI/Elements";
import SearchSelect from "../../../Components/Forms/Formik/SearchSelect";
import { SelectComponent } from "../../../Components/Forms/Formik/SelectComponent";
import {addLeadsImportForm} from "../LeadsAction"

// import { getOppoStages, getLevels } from "../../Settings/SettingsAction";
import { FlexContainer } from "../../../Components/UI/Layout";
import DragableUpload from "../../../Components/Forms/Formik/DragableUpload";
import { leadsReducer } from "../LeadsReducer";


const { Option } = Select;
// const documentSchema = Yup.object().shape({
// documentName: Yup.string().required("This field is required !"),
// documentId: Yup.string().required("Input needed !"),
// documentDescription: Yup.string().required("This field is required !"),
// stageId: Yup.string().required("This field is required !")
// });
// const documentSchema = Yup.object().shape({

// documentId: Yup.string().required("Input needed!"),
// });
class LeadsImportForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      documentshare: false,
      approvalAbove: false,
      showUserList: false,
      ownerAbove: "Specific",
      selectedownerAbove: "Specific",
      data: [1],
    };
  }
 

 

  render() {
   
   
   const catagory=[
    {
      id:1,
      name:"Document"  
    },
    {
        id:2,
        name:"Spreadsheet"  
      },
      {
        id:3,
        name:"Presentation"  
      },
      {
        id:4,
        name:"Image"  
      },
   ]


  

 
 
    return (
      <>
       
         
            <Formik
              // enableReinitialize
              initialValues={{
              
                name: "", //input
                description: "",
                included: [],
                documentId:"",
                department:"",
                catagory:"",
                // userId:this.props.userId,
                documentType: "",
                // shareInd:"",
                //opportunityId:this.props.opportunity.opportunityId,
              }}
            //    validationSchema={documentSchema}
              onSubmit={(values, { resetForm }) => {
                console.log(values);
                // this.props.addOrganizationDocument(
                //   // values.documentId,
                //   {
                //     ...values,
                //     shareInd:this.state.showUserList,
                //   },
                //   this.props.orgId,
                //   this.callback
                // );
                resetForm();
              }}
            >
              {({
                errors,
                touched,
                isSubmitting,
                setFieldValue,
                setFieldTouched,
                values,
                ...rest
              }) => (
                <Form className="form-background">
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: "45%",
                      }}
                    >
                      <Field
                        name="documentId"
                        isRequired
                        component={DragableUpload}
                        // component={DocumentUpload}
                      />
                      {errors.documentId && (
                        <p style={{ color: "tomato", fontWeight: 600 }}>
                          {errors.documentId}
                        </p>
                      )}
                      <Spacer />
                  
                  <Spacer />
                   
                    </div>
                    
                  </div>

                  <Spacer />
                  <FlexContainer justifyContent="flex-end">
                    <Button
                      htmlType="submit"
                      type="primary"
                    Loading={this.props.addingLeadsImportForm}
                    >
                      Submit
                    </Button>
                  </FlexContainer>
                </Form>
              )}
            </Formik>
        
       
      </>
    );
  }
}
// const DocumentUploadModal = (props) => {
//     console.log(props)

// }

const mapStateToProps = ({ document, settings,leads,employee, departments,auth }) => ({
    addingLeadsImportForm:leads.addingLeadsImportForm
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        addLeadsImportForm
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(LeadsImportForm);
