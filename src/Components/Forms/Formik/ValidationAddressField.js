// import React, { Component } from "react";
// import {Tooltip } from "antd";
// import { Field,ErrorMessage } from "formik";
// import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
// import FormikPlacesAutoComplete from "./FormikPlacesAutoComplete";
// import { InputComponent } from "./InputComponent";
// class AddressFieldArray1 extends Component {
//     render() {
//         console.log(this.props);
//         const { arrayHelpers, values, singleAddress } = this.props;
//         console.log(singleAddress);
//         return (
//             <div >
//                 <mt-3 />
//                 {values &&
//                     values.loadingAddress.map((loadingAddress, index) => (
//                         <div>
//                             <div key={index} style={{ display: "flex", width: "100%" }}>
//                                 <AddLocationAltIcon
//                                     // type="environment"
//                                     style={{
//                                         fontSize: "1.2em",
//                                         margin: "0px 0.68em 0.42rem",
//                                         placeSelf: "center",
//                                     }}
//                                 />
//                                 <Field
//                                     name={`loadingAddress[${index}]`}
//                                     // label="Location"
//                                     component={FormikPlacesAutoComplete}
//                                     isColumn
//                                     options={{}}

//                                 />
                              
//                                 <div
            
//                                 >                       
//                                 </div>

//                                 <div
                                
//                                 >
                                    
//                                 </div>
//                             </div>
                           
//                             <span>
                              
//                                 <p class="text-xs"
//                                     style={{
//                                         fontWeight: "bold",
//                                         fontStyle: "italic",
//                                         color: "#1890ff",
//                                     }}
//                                 >Address input is only allowed using Location feature</p>

//                                 <div class="flex justify-between max-sm:flex-col">
//                                     <div class="w-[32%] max-sm:w-wk">
//                                         <Field
//                                             name={`loadingAddress.${index}.address1`}
//                                             label="Address 1"
//                                             isColumn
//                                             component={InputComponent}
//                                             width={"100%"}
//                                             inlineLabel
//                                         />
//                                          <ErrorMessage name={`loadingAddress.${index}.address1`} component="div" className="error-message" />
//                                     </div>

//                                     <div class="w-[32%] max-sm:w-wk">
//                                         <Field
//                                             name={`loadingAddress.${index}.street`}
//                                             label="Street"
//                                             component={InputComponent}
//                                             width={"100%"}
//                                             isColumn
//                                             inlineLabel
//                                         />
//                                          <ErrorMessage name={`loadingAddress.${index}.street`} component="div" className="error-message" />
//                                     </div>
//                                     <div class="w-[32%] max-sm:w-wk">
//                                         <Tooltip title="Use Location feature for easy search ">
//                                             <Field
//                                                 name={`loadingAddress.${index}.postalCode`}
//                                                 label="Pin code"
//                                                 // disabled
//                                                 component={InputComponent}
//                                                 isColumn
//                                                 width={"100%"}
//                                                 inlineLabel
//                                             />
//                                         </Tooltip>
//                                     </div>
//                                 </div>
//                                 <div class="flex justify-between max-sm:flex-col" >
//                                     <div class="w-[32%] max-sm:w-wk">
//                                         <Tooltip title="Use Location feature for easy search ">
//                                             <Field
//                                                 name={`loadingAddress.${index}.city`}
//                                                 label="City"
//                                                 component={InputComponent}
//                                                 disabled
//                                                 width={"100%"}
//                                                 isColumn
//                                                 inlineLabel
//                                                 isDisabled
//                                             />
//                                         </Tooltip>
//                                     </div>
//                                     <div class="w-[32%] max-sm:w-wk">
//                                         <Tooltip title="Use Location feature for easy search ">
//                                             <Field
//                                                 name={`loadingAddress.${index}.state`}
//                                                 label="State/Province"
//                                                 component={InputComponent}
//                                                 disabled
//                                                 width={"100%"}
//                                                 isColumn
//                                                 inlineLabel
//                                             />
//                                         </Tooltip>
//                                     </div>
//                                     <div class="w-[32%] max-sm:w-wk">
//                                         <Tooltip title="Use Location feature for easy search ">
//                                             <Field
//                                                 name={`loadingAddress.${index}.country`}
//                                                 label="Country"
//                                                 disabled
//                                                 component={InputComponent}
//                                                 isColumn
//                                                 width={"100%"}
//                                                 inlineLabel
//                                             />
//                                         </Tooltip>
//                                     </div>
//                                 </div>

