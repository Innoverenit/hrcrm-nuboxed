import React, { Component } from "react";
import axios from "axios";
import { get } from "lodash";
import { base_url } from "../../../Config/Auth";
import {  StyledAsync } from "../../UI/Elements";
import { FlexContainer } from "../../UI/Layout";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {setClearbitPurchaseData} from "../../../Containers/Main/Suppliers/SuppliersAction"

class PurchaseClearbit extends Component {
  loadOptions = (value) => {
    if (!value) {
      return Promise.resolve([]);
    }
    const url = `${base_url}/supplies/suppliesName/${value}`;
    return axios
      .get(url, {})
      .then((res) => {
        return res.data.map((opt) => ({
          label: opt.suppliesFullName,
          value: opt.suppliesFullName,
          suppliesId: opt.suppliesId,
          suppliesFullName: opt.suppliesFullName,
          categoryName: opt.categoryName,
          imageId: opt.imageId,
          subCategoryName: opt.subCategoryName,
          attributeName: opt.attributeName,
          subAttributeName: opt.subAttributeName,
          manufactureId: opt.manufactureId,
          articleNo: opt.articleNo,
          name: opt.name,
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
    this.props.form.setFieldValue("manufactureId", option.manufactureId);
    this.props.form.setFieldValue("suppliesFullName", option.suppliesFullName);
    this.props.form.setFieldValue("name", option.name);
    this.props.form.setFieldValue("articleNo", option.articleNo);

    this.props.setClearbitPurchaseData(option);
  };

  handleBlur = (option) => {
    this.props.form.setFieldValue("label", true);
  };

  render() {
    const {
      label,
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
          <div class=" text-xs font-bold font-poppins" style={{ flexBasis: "20%", marginTop: "-55px", marginRight: "-66px" }}>{label}</div>
          <StyledAsync
            formatCreateLabel={() => undefined}
            isRequired={isRequired}
            classNamePrefix="sales"
            placeholder={placeholder}
            cacheOptions
            loadOptions={this.loadOptions}
            defaultOptions
            onInputChange={this.handleInputChange}
            onBlur={this.handleBlur}
            onChange={(option) => this.handleOnChange(option)}
            styles={{ width: 600 }}

          // components={this.renderOptions}
          />

          {get(touched, field.name) && get(errors, field.name) && (
            <div className=" flex text-[tomato] font-bold !text-lm px-1">{get(errors, field.name)}</div>
          )}
        </>
      );
    }
    if (isColumn) {
      return (
        <>
          <div class=" text-xs font-bold font-poppins" style={{ flexBasis: "20%", marginTop: "-55px", marginRight: "-66px" }}>{label}</div>
          <StyledAsync
            isRequired={isRequired}
            classNamePrefix="sales"
            placeholder={placeholder}
            cacheOptions
            loadOptions={this.loadOptions}
            defaultOptions
            onInputChange={this.handleInputChange}
            onBlur={this.handleBlur}
            onChange={(option) => this.handleOnChange(option)}
            styles={{ width: 600 }}

          // components={this.renderOptions}
          />

          {get(touched, field.name) && get(errors, field.name) && (
            <div className=" flex text-[tomato] font-bold !text-lm px-1">{get(errors, field.name)}</div>
          )}
        </>
      );
    }
    return (
      <>
        <FlexContainer>
          <FlexContainer alignItems="center" flexWrap={inlineLabel && "nowrap"}>
            <div class=" text-xs font-bold font-poppins" style={{ flexBasis: "20%", marginTop: "-55px", marginRight: "-66px" }}>{label}</div>
            <StyledAsync
              isRequired={isRequired}
              classNamePrefix="sales"
              placeholder={placeholder}
              cacheOptions
              loadOptions={this.loadOptions}
              defaultOptions
              onInputChange={this.handleInputChange}
              onBlur={this.handleBlur}
              onChange={(option) => this.handleOnChange(option)}
              styles={{ width: 600 }}

            // components={this.renderOptions}
            />
          </FlexContainer>
        </FlexContainer>
        {get(touched, field.name) && get(errors, field.name) && (
          <div className=" flex text-[tomato] font-bold !text-lm px-1">{get(errors, field.name)}</div>
        )}
      </>
    );
  }
}

const mapStateToProps = ({ auth, customer }) => ({
  user: auth.userDetails,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setClearbitPurchaseData,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(PurchaseClearbit);
