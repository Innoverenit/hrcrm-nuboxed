import React, { Component } from 'react'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "antd";
import { MainWrapper} from "../../../Components/UI/Layout";
import { TextInput, Title } from "../../../Components/UI/Elements";
import SingleOpportunitySource from './SingleOpportunitySource';
import { getSources, addSource, removeSource, updateSource } from "../../Opportunity/OpportunityAction";
import axios from 'axios';
import { base_url } from "../../../Config/Auth";


class OpportunitySource extends Component {
    constructor(props) {
        super(props)
        this.state = {
            linkedSources: [],
            isTextInputOpen: false,
            addingSource: false,
            sourceName: '',
            singleSource: '',
        }
    }
    toggleInput = () => this.setState((prevState) => ({
        isTextInputOpen: !prevState.isTextInputOpen
    }))
    handleChange = ({ target: { name, value } }) => this.setState({ [name]: value })
    handleAddSource = () => {
        const { addSource } = this.props;
        const { sourceName, addingSource, isTextInputOpen } = this.state;
        let source = { sourceName }
        addSource(source, () => console.log('add source callback'))
        this.setState({ sourceName: '', singleSource: '', isTextInputOpen: false })
    }
    handleDeleteSource = (id) => {
        this.props.removeSource(id)
        this.setState({ sourceName: '', singleSource: '' })
    }
    handleUpdateSource = (id, sourceName, cb) => {
        this.props.updateSource(id, sourceName, cb)
        this.setState({ sourceName: '', singleSource: '' })
    }
    getLinkedSources = () => {
        axios.get(`${base_url}/opportunity/source/linkedSources`, {
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('token') || ''
            }
        }).then(res => {
            console.log(res)
            this.setState({ linkedSources: res.data })
        }).catch(err => {
            console.log(err)
        })
    }
    componentDidMount() {
        const { getSources } = this.props;
        getSources()
        this.getLinkedSources()
    }
    render() {
        const { fetchingSources, fetchingSourcesError, sources, addingSources, updatingSources } = this.props;
        const { isTextInputOpen, sourceName, singleSource, linkedSources } = this.state;
        if (fetchingSources) return <p>Loading ...</p>
        if (fetchingSourcesError) return <p>Error ...</p>
        return (
            <>
             <div class=" flex flex-row flex-wrap items-start self-start justify-start grow shrink h-auto mr-auto ">
                    <MainWrapper style={{ flexBasis: '50%', height: 540, overflow: 'auto', color: '#FFFAFA' }} >
                    <div class=" flex flex-col flex-wrap items-start self-start justify-start grow shrink h-auto mr-auto ">
                            <Title style={{ padding: 8 }}>
                                <FormattedMessage
                                    id="app.listofsources"
                                    defaultMessage="List of Sources"
                                />
                                    List of Sources
                                </Title>
                            {sources.length &&
                                sources.map((source, i) => <SingleOpportunitySource
                                    key={i}
                                    value={singleSource}
                                    name='singleSource'
                                    label={<FormattedMessage
                                        id="app.singleSource"
                                        defaultMessage="Single Source"
                                    />}
                                    source={source}
                                    linkedSources={linkedSources}
                                    updatingSources={updatingSources}
                                    handleChange={this.handleChange}
                                    handleUpdateSource={this.handleUpdateSource}
                                    handleDeleteSource={this.handleDeleteSource} />)
                            }
                        </div>
                        {
                            isTextInputOpen
                                ? (
                                    <div class=" flex flex-row flex-wrap items-center self-start justify-start grow shrink h-auto mr-auto ">
                                        <br />
                                        <TextInput
                                            placeholder='Add source'
                                            name='sourceName'
                                            label={<FormattedMessage
                                                id="app.sourceName"
                                                defaultMessage="Add source"
                                            />}
                                            value={sourceName}
                                            onChange={this.handleChange}
                                        />&nbsp;
                                        <Button
                                            type='primary'
                                            htmlType='submit'
                                            Loading={addingSources}
                                            onClick={this.handleAddSource}
                                        >
                                            <FormattedMessage
                                                id="app.save"
                                                defaultMessage="Save"
                                            />

                                            {/* Save */}
                                        </Button>&nbsp;
                                        <Button
                                            type='primary'
                                            ghost
                                            onClick={this.toggleInput}
                                        >
                                            <FormattedMessage
                                                id="app.cancel"
                                                defaultMessage="Cancel"
                                            />
                                            {/* Cancel */}

                                        </Button>
                                    </div>
                                )

                                : <>
                                    <br />
                                    <Button
                                        type='primary'
                                        ghost
                                        htmlType='button'
                                        Loading={addingSources}
                                        onClick={this.toggleInput}
                                    >
                                        <FormattedMessage
                                            id="app.addsource"
                                            defaultMessage="Add Source"
                                        />
                                        {/* Add Source */}
                                    </Button>
                                </>
                        }
                    </MainWrapper>
                    <MainWrapper>

                    <div class=" flex flex-row flex-wrap items-start self-start justify-start grow shrink h-auto  border border-gray-200 w-full p-4 mr-[70px]">
                            <p style={{ color: '#035b9b', fontSize: '1rem' }}>
                                Here is a list of sample sources, it will help attribute opportunities to their
                                sources thereby identifying the effective channels and further allocating
                                resources accordingly.
                      </p>
                            <p style={{ color: '#035b9b', fontSize: '1rem' }}>
                                Korero allows you to change the sources as per your organization's
                                requirements.
                      </p>
                            <p style={{ color: '#035b9b', fontSize: '1rem' }}>
                                The only exception is if an opportunity is associated with a
                                source then it cannot be deleted from the list till no opportunity exists in that source.
                      </p>
                        </div>

                    </MainWrapper >
                </div>
            </>
        )
    }
}

const mapStateToProps = ({ opportunity }) => ({
    addingSources: opportunity.addingSources,
    addingSourcesError: opportunity.addingSourcesError,
    removingSources: opportunity.removingSources,
    removingSourcesError: opportunity.removingSourcesError,
    updatingSources: opportunity.updatingSources,
    updatingSourcesError: opportunity.updatingSourcesError,
    fetchingSources: opportunity.fetchingSources,
    fetchingSourcesError: opportunity.fetchingSourcesError,
    sources: opportunity.sources,
})
const mapDispatchToProps = dispatch => bindActionCreators({ getSources, addSource, removeSource, updateSource }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(OpportunitySource);