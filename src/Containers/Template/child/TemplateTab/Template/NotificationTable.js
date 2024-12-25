import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Icon, Tooltip, Button, message } from "antd";
import {
  StyledTable,
  StyledPopconfirm,
} from "../../../../../Components/UI/Antd";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import NotificationView from "./NotificationView";
import { getNotificationTemplate,setCurrentNotification } from "../../../../Rules/RulesAction";
import dayjs from "dayjs";


// const data = [{ templateName: "Birthday", date: "29-10-20" }];
class NotificationTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      notificationTemplateId: "",
      message: "",
      notificationName: "",
    };
  }
  componentDidMount() {
    this.props.getNotificationTemplate();
  }

  handleIconClick = (notificationTemplateId, message, notificationName) => {
    this.setState({ notificationTemplateId, message, notificationName });
    this.setState({ show: true });
  };
  handleCloseIconClick = () => {
    this.setState({ show: false });
  };
  render() {
    const columns = [
      { title: "", width: "2%" },
      { title: "Name", dataIndex: "notificationName", width: "30%" },
      { title: "Description", dataIndex: "description", width: "40%" },

      {
        //title: "Created on",
        title: "Description"
      ,
        width: "15%",
        render: (name, item, i) => {
          return <span>{dayjs(item.creationDate).format("YYYY-MM-DD")}</span>;
        },
      },

      {
        title: "",
        width: "5%",
        render: (name, item, i) => {
          const close =
            this.state.notificationnotificationTemplateId ===
            item.notificationTemplateId && this.state.show === true;
          return (
            <>
              {close ? (
                <Tooltip title="Close Template">
                  <VisibilityOffIcon
                    type="eye-invisible"
                    onClick={this.handleCloseIconClick}
                  
                    style={{
                      fontSize: "1.125em",
                      color: this.state.show ? "#1890ff" : "black",
                    }}
                    size="30"
                  />
                </Tooltip>
              ) : (
                  <Tooltip title="View Template">
                    <VisibilityIcon
                      type="eye"
                      onClick={() =>{
                        this.handleIconClick(
                          item.notificationTemplateId,
                          item.message,
                          item.notificationName
                        );
                        this.props.setCurrentNotification(item);
                      }}
                      style={{
                        fontSize: "1.125em",
                        color:
                          this.state.show &&
                            this.state.notificationTemplateId ===
                            item.notificationTemplateId
                            ? "#1890ff"
                            : "black",
                      }}
                      size="30"
                    />
                  </Tooltip>
                )}
            </>
          );
        },
      },
    ];

    return (
      <>
        <div>
          <StyledTable
            columns={columns}
            dataSource={this.props.notificationTemplate}
            scroll={{ y: 200 }}
            // pagination={{
            //   defaultPageSize: 10,
            //   showSizeChanger: true,
            //   pageSizeOptions: ["10", "20", "30", "40", "50"],
            // }}
            pagination={false}
          />
        </div>
        {this.state.show && (
          <div style={{ marginTop: "0.625em", borderTop: "0.0625em solid #adabab" }}>
            <NotificationView
              notificationTemplateId={this.state.notificationTemplateId}
              message={this.state.message}
              notificationName={this.state.notificationName}
              currentNotification={this.props.currentNotification}
            />
          </div>
        )}
      </>
    );
  }
}
const mapStateToProps = ({ rule }) => ({
  notificationTemplate: rule.notificationTemplate,
  currentNotification: rule.currentNotification,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ getNotificationTemplate,setCurrentNotification }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(NotificationTable)

