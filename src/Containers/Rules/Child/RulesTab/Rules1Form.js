
import React, { Component } from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Switch } from "antd";
import { Formik, Form, Field, FastField } from "formik";

import { InputComponent } from "../../../Components/Forms/Formik/InputComponent";

import { SelectComponent } from "../../../Components/Forms/Formik/SelectComponent";


class Rules1Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        }
    }
    handleChange = (checked) => {
        this.setState({
            visible: checked
        })
    }

    render() {

        return (
            <>
                <Formik
                    initialValues={{
                        type: "",

                    }}

                    onSubmit={values => {

                    }}
                >
                    {({ values }) => (

                        <Form className="form-background">
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <div
                                    style={{
                                        height: "100%",
                                        width: "98%",

                                    }}
                                >
                                 <div class=" flex flex-row flex-wrap items-start self-start justify-between grow shrink h-auto mr-auto ">
                                        <div style={{ width: "50%", marginTop: "0.625em" }}>
                                            <div class=" text-xs font-bold font-poppins text-black">Stage Progress</div>
                                            <Switch
                                                style={{ width: "5em", marginLeft: "0.625em" }}
                                                onChange={this.handleChange}
                                                checked={this.state.visible}

                                                checkedChildren="Yes"
                                                unCheckedChildren="No"

                                            />
                                        </div>
                                        {this.state.visible && (
                                            <div style={{ width: "50%" }}>
                                                <Field
                                                    name="type"

                                                    component={SelectComponent}
                                                    options={[
                                                        "Aging",
                                                        "Days in Final stage",

                                                    ]}
                                                    inlineLabel
                                                    isColumn
                                                    style={{ flexBasis: "80%", marginTop: "0.25em" }}
                                                // defaultValue='low'
                                                />
                                            </div>
                                        )}


                                    </div>
                                    <div class=" mt-3" />
                                    {
                                        values.type && (
                                            <div class=" flex flex-row flex-wrap items-start self-start justify-between grow shrink h-auto mr-auto ">
                                                <div style={{ width: "65%" }}>
                                                    <Field
                                                        name="unit"
                                                        //label="Time"
                                                        label={<FormattedMessage
                                                            id="app.unit"
                                                            defaultMessage="Time"
                                                        />}
                                                        isColumn
                                                        width={"100%"}
                                                        component={InputComponent}
                                                        inlineLabel
                                                        style={{
                                                            flexBasis: "80%",
                                                            marginTop: "0.25em",
                                                            height: "2.0625em"
                                                        }}
                                                    />
                                                </div>
                                                <div style={{ width: "30%", marginTop: "1.375em" }}>

                                                    <FastField
                                                        name="unitValue"
                                                        isRequired
                                                        label={<FormattedMessage
                                                            id="app.unitValue"
                                                            defaultMessage="text"
                                                        />}
                                                        type="text"
                                                        isColumn
                                                        options={["Days", "Hours"]}
                                                        component={SelectComponent}
                                                        inlineLabel
                                                        className="field"
                                                        style={{
                                                            flexBasis: "80%",
                                                            margintop: "0.25em"
                                                        }}
                                                    />

                                                </div>
                                            </div>
                                        )
                                    }

                                </div>


                            </div>
                            <div class=" mt-3" />
                            <div class=" flex flex-row flex-wrap items-start self-start justify-end grow shrink h-auto mr-auto ">
                                <Button
                                    type="primary"
                                    htmlType="submit"

                                >
                                    Add Rule
                                </Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </>
        );
    }
}

const mapStateToProps = ({ settings }) => ({

});

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {

        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(Rules1Form);
