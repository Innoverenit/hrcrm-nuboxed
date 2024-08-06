import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import { Button } from "antd";
import { Formik, Form, Field } from "formik";
import axios from "axios";
import { base_url } from "../../../Config/Auth";
import { InputComponent } from "../Formik/InputComponent";
import FormikPlacesAutoComplete from "../Formik/FormikPlacesAutoComplete";
import { updateUserAddress } from "../../../Containers/Auth/AuthAction";
import { updateEmployeeAddress } from "../../../Containers/Employees/EmployeeAction";
import { updateEmergencyAddress } from "../../../Containers/Profile/ProfileAction";
import { updatePartnerAddress } from "../../../Containers/Partner/PartnerAction";
class EditAddressField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSubmitting: false,
      isSubmittingError: false,
    };
  }

  updateAddress = (addressId, address) => {
    const {
      editAddressType,
      contactId,
      accountId,
      userId,
      partnerId,
      employeeId,
      emergencyId,
      updateUserAddress,
      updateEmployeeAddress,
      updatePartnerAddress,
      updateEmergencyAddress,
      toggleEdit,
    } = this.props;
    this.setState({ isSubmitting: true });
    axios
      .put(`${base_url}/address/${addressId}`, address, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        this.setState({ isSubmitting: false });
        toggleEdit();
        console.log(res);
        if (editAddressType === "partner") {
          updatePartnerAddress(partnerId, res.data);
        }
        if (editAddressType === "employee") {
          debugger;
          updateEmployeeAddress(employeeId, res.data);
        }
        if (editAddressType === "emergency") {
          updateEmergencyAddress(emergencyId, res.data);
        }
        if (editAddressType === "user") {
          updateUserAddress(userId, res.data);
        }
      })
      .catch((err) => {
        toggleEdit();
        this.setState({ isSubmitting: false, isSubmittingError: true });
        console.log(err);
      });
  };

  render() {
    const {
      components: {
        addressId,
        address1,
        address2,
        street,
        town,
        city,
        state,
        country,
        postalCode,
        latitude,
        longitude,
      },
    } = this.props;
    const { isSubmitting } = this.state;
    console.log(this.props);
    return (
      <>
        <Formik
          enableReinitialize
          initialValues={{
            address: {
              address1: address1 || "",
              address2: address2 || "",
              street: street || "",
              town: town || "",
              city: city || "",
              state: state || "",
              country: country || "",
              postalCode: postalCode || "",
              latitude: latitude || "",
              longitude: longitude || "",
            },
          }}
          onSubmit={(values) => this.updateAddress(addressId, values.address)}
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
                  noLabel
                  component={FormikPlacesAutoComplete}
                  options={{}}
                />
                <mt-3 />           
                <Field
                  noLabel
                  placeholder="Address 1"
                  name="address.address1"
                  component={InputComponent}
                // defaultValue='low'
                />
                <Field
                  noLabel
                  placeholder="Address 2"
                  name="address.address2"
                  component={InputComponent}
                // defaultValue='low'
                />
                <Field
                  noLabel
                  placeholder="Street"
                  name="address.street"
                  component={InputComponent}
                // defaultValue='low'
                />
                <Field
                  noLabel
                  placeholder="Town"
                  name="address.town"
                  component={InputComponent}
                // defaultValue='low'
                />
                <Field
                  noLabel
                  placeholder="City"
                  name="address.city"
                  component={InputComponent}
                // defaultValue='low'
                />
                <Field
                  noLabel
                  placeholder="State"
                  name="address.state"
                  component={InputComponent}
                // defaultValue='low'
                />
                <Field
                  noLabel
                  placeholder="Country"
                  name="address.country"
                  component={InputComponent}
                // defaultValue='low'
                />
                <Field
                  noLabel
                  placeholder="Zip code"
                  name="address.postalCode"
                  component={InputComponent}
                // defaultValue='low'
                />
                <mt-3 />
                <div class=" flex flex-row flex-wrap items-start self-start justify-end grow shrink h-auto mr-auto ">
                  <Button type="primary" htmlType="submit" Loading={isSubmitting}>
                   {/* Save  */}
                   <FormattedMessage
                 id="app.save"
                 defaultMessage="Save"
                />
                </Button>
                &nbsp;
                <Button type="default" onClick={this.props.toggleEdit}>
                    {/* Cancel */}
                    <FormattedMessage
                 id="app.cancel"
                 defaultMessage="Cancel"
                />
                </Button>
                </div>
              </Form>
            )}
        </Formik>
      </>
    );
  }
}
const mapStateToProps = ({ }) => ({});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      // updateContactAddress,
      updateEmployeeAddress,
      updateUserAddress,
      updateEmergencyAddress,
      updatePartnerAddress
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(EditAddressField);
