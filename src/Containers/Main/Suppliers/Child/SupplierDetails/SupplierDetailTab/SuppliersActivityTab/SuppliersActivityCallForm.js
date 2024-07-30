import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Tooltip } from "antd";
import { Formik, Form, Field } from "formik";
import moment from "moment";
import { Spacer, StyledLabel } from "../../../../../../../Components/UI/Elements";
import { InputComponent } from "../../../../../../../Components/Forms/Formik/InputComponent";
import { DatePicker } from "../../../../../../../Components/Forms/Formik/DatePicker";
import { TimePicker } from "../../../../../../../Components/Forms/Formik/TimePicker";
import {
  addSuppliersActivityCall,
} from "../../../../SuppliersAction";
import { FlexContainer } from "../../../../../../../Components/UI/Layout";
// import SearchSelect from "../../../../../../../../Components/Forms/Formik/SearchSelect";
import { TextareaComponent } from "../../../../../../../Components/Forms/Formik/TextareaComponent";
import { StyledPopconfirm } from "../../../../../../../Components/UI/Antd";
import * as Yup from "yup";

const ButtonGroup = Button.Group;

const FormSchema = Yup.object().shape({
  startDate: Yup.string()
    .nullable()
    .required("Input needed!"),
  startTime: Yup.string()
    .nullable()
    .required("Input needed!"),
  endTime: Yup.string()
    .nullable()
    .required("Input needed!"),
});

class SuppliersActivityCallForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: "Follow up",
      selected: "Follow up",
      Type: "Outbound",
      selectedType: "Outbound",
    };
  }
  handleCategoryChange = (data) => {
    this.setState({ category: data });
    this.setState({ selected: data });
  };

  handleTypeChange = (data) => {
    debugger;
    this.setState({ Type: data });
    this.setState({ selectedType: data });
  };

  handleCallback = (resetForm) => {
    const { callback } = this.props;
    // this.props.getActivityListBySuppliersId(
    //     this.props.suppliersSuppliersId
    // );
    callback && callback();
    resetForm();
  };

  render() {
    console.log(this.state.category);
    const {
      user: { userId, firstName, middleName, lastName, timeZone },
      isEditing,
      prefillCall,
      addingCall,
      deleteCall,
      deletingCall,
      addCall,
      startDate,
      endDate,
      startTime,
      endTime,
      defaultContacts,
      ownerId,
      defaultAccounts,
      updateCall,
      updatingCall,
      defaultOpportunities,
    } = this.props;
    if (this.props.selectedCall) {
      var data = this.props.selectedCall.callCategory === "New" ? false : true;
    }

    return (
      <>
        <Formik
          initialValues={{
            type: this.state.Type,
            category: this.state.category,
            topic: "",
            startDate: startDate || moment(),
            startTime: startDate || null,
            endDate: endDate || null,
            endTime: endDate || null,
            // timeZone: timeZone,
            description: "",
            supplierId: this.props.supplier.supplierId,
            userId: this.props.userId,
          }}
          validationSchema={FormSchema}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            console.log(values);
            let timeZoneFirst = "GMT+05:30";

            let mytimeZone = timeZoneFirst.substring(4, 10);
            console.log(mytimeZone);

            var a = mytimeZone.split(":");
            console.log(a);
            var timeZoneminutes = +a[0] * 60 + +a[1];
            console.log(timeZoneminutes);
            if (!values.endDate) {
              values.endDate = values.startDate;
            }
            let newStartDate = moment(values.startDate).format("YYYY-MM-DD");
            console.log(newStartDate);
            //Time calculation
            let firstStartTime = moment(values.startTime).format(
              "HH:mm:ss.SSS[Z]"
            ); // getting start time from form input
            console.log(firstStartTime);

            let firstStartHours = firstStartTime.substring(0, 5); // getting only hours and minutes
            console.log(firstStartHours);

            let timeEndPart = firstStartTime.substring(5, 13); // getting seconds and rest
            console.log(timeEndPart);

            var firstStartTimeSplit = firstStartHours.split(":"); // removing the colon
            console.log(firstStartTimeSplit);

            var minutes =
              +firstStartTimeSplit[0] * 60 + +firstStartTimeSplit[1]; // converting hours into minutes
            console.log(minutes);

            var firstStartTimeminutes = minutes - timeZoneminutes; // start time + time zone
            console.log(firstStartTimeminutes);

            let h = Math.floor(firstStartTimeminutes / 60); // converting to hours
            let m = firstStartTimeminutes % 60;
            h = h < 10 ? "0" + h : h;
            m = m < 10 ? "0" + m : m;
            let finalStartTime = `${h}:${m}`;
            console.log(finalStartTime);

            let newStartTime = `${finalStartTime}${timeEndPart}`;
            console.log(newStartTime);

            let newEndDate = moment(values.endDate).format("YYYY-MM-DD");
            let firstEndTime = moment(values.endTime).format("HH:mm:ss.SSS[Z]"); // getting start time from form input
            console.log(firstEndTime);
            let firstEndHours = firstEndTime.substring(0, 5); // getting only hours and minutes
            console.log(firstEndHours);

            var firstEndTimeSplit = firstEndHours.split(":"); // removing the colon
            console.log(firstEndTimeSplit);
            var endMinutes = +firstEndTimeSplit[0] * 60 + +firstEndTimeSplit[1]; // converting hours into minutes
            console.log(endMinutes);
            var firstEndTimeminutes = Math.abs(endMinutes - timeZoneminutes); // start time + time zone
            console.log(firstEndTimeminutes);
            let hr = Math.floor(firstEndTimeminutes / 60); // converting to hours
            console.log(hr);
            let mi = firstEndTimeminutes % 60;
            console.log(hr);
            hr = hr < 10 ? "0" + hr : hr;
            mi = mi < 10 ? "0" + mi : mi;
            let finalEndTime = `${hr}:${mi}`;
            console.log(finalEndTime);
            console.log(timeEndPart);
            console.log(`${finalEndTime}${timeEndPart}`);

            let newEndTime = `${finalEndTime}${timeEndPart}`;
            this.props.addSuppliersActivityCall(
              {
                ...values,
                category: this.state.category,
                type: this.state.Type,

                startDate: `${newStartDate}T${newStartTime}`,
                endDate: `${newEndDate}T${newEndTime}`,

                startTime: 0,
                endTime: 0,
              },
              () => this.handleCallback(resetForm)
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
            <Form>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div
                  style={{
                    height: "100%",
                    width: "45%",
                  }}
                >
                  <FlexContainer
                    justifyContent="space-between"
                    style={{ width: "100%" }}
                  >
                    <div style={{ width: "30%" }}>
                      <StyledLabel>Type</StyledLabel>
                      <Spacer />
                      <FlexContainer
                        justifyContent="space-between"
                        style={{ width: "100%" }}
                      >
                        <Tooltip title="Outbound">
                          <div
                            onClick={() => this.handleTypeChange("Outbound")}
                            style={{
                              fontSize: "22px",
                              cursor: "pointer",
                              color:
                                this.state.selectedType === "Outbound"
                                  ? "Orange"
                                  : null,
                            }}
                          >
                            <i className="fas fa-sign-out-alt"></i>
                          </div>
                        </Tooltip>

                        <Tooltip title="Inbound">
                          <div
                            onClick={() => this.handleTypeChange("Inbound")}
                            style={{
                              fontSize: "22px",
                              cursor: "pointer",
                              color:
                                this.state.selectedType === "Inbound"
                                  ? "Orange"
                                  : null,
                            }}
                          >
                            <i className="fas fa-sign-in-alt"></i>
                          </div>
                        </Tooltip>
                        <Tooltip title="Conference">
                          <div
                            onClick={() => this.handleTypeChange("Conference")}
                            style={{
                              fontSize: "22px",
                              cursor: "pointer",
                              color:
                                this.state.selectedType === "Conference"
                                  ? "Orange"
                                  : null,
                            }}
                          >
                            <i className="fas fa-network-wired"></i>
                          </div>
                        </Tooltip>
                      </FlexContainer>
                    </div>
                    <div style={{ width: "55%" }}>
                      <StyledLabel>Category</StyledLabel>
                      <Spacer />
                      <ButtonGroup>
                        <Button
                          onClick={() => this.handleCategoryChange("Follow up")}
                          style={{
                            backgroundColor:
                              this.state.selected === "Follow up"
                                ? "orange"
                                : "white",
                            color:
                              this.state.selected === "Follow up"
                                ? "white"
                                : "black",
                          }}
                        >
                          Follow up
                        </Button>

                        <Button
                          onClick={() => this.handleCategoryChange("New")}
                          style={{
                            backgroundColor:
                              this.state.selected === "New"
                                ? "orange"
                                : "white",
                            color:
                              this.state.selected === "New" ? "white" : "black",
                          }}
                        >
                          New
                        </Button>
                      </ButtonGroup>
                    </div>
                  </FlexContainer>

                  <Spacer />
                  <Field
                    name="topic"
                    label="Topic"
                    component={InputComponent}
                    isColumn
                    width={"100%"}
                    inlineLabel
                    style={{
                      flexBasis: "80%",
                      height: "29px",
                      marginTop: "0px",
                    }}
                  />
                  <Spacer />
                  <Field
                    name="startDate"
                    label="Date"
                    component={DatePicker}
                    isColumn
                    isRequired
                    width={"100%"}
                    value={values.startDate}
                    inlineLabel
                    style={{
                      flexBasis: "80%",
                      height: "29px",
                      width: "100%",
                      marginTop: "0px",
                    }}
                  />
                  <Spacer />

                  <FlexContainer justifyContent="space-between">
                    <div style={{ width: "47%" }}>
                      <Field
                        name="startTime"
                        label="Start Time"
                        component={TimePicker}
                        isColumn
                        isRequired
                        use12Hours
                        value={values.startTime}
                        inlineLabel
                        style={{
                          flexBasis: "80%",
                          width: "100%",
                          marginTop: "0px",
                        }}
                      />
                    </div>
                    <div style={{ width: "47%" }}>
                      <Field
                        name="endTime"
                        label="End Time"
                        component={TimePicker}
                        use12Hours
                        isColumn
                        isRequired
                        value={values.endTime}
                        // inlineLabel
                        style={{
                          flexBasis: "80%",
                          marginTop: "0px",
                          width: "100%",
                        }}
                      />
                    </div>
                  </FlexContainer>
                  <Spacer />

                  <Spacer />
                  {startDate ? (
                    <span>
                      {moment(startDate).isBefore(moment()) && (
                        <span style={{ marginLeft: 10 }}>
                          <b>This Call occurs in the past !</b>
                        </span>
                      )}
                    </span>
                  ) : (
                    <span>
                      {moment(values.startDate).isBefore(moment()) && (
                        <span style={{ marginLeft: 10 }}>
                          <b>This Call occurs in the past !</b>
                        </span>
                      )}
                    </span>
                  )}
                </div>
                <div
                  style={{
                    height: "100%",
                    width: "45%",
                  }}
                >
                  <Field
                    name="description"
                    label="Description"
                    isColumn
                    width={"100%"}
                    component={TextareaComponent}
                    inlineLabel
                    style={{
                      flexBasis: "80%",
                      height: "80px",
                      marginTop: "0px",
                    }}
                  />
                </div>
              </div>
              <Spacer />
              <FlexContainer justifyContent="flex-end">
                {isEditing && (
                  <>
                    <StyledPopconfirm
                      title="Do you want to delete?"
                      onConfirm={() => deleteCall(prefillCall.callId)}
                    >
                      <Button
                        type="danger"
                        htmlType="submit"
                        loading={deletingCall}
                      >
                        Delete
                      </Button>
                    </StyledPopconfirm>
                  </>
                )}
                &nbsp;
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={this.props.addingSuppliersActivityCall}
                >
                  Create
                </Button>
              </FlexContainer>
            </Form>
          )}
        </Formik>
      </>
    );
  }
}

const mapStateToProps = ({ auth, suppliers }) => ({
  user: auth.userDetails,
  userId: auth.userDetails.userId,
  addingSuppliersActivityCall: suppliers.addingSuppliersActivityCall,

});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addSuppliersActivityCall,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SuppliersActivityCallForm);
