import React, { Component, useEffect, useState, useMemo, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import moment from "moment";
import InfiniteScroll from "react-infinite-scroll-component";
import { FormattedMessage } from "react-intl";
import { SearchOutlined,
} from '@ant-design/icons';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import { Empty, Tooltip, Input, Button, Avatar } from "antd";
import { StyledTable, StyledPopconfirm } from "../../../../Components/UI/Antd";
import {
  deleteEvent, getEventListRangeByUserId,
  handleUpdateEventModal,
  setEditEvents,
} from "../../EventAction";
import { getEmployeelist } from "../../../Employees/EmployeeAction";
import { getAllSalesList} from "../../../Opportunity/OpportunityAction";
import APIFailed from "../../../../Helpers/ErrorBoundary/APIFailed";
import Highlighter from "react-highlight-words";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { MultiAvatar2, SubTitle } from "../../../../Components/UI/Elements";
const UpdateEventModal = lazy(() => import("../UpdateEventModal"));

function EventTable (props) {
  const [page, setPage] = useState(0);
  useEffect(() => {
    const {
      getEventListRangeByUserId,
          userDetails: { employeeId },
         } = props;
         getEventListRangeByUserId(employeeId,page);
        setPage(page + 1);
        props.getEmployeelist();
    props.getAllSalesList();;
  }, []);
 ;

 const handleLoadMore = () => {
  setTimeout(() => {
    const {
      getEventListRangeByUserId,
          userDetails: { employeeId },
         } = props;
         getEventListRangeByUserId(employeeId,page);
        setPage(page + 1);
        props.getEmployeelist();
    props.getAllSalesList();;
  
  }, 100);

}

 const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

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
            icon={<SearchOutlined />}
            //icon="search"
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
        <SearchOutlined
          type="search"
          style={{ color: filtered ? "#1890ff" : undefined }}
        />
      ),
      onFilter: (value, record) =>
        record[dataIndex]
          .toString()
          .toLowerCase()
          .includes(value.toLowerCase()),
      onFilterDropdownVisibleChange: (visible) => {
        if (visible) {
        }
      },
      render: (text) =>
        searchedColumn === dataIndex ? (
          <Highlighter
            highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text.toString()}
          />
        ) : (
          text
        ),
    };
  }

  function handleSearch(selectedKeys, confirm, dataIndex) {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  }

  function handleReset(clearFilters) {
    clearFilters();
    setSearchText("");
  }

 

 
    const {
      fetchingEventListRangeByUserId,
      fetchingEventListRangeByUserIdError,
      eventListRangeByUserId,
      deleteEvent,
      setEditNoteEvent,
      updateEventModal,
      handleUpdateEventModal,
      userDetails: { employeeId },
    } = props;
    const assignToTypeOption = props.employees.map((item) => {
      return {
        text: item.assignToName,
        value: item.assignToName,
      };
    });
   const ownerlistType = props.sales.map((sales) => {
          return {
            text: sales.fullName || "",
            value: sales.fullName,
          };
        });
    const columns = [
      {
        title: "",
        width: "2%",
      },
      {
        // title: "Type",
        title: <FormattedMessage id="app.type" defaultMessage="Type" />,
        dataIndex: "eventType",
        render: (name, item, i) => {
          return <span>{` ${item.eventType}`}</span>;
        },
        // specify the condition of filtering result
        // here is that finding the name started with `value`
        onFilter: (value, record) => record.eventType.indexOf(value) === 0,
        sorter: (a, b) =>
          a.eventType &&
            a.eventType.toLowerCase() > b.eventType &&
            b.eventType.toLowerCase()
            ? 1
            : -1,
      },
      {
        // title: "Subject",
        title: <FormattedMessage id="app.subject" defaultMessage="Subject" />,
        dataIndex: "eventSubject",
        ...getColumnSearchProps('eventSubject'),
        render: (name, item, i) => {
          return <span>{` ${item.eventSubject || ""}`}</span>;
        },
        onFilter: (value, record) => record.eventSubject.indexOf(value) === 0,
        sorter: (a, b) =>
          a.eventSubject &&
            a.eventSubject.toLowerCase() > b.eventSubject &&
            b.eventSubject.toLowerCase()
            ? 1
            : -1,
      },
      {
        // title: "Start",
        title: <FormattedMessage id="app.start" defaultMessage="Start" />,
        dataIndex: "startDate",
        width: "12%",
        defaultSortOrder: "descend",
        render: (name, item, i) => {
          return <span>{` ${moment(item.startDate).format("llll")}`}</span>;
        },
        // sorter: (a, b) => {
        //   var startDateA = a.startDate;
        //   var startDateB = b.startDate;
        //   return moment.utc(startDateA).diff(moment.utc(startDateB));
        // },
      },
      {
        // title: "Contact",
        title: <FormattedMessage id="app.team" defaultMessage="Team" />,
        dataIndex: "candidateName",
        width: "7%",
        ...getColumnSearchProps('candidateName'),
        render: (name, item, i) => {
          return (
            <>
              {/* <Tooltip title={item.candidateName}> */}
                <span>
                {item.candidateName === null ? (
                ""
              ) : (
                  <MultiAvatar2
                    primaryTitle={item.candidateName}
                    imageId={item.ownerImageId}
                    imageURL={item.imageURL}
                    imgWidth={"1.8em"}
                    imgHeight={"1.8em"}
                  />
              )}
                </span>
              {/* </Tooltip> */}

            </>
          );
        },
      },
      {
        title: <FormattedMessage id="app.included" defaultMessage="Include" />,
        dataIndex: "included",
        width: "10%",
        render: (name, item, i) => {
          return (
            <>
                <Avatar.Group
                   maxCount={7}
                  maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
                >
                {item.included &&
                  item.included.map((candidate, i) => {
                     const data1 = candidate.fullName
                     .slice(0,2)
                     .split("")[0]
                     .toUpperCase();
                   console.log("datas", data1);
                    return (
                      <Avatar style={{ backgroundColor: "#f56a00" }}>
                      {data1}
                    
                    </Avatar>
                     

                   
                    );
                  })}
            </Avatar.Group>
            </>
          )
        },
      },
      {
        title: "",
        dataIndex: "completionInd",
        width: "3%",
        render: (text, item) => {
          return (
            <>
              {item.completionInd === false ? (
                <CheckCircleIcon 
               
                  style={{
                    color: "#eeeedd",
                    fontSize: "1.5em"
                  }} />
              ) : (
                <span><CheckCircleIcon 
                  style={{ color: "#67d239", fontSize: "1.5em" }} />
                </span>
              )}</>);
        },
      },
      {
        title: "",
        dataIndex: "rating",
        width: "5%",
        render: (name, item, i) => {
          return (
            <>
              {item.rating === 0 ? (<StarBorderIcon
                style={{ color: "#eeeedd", fontSize: "1.5em" }} />)
                : (
                  <span>
                    {item.rating}{<StarBorderIcon 
                      style={{ color: "#FFD700", fontSize: "1.5em" }} />}
                  </span>)}
            </>
          );
        },
      },
      {
        title: (
          <FormattedMessage id="app.assignedTo" defaultMessage="Assigned" />
        ),
        dataIndex: "assignedToName",
        width: "10%",
        filters: assignToTypeOption,
        onFilter: (value, record) => {
          return record.assignedTo === value;
        },
        render: (name, item, i) => {
          return (
            <Tooltip title={item.assignedToName}>
              <SubTitle>
                <MultiAvatar2
                  primaryTitle={item.assignedToName}
                  imageId={item.imageId}
                  imageURL={item.imageURL}
                  imgWidth={"1.8em"}
                  imgHeight={"1.8em"}
                />
              </SubTitle>
             </Tooltip>
          );
        },
      },
      {
        title: "Owner",
        dataIndex: "woner",
        width: "7%",
        filters:ownerlistType,
        onFilter: (value, record) => {
          return record.fullName === value;
        },
        render: (name, item, i) => {
          return (
            <>
              {/* <Tooltip title={item.woner}> */}
                <span>
                  <MultiAvatar2
                    primaryTitle={item.woner}
                    imageId={item.ownerImageId}
                    imageURL={item.imageURL}
                    imgWidth={"1.8em"}
                    imgHeight={"1.8em"}
                  />
                </span>
              {/* </Tooltip> */}

            </>
          );
        },

      },

      {
        title: "",
        dataIndex: "documentId",
        width: "2%",
        render: (name, item, i) => {
          //debugger
          return (
            <Tooltip title="Edit">
              <BorderColorIcon 
                type="edit"
                style={{ cursor: "pointer", fontSize:"0.8rem"}}
                onClick={() => {
                  props.setEditEvents(item);
                  handleUpdateEventModal(true);
                }}
              />
            </Tooltip>
          );
        },
      },

      {
        title: "",
        dataIndex: "eventId",
        render: (name, item, i) => {
          return (
            <StyledPopconfirm
              // title="Do you want to delete?"
              title={<FormattedMessage id="app.doyouwanttodelete" defaultMessage="Do you want to delete" />}
              onConfirm={() => deleteEvent(item.eventId, employeeId)}
            >
              <DeleteIcon  type="delete" style={{ cursor: "pointer",color:"red",fontSize:"0.8rem" }} />
            </StyledPopconfirm>
          );
        },
      },
    ];

    // if (fetchingEventListRangeByUserIdError) {
    //   return <APIFailed />;
    // }
    const tab = document.querySelector(".ant-layout-sider-children");
    const tableHeight = tab && tab.offsetHeight * 0.75;
    return (
      <>
        <InfiniteScroll
                dataLength={eventListRangeByUserId.length}
                next={handleLoadMore}
                hasMore={true}
                // loader={<h4 style={{ textAlign: 'center' }}>Loading...</h4>}
                endMessage={
                    <p style={{ textAlign: 'center' }}>
                        <b>Yay! You have seen it all</b>
                    </p>
                }
                height={600}
            >
        <StyledTable
          // rowSelection={rowSelection}
          rowKey="eventId"
          columns={columns}
          dataSource={eventListRangeByUserId}
          loading={
            fetchingEventListRangeByUserId ||
            fetchingEventListRangeByUserIdError
          }
          pagination={false
          }
          expandedRowRender={(record) => {
            return (
              <>
                <p>{record.eventDescription || ""}</p>
              </>
            );
          }}
          locale={{
            emptyText: (
              <Empty
                description={
                  <NoDataComponent
                    description="No events "
                    buttonText="Create event"
                  />
                }
              />
            ),
          }}
        />
        </InfiniteScroll>
        <UpdateEventModal
          updateEventModal={updateEventModal}
          handleUpdateEventModal={handleUpdateEventModal}
        />
      </>
    );
  }

const mapStateToProps = ({ auth, event, employee,opportunity}) => ({
  userDetails: auth.userDetails,
  fetchingEventListRangeByUserId: event.fetchingEventListRangeByUserId,
  fetchingEventListRangeByUserIdError:
    event.fetchingEventListRangeByUserIdError,
  eventListRangeByUserId: event.eventListRangeByUserId,
  updateEventModal: event.updateEventModal,
  employees: employee.employees,
  sales: opportunity.sales,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getEventListRangeByUserId,
      deleteEvent,
      handleUpdateEventModal,
      setEditEvents,
      getEmployeelist,
      getAllSalesList,

    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(EventTable);
function NoDataComponent(props) {
  const { description, onClick, buttonText } = props;
  return (
    <div>
      <div class=" flex flex-col items-center justify-center"
      >
        <p>{description || "We couldn't find relevant data"}</p>
      </div>
    </div>
  );
}