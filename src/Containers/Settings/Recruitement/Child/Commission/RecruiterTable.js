
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import { InputNumber, Popconfirm, Form, Input, Typography, Button, Space, DatePicker } from 'antd';

import { StyledModal, StyledTable } from "../../../../../Components/UI/Antd";
import { getRecruiterTable} from "../../../../Settings/SettingsAction";
import dayjs from "dayjs";

function RecruiterTable (props) {
    
    useEffect(() => {
        props.getRecruiterTable(props.orgId,"recruiter");
    },[]);
        const columns = [
            {
                title: "",
                width: "5%",
            },
            {
                title: "Name",
                dataIndex: "comPersion",
                // width: "13%",
                //editable: true,
            },
            
            {
                title: "Amount",
                dataIndex: "commissionPrice",
                // width: "13%",
                //editable: true,
                render: (name, item, i) => {        
                    return (
                      <>
                        {item.commissionPrice} {item.currency} 
                        {/* <span>
                        <CurrencySymbol currencyType={item.currency} />
                        {item.proposalAmount}
                      </span> */}
                      </>
                    );
                  },
            },
            // {
            //     title: "Currency",
            //     dataIndex: "currency",
            //     // width: "13%",
            // },
            {
                title: "Frequency",
                dataIndex: "calculatedOn",
                // width: "13%",
            },

        
        ];

        // if (this.props.fetchingOrderError) {
        //   return <APIFailed />
        // }

        return (
            <>
                {true && (
                    <StyledTable
                        // rowKey=""
                        columns={columns}
                         dataSource={props.tableRecruiter}
                        // loading={this.props.fetchingRecruiter}
                        scroll={{ y: 320 }}
                        pagination={false}
                    // defaultPageSize: 30,
                    // showSizeChanger: true,
                    // pageSizeOptions: ["30", "40", "50"],
                    />
                )}
             
            </>
        );
    
}

const mapStateToProps = ({ settings,auth }) => ({
    tableRecruiter:settings.tableRecruiter,
    fetchingRecruiterTable:settings.fetchingRecruiterTable,
    fetchingRecruiterTableError:settings.fetchingRecruiterTableError,
    orgId:auth.userDetails.organizationId,
    fetchingRecruiter:settings.fetchingRecruiter,
    fetchingRecruiterError:settings.fetchingRecruiterError,
 
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getRecruiterTable,
         
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RecruiterTable);
