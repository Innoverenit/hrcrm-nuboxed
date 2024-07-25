import React, {useEffect, useState,Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Switch,Select } from "antd";
import { FormattedMessage } from "react-intl";
import SearchSelect from "../../../Components/Forms/Formik/SearchSelect";
import { Formik, Form, Field, FieldArray } from "formik";
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import { InputComponent } from "../../../Components/Forms/Formik/InputComponent";
import { SelectComponent } from "../../../Components/Forms/Formik/SelectComponent";
import AddressFieldArray from "../../../Components/Forms/Formik/AddressFieldArray";
// const FormSchema = Yup.object().shape({
//   name: Yup.string().required("Input required!"),
//   management: Yup.string().required("Input required!"),
//   locationtypeId: Yup.string().required("Input required!"),
// });
const { Option } = Select;

class LocationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      production: false,
      billing: false,
      corporate: false,
      inventory: false,
      project: false,
      prodmanuf:false,
      retail: false,
      contract: false,
      department: "",
      reportingManager: "",
      translatedMenuItems: []
    };
    this.handleDepartment = this.handleDepartment.bind(this);
    this.handlereportingManager = this.handlereportingManager.bind(this);
  }

  handleProduction = (checked) => {
    this.setState({ production: checked });
  };
  handleBilling = (checked) => {
    this.setState({ billing: checked });
  };
  handleCorporate = (checked) => {
    this.setState({ corporate: checked });
  };
  handleInventory = (checked) => {
    this.setState({ inventory: checked });
  };
  handleProject = (checked) => {
    this.setState({ project: checked });
  };
  handleProdManuf = (checked) => {
    this.setState({ prodmanuf: checked });
  };
  handleRetail = (checked) => {
    this.setState({ retail: checked });
  };
  handleContract = (checked) => {
    this.setState({ contract: checked });
  };
  handleDepartment(val) {
    this.setState({ department: val });
    this.props.getDepartmentwiserUser(val);
  }
  handlereportingManager(val) {
    this.setState({ reportingManager: val });
  }
//   componentDidMount() {
    
//     this.props.getRoles(this.props.organizationId);
//     this.props.getDepartments(); 
//     this.props.getTimeZone();
//     this.fetchMenuTranslations();
//   }
 
//   componentDidUpdate(prevProps) {
//     if (prevProps.selectedLanguage !== this.props.selectedLanguage) {
//       this.fetchMenuTranslations();
//     }
//   }

//   fetchMenuTranslations = async () => {
//     try {
//       const itemsToTranslate = [
//           "Name",
//           "Region",
//           "inventory",
//          "Production",
//         "Corporate",
//         "Retail",
//         "Billing",
//         " 3rd Party Location",
//         "Department",
//         "User",
//         "Address",
//         "Create"
//       ];

//       const translations = await this.props.translateText(itemsToTranslate, this.props.selectedLanguage);
//       this.setState({ translatedMenuItems: translations });
//     } catch (error) {
//       console.error('Error translating menu items:', error);
//     }
//   };
  render() {
    const { locationsTypeName } = this.props;
    // const currencyType = props.currencies.map((item) => {
    //   return {
    //     label: item.currencyName || "",
    //     value: item.currencyName,
    //   };
    // })
   
    // const timeZoneOption = this.props.timeZone.map((item) => {
    //   return {
    //     label: item.zoneName
    //     || null,
    //     value: item.timezoneId
    //     ,
    //   };
    // });

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

    console.log("3rDep-",this.state.department,"3rDUs-",this.state.reportingManager);
    return (
  
      <>
        <Formik
          initialValues={{
            locationName: "",
            management: "",
            productionManager: "",
            userId: this.props.userId,
            orgId: this.props.orgId,
            groupId: this.props.groupId,
            locationtypeId: undefined,
            regionsId:"",
            productionInd: this.state.production ? "true" : "false",
            billingInd: this.state.billing ? "true" : "false",
            inventoryInd: this.state.inventory ? "true" : "false",
            projectInd: this.state.project ? "true" : "false",
            // prodManufactureInd: this.state.prodmanuf ? "true" : "false",
            corporateInd: this.state.corporate ? "true" : "false",
            retailInd: this.state.retail ? "true" : "false",
            thirdPartyInd: this.state.contract ? "true":"false",
            thirdPartyContactDpt:this.state.department ? this.state.department : "",
            thirdPartyContact:this.state.reportingManager ? this.state.reportingManager : "",
            timeZone: "",
            timeZone: undefined,
            address: [
              {
                addressType: "",
                address1: "",
                address2: "",
                addressId: "",
                // town: "",
                // street: "",
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
            // this.props.addLocation(
            //   {
            //     ...values,
            //     productionInd: this.state.production ? "true" : "false",
            //     billingInd: this.state.billing ? "true" : "false",
            //     inventoryInd: this.state.inventory ? "true" : "false",
            //     projectInd: this.state.project ? "true" : "false",
            //     // prodManufactureInd: this.state.prodmanuf ? "true" : "false",
            //     corporateInd: this.state.corporate ? "true" : "false",
            //     retailInd: this.state.retail ? "true" : "false",
            //     thirdPartyInd: this.state.contract ? "true":"false",
            //     thirdPartyContactDpt :this.state.department ?this.state.department:"",
            //     thirdPartyContact:this.state.reportingManager ? this.state.reportingManager : "",
            //     orgId: this.props.orgId,
            //     userId: this.props.userId,
                
            //   },
            //   this.props.orgId,
            // );
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
                      name="locationName"
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
                      name="locationName"
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
                      name="locationName"
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
                      {this.state.translatedMenuItems[3]}Supplier Inventory
                         &nbsp;<PrecisionManufacturingIcon/></div>
                      <div>
                      <Switch
                          style={{ width: "6.25em" }}
                          checked={this.state.production}
                          onChange={this.handleProduction}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      </div>
                    </div>
                    <div class=" w-[47%] mt-2" >
                      <div class="font-bold text-xs">
                       {this.state.translatedMenuItems[4]} Material
                         &nbsp;<i class="fas fa-building text-base"></i></div>
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
                  
                
     
                </div>
                
              </div>
              <div class="flex justify-end w-wk bottom-2 mr-2 md:absolute ">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={this.props.addingLocation}
                >
                  {this.state.translatedMenuItems[11]}Create
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
const mapStateToProps = ({ location, auth, region, plant,departments,settings,role }) => ({
  addingLocation: location.addingLocation,
  timeZone: auth.timeZone,
  userId:auth.userDetails.userId,
  orgId:auth.userDetails.organizationId,
  departments: departments.departments,
  departmentwiseUser: settings.departmentwiseUser,
  roles: role.roles,
  organizationId: auth.userDetails.organizationId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
    //   addLocation,
    //   getTimeZone,
    //   getDepartmentwiserUser,
    //   getRoles,
    //   getDepartments,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(LocationForm);
