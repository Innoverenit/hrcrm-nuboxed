import React, {  Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Button, } from "antd";
import { Formik, Form, Field, FastField } from "formik";
import { InputComponent } from "../../../../../../../Components/Forms/Formik/InputComponent";
import { TextareaComponent } from "../../../../../../../Components/Forms/Formik/TextareaComponent";
import DragableUpload from "../../../../../../../Components/Forms/Formik/DragableUpload";
 import { SelectComponent } from "../../../../../../../Components/Forms/Formik/SelectComponent";
import { DatePicker } from "../../../../../../../Components/Forms/Formik/DatePicker";
import { addTrainingDetails,getLinkedUsersDocument } from "../../../../../../Profile/ProfileAction";
import dayjs from "dayjs";

// const documentSchema = Yup.object().shape({
//   documentId: Yup.string().required("Input needed !"),
// });

class TrainingDocumentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      translatedMenuItems: [],
    };
  }

  componentDidMount() {
    const { getLinkedUsersDocument ,orgId} = this.props;
    this.props.getLinkedUsersDocument(this.props.orgId);
    this.fetchMenuTranslations();
    // getLinkedUsersDocument(orgId);
   
}
componentDidUpdate(prevProps) {
  if (prevProps.selectedLanguage !== this.props.selectedLanguage) {
    this.fetchMenuTranslations();
  }
}
fetchMenuTranslations = async () => {
  try {
    const itemsToTranslate = [
      "76",//0Type
      "1692",//1Course Name
      "15",//2"Organization"
      "1184",//3"Grade"
      "176",//4"Start Date"
      "138",// Document Id5
      "1181",// Name of Document6
     "1182", // Description of document7
     "154", // submit8
    ];

    const translations = await this.props.translateText(itemsToTranslate, this.props.selectedLanguage);
    this.setState({ translatedMenuItems: translations });
  } catch (error) {
    console.error('Error translating menu items:', error);
  }
};
  render() {
    const { addingTrainingDetails } = this.props;
    const documentNameOption = this.props.linkedUserDocument.map((item) => {
      return {
          label: `${item.documentTypeName|| ""}`,
          value: item.documentTypeId,
      };
  });
    return (
      <>
        <Formik
          // enableReinitialize
          initialValues={{
            employeeId: this.props.employeeId,
            courseName: "",
            grade: "",
            startDate: "",
            documentTypeId: this.props.documentTypeId,
            endDate: "",
            organization: "",
            documentId: "",
          }}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            this.props.addTrainingDetails(
              {
                ...values,
                startDate: dayjs(values.startDate).toISOString(),
                endDate: dayjs(values.endDate).toISOString(),
              },
              this.props.employeeId,
              values.documentId,
              resetForm()
            );
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
                <div class=" flex w-full h-full justify-between"

                >
                  <div class=" w-[45%]"
                  >
                    <div class=" flex justify-between" >
                      <div class=" w-full" >
                      <div className=" text-xs font-bold font-poppins"> {this.state.translatedMenuItems[0]}</div>
                      <FastField
                    name="documentTypeId"
                    type="text"
                  
                    options={
                      Array.isArray(documentNameOption)
                        ? documentNameOption
                        : []
                    }
                    component={SelectComponent}
                    inlineLabel
                    className="field"
                    isColumn
                     />
               <div class=" mt-3">
               <div className=" text-xs font-bold font-poppins"> {this.state.translatedMenuItems[1]}</div>
                        <FastField
                          isRequired
                          name="courseName"
                        
                          type="text"
                          width={"100%"}
                          isColumn
                          component={InputComponent}
                          inlineLabel
                           />
                           </div>
                      </div>
                    </div>

                   
                    <div class=" flex justify-between mt-3" >
                      <div class=" w-[60%]" >
                      <div className=" text-xs font-bold font-poppins"> {this.state.translatedMenuItems[2]}</div>
                        {/* <div class="font-bold m-[0.1rem-0-0.02rem-0.2rem] text-xs flex flex-col">Organization/Institution</div> */}
                        <FastField
                          type="Organization"
                          name="organization"
                         
                          className="field"
                          isColumn
                          width={"100%"}
                          component={InputComponent}
                          inlineLabel
                          />
                      </div>
                      <div class=" w-[30%]" >
                      <div className=" text-xs font-bold font-poppins"> {this.state.translatedMenuItems[3]}</div>
                        <FastField
                          name="grade"
                         
                          isColumn
                          selectType="text"
                          width={"30%"}
                          component={InputComponent}
                          inlineLabel
                           style={{
                             width: "100%",
                           }}
                        />
                      </div>
                    </div>
                 
                    <div class=" flex justify-between mt-3" >
                      <div class=" w-[47%]" >
                      <div className=" text-xs font-bold font-poppins"> {this.state.translatedMenuItems[4]}</div>
                        <Field
                          name="startDate"
                          isRequired
                          component={DatePicker}
                          isColumn
                          width={"100%"}
                          value={values.startDate}
                          inlineLabel
                          />
                      </div>

                    </div>
                
                  </div>

                  <div class=" w-[50%]" >
                
                    <div class=" w-full"  >
                      <Field
                        name="documentId"
                        isRequired
                        component={DragableUpload}
                      />
                    <div class=" mt-3">
                    <div className=" text-xs font-bold font-poppins"> {this.state.translatedMenuItems[6]}</div>
                      <Field
                        name="documentTitle"
                        width={"100%"}
                        isColumn
                        component={InputComponent}
                        />
                        </div>
                        <div class=" mt-3">
                        <div className=" text-xs font-bold font-poppins"> {this.state.translatedMenuItems[7]}</div>
                      <Field
                        name="documentDescription"
                        isRequired
                        isColumn
                        width={"100%"}
                        component={TextareaComponent}
                          />
                            </div>
                  
                    </div>

                   

                    {/* <FieldArray
                                    name="address"
                                    render={(arrayHelpers) => (
                                        <AddressFieldArray
                                            singleAddress
                                            arrayHelpers={arrayHelpers}
                                            values={values}
                                        />
                                    )}
                                /> */}

                  
                  </div>
                </div>
              
                <div class=" flex justify-end mt-3" >
                  <Button
                    htmlType="submit"
                    type="primary"
                    Loading={addingTrainingDetails}
                  >
                {this.state.translatedMenuItems[8]}
                  </Button>
                </div>
              </Form>
            )}
        </Formik>
      </>
    );
  }
}

const mapStateToProps = ({ employee,auth, profile }) => ({
  linkedUserDocument:profile.linkedUserDocument,
  orgId: auth.userDetails.organizationId,
  employeeId: employee.singleEmployee.employeeId,
  addingTrainingDetails: profile.addingTrainingDetails,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ addTrainingDetails,getLinkedUsersDocument }, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TrainingDocumentForm);
