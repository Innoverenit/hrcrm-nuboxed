import React, { Component,lazy} from "react";
import { ActionHeader } from "../../../Components/Utils";
import PrmotionActionLeft from "./PrmotionActionLeft";
import PrmotionActionRight from "./PrmotionActionRight";

class PrmotionHeader extends Component {
  render() {
    const {
        
        viewType,
        setPromotionViewType,
    } = this.props;
    return (
      <div style={{position: "sticky",
      zIndex: "998"}} >
        <ActionHeader
            leftComponent={

                <PrmotionActionLeft
                    viewType={viewType}
                    setPromotionViewType={setPromotionViewType}
                />

            }
          rightComponent={
            <PrmotionActionRight
            handlePromotionsDrawer={this.props.handlePromotionsDrawer}
          addpromotionModal={this.props.addpromotionModal}
            />
          }
        />
      </div>
    );
  }
}

export default PrmotionHeader;

