import React, { Component } from "react";
import axios from "axios";
import { get } from "lodash";
import { base_url } from "../../../Config/Auth";
import { ValidationError,  StyledAsync } from "../../UI/Elements";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setClearbitOrderData } from "../../../Containers/Main/Shipper/ShipperAction";

class OrderClearbit extends Component {
  loadOptions = (value) => {
    if (!value) {
      return Promise.resolve([]);
    }
    const url = `${base_url}/product/productName/${value}`;
    return axios
      .get(url, {})
      .then((res) => {
        return res.data.map((opt) => ({
          label: opt.productFullName,
          value: opt.productFullName,
          productId: opt.productId,
          productFullName: opt.productFullName,
          categoryName: opt.categoryName,
          imageId: opt.imageId,
          subCategoryName: opt.subCategoryName,
          attributeName: opt.attributeName,
          subAttributeName: opt.subAttributeName,
          price: opt.price,
          discountType: opt.discountType === "Cash" ? false : true,
          discountSubType: opt.discountSubType === "Percentage" ? false : true,
          tax: opt.tax,
          maxDiscount: opt.maxDiscount,
          name: opt.name,
          marginType: opt.marginType === "Percentage" ? false : true,
          consumerMarginType:
            opt.consumerMarginType === "Percentage" ? false : true,
          distributorDiscountSubType:
            opt.distributorDiscountSubType === "Percentage" ? false : true,
          distributorDiscountType:
            opt.distributorDiscountType === "Cash" ? false : true,
          consumerMaxMargin: opt.consumerMaxMargin,
          distributorMaxMargin: opt.distributorMaxMargin,
          distributorMaxDiscount: opt.distributorMaxDiscount,
          distributorOfferInd: opt.distributorOfferInd,
          offerInd: opt.offerInd,
          distributorOfferDetails: opt.distributorOfferDetails,
          offerDetails: opt.offerDetails,
          // allowedDiscount: opt.allowedDiscount,
        }));
      })
      .catch((err) => console.log(err));
  };
  // renderOptions = ({ data }) => (<div><p>----{data.website}</p></div>);
  handleInputChange = (e) => e;

  handleOnChange = (option) => {
    this.props.form.setFieldValue("label", option.value);
    this.props.form.setFieldValue("categoryName", option.categoryName);
    this.props.form.setFieldValue("subCategoryName", option.subCategoryName);
    this.props.form.setFieldValue("attributeName", option.attributeName);
    this.props.form.setFieldValue("subAttributeName", option.subAttributeName);
    this.props.form.setFieldValue("price", option.price);
    this.props.form.setFieldValue("productFullName", option.productFullName);
    this.props.form.setFieldValue("discountType", option.discountType);
    this.props.form.setFieldValue("tax", option.tax);
    this.props.form.setFieldValue("discountSubType", option.discountSubType);
    this.props.form.setFieldValue("maxDiscount", option.maxDiscount);
    this.props.form.setFieldValue("name", option.name);
    this.props.form.setFieldValue(
      "distributorMaxMargin",
      option.distributorMaxMargin
    );
    this.props.form.setFieldValue("marginType", option.marginType);
    this.props.form.setFieldValue(
      "consumerMarginType",
      option.consumerMarginType
    );
    this.props.form.setFieldValue(
      "consumerMaxMargin",
      option.consumerMaxMargin
    );
    this.props.form.setFieldValue(
      "distributorDiscountSubType",
      option.distributorDiscountSubType
    );
    this.props.form.setFieldValue(
      "distributorDiscountType",
      option.distributorDiscountType
    );
    this.props.form.setFieldValue(
      "distributorMaxDiscount",
      option.distributorMaxDiscount
    );
    this.props.form.setFieldValue(
      "distributorOfferInd",
      option.distributorOfferInd
    );
    this.props.form.setFieldValue("offerInd", option.offerInd);
    this.props.form.setFieldValue(
      "distributorOfferDetails",
      option.distributorOfferDetails
    );
    this.props.form.setFieldValue("offerDetails", option.offerDetails);
    this.props.setClearbitOrderData(option);
  };

  handleBlur = (option) => {
    this.props.form.setFieldValue("productFullName", true);
  };

  render() {
    const {
      label,
      value,
      placeholder,
      isRequired,
      inlineLabel,
      isColumn,
      isColumnWithoutNoCreate,
      form: { touched, errors, setFieldValue, setFieldTouched },
      field,
      ...rest
    } = this.props;
    if (isColumnWithoutNoCreate) {
      return (
        <>
          <div class=" text-xs font-bold font-poppins
            style={{
              flexBasis: "20%",
              marginTop: "-49px",
              marginRight: "-48px",
            }}
          >
            {label}
          </div>
          <StyledAsync
            isRequired={isRequired}
            backspaceRemoveValue
            formatCreateLabel={() => undefined}
            classNamePrefix="sales"
            placeholder={placeholder}
            cacheOptions
            loadOptions={this.loadOptions}
            // defaultOptions
            // value={(option) => option.productFullName}
            defaultInputValue={value}
            onInputChange={this.handleInputChange}
            onBlur={this.handleBlur}
            onChange={(option) => this.handleOnChange(option)}
            styles={{ width: 600 }}

            // components={this.renderOptions}
          />

          {get(touched, field.name) && get(errors, field.name) && (
            <ValidationError>{get(errors, field.name)}</ValidationError>
          )}
        </>
      );
    }
    if (isColumn) {
      return (
        <>
          <div class=" text-xs font-bold font-poppins
            style={{
              flexBasis: "20%",
              marginTop: "-49px",
              marginRight: "-48px",
            }}
          >
            {label}
          </div>
          <StyledAsync
            isRequired={isRequired}
            classNamePrefix="sales"
            placeholder={placeholder}
            cacheOptions
            backspaceRemoveValue
            // value={(option) => option.productFullName}
            loadOptions={this.loadOptions}
            defaultInputValue={value}
            // defaultOptions
            onInputChange={this.handleInputChange}
            onBlur={this.handleBlur}
            onChange={(option) => this.handleOnChange(option)}
            styles={{ width: 600 }}

            // components={this.renderOptions}
          />

          {get(touched, field.name) && get(errors, field.name) && (
            <ValidationError>{get(errors, field.name)}</ValidationError>
          )}
        </>
      );
    }
    return (
      <>
      <div class=" flex flex-row flex-wrap items-start self-start justify-start grow shrink h-auto mr-auto ">
      <div class=" flex flex-row flex-wrap items-center self-start justify-start grow shrink h-auto mr-auto ">
            <div class=" text-xs font-bold font-poppins
              style={{
                flexBasis: "20%",
                marginTop: "-49px",
                marginRight: "-48px",
              }}
            >
              {label}
            </div>
            <StyledAsync
              isRequired={isRequired}
              classNamePrefix="sales"
              placeholder={placeholder}
              cacheOptions
              backspaceRemoveValue
              loadOptions={this.loadOptions}
              // defaultOptions
              defaultInputValue={value}
              onInputChange={this.handleInputChange}
              onBlur={this.handleBlur}
              onChange={(option) => this.handleOnChange(option)}
              styles={{ width: 600 }}

              // components={this.renderOptions}
            />
          </div>
        </div>
        {get(touched, field.name) && get(errors, field.name) && (
          <ValidationError>{get(errors, field.name)}</ValidationError>
        )}
      </>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  user: auth.userDetails,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setClearbitOrderData,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(OrderClearbit);
