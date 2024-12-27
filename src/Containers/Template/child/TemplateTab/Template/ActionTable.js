import React, { useEffect, useState ,useMemo} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Icon, Input, Button, message } from "antd";
import Highlighter from 'react-highlight-words';

import {
  StyledTable,
  StyledPopconfirm,
} from "../../../../../Components/UI/Antd";


import { getActionTable } from "../../../../../Containers/Rules/RulesAction";
import dayjs from "dayjs";



class ActionTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      message: "",
    };
  }
  componentDidMount() {
    this.props.getActionTable(this.props.orgId);
  }

  render() {
    const columns = [
      { title: "", width: "2%" },

      { title: "Name",
       dataIndex: "actionName",
        width: "30%"
       },
      { title: "Description",
       //dataIndex: "description", 
       width: "40%"
       },

      {
        title: "Created on",
      
        width: "15%",
     
      },

    
    ];

    return (
      <>
        <div>
          <StyledTable
            columns={columns}
            dataSource={this.props.ActionId}
            scroll={{ y: 200 }}
            pagination={false}
          />
        </div>
      </>
    );
  }
}

    

const mapStateToProps = ({ rule,auth }) => ({
  ActionId:rule.ActionId,
  userId: auth.userDetails.userId,
  user: auth.userDetails,
  orgId: auth.userDetails.organizationId,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ getActionTable}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ActionTable)

