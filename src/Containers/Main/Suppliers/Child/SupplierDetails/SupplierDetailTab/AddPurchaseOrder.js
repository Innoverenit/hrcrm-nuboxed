import { Field, Form, Formik } from 'formik'
import React, { useEffect, Suspense,useState } from 'react'
import { InputComponent } from '../../../../../../Components/Forms/Formik/InputComponent';
import { Button,Select } from 'antd';
import { linkPurchaseToSuppliers, getSuppliesListBySupplier,getSupplierwiseQuality } from "../../../SuppliersAction"
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AddedSuppliesTable from './AddedSuppliesTable';
import * as Yup from "yup";
import { BundleLoader } from '../../../../../../Components/Placeholder';
const { Option } = Select;
const FormSchema = Yup.object().shape({
    suppliesId: Yup.string().required("Input needed!"),
    unit: Yup.string().required("Input needed!"),
})

const AddPurchaseOrder = (props) => {
    const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [material, setMaterial] = useState("");
    const [quality, setQuality] = useState("")
    useEffect(() => {
        const fetchMenuTranslations = async () => {
          try {
            setLoading(true); 
            const itemsToTranslate = [
       
          "798",  // " linked Material",//0
             "654",   // "Quality",//1
              "260",  // "Units",//2
              "14",  // "Category",//3
               "1154", // "Sub Category",//5
               "259", // "Attribute",//5
                "263",// "Sub Attribute",//6
               "154", // "Submit",//7
                
    
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
                        orgId: props.orgId,
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
                                    <div className='font-bold font-poppins text-xs'> 
                                        {/* {translatedMenuItems[0]}  */}
                                        Tagged Material
                                        </div>
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
                                      
                                    </div>
                                    <div class="w-w48  max-sm:w-wk">
                      <div className=' font-bold font-poppins text-xs mt-1'> {translatedMenuItems[1]} </div>
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
                                        <div class="  font-bold font-poppins text-xs mt-1"> {translatedMenuItems[2]} </div>
                                        <Field
                                            name="unit"
                                        
                                            // Units"
                                       
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
                                        <div class=" text-xs font-poppins font-bold"> {translatedMenuItems[3]} </div>
                                            <Field
                                                name="categoryName"
                                                // Category"
                                             
                                                disabled
                                                isColumn
                                                inlineLabel
                                                width={"100%"}
                                                component={InputComponent}
                                            />
                                        </div>
                                        <div class="w-[47.5%]">
                                        <div class=" text-xs font-poppins font-bold"> {translatedMenuItems[4]} </div>
                                            <Field
                                                name="subCategoryName"
                                         //Sub Category"
                                             
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
                                        <div class=" text-xs font-poppins font-bold"> {translatedMenuItems[5]} </div>
                                            <Field
                                                name="attributeName"
                                           //"Attribute"
                                           
                                                disabled
                                                isColumn
                                                inlineLabel
                                                width={"100%"}
                                                component={InputComponent}
                                            />
                                        </div>
                                        <div class="w-[47.5%]">
                                        <div class=" text-xs font-poppins font-bold"> {translatedMenuItems[6]} </div>
                                            <Field
                                                name="subAttributeName"
                                         // Sub Attribute"
                                           
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
                                              {translatedMenuItems[7]}
                                              {/* Submit */}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>}
            <Suspense fallback={"Loading"}>
                <AddedSuppliesTable
                      translateText={props.translateText}
                      selectedLanguage={props.selectedLanguage}
                />
            </Suspense>
        </>
    )
}
const mapStateToProps = ({ suppliers, auth }) => ({
    userId: auth.userDetails.userId,
    orgId:auth.userDetails.organizationId,
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


