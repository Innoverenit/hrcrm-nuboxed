import React, { Component,lazy} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Timeline } from "antd";
import { BorderBox } from "../../../../Components/UI/Layout";
import { BundleLoader } from "../../../../Components/Placeholder";
import { getNotesofPRoduct } from "../../ProductAction";
import { SingleNote } from "../../../../Components/Common";
import SingleNoteProductNoteForm from "./SingleNoteProductNoteForm";

const LinkedProductNoteForm =lazy(()=> import("./LinkedProductNoteForm"));

class LinkedProductNotes extends Component {
  componentDidMount() {
    // const data={productionBuilderId:this.props.rowdata.productionBuilderId}
   this.props.getNotesofPRoduct();
  }

  render() {
    const { fetchingNotesofProducts, notesofPRoducts } = this.props;

    return (
      <>
        <div style={{ backgroundColor: "#dcdcdc" }}>
          <LinkedProductNoteForm
            type={"product"}
            productionBuilderId={this.props.rowdata.productionBuilderId}
            callback={() =>
              this.props.getNotesofPRoduct
            }
          />
        </div>
        <br />

        <BorderBox>
          <div class="h-80 overflow-auto p-[0.3rem]">
            {fetchingNotesofProducts ? (
              <BundleLoader />
            ) : (
                <Timeline>
                  {notesofPRoducts &&
                    notesofPRoducts.map((item, index) => (
                      <Timeline.Item
                        key={index}
                        style={{ paddingBottom: "0.625em" }}
                      >
                        <SingleNoteProductNoteForm {...item} userId={this.props.userId} rowdata={this.props.rowdata}/>
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

const mapStateToProps = ({ auth, product }) => ({
  userId: auth.userDetails.userId,
  notesofPRoducts: product.notesofPRoducts,
  fetchingNotesofProducts: product.fetchingNotesofProducts,

});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getNotesofPRoduct,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(LinkedProductNotes);
