import React, { Component, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Timeline } from "antd";
import { BorderBox } from "../../../Components/UI/Layout";
import { getNotesListByNotes } from "./ErpNoteAction";
import ErpSingleNote from "./ErpSingleNote";
import ErpNoteForm from "./ErpNoteForm";
import { BundleLoader } from "../../../Components/Placeholder";
class ErpNote extends Component {
  componentDidMount() {
    this.props.getNotesListByNotes(this.props.type, this.props.id);}
  render() {
    const { fetchingNotesListByCustomerId, notesListByCustomerId } = this.props;
    return (
      <>
        <BorderBox>
          <div class="h-80 overflow-auto p-[0.8rem]">
            {fetchingNotesListByCustomerId ? (
              <BundleLoader />
            ) : (
              <Timeline>
                {notesListByCustomerId &&
                  notesListByCustomerId.map((item, index) => (
                    <Timeline.Item
                      key={index}
                      style={{ paddingBottom: "0.625em" }}
                    >
                      <ErpSingleNote {...item} userId={this.props.userId} />
                    </Timeline.Item>
                  ))}
              </Timeline>
            )}
          </div>
        </BorderBox>
        <div class="  bg-gray-100">
          <ErpNoteForm
            type={this.props.type}
            id={this.props.id}
            callback={() =>
              this.props.getNotesListByNotes(this.props.type, this.props.id)
            }
          />
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ auth, customer, erpNotes }) => ({
  userId: auth.userDetails.userId,
  notesListByCustomerId: erpNotes.notesListByCustomerId,
  fetchingNotesListByCustomerId: erpNotes.fetchingNotesListByCustomerId,
  customerId: customer.customer.customerId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getNotesListByNotes,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ErpNote);
