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
import { getCommissionTable,setEditCommission, handleCommission} from "../../../../Settings/SettingsAction";
// import CommissionUpdateModal from "./CommissionUpdateModal";
import dayjs from "dayjs";

 function CommissionTable (props) {
    useEffect(()=> {
        props.getCommissionTable(props.orgId,"sales");
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
            },
            {
                title: "Amount",
                dataIndex: "commissionPrice",
                // width: "13%",
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
                
                    <StyledTable
                        rowKey=""
                         columns={columns}
                        dataSource={props.tableCommission}
                     loading={props.fetchingCommissionTable||props.fetchingCommissionTableError}
                        // scroll={{ y: 320 }}
                         pagination={false}
                    // defaultPageSize: 30,
                    // showSizeChanger: true,
                    // pageSizeOptions: ["30", "40", "50"],
                    />
               
                {/* <CommissionUpdateModal
                    commissionUpdateModal={commissionUpdateModal}
                    handleCommission={handleCommission}
                /> */}
            </>
        );
    
}

const mapStateToProps = ({ settings,auth }) => ({
    tableCommission:settings.tableCommission,
    fetchingCommissionTable:settings.fetchingCommissionTable,
    fetchingCommissionTableError:settings.fetchingCommissionTableError,
    orgId:auth.userDetails.organizationId,
    fetchingCommission:settings.fetchingCommission,
    fetchingCommissionError:settings.fetchingCommissionError,
    // updateCommissionModal:settings.updateCommissionModal,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getCommissionTable,

        },
         dispatch

    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CommissionTable);
