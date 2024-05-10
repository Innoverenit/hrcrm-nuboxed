import React, { Component,lazy} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Timeline } from "antd";
import { BorderBox } from "../../../../Components/UI/Layout";
import { BundleLoader } from "../../../../Components/Placeholder";
import { getNotesofPRoduct } from "../../ProductAction";
import SingleNoteProductNoteForm from "./SingleNoteProductNoteForm";

const LinkedProductNoteForm =lazy(()=> import("./LinkedProductNoteForm"));

class LinkedProductNotes extends Component {
  componentDidMount() {
    // const data={productionBuilderId:this.props.rowdata.productionBuilderId}
   this.props.getNotesofPRoduct("productBuilder",this.props.rowdata.productionBuilderId);
  }

  render() {
    const { fetchingNotesofProducts, notesofPRoducts } = this.props;

    return (
      <>
        <div style={{ backgroundColor: "#dcdcdc" }}>
          <LinkedProductNoteForm
          rowdata={this.props.rowdata}
            type={"product"}
            productionBuilderId={this.props.rowdata.productionBuilderId}
            callback={() =>
              this.props.getNotesofPRoduct("productBuilder",this.props.rowdata.productionBuilderId)
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
                        <SingleNoteProductNoteForm  rowdata={this.props.rowdata} {...item} userId={this.props.userId}/>
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
