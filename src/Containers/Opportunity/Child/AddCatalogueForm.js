import { Field, Form, Formik } from 'formik'
import React, { useEffect,useState, Suspense } from 'react'
import { InputComponent } from '../../../Components/Forms/Formik/InputComponent';
import { Button,Select,Input } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { BundleLoader } from '../../../Components/Placeholder';
import OppoProduLinkedCard from "./OppoProduLinkedCard";
// import {getCatalogueById,addCatalogueOnebyOne,getAllCatalogueSearch} from "../../CustomerAction";
import {linkProductWithOpportunity,getAllCatalogueSearch} from "../OpportunityAction";

const { Option } = Select;

const AddCatalogueForm = (props) => {
    useEffect(() => {
        // props.getCatalogueById(props.serviceId);
            }, [])

            const [searchTerm, setSearchTerm] = useState('');
            const [selectedItem, setSelectedItem] = useState(null);
            const [showList, setShowList] = useState(false);

const handleSearchChange = (value) => {
    setSearchTerm(value);
    if (value === '' && selectedItem) {
        setSelectedItem(null); 
    }
    setShowList(value !== ''); 
    props.getAllCatalogueSearch(value); 
};
    const handleSelectItem = (item) => {
        setSelectedItem(item);
        setSearchTerm(''); 
        setShowList(false); 
    };

    return (
        <>
          
                <>
                    <Formik
                    enableReinitialize
                      initialValues={{
                        opportunityId:props.addedOpportunity.opportunityId ? props.addedOpportunity.opportunityId:"",
                        productId:selectedItem ? selectedItem.productId : "",
                        unit: "",
                        inputPrice:"",
                        categoryName:selectedItem ? selectedItem.categoryName : "",
                        subCategoryName: selectedItem ? selectedItem.subCategoryName : "",
                        attributeName: selectedItem ? selectedItem.attributeName : "",
                        subAttributeName: selectedItem ? selectedItem.subAttributeName : "",
                    }}
                    // validationSchema={FormSchema}
                    onSubmit={(values, { resetForm }) => {
                        console.log(values)
                        props.linkProductWithOpportunity(
                            {
                                ...values,
                            },
                           
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
                                <div class="h-full w-[45%]">
                                <div class="w-wk">
                                        {/* <Field
                                            name="catalogueId"
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
                                                props.handleChooseCatalogue(e);
                                                handleProductList(e, setFieldValue);
                                            }}
                                            options={Array.isArray(catOption) ? catOption : []}
                                            value={props.catalogueId}
                                        /> */}
                                        <div class="font-medium m-[0.1rem-0-0.02rem-0.2rem]  flex flex-col"><FormattedMessage
                                                id="app.items"
                                                defaultMessage="Items"
                                            /></div>
                                        <Input
                                        style={{backgroundColor:"white",borderRadius:"2rem"}}
    type="text"
    value={searchTerm ? searchTerm : (selectedItem ? selectedItem.name : '')}
    onChange={(e) => handleSearchChange(e.target.value)} 
    onKeyDown={(e) => {
        if (e.key === 'Backspace') {
            setShowList(false); 
        }
    }}
/>

            {showList && props.searchedCatalogue && props.searchedCatalogue.length > 0 && (
                <ul class="bg-white cursor-pointer p-1 overflow-hidden absolute w-96 text-center text-sm font-medium">
                    {props.searchedCatalogue.map((item) => (
                        <li key={item.productId} onClick={() => handleSelectItem(item)}>
                            {item.name} 
                        </li>
                    ))}
                </ul>
            )}
                                       
                                    </div>
                                    <div class="w-wk">
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
                                    <div class="flex justify-between w-wk">
                                    <div class="w-[45%]">
                                        <Field
                                        name="suggestedPrice"
                                            disabled
                                            label={<FormattedMessage
                                                id="app.suggestedPrice"
                                                defaultMessage="Suggested Price"
                                            />}
                                            isColumn
                                            inlineLabel
                                            width={"100%"}
                                            component={InputComponent}
                                            // value={props.price}
                                            // onChange={props.handlePrice}

                                        />
                                    </div>
                                  
                                    <div class="w-[45%]">
                                        <Field
                                            name="inputPrice"
                                            label={<FormattedMessage
                                                id="app.inputprice"
                                                defaultMessage="Input Price"
                                            />}
                                            isRequired
                                            isColumn
                                            inlineLabel
                                            width={"100%"}
                                            component={InputComponent}

                                        />
                                    </div>
                                    </div>
                                    </div>
                                        
                                   <div class="h-full w-[45%]">
                                   
               <div class="flex justify-between w-wk">
                <div class="w-[45%]">
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
                                            // value={selectedCatalogue.categoryName || ''}
                                        />
                                    </div>          
                                    <div class="w-[45%]">
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
                                            // value={selectedCatalogue.subCategory || ''}
                                        />
                                    </div>
                                    </div>
                                    <div class="flex justify-between w-wk">
                <div class="w-[45%]">
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
                                            // value={selectedCatalogue.attribute || ''}
                                        />
                                    </div>
                                    <div class="w-[45%]">
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
                                            // value={selectedCatalogue.subAttribute || ''}
                                        />
                                    </div>
                                    </div>
                                    <div class="flex justify-between w-wk">
                <div class="w-[45%]">
                                        <Field
                                            name="brand"
                                            label={<FormattedMessage
                                                id="app.brand"
                                                defaultMessage="Brand"
                                            />}
                                            disabled
                                            isColumn
                                            inlineLabel
                                            width={"100%"}
                                            component={InputComponent}
                                            // value={selectedCatalogue.attribute || ''}
                                        />
                                    </div>
                                    <div class="w-[45%]">
                                        <Field
                                            name="model"
                                            label={<FormattedMessage
                                                id="app.model"
                                                defaultMessage="Model"
                                            />}
                                            disabled
                                            isColumn
                                            inlineLabel
                                            width={"100%"}
                                            component={InputComponent}
                                            // value={selectedCatalogue.subAttribute || ''}
                                        />
                                    </div>
                                    </div>
                                </div>
                               
                                </div>  
                                <div class="flex justify-end">
                                    <Button type="primary"
                                      htmlType="submit"
                                      loading={props.linkingProductOpportunity}
                                      >
                                        Submit
                                    </Button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                    <Suspense fallback={"Loading"}>
                        <OppoProduLinkedCard
                        addedOpportunity={props.addedOpportunity}
                        />
                    </Suspense>
                </>
            
        </>
    )
}
const mapStateToProps = ({ opportunity, auth }) => ({
    addedOpportunity: opportunity.addedOpportunity,
    // serviceId:auth.serviceDetails.serviceId,
    linkingProductOpportunity: opportunity.linkingProductOpportunity,
    // fetchingAllProductList: distributor.fetchingAllProductList,
    searchedCatalogue: opportunity.searchedCatalogue
});
const mapDispatchToProps = dispatch => bindActionCreators({
    // getCatalogueById,
    linkProductWithOpportunity,
    getAllCatalogueSearch
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AddCatalogueForm);