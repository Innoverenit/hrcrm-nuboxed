import React, { Component,lazy,Suspense} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Timeline } from "antd";
import { BorderBox } from "../../Components/UI/Layout"
import { getNotesListByNotes } from "./MainNoteAction";
import { BundleLoader } from "../../Components/Placeholder";

const MainNoteForm = lazy(() => import("./MainNoteForm"));
const  MainSingleNotes = lazy(() => import("./MainSingleNotes"));
class MainNotes extends Component {
  componentDidMount() {
    this.props.getNotesListByNotes(this.props.type,this.props.uniqueId);
  }

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
                        <Suspense fallback={<BundleLoader />}> 
                        <MainSingleNotes {...item} userId={this.props.userId}
                         translatedMenuItems={this.translatedMenuItems}
                         selectedLanguage={this.props.selectedLanguage}
                         translateText={this.props.translateText}
                        /></Suspense>
                      </Timeline.Item>
                    ))}
                </Timeline>
              )}
          </div>
        </BorderBox>
        <br />
        <div style={{ backgroundColor: "#dcdcdc" }}>
        <Suspense fallback={<BundleLoader />}>  <MainNoteForm
           type={this.props.type}
           uniqueId={this.props.uniqueId}
            callback={() =>
              this.props.getNotesListByNotes(this.props.type,this.props.uniqueId)
            }
          /></Suspense>
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ auth, customer,mainNotes }) => ({
  userId: auth.userDetails.userId,
  notesListByCustomerId: mainNotes.notesListByCustomerId,
  fetchingNotesListByCustomerId: mainNotes.fetchingNotesListByCustomerId,
  customerId: customer.customer.customerId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getNotesListByNotes,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(MainNotes);
