import React, { Component } from 'react'
import styled from 'styled-components';
import { TextInput } from "../../Components/UI/Elements";

class SinglePolicy extends Component {
    render() {
        const { stage: { stageName, stageId, probability, stageSequence } } = this.props
        console.log(this.props.stage)
        return (
            <StageWrapper>
            <div class=" flex flex-row flex-wrap items-start self-start justify-between grow shrink h-auto mr-auto ">
                    <StageName>{stageName}</StageName>
                    {typeof probability === 'number'
                        ? <TextInput defaultValue={probability} />
                        : <TextInput
                            defaultValue={probability}
                            disabled
                            style={{ backgroundColor: '#f4f4f4', cursor: 'not-allowed' }} />
                    }
                </div>
            </StageWrapper>
        )
    }
}

export default SinglePolicy;

const StageWrapper = styled.div`
    background:  ${props => props.theme.applicationBackground || 'teal'};
    padding: 0.5rem;
    margin: 0.4rem 0.2rem;
    border-radius: 0.2rem;
    width: 25em;
    box-shadow: 0em 0.25em 0.625em -0.125em ${props => props.theme.boxShadowColor};
    cursor: pointer;
`
const StageName = styled.h3`
    color:  ${props => props.theme.color || 'teal'};
    font-weight: 600;
`
