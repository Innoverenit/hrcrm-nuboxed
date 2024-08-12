import React, { useEffect, useState,useMemo,lazy } from 'react'
import { StyledTable } from '../../../../../../Components/UI/Antd';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import dayjs from "dayjs";
import { elipsize } from "../../../../../../Helpers/Function/Functions";
import { Tooltip,Button,Input } from "antd";
import SearchIcon from '@mui/icons-material/Search';
import {getCustomerProject,handleCustomerProjectModal,LinkedProjectTask} from "../../../../CustomerAction"
import LinkedCustomerProjectModal from "./LinkedCustomerProjectModal"
import Highlighter from 'react-highlight-words';
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Link } from 'react-router-dom';


function LinkedProject (props)  {
    
    useEffect(() => {
      const {
        customer: { customerId },
        getCustomerProject,
      } = props;
      getCustomerProject(customerId)
         
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
            title: "Name",
            dataIndex: "projectName",
            width:"2%",   
            render: (text, item) => {
             
              return <span
              onClick={() => {
               props.handleCustomerProjectModal(true);
               props.LinkedProjectTask(item.projectId)
                // this.props.setCurrentOpportunityRecruitMentData(item);
              }}
              >
                <Tooltip title={item.projectName}>
                    {elipsize(item.projectName, 20)}
                  </Tooltip>
                </span>;
            },

        },
        {
            title: "Actual Date",
            dataIndex: "logo",
            width:"2%",
            render: (text, item) => {
              const startDate = dayjs(item.actualEndDate).format("ll");
              return <span>{startDate}</span>;
            },
        },
        {
            title: "Onboard Date",
            //dataIndex: "logo",
            width:"2%",
            render: (text, item) => {
              const startDate = dayjs(item.onboardDate).format("ll");
              return <span>{startDate}</span>;
            },
        },
      
     
     
    ]
    return (
        <>        
            <StyledTable
                columns={columns}
               dataSource={props.customerProject}
                pagination={false}
            />
              <LinkedCustomerProjectModal
              customerProjectModal={props.customerProjectModal}
              linkedcustomerProjectTask={props.linkedcustomerProjectTask}
              handleCustomerProjectModal={props.handleCustomerProjectModal}
      
      />
        </>
       
    )
}

const mapStateToProps = ({ customer }) => ({
  customerProject:customer.customerProject,
  customer: customer.customer,
  customerProjectModal:customer.customerProjectModal,
  linkedcustomerProjectTask:customer.linkedcustomerProjectTask
});
const mapDispatchToProps = (dispatch) =>
    bindActionCreators({
      getCustomerProject,
      LinkedProjectTask,
      handleCustomerProjectModal
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LinkedProject);