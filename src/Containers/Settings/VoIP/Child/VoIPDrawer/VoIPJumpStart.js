import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { JumpStartBox } from "../../../../Components/UI/Elements";

class VoIPJumpStart extends Component {
    componentDidMount() {
    
    }
    render() {
        const { } = this.props;


        return (
            <div class=" flex flex-col flex-wrap items-start self-start justify-start grow shrink h-auto mr-auto  w-[100%]">
             <div class=" flex flex-row flex-wrap items-start self-start justify-start grow shrink h-auto mr-auto  w-[100%]">
                    <JumpStartBox
                        noProgress
                        // isLoading={fetchingEventsListByVoIPId}
                        // value={eventsByVoIPId && eventsByVoIPId.Meeting && eventsByVoIPId.Meeting}
                        title='Accout SID'
                    // bgColor='#4288E0'
                    />
                    <JumpStartBox
                        // isLoading={fetchingCallsListByVoIPId}
                        // value={callsListByVoIPId && callsListByVoIPId.length}
                        noProgress
                        title='Auth Token'
                    // bgColor='#F3967E'
                    />
                </div>
                <div class=" flex flex-row flex-wrap items-start self-start justify-start grow shrink h-auto mr-auto  w-[100%]">
                    <JumpStartBox
                        noProgress
                        // isLoading={fetchingFunnelValueByVoIPId}
                        // value={actualFunnel && actualFunnel.toFixed(2)}
                        title='Twilio number'
                    // currencyType={currency}
                    // bgColor='#775FD1'
                    />
                    <JumpStartBox
                        noProgress
                        // stringValue
                        // isLoading={fetchingOpportunityListByVoIPId}
                        // value={`${Won && Won || 0 } / ${Lost && Lost || 0}`}
                        title='VoIP Provider'
                    // bgColor='#24B47E'
                    />
                </div>
            </div>
        )
    }
}
const mapStateToProps = ({ voip }) => ({


    fetchingCallsListByVoIPId: voip.fetchingCallsListByVoIPId,


})
const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(VoIPJumpStart);