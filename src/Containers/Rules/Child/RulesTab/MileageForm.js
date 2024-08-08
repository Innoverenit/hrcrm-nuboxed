import React, { useState, useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { bindActionCreators } from "redux";
import { Button, Switch, Icon, Tooltip } from "antd";
import {getCountries} from "../../../Auth/AuthAction"
import { Formik, Form, Field, FastField } from "formik";
import { elipsize } from "../../../../Helpers/Function/Functions";
import { InputComponent } from "../../../../Components/Forms/Formik/InputComponent";
import { SelectComponent } from "../../../../Components/Forms/Formik/SelectComponent";
import { FlexContainer } from "../../../../Components/UI/Layout";
import { StyledLabel } from "../../../../Components/UI/Elements";

import { 
  updateMileage, 
  getMileageDetails } from "../../../Settings/SettingsAction";
import { Class } from "leaflet";
import { StyledTabs } from "../../../../Components/UI/Antd";
import dayjs from "dayjs";
const TabPane = StyledTabs.TabPane;
function MileageForm(props) {

  if (props.countries.length === props.mileageData.length) {
    for (let i = 0; i < props.countries.length; i++) {
      
      props.countries[i].mileageRate = props.mileageData[i].mileageRate;
    }
  } else {
    console.error("Arrays data and data1 must have the same length for merging.");
  }
  
  console.log(props.countries);
  const [visible, setVisible] = useState(false);
  const [inputValues, setInputValues] = useState(
    Object.fromEntries(props.countries.map(item => [item.country_id,item.mileageRate]))
  );

  const handleChange = (checked) => {
    debugger;
    setVisible(checked);
  };
  useEffect(() => {
     props.getMileageDetails(props.orgId);
     props.getCountries();
  }, []);
 
  const handleInputChange = (event, country_id
    ) => {
    const { name, value } = event.target;
    setInputValues(prevState => ({
      ...prevState,
      [country_id
      ]: value
    }));
  };

  
      const handleUpdateButtonClick = () => {
   
        const countryData = props.countries.map(item => ({
          country: item.country_id,
          mileageRate: inputValues[item.country_id
          ]
        }));
        props.updateMileage(countryData,props.orgId);
        
        console.log(countryData);
       
      };

  // const teamOption = useMemo(() => {
  //   if (!props.onlySalesUsers) return [];
  //   return (
  //     props.onlySalesUsers.length &&
  //     props.onlySalesUsers.map((user) => {
  //       return {
  //         label: `${user.firstName} - ${user.emailId}` || "",
  //         value: user.userId,
  //       };
  //     })
  //   );
  // }, [props.onlySalesUsers]);
  console.log(inputValues);

  return (
    <>
    
       
         
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div
                style={{
                  height: "100%",
                  width: "100%",
                }}
              >
                <div class=" text-xs font-bold font-poppins text-black">Mileage rate (For Example EUR/km)</div>
                {/* <Field
                  isRequired
                  name="mileageRate"
                  // label="Max leaves (in days)"
                  label={<FormattedMessage
                    id="app.mileage rate in eurkm"
                    defaultMessage="Mileage rate (For Example EUR/km)"
                  />}
                  width={"10%"}
                  component={InputComponent}
                  inlineLabel
            
                /> */}
                    {props.countries.map((item, i) => {
                      return (
                        
                        <div key={item.country_id} style={{display:"flex",flexDirection:"row",justifyContent: "space-between",
                        width: "40%",marginTop:"1rem"}}>
    <span  >
                          {elipsize(item.country_name, 15)}
                        </span>
                        <span>
                        <input
                        style={{border: "2px solid black"}}
            type="number"
            name={item.country_id
            }
            value={inputValues[item.country_id
            ]}
            onChange={(e) => handleInputChange(e, item.country_id
              )}
          />
                        {/* <input
                       onChange={handleCountryValue}
                        style={{border: "2px solid black"}}
                        type="text"

                        /> */}
                      </span>
                        </div>

                      )
          
                
              })}
                <div class=" mt-3" />
                <FlexContainer justifyContent="flex-end">
                {/* <button onClick={handleUpdateButtonClick}>Update All</button> */}
                  <Button
                    type="primary"
                    htmlType="submit"
                    onClick={handleUpdateButtonClick}
                    // Loading={props.updatingMileage}
                  >
                    Update
                  </Button>
                </FlexContainer>
                <div>Updated on {dayjs(props.mileageData && props.mileageData.length && props.mileageData[0].updationDate).format("ll")} by {props.mileageData && props.mileageData.length && props.mileageData[0].name}</div>

                <div class=" mt-3" />
               
            </div>
            </div>
         
       
    </>
  );
}

const mapStateToProps = ({ auth, settings, team }) => ({
  userId: auth.userDetails.userId,
  orgId: auth.userDetails.organizationId,
  addingLeaves: settings.addingLeaves,
  mileageData: settings.mileageData,
  countries: auth.countries,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      updateMileage,
      getMileageDetails,
      getCountries
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(MileageForm);
