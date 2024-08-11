import React, { Component, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Timeline } from "antd";
import { BorderBox } from "../../../../../Components/UI/Layout";
import { BundleLoader } from "../../../../../Components/Placeholder";

const NoteForm = lazy(() => import("../../../../Note/NoteForm"));
const SingleNote = lazy(() => import("../../../../../Components/Common"));
class PhoneNotesForm extends Component {
  

    render() {
        const { fetchingNotesInOrders, notesInOrders } = this.props;

        return (
            <>
                <div style={{ backgroundColor: "#dcdcdc", height: "275px" }}>
                <Suspense fallback={<BundleLoader />}>
                    <NoteForm
                        type={"distributor"}
                        orderId={this.props.RowData.orderId}
                    /></Suspense>
                </div>
                <br />

                <BorderBox>
                    <div style={{ height: 200, overflow: "auto", padding: "0.3rem" }}>
                        {fetchingNotesInOrders ? (
                            <BundleLoader />
                        ) : (
                            <Timeline>
                                {notesInOrders &&
                                    notesInOrders.map((item, index) => (
                                        <Timeline.Item
                                            key={index}
                                            style={{ paddingBottom: "10px" }}
                                        > <Suspense fallback={<BundleLoader />}>
                                            <SingleNote {...item} userId={this.props.userId} />
                                            </Suspense>
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

const mapStateToProps = ({ auth, distributor }) => ({
    userId: auth.userDetails.userId,
    notesInOrders: distributor.notesInOrders,
    fetchingNotesInOrders: distributor.fetchingNotesInOrders,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            // getNotesInOrder,
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PhoneNotesForm);
