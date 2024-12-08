import React, { Component } from "react";
import axios from "axios";
import { get } from "lodash";
import {   StyledAsync } from "../../UI/Elements";
import { FlexContainer } from "../../UI/Layout";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { setClearbitData } from "../../../Containers/Main/Account/AccountAction"

class ClearbitImage extends Component {
    loadOptions = (value) => {
        if (!value) {
            return Promise.resolve([]);
        }
        const url = `https://autocomplete.clearbit.com/v1/companies/suggest?query=${value}`;
        return axios
            .get(url, {})
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
    // renderOptions = ({ data }) => (<div><p>----{data.website}</p></div>);
    handleInputChange = (e) => e;

    handleOnChange = (option) => {
        this.props.form.setFieldValue("name", option.value);
        this.props.form.setFieldValue("url", option.website);
        this.props.form.setFieldValue("imageURL", option.logo);
        this.props.setClearbitData(option);

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
            defaultValue,
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
                        defaultValue={defaultValue}
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
                    <div class=" text-xs font-bold font-poppins" style={{ flexBasis: "20%" }}>{label}</div>
                    <StyledAsync
                        isRequired={isRequired}
                        classNamePrefix="sales"
                        placeholder={placeholder}
                        cacheOptions
                        loadOptions={this.loadOptions}
                        defaultValue={defaultValue}
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
                        <div class=" text-xs font-bold font-poppins" style={{ flexBasis: "20%" }}>{label}</div>
                        <StyledAsync
                            isRequired={isRequired}
                            classNamePrefix="sales"
                            placeholder={placeholder}
                            cacheOptions
                            loadOptions={this.loadOptions}
                            defaultValue={defaultValue}
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
            setClearbitData,
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(ClearbitImage);