//                                 <div class=" flex flex-row flex-wrap items-start self-start justify-between grow shrink h-auto mr-auto ">
                          
//                                 </div>
//                             </span>
//                         </div>
//                     ))}
//             </div>
//         );
//     }
// }

// export default AddressFieldArray1;

import React from "react";
import { Tooltip } from "antd";
import { Field, ErrorMessage } from "formik";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import FormikPlacesAutoComplete from "./FormikPlacesAutoComplete";
import { InputComponent } from "./InputComponent";
import useGoogleMapsLoader from '../../../Components/CustomMap/useGoogleMapsLoader'

const AddressFieldArray1 = ({ arrayHelpers, values, singleAddress }) => {
  console.log({ arrayHelpers, values, singleAddress });
  const apiKey = "AIzaSyAQdQZU6zRL9w32DH2_9al-kkXnK38fnJY";
  const { isLoaded, error } = useGoogleMapsLoader(apiKey, 'places');

  return (
    <>
      {!isLoaded ? (
      <div>Loading Google Autoplaces...</div>
     ) : (
     <div>
      <mt-3 />
      {values &&
        values.loadingAddress.map((loadingAddress, index) => (
          <div key={index}>
            <div style={{ display: "flex", width: "100%" }}>
              <AddLocationAltIcon
                style={{
                  fontSize: "1.2em",
                  margin: "0px 0.68em 0.42rem",
                  placeSelf: "center",
                }}
              />
              <Field
                name={`loadingAddress[${index}]`}
                component={FormikPlacesAutoComplete}
                isColumn
                options={{}}
              />
            </div>

            <span>
              <p
                className="text-xs"
                style={{
                  fontWeight: "bold",
                  fontStyle: "italic",
                  color: "#1890ff",
                }}
              >
                Address input is only allowed using Location feature
              </p>

              <div className="flex justify-between max-sm:flex-col">
                <div className="w-[32%] max-sm:w-wk">
                  <Field
                    name={`loadingAddress.${index}.address1`}
                    label="Address 1"
                    isColumn
                    component={InputComponent}
                    width={"100%"}
                    inlineLabel
                  />
                  <ErrorMessage
                    name={`loadingAddress.${index}.address1`}
                    component="div"
                    className="error-message"
                  />
                </div>

                <div className="w-[32%] max-sm:w-wk">
                  <Field
                    name={`loadingAddress.${index}.street`}
                    label="Street"
                    component={InputComponent}
                    width={"100%"}
                    isColumn
                    inlineLabel
                  />
                  <ErrorMessage
                    name={`loadingAddress.${index}.street`}
                    component="div"
                    className="error-message"
                  />
                </div>

                <div className="w-[32%] max-sm:w-wk">
                  <Tooltip title="Use Location feature for easy search ">
                    <Field
                      name={`loadingAddress.${index}.postalCode`}
                      label="Pin code"
                      component={InputComponent}
                      isColumn
                      width={"100%"}
                      inlineLabel
                    />
                  </Tooltip>
                </div>
              </div>

              <div className="flex justify-between max-sm:flex-col">
                <div className="w-[32%] max-sm:w-wk">
                  <Tooltip title="Use Location feature for easy search ">
                    <Field
                      name={`loadingAddress.${index}.city`}
                      label="City"
                      component={InputComponent}
                      disabled
                      width={"100%"}
                      isColumn
                      inlineLabel
                    />
                  </Tooltip>
                </div>

                <div className="w-[32%] max-sm:w-wk">
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

                <div className="w-[32%] max-sm:w-wk">
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
            </span>
          </div>
        ))}
    </div>
       )}
    </>
   
  );
};

export default AddressFieldArray1;

