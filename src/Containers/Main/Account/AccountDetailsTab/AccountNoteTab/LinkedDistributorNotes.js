import React, { Component, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Timeline } from "antd";
import { BorderBox } from "../../../../../Components/UI/Layout";
import { BundleLoader } from "../../../../../Components/Placeholder";
import { getNotesListByDistributorId } from "../../AccountAction";
import { SingleNote } from "../../../../../Components/Common";
const  NoteForm = lazy(() => import('../../../../Note/NoteForm'));
class LinkedDistributorNotes extends Component {
    componentDidMount() {
        this.props.getNotesListByDistributorId(this.props.distributorDistributorId);
    }

    render() {
        const { fetchingNotesListByDistributorId, notesListByDistributorId } = this.props;

        return (
            <>
                <div className="bg-[#dcdcdc] h-[275px]">
                <Suspense fallback={<BundleLoader />}>
                    <NoteForm
                        type={"distributor"}
                        distributorId={this.props.distributorDistributorId}
                        callback={() =>
                            this.props.getNotesListByDistributorId(this.props.distributorDistributorId)
                        }
                    /></Suspense>
                </div>
                <br />

                <BorderBox>
                    <div className="h-200 overflow-auto p-2">
                        {fetchingNotesListByDistributorId ? (
                            <BundleLoader />
                        ) : (
                            <Timeline>
                                {notesListByDistributorId &&
                                    notesListByDistributorId.map((item, index) => (
                                        <Timeline.Item
                                            key={index}
                                            className="pb-[10px]" 
                                        >
                                            <SingleNote {...item} userId={this.props.userId} />
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
    notesListByDistributorId: distributor.notesListByDistributorId,
    fetchingNotesListByDistributorId: distributor.fetchingNotesListByDistributorId,
    distributorDistributorId: distributor.distributorDetailsByDistributorId.distributorId,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getNotesListByDistributorId,
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LinkedDistributorNotes);
