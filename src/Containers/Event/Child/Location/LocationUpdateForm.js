import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Switch } from "antd";
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import { Formik, Form, Field, FieldArray } from "formik";
import { InputComponent } from "../../../../Components/Forms/Formik/InputComponent";
 import { SelectComponent } from "../../../../Components/Forms/Formik/SelectComponent";
import AddressFieldArray from "../../../../Components/Forms/Formik/AddressFieldArray";
import { updateLocation } from "../../../Event/Child/Location/LocationAction";
import { getTimeZone } from "../../../Auth/AuthAction";


class LocationUpdateForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      production: this.props.storedLoc.productionInd,
      billing: this.props.storedLoc.billingInd,
      corporate: this.props.storedLoc.corporateInd,
      inventory: this.props.storedLoc.inventoryInd,
      project: this.props.storedLoc.projectInd,
      productionManufac: this.props.storedLoc.prodManufactureInd,
      retail: this.props.storedLoc.retailInd,
    };
  }
  handleProduction = () => {
    this.setState((prevState) => ({
      production: !prevState.production,
    }));
  };
  handleBilling = () => {
    this.setState((prevState) => ({
      billing: !prevState.billing,
    }));
  };
  // handleBilling = () => {
  //   const { setFieldValue, storedLoc } = this.props;
  //   const newBillingValue = !this.state.billing;
  //   setFieldValue('billingInd', newBillingValue);
  // };
  handleCorporate = () => {
    this.setState((prevState) => ({
      corporate: !prevState.corporate,
    }));
  };
  
