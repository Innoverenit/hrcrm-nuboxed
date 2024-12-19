import React, { Component } from "react";
import AsyncSelect from "react-select/lib/Async";
import PropTypes from "prop-types";
import axios from "axios";
import { get } from "lodash";
import { FlexContainer } from "../../UI/Layout";
import {   StyledAsync } from "../../UI/Elements";

class LazySelect extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
  }
  loadOptions = value => {
    if (!value) {
      return Promise.resolve([]);
    }
    return axios
      .get(`${this.props.url}/${value}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token")
        }
      })
      .then(res => {
        console.log(res.data);
        return res.data.map(opt => ({
          label: opt[this.props.optionLabel],
          value: opt[this.props.optionValue]
        }));
      })
      .catch(err => console.log(err));
  };
  handleBlur = () => {
    // this is going to call setFieldTouched and manually update touched.topcis
    this.props.onBlur(this.props.field.name, true);
  };

  handleInputChange = e => e;
  handleOnChange = value =>
    this.props.form.setFieldValue(this.props.field.name, value.value);
  render() {
    const {
      label,
      placeholder,
      isRequired,
      defaultValue,
      isColumn,
      inlineLabel,
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
            defaultValue={defaultValue}
            // defaultOptions
            // onInputChange={this.handleInputChange}
            // onBlur={this.handleBlur}
            onChange={option => this.handleOnChange(option)}
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
            <div class=" text-xs font-bold font-poppins" style={{ flexBasis: "20%" }}>{label}</div>
            <StyledAsync
              isRequired={isRequired}
              classNamePrefix="sales"
              placeholder={placeholder}
              cacheOptions
              loadOptions={this.loadOptions}
              defaultValue={defaultValue}
              // defaultOptions
              // onInputChange={this.handleInputChange}
              // onBlur={this.handleBlur}
              onChange={option => this.handleOnChange(option)}
              styles={{ width: 600 }}
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
LazySelect.propTypes = {
  url: PropTypes.string,
  optionLabel: PropTypes.string,
  optionValue: PropTypes.func
};
export default LazySelect;
