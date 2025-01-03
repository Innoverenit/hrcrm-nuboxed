import React, {Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Switch,Select } from "antd";
import SearchSelect from "../../../../Components/Forms/Formik/SearchSelect";
import { Formik, Form, Field, FieldArray } from "formik";
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import { InputComponent } from "../../../../Components/Forms/Formik/InputComponent";
import { SelectComponent } from "../../../../Components/Forms/Formik/SelectComponent";
import AddressFieldArray from "../../../../Components/Forms/Formik/AddressFieldArray";
import { addLocation, } from "../../../Event/Child/Location/LocationAction";
import { getTimeZone } from "../../../Auth/AuthAction";
import { getDepartmentwiserUser } from "../../../Settings/SettingsAction"
import { getRoles } from "../../../Settings/Category/Role/RoleAction"
import { getDepartments } from "../../../Settings/Department/DepartmentAction";
import ApartmentIcon from '@mui/icons-material/Apartment';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import InventoryIcon from'@mui/icons-material/Inventory';
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
  componentDidMount() {
    
    this.props.getRoles(this.props.organizationId);
    this.props.getDepartments(); 
    this.props.getTimeZone();
    this.fetchMenuTranslations();
  }
 
  componentDidUpdate(prevProps) {
    if (prevProps.selectedLanguage !== this.props.selectedLanguage) {
      this.fetchMenuTranslations();
    }
  }

  fetchMenuTranslations = async () => {
    try {
      const itemsToTranslate = [
       "110",   // "Name", 0
       "24"  , // "Region", 1
       "880"  , // "inventory", 2 
       "203"  , //  "Production",3
       "1011"  , // "Corporate", 4
       "1013"  ,  // "Retail",5
       "1010"  , // "Billing",6
       "1030"  , // " 3rd Party Location", 7
       "326"  , // "Department",8
       "95", // Time Zone 9
       "185"  ,  // "Address", 10
       "104"  ,  // "Create", 11
       "95"  , // "Time Zone" 12
      ];

      const translations = await this.props.translateText(itemsToTranslate, this.props.selectedLanguage);
      this.setState({ translatedMenuItems: translations });
    } catch (error) {
      console.error('Error translating menu items:', error);
    }
  };
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
            this.props.addLocation(
              {
                ...values,
                productionInd: this.state.production ? "true" : "false",
                billingInd: this.state.billing ? "true" : "false",
                inventoryInd: this.state.inventory ? "true" : "false",
                projectInd: this.state.project ? "true" : "false",
                // prodManufactureInd: this.state.prodmanuf ? "true" : "false",
                corporateInd: this.state.corporate ? "true" : "false",
                retailInd: this.state.retail ? "true" : "false",
                thirdPartyInd: this.state.contract ? "true":"false",
                thirdPartyContactDpt :this.state.department ?this.state.department:"",
                thirdPartyContact:this.state.reportingManager ? this.state.reportingManager : "",
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
            <div >
              <div class="overflow-y-auto h-[30rem] overflow-x-hidden ">
            <Form class="form-background">
              <div class="flex justify-around max-sm:flex-col">
                <div class="h-full w-[50%] max-sm:w-wk">
              
                  <div>
                  <div class=" text-xs font-bold font-poppins">{this.state.translatedMenuItems[0]}</div>
                    <Field
                      name="locationName"
                      // label="Location Name"
                      // label={this.state.translatedMenuItems[0]}
                      type="text"
                      width={"100%"}
                      component={InputComponent}
                      isColumn
                      inlineLabel
                      isRequired
                    />
                  </div>
                  <div class=" w-[50%] mt-3 max-sm:w-[30%]">
                  <div class=" text-xs font-bold font-poppins">{this.state.translatedMenuItems[1]}</div>
                      <Field
                        name="regionsId"
                        selectType="DRegion"
                        isColumnWithoutNoCreate
                        component={SearchSelect}
                     
                        isColumn
                      
                        inlineLabel
                      />
                    </div>
                                                      
                  <div class="font-bold m-[0.1rem-0-0.02rem-0.2rem] text-xs flex flex-col mt-3">Functions</div>
                  <div class=" flex ">
                    
                    <div class=" w-[47%] mt-2" >
                    <div class=" text-xs font-bold font-poppins">
                      {this.state.translatedMenuItems[2]}  {/* Inventory */}
                         &nbsp;  <InventoryIcon className=" !text-icon text-[#480CA8]"/></div>
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
                    <div class=" w-[47%] mt-2" >
                      <div class="font-bold text-xs font-poppins">
                      {this.state.translatedMenuItems[6]} {/* Billing  */}
                      <LocalAtmIcon  className="!text-icon text-[#001219]"/></div>
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
                  <div class=" flex">
                  <div class=" w-[47%] mt-2" >
                      <div class="font-bold text-xs font-poppins">
                      {this.state.translatedMenuItems[3]}{/* Production */}
                         &nbsp;<PrecisionManufacturingIcon className=" !text-icon text-[#4361EE]"/></div>
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
                      <div class="font-bold text-xs font-poppins">
                       {this.state.translatedMenuItems[4]} {/* Corporate */}
                         &nbsp; <ApartmentIcon className="!text-icon text-[#f0386b]"/></div>
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
                 
                  </div>
                 
                  <div className="flex  items-center mt-4">
        <div className="font-bold m-[0.1rem-0-0.02rem-0.2rem] text-xs flex flex-col font-poppins">
        {this.state.translatedMenuItems[7]}{/* 3rd Party Location */}
        </div>
        <Switch
          style={{ width: '6.25em', marginLeft: '0.625em' }}
          onChange={this.handleContract}
          checked={this.state.contract}
          checkedChildren="Yes"
          unCheckedChildren="No"
        />
      </div>
      {this.state.contract?
      <div className="flex justify-between max-sm:flex-col">
        <div className="w-w48 max-sm:w-wk">
        <div class=" text-xs font-bold font-poppins">   {this.state.translatedMenuItems[8]} </div>
       {/* Department */}
          
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
        <div class=" text-xs font-bold font-poppins">   {this.state.translatedMenuItems[9]} </div>{/* User */}
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
                <div class="h-full w-[45%] max-sm:w-wk">
                  <div class=" w-full" >
                    <div class="font-bold m-[0.1rem-0-0.02rem-0.2rem] text-xs flex flex-col font-poppins">{this.state.translatedMenuItems[12]} </div>
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
                <div class=" text-xs font-bold font-poppins">   {this.state.translatedMenuItems[10]} </div>
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
                  loading={this.props.addingLocation} >
                  {this.state.translatedMenuItems[11]}{/* Create */}
                </Button>
              </div>
            </Form>
            </div>
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
      addLocation,
      getTimeZone,
      getDepartmentwiserUser,
      getRoles,
      getDepartments,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(LocationForm);








