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
    // Manage the rows locally within the step
    const [rows, setRows] = useState([{ name: "", subCategoryName: "" }]);

    // Add a new row
    const handleAddRow = () => {
        setRows([...rows, { name: "", subCategoryName: "" }]);
    };

    // Remove a row
    const handleRemoveRow = (index) => {
        const updatedRows = [...rows];
        updatedRows.splice(index, 1);
        setRows(updatedRows);
    };

    // Handle form submission
    const handleSubmit = (values, resetForm) => {
        // Setting the selected items
        props.setSelectedItems([...rows, values]); // Include new values

        // Call the next step function
        props.nextStep();

        resetForm(); // Reset the form after submission
    };

    return (
        <div>
            {rows.map((row, index) => (
                <div key={index} className="flex justify-around w-wk">
                    <Formik
                        initialValues={{
                            name: row.name,
                            subCategoryName: row.subCategoryName,
                        }}
                        onSubmit={(values, { resetForm }) => {
                            handleSubmit(values, resetForm);
                        }}
                    >
                        {({
                            errors,
                            touched,
                            isSubmitting,
                            setFieldValue,
                        }) => (
                            <Form className="form-background w-wk">
                                <div className="flex justify-between w-wk">
                                    <div className="h-full flex w-wk">
                                        <div className="flex flex-col w-[35%]">
                                            <div className="font-bold text-xs font-poppins text-black">
                                                Supplier List
                                            </div>
                                            <div className="w-[100%]">
                                                <Field
                                                    isRequired
                                                    name="name"
                                                    placeholder="Start typing to search or create..."
                                                    optionLabel="name"
                                                    optionValue="name"
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
                                                    name="subCategoryName"
                                                    placeholder="Start typing to search or create..."
                                                    optionLabel="subCategoryName"
                                                    optionValue="subCategoryName"
                                                    url={`${base_url2}/supplies/subcategory`}
                                                    component={LazySelect}
                                                    isColumn
                                                    inlineLabel
                                                    style={{ flexBasis: "80%" }}
                                                />
                                            </div>
                                        </div>

                                        <div className="w-4 mt-[1.5rem]">
                                            <CloseOutlined onClick={() => handleRemoveRow(index)} />
                                        </div>
                                    </div>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            ))}

            <Button type="primary" onClick={handleAddRow}>
                Add Row
            </Button>
           
            {/* Proceed Button */}
            <Button 
                type="primary" 
                onClick={() => {
                    const lastRow = rows[rows.length - 1]; // Get the last row's values
                    props.setSelectedItems([...rows, lastRow]); // Store all selected items
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








