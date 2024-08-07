import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { StyledAsync } from "../../UI/Elements";

class EditLazySelect extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
  }
  loadOptions = (value) => {
    if (!value) {
      return Promise.resolve([]);
    }
    return axios
      .get(`${this.props.url}/${value}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res.data);
        return res.data.map((opt) => ({
          label: opt[this.props.optionLabel],
          value: opt[this.props.optionValue],
        }));
      })
      .catch((err) => console.log(err));
  };
  handleBlur = () => {
    // this is going to call setFieldTouched and manually update touched.topcis
    // this.props.onBlur(this.props.field.name, true);
  };

  handleInputChange = (e) => e;
  handleOnChange = (value) => {
    this.props.handleChange(this.props.name, value.value);
  };
  render() {
    ////debugger;
    const {
      label,
      placeholder,
      isRequired,
      defaultValue,
      inlineLabel,
      ...rest
    } = this.props;
    ////debugger;
    return (
      <>
       
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
          onChange={(option) => this.handleOnChange(option)}

          // components={this.renderOptions}
        />
     
      </>
    );
  }
}
EditLazySelect.propTypes = {
  url: PropTypes.string,
  optionLabel: PropTypes.string,
  optionValue: PropTypes.func,
};
export default EditLazySelect;
