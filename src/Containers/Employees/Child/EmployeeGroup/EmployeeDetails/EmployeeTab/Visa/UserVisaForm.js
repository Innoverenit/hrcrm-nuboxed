import React, {  Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Button, Switch, Tooltip, } from "antd";
import { Formik, Form, Field, FastField } from "formik";
import {getCountries} from "../../../../../../Auth/AuthAction"
import * as Yup from "yup";
import DragableUpload from "../../../../../../../Components/Forms/Formik/DragableUpload";
import { SelectComponent } from "../../../../../../../Components/Forms/Formik/SelectComponent";
import { DatePicker } from "../../../../../../../Components/Forms/Formik/DatePicker";
import { addVisaDetails,getLinkedUsersDocument } from "../../../../../../Profile/ProfileAction";
import dayjs from "dayjs";
function onChange(date) {}

const documentSchema = Yup.object().shape({
  documentId: Yup.string().required("Input needed !"),
});
class UserVisaForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: "Full Time",
      type:null,
      entry: false,
    };
  }
  handleStageType=(value)=>
  this.setState({type:value});
  handleMultipleEntry = (checked) => {
    this.setState({ entry: checked });
  };
  glassButtoClick = (type) => {
    this.setState({ active: type });
    // alert(this.state.active)
  };

  componentDidMount() {
    const { getCountries ,} = this.props;
    this.props.getLinkedUsersDocument(this.props.orgId);
    getCountries(getCountries);
   
}

  render() {
    const { addingVisaDetails,startDate,endDate ,userId} = this.props;
    const countryNameOption = this.props.countries.map((item) => {
        return {
            label: `${item.country_name|| ""}`,
            value: item.country_name,
        };
    });
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
            userId: this.props.userId,
            multipleEntryInd: this.state.entry ? "Yes" : "No",
            documentTypeId: this.props.documentTypeId,
            type: "",
            country: "",
            startDate: startDate || dayjs(),
            endDate: endDate || null,
            endDate: dayjs(),
            documentId: "",
          }}
          onSubmit={(values, { resetForm }) => {
            this.props.addVisaDetails(
              {
                ...values,
                multipleEntryInd: this.state.entry ? "Yes" : "No",
              },
              this.props.userId,
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
                  <div> <FastField
                    name="documentTypeId"
                    type="text"
                    label="Type"
                 
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
                  </div>
              <div class=" mt-3">
                <Field
                        name="country"
                        isColumnWithoutNoCreate
                        //label="Mobile #"
                        label="Country"
                        isColumn
                        options={
                          Array.isArray(countryNameOption)
                            ? countryNameOption
                            : []
                        }
                        component={SelectComponent}
                        inlineLabel
                        />
                        </div>
                 
                  <div class=" w-[40%] mt-3" >
                          <FastField
                            name="type"
                            type="text"
                            label="Type"
                            options={["Business", "Work Permit"]}
                            component={SelectComponent}
                            inlineLabel
                            // className="field"
                            isColumn
                          />
                        </div>
                 
                
                  <div class=" flex justify-between mt-3" >
                    <div class=" w-[47%]" >
                      <Field
                        name="startDate"
                        label="Start Date"
                        isRequired
                        component={DatePicker}
                        isColumn
                        width={"100%"}
                        value={values.startDate}
                        inlineLabel
                        />
                    </div>
                    <div class=" w-[47%]" >
                      <Field
                        name="endDate"
                        label="End Date "
                        isRequired
                        isColumn
                        width={"100%"}
                        component={DatePicker}
                        // value={values.endDate}
                        value={values.endDate || values.startDate}
                        disabledDate={(currentDate) => {
                          if (values.startDate) {
                            if (
                              dayjs(currentDate).isBefore(
                                dayjs(values.startDate)
                              )
                            ) {
                              return true;
                            } else {
                              return false;
                            }
                          }
                        }}
                        inlineLabel
                        />
                    </div>
                  </div>
                  <div class=" w-[25%] font-bold"
                    >
                      <div class="font-bold m-[0.1rem-0-0.02rem-0.2rem] text-xs flex flex-col">Multiple Entry</div>
                      <Switch
                        onChange={this.handleMultipleEntry}
                        checked={this.state.entry}
                        checkedChildren="Yes"
                        unCheckedChildren="No"
                      />
                    </div>
               
                </div>

                <div class=" w-[45%]"
                >
                  <Field
                    name="documentId"
                    label="Document Id"
                    isRequired
                    component={DragableUpload}
                  />
               
                </div>
              </div>
            
              <div class=" flex justify-end mt-3" >
                <Button
                  htmlType="submit"
                  type="primary"
                  loading={addingVisaDetails}
                >
                Submit
                </Button>
              </div>
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

const mapStateToProps = ({ employee,auth, profile,education }) => ({
  employeeId: employee.singleEmployee.employeeId,
  educations: education.educations,
  countries: auth.countries,
  userId:auth.userDetails.userId,
  addingVisaDetails: profile.addingVisaDetails,
  linkedUserDocument:profile.linkedUserDocument,
  orgId: auth.userDetails.organizationId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ 
    addVisaDetails,
    getLinkedUsersDocument,
    getCountries
}, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserVisaForm);

function StatusIcon({ type, iconType, tooltip, status, size, onClick, role }) {
  const start = type;
  // console.log(start);
  //////debugger;
  if (status === type) {
    size = "1.875em";
  } else {
    size = "1em";
  }
  return (
    <Tooltip title={tooltip}>
      <Button
        ghost={status !== type}
        style={{
          padding: "0.375em",
          borderColor: "transparent",
          color: status === type ? "#1890ff" : "grey",
        }}
        onClick={onClick}
      >
        <i className={`fas ${iconType}`} style={{ fontSize: "1.375em" }}></i>
      </Button>
    </Tooltip>
  );
}
