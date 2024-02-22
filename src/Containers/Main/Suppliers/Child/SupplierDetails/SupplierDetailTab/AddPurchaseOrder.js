import { Field, Form, Formik } from 'formik'
import React, { useEffect, lazy, Suspense } from 'react'
import { SelectComponent } from '../../../../../../Components/Forms/Formik/SelectComponent';
import { InputComponent } from '../../../../../../Components/Forms/Formik/InputComponent';
import { Button } from 'antd';
import { linkPurchaseToSuppliers } from "../../../SuppliersAction"
import { getSuppliesList } from "../../../../Supplies/SuppliesAction"
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import AddedSuppliesTable from './AddedSuppliesTable';


const AddPurchaseOrder = (props) => {
    useEffect(() => {
        props.getSuppliesList()
    }, [])
    console.log(props.purchaseList)
    const materialOption = props.purchaseList.length && props.purchaseList
        .sort(function (a, b) {
            var nameA = a.name; // ignore upper and lowercase
            var nameB = b.name; // ignore upper and lowercase
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            // names must be equal
            return 0;
        })
        .map((item) => {
            return {
                label: item.name,
                value: item.suppliesId
            }
        })

    function handleProductList(a, setFieldValue) {
        return props.purchaseList.map((item) => {
            if (item.suppliesId === a) {
                setFieldValue("suppliesId", item.suppliesId);
                setFieldValue("name", item.name);
                setFieldValue("imageId", item.imageId);
                setFieldValue("categoryName", item.categoryName);
                setFieldValue("subCategoryName", item.subCategoryName);
                setFieldValue("attributeName", item.attributeName);
                setFieldValue("subAttributeName", item.subAttributeName)
            }
        });
    }
    return (
        <>
            <Formik
                enableReinitialize
                initialValues={{
                    suppliesId: "",
                    unit: "",
                    categoryName: "",
                    subCategoryName: "",
                    attributeName: "",
                    subAttributeName: "",
                    supplierId: props.supplier.supplierId,
                    poSupplierDetailsId: props.poSupplierDetailsId || "",
                    userId: props.userId,
                }}

                onSubmit={(values, { resetForm }) => {
                    console.log(values)
                    props.linkPurchaseToSuppliers(
                        {
                            ...values,
                        },
                        props.supplier.supplierId
                    );
                    resetForm();
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
                    <Form>
                        <div class="justify-between flex">
                            <div class="w-[33%]">
                                <Field
                                    name="suppliesId"
                                    label={<FormattedMessage
                                        id="app.items"
                                        defaultMessage="Items"
                                    />}
                                    isRequired
                                    isColumn
                                    inlineLabel
                                    width={"100%"}
                                    component={SelectComponent}
                                    onSelect={(e) => {
                                        console.log(e);
                                        handleProductList(e, setFieldValue);
                                    }}
                                    options={Array.isArray(materialOption) ? materialOption : []}
                                    style={{
                                        borderRight: "0.18em solid red",
                                    }}
                                />
                            </div>
                            <div class="w-[30%]">
                                <Field
                                    name="categoryName"
                                    label={<FormattedMessage
                                        id="app.category"
                                        defaultMessage="Category"
                                    />}
                                    disabled
                                    isColumn
                                    inlineLabel
                                    width={"100%"}
                                    component={InputComponent}
                                />
                            </div>
                            <div class="w-[30%]">
                                <Field
                                    name="subCategoryName"
                                    label={<FormattedMessage
                                        id="app.subcategory"
                                        defaultMessage="Sub Category"
                                    />}
                                    disabled
                                    isColumn
                                    inlineLabel
                                    width={"100%"}
                                    component={InputComponent}
                                />
                            </div>
                        </div>
                        <div class="justify-between flex">
                            <div class="w-[27%]">
                                <Field
                                    name="attributeName"
                                    label={<FormattedMessage
                                        id="app.attribute"
                                        defaultMessage="Attribute"
                                    />}
                                    disabled
                                    isColumn
                                    inlineLabel
                                    width={"100%"}
                                    component={InputComponent}
                                />
                            </div>
                            <div class="w-[27%]">
                                <Field
                                    name="subAttributeName"
                                    label={<FormattedMessage
                                        id="app.subattribute"
                                        defaultMessage="Sub Attribute"
                                    />}
                                    disabled
                                    isColumn
                                    inlineLabel
                                    width={"100%"}
                                    component={InputComponent}
                                />
                            </div>
                            <div class="w-[27%]">
                                <Field
                                    name="unit"
                                    label={<FormattedMessage
                                        id="app.unit"
                                        defaultMessage="Unit"
                                    />}
                                    isRequired
                                    isColumn
                                    inlineLabel
                                    width={"100%"}
                                    component={InputComponent}
                                />
                            </div>
                            <div class="w-[27%] mt-4">
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    loading={props.addingPurchaseSuppliers}
                                >
                                    <FormattedMessage
                                        id="app.submit"
                                        defaultMessage="Submit"
                                    />
                                </Button>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
            <Suspense fallback={"Loading"}>
                <AddedSuppliesTable />
            </Suspense>
        </>
    )
}
const mapStateToProps = ({ suppliers, auth, supplies }) => ({
    userId: auth.userDetails.userId,
    purchaseList: supplies.purchaseList,
    poSupplierDetailsId: suppliers.pOSupplierDetailsId,
    addingPurchaseSuppliers: suppliers.addingPurchaseSuppliers
});
const mapDispatchToProps = dispatch => bindActionCreators({
    linkPurchaseToSuppliers,
    getSuppliesList
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AddPurchaseOrder);


