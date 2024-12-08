import React, { Component } from "react";
import axios from "axios";
import { get } from "lodash";
import { base_url } from "../../../Config/Auth";
import {   StyledAsync } from "../../UI/Elements";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setClearbitCandidateData } from "../../../Containers/Candidate/CandidateAction";

class OrderClearbit extends Component {
 
  loadOptions = fullName => {
    if (!fullName) {
      return Promise.resolve([]);
    }
    const url = `${base_url}/candidateName/${fullName}`;
    return axios
      .get(url, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token")
        }
      })
      .then(res => {
        console.log(res.data);
        return res.data.map(opt => ({
          label: opt.fullName,
          value: opt.candidateId,
          candidateId: opt.candidateId,
          fullName: opt.fullName,
        }));
      })
      .catch(err => console.log(err));
  };
  // renderOptions = ({ data }) => (<div><p>----{data.website}</p></div>);
  handleInputChange = (e) => e;

  handleOnChange = (option) => {
    this.props.form.setFieldValue("candidateId", option.value);
    this.props.form.setFieldValue("fullName", option.fullName);
 
  };

  handleBlur = (option) => {
    this.props.form.setFieldValue("fullName", true);
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
          <div class=" text-xs font-bold font-poppins"
          
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
            // value={(option) => option.fullName}
            defaultInputValue={value}
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
          <div class=" text-xs font-bold font-poppins"      
          >
            {label}
          </div>
          <StyledAsync
            isRequired={isRequired}
            classNamePrefix="sales"
            placeholder={placeholder}
            cacheOptions
            backspaceRemoveValue
            // value={(option) => option.fullName}
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
            <div className=" flex text-[tomato] font-bold !text-lm px-1">{get(errors, field.name)}</div>
          )}
        </>
      );
    }
    return (
      <>
       <div class=" flex flex-row flex-wrap items-start self-start justify-start grow shrink h-auto mr-auto ">
        <div class=" flex flex-wrap items-center self-start justify-start grow shrink h-auto mr-auto flex-col">
            <div class=" text-xs font-bold font-poppins     "       
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
             
            />
          </div>
        </div>
        {get(touched, field.name) && get(errors, field.name) && (
          <div className=" flex text-[tomato] font-bold !text-lm px-1">{get(errors, field.name)}</div>
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
      setClearbitCandidateData,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(OrderClearbit);
