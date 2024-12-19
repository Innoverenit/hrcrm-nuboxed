import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Select } from "antd";
import dayjs from "dayjs";
import {getCurrency} from "../../../Auth/AuthAction"
import {
  getSupplierSupplies,
  getSupplierSuppliesQuality,
} from "../SuppliersAction";
import { Formik, Form, Field } from "formik";
import { InputComponent } from "../../../../Components/Forms/Formik/InputComponent";
import { DatePicker } from "../../../../Components/Forms/Formik/DatePicker";
import { updateQualitySuppliers } from "../SuppliersAction";
import { getEmployeelistAsErp } from "../../Shipper/ShipperAction";
import { SelectComponent } from "../../../../Components/Forms/Formik/SelectComponent";
const { Option } = Select;
const SuppliersListForm = (props) => {
  const [currentType, setCurrentType] = useState("");
  const [selectedquality, setSelectedQuality] = useState("");
  useEffect(() => {
    props.getEmployeelistAsErp();
    props.getCurrency();
    props.getSupplierSuppliesQuality();
    props.getSupplierSupplies(props.rowdata.supplierId);
  }, []);

  const handleSetCurrentType = (value, item) => {
    setCurrentType({
      ...currentType,
      [item.suppliesId]: value
    });
  };

  const handleQualityChange = (event) => {
    const selectedquality = event.target.value;
    setSelectedQuality(selectedquality);
  };

  const qualityData = props.supplierSuppliesQuality.map((item) => {
    return {
      label: `${item.code}`,
      value: item.qualityId,
    };
  });

  return (
    <Formik
      initialValues={{
        userId: props.userId,
        material: "",
        quality:[selectedquality],
        orgId: props.orgId,
        date: dayjs(),
        supplierId:props.rowdata.supplierId
      }}
      onSubmit={(values, { resetForm }) => {
        const newDate = dayjs(values.date).format("YYYY-MM-DD");

        const payload = {
          ...values,
          date: `${newDate}T20:00:00Z`,
        
        };
        // props.updateQualitySuppliers(payload, props.userId);
        resetForm();
      }}
    >
      {({ values, handleSubmit }) => (
        <div className="overflow-y-auto h-[34rem] overflow-x-hidden max-sm:h-[33rem]">
          <Form className="form-background">
            <div className="flex justify-between max-sm:flex-col">
              <div className="h-full w-w47.5.5 max-sm:w-full">
                <Field
                  name="material"
                  label={props.translatedMenuItems[32]}
                  isColumn
                  width={"100%"}
                  component={SelectComponent}
                  options={props.materialOption || []}
                  inlineLabel
                />
                <div className="flex justify-between mt-2">
                <div className="w-w47.5.5">
                  <Field
                    name="date"
                    label={props.translatedMenuItems[30]}
                    component={DatePicker}
                    isColumn
                    width={"100%"}
                    value={values.date}
                    onChange={(date) => handleSubmit({ ...values, date })}
                    inlineLabel
                  />
                </div>
                <div className="w-w47.5.5">
               
               <div style={{ fontWeight: "bold", fontSize: "0.75rem" }}>
                {/* Quality */} {props.translatedMenuItems[28]}
                </div>

               <Field
            name="quality"

           style={{width:"10rem"}}
            mode
            placeholder="Select"
            component={SelectComponent}
            options={Array.isArray(qualityData) ? qualityData : []}
            value={values.quality}   
          />      
             </div>
                </div>               
              </div>
              <div className="h-full w-w47.5.5 max-sm:w-full">
              <div className="flex justify-between">
                  <div className="w-w47.5.5 max-sm:w-[40%]">
                    <Field
                      isRequired
                      name="price"
                      type="text"
                      label={props.translatedMenuItems[19]}
                      width={"100%"}
                      component={InputComponent}
                      isColumn
                      inlineLabel
                    />
                  </div>
                  <div className="w-w47.5.5 max-sm:w-[50%]">
                    <Field
                      name="currency"
                      label={props.translatedMenuItems[33]}
                      isColumn
                      width={"100%"}
                      component={SelectComponent}
                      options={props.currencyNameOption || []}
                      inlineLabel
                    />
                  </div>
                </div>
             
              </div>
            </div>
            <div className="flex justify-end mt-3">
              <Button type="primary" htmlType="submit" loading={props.updatingQualitySuppliers}>
               {/* Create*/}
                {props.translatedMenuItems[12]} 
              </Button>
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
};

const mapStateToProps = ({ auth, shipper, employee, suppliers, shipBy }) => ({
  userId: auth.userDetails.userId,
  supplierSuppliesList: suppliers.supplierSuppliesList,
  user: auth.userDetails,
  updatingQualitySuppliers: suppliers.updatingQualitySuppliers,
  allCustomerEmployeeList: employee.allCustomerEmployeeList,
  fullName: auth.userDetails.fullName,
  orgId: auth.userDetails.organizationId,
  ShipByData: shipBy.ShipByData,
  employeeAsErp: shipper.employeeAsErp,
  currencies: auth.currencies,
  supplierSuppliesQuality: suppliers.supplierSuppliesQuality,
  materialOption: suppliers.supplierSuppliesList.map((item) => ({
    label: `${item.suppliesName}`,
    value: item.suppliesId,
  })),
  currencyNameOption: auth.currencies.map((item) => ({
    label: `${item.currency_name}`,
    value: item.currency_name,
  })),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        updateQualitySuppliers,
      getEmployeelistAsErp,
      getSupplierSupplies,
      getCurrency,
      getSupplierSuppliesQuality,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(SuppliersListForm);
