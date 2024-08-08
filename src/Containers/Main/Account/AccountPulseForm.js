import React, { } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import { JumpStartBox,  } from "../../../Components/UI/Elements";
import SummaryTable from "./AccountDetailsTab/SummaryTable";

class AccountPulseForm extends React.Component {
  
    componentDidMount() {
       
    }

    render() {
      
        return (
            <>
            <div class=" flex flex-row w-full" >
                <div class="flex w-full" >

                    <JumpStartBox
                        noProgress
                        title="#Open Orders"
                        bgColor="linear-gradient(270deg,#F15753,orange)"
                                     />


                    <JumpStartBox
                        noProgress
                        title="Revenue Booked"
                        bgColor="linear-gradient(270deg,#ff8f57,#ffd342)"
                    />

                    <JumpStartBox
                        noProgress
                        bgColor="linear-gradient(270deg,#3db8b5,#41e196)"
                        
                        title="Revenue Relised"
                   />
                    <JumpStartBox
                        noProgress
                        bgColor="linear-gradient(270deg,#5786ea,#20dbde)"
                        title={
                            <FormattedMessage
                                id="app.#Contacts"
                                defaultMessage="#Contacts "
                            />
                        }
   />
                </div>
            </div>
            <div class="mt-4">
            <SummaryTable
             RowData={this.props.RowData}
            />
            </div>
                               </>
        );
    }
}
const mapStateToProps = ({ customer, auth }) => ({


});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    //   getProspectWeightedValue,
    //   getProspectOppValue,
    //   getProspectPipeLineValue,
    //   getProspectContactValue
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AccountPulseForm);
