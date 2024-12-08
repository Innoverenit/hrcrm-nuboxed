import React, { Component } from "react";
import { Tooltip } from "antd";
import { Field } from "formik";
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import { FlexContainer } from "../../UI/Layout";
import FormikPlacesAutoComplete from "./FormikPlacesAutoComplete";
import { InputComponent } from "../Formik/InputComponent";

class AddressFieldArray4 extends Component {
  render() {
    console.log(this.props);
    const { arrayHelpers, values, singleAddress } = this.props;
    console.log(singleAddress);
    return (
      <div >
        <div class=" mt-3" />
        {values &&
          values.address.map((address, index) => (
            <div>             
              <div key={index} style={{ display: "flex", width: "100%"}}>
                <AddLocationAltIcon
                  // type="environment"
                  style={{                   
                    fontSize: "1.2em",
                    margin: "0px 0.68em 0.42rem",
                    placeSelf: "center",
                  }}
                />
                <Field
                  name={`address[${index}]`}
                  // label="Location"
                  component={FormikPlacesAutoComplete}
                  isColumn
                  options={{}}                
                 
                />
                {/* <FormikPlacesAutoComplete /> */}
                <div 
                //style={{ marginTop: "0.4375em" }}
                >
                  {/* {!singleAddress && (
                    <Button
                      type="primary"
                      htmlType="button"
                      onClick={() =>
                        arrayHelpers.push({
                          addressType: "",
                          address1: "",
                          address2: "",
                          town: "",
                          street: "",
                          city: "",
                          state: "",
                          postalCode: "",
                          country: "",
                          latitude: "",
                          longitude: "",
                        })
                      }
                    >
                      +
                    </Button>
                  )} */}
                </div>
              
                <div 
               // style={{ marginTop: "0.4375em" }}
                >
                  {/* {!singleAddress && (
                    <Button
                      type="primary"
                      htmlType="button"
                      onClick={() => arrayHelpers.remove(index)}
                    >
                      -
                    </Button>
                  )} */}
                </div>
              </div>
              {/* {!singleAddress && (
                <Button
                  type="primary"
                  htmlType="button"
                  onClick={() => arrayHelpers.remove(index)}
                >
                  -
                </Button>
              )} */}
              <span>
                {/* <Field
                                name={`address[${index}].addressType`}
                                label='Type'
                                component={SelectComponent}
                                options={['Office', 'Communication', 'Headquarters', 'Registered']}
                                inlineLabel
                                style={{ flexBasis: '80%' }}
                            /> */}                
                <p class="text-xs"
                  style={{
                    fontWeight: "bold",                   
                    fontStyle: "italic",
                    color: "#1890ff",                   
                  }}
                >
                  Address input is only allowed using Location feature
                       
                 </p>
                
                <div class="flex justify-between max-sm:flex-col">
                <div class="w-[32%] max-sm:w-wk">     
                 <Field
                  name={`address.${index}.address1`}
                  label="Address 1"
                  // label="Address 1"
                  isColumn
                  component={InputComponent}
                  width={"100%"}
                  inlineLabel
                />  
                </div>
                <div class="w-[32%] max-sm:w-wk">                         
                <Field
                  name={`address.${index}.street`}
                  // label="Street"
                  label="Street"
                  component={InputComponent}
                  width={"100%"}
                  isColumn
                  inlineLabel                 
                /> 
                </div> 
                <div class="w-[32%] max-sm:w-wk"> 
                    <Tooltip title="Use Location feature for easy search ">
                      <Field
                        name={`address.${index}.postalCode`}
                     
                        label="Pin code"
                        // disabled
                        component={InputComponent}
                        isColumn
                        width={"100%"}
                        inlineLabel                       
                      />
                    </Tooltip>
                  </div>
                  </div>         
                <div class="flex justify-between max-sm:flex-col" >
                <div class="w-[32%] max-sm:w-wk"> 
                    <Tooltip title="Use Location feature for easy search ">
                      <Field
                        name={`address.${index}.city`}
                        label="City"
                       
                        component={InputComponent}
                        disabled
                        width={"100%"}
                        isColumn
                        inlineLabel    
                        isDisabled                   
                      />
                    </Tooltip>
                  </div> 
                  <div class="w-[32%] max-sm:w-wk"> 
                    <Tooltip title="Use Location feature for easy search ">
                      <Field
                        name={`address.${index}.state`}
                        label="State/Province"
                         component={InputComponent}
                        disabled
                        width={"100%"}
                        isColumn
                        inlineLabel                       
                      />
                    </Tooltip>
                  </div>
                  <div class="w-[32%] max-sm:w-wk"> 
                    <Tooltip title="Use Location feature for easy search ">
                      <Field
                        name={`address.${index}.country`}
                        label="Country"
                      
                        disabled
                        component={InputComponent}
                        isColumn
                        width={"100%"}
                        inlineLabel                       
                      />
                    </Tooltip>
                  </div>   
                </div>   
                          
                <FlexContainer justifyContent="space-between">
                  {/* <div style={{ width: "47%" }}>
                    <Tooltip title="Use Location feature for easy search ">
                      <Field
                        name={`address.${index}.country`}
                        label="Country"
                        disabled
                        component={InputComponent}
                        isColumn
                        width={"100%"}
                        inlineLabel                       
                      />
                    </Tooltip>
                  </div> */}

                </FlexContainer>
              </span>
            </div>
          ))}
      </div>
    );
  }
}

export default AddressFieldArray4;
