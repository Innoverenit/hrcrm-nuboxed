// import React, { useState,useEffect } from "react";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import { Button,Select } from "antd";
// 
// import { Formik, Form, Field,  FastField,setFieldValue  } from "formik";
// import * as Yup from "yup";
// import  {addDataroom,getuserList} from  "./DataRoomAction";
// import { InputComponent } from "../../Components/Forms/Formik/InputComponent";
// import { SelectComponent } from "../../Components/Forms/Formik/SelectComponent";

// const { Option } = Select; 

// // yup validation scheme for creating a account
// const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
// const LeadsSchema = Yup.object().shape({
//   firstName: Yup.string().required("Input needed!"),
//   email: Yup.string().required("Input needed!").email("Enter a valid Email"),
//   // phoneNumber:Yup.string().matches(phoneRegExp, 'Phone number is not valid').min(8,"Minimum 8 digits").max(10,"Number is too long")
// });

// function DataRooForm (props) {
  
//  const handleReset = (resetForm) => {
//     resetForm();
//   };
 
//   useEffect(()=> {
// props. getuserList(props.orgId);
//   },[]);

//     const {
//       accounts,
//       user,
//       userId,
//       // user: { userId, firstName },
//       isEditing,
//       prefillAccount,
//       addingDataroom,
//       addDataroom,
//       clearbit,
//       setClearbitData,
//     } = props;
//     const [lob, setLob] = useState([]);
//     const [selectedLob, setSelectedLob] = useState(null);
//     const [touchedLob, setTouchedLob] = useState(false);
//     const [defaultOption, setDefaultOption] = useState(props.fullName);
//     const [selected, setSelected] = useState(defaultOption);
//     const selectedOption = props.crmAllData.find((item) => item.empName === selected);
//     const [isLoadingLob, setIsLoadingLob] = useState(false);
//     const [source, setSource] = useState([]);
//     const [sector, setSector] = useState([]);
//     const [touched, setTouched] = useState(false);
//   const [touchedSector, setTouchedSector] = useState(false);
//     const [selectedSector, setSelectedSector] = useState(null);
//     const [selectedSource, setSelectedSource] = useState(null);
//     const [isLoadingSector, setIsLoadingSector] = useState(false);
//     const [isLoading, setIsLoading] = useState(false);

//     const typeOption = props.userRoomlist.map((item) => {
//       return {
//         label: `${item.empName}`,
//         value: item.employeeId,
//       };
//     });

//     return (
//       <>
//         <Formik
//           // enableReinitialize
//           initialValues={{
//             name:"",
//             included:"",
           
//           }}
//           validationSchema={LeadsSchema}
//           onSubmit={(values, { resetForm }) => {
//             console.log(values);
//             addDataroom(
//               {
//                 ...values,
                
//               },
            
//             );
//             resetForm()
       
//           }}
//         >
//           {({
//             errors,
//             touched,
//             isSubmitting,
//             setFieldValue,
//             setFieldTouched,
//             values,
//             ...rest
//           }) => (
//             <div class="overflow-y-auto h-[34rem] overflow-x-hidden max-sm:h-[30rem]">
//             <Form className="form-background">
           
//              <div class="flex justify-between  pr-2 max-sm:flex-col" >
                   
//                 <div class=" h-full w-wk max-sm:w-wk"   >
//                   <div class=" flex  flex-nowrap">

                   
//                     <div class="w-w47.5.5">
//                       <div class=" flex justify-between max-sm:flex-col">
                       
//                         <div class=" w-wk max-sm:w-full ">
//                           <FastField
//                             isRequired
//                             name="name"
//                             label="Name"
//                             type="text"
//                             width={"100%"}
//                             isColumn
//                             component={InputComponent}
//                             inlineLabel
//                           />
//                         </div>
//                       </div>                  
//                       <div class=" flex justify-between max-sm:flex-col">
//                         {/* <div class=" w-[47.5%] max-sm:w-full">
//                           <FastField
//                             name="middleName"
//                             label="Members"
                           
