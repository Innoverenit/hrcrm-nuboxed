import React, { Component,lazy} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Timeline } from "antd";
import { BorderBox } from "../../../../Components/UI/Layout";
import { BundleLoader } from "../../../../Components/Placeholder";
 import { getNotesListOfLeads } from "../../LeadsAction";
import SingleLeadsNoteForm from "./SingleLeadsNotesForm";
import LeadsNoteForm from "./LeadsNoteForm";


class NotesLeadsForm extends Component {
  // componentDidMount() {
  
  //   this.props.getNotesListOfLeads(this.props.rowdata.category,this.props.rowdata.category==="Task"?this.props.rowdata.taskId:this.props.rowdata.category==="Event"?this.props.rowdata.eventId:this.props.rowdata.category==="Call"?this.props.rowdata.callId:null);
  // }

  render() {
    const { fetchingNotesListOfLeads, notesListOfLeads } = this.props;

    return (
      <>
        <div style={{ backgroundColor: "#dcdcdc" }}>
          <LeadsNoteForm
            type={"customer"}
            customerId={this.props.rowdata.customerId}
            callback={() =>
              this.props.getNotesListOfLeads(this.props.rowdata.customerId)
            }
          />
        </div>
        <br />

        <BorderBox>
          <div class="h-80 overflow-auto p-[0.3rem]">
            {fetchingNotesListOfLeads ? (
              <BundleLoader />
            ) : (
                <Timeline>
                  {notesListOfLeads &&
                    notesListOfLeads.map((item, index) => (
                      <Timeline.Item
                        key={index}
                        style={{ paddingBottom: "0.625em" }}
                      >
                        <SingleLeadsNoteForm 
                         {...item} userId={this.props.userId} 
                        />
                     </Timeline.Item>
                    ))} 
                </Timeline>
               )} 
          </div>
        </BorderBox>
      </>
    );
  }
}

const mapStateToProps = ({ auth, leads }) => ({
  userId: auth.userDetails.userId,
  notesListOfLeads: leads.notesListOfLeads,
  fetchingNotesListOfLeads: leads.fetchingNotesListOfLeads,
  // customerId: customer.customer.customerId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getNotesListOfLeads,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(NotesLeadsForm);
