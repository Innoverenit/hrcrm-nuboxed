import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from 'react-intl';

import { Button } from "antd";
import { updateUserById } from "../../../Auth/AuthAction";
import EditableDatePicker from "../../../../Components/Forms/Edit/EditableDatePicker";
import EditableSelect from "../../../../Components/Forms/Edit/EditableSelect";

class PersonalEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: {},
        };
    }
    handleUpdate = () => {
        const userId = this.props.user.userId;

        console.log(userId)
        this.props.updateUserById(

            { ...this.state.fields, employeeId: userId, },
            this.props.user.userId,
            this.props.toggleViewType
        );
    };
    handleChange = (name, value) => {
        this.setState({
            fields: {
                ...this.state.fields,
                [name]: value,
            },
        });
    };
    render() {
        const {
            user: {
                bloodGroup,
                dob,
            },
            toggleViewType,
            updatingUserById,
        } = this.props;
        return (
            <>
                <div class=" flex flex-col"
                    style={{ padding: "0.625em 1.25em 0.625em 1.25em" }}
                >
                    <div class=" w-full" >
                        <EditableSelect
                            isRequired
                            defaultValue={bloodGroup}
                            handleChange={this.handleChange}
                            name={"bloodGroup"}
                            placeholder={"Blood Group"}
                            options={[
                                "A+",
                                "A-",
                                "B+",
                                "B-",
                                "AB+",
                                "AB-",
                                "O+",
                                "O-",

                            ]}
                            value={this.state.fields.bloodGroup}
                            style={{ width: "100%" }}
                        />
                    </div>
                  
                    {/* <EditableInput
                        isRequired
                        defaultValue={dob}
                        handleChange={this.handleChange}
                        name={"dob"}
                        placeholder={"Date Of Birth"}
                        Component={DatePicker}
                        value={this.state.fields.dob}
                        width="100%"
                    /> */}
                    <div class=" w-full m-[0.125em]" >
                        <EditableDatePicker
                            defaultValue={dob}
                            handleChange={this.handleChange}
                            name={"dob"}
                            placeholder={"Date Of Birth"}

                            value={this.state.fields.dob}
                            style={{ width: "100%" }}

                        />
                    </div>
                </div>


                <div class=" flex justify-end mr-[1.25em] m-[0.125em]" >
                    <Button
                        type="primary"
                        Loading={updatingUserById}
                        onClick={this.handleUpdate}
                    >
                        {/* Save */}
                        <FormattedMessage
              id="app.save"
              defaultMessage="Save"
            />
          </Button>
          &nbsp;
          <Button type="ghost" onClick={() => toggleViewType()}>
                        {/* Cancel */}
                        <FormattedMessage
              id="app.cancel"
              defaultMessage="Cancel"
            />
          </Button>
                </div>
            </>
        );
    }
}

const mapStateToProps = ({ auth }) => ({
    updatingUserById: auth.updatingUserById,
    updatingUserByIdError: auth.updatingUserByIdError,
});
const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            updateUserById,
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(PersonalEdit);
