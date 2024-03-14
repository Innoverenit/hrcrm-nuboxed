import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Switch } from "antd";
import { FormattedMessage } from "react-intl";
import SearchSelect from "../../../../Components/Forms/Formik/SearchSelect";
import { Formik, Form, Field, FieldArray } from "formik";
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import { InputComponent } from "../../../../Components/Forms/Formik/InputComponent";
 import { SelectComponent } from "../../../../Components/Forms/Formik/SelectComponent";
import AddressFieldArray from "../../../../Components/Forms/Formik/AddressFieldArray";
import { addLocation, } from "../../../Event/Child/Location/LocationAction";
import { getTimeZone } from "../../../Auth/AuthAction";
// const FormSchema = Yup.object().shape({
//   name: Yup.string().required("Input required!"),
//   management: Yup.string().required("Input required!"),
//   locationtypeId: Yup.string().required("Input required!"),
// });

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
    };
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
            locationName: "",
            management: "",
            productionManager: "",
            userId: this.props.userId,
            orgId: this.props.orgId,
            groupId: this.props.groupId,
            locationtypeId: undefined,
            productionInd: this.state.production ? "true" : "false",
            billingInd: this.state.billing ? "true" : "false",
            inventoryInd: this.state.inventory ? "true" : "false",
            projectInd: this.state.project ? "true" : "false",
            prodManufactureInd: this.state.prodmanuf ? "true" : "false",
            corporateInd: this.state.corporate ? "true" : "false",
            retailInd: this.state.retail ? "true" : "false",
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
            this.props.addLocation(
              {
                ...values,
                productionInd: this.state.production ? "true" : "false",
                billingInd: this.state.billing ? "true" : "false",
                inventoryInd: this.state.inventory ? "true" : "false",
                projectInd: this.state.project ? "true" : "false",
                prodManufactureInd: this.state.prodmanuf ? "true" : "false",
                corporateInd: this.state.corporate ? "true" : "false",
                retailInd: this.state.retail ? "true" : "false",
                orgId: this.props.orgId,
                userId: this.props.userId,
                
              },
              this.props.orgId,
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
                  <div class=" w-[45%] max-sm:w-[30%]">
                      <Field
                        name="region"
                        selectType="DRegion"
                        isColumnWithoutNoCreate
                        component={SearchSelect}
                        // value={values.countryDialCode}
                        label={
                          <FormattedMessage
                            id="app.region"
                            defaultMessage="Region"
                          />
                        }
                        isColumn
                        // defaultValue={{
                        //   label:`+${props.user.countryDialCode}`,
                        // }}
                        inlineLabel
                      />
                    </div>
                  {/* <div style={{ width: "100%" }}>
                    <Field
                      label="Management"
                      name="management"
                      placeholder="Management"
                      //noLabel
                      isRequired
                      component={SelectComponent}
                      options={
                        Array.isArray(managementOption) ? managementOption : []
                      }
                    />
                  </div> */}
                  {/* <div style={{ width: "100%" }}>
                    <StyledLabel>Production Manager</StyledLabel>
                    <Field
                      name="productionManager"
                      placeholder="Production Manager"
                      noLabel
                      isRequired
                      component={SelectComponent}
                      options={
                        Array.isArray(productionOption) ? productionOption : []
                      }
                    />
                  </div> */}
                  {/* <div style={{ width: "100%" }}>
                    <StyledLabel>Type</StyledLabel>
                    <Field
                      name="locationtypeId"
                      type="text"
                      placeholder="Type"
                      noLabel
                      isRequired
                      component={SelectComponent}
                      options={
                        Array.isArray(locationsTypeOption)
                          ? locationsTypeOption
                          : []
                      }
                    />
                  </div> */}
                  {/* <FlexContainer justifyContent="space-between">
                    <div style={{ width: "47%" }}>
                      <StyledLabel>Storage Cost</StyledLabel>
                      <Field
                        name="storage cost"
                        type="text"
                        isColumn
                        inlineLabel
                        isRequired
                        component={InputComponent}
                        style={{
                          width: "100%"
                        }}
                      />
                    </div>
                    <div style={{ width: "47%" }}>
                      <StyledLabel>Currency</StyledLabel>
                      <Field
                        name="contactCurrency"
                        label="Currency"
                        isColumn
                        inlineLabel
                        // component={SelectComponent}
                        // options={Array.isArray(currencyType) ? currencyType : []}
                        style={{
                          width: "100%",
                        }}
                      />
                    </div>
                  </FlexContainer> */}
                  <div class="font-bold m-[0.1rem-0-0.02rem-0.2rem] text-xs flex flex-col mt-2">Functions</div>
                  <div class=" flex ">
                    <div class=" w-[47%] mt-2" >
                      <div class="font-bold text-xs">Refurbish &nbsp;<i class="fas fa-cogs text-base"></i></div>
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
                      <div class="font-bold text-xs">Inventory &nbsp;<i class="fas fa-warehouse text-base"></i></div>
                      {/* inventory auto on when production on. if user wants to close inventory then ask what is inventory location */}
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
                    <div class=" w-[47%] mt-2" >
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
                  <div class=" w-[47%] mt-2" >
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
                    <div class=" w-[47%] mt-2" >
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
                  <div class=" flex">
                  <div class=" w-[47%] mt-2" >
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
               
                    {/* <div style={{ width: "47%" }} class="mt-2">
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
                    </div> */}
                  
                  </div>
                </div>
                <div class="h-full w-[45%] max-sm:w-wk mt-2">
                  <div class=" w-full" >
                    <div class="font-bold m-[0.1rem-0-0.02rem-0.2rem] text-xs flex flex-col">Time Zone</div>
                    <Field
                      name="timeZone"
                      type="text"
                      placeholder="Select Time Zone"
                      noLabel
                      // disabled={!values.productionInd && !values.inventoryInd}
                      isRequired
                      component={SelectComponent}
                      options={
                        Array.isArray(timeZoneOption) ? timeZoneOption : []
                      }
                    />
                  </div>
                <div class=" mt-3">
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
                  loading={this.props.addingLocation}
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
const mapStateToProps = ({ location, auth, region, plant }) => ({
  addingLocation: location.addingLocation,
  timeZone: auth.timeZone,
  userId:auth.userDetails.userId,
  orgId:auth.userDetails.organizationId,
  
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addLocation,
      getTimeZone,
 
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(LocationForm);







// import React, { Component, useState, useMemo, useEffect } from "react";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import { FormattedMessage } from "react-intl";
// import { Button, Tooltip } from "antd";
// import { Formik, Form, Field,  } from "formik";
// import { Spacer, StyledLabel } from "../../../../Components/UI/Elements";
// import { InputComponent } from "../../../../Components/Forms/Formik/InputComponent";
// import dayjs from "dayjs";
// import { addLocation } from "./LocationAction";
// /**
//  * yup validation scheme for creating a opportunity
//  */


// function LocationForm(props) {
//   const { translatedMenuItems} =props;
//   const [newimageId, setnewimageId] = useState("");
//   console.log("newImage",newimageId)
//   function handleSetImage(imageId) {
//     setnewimageId(imageId);
//   }
//   console.log(newimageId.imageId)
//   useEffect(() => {
//    // props.getCountry()
//     // props.getAllUserData()
//   }, []);


//   const {
  
//   } = props;
//   //console.log(customerId);
//   return (
//     <>
//       <Formik
//         enableReinitialize
//         initialValues={{  
//             locationName:""
         
//         }}
       
//         onSubmit={(values, { resetForm }) => {
//           props.addLocation(
//             {
//               ...values,
             
             
//             },
          
//             resetForm()
//           );
//         }}
//       >
//         {({
//           errors,
//           touched,
//           isSubmitting,
//           setFieldValue,
//           setFieldTouched,
//           values,
//           ...rest
//         }) => (
//           <Form className="form-background">
           
        
                 
//            <div class=" flex justify-between">

//            <Field
//                   isRequired
//                   name="locationName"
//                   type="text"
//                   //label="Name"

//                   label={
//                     <FormattedMessage id="app.name" defaultMessage="Name" />
//                   }
//                   isColumn
//                   width={"100%"}
//                   component={InputComponent}
//                   // accounts={accounts}
//                   inlineLabel
//                 />
          
   
    
   
          
          
                  
          
//            </div>
//            <Spacer />
//            <div class=" flex justify-end">
//              <Button
//                type="primary"
//                htmlType="submit"
//                Loading={props.addingLocation}
//              >
             
//                Update
//              </Button>
//            </div>
//          </Form>
//         )}
//       </Formik>
//     </>
//   );
// }

// const mapStateToProps = ({ location }) => ({
//     addingLocation: location.addingLocation,

// });

// const mapDispatchToProps = (dispatch) =>
//   bindActionCreators(
//     {
//         addLocation
//     },
//     dispatch
//   );

// export default connect(mapStateToProps, mapDispatchToProps)(LocationForm);
