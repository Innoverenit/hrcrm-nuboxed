import React, { Component, Suspense } from "react";
import { BundleLoader } from "../../../../Components/Placeholder";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledDrawer } from "../../../../Components/UI/Antd";
import UpdateActivityCallForm from "./UpdateActivityCallForm";
import UpdateActivityTaskForm from "./UpdateActivityTaskForm"; 
import UpdateActivityEventForm from "./UpdateActivityEventForm";

class AddCustomerActivityDrawerModal extends Component {

  render() {
    const { selectedStatus,...formProps } = this.props;
        let title = "Default Title";
    if (selectedStatus) {
      switch (selectedStatus.category) {
        case "Call":
          title = "Call";
          break;
        case "Task":
          title = "Task";
          break;
        case "Event":
          title = "Event";
          break;
        default:
          break;
      }
    }

    return (
      <div className="pulse-background">
        <StyledDrawer 
        // style={{ scrollbar:"thin" }}
        title={title}
          width="60%"
          destroyOnClose
          closable
          visible={this.props.addCustomerActivityDrawerModal}
          onClose={() => this.props.handleCustomerActivityModal(false)}
        >
          <Suspense fallback={<BundleLoader />}>
            {selectedStatus && selectedStatus.category === "Call" && (
              <UpdateActivityCallForm selectedStatus={selectedStatus} customer={this.props.customer} customerNoteList={this.props.customerNoteList} />
            )}
            {selectedStatus && selectedStatus.category === "Task" && (
              <UpdateActivityTaskForm selectedStatus={selectedStatus}  customer={this.props.customer} customerNoteList={this.props.customerNoteList} />
            )}
             {selectedStatus && selectedStatus.category === "Event" && (
              <UpdateActivityEventForm selectedStatus={selectedStatus}   customer={this.props.customer} customerNoteList={this.props.customerNoteList} {...formProps}/>
            )}
          </Suspense>
        </StyledDrawer>
      </div>
    );
  }
}

const mapStateToProps = ({ customer }) => ({});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {},
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(AddCustomerActivityDrawerModal);
