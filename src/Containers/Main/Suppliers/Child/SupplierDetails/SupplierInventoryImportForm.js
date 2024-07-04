import React, { lazy, Suspense, Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Button, Switch, Tooltip, Icon,Select } from "antd";

// import { RightSquareOutlined, ToTopOutlined } from '@ant-design/icons';
import { Formik, Form, Field, FieldArray,FastField } from "formik";
import { StyledDrawer, StyledModal } from "../../../../../Components/UI/Antd";
import { Spacer, StyledLabel } from "../../../../../Components/UI/Elements";
import SearchSelect from "../../../../../Components/Forms/Formik/SearchSelect";
import { SelectComponent } from "../../../../../Components/Forms/Formik/SelectComponent";
import {addSupplierInventoryImportForm} from "../../SuppliersAction"

// import { getOppoStages, getLevels } from "../../Settings/SettingsAction";
import { FlexContainer } from "../../../../../Components/UI/Layout";
import DragableUpload from "../../../../../Components/Forms/Formik/DragableUpload";
// import { leadsReducer } from "../LeadsReducer";
import ImportTaskUpload from "../../../../../Components/Forms/Formik/ImportTaskUpload";


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
class SupplierInventoryImportForm extends Component {
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
              
               
                excelId:"",
                userId:this.props.userId,
                orgId:this.props.orgId,
               
                // shareInd:"",
                //opportunityId:this.props.opportunity.opportunityId,
              }}
            //    validationSchema={documentSchema}
              onSubmit={(values, { resetForm }) => {
                console.log(values);
                this.props.addSupplierInventoryImportForm(
                  // values.documentId,
                  {
                    ...values,
                    //shareInd:this.state.showUserList,
                  },
                  this.props.userId,
                  this.callback
                );
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
                        name="excelId"
                        isRequired
                        component={ImportTaskUpload}
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
                loading={this.props.addingSupplierInventoryImportForm}
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

const mapStateToProps = ({ document, suppliers,leads,employee, departments,auth }) => ({
    // addingLeadsImportForm:leads.addingLeadsImportForm,
    userId:auth.userDetails.userId,
    orgId: auth.userDetails.organizationId,
    addingSupplierInventoryImportForm:suppliers.addingSupplierInventoryImportForm

});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        addSupplierInventoryImportForm
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(SupplierInventoryImportForm);
