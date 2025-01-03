import React, { Component, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "antd";
import {
  MainWrapper,
} from "../../../../../Components/UI/Layout";
import { StyledDrawer } from "../../../../../Components/UI/Antd";
import {
  TextInput,
} from "../../../../../Components/UI/Elements";
import { BundleLoader } from "../../../../../Components/Placeholder";
import { handleEmployeeDrawerForAdmin } from "../../../EmployeeAction";
import { MultiAvatar } from "../../../../../Components/UI/Elements";
import AddBoxIcon from '@mui/icons-material/AddBox';

const UserAdminForm =lazy(()=>import("../EmployeeDrawer/UserAdminForm"));
const EmployeeJumpStartForAdmin =lazy(()=>import("./EmployeeJumpStartForAdmin"));
class EmployeeDrawerForAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLevelTextInputOpen: false,
      isAddModuleNameInputOpen: false,
      // translatedMenuItems: [],
    };
  }
  // componentDidMount() {
  //   this.fetchMenuTranslations();
  // }

  // componentDidUpdate(prevProps) {
  //   if (prevProps.selectedLanguage !== this.props.selectedLanguage) {
  //     this.fetchMenuTranslations();
  //   }
  // }

  // fetchMenuTranslations = async () => {
  //   try {
  //     const itemsToTranslate = [
  //       "1024",//0   Functions
  //       "1643",//1 Custom Function
  //       "1078",//2Save"
  //       "1079",//3 Cancel"
        
  //     ];

  //     const translations = await this.props.translateText(itemsToTranslate, this.props.selectedLanguage);
  //     this.setState({ translatedMenuItems: translations });
  //   } catch (error) {
  //     console.error('Error translating menu items:', error);
  //   }
  // };

  handleAddCustomModule = () => {
    this.setState((prevState) => ({
      isAddModuleNameInputOpen: !prevState.isAddModuleNameInputOpen,
    }));
  };
  handleAddCustomeDepartment = () => {
    this.props.addCustomDepartment(this.state.fields);
    this.setState((prevState) => ({
      isAddModuleNameInputOpen: !prevState.isAddModuleNameInputOpen,
    }));
  };
  handleCancelCustomeDepartment = () => {
    this.setState((prevState) => ({
      isAddModuleNameInputOpen: !prevState.isAddModuleNameInputOpen,
    }));
  };

 
  handleCloseDrawer = () => {
    this.setState(
      {
        isLevelTextInputOpen: false,
      },
      this.props.handleEmployeeDrawerForAdmin(false)
    );
  };
 
  render() {
    const {
      handleEmployeeDrawerForAdmin,
      employeeDrawerVisibleForAdmin,
    } = this.props;
    return (
      <>
        <StyledDrawer
          title={
            <div className="HeaderText">
              <div class="text-lg">
                <span className="ml-1 cursor-pointer" >
                </span>
              </div>
              <div
                className="logo absolute ml-[15.9375rem] bottom-[-20.1875rem] box-[0 0.75em 0.375em -0.375em rgb(46,44,44)] "
                             >
                <MultiAvatar
                  imgHeight={30}
                  imgWidth={30}
                />
              </div>
            </div>
          }
          placement="right"
          closable
          width={400}
          onClose={this.handleCloseDrawer}
          visible={employeeDrawerVisibleForAdmin}
        >
           <Suspense fallback={<BundleLoader />}>
          <UserAdminForm
            translateText={this.props.translateText}
            selectedLanguage={this.props.selectedLanguage}
           employeeId={this.props.employeeId}
          />
          <EmployeeJumpStartForAdmin
  translateText={this.props.translateText}
  selectedLanguage={this.props.selectedLanguage}
          />
          </Suspense>
          <div class=" flex justify-between">
            <div class=" h-full w-full"
            >
              <div class=" w-full" >
              <div class=" flex justify-between">
                  <div  className=" pl-2 text-sm font-bold sticky mt-3" >
                  {this.props.translatedMenuItems[62]}{/* Functions */}
                  </div>

                  <div class=" mt-1">
                    <Button type="primary" onClick={this.handleAddCustomModule}>
                      <AddBoxIcon className=" !text-icon  ml-1 items-center text-[#6f0080ad]" />
                    </Button>
                  </div>
                </div>
                <MainWrapper style={{ height: "30em", marginTop: "0.625em" }}>
                  <div class=" mt-1">
                  <div className=" text-xs font-poppins font-bold text-black ">{this.props.translatedMenuItems[63]}</div>
                    {this.state.isAddModuleNameInputOpen && (
                     
                      <div>
                        <TextInput
                          placeholder={this.props.translatedMenuItems[63]}
                          name="departmentName"
                         
                          onChange={this.handleChange}
                          width={"58%"}
                        />
                        <Button
                          style={{
                            border: "0.0625em solid #1890ff",
                            color: "#1890ff",
                          }}
                          htmlType="submit"
                          onClick={this.handleAddCustomeDepartment}
                        >{this.props.translatedMenuItems[64]}
                        </Button>
                        &nbsp;
                        <Button
                          style={{
                            border: "0.0625em solid #1890ff",
                            color: "#1890ff",
                          }}
                          onClick={this.handleCancelCustomeDepartment}
                        >
                         {this.props.translatedMenuItems[65]}
                        </Button>
                      </div>
                    )}
                  </div>
                 
                </MainWrapper>
              </div>
            </div>
          </div>
        </StyledDrawer>

      </>
    );
  }
}

const mapStateToProps = ({ employee, viewport, auth }) => ({
  employeeDrawerVisibleForAdmin: employee.employeeDrawerVisibleForAdmin,
  userDetails: auth.userDetails,
  
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleEmployeeDrawerForAdmin,
     
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeeDrawerForAdmin);
