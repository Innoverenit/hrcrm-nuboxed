import React, { Component } from 'react'
import styled from 'styled-components';
import { FormattedMessage } from "react-intl";
import { Button } from "antd";
import { FlexContainer } from "../../../Components/UI/Layout";
import { TextInput } from "../../../Components/UI/Elements";
import { ActionIcon } from "../../../Components/Utils";
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
                            <FlexContainer justifyContent='space-between'>
                                <SourceName style={{ flexBasis: '70%' }}>{sourceName}</SourceName>
                                <div>
                                    <ActionIcon
                                        tooltipTitle='Edit'
                                        iconType='edit'
                                        handleIconClick={(toggleViewType)}
                                        size='0.75em'
                                    />&nbsp;
                                   {!disableDelete && <ActionIcon
                                        tooltipTitle='Delete'
                                        iconType='delete'
                                        handleIconClick={() => handleDeleteSource(leadSourceId)}
                                        size='0.75em'
                                        theme='filled'
                                        style={{ color: '#666' }}
                                    />}
                                </div>
                            </FlexContainer>

                            :
                            <FlexContainer >
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
                                    {/* Save */}
                                    <FormattedMessage
                                                id="app.save"
                                                defaultMessage="Save"
                                            />
                                
                                    </Button>&nbsp;
                            <Button
                                    type='primary'
                                    ghost
                                    onClick={() => toggleViewType()}
                                >
                                    {/* Cancel */}
                                    <FormattedMessage
                                                id="app.cancel"
                                                defaultMessage="Cancel"
                                            />
                                    </Button>
                            </FlexContainer>
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
