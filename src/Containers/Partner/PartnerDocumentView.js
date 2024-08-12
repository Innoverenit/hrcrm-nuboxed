import React, { Suspense, Component } from "react";
import { connect } from "react-redux";
import FileCopyIcon from '@mui/icons-material/FileCopy';
import { bindActionCreators } from "redux";
import styled from "styled-components";

class PartnerDocumentView extends Component {
  render() {
    return (
      <>
   <div class="flex"> 
          {this.props.documentsByPartnerId.map((item) => {
            return (
              <div class="h-[9rem] w-[21vw] rounded p-1 m-1 mt-5 bg-white border-[2px] border-[#eeeeee] text-black">
          <div class="w-7 h-7" >
                  <FileCopyIcon
                    style={{ fontSize: "64px", color: "blue" }}
                    icon={solid("file")}
                  />
                </div>
                <div class="h-8 font-bold font-poppins text-xs overflow-hidden whitespace-nowrap">{item.documentContentType} </div>
              </div>
            );
          })}
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ partner, auth }) => ({});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PartnerDocumentView);

