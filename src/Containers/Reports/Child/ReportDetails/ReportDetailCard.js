import React, { Component ,lazy} from "react";
import { ViewEditCard } from "../../../../Components/UI/Elements";
const ReportDetailView =lazy(()=>import("./ReportDetailView"));

class ReportDetailCard extends Component {
  render() {
    const { customer } = this.props;
    return (
      <div>
        <ViewEditCard>
          {({ viewType }, toggleViewType) =>
            viewType === "view" ? (
              <ReportDetailView
              buttonData={this.props.buttonData}
              selectedCategory={this.props.selectedCategory}
              dropdownOptions={this.props.ComponentdropdownOptions}
              handleSelectChange={this.props.ComponenthandleSelectChange}
              handleButtonClick={this.props.handleButtonClick}
              handleIconClick={this.props.handleIconClick}
              activeIcon={this.props.activeIcon}
              dropdownData={this.props.dropdownData}
                 handleDropChange={this.props.handleDropChange}
                toggleViewType={toggleViewType}
              />
            ) : null
          }
        </ViewEditCard>
      </div>
    );
  }
}

export default ReportDetailCard;
