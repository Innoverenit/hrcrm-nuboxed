import React, { Component } from "react";
import { Tooltip } from "antd";
import { Field } from "formik";
import { EnvironmentOutlined } from '@ant-design/icons';
import FormikPlacesAutoComplete from "./FormikPlacesAutoComplete";
import { InputComponent } from "../Formik/InputComponent";
class AddressFieldArray extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  render() {
    console.log(this.props);
    const { arrayHelpers, values, singleAddress } = this.props;
    console.log(singleAddress);
    const {loading, activeKey,translatedMenuItems } = this.state; 
    return (
      <div >
        <mt-3 />
        {values &&
          values.address.map((address, index) => (
            <div>             
              <div key={index} style={{ display: "flex", width: "100%"}}>
                <EnvironmentOutlined className="!text-icon m-[0px 0.68em 0.42rem] self-center"
                  // type="environment"
                
                />
                <Field
                  name={`address[${index}]`}
                  // label="Location"
                  component={FormikPlacesAutoComplete}             
                  options={{}}                               
                />      
                <div              
                >              
                </div>              
                <div 
               // style={{ marginTop: "0.4375em" }}
                >                 
                </div>
              </div>          
              <span>                        
                <p class="text-xs"
                  style={{
                    fontWeight: "bold",                   
                    fontStyle: "italic",
                    color: "#1890ff",                   
                  }}
                >
                                            {/* {translatedMenuItems[0]} */}
                                            Address input is only allowed using Location feature
                 </p>
                
                <div class="flex justify-between max-sm:flex-col">
                <div class="w-[32%] max-sm:w-wk">     
                 <Field
                  name={`address.${index}.address1`}
                  //label={translatedMenuItems[1]}

                   label="Address "
                  isColumn
                  component={InputComponent}
                  width={"100%"}
                  inlineLabel
                />  
                </div>
                <div class="w-[32%] max-sm:w-wk">                         
                <Field
                  name={`address.${index}.street`}
                   label="Street"
                  //label={translatedMenuItems[2]}
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
                         label="Zip code"
                        //label={translatedMenuItems[3]}
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
                        //label={translatedMenuItems[4]}
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
                        //label={translatedMenuItems[5]}
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
                        //label={translatedMenuItems[6]}
                        disabled
                        component={InputComponent}
                        isColumn
                        width={"100%"}
                        inlineLabel                       
                      />
                    </Tooltip>
                  </div>   
                </div>                           
                <div class=" flex flex-row flex-wrap items-start self-start justify-between grow shrink h-auto mr-auto ">             
                </div>
              </span>
            </div>
          ))}
      </div>
    );
  }
}

export default AddressFieldArray;