//                             type="text"
//                             width={"100%"}
//                             isColumn
//                             component={InputComponent}
//                             inlineLabel
//                           />
                          
//                         </div> */}
//                         <div class=" w-wk max-sm:w-full">
                         
//                           <Field
//       name="included"
//       label="Include User"
//       isColumn
//       width={"100%"}
//      component={SelectComponent}
//       options={
//         Array.isArray(typeOption)
//           ? typeOption
//           : []
//       }
//       inlineLabel
//     />
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   {/* <Field
//                     isRequired
//                     name="email"
//                     type="text"
//                     label="List of contact"
//                     isColumn
//                     width={"100%"}
//                     component={InputComponent}
//                     inlineLabel
//                   />  */}
                               
                 
              
                 
                
                         
                 
                
                  
                   
               
                 
                   
             

                  
//                 </div>
              
//               </div>
            
//               <div class="flex justify-end mt-3 w-wk bottom-2 mr-2 md:absolute ">
//                 <Button
//                type="primary"
//                htmlType="submit"
//                   loading={addingDataroom}
//                 >
//             
//                   {/*                     
//                     Create */}
//                 </Button>
//               </div>
//             </Form>
//             </div>
//           )}
//         </Formik>
//       </>
//     );
// }

// const mapStateToProps = ({ auth, leads,lob,datRoom }) => ({
//   addingDataroom: leads.addingDataroom,
//   crmAllData:leads.crmAllData,
//   addingDataroomError: leads.addingDataroomError,
//    clearbit: leads.clearbit,
//    orgType:auth.userDetails.orgType,
//   user: auth.userDetails,
//   lobListData: lob.lobListData,
//   organizationId: auth.userDetails.organizationId,
//   orgId: auth.userDetails.organizationId,
//   userId: auth.userDetails.userId,
//   fullName: auth.userDetails.fullName,
//   token: auth.token,
//   userRoomlist:datRoom.userRoomlist
// });

// const mapDispatchToProps = (dispatch) =>
//   bindActionCreators(
//     {
//         addDataroom,
//         getuserList

//     },
//     dispatch
//   );

// export default connect(mapStateToProps, mapDispatchToProps)(DataRooForm);




import React, { useState,useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button,Select } from "antd";
import { Formik, Form,  FastField  } from "formik";
import * as Yup from "yup";
import  {addDataroom,getuserList} from  "./DataRoomAction";
import { InputComponent } from "../../Components/Forms/Formik/InputComponent";
import { BundleLoader } from "../../Components/Placeholder";
import {base_url} from "../../Config/Auth";

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const CustomerSchema = Yup.object().shape({
  name: Yup.string().required("Input needed!"),
  // email: Yup.string().required("Input needed!").email("Enter a valid Email"),
  // phoneNumber: Yup.string().matches(phoneRegExp, 'Phone number is not valid').min(8, "Minimum 8 digits").max(10, "Number is too long")
});

const { Option } = Select;  

