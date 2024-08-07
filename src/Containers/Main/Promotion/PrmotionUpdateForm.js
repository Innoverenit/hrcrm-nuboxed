import React, {useEffect, useState,Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Switch,Select } from "antd";
import { FormattedMessage } from "react-intl";
import dayjs from "dayjs";
import SearchSelect from "../../../Components/Forms/Formik/SearchSelect";
import { Formik, Form, Field, FieldArray } from "formik";
import {updatePromotions} from "./PrmotionAction";
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import { InputComponent } from "../../../Components/Forms/Formik/InputComponent";
import { SelectComponent } from "../../../Components/Forms/Formik/SelectComponent";
import AddressFieldArray from "../../../Components/Forms/Formik/AddressFieldArray";
import { DatePicker } from "../../../Components/Forms/Formik/DatePicker";
// const FormSchema = Yup.object().shape({
//   name: Yup.string().required("Input required!"),
//   management: Yup.string().required("Input required!"),
//   locationtypeId: Yup.string().required("Input required!"),
// });
const { Option } = Select;

class PrmotionUpdateForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
catlogue: this.props.storedLoc.productInd,
inventory:this.props.storedLoc.supplierInventoryInd,
material:this.props.storedLoc.materialInd,
discount:this.props.storedLoc.discountType,
startDate: this.props.storedLoc.startDate ? dayjs(this.props.storedLoc.startDate) : dayjs(),
endDate: this.props.storedLoc.endDate ? dayjs(this.props.storedLoc.endDate) : dayjs(),
      translatedMenuItems: []
    };
  
  }
   handleReset(resetForm) {
    resetForm();
  };
  handleCatalogue = () => {
    this.setState((prevState) => ({
        catlogue: !prevState.catlogue,
      }));
  };
  handleInventory = () => {
    this.setState((prevState) => ({
        inventory: !prevState.inventory,
      }));
  };
  handleMaterial = () => {
    this.setState((prevState) => ({
        material: !prevState.material,
      }));
  };
  handlediscountType = () => {
    this.setState((prevState) => ({
        discount: !prevState.discount,
      }));
  };
  render() {
  

    const { startDate, endDate } = this.state;
    return (
  
      <>
        <Formik
          initialValues={{
            promoCodeName:this.props.storedLoc.promoCodeName || "",
            promoCode:this.props.storedLoc.promoCode || "",
            discountValue:this.props.storedLoc.discountValue || "",
            startDate: startDate,
            endDate: endDate,
            discountType:this.state.discount?"Percent":"Amount",
            productInd: this.state.catlogue?"true":"false",
            supplierInventoryInd: this.state.inventory?"true":"false",
            materialInd: this.state.material?"true":"false",
          }}
          // validationSchema={FormSchema}
          onSubmit={(values, { resetForm }) => {
            const newStartDate = dayjs(values.startDate).format("YYYY-MM-DD");
            const newEndDate = dayjs(values.endDate).format("YYYY-MM-DD");
            this.props.updatePromotions(
              {
                ...values,
                startDate: `${newStartDate}T20:00:00Z`,
                endDate: `${newEndDate}T20:00:00Z`,
                discountType:this.state.discount?"Percent":"Amount",
                   productInd: this.state.catlogue?"true":"false" ,
                   supplierInventoryInd: this.state.inventory?"true":"false",
            materialInd: this.state.material?"true":"false",
                
              },
              this.props.storedLoc.promoCodeId,
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
            <div class="overflow-y-auto h-[30rem] overflow-x-hidden">
            <Form class="form-background">
              <div class="flex justify-between max-sm:flex-col">
                <div class="h-full w-[45%] max-sm:w-wk">
                  <div>
                    <Field
                      name="promoCodeName"
                      // label="Name"
                      label="Name"
                      type="text"
                      width={"100%"}
                      component={InputComponent}
                      isColumn
                      inlineLabel
                      isRequired
                    />
                  </div>
                  <div class=" flex justify-between w-wk mt-3 max-sm:w-[30%]">
                    <div>
                  <Field
                      name="promoCode"
                      // label="Name"
                      label="Code"
                      type="text"
                      width={"100%"}
                      component={InputComponent}
                      isColumn
                      inlineLabel
                      isRequired
                    />
                    </div>
                    <div>
                    <Field
                      name="discountValue"
                      // label="Name"
                      label="Discount%"
                      type="text"
                      width={"100%"}
                      component={InputComponent}
                      isColumn
                      inlineLabel
                      isRequired
                    />
                    </div>
                    </div>
                  
                  <div class="font-bold m-[0.1rem-0-0.02rem-0.2rem] text-xs flex flex-col mt-3">Functions</div>
                  <div class=" flex ">
                   
                    <div class=" w-[47%] mt-2" >
                      <div class="font-bold text-xs">
                      {/* {this.state.translatedMenuItems[2]}   */}
                      Apply Catalogue
                         &nbsp;<i class="fas fa-warehouse text-base"></i></div>
                      <div>
                        <Switch
                          style={{ width: "6.25em" }}
                          checked={this.state.catlogue}
                          onChange={this.handleCatalogue}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      </div>
                    </div>
                    <div class=" w-[47%] mt-2" >
                      <div class="font-bold text-xs">
                      {/* {this.state.translatedMenuItems[3]} */}
                      Supplier Inventory
                         &nbsp;<PrecisionManufacturingIcon/></div>
                      <div>
                      <Switch
                          style={{ width: "6.25em" }}
                          checked={this.state.inventory}
                          onChange={this.handleInventory}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      </div>
                    </div>
                  </div>
                  <div class=" flex">
                  
                    <div class=" w-[47%] mt-2" >
                      <div class="font-bold text-xs">
                       {/* {this.state.translatedMenuItems[4]} */}
                        Material
                         &nbsp;<i class="fas fa-building text-base"></i></div>
                      <div>
                        <Switch
                          style={{ width: "6.25em" }}
                          checked={this.state.material}
                          onChange={this.handleMaterial}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      </div>
                    </div>
                    <div class=" w-[47%] mt-2" >
                      <div class="font-bold text-xs">
                       {/* {this.state.translatedMenuItems[4]}  */}Discount type
                         &nbsp;<i class="fas fa-building text-base"></i></div>
                      <div>
                        <Switch
                          style={{ width: "6.25em" }}
                          checked={this.state.discount}
                          onChange={this.handlediscountType}
                          checkedChildren="Percent"
                          unCheckedChildren="Amount"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between">
                  <div>
              <Field
                name="startDate"
                label="Start Date"
                component={DatePicker}
                value={values.startDate}
                isColumn
                isRequired
                width={"100%"}
                inlineLabel
                onChange={(date) => setFieldValue('startDate', date)}
              />
            </div>
            <div >
              <Field
                name="endDate"
                label="End Date"
                component={DatePicker}
                value={values.endDate}
                isColumn
                isRequired
                width={"100%"}
                inlineLabel
                onChange={(date) => setFieldValue('endDate', date)}
              />
            </div>
                  </div>
                
     
                </div>
                
              </div>
              <div class="flex justify-end w-wk bottom-2 mr-2 md:absolute ">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={this.props.updatingPrmotion}
                >
                 Update
                </Button>
              </div>
            </Form>
            </div>
          )}
        </Formik>
      </>
    );
  }
}
const mapStateToProps = ({ promotion, auth,}) => ({
    updatingPrmotion: promotion.updatingPrmotion,
  timeZone: auth.timeZone,
  userId:auth.userDetails.userId,
  orgId:auth.userDetails.organizationId,
  organizationId: auth.userDetails.organizationId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
     updatePromotions,
    //   getTimeZone,
    //   getDepartmentwiserUser,
    //   getRoles,
    //   getDepartments,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(PrmotionUpdateForm);
