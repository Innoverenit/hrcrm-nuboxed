import React, { Component } from "react";
import { Tooltip } from "antd";
import { Field } from "formik";
import { EnvironmentOutlined } from '@ant-design/icons';
import { FlexContainer } from "../../UI/Layout";
import { Spacer, } from "../../UI/Elements";
import FormikPlacesAutoComplete from "./FormikPlacesAutoComplete";
import { InputComponent } from "../Formik/InputComponent";
import { FormattedMessage } from "react-intl";
import { BundleLoader } from "../../Placeholder";
class AddressFieldArray extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }
  // componentDidMount() {
  //   this.fetchMenuTranslations();
    
  // }
//   async fetchMenuTranslations() {
//     try {
//       this.setState({ loading: true });
//         const itemsToTranslate = [
//             'Address input is only allowed using Location feature', //0
// 'Address', //1
// 'Street', //2
// 'Zip code', //3
// 'City', //4
// 'State/Province', //5
// 'Country', //6

  
//           ];
//       const translations = await this.props.translateText(itemsToTranslate, this.props.selectedLanguage);
//       this.setState({ translatedMenuItems: translations ,loading: false });
//     } catch (error) {
//       this.setState({ loading: false });
//       console.error('Error translating menu items:', error);
//     }
//   }
  render() {
    console.log(this.props);
    const { arrayHelpers, values, singleAddress } = this.props;
    console.log(singleAddress);
    const {loading, activeKey,translatedMenuItems } = this.state;
    // if (loading) {
    //   return <div><BundleLoader/></div>;
    // }
    return (
      <div >
        <Spacer />
        {values &&
          values.address.map((address, index) => (
            <div>             
              <div key={index} style={{ display: "flex", width: "100%"}}>
                <EnvironmentOutlined
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

export default AddressFieldArray;
