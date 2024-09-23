import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Switch,Select } from "antd";
import { FormattedMessage } from "react-intl";
import SearchSelect from "../../../../Components/Forms/Formik/SearchSelect";
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import { Formik, Form, Field, FieldArray } from "formik";
import { InputComponent } from "../../../../Components/Forms/Formik/InputComponent";
 import { SelectComponent } from "../../../../Components/Forms/Formik/SelectComponent";
import AddressFieldArray from "../../../../Components/Forms/Formik/AddressFieldArray";
import { updateLocation } from "../../../Event/Child/Location/LocationAction";
import { getTimeZone } from "../../../Auth/AuthAction";
import { getDepartmentwiserUser } from "../../../Settings/SettingsAction"
import { getDepartments } from "../../../Settings/Department/DepartmentAction";

const { Option } = Select;
class LocationUpdateForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      production: this.props.storedLoc.productionInd,
      billing: this.props.storedLoc.billingInd,
      corporate: this.props.storedLoc.corporateInd,
      inventory: this.props.storedLoc.inventoryInd,
      project: this.props.storedLoc.projectInd,
      retail: this.props.storedLoc.retailInd,
      contract: false,
      department: "",
      reportingManager: "",
      translatedMenuItems: [],
    };
    this.handleDepartment = this.handleDepartment.bind(this);
    this.handlereportingManager = this.handlereportingManager.bind(this);
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
 
  handleCorporate = () => {
    this.setState((prevState) => ({
      corporate: !prevState.corporate,
    }));
  };
  

componentDidUpdate(prevProps) {
  if (prevProps.selectedLanguage !== this.props.selectedLanguage) {
    this.fetchMenuTranslations();
  }
}

fetchMenuTranslations = async () => {
  try {
    const itemsToTranslate = [
      "110",//0Name"
      "24",//1 "Region"
      "1024",//2Functions
      "880",//3 Inventory
     "80", // Yes 4
     "81",  // "No5
     "203",  // Production6
     "1011",  // Corporate7
     "1013",  // Retail8
     "1010", // Billing9
     "1030", // 3rd Party Location10
     "326",  // Department11
     "1507",// User12
     "95", // Time Zone12
     "1637", // Select Time Zone13
     "1246", // Update14

    ];

    const translations = await this.props.translateText(itemsToTranslate, this.props.selectedLanguage);
    this.setState({ translatedMenuItems: translations });
  } catch (error) {
    console.error('Error translating menu items:', error);
  }
};

