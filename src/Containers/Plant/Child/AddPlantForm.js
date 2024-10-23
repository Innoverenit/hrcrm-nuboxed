import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "antd";
import { Formik, Form, Field, FieldArray } from "formik";
import * as Yup from "yup";
import { InputComponent } from "../../../Components/Forms/Formik/InputComponent";
import { SelectComponent } from "../../../Components/Forms/Formik/SelectComponent";
import AddressFieldArray from "../../../Components/Forms/Formik/AddressFieldArray";
// import { getSalesManagerUser } from "../../Teams/TeamsAction";
import {addPlant, getProductionManager } from "../PlantAction";

const FormSchema = Yup.object().shape({
  firstName: Yup.string().required("Please provide First Name"),
  zoneId: Yup.string().required("Input required!"),
  areaId: Yup.string().required("Input required!"),
});

function AddPlantForm(props) {
  useEffect(() => {
    // props.getSalesManagerUser();
    props.getProductionManager();
  }, []);


  const productionOption = props.productionManagement.map((item) => {
    return {
      label: `${item.salutation || ""} ${item.firstName ||
        ""} ${item.middleName || ""} ${item.lastName || ""}`,
      value: item.userId,
    };
  });
  return (
    <>
      <Formik
        initialValues={{
          plantName: "",
          management: "",
          productionManager: "",
          userId: props.userId,
          address: [
            {
              addressType: "",
              address1: "",
              address2: "",
              addressId: "",

              city: "",
              pinCode: "",
              country: "",
              county: "",
              latitude: "",
              longitude: "",
              location: "",
            },
          ],
        }}
        // validationSchema={FormSchema}
        onSubmit={(values, { resetForm }) => {
          console.log(values);
          props.addPlant({
            ...values,
          });
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
                <Field
                  name="plantName"
                  label="Name"
                  type="text"
                  width={"100%"}
                  component={InputComponent}
                  isColumn
                  inlineLabel
                  isRequired
                  style={{
                    flexBasis: "80%",
                    height: "35px",
                    // marginTop: "0px",
                  }}
                />
                <div class=" mt-3" />

                <div style={{ width: "100%" }}>
                  <div class=" text-xs font-bold font-poppins text-black">Management</div>
                </div>
                <div style={{ width: "100%" }}>
                  <Field
                    name="management"
                    placeholder="Management"
                    noLabel
                    component={SelectComponent}
                    options={4
                      // Array.isArray(managementOption) ? managementOption : []
                    }
                    style={{
                      borderRadius: "2px",
                    }}
                  />
                </div>

                <div class=" mt-3" />

                <div style={{ width: "100%" }}>
                  <div class=" text-xs font-bold font-poppins text-black">Production Manager</div>
                  <Field
                    name="productionManager"
                    placeholder="Production Manager"
                    noLabel
                    // isRequired
                    component={SelectComponent}
                    options={
                      Array.isArray(productionOption) ? productionOption : []
                    }
                    style={{
                      borderRadius: "2px",
                    }}
                  />
                </div>
                <div class=" mt-3" />
              </div>
              <div class=" mt-3" />
              <div
                style={{
                  height: "100%",
                  width: "45%",
                }}
              >
                <FieldArray
                  name="address"
                  render={(arrayHelpers) => (
                    <AddressFieldArray
                      singleAddress
                      arrayHelpers={arrayHelpers}
                      values={values}
                    />
                  )}
                />
                {/* </div> */}
              </div>
            </div>
            <div class=" mt-3" />
            <div class=" flex flex-row flex-wrap items-start self-start justify-end grow shrink h-auto mr-auto ">
              <Button
                type="primary"
                htmlType="submit"
                loading={props.addingPlant}
              >
                Create
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}
const mapStateToProps = ({ plant, auth, teams }) => ({
  userId: auth.userDetails.userId,

  addingPlant: plant.addingPlant,
  // salesManagementUsers: teams.salesManagementUsers,
  productionManagement: plant.productionManagement,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addPlant,
      // getSalesManagerUser,
      getProductionManager,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(AddPlantForm);
