

import React, { useEffect, useState } from "react";
import { Button, Select } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  addApprove,
  getApproveData,
} from "../../../SettingsAction";
import { SelectComponent } from "../../../../../Components/Forms/Formik/SelectComponent";
import { Field } from "formik";
const { Option } = Select;

function ProspectCustomerLevelForm(props) {
    const [selectedOption, setSelectedOption] = useState(null);
    const [rows, setRows] = useState(props.approvalData.level || []);
    const [isLoading, setIsLoading] = useState(true)
    function handleChange(value) {
      setSelectedOption(value);
    }

    useEffect(() => {
      // Once approvalData.level is available, set rows and update isLoading
      if (props.approvalData.level) {
        setRows(props.approvalData.level);
        setIsLoading(false);
      }
    }, [props.approvalData.level]);


    function buttonOnClick() {
      if (!selectedOption) {
        // Handle case when no level is selected
        return;
      }
  
      const data = {
        approvalIndicator: props.approvalIndicator,
        approvalType: props.approvalType,
        subProcessName: "ProspectToCustomer",
        level: [
          {
            level: selectedOption,
           
          },
        ],
      };
  
      console.log(data);
      props.addApprove(data);
    }

 
  

 
 




  // if (!props.approvalData.level) {
  //   return <BundleLoader />;
  // }
  if (isLoading) {
    // return <BundleLoader />;
  }
 

  return (
    
    <div>
      <div className="MainBox">
        <div className="InputBox">
          {/* {rows.map((row, index) => ( */}
            <div >
              <div className="w-full flex font-bold mt-4 items-center">
             
                
                <div class="w-[13rem]">
                <Select
                  name={`level`}
                      value={selectedOption}
                      onChange={handleChange}
                  >
                    <option value="ReportingManager">Reporting Manager</option>
                    <option value="ReportingManager+1">Reporting Manager +1</option>
                    {/* <option value="Management">Management</option> */}
                  </Select>
                </div>
                                
              </div>
            </div>
          {/* ))} */}
          <div class=" flex justify-end mt-4">
                  
              
            
              <div className="button">
                  <Button
                      type="primary"
                   
                      onClick={() => buttonOnClick()}
                  >
                      Submit
                  </Button>
                  </div>
           
              </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = ({ settings,role, auth, departments }) => ({
  departments: departments.departments,
  roles:role.roles,
  approvalData: settings.approvalData,
  userId: auth.userDetails.userId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {

      addApprove,
      getApproveData,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ProspectCustomerLevelForm);




