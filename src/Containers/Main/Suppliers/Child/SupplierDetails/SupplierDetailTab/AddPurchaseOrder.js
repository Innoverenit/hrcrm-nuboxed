import { Field, Form, Formik } from 'formik'
import React, { useEffect, Suspense } from 'react'
import { SelectComponent } from '../../../../../../Components/Forms/Formik/SelectComponent';
import { InputComponent } from '../../../../../../Components/Forms/Formik/InputComponent';
import { Button } from 'antd';
import { linkPurchaseToSuppliers, getSuppliesListBySupplier } from "../../../SuppliersAction"
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import AddedSuppliesTable from './AddedSuppliesTable';
import * as Yup from "yup";
import { BundleLoader } from '../../../../../../Components/Placeholder';

const FormSchema = Yup.object().shape({
    suppliesId: Yup.string().required("Input needed!"),
    unit: Yup.string().required("Input needed!"),
})

const AddPurchaseOrder = (props) => {
    useEffect(() => {
        props.getSuppliesListBySupplier(props.supplier.supplierId)
    }, [])
    console.log(props.purchaseList)
    const materialOption = props.suppliesBySupplier.length && props.suppliesBySupplier
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
                label: item.suppliesName,
                value: item.suppliesId
            }
        })

    function handleProductList(a, setFieldValue) {
        return props.suppliesBySupplier.map((item) => {
            if (item.suppliesId === a) {
                setFieldValue("suppliesId", item.suppliesId);
                setFieldValue("suppliesName", item.suppliesName);
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
            {props.fetchingSuppliesListById ?
                <BundleLoader />
                : <Formik
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
                    validationSchema={FormSchema}
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
                            <div class="flex w-wk">
                                <div class=" flex flex-col w-wk">
                                    <div class="w-[47.5%]">
                                        <Field
                                            name="suppliesId"
                                            label={<FormattedMessage
                                                id="app.material"
                                                defaultMessage="Materials"
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
                                    <div class="w-[47.5%]">
                                        <Field
                                            name="unit"
                                            label={<FormattedMessage
                                                id="app.units"
                                                defaultMessage="Units"
                                            />}
                                            isRequired
                                            isColumn
                                            inlineLabel
                                            width={"100%"}
                                            component={InputComponent}
                                        />
                                    </div>

                                </div>

                                <div class=" flex flex-col w-wk">
                                    <div class="flex w-wk justify-between">
                                        <div class="w-[47.5%]">
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
                                        <div class="w-[47.5%]">
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
                                    <div class="flex w-wk justify-between">
                                        <div class="w-[47.5%]">
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
                                        <div class="w-[47.5%]">
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
                                    </div>
                                    <div class="w-[15%] mt-4">
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
                            </div>
                        </Form>
                    )}
                </Formik>}
            <Suspense fallback={"Loading"}>
                <AddedSuppliesTable />
            </Suspense>
        </>
    )
}
const mapStateToProps = ({ suppliers, auth }) => ({
    userId: auth.userDetails.userId,
    suppliesBySupplier: suppliers.suppliesBySupplier,
    poSupplierDetailsId: suppliers.pOSupplierDetailsId,
    addingPurchaseSuppliers: suppliers.addingPurchaseSuppliers,
    fetchingSuppliesListById: suppliers.fetchingSuppliesListById
});
const mapDispatchToProps = dispatch => bindActionCreators({
    linkPurchaseToSuppliers,
    getSuppliesListBySupplier
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AddPurchaseOrder);


