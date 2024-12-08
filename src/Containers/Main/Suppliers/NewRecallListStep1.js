import React, { useState,useEffect } from "react";
import { Button } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import CloseIcon from '@mui/icons-material/Close';
import { Formik, Form, Field } from "formik";
import { addRecallData,getBatchNo } from "./SuppliersAction";
import LazySelect from "../../../Components/Forms/Formik/LazySelect";
import { base_url2 } from "../../../Config/Auth";
import { SelectComponent } from "../../../Components/Forms/Formik/SelectComponent";

const NewRecallListStep1 = (props) => {
    const [fields, setFields] = useState([{ suppliesId: "", suppliesFullName: "", batchNo: "" }]);


    useEffect(() => {
props.getBatchNo();
      }, []);

    const addMoreFields = () => {
        setFields([...fields, { suppliesId: "", suppliesFullName: "", batchNo: "" }]);
    };

    const removeField = (index) => {
        const newFields = [...fields];
        newFields.splice(index, 1);
        setFields(newFields);
    };


    const batchData = props.batchNo.map((item) => {
        return {
          label: item.batchNo,
          value: item.batchNo,
        };
      });

    return (
        <div>
            <Formik
                initialValues={{ customerInfo: fields }}
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
                                            name={`customerInfo[${index}].suppliesId`}
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
                                            name={`customerInfo[${index}].suppliesFullName`}
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
                                            name={`customerInfo[${index}].batchNo`}
                                            // options={["PassPort", "ID Card"]}
                                            options={Array.isArray(batchData) ? batchData : []}
                                            // value={values.included}
                                            component={SelectComponent}
                                            isColumn
                                            inlineLabel
                                            style={{ flexBasis: "80%" }}
                                        />
                                    </div>

                                    {fields.length > 1 && (
                                        <div className="w-4 mt-[1.5rem]">
                                            <CloseIcon onClick={() => removeField(index)} />
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
    batchNo:suppliers.batchNo,
    token: auth.token,
    organizationId: auth.userDetails.organizationId,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({ addRecallData,getBatchNo }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(NewRecallListStep1);

