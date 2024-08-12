import React, { useEffect, useState,useMemo,lazy } from 'react'
import { StyledTable } from '../../../Components/UI/Antd';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
// import { getLeadsTabData,getLeadsDateWise,paidIndicatorLeads,handleStripeModal } from '../LeadsAction';
import dayjs from "dayjs";
import { Tooltip,Button,Input } from "antd";
import SearchIcon from '@mui/icons-material/Search';
import Highlighter from 'react-highlight-words';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import jsPDF from "jspdf";
import "jspdf-autotable";
import {getBillingTable} from "../BillingAction"
import { base_url } from "../../../Config/Auth";
import { BundleLoader } from '../../../Components/Placeholder';
import { Link } from 'react-router-dom';
// import {getCreditInfo} from "../SettingsAction";

function BillingTable (props)  {
    
    useEffect(() => {
        props.getBillingTable(props.userId);  
    }, [])

    const [rowdata, setrowData] = useState({});
    
    const handleRowData = (data) => {
      setrowData(data);
    };
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    
    function handleSearch(selectedKeys, confirm, dataIndex) {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
      }
    
      function handleReset(clearFilters) {
        clearFilters();
        setSearchText("");
      }
    function getColumnSearchProps(dataIndex) {
        return {
          filterDropdown: ({
            setSelectedKeys,
            selectedKeys,
            confirm,
            clearFilters,
            
          }) => (
            <div style={{ padding: 8 }}>
              <Input               
                placeholder={`Search ${dataIndex}`}
                value={selectedKeys[0]}
                onChange={(e) =>
                  setSelectedKeys(e.target.value ? [e.target.value] : [])
                }
                onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                style={{ width: 240, marginBottom: 8, display: "block" }}
              />
              
                <Button
                  type="primary"
                  onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                  // icon={<SearchOutlined />}
                 // icon="search"
                  size="small"
                  style={{ width: 90 }}
                >
                  Search
                </Button>
                <Button
                  onClick={() => handleReset(clearFilters)}
                  size="small"
                  style={{ width: 90 }}
                >
                  Reset
                </Button>
                <Button
                  type="link"
                  size="small"
                  onClick={() => {
                    confirm({ closeDropdown: false });
                    setSearchText(selectedKeys[0]);
                    setSearchedColumn(dataIndex);
                  }}
                >
                  Filter
                </Button>
              
            </div>
          ),
          filterIcon: (filtered) => (
            // <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
            <SearchIcon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
          ),
          onFilter: (value, record) =>
          record[dataIndex]
          ? record[dataIndex]
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase()) : "",
          onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
              // setTimeout(() => this.searchInput.select());
            }
          },
          render: (text) =>
            searchedColumn === dataIndex ? (
              <Highlighter
                highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
                searchWords={[searchText]}
                autoEscape
                textToHighlight={text ? text.toString(): ""}
              />
            ) : (
              text
            ),
        };
      }
    
    const columns = [
        {
            title: "",
            //dataIndex: "logo",
            width:"2%",
        },
        {
          title: "Name",
          //dataIndex: "logo",
          width:"10%",
      },
      {
        title: "Hours",
        //dataIndex: "logo",
        width:"10%",
    },
    {
        title: "Billing Rate",
        //dataIndex: "logo",
        width:"10%",
    },
    {
        title: "Project",
        //dataIndex: "logo",
        width:"10%",
    },
    {
        title: "Customer",
        //dataIndex: "logo",
        width:"10%",
    },
    {
        title: "Sponsor",
        //dataIndex: "logo",
        width:"10%",
    },
    {
        title: "Total Hours",
        //dataIndex: "logo",
        width:"10%",
    },
     
    ]

    if (props.fetchingLeadsTabData) {
      return <BundleLoader/>;
    }
    return (
        <>        
            <StyledTable
                columns={columns}
                 dataSource={props.billingData}
                pagination={false}
            />
        </>
    )
}

const mapStateToProps = ({ billings,auth }) => ({
  billingData:billings.billingData,
  userId: auth.userDetails.userId,
});
const mapDispatchToProps = (dispatch) =>
    bindActionCreators({
       getBillingTable
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(BillingTable);