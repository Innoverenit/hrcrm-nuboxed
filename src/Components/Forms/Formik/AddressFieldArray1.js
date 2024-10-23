import React, { Component } from "react";
import {Tooltip } from "antd";
import { Field } from "formik";
import { EnvironmentOutlined } from '@ant-design/icons';
import FormikPlacesAutoComplete from "./FormikPlacesAutoComplete";
import { InputComponent } from "../Formik/InputComponent";
class AddressFieldArray1 extends Component {
    render() {
        console.log(this.props);
        const { arrayHelpers, values, singleAddress } = this.props;
        console.log(singleAddress);
        return (
            <div >
                <mt-3 />
                {values &&
                    values.loadingAddress.map((loadingAddress, index) => (
                        <div>
                            <div key={index} style={{ display: "flex", width: "100%" }}>
                                <EnvironmentOutlined
                                    // type="environment"
                                    style={{
                                        fontSize: "1.2em",
                                        margin: "0px 0.68em 0.42rem",
                                        placeSelf: "center",
                                    }}
                                />
                                <Field
                                    name={`loadingAddress[${index}]`}
                                    // label="Location"
                                    component={FormikPlacesAutoComplete}
                                    isColumn
                                    options={{}}

                                />
                              
                                <div
            
                                >                       
                                </div>

                                <div
                                
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
                                >Address input is only allowed using Location feature</p>

                                <div class="flex justify-between max-sm:flex-col">
                                    <div class="w-[32%] max-sm:w-wk">
                                        <Field
                                            name={`loadingAddress.${index}.address1`}
                                            label="Address 1"
                                            isColumn
                                            component={InputComponent}
                                            width={"100%"}
                                            inlineLabel
                                        />
                                    </div>
                                    <div class="w-[32%] max-sm:w-wk">
                                        <Field
                                            name={`loadingAddress.${index}.street`}
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
                                                name={`loadingAddress.${index}.postalCode`}
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
                                                name={`loadingAddress.${index}.city`}
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
                                                name={`loadingAddress.${index}.state`}
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
                                                name={`loadingAddress.${index}.country`}
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

                                <div class=" flex flex-row flex-wrap items-start self-start justify-between grow shrink h-auto mr-auto ">
                          
                                </div>
                            </span>
                        </div>
                    ))}
            </div>
        );
    }
}

export default AddressFieldArray1;
