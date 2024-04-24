import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tooltip,Avatar } from "antd";
import { FormattedMessage } from "react-intl";

class InventoryActionLeft extends React.Component {
  render() {
    const { viewType, setInventoryViewType } = this.props;

    return (
      <>
        <div class=" flex items-center" >
          <Tooltip title={<FormattedMessage id="app.location" defaultMessage="Location" />}>
            <span class=" mr-[0.5rem] cursor-pointer"
              onClick={() => setInventoryViewType("table")}
              style={{
       
                color: viewType === "table" && "#1890ff",
                
              }}
            >
               <Avatar style={{ background: this.props.viewType === "table" ? "#f279ab" : "#4bc076" }}>
              <i class="fas fa-globe"></i>
              </Avatar>
            </span>
          </Tooltip>
          {/* <Tooltip title="Catalogue">
            <span
              onClick={() => setInventoryViewType("table1")}
              style={{
                marginRight: "0.5rem",
                color: viewType === "partner" && "#1890ff",
              }}
            >
              <i class="fab fa-creative-commons-remix"></i>
            </span>
          </Tooltip>
          <Tooltip title="Material">
            <span
              onClick={() => setInventoryViewType("table2")}
              style={{
                marginRight: "0.5rem",
                color: viewType === "partner" && "#1890ff",
              }}
            >
              <i class="fas fa-cookie-bite"></i>
            </span>
          </Tooltip> */}
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ teams }) => ({});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InventoryActionLeft);
