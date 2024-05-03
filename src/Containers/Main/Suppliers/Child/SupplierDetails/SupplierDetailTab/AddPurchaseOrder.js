import { Field, Form, Formik } from 'formik'
import React, { useEffect, Suspense,useState } from 'react'
import { SelectComponent } from '../../../../../../Components/Forms/Formik/SelectComponent';
import { InputComponent } from '../../../../../../Components/Forms/Formik/InputComponent';
import { Button,Select } from 'antd';
import { linkPurchaseToSuppliers, getSuppliesListBySupplier,getSupplierwiseQuality } from "../../../SuppliersAction"
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import AddedSuppliesTable from './AddedSuppliesTable';
import * as Yup from "yup";
import { BundleLoader } from '../../../../../../Components/Placeholder';
const { Option } = Select;
const FormSchema = Yup.object().shape({
    suppliesId: Yup.string().required("Input needed!"),
    unit: Yup.string().required("Input needed!"),
})

const AddPurchaseOrder = (props) => {

    const [material, setMaterial] = useState("");
    const [quality, setQuality] = useState("")
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

        const handleMaterial = async (val) => {
            setMaterial(val);
        
            await props.getSupplierwiseQuality(props.supplier.supplierId,val);
          
            setQuality(""); 
        };
          const handleQuality = (val) => {
            setQuality(val)
          }

    // function handleProductList(a, setFieldValue) {
    //     return props.suppliesBySupplier.map((item) => {
    //         if (item.suppliesId === a) {
    //             setFieldValue("suppliesId", item.suppliesId);
    //             setFieldValue("suppliesName", item.suppliesName);
    //             setFieldValue("imageId", item.imageId);
    //             setFieldValue("categoryName", item.categoryName);
    //             setFieldValue("subCategoryName", item.subCategoryName);
    //             setFieldValue("attributeName", item.attributeName);
    //             setFieldValue("subAttributeName", item.subAttributeName)
    //         }
    //     });
    // }
    const handleProductList = (selectedSuppliesId, setFieldValue) => {
        const selectedSupply = props.suppliesBySupplier.find((item) => item.suppliesId === selectedSuppliesId);
    
        if (selectedSupply) {
          setFieldValue('suppliesId', selectedSupply.suppliesId);
          setFieldValue('suppliesName', selectedSupply.suppliesName);
          setFieldValue('imageId', selectedSupply.imageId);
          setFieldValue('categoryName', selectedSupply.categoryName);
          setFieldValue('subCategoryName', selectedSupply.subCategoryName);
          setFieldValue('attributeName', selectedSupply.attributeName);
          setFieldValue('subAttributeName', selectedSupply.subAttributeName);
        }
      };
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
                                suppliesId:material,
                                quality:quality,
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
                                    <label style={{ color: "#444", fontWeight: "bold", fontSize: " 0.75rem" }}>Materials</label>
                      <Select
                        className="w-[250px]"
                        value={material}
                        onSelect={(value) => handleProductList(value, setFieldValue)}
                        onChange={(value) => handleMaterial(value)}
                      >
                        {props.suppliesBySupplier.map((a) => {
                          return <Option value={a.suppliesId}>{a.suppliesName}</Option>;
                        })}
                      </Select>
                                        {/* <Field
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
                                        />  */}
                                    </div>
                                    <div class="w-w48  max-sm:w-wk">
                      <label style={{ color: "#444", fontWeight: "bold", fontSize: " 0.75rem" }}>Quality</label>
                      <Select
                        className="w-[250px]"
                        value={quality}
                        onChange={(value) => handleQuality(value)}
                      >
                        {props.materialwiseQuality.map((a) => {
                          return <Option value={a.qualityId}>{a.code}</Option>;
                        })}
                      </Select>

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
                                    <div class="w-[95%] mt-4">
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
    materialwiseQuality:suppliers.materialwiseQuality,
    suppliesBySupplier: suppliers.suppliesBySupplier,
    poSupplierDetailsId: suppliers.pOSupplierDetailsId,
    addingPurchaseSuppliers: suppliers.addingPurchaseSuppliers,
    fetchingSuppliesListById: suppliers.fetchingSuppliesListById
});
const mapDispatchToProps = dispatch => bindActionCreators({
    linkPurchaseToSuppliers,
    getSuppliesListBySupplier,
    getSupplierwiseQuality
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AddPurchaseOrder);


