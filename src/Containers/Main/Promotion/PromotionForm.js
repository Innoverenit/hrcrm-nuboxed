import React, {Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Switch,Select } from "antd";
import dayjs from "dayjs";
import { Formik, Form, Field } from "formik";
import {addPromotions} from "./PrmotionAction";
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import { InputComponent } from "../../../Components/Forms/Formik/InputComponent";
import { DatePicker } from "../../../Components/Forms/Formik/DatePicker";
import ApartmentIcon from '@mui/icons-material/Apartment';

const { Option } = Select;

class PromotionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
catlogue: false,
inventory:false,
material:false,
discount:false,
      translatedMenuItems: []
    };
  
  }
   handleReset(resetForm) {
    resetForm();
  };
  handleCatalogue = (checked) => {
    this.setState({ catlogue: checked });
  };
  handleInventory = (checked) => {
    this.setState({ inventory: checked });
  };
  handleMaterial = (checked) => {
    this.setState({ material: checked });
  };
  handlediscountType = (checked) => {
    this.setState({ discount: checked });
  };
  render() {
  

    const {
      startDate,
      endDate,
    } = this.props;
  
    return (
  
      <>
        <Formik
          initialValues={{
            promoCodeName:"",
            promoCode:"",
            discountValue:"",
            startDate:startDate || null,
            endDate:endDate || null,
            discountType:this.state.discount?"Percent":"Amount",
            productInd: this.state.catlogue?"true":"false",
            supplierInventoryInd: this.state.inventory?"true":"false",
            materialInd: this.state.material?"true":"false",
          }}
          // validationSchema={FormSchema}
          onSubmit={(values, { resetForm }) => {
            let timeZoneFirst = "GMT+05:30";
            let mytimeZone = timeZoneFirst.substring(4, 10);
            var a = mytimeZone.split(":");
            var timeZoneminutes = +a[0] * 60 + +a[1];
            if (!values.startDate) {
              values.startDate = values.startDate;
            }
            if (!values.endDate) {
              values.endDate = values.endDate;
            }
  
            let newStartDate = dayjs(values.startDate).format("YYYY-MM-DD");
            let newEndDate = dayjs(values.endDate).format("YYYY-MM-DD");
  
            let newStartTime = dayjs(values.startTime).format("HH:mm:ss.SSS[Z]");
            let firstStartHours = newStartTime.substring(0, 5);
            let timeEndPart = newStartTime.substring(5, 13);
            var firstStartTimeSplit = firstStartHours.split(":");
            var minutes = +firstStartTimeSplit[0] * 60 + +firstStartTimeSplit[1];
            var firstStartTimeminutes = minutes - timeZoneminutes;
            let h = Math.floor(firstStartTimeminutes / 60);
            let m = firstStartTimeminutes % 60;
            h = h < 10 ? "0" + h : h;
            m = m < 10 ? "0" + m : m;
            let finalStartTime = `${h}:${m}`;
            let newFormattedStartTime = `${finalStartTime}${timeEndPart}`;
  
            this.props.addPromotions(
              {
                ...values,
                startDate: `${newStartDate}T20:00:00Z`,
                endDate: `${newEndDate}T20:00:00Z`,
                discountType:this.state.discount?"Percent":"Amount",
                   productInd: this.state.catlogue?"true":"false" ,
                   supplierInventoryInd: this.state.inventory?"true":"false",
            materialInd: this.state.material?"true":"false",
                
              },
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
                      {this.state.translatedMenuItems[2]}  Apply Catalogue
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
                      {this.state.translatedMenuItems[3]}Supplier Inventory
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
                       {this.state.translatedMenuItems[4]} Material
                         &nbsp; <ApartmentIcon className="!text-tab text-[#f0386b]"/></div>
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
                         &nbsp; <ApartmentIcon className="!text-tab text-[#f0386b]"/></div>
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
              />
            </div>
                  </div>
                
     
                </div>
                
              </div>
              <div class="flex justify-end w-wk bottom-2 mr-2 md:absolute ">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={this.props.addingPrmotions}
                >
                 Create
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
  addingPrmotions: promotion.addingPrmotions,
  timeZone: auth.timeZone,
  userId:auth.userDetails.userId,
  orgId:auth.userDetails.organizationId,
  organizationId: auth.userDetails.organizationId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
     addPromotions,
    //   getTimeZone,
    //   getDepartmentwiserUser,
    //   getRoles,
    //   getDepartments,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(PromotionForm);
