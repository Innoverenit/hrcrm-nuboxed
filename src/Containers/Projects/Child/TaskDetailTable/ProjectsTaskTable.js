import React, { useEffect, useState,useMemo,lazy } from 'react'
import { StyledTable } from '../../../../Components/UI/Antd';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import moment from "moment";
import { Tooltip,Button,Input,Avatar } from "antd";
import SearchIcon from '@mui/icons-material/Search';
import {getProjectsTaskListById} from "../../ProjectsAction"
import Highlighter from 'react-highlight-words';
import jsPDF from "jspdf";
import "jspdf-autotable";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
 SearchOutlined, 
 MailOutlined 
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { MultiAvatar } from "../../../../Components/UI/Elements";
import { FormattedMessage } from 'react-intl';
const ButtonGroup = Button.Group;

function ProjectsTaskTable (props)  {

  useEffect(() => {
    props.getProjectsTaskListById(props.projectsById.projectId);  
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
        width:"2%",    
    },
    {
      title: "",
      dataIndex: "priority",
      width:"4%",
      render: (text, item) => { 
        return (
          <div>
            {item.priority === "High" && (
              <div
                style={{
                  borderRadius: "50%",
                  height: "2.1875em",
                  width: "2.1875em",
                  backgroundColor: "red",
                }}
              >
              </div>
            )} 
            {item.priority === "Medium" && (
              <div
                style={{
                  borderRadius: "50%",
                  height: "2.1875em",
                  width: "2.1875em",
                  backgroundColor: "orange",
                }}
              ></div>
            )}
            {item.priority === "Low" && (
              <div
                style={{
                  borderRadius: "50%",
                  height: "2.1875em",
                  width: "2.1875em",
                  backgroundColor: "teal",
                }}
              >
          </div>  
            )}
          </div>
        );
      },

    },
    {
      title: "Type",
      dataIndex: "taskType",
      width:"6%",
  },
  {
    title: "Name",
    ...getColumnSearchProps("taskName"), 
    dataIndex: "taskName",
    width:"12%",

  },
        {
          title: "Assigned on",
          dataIndex: "",
          width:"8%",
          render: (text, item) => {
            
            return <span>{` ${moment(item.assignedOn).format("ll")}`}</span>;
          },
        },
        {
          title: "Assigned",
          //title: <FormattedMessage id="app.assignedon" defaultMessage="Assigned on" />,
          dataIndex: "assignedToName",
          width:"8%",
          render: (text, item) => {
            return <span>
              {/* {` ${data.taskType}`} */}
              <MultiAvatar
                      primaryTitle={item.assignedToName}
                      // imageId={item.ownerImageId}
                      // imageURL={item.imageURL}
                      imgWidth={"1.8em"}
                      imgHeight={"1.8em"}
                    />
              </span>;
          },
        
        },
        {
          title: "Team",
          //title: <FormattedMessage id="app.talent" defaultMessage="Talent" />,
          dataIndex: "candidateName",
          width:"10%",
          render: (text, item) => {
            return <span>
             
             
                        <Avatar.Group
                      maxCount={2}
                      maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
                    >
                      {item.candidates &&
                        item.candidates.map((candidate, i) => {
                          const data1 = candidate.candidateName
                             .slice(0,2)
                            // .split("")[0]
                            // .toUpperCase();
                          console.log("datas", data1);
                          return (
                            <Tooltip title={candidate.candidateName}>
                              <Avatar style={{ backgroundColor: "#94b3e4" }}>
                                {data1}
                              </Avatar>
                            </Tooltip>
                          );
                        })}
                     
                    </Avatar.Group>
  
              </span>;
          },
        },

        {
          title: "Start",
          //title: <FormattedMessage id="app.start" defaultMessage="Start" />,
          dataIndex: "startDate",
          width:"8%",
         render: (text, item) => {
           const date= ` ${moment(item.startDate).format("ll")}`
            return <span>
  {date}
              </span>;
          },
  
        },
        {
          title: "End",
          //title: <FormattedMessage id="app.end" defaultMessage="End" />,
          dataIndex: "endDate",
          width:"8%",
          render: (text, item) => {
             const data2= ` ${moment(item.endDate).format("ll")}`
            return <span>
              {data2}

              </span>;
          },
  
        },
        // {
        //   title: "Status",
        //   dataIndex: "taskStatus",
        //   width:"5%",
        //   render: (text, item) => {
        //     return (
            
        //       <ButtonGroup>
        //         {item.complitionStatus === "To Start" && (
        //           <StatusIcon
        //             type="To Start"
        //             iconType="fa-hourglass-start"
        //             tooltip="To Start"
        //              color="blue"
        //           />
        //         )}
        //         {item.complitionStatus === "In Progress" && (
        //           <StatusIcon
        //             type="In Progress"
        //             iconType="fa-hourglass-half"
        //             tooltip="In Progress"
        //           />
        //         )}
        //         {item.complitionStatus === "completed" && (
        //           <StatusIcon
        //             type="Completed"
        //             iconType="fa-hourglass"
        //             tooltip="Completed"
        //           />
        //         )}
        //       </ButtonGroup> 
            
             
             
              
        //     );
        //   },
        // },

        {
          title: "",
          dataIndex: "Completed",
          width:"10%",
          render: (text, item) => {
            return (
              <span>
                {item.taskStatus === "Completed" && !item.approvedInd ? (
                  <>
                    <div>
                      <Button
                        // onClick={() => approveTaskByTaskId(item.taskId)}
                        style={{ backgroundColor: "teal", color: "white" }}
                      >
                        {/* Approve */}
                        <FormattedMessage id="app.approve" defaultMessage="Approve" />
                      </Button>
                      <Button
                        style={{
                          backgroundColor: "rgb(233, 79, 79)",
                          color: "white",
                        }}
                        // onClick={() => rejectTaskByTaskId(item.taskId)}
                      >
                        {/* Reject */}
                        <FormattedMessage id="app.reject" defaultMessage="Reject" />
                      </Button>
                    </div>
                  </>
                ) : (
                    <>
                      {item.approvedInd === "Approved" ? (
                        <CheckCircleOutlined
                          type="check-circle"
                          theme="twoTone"
                          twoToneColor="#52c41a"
                          size={140}
                          style={{ fontSize: "1.5625em" }}
                        />
                      ) : item.approvedInd === "Rejected" ? (
                        <CloseCircleOutlined
                          type="close-circle"
                          theme="twoTone"
                          twoToneColor="red"
                          size={140}
                          style={{ fontSize: "1.5625em" }}
                        />
                      ) : (
                            <></>
                          )}
                    </>
                  )}
              </span>
            );
          },
        },
     
    ]
    return (
        <>        
            <StyledTable
                columns={columns}
               dataSource={props.taskProject}
                pagination={false}
                scroll={{ y: 500 }}
            />
  
        </>
       
    )
}

const mapStateToProps = ({ projects }) => ({
  taskProject:projects.taskProject,
  projectsById: projects.projectsById,
});
const mapDispatchToProps = (dispatch) =>
    bindActionCreators({
        getProjectsTaskListById,
    }, dispatch);


    export default connect(mapStateToProps, mapDispatchToProps)(ProjectsTaskTable);

    function StatusIcon({ type, iconType, tooltip, status, size, onClick, role }) {
      const start = type;
      console.log(start);
      //////debugger;
      if (status === type) {
        size = "1.875em";
      } else {
        size = "1em";
      }
      return (
        <Tooltip title={tooltip}>
          <Button
            ghost={status !== type}
            style={{
              padding: "0.375em",
              borderColor: "transparent",
              color: type === "Completed" ? "green" : "orange",
            }}
            onClick={onClick}
          >
            <i className={`fas ${iconType}`} style={{ fontSize: "1.375em" }}></i>
          </Button>
        </Tooltip>
      );
    }