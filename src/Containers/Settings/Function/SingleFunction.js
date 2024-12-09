import React, { Component } from 'react'
import styled from 'styled-components';
import { Button } from "antd";
import { TextInput } from "../../../Components/UI/Elements";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import ViewEditCard from "../../../Components/UI/Elements/ViewEditCard";
class SingleFunctions extends Component {
    constructor(props) {
        super(props)
        this.state = {
            type: '',
            functionType: "",

        }
    }
    render() {
        const { Function: { functionType, functionTypeId }, handleChange, name, value, linkedFunctions,
            updatingFunctions, handleUpdateFunction, handleDeleteSector } = this.props;
        console.log(linkedFunctions)
        // const disableDelete = linkedCustomers && linkedCustomers.includes(typeId)
        return (
            <FunctionWrapper>
                <ViewEditCard>
                    {({ viewType }, toggleViewType) => (
                        viewType === 'view'
                            ?
                            <div class=" flex flex-row flex-wrap items-start self-start justify-between grow shrink h-auto mr-auto ">
                                <FunctionName style={{ flexBasis: '90%' }}>
                                    {functionType}
                                </FunctionName>
                                <div>
                                <BorderColorIcon
                                tooltipTitle="Edit"
                                 iconType="edit"
                                handleIconClick={toggleViewType}
                                className=" !text-red-600 cursor-pointer !text-icon "
                               />
                                &nbsp;                                                                                                   
                                </div>
                            </div>
                            :
                            <div class=" flex flex-row flex-wrap items-start self-start justify-start grow shrink h-auto mr-auto ">
                                <TextInput
                                    name={name}
                                    // value={value || educationType}
                                    defaultValue={functionType}
                                    onChange={handleChange}
                                    style={{ width: '100%' }}
                                />
                                <br />
                                <br />
                                <div style={{ marginLeft:"auto" }}>
                                <Button
                                    type='primary'
                                    htmlType='submit'
                                    loading={updatingFunctions}
                                    disabled={!value}
                                    onClick={() => handleUpdateFunction(functionTypeId, value, toggleViewType())}
                                >
                                    Save
                                </Button>&nbsp;
                                <Button
                                    type='primary'
                                    ghost
                                    onClick={() => toggleViewType()}
                                >
                                    Cancel
                                </Button>
                                </div>
                            </div>
                    )}
                </ViewEditCard>
            </FunctionWrapper>
        )
    }
}

export default SingleFunctions;

const FunctionWrapper = styled.div`
    width: 100%;
    cursor: pointer;
`
const FunctionName = styled.h3`
    color:  ${props => props.theme.color || 'teal'};
    font-weight: 600;
`
const FunctionValue = styled.h3`
    color: #999;
    font-size: 1.3rem;
`
