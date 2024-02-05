import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import { Button, Switch, Tooltip,} from "antd";
import { Formik, Form, Field, FastField } from "formik";
import {getCountries} from "../../../../../../Auth/AuthAction"
import * as Yup from "yup";
import DragableUpload from "../../../../../../../Components/Forms/Formik/DragableUpload";
import { SelectComponent } from "../../../../../../../Components/Forms/Formik/SelectComponent";
import { DatePicker } from "../../../../../../../Components/Forms/Formik/DatePicker";
import { updateVisaDetails ,getLinkedUsersDocument} from "../../../../../../Profile/ProfileAction";
import dayjs from "dayjs";
function onChange(date) {}

const documentSchema = Yup.object().shape({
  documentId: Yup.string().required("Input needed !"),
});
class UpdateVisaForm extends Component {
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
   
    getCountries(getCountries);
     this.props.getLinkedUsersDocument(this.props.orgId);
   
}

  render() {
    const { updatingVisaDetails,startDate,endDate ,userId} = this.props;
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
        }
    });
    return (
      <>
        <Formik
          // enableReinitialize
          initialValues={{
            userId: this.props.userId,
            multipleEntryInd: this.state.entry ? "Yes" : "No",
            documentTypeId: this.props.setEditingVisa.documentTypeId,
             type: this.props.setEditingVisa.type || "",
            country: this.props.setEditingVisa.country || "",
            startDate: dayjs(this.props.setEditingVisa.startDate) || "",
            endDate: dayjs(this.props.setEditingVisa.startDate) || "",
            documentId: "",
          }}
          onSubmit={(values, { resetForm }) => {
            this.props.updateVisaDetails(
              {
                ...values,
                multipleEntryInd: this.state.entry ? "Yes" : "No",
              },
              this.props.setEditingVisa.visaId,
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
                    //label="Type"
                    label={
                      <FormattedMessage id="app.type" defaultMessage="Type" />
                    }
                 
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
                        label={<FormattedMessage
                          id="app.country"
                          defaultMessage="Country"
                        />}
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
                            label={
                              <FormattedMessage
                                id="app.type"
                                defaultMessage="Type"
                              />
                            }
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
                        //label="Start Date"
                        label={
                          <FormattedMessage
                            id="app.startDate"
                            defaultMessage="Start Date"
                          />
                        }
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
                        // label="End Date "
                        label={
                          <FormattedMessage
                            id="app.endDate"
                            defaultMessage="End Date"
                          />
                        }
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
                    label={
                      <FormattedMessage
                        id="app.documentId"
                        defaultMessage="Document Id"
                      />
                    }
                    isRequired
                    component={DragableUpload}
                  />
               
                 
                </div>
              </div>
              <div class=" flex justify-end mt-3" >
                <Button
                  htmlType="submit"
                  type="primary"
                  loading={updatingVisaDetails}
                >
                  <FormattedMessage id="app.update" defaultMessage="Update" />
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
  setEditingVisa:profile.setEditingVisa,
  linkedUserDocument:profile.linkedUserDocument,
  orgId: auth.userDetails.organizationId,
  updatingVisaDetails: profile.updatingVisaDetails,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ 
     updateVisaDetails,
     getLinkedUsersDocument,
    getCountries
}, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateVisaForm);

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
