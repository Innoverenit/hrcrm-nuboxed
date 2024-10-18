import { Field, Form, Formik } from 'formik'
import React, { useState,useEffect, lazy, Suspense } from 'react'
import { SelectComponent } from '../../../../../Components/Forms/Formik/SelectComponent';
import { InputComponent } from '../../../../../Components/Forms/Formik/InputComponent';
import { Button, Input, Select } from 'antd';
import {getProducts} from "../../../../Product/ProductAction";
import { getAllProductList, saveUnitForCatalogueItem,getBrand, getModel, } from "../../AccountAction"
import { bindActionCreators } from 'redux';
import {getCategorylist} from "../../../Suppliers/SuppliersAction";
import * as Yup from "yup";
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { BundleLoader } from '../../../../../Components/Placeholder';

const AddCatalogueTable = lazy(() => import("./AddCatalogueTable"));
const { Option } = Select;

const FormSchema = Yup.object().shape({
    quantity: Yup.string().required("Input needed!"),
})

const AddCatalogueForm = (props) => {
  useEffect(() => {
      props.getProducts("0");
  }, [])

  const catalogueOption = props.products.length && props.products
      .sort(function (a, b) {
          var nameA = a.projectName; // ignore upper and lowercase
          var nameB = b.projectName; // ignore upper and lowercase
          if (nameA < nameB) {
              return -1;
          }
          if (nameA > nameB) {
              return 1;
          }
          // names must be equal
          return 0;
      }).map((item) => {
          return {
              label: item.productFullName,
              value: item.productId
          }
      })

  function handleProductList(a, setFieldValue) {
      return props.products.map((item) => {
          if (item.productId === a) {
              setFieldValue("productId", item.productId);
              setFieldValue("name", item.name);
              setFieldValue("categoryName", item.categoryName);
              setFieldValue("subCategoryName", item.subCategoryName);
              setFieldValue("attributeName", item.attributeName);
              setFieldValue("subAttributeName", item.subAttributeName)
          }
      });
  }
  return (
      <>
          {props.fetchingAllProductList ? <BundleLoader /> :
              <>
                  <Formik
                      enableReinitialize
                      initialValues={{
                          type: "Catalogue",
                          productId: "",
                          quantity: "",
                          productName: "",
                          categoryName: "",
                          subCategoryName: "",
                          attributeName: "",
                          subAttributeName: "",
                          distributorDiscountSubType: "amount",
                          marginType: "amount",
                          distributorDiscountType: "cash",
                          orderId: props.productionOrderId.orderId 
                      }}
                      validationSchema={FormSchema}
                      onSubmit={(values, { resetForm }) => {
                          console.log(values)
                          props.saveUnitForCatalogueItem(
                              {
                                  ...values,
                                  distributorId: props.distributorId,
                                  orderId: props.productionOrderId.orderId,
                                  orgId: props.orgId
                              },
                              props.distributorId,
                              props.productionOrderId.orderId
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
                              <div class="justify-between flex mx-4">
                                  <div class="w-[33%]">
                                      <Field
                                          name="productId"
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
                                          options={Array.isArray(catalogueOption) ? catalogueOption : []}
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
                              <div class="justify-between flex mx-4">
                                  <div class="w-[25%]">
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
                                  <div class="w-[25%]">
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
                                  <div class="w-[25%]">
                                      <Field
                                          name="quantity"
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
                                  <div class="w-[15%] mt-4">
                                      <Button
                                          type="primary"
                                          htmlType="submit"
                                          loading={props.addingUnitForCatalogueItem}
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
                      <AddCatalogueTable
                          distributorId={props.distributorId}
                          orderId={props.productionOrderId.orderId}
                          toggle={props.toggle} />
                  </Suspense>
              </>
          }
      </>
  )
}



const mapStateToProps = ({ distributor,suppliers,product, auth }) => ({
    allProduct: distributor.allProduct,
    orgId: auth.userDetails.organizationId,
    productionOrderId: distributor.productionOrderId,
    fetchingAllProductList: distributor.fetchingAllProductList,
    addingUnitForCatalogueItem: distributor.addingUnitForCatalogueItem,
    categoryList:suppliers.categoryList,
    brand: distributor.brand,
    model: distributor.model,
    products:product.products
});
const mapDispatchToProps = dispatch => bindActionCreators({
  getProducts,
    saveUnitForCatalogueItem,
    getCategorylist,
    getBrand,
    getModel,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AddCatalogueForm);






