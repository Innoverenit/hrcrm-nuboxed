import React, { Component } from "react";
import { Formik, Form, Field } from "formik";
import { Button, Tooltip } from "antd";

import BorderColorIcon from "@mui/icons-material/BorderColor";
import { InputComponent } from "../../../../../../Components/Forms/Formik/InputComponent";
import FormikPlacesAutoComplete from "../../../../../../Components/Forms/Formik/FormikPlacesAutoComplete";
import {
  MultiAvatar,
} from "../../../../../../Components/UI/Elements";
import { ActionIcon, } from "../../../../../../Components/Utils";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

class EmployeeOverviewView extends Component {
  render() {
    const {
      singleEmployee: { address },
      singleEmployee,
      toggleViewType,
    } = this.props;

    return (
      <>
        <div class=" flex justify-between" >
          <div class=" flex justify-start flex-no-wrap w-[85%]"
          >
            <div class=" w-[20%]" >
              <MultiAvatar
                primaryTitle={singleEmployee.firstName}
                imageId={singleEmployee.imageId}
                imageURL={singleEmployee.imageURL}
              />
            </div>
          
            <div class=" flex flex-col w-full ml-2" >
              <div class=" w-wk text-[#444] overflow-hidden text-lg textOverflow-ellipsis"
             
              >{`${singleEmployee.fullName || ""} 
                `}</div>
            </div>
          </div>
          <div class=" flex justify-end w-[15%] ml-2" >
            {/* <ActionIcon
              tooltipTitle="Address"
              iconType="environment"
              handleIconClick={this.handleMapModalVisible}
              size="1em"
            />{" "}
            &nbsp; */}
            {/* <ActionIcon
              tooltipTitle="Address"
              iconType="environment"
              handleIconClick={this.handleMapModalVisible}
              size="1em"
            /> */}
      <Tooltip title="Edit">
            <BorderColorIcon
             
              // iconType="edit"
              onClick={toggleViewType}
              style={{
                color: "grey",
                cursor: "pointer",
                fontSize: "1rem",
              }}
            />
            </Tooltip>
          </div>
        </div>
      </>
    );
  }
}

export default EmployeeOverviewView;

class AddressField extends Component {
  render() {
    const { employeeId, addAddress, handleAddAddressVisible } = this.props;
    return (
      <>
        <Formik
          enableReinitialize
          initialValues={{
            address: {
              address1: "",
              address2: "",
              street: "",
              town: "",
              city: "",
              state: "",
              country: "",
              postalCode: "",
              latitude: "",
              longitude: "",
            },
          }}
          onSubmit={(values) => {
            console.log(values);
            const newAddress = {
              ...values.address,
              association: {
                employeeId: employeeId,
              },
            };
            console.log(newAddress);
            addAddress(newAddress);
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
                <Field
                  name={`address`}
                  // label="Work place"
                  label={
                    <FormattedMessage
                      id="app.address"
                      defaultMessage="Work place"
                    />
                  }
                  component={FormikPlacesAutoComplete}
                  options={{}}
                />
                <Field
                  //label="Address1"
                  label={
                    <FormattedMessage
                      id="app.address.address1"
                      defaultMessage="Address1"
                    />
                  }
                  name="address.address1"
                  component={InputComponent}
                // defaultValue='low'
                />
                <Field
                  //label="address2"
                  label={
                    <FormattedMessage
                      id="app.address.address2"
                      defaultMessage="address2"
                    />
                  }
                  name="address.address2"
                  component={InputComponent}
                // defaultValue='low'
                />
                <Field
                  //label="street"
                  label={
                    <FormattedMessage
                      id="app.address.street"
                      defaultMessage="street"
                    />
                  }
                  name="address.street"
                  component={InputComponent}
                // defaultValue='low'
                />
                <Field
                  // label="town"
                  label={
                    <FormattedMessage
                      id="app.address.town"
                      defaultMessage="town"
                    />
                  }
                  name="address.town"
                  component={InputComponent}
                // defaultValue='low'
                />
                <Field
                  // label="city"
                  label={
                    <FormattedMessage
                      id="app.address.city"
                      defaultMessage="city"
                    />
                  }
                  name="address.city"
                  component={InputComponent}
                // defaultValue='low'
                />
                <Field
                  //label="state"
                  label={
                    <FormattedMessage
                      id="app.address.state"
                      defaultMessage="state"
                    />
                  }
                  name="address.state"
                  component={InputComponent}
                // defaultValue='low'
                />
                <Field
                  //label="country"
                  label={
                    <FormattedMessage
                      id="app.address.country"
                      defaultMessage="country"
                    />
                  }
                  name="address.country"
                  component={InputComponent}
                // defaultValue='low'
                />
                <Field
                  //  label="postalCode"
                  label={
                    <FormattedMessage
                      id="app.address.postalCode"
                      defaultMessage="postalCode"
                    />
                  }
                  name="address.postalCode"
                  component={InputComponent}
                // defaultValue='low'
                />

                <Button type="primary" htmlType="submit">
                  <FormattedMessage id="app.save" defaultMessage="Save" />
                </Button>
                <Button type="default" onClick={handleAddAddressVisible}>
                  <FormattedMessage id="app.cancel" defaultMessage="Cancel" />
                  {/* Cancel */}
                </Button>
              </Form>
            )}
        </Formik>
      </>
    );
  }
}