//   handleCorporate = () => {
//     if (this.props.storedLoc.corporateInd){
//     this.setState({ corporate: false });}
// else{
//   this.setState({ corporate: true });}
//   };
handleInventory = () => {
  this.setState((prevState) => ({
    inventory: !prevState.inventory,
  }));
};
  // handleInventory = () => {
  //   if(this.props.storedLoc.inventoryInd){
  //   this.setState({ inventory: false });}
  //   else{this.setState({ inventory: true });}
  // };
  handleProject = () => {
    this.setState((prevState) => ({
      project: !prevState.project,
    }));
  };
  // handleProject = () => {
  //   if(this.props.storedLoc.projectInd){
  //   this.setState({ project: false });}
  //   else{ this.setState({ project: true });}
  // };
  handleProdManuf = () => {
    this.setState((prevState) => ({
      prodmanuf: !prevState.prodmanuf,
    }));
  };
  handleRetail = () => {
    this.setState((prevState) => ({
      retail: !prevState.retail,
    }));
  };
  handleRetail = () => {
    if(this.props.storedLoc.retailInd){
  this.setState({ retail: false });}
  else {
    this.setState({ retail: true });}

  };
  componentDidMount() {
    // this.props.getSalesManagerUser();
    // this.props.getProductionManager();
    // this.props.getLocationsType();
    this.props.getTimeZone();
  }

  render() {
    const { locationsTypeName } = this.props;
    // const currencyType = props.currencies.map((item) => {
    //   return {
    //     label: item.currencyName || "",
    //     value: item.currencyName,
    //   };
    // })

    const timeZoneOption = this.props.timeZone.map((item) => {
      return {
        label: item.zoneName
        || null,
        value: item.timezoneId
        ,
      };
    });
    // const managementOption = this.props.salesManagementUsers.map((item) => {
    //   return {
    //     label: `${item.salutation || ""} ${item.firstName ||
    //       ""} ${item.middleName || ""} ${item.lastName || ""}`,
    //     value: item.userId,
    //   };
    // });

    // const productionOption = this.props.productionManagement.map((item) => {
    //   return {
    //     label: `${item.salutation || ""} ${item.firstName ||
    //       ""} ${item.middleName || ""} ${item.lastName || ""}`,
    //     value: item.userId,
    //   };
    // });

    // const locationsTypeOption = this.props.locationsType.map((item) => {
    //   return {
    //     label: item.locationType || "",
    //     value: item.locationtypeId,
    //   };
    // });

    return (
      <>
        <Formik
          initialValues={{
            locationName:this.props.storedLoc.locationName || "",
            management:this.props.storedLoc.management || "",
            productionManager:this.props.storedLoc.productionManager || "",
            userId: this.props.userId,
            orgId: this.props.orgId,
            groupId: this.props.groupId,
            locationtypeId: undefined,
            productionInd: this.state.production ? "true" : "false",
            billingInd: this.state.billing  ? "true" :"false",
            inventoryInd: this.state.inventory ? "true" : "false",
            projectInd: this.state.project ? "true" : "false",
            prodManufactureInd: this.state.prodmanuf ? "true" : "false",
            corporateInd: this.state.corporate ? "true" : "false",
            retailInd: this.state.retail ? "true" : "false",
            timeZone:this.props.storedLoc.timeZone || "",
            address: [
              {
                addressType:this.props.storedLoc.address.length ? this.props.storedLoc.address[0].addressType : "",
                address1: this.props.storedLoc.address.length ? this.props.storedLoc.address[0].address1 : "",
                address2:this.props.storedLoc.address.length ? this.props.storedLoc.address[0].address2 : "",
                addressId:this.props.storedLoc.address.length ? this.props.storedLoc.address[0].addressId : "",
                city: this.props.storedLoc.address.length ? this.props.storedLoc.address[0].city :"",
                pinCode:this.props.storedLoc.address.length ? this.props.storedLoc.address[0].pinCode : "",
                country:this.props.storedLoc.address.length ? this.props.storedLoc.address[0].country : "",
                postalCode:this.props.storedLoc.address.length ? this.props.storedLoc.address[0].postalCode : "",
                state:this.props.storedLoc.address.length ? this.props.storedLoc.address[0].state :"",
                street:this.props.storedLoc.address.length ? this.props.storedLoc.address[0].street :"" ,
                latitude: "",
                longitude: "",
                location: this.props.storedLoc.address.length ? this.props.storedLoc.address[0].location :"",
              },
            ],
          }}
          // validationSchema={FormSchema}
          onSubmit={(values, { resetForm }) => {
            //debugger;
            console.log(values);
            this.props.updateLocation(
              {
                ...values,
                productionInd: this.state.production ? "true" : "false",
                billingInd:this.state.billing  ? "true" :"false",
                inventoryInd: this.state.inventory ? "true" : "false",
                projectInd: this.state.project ? "true" : "false",
                prodManufactureInd: this.state.prodmanuf ? "true" : "false",
                corporateInd: this.state.corporate ? "true" : "false",
                retailInd: this.state.retail ? "true" : "false",
                orgId: this.props.orgId,
                userId: this.props.userId,
                // locationtypeId: this.props.locationtypeId,
              },
              this.props.storedLoc.locationDetailsId,
              // () => this.callback(resetForm)
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
                <div class="h-full w-[47.5%] max-sm:w-wk">
                  <div>
                    <Field
                      name="locationName"
                      label="Name"
                      type="text"
                      width={"100%"}
                      component={InputComponent}
                      isColumn
                      inlineLabel
                      isRequired
                    />
                  </div>
                  <div class="font-bold mt-2" >Functions</div>
                  <div class=" flex ">
                    <div  class=" w-[47%] mt-2">
                      <div class="font-bold text-xs">Refurbish &nbsp;<i class="fas fa-cogs text-base"></i></div>
                      <div>
                        <Switch
                        style={{
                          width: "6.25em",
                          //  backgroundColor: productionInd || this.state.production ? "rgb(119, 221, 119)" : "#E6E6E6",
                        }}
                          checked={this.state.production}
                          onChange={this.handleProduction}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      </div>
                    </div>
                    <div  class=" w-[47%] mt-2">
                      <div class="font-bold text-xs">Inventory &nbsp;<i class="fas fa-warehouse text-base"></i></div>
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
                  <div  class=" w-[47%] mt-2">
                      <div class="font-bold text-xs">Production &nbsp;<PrecisionManufacturingIcon/></div>
                      <div>
                        <Switch
                          style={{ width: "6.25em" }}
                          checked={this.state.prodmanuf}
                          onChange={this.handleProdManuf}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      </div>
                    </div>
                    <div  class=" w-[47%] mt-2">
                      <div class="font-bold text-xs">Corporate &nbsp;<i class="fas fa-building text-base"></i></div>
                      <div>
                        <Switch
                          style={{ width: "6.25em" }}
                          checked={this.state.corporate}
                          onChange={this.handleCorporate}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      </div>
                    </div>
                  </div>
                  <div class=" flex">
                  <div  class=" w-[47%] mt-2">
                      <div class="font-bold text-xs">Retail &nbsp;<i class="fas fa-money-check text-base"></i></div>
                      <div>
                        <Switch
                          style={{ width: "6.25em" }}
                          checked={this.state.retail}
                          onChange={this.handleRetail}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      </div>
                    </div>
                    <div  class=" w-[47%] mt-2">
                      <div class="font-bold text-xs">Project &nbsp;<i class="fas fa-project-diagram text-base"></i></div>
                      <div>
                        <Switch
                          style={{ width: "6.25em" }}
                          checked={this.state.project}
                          onChange={this.handleProject}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      </div>
                    </div>
                 
                   
                  
                  </div>
                  <div  class=" w-[47%] mt-2">
                      <div class="font-bold text-xs">Billing &nbsp;<i class="far fa-money-bill-alt text-base"></i></div>
                      <div>
                        <Switch
                          style={{ width: "6.25em" }}
                          checked={this.state.billing}
                          onChange={this.handleBilling}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      </div>
                    </div>
                </div>
                <div class="h-full w-[47.5%] max-sm:w-wk mt-2">
                  <div class=" w-full">
                  <div  >Time Zone</div>
                    <Field
                      name="timeZone"
                      type="text"
                      placeholder="Select Time Zone"
                      noLabel
                      isRequired
                      component={SelectComponent}
                      options={
                        Array.isArray(timeZoneOption) ? timeZoneOption : []
                      }
                    />
                  </div>
                  <div  class="  mt-3">
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
                    </div>
                </div>
              </div>
              <div class="flex justify-end w-wk bottom-2 mr-2 md:absolute ">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={this.props.updatingLocations}
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
const mapStateToProps = ({ location, auth, teams, plant }) => ({
  updatingLocations: location.updatingLocations,
  timeZone: auth.timeZone,
  userId:auth.userDetails.userId,
  orgId:auth.userDetails.organizationId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      updateLocation,
      getTimeZone,
 
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(LocationUpdateForm);