handleInventory = () => {
  this.setState((prevState) => ({
    inventory: !prevState.inventory,
  }));
};
 
  handleProject = () => {
    this.setState((prevState) => ({
      project: !prevState.project,
    }));
  };
 
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
  componentDidMount() {

    this.props.getTimeZone();
    this.props.getDepartments();
    this.fetchMenuTranslations();
  }

  render() {
    const { locationsTypeName } = this.props;
   

    const timeZoneOption = this.props.timeZone.map((item) => {
      return {
        label: item.zoneName
        || null,
        value: item.timezoneId
        ,
      };
    });
  

    return (
      <>
        <Formik
          initialValues={{
            locationName:this.props.storedLoc.locationName || "",
            management:this.props.storedLoc.management || "",
            productionManager:this.props.storedLoc.productionManager || "",
            regionsId:this.props.storedLoc.regions || "",
            userId: this.props.userId,
            orgId: this.props.orgId,
            groupId: this.props.groupId,
            locationtypeId: undefined,
            productionInd: this.state.production ? "true" : "false",
            billingInd: this.state.billing  ? "true" :"false",
            inventoryInd: this.state.inventory ? "true" : "false",
            projectInd: this.state.project ? "true" : "false",
            // prodManufactureInd: this.state.prodmanuf ? "true" : "false",
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
                // prodManufactureInd: this.state.prodmanuf ? "true" : "false",
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
                  <div className=" text-xs font-poppins font-bold text-black"  > {this.state.translatedMenuItems[0]}</div>
                    <Field
                      name="locationName"
                      // label="Name"
                      type="text"
                      width={"100%"}
                      component={InputComponent}
                      isColumn
                      inlineLabel
                      isRequired
                    />
                  </div>
                  <div class=" w-[45%] mt-3 max-sm:w-[30%]">
                  <div className=" text-xs font-poppins font-bold text-black"  > {this.state.translatedMenuItems[1]}</div>
                      <Field
                        name="regionsId"
                        selectType="DRegion"
                        isColumnWithoutNoCreate
                        component={SearchSelect}
                        // value={values.countryDialCode}
                        // label={
                        //   <FormattedMessage
                        //     id="app.region"
                        //     defaultMessage="Region"
                        //   />
                        // }
                        isColumn
                        defaultValue={{
                          label:`${this.props.storedLoc.regions===null?"Select":this.props.storedLoc.regions}`,
                        }}
                        inlineLabel
                      />
                    </div>
                    
                    <div className=" text-xs font-poppins font-bold text-black"  > {this.state.translatedMenuItems[2]}</div>
                  <div class=" flex ">
                   
                    <div  class=" w-[47%] mt-2">
                    <div className=" text-xs font-poppins font-bold text-black"  > {this.state.translatedMenuItems[3]}<i class="fas fa-warehouse text-base"></i></div>
                      <div>
                        <Switch
                          style={{ width: "6.25em" }}
                          checked={this.state.inventory}
                          onChange={this.handleInventory}
                          checkedChildren={this.state.translatedMenuItems[4]}
          unCheckedChildren={this.state.translatedMenuItems[5]}
                        />
                      </div>
                    </div>
                  </div>
                  <div class=" flex">
                  <div  class=" w-[47%] mt-2">
                  <div className=" text-xs font-poppins font-bold text-black"  > {this.state.translatedMenuItems[6]}<PrecisionManufacturingIcon/></div>
                      <div>
                      <Switch
                        style={{
                          width: "6.25em",
                         
                        }}
                          checked={this.state.production}
                          onChange={this.handleProduction}
                          checkedChildren={this.state.translatedMenuItems[4]}
                          unCheckedChildren={this.state.translatedMenuItems[5]}
                        />
                      </div>
                    </div>
                    <div  class=" w-[47%] mt-2">
                    <div className=" text-xs font-poppins font-bold text-black"  > {this.state.translatedMenuItems[7]}<i class="fas fa-building text-base"></i></div>
                      <div>
                        <Switch
                          style={{ width: "6.25em" }}
                          checked={this.state.corporate}
                          onChange={this.handleCorporate}
                          checkedChildren={this.state.translatedMenuItems[4]}
                          unCheckedChildren={this.state.translatedMenuItems[5]}
                        />
                      </div>
                    </div>
                  </div>
                  <div class=" flex">
                  <div  class=" w-[47%] mt-2">
                  <div className=" text-xs font-poppins font-bold text-black"  > {this.state.translatedMenuItems[8]}<i class="fas fa-money-check text-base"></i></div>
                      <div>
                        <Switch
                          style={{ width: "6.25em" }}
                          checked={this.state.retail}
                          onChange={this.handleRetail}
                          checkedChildren={this.state.translatedMenuItems[4]}
                          unCheckedChildren={this.state.translatedMenuItems[5]}
                        />
                      </div>
                    </div>
                    
                  </div>
                  <div  class=" w-[47%] mt-2">
                  <div className=" text-xs font-poppins font-bold text-black"  > {this.state.translatedMenuItems[9]}<i class="far fa-money-bill-alt text-base"></i></div>
                      <div>
                        <Switch
                          style={{ width: "6.25em" }}
                          checked={this.state.billing}
                          onChange={this.handleBilling}
                          checkedChildren={this.state.translatedMenuItems[4]}
                          unCheckedChildren={this.state.translatedMenuItems[5]}
                        />
                      </div>
                    </div>
                    <div className="flex  items-center mt-4">
        <div className="font-bold m-[0.1rem-0-0.02rem-0.2rem] text-xs flex flex-col">
        {this.state.translatedMenuItems[10]}  {/* 3rd Party Location */}
        </div>
        <Switch
          style={{ width: '6.25em', marginLeft: '0.625em' }}
          onChange={this.handleContract}
          checked={this.state.contract}
          checkedChildren={this.state.translatedMenuItems[4]}
          unCheckedChildren={this.state.translatedMenuItems[5]}
        />
      </div>
      {this.state.contract?
      <div className="flex justify-between max-sm:flex-col">
        <div className="w-w48 max-sm:w-wk">
        <div className=" text-xs font-poppins font-bold text-black"  > {this.state.translatedMenuItems[11]}</div>
          {/* <div style={{ color: "#444", fontWeight: "bold", fontSize: "0.75rem" }}>
            Department
          </div> */}
          <Select
  className="w-[250px]"
  value={this.state.department}
  onChange={(value) => this.handleDepartment(value)}
  showSearch
  optionFilterProp="children"
  filterOption={(input, option) =>
    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
  }
>
  {this.props.departments.map((a) => (
    <Select.Option key={a.departmentId} value={a.departmentId}>
      {a.departmentName}
    </Select.Option>
  ))}
</Select>
        </div>

        <div className="w-w48 max-sm:w-wk">
        <div className=" text-xs font-poppins font-bold text-black"  > {this.state.translatedMenuItems[12]}</div>
            {/* User */}
          
          <Select
            className="w-[250px]"
            value={this.state.reportingManager}
            onChange={(value) => this.handlereportingManager(value)}
          >
            {this.props.departmentwiseUser.map((a) => (
              <Option key={a.employeeId} value={a.employeeId}>
                {a.empName}
              </Option>
            ))}
          </Select>
        </div>
      </div>
      : ( null)}  
                </div>
                <div class="h-full w-[47.5%] max-sm:w-wk mt-2">
                  <div class=" w-full">
                  <div className=" text-xs font-poppins font-bold text-black"  > {this.state.translatedMenuItems[12]}</div>
                    <Field
                      name="timeZone"
                      type="text"
                      placeholder= {this.state.translatedMenuItems[13]}
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
               {this.state.translatedMenuItems[14]}   {/* Update */}
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
const mapStateToProps = ({ location, auth, teams, plant,departments,settings }) => ({
  updatingLocations: location.updatingLocations,
  timeZone: auth.timeZone,
  userId:auth.userDetails.userId,
  orgId:auth.userDetails.organizationId,
  departmentwiseUser: settings.departmentwiseUser,
  organizationId: auth.userDetails.organizationId,
  departments: departments.departments,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      updateLocation,
      getTimeZone,
      getDepartmentwiserUser,
      getDepartments,
 
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(LocationUpdateForm);


