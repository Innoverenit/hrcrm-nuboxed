import React, { Component, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { bindActionCreators } from "redux";
import { Button } from "antd";
import {
  MainWrapper,
} from "../../../../../Components/UI/Layout";
import { StyledDrawer } from "../../../../../Components/UI/Antd";
import {
  DrawerHeaderText,
  TextInput,
} from "../../../../../Components/UI/Elements";
import { BundleLoader } from "../../../../../Components/Placeholder";
import { handleEmployeeDrawerForAdmin } from "../../../EmployeeAction";
import { MultiAvatar } from "../../../../../Components/UI/Elements";
import { PlusOutlined } from "@ant-design/icons";

const UserAdminForm =lazy(()=>import("../EmployeeDrawer/UserAdminForm"));
const EmployeeJumpStartForAdmin =lazy(()=>import("./EmployeeJumpStartForAdmin"));
class EmployeeDrawerForAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLevelTextInputOpen: false,
      isAddModuleNameInputOpen: false,
    };
  }

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
              <DrawerHeaderText fontSize={"1.375em"}>
                <span
                  style={{
                    fontSize: "1em",

                    marginLeft: "0.3125em",
                    cursor: "pointer",
                  }}
                >
                </span>
              </DrawerHeaderText>
              <div
                className="logo"
                style={{
                  position: "absolute",
                  marginLeft: "15.9375em",
                  bottom: "-20.1875em",
                  boxShadow: " 0 0.75em 0.375em -0.375em rgb(46,44,44)",
                }}
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
           employeeId={this.props.employeeId}
          />
          <EmployeeJumpStartForAdmin

          />
          </Suspense>
          <div class=" flex justify-between">
            <div class=" h-full w-full"
            >
              <div class=" w-full" >
              <div class=" flex justify-between">
                  <div 
                    style={{
                      paddingLeft: "0.625em",
                      fontSize: "1.25em",
                      fontWeight: "bold",
                      position: "sticky",
                      marginTop: "0.9375em",
                    }}
                  >
                    Functions
                  </div>

                  <div class=" mt-1">
                    <Button type="primary" onClick={this.handleAddCustomModule}>
                      <PlusOutlined type="plus" />
                    </Button>
                  </div>
                </div>
                <MainWrapper style={{ height: "30em", marginTop: "0.625em" }}>
                  <div class=" mt-1">
                    {this.state.isAddModuleNameInputOpen && (
                      <div>
                        <TextInput
                          placeholder="Custom Function"
                          name="departmentName"
                          label={
                            <FormattedMessage
                              id="app.departmentName"
                              defaultMessage="Custom Function"
                            />
                          }
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
                        >
                          <FormattedMessage
                            id="app.save"
                            defaultMessage="Save"
                          />
                        </Button>
                        &nbsp;
                        <Button
                          style={{
                            border: "0.0625em solid #1890ff",
                            color: "#1890ff",
                          }}
                          onClick={this.handleCancelCustomeDepartment}
                        >
                          <FormattedMessage
                            id="app.cancel"
                            defaultMessage="Cancel"
                          />
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
