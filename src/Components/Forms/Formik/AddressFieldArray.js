// import React, { Component } from "react";
// import { Tooltip } from "antd";
// import { Field } from "formik";
// import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
// import FormikPlacesAutoComplete from "./FormikPlacesAutoComplete";
// import { InputComponent } from "../Formik/InputComponent";
// class AddressFieldArray extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       loading: true
//     };
//   }

//   render() {
//     console.log(this.props);
//     const { arrayHelpers, values, singleAddress } = this.props;
//     console.log(singleAddress);
//     const {loading, activeKey,translatedMenuItems } = this.state; 
//     return (
//       <div >
//         <mt-3 />
//         {values &&
//           values.address.map((address, index) => (
//             <div>             
//               <div key={index} style={{ display: "flex", width: "100%"}}>
//                 <AddLocationAltIcon className="!text-icon m-[0px 0.68em 0.42rem] self-center"
                  
                
//                 />
//                 <Field
//                   name={`address[${index}]`}
              
//                   component={FormikPlacesAutoComplete}             
//                   options={{}}                               
//                 />      
//                 <div              
//                 >              
//                 </div>              
//                 <div 
              
//                 >                 
//                 </div>
//               </div>          
//               <span>                        
//                 <p class="text-xs"
//                   style={{
//                     fontWeight: "bold",                   
//                     fontStyle: "italic",
//                     color: "#1890ff",                   
//                   }}
//                 >
//                                             {/* {translatedMenuItems[0]} */}
                                          
//                                             Address input is only allowed using Location feature
//                  </p>
                
//                 <div class="flex justify-between max-sm:flex-col">
//                 <div class="w-[32%] max-sm:w-wk">     
//                  <Field
//                   name={`address.${index}.address1`}
           

//                    label="Address "
//                   isColumn
//                   component={InputComponent}
//                   width={"100%"}
//                   inlineLabel
//                 />  
//                 </div>
//                 <div class="w-[32%] max-sm:w-wk">                         
//                 <Field
//                   name={`address.${index}.street`}
//                    label="Street"
            
//                   component={InputComponent}
//                   width={"100%"}
//                   isColumn
//                   inlineLabel                 
//                 /> 
//                 </div> 
//                 <div class="w-[32%] max-sm:w-wk"> 
//                     <Tooltip title="Use Location feature for easy search ">
//                       <Field
//                         name={`address.${index}.postalCode`}
//                          label="Zip code"
                    
//                         component={InputComponent}
//                         isColumn
//                         width={"100%"}
//                         inlineLabel                       
//                       />
//                     </Tooltip>
//                   </div>
//                   </div>         
//                 <div class="flex justify-between max-sm:flex-col" >
//                 <div class="w-[32%] max-sm:w-wk"> 
//                     <Tooltip title="Use Location feature for easy search ">
//                       <Field
//                         name={`address.${index}.city`}
//                          label="City"
                       
//                         component={InputComponent}
//                         disabled
//                         width={"100%"}
//                         isColumn
//                         inlineLabel    
//                         isDisabled                   
//                       />
//                     </Tooltip>
//                   </div> 
//                   <div class="w-[32%] max-sm:w-wk"> 
//                     <Tooltip title="Use Location feature for easy search ">
//                       <Field
//                         name={`address.${index}.state`}
//                          label="State/Province"
                       
//                         component={InputComponent}
//                         disabled
//                         width={"100%"}
//                         isColumn
//                         inlineLabel                       
//                       />
//                     </Tooltip>
//                   </div>
//                   <div class="w-[32%] max-sm:w-wk"> 
//                     <Tooltip title="Use Location feature for easy search ">
//                       <Field
//                         name={`address.${index}.country`}
//                          label="Country"
                        
//                         disabled
//                         component={InputComponent}
//                         isColumn
//                         width={"100%"}
//                         inlineLabel                       
//                       />
//                     </Tooltip>
//                   </div>   
//                 </div>                           
//                 <div class=" flex flex-row flex-wrap items-start self-start justify-between grow shrink h-auto mr-auto ">             
//                 </div>
//               </span>
//             </div>
//           ))}
//       </div>
//     );
//   }
// }

// export default AddressFieldArray;



import React, { useState } from "react";
import { Tooltip } from "antd";
import { Field } from "formik";
import useGoogleMapsLoader from '../../../Components/CustomMap/useGoogleMapsLoader'
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import FormikPlacesAutoComplete from "./FormikPlacesAutoComplete";
import { InputComponent } from "../Formik/InputComponent";

const AddressFieldArray = ({ arrayHelpers, values, singleAddress }) => {
  const [state, setState] = useState({
    loading: true,
    activeKey: null,
    translatedMenuItems: [],
  });

  const { loading, activeKey, translatedMenuItems } = state;
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
        values.address.map((address, index) => (
          <div key={index}>
            <div style={{ display: "flex", width: "100%" }}>
              <AddLocationAltIcon
                className="!text-icon m-[0px 0.68em 0.42rem] self-center"
              />
              <Field
                name={`address[${index}]`}
                component={FormikPlacesAutoComplete}
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
                    name={`address.${index}.address1`}
                    label="Address "
                    isColumn
                    component={InputComponent}
                    width={"100%"}
                    inlineLabel
                  />
                </div>

                <div className="w-[32%] max-sm:w-wk">
                  <Field
                    name={`address.${index}.street`}
                    label="Street"
                    component={InputComponent}
                    width={"100%"}
                    isColumn
                    inlineLabel
                  />
                </div>

                <div className="w-[32%] max-sm:w-wk">
                  <Tooltip title="Use Location feature for easy search ">
                    <Field
                      name={`address.${index}.postalCode`}
                      label="Zip code"
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
                      name={`address.${index}.city`}
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

                <div className="w-[32%] max-sm:w-wk">
                  <Tooltip title="Use Location feature for easy search ">
                    <Field
                      name={`address.${index}.country`}
                      label="Country"
                      component={InputComponent}
                      disabled
                      isColumn
                      width={"100%"}
                      inlineLabel
                    />
                  </Tooltip>
                </div>
              </div>

              <div className="flex flex-row flex-wrap items-start self-start justify-between grow shrink h-auto mr-auto" />
            </span>
          </div>
        ))}
    </div>
      )}
      </>
  );
};

export default AddressFieldArray;

