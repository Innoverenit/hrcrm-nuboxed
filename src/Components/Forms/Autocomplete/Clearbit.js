import React, { Component } from "react";
import axios from "axios";
import { get } from "lodash";
import { ValidationError,  StyledAsync } from "../../UI/Elements";
import { message } from "antd";
const CustomOption = (data) => (
  <div>
    <p>{data.label}</p>
    <p>{data.website}</p>
  </div>
);
class Clearbit extends Component {
  loadOptions = (value) => {
    if (!value) {
      return Promise.resolve([]);
    }
    const url = `https://autocomplete.clearbit.com/v1/companies/suggest?query=${value}`;
    return axios
      .get(url)
      .then((res) => {
        return res.data.map((opt) => ({
          label: opt.name,
          value: opt.name,
          website: opt.domain,
          url: opt.domain,
          logo: opt.logo,
        }));
      })
      .catch((err) => console.log(err));
  };

  handleInputChange = (e) => e;

  handleOnChange = (option) => {
    let accountExists = false;
    let partnerExists = false;
    let leadExists = false;
    const { accounts, partners, leadsAccounts } = this.props;
    debugger;
    if (accounts) {
      if (!accounts) return;

      accounts.forEach((account) => {
        if (account.accountName === option.value) {
          accountExists = true;
        }
      });
      this.handleBlur();
    }
    if (partners) {
      if (!partners) return;

      partners.forEach((partner) => {
        if (partner.partnerName === option.value) {
          partnerExists = true;
        }
      });
    }
    if (leadsAccounts) {
      debugger;
      if (!leadsAccounts) return;

      leadsAccounts.forEach((lead) => {
        if (lead.accountName === option.value) {
          leadExists = true;
        }
      });
    }

    if (accounts) {
      if (accountExists) {
        // alert('acount already exist')
        message.error("Customer already exists");
        this.props.form.setFieldValue("accountName", "");
        this.props.form.setFieldValue("website", "");
        this.props.form.setFieldValue("imageURL", "");
        this.props.setClearbitData(null);
      } else {
        this.props.form.setFieldValue("accountName", option.value);
        this.props.form.setFieldValue("website", option.website);
        this.props.form.setFieldValue("imageURL", option.logo);
        this.props.setClearbitData(option);
      }
    }
    if (partners) {
      if (partnerExists) {
        // alert('acount already exist')
        message.error("Partner already exists");
        this.props.form.setFieldValue("partnerName", "");
        this.props.form.setFieldValue("url", "");
        this.props.form.setFieldValue("imageURL", "");
        this.props.setClearbitData(null);
      } else {
        this.props.form.setFieldValue("partnerName", option.value);
        this.props.form.setFieldValue("url", option.url);
        this.props.form.setFieldValue("imageURL", option.logo);
        this.props.setClearbitData(option);
      }
    }
    if (leadsAccounts) {
      debugger;
      if (leadExists) {
        // alert('acount already exist')
        message.error("Customer already exists");
        this.props.form.setFieldValue("accountName", "");
        this.props.form.setFieldValue("website", "");
        this.props.form.setFieldValue("imageURL", "");
        this.props.setClearbitData(null);
      } else {
        debugger;
        this.props.form.setFieldValue("accountName", option.value);
        this.props.form.setFieldValue("website", option.website);
        this.props.form.setFieldValue("imageURL", option.logo);
        this.props.setClearbitData(option);
      }
    }
  };
  handleBlur = (option) => {
    this.props.form.setFieldTouched("accountName", true);
    this.props.form.setFieldTouched("website", true);
    this.props.form.setFieldTouched("imageURL", true);
  };

  render() {
    const {
      label,
      placeholder,
      isRequired,
      inlineLabel,
      isColumn,
      form: { touched, errors, setFieldValue, setFieldTouched },
      field,
      ...rest
    } = this.props;
    if (isColumn) {
      return (
        <>
          <div class=" text-xs font-bold font-poppins" style={{ flexBasis: "20%" }}>{label}</div>
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
            <ValidationError>{get(errors, field.name)}</ValidationError>
          )}
        </>
      );
    }
    return (
      <>
      <div class=" flex flex-row flex-wrap items-start self-start justify-start grow shrink h-auto mr-auto ">
      <div class=" flex flex-row flex-wrap items-center self-start justify-start grow shrink h-auto mr-auto ">
            <div class=" text-xs font-bold font-poppins" style={{ flexBasis: "20%" }}>{label}</div>
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
          </div>
        </div>
        {get(touched, field.name) && get(errors, field.name) && (
          <ValidationError>{get(errors, field.name)}</ValidationError>
        )}
      </>
    );
  }
}

export default Clearbit;