function CustomerForm(props) {

   const[checked,setChecked]=useState(true);
  const[whiteblue,setWhiteblue]=useState(true);
  const [include, setInclude] = useState([]);
  const [isLoadingInclude, setIsLoadingInclude] = useState(false);
  const [selectedIncludeValues, setSelectedIncludeValues] = useState([]);
  const [touchedInclude, setTouchedInclude] = useState(false);
  const [loading, setLoading] = useState(true);
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);

  function handleWhiteBlue(checked) {
    setWhiteblue(checked);
  };

  function handleReset(resetForm) {
    resetForm();
  };
  function handleChange() {
    setChecked(
      !checked
    );
  };

  const fetchInclude = async () => {
    setIsLoadingInclude(true);
    try {
      const apiEndpoint = `${base_url}/employee/active/user/drop-down/${props.orgId}`;
      const response = await fetch(apiEndpoint,{
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${props.token}`,
          'Content-Type': 'application/json',
          // Add any other headers if needed
        },
      });
      const data = await response.json();
      setInclude(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setIsLoadingInclude(false);
    }
  };

  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        setLoading(true); 
        const itemsToTranslate = [
          '110', // 0  Name
          '1124',// 1 Include User
          '104' //Create
        ];

        const translations = await props.translateText(itemsToTranslate, props.selectedLanguage);
        setTranslatedMenuItems(translations);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error('Error translating menu items:', error);
      }
    };

    fetchMenuTranslations();
  }, [props.selectedLanguage]);
  useEffect(() => {
    props. getuserList(props.orgId);
  }, []);

  const handleSelectChangeInclude = (values) => {
    setSelectedIncludeValues(values); // Update selected values
  };

  const handleSelectIncludeFocus = () => {
    if (!touchedInclude) {
      fetchInclude();
      setTouchedInclude(true);
    }
  };
    const {
     
      addingDataroom,
      addDataroom,
     
    } = props;

  // const typeOption = props.userRoomlist.map((item) => {
  //   return {
  //     label: `${item.empName}`,
  //     value: item.employeeId,
  //   };
  // });
  if (loading) {
    return <div><BundleLoader/></div>;
  }
  return (
    <>
      <Formik
        // enableReinitialize
        initialValues={{
         
          name: "",
          included:selectedIncludeValues,
        }}
        validationSchema={CustomerSchema}
        onSubmit={(values, { resetForm }) => {
          console.log(values);
          addDataroom(
            {
              ...values,
              included:selectedIncludeValues,
             
            },
            //props.userId,
            resetForm()
          );
        }}
      >
        {({
          errors,
          touched,
          isSubmitting,
          setFieldValue,
          setFieldTouched,
          values,
          ...rest
        }) => (
          <div class="overflow-y-auto h-[34rem] overflow-x-hidden max-sm:h-[30rem]">
            <Form className="form-background">
           
             <div class="flex justify-between  pr-2 max-sm:flex-col" >
                   
                <div class=" h-full w-wk max-sm:w-wk"   >
                  <div class=" flex  flex-nowrap">

                   
                    <div class="w-w47.5.5">
                      <div class=" flex justify-between max-sm:flex-col">
                       
                        <div class="font-bold text-xs w-wk max-sm:w-full ">
                        <div>{translatedMenuItems[0]} </div>  
                          <FastField
                            isRequired
                            name="name"
                           // label="Name"
                            type="text"
                            width={"100%"}
                            isColumn
                            component={InputComponent}
                            inlineLabel
                          />
                        </div>
                      </div>                  
                      <div class=" flex justify-between max-sm:flex-col">
                        
                        <div class=" w-wk max-sm:w-full">
                                          
     <div className="font-bold text-xs">{translatedMenuItems[1]}</div>
        <Select
          showSearch
          style={{ width: "-webkit-fill-available" }}
          placeholder="Search or select include"
          optionFilterProp="children"
          loading={isLoadingInclude}
          onFocus={handleSelectIncludeFocus}
          onChange={handleSelectChangeInclude}
          defaultValue={selectedIncludeValues}
          mode="multiple"
        >
          {props.userRoomlist.map((includes) => (
            <Option key={includes.employeeId} value={includes.employeeId}>
              {includes.empName}
            </Option>
          ))}
        </Select>
                        </div>
                      </div>
                    </div>
                  </div>                      
                </div>            
              </div>           
              <div class="flex justify-end mt-3 w-wk bottom-2 mr-2 md:absolute ">
                <Button
               type="primary"
               htmlType="submit"
                  loading={addingDataroom}
                >
                           <div class=" text-xs font-bold font-poppins"> {translatedMenuItems[2]}</div>  
                  {/*                     
                    Create */}
                </Button>
              </div>
            </Form>
            </div>
        )}
      </Formik>
    </>
  );
}


const mapStateToProps = ({ auth,datRoom}) => ({
  userRoomlist:datRoom.userRoomlist,
  userId: auth.userDetails.userId,
  orgId: auth.userDetails.organizationId,
  addingDataroom: datRoom.addingDataroom,
  addingDataroomError: datRoom.addingDataroomError,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addDataroom,
         getuserList
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(CustomerForm);
