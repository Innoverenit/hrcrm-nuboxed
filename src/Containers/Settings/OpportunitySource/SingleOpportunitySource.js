import React, { Component } from 'react'
import styled from 'styled-components';
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { Button } from "antd";
import { TextInput } from "../../../Components/UI/Elements";
import ViewEditCard from "../../../Components/UI/Elements/ViewEditCard";
class SingleOpportunitySource extends Component {
    constructor(props) {
        super(props)
        this.state = {
            sourceName: ''
        }
    }
    render() {
        const { source: { sourceName, leadSourceId }, handleChange, name, value, linkedSources,
            updatingSources, handleUpdateSource, handleDeleteSource } = this.props;
        console.log(linkedSources)
        const disableDelete = linkedSources && linkedSources.includes(leadSourceId)
        return (
            <SourceWrapper>
                <ViewEditCard>
                    {({ viewType }, toggleViewType) => (
                        viewType === 'view'
                            ?
                            <div class=" flex flex-row flex-wrap items-start self-start justify-between grow shrink h-auto mr-auto ">
                                <SourceName style={{ flexBasis: '70%' }}>{sourceName}</SourceName>
                                <div>
                                    <BorderColorIcon
                                        tooltipTitle='Edit'
                                        iconType='edit'
                                        handleIconClick={(toggleViewType)}
                                         className=" !text-red-600 cursor-pointer !text-icon "
                                    />&nbsp;
                                   {!disableDelete && <BorderColorIcon
                                        tooltipTitle='Delete'
                                        iconType='delete'
                                        handleIconClick={() => handleDeleteSource(leadSourceId)}
                                        
                                        theme='filled'
                                         className=" !text-red-600 cursor-pointer !text-icon "
                                    />}
                                </div>
                            </div>

                            :
                           <div class=" flex flex-row flex-wrap items-start self-start justify-start grow shrink h-auto mr-auto ">
                                <TextInput
                                    name={name}
                                    value={value || sourceName}
                                    // defaultValue={sourceName}
                                    onChange={handleChange}
                                    style={{ width: '100%' }}
                                />
                                <br />
                                <br />
                                <Button
                                    type='primary'
                                    htmlType='submit'
                                    Loading={updatingSources}
                                    onClick={() => handleUpdateSource(leadSourceId, value, toggleViewType())}
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
                    )}
                </ViewEditCard>
            </SourceWrapper>
        )
    }
}

export default SingleOpportunitySource;

const SourceWrapper = styled.div`
    width: 100%;
    cursor: pointer;
`
const SourceName = styled.h3`
    color:  ${props => props.theme.color || 'teal'};
    font-weight: 600;
`
const SourceValue = styled.h3`
    color: #999;
    font-size: 1.3rem;
`
