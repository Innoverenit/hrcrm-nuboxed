import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button,Select } from "antd";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { addSupplies } from "../../../../../Supplies/SuppliesAction";
import LazySelect from "../../../../../../../Components/Forms/Formik/LazySelect";
import { base_url2 } from "../../../../../../../Config/Auth";

const { Option } = Select;
const SuppliesSchema = Yup.object().shape({
  name: Yup.string().required("Input needed!"),
  categoryName: Yup.string().required("Input needed!"),
  // hsn: Yup.string().required("Input needed!"),
});
class NewSupploesForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      translatedMenuItems: [],
    };
  }
  componentDidMount() {
    this.props.getCurrency()
  }


  componentDidMount() {
    this.fetchMenuTranslations();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selectedLanguage !== this.props.selectedLanguage) {
      this.fetchMenuTranslations();
    }
  }

  fetchMenuTranslations = async () => {
    try {
      const itemsToTranslate = [
        "14",//0 
        "1154",//1
        "259",//2
        "263",//3
        "110",//4
        "799",//5
        "815",//6
        "816",//7
        "817",//8
        "818",//9
        "147",//10
        "104",//11
        "818",//Weight
        "1242",//Length
        "1243",//Width
        "1244",//Height
       "1275" // Availability date

      ];

      const translations = await this.props.translateText(itemsToTranslate, this.props.selectedLanguage);
      this.setState({ translatedMenuItems: translations });
    } catch (error) {
      console.error('Error translating menu items:', error);
    }
  };
  convertToUTC = (localDateTime) => {
    if (!localDateTime) return null;
    const localDate = new Date(localDateTime);
    const utcDate = new Date(localDate.toUTCString());
    return utcDate.toISOString(); // Format as 2024-07-31T18:30:00.000Z
  };
  render() {
    const currencyType = this.props.currencies.map((item) => {
      return {
        label: item.currency_name || "",
        value: item.currency_name,
      };
    })
    const uomType = this.props.UOMListData.map((item) => {
      return {
        label: item.unitName || "",
        value: item.unitName,
      };
    })
    return (
      <>
        <Formik
          initialValues={{
            attribute: "",
            attributeName: "",
            category: "",
            categoryName: "",
            description: "",
            imageId: "",
            uom:"",
            name: "",
            wtUom:"",
            volUom:"",
            hsn: "",
            subAttribute: "",
            subAttributeName: "",
            subCategory: "",
            subCategoryName: "",
            price: 0,
            tax: 0,
            fifoInd:false,
            userId: this.props.userId,
            currencyName: "",
            availabilityDate: "",
            weight: "",
            width: "",
             length:"",
              height: "",
              volume:"",
              innerHeight:"",
              innerWeight:"",
              innerLength:"",
              innerWidth:"",
              innerVolume:"",
              masterHeight:"",
              masterWeight:"",
              masterLength:"",
              masterWidth:"",
              masterVolume:"",
              shopify:"",
              seoTitle:"",
              seoDescription:"",
              tag:"",
              msku:"",
          }}
          validationSchema={SuppliesSchema}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            this.props.addSupplies(
              {
                ...values,
                
                fifoInd: values.fifoInd ? true : false,
                availabilityDate: this.convertToUTC(values.availabilityDate),
              },
            );
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
            <div class="w-[30%] box-content p-2 border-blue border-4">
            <Form class="form-background h-[24vh]">
              <div class="flex justify-between">
                <div class="h-full w-[100%]">
                  
                  <div class=" mt-2 font-bold text-xs font-poppins text-black">Name</div>
                  <Field
                    isRequired
                    name="categoryName"
                    //label="Category"
                    placeholder="Start typing to search or create..."
                    optionLabel="categoryName"
                    optionValue="categoryName"
                    url={`${base_url2}/supplies/category`}
                    component={LazySelect}
                    isColumn
                    inlineLabel
                    style={{ flexBasis: "80%" }}
                  />
                   
                   <div>
                <div class="font-bold text-xs font-poppins text-black">Category</div>
                <div className="w-[9rem]">
                  <Select
                    style={{ width: 200 }}
                    //value={row.category}
                   // onChange={(value) => handleCategoryChange(value, index)}
                  >
                    {/* {props.categoryList.map((a) => (
                      <Option key={a.id} value={a.categoryId}>{a.categoryName}</Option>
                    ))} */}
                  </Select>
                </div>
              </div>
                  
              <div>
                <div class="font-bold text-xs mt-1 font-poppins text-black">Brand</div>
                <div className="w-[9rem]">
                  <Select
                    style={{ width: 200 }}
                    //value={row.category}
                   // onChange={(value) => handleCategoryChange(value, index)}
                  >
                    {/* {props.categoryList.map((a) => (
                      <Option key={a.id} value={a.categoryId}>{a.categoryName}</Option>
                    ))} */}
                  </Select>
                </div>
              </div>
             
                </div>
               
              </div>
              {/* <div class="flex  mt-3">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={this.props.addingPurchase}
                >
                
                  <div class="font-bold text-xs font-poppins text-black">Add</div>
                </Button>
              </div> */}
            </Form>
            </div>
          )}
        </Formik>
      </>
    );
  }
}

const mapStateToProps = ({ auth, supplies,settings }) => ({
  addingPurchase: supplies.addingPurchase,
  groupId: auth.userDetails.groupId,
  userId: auth.userDetails.userId,
  currencies: auth.currencies,
  orgId: auth.userDetails.organizationId,
  UOMListData:settings.UOMListData,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addSupplies,
   
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(NewSupploesForm);
