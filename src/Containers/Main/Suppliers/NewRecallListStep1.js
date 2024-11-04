import React, { useState } from "react";
import { Button } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { CloseOutlined } from "@ant-design/icons";
import { Formik, Form, Field } from "formik";
import { addRecallData } from "./SuppliersAction";
import LazySelect from "../../../Components/Forms/Formik/LazySelect";
import { base_url2 } from "../../../Config/Auth";
import { SelectComponent } from "../../../Components/Forms/Formik/SelectComponent";

const NewRecallListStep1 = (props) => {
    const [fields, setFields] = useState([{ supplierId: "", suppliesFullName: "", batchNo: "" }]);

    const addMoreFields = () => {
        setFields([...fields, { supplierId: "", suppliesFullName: "", batchNo: "" }]);
    };

    const removeField = (index) => {
        const newFields = [...fields];
        newFields.splice(index, 1);
        setFields(newFields);
    };

    return (
        <div>
            <Formik
                initialValues={{ items: fields }}
                onSubmit={(values, { resetForm }) => {
                    console.log("Saved form data:", values);
                    props.addRecallData({ ...values });
                    resetForm();
                }}
            >
                {({ setFieldValue }) => (
                    <Form className="form-background w-wk">
                        <div className="flex justify-between w-wk">
                            {fields.map((field, index) => (
                                <div key={index} className="flex w-wk space-x-4">
                                    <div className="flex flex-col w-[35%]">
                                        <label className="font-bold text-xs font-poppins text-black">Supplier List</label>
                                        <Field
                                            isRequired
                                            name={`items[${index}].supplierId`}
                                            placeholder="Start typing to search or create..."
                                            optionLabel="name"
                                            optionValue="supplierId"
                                            url={`${base_url2}/supplier/search/supplier`}
                                            component={LazySelect}
                                            isColumn
                                            inlineLabel
                                            style={{ flexBasis: "80%" }}
                                        />
                                    </div>

                                    <div className="flex flex-col w-[35%]">
                                        <label className="font-bold text-xs font-poppins text-black">Material List</label>
                                        <Field
                                            isRequired
                                            name={`items[${index}].suppliesFullName`}
                                            placeholder="Start typing to search or create..."
                                            optionLabel="subCategoryName"
                                            optionValue="suppliesFullName"
                                            url={`${base_url2}/supplies/search`}
                                            component={LazySelect}
                                            isColumn
                                            inlineLabel
                                            style={{ flexBasis: "80%" }}
                                        />
                                    </div>

                                    <div className="flex flex-col w-[35%]">
                                        <label className="font-bold text-xs font-poppins text-black">Batch No</label>
                                        <Field
                                            isRequired
                                            name={`items[${index}].batchNo`}
                                            options={["PassPort", "ID Card"]}
                                            component={SelectComponent}
                                            isColumn
                                            inlineLabel
                                            style={{ flexBasis: "80%" }}
                                        />
                                    </div>

                                    {fields.length > 1 && (
                                        <div className="w-4 mt-[1.5rem]">
                                            <CloseOutlined onClick={() => removeField(index)} />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-end w-wk mt-4">
                            <Button type="primary" htmlType="submit" loading={props.addingRecallData}>
                                Create
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>

            <Button type="primary" onClick={addMoreFields} className="mt-4">
                Add Row
            </Button>
        </div>
    );
};

const mapStateToProps = ({ auth, suppliers }) => ({
    userId: auth.userDetails.userId,
    addingRecallData: suppliers.addingRecallData,
    token: auth.token,
    organizationId: auth.userDetails.organizationId,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({ addRecallData }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(NewRecallListStep1);



// import React, { useState } from "react";
// import { Button } from "antd";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import { CloseOutlined } from "@ant-design/icons";
// import { Formik, Form, Field } from "formik";
// import {addRecallData} from "./SuppliersAction"
// import LazySelect from "../../../Components/Forms/Formik/LazySelect";
// import { base_url2 } from "../../../Config/Auth";
// import { SelectComponent } from "../../../Components/Forms/Formik/SelectComponent";

// const NewRecallListStep1 = (props) => {
//     // // Manage the rows locally within the step
//     // const [rows, setRows] = useState([{ supplierId: "", subCategoryName: "" }]);

//     // // Add a new row
//     // const handleAddRow = () => {
//     //     setRows([...rows, { supplierId: "", subCategoryName: "" }]);
//     // };

//     // // Remove a row
//     // const handleRemoveRow = (index) => {
//     //     const updatedRows = [...rows];
//     //     updatedRows.splice(index, 1);
//     //     setRows(updatedRows);
//     // };

//     // // Handle form submission
//     // const handleSubmit = (values, resetForm) => {
//     //     // Setting the selected items
//     //     props.setSelectedItems([...rows, values]); // Include new values

//     //     // Call the next step function
//     //     props.nextStep();

//     //     resetForm(); // Reset the form after submission
//     // };
//     const [fields, setFields] = useState([{  supplierId: "", suppliesFullName: "",batchNo:""  }]); // Form fields state
//     const [formData, setFormData] = useState(null); // State to save submitted form data
  
//     const addMoreFields = () => {
//       setFields([...fields, {  supplierId: "", suppliesFullName: "",batchNo:"" }]); // Add a new row to the state
//     };
  
//     const removeField = (index) => {
//       const newFields = [...fields];
//       newFields.splice(index, 1); // Remove the selected row
//       setFields(newFields);
//     };
//     return (
//         <div>
//             {/* {rows.map((row, index) => ( */}
//                 <div  className="flex justify-around w-wk">
//                     <Formik
//                         initialValues={{
//                             items: fields,
                           
//                         }}
//                         onSubmit={(values, { resetForm }) => {
//                             //setFormData(values); // Save data to state
//                             console.log('Saved form data:', values); 
//                             props.addRecallData(
//                                 {
//                                   ...values,
                                
//                                 },
//                                 // props.userId,
//                                 // props.customerId,
//                                 resetForm()
//                               );
                          
//                         }}
//                     >
//                         {({
//                             errors,
//                             touched,
//                             isSubmitting,
//                             setFieldValue,
//                             handleChange, handleSubmit
//                         }) => (
//                             <Form className="form-background w-wk">
//                                 <div className="flex justify-between w-wk">
//                                 {fields.map((field, index) => (
//                                     <div key={index} className="h-full flex w-wk">
//                                         <div className="flex flex-col w-[35%]">
//                                             <div className="font-bold text-xs font-poppins text-black">
//                                                 Supplier List
//                                             </div>
//                                             <div className="w-[100%]">
//                                                 <Field
//                                                     isRequired
//                                                     name="supplierId"
//                                                     placeholder="Start typing to search or create..."
//                                                     optionLabel="name"
//                                                     optionValue="supplierId"
//                                                     url={`${base_url2}/supplier/search/supplier`}
//                                                     component={LazySelect}
//                                                     isColumn
//                                                     inlineLabel
//                                                     style={{ flexBasis: "80%" }}
//                                                 />
//                                             </div>
//                                         </div>

//                                         <div className="flex flex-col w-[35%]">
//                                             <div className="font-bold text-xs font-poppins text-black">
//                                                 Material List
//                                             </div>
//                                             <div className="w-[100%]">
//                                                 <Field
//                                                     isRequired
//                                                     name="suppliesFullName"
//                                                     placeholder="Start typing to search or create..."
//                                                     optionLabel="subCategoryName"
//                                                     optionValue="suppliesFullName"
//                                                     url={`${base_url2}/supplies/search`}
//                                                     component={LazySelect}
//                                                     isColumn
//                                                     inlineLabel
//                                                     style={{ flexBasis: "80%" }}
//                                                 />
//                                             </div>
//                                         </div>



//                                         <div className="flex flex-col w-[35%]">
//                                             <div className="font-bold text-xs font-poppins text-black">
//                                                Batch No
//                                             </div>
//                                             <div className="w-[100%]">
//                                                 <Field
//                                                     isRequired
//                                                     name="batchNo"
//                                                     options={["PassPort", "ID Card"]}
//                                                     component={SelectComponent}
//                                                     isColumn
//                                                     inlineLabel
//                                                     style={{ flexBasis: "80%" }}
//                                                 />
//                                             </div>
//                                         </div>

//                                         <div className="w-4 mt-[1.5rem]">
//                                             <CloseOutlined onClick={() => removeField(index)} />
//                                         </div>
//                                     </div>
//                                 ))}
//                                 </div>
//                                 <div class="flex justify-end w-wk bottom-[3.5rem] mr-2 absolute mt-3 ">
//               <Button
//                 type="primary"
//                 htmlType="submit"
//                 loading={props.addingRecallData}
//               >

//                 Create
//               </Button>
//             </div>
//                             </Form>
//                         )}
//                     </Formik>
//                 </div>
//             {/* // ))} */}

//             <Button type="primary" onClick={addMoreFields}>
//                 Add Row
//             </Button>
           
       
//         </div>
//     );
// };


// const mapStateToProps = ({ auth, opportunity,employee,currency,investor, contact,suppliers, customer,leads }) => ({
   
//     userId: auth.userDetails.userId,
//     addingRecallData:suppliers.addingRecallData,
  
//     token: auth.token,
    
//     organizationId: auth.userDetails.organizationId,
   
//   });
  
//   const mapDispatchToProps = (dispatch) =>
//     bindActionCreators(
//       {
//         addRecallData
//       },
//       dispatch
//     );
  
//   export default connect(mapStateToProps, mapDispatchToProps)(NewRecallListStep1);










// import React, { useState } from 'react';
// import { Formik, Field, Form } from 'formik';
// import { Button, Select, Input } from 'antd';

// const { Option } = Select;

// const MyForm = () => {
//   const [fields, setFields] = useState([{ select: '', input: '' }]); // Form fields state
//   const [formData, setFormData] = useState(null); // State to save submitted form data

//   const addMoreFields = () => {
//     setFields([...fields, { select: '', input: '' }]); // Add a new row to the state
//   };

//   const removeField = (index) => {
//     const newFields = [...fields];
//     newFields.splice(index, 1); // Remove the selected row
//     setFields(newFields);
//   };

//   return (
//     <div>
//       <Formik
//         initialValues={{ items: fields }} // Use state fields in Formik's initial values
//         enableReinitialize={true} // Reinitialize form when the state changes
//         onSubmit={(values) => {
//           setFormData(values); // Save data to state
//           console.log('Saved form data:', values); // Log data to the console
//         }}
//       >
//         {({ values, handleChange, handleSubmit }) => (
//           <Form onSubmit={handleSubmit}>
//             {fields.map((field, index) => (
//               <div key={index} style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
//                 <div>
//                   <label>{Select ${index + 1}}</label>
//                   <Field name={items[${index}].select}>
//                     {({ field }) => (
//                       <Select
//                         {...field}
//                         onChange={(value) => handleChange({ target: { name: field.name, value } })}
//                         style={{ width: 150 }}
//                       >
//                         <Option value="option1">Option 1</Option>
//                         <Option value="option2">Option 2</Option>
//                         <Option value="option3">Option 3</Option>
//                       </Select>
//                     )}
//                   </Field>
//                 </div>

//                 <div>
//                   <label>{Input ${index + 1}}</label>
//                   <Field name={items[${index}].input}>
//                     {({ field }) => <Input {...field} style={{ width: 200 }} />}
//                   </Field>
//                 </div>

//                 {fields.length > 1 && (
//                   <Button type="danger" onClick={() => removeField(index)}>
//                     Remove
//                   </Button>
//                 )}
//               </div>
//             ))}

//             <Button type="dashed" onClick={addMoreFields} style={{ width: 'fit-content' }}>
//               Add More
//             </Button>

//             <Button type="primary" htmlType="submit" style={{ marginTop: '16px' }}>
//               Submit
//             </Button>
//           </Form>
//         )}
//       </Formik>

//       {/* Display the saved form data */}
//       {formData && (
//         <div style={{ marginTop: '20px' }}>
//           <h3>Saved Form Data:</h3>
//           <pre>{JSON.stringify(formData, null, 2)}</pre>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MyForm;