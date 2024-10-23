// import React, { useState } from "react";
// import { Button } from "antd";
// import { CloseOutlined } from "@ant-design/icons";
// import { Formik, Form, Field } from "formik";
// import LazySelect from "../../../Components/Forms/Formik/LazySelect";
// import { base_url2 } from "../../../Config/Auth";

// const NewRecallListStep1 = (props) => {
//   // Manage the rows locally within the step
//   const [rows, setRows] = useState([{ name: "", subCategoryName: "" }]);

//   // Add a new row
//   const handleAddRow = () => {
//     setRows([...rows, { name: "", subCategoryName: "" }]);
//   };

//   // Remove a row
//   const handleRemoveRow = (index) => {
//     const updatedRows = [...rows];
//     updatedRows.splice(index, 1);
//     setRows(updatedRows);
//   };

//   // Handle form change for each field
//   const handleFormChange = (index, field, value) => {
//     const updatedRows = [...rows];
//     updatedRows[index] = { ...updatedRows[index], [field]: value };
//     setRows(updatedRows); // Update the local state
//   };


//   const handleStepSubmit = () => {
//     // Map the current rows to the step1Data format
//     const step1Data = rows.map((row) => ({
//         name: row.name, // Ensure to match the expected key for the API
//       subCategoryName: row.subCategoryName,
//     }));

//     // Pass data to the parent via props callback
//     props.setSelectedItems(step1Data);

//     // Move to the next step
//     props.nextStep();
//   };





//   return (
//     <div>
//       {rows.map((row, index) => (
//         <div key={index} className="flex justify-around w-wk">
//           <Formik
//             initialValues={row}
//             enableReinitialize // Reinitialize Formik when 'row' changes
//             onSubmit={(values) => { handleStepSubmit([...rows.map((_, i) => (i === index ? values : _))])}}
//           >
//             {({ setFieldValue }) => (
//               <Form className="form-background w-wk">
//                 <div className="flex justify-between w-wk">
//                   <div className="h-full flex w-wk">
//                     <div className="flex flex-col w-[35%]">
//                       <div className=" font-bold text-xs font-poppins text-black">
//                         Supplier List
//                       </div>
//                       <div className="w-[100%]">
//                       <Field
//                     isRequired
//                     name="name"
//                     //label="Category"
//                     placeholder="Start typing to search or create..."
//                     optionLabel="name"
//                     optionValue="name"
//                     url={`${base_url2}/supplier/search/supplier`}
//                     component={LazySelect}
//                     isColumn
//                     inlineLabel
//                     style={{ flexBasis: "80%" }}
//                   />
                     
//                       </div>
//                     </div>

//                     <div className="flex flex-col w-[35%]">
//                       <div className="font-bold text-xs font-poppins text-black">
//                         Material List
//                       </div>
//                       <div className="w-[100%]">
//                         <Field
//                           isRequired
//                           name="subCategoryName"
//                           //label="Category"
//                           placeholder="Start typing to search or create..."
//                           optionLabel="subCategoryName"
//                           optionValue="subCategoryName"
//                           url={`${base_url2}/supplies/subcategory`}
//                           component={LazySelect}
//                           isColumn
//                           inlineLabel
//                           style={{ flexBasis: "80%" }}

//                         />
//                       </div>
//                     </div>

//                     <div className="w-4 mt-[1.5rem]">
//                       <CloseOutlined onClick={() => handleRemoveRow(index)} />
//                     </div>
//                   </div>
//                 </div>
//               </Form>
//             )}
//           </Formik>
//         </div>
//       ))}

//       <Button type="primary" onClick={handleAddRow}>
//         Add Row
//       </Button>

//       <Button type="primary" onClick={handleStepSubmit}>
//         Proceed to Step 2
//       </Button>
//     </div>
//   );
// };

// export default NewRecallListStep1;


import React, { useState } from "react";
import { Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { Formik, Form, Field } from "formik";
import LazySelect from "../../../Components/Forms/Formik/LazySelect";
import { base_url2 } from "../../../Config/Auth";

const NewRecallListStep1 = (props) => {
    // // Manage the rows locally within the step
    // const [rows, setRows] = useState([{ supplierId: "", subCategoryName: "" }]);

    // // Add a new row
    // const handleAddRow = () => {
    //     setRows([...rows, { supplierId: "", subCategoryName: "" }]);
    // };

    // // Remove a row
    // const handleRemoveRow = (index) => {
    //     const updatedRows = [...rows];
    //     updatedRows.splice(index, 1);
    //     setRows(updatedRows);
    // };

    // // Handle form submission
    // const handleSubmit = (values, resetForm) => {
    //     // Setting the selected items
    //     props.setSelectedItems([...rows, values]); // Include new values

    //     // Call the next step function
    //     props.nextStep();

    //     resetForm(); // Reset the form after submission
    // };
    const [fields, setFields] = useState([{  supplierId: "", suppliesFullName: ""  }]); // Form fields state
    const [formData, setFormData] = useState(null); // State to save submitted form data
  
    const addMoreFields = () => {
      setFields([...fields, {  supplierId: "", suppliesFullName: "" }]); // Add a new row to the state
    };
  
    const removeField = (index) => {
      const newFields = [...fields];
      newFields.splice(index, 1); // Remove the selected row
      setFields(newFields);
    };
    return (
        <div>
            {/* {rows.map((row, index) => ( */}
                <div  className="flex justify-around w-wk">
                    <Formik
                        initialValues={{
                            items: fields,
                           
                        }}
                        onSubmit={(values, { resetForm }) => {
                            setFormData(values); // Save data to state
                            console.log('Saved form data:', values); 
                          
                        }}
                    >
                        {({
                            errors,
                            touched,
                            isSubmitting,
                            setFieldValue,
                            handleChange, handleSubmit
                        }) => (
                            <Form className="form-background w-wk">
                                <div className="flex justify-between w-wk">
                                {fields.map((field, index) => (
                                    <div key={index} className="h-full flex w-wk">
                                        <div className="flex flex-col w-[35%]">
                                            <div className="font-bold text-xs font-poppins text-black">
                                                Supplier List
                                            </div>
                                            <div className="w-[100%]">
                                                <Field
                                                    isRequired
                                                    name="supplierId"
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
                                        </div>

                                        <div className="flex flex-col w-[35%]">
                                            <div className="font-bold text-xs font-poppins text-black">
                                                Material List
                                            </div>
                                            <div className="w-[100%]">
                                                <Field
                                                    isRequired
                                                    name="suppliesFullName"
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
                                        </div>

                                        <div className="w-4 mt-[1.5rem]">
                                            <CloseOutlined onClick={() => removeField(index)} />
                                        </div>
                                    </div>
                                ))}
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            {/* // ))} */}

            <Button type="primary" onClick={addMoreFields}>
                Add Row
            </Button>
           
            {/* Proceed Button */}
            <Button 
                type="primary" 
                onClick={() => {
                    const lastRow = fields[fields.length - 1]; // Get the last row's values
                    props.setSelectedItems([...fields, lastRow]); // Store all selected items
                    props.nextStep(); // Move to the next step
                }}
                style={{ marginTop: '1rem' }} // Add some margin for spacing
            >
                Proceed
            </Button>
        </div>
    );
};

export default NewRecallListStep1;








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