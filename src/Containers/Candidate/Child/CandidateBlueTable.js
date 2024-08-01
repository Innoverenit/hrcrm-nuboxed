import React, { useEffect, useState, useMemo, lazy } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import InfiniteScroll from "react-infinite-scroll-component";
import { bindActionCreators } from "redux";
import moment from "moment";
import { SearchOutlined } from "@ant-design/icons";
import { StyledTable } from "../../../Components/UI/Antd";
import { Tooltip, Button, Input } from "antd";
import Highlighter from "react-highlight-words";
import {
  MultiAvatar,
  MultiAvatar2,
  SubTitle,
} from "../../../Components/UI/Elements";
import {
  getCandidateListByCategory,
  handleUpdateCandidateModal,
  setEditCandidate,
} from "../CandidateAction";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { getAllSalesList } from "../../Opportunity/OpportunityAction";
import { getRoles } from "../../Settings/Category/Role/RoleAction";
import { CurrencySymbol } from "../../../Components/Common";
import { Link } from 'react-router-dom';
const SkillsLoadMore = lazy(() => import("./CandidateTable/SkillsLoadMore"));
const StatusToggle = lazy(() => import("./CandidateTable/StatusToggle"));
const UpdateCandidateModal = lazy(() => import("./UpdateCandidate/UpdateCandidateModal"));


function onChange(pagination, filters, sorter) {
  console.log("params", pagination, filters, sorter);
}

function CandidateBlueTable(props) {
  const [page, setPage] = useState(0);
  useEffect(() => {
    props.getCandidateListByCategory("blue", page, props.userId);
    setPage(page + 1);
    props.getAllSalesList();
  }, []);

  const [currentCandidateId, setCurrentCandidateId] = useState("");
  const handleLoadMore = () => {
    setTimeout(() => {
      setPage(page + 1);
      props.getCandidateListByCategory(
        "blue",
        page,
        props.currentUser ? props.currentUser : props.userId
      );
    }, 100);
  };
  function handleSetCurrentCandidateId(candidateId) {
    setCurrentCandidateId(candidateId);
    console.log(candidateId);
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
          // setTimeout(() => this.searchInput.select());
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
  const ownerlistType = useMemo(() => {
    if (!props.sales) return [];
    return (
      props.sales.length &&
      props.sales.map((sales) => {
        return {
          text: sales.fullName || "",
          value: sales.fullName,
        };
      })
    );
  }, [props.sales]);

  const roleTypeOption = useMemo(() => {
    if (!props.roles) return [];
    return (
      props.roles.length &&
      props.roles.map((roles) => {
        return {
          text: roles.roleType || "",
          value: roles.roleType,
        };
      })
    );
  }, [props.roles]);

  const {
    candidateByCategory,
    handleUpdateCandidateModal,
    updateCandidateModal,
  } = props;
  const columns = [
    {
      title: "",
      dataIndex: "imageId",
      width: "3%",
      render: (name, item, i) => {
        return (
          <SubTitle>
            <MultiAvatar2
              primaryTitle={item.firstName}
              imageId={item.imageId}
              imageURL={item.imageURL}
              imgWidth={"2.5em"}
              imgHeight={"2.5em"}
            />
          </SubTitle>
        );
      },
    },
    {
      // title: "Name",
      title: <FormattedMessage id="app.name" defaultMessage="Name" />,
      width: "13%",
      ...getColumnSearchProps("name"),
      sorter: (a, b) => {
        var nameA = a.firstName; // ignore upper and lowercase
        var nameB = b.firstName; // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        return 0;
      },
      render: (name, item, i) => {
        const fullName = ` ${item.salutation || ""} ${item.firstName || ""} ${
          item.middleName || ""
        } ${item.lastName || ""}`;
        const currentdate = moment().format("DD/MM/YYYY");
        const date = moment(item.creationDate).format("DD/MM/YYYY");
        console.log(date, currentdate, currentdate === date);
        return (
          <>
                    <Link class="overflow-ellipsis whitespace-nowrap h-8 text-sm p-1 text-[#042E8A] cursor-pointer"  to={`candidate/${item.candidateId}`} title={item.candidateName}>
      {item.fullName}
    </Link>
            {/* <CandidateDetailsView
              candidateId={item.candidateId}
              candidateName={fullName}
            /> */}
            &nbsp;&nbsp;
            {date === currentdate ? (
              <span
                style={{
                  color: "tomato",
                  fontWeight: "bold",
                }}
              >
                New
              </span>
            ) : null}
          </>
        );
      },
    },

    {
      title: "",
      width: "2%",
      render: (name, item, i) => {
        const dataLoc = ` Address : ${
          item.address && item.address.length && item.address[0].address1
        }  Street : ${
          item.address && item.address.length && item.address[0].street
        }   
        State : ${
          item.address && item.address.length && item.address[0].state
        } PostalCode : ${
          item.address && item.address.length && item.address[0].postalCode
        } `;
        return (
          <Tooltip overlayStyle={{ maxWidth: "300px" }} title={dataLoc}>
            <span class=" cursor-pointer">
              <i class="fa fa-map-marker" aria-hidden="true"></i>
            </span>
          </Tooltip>
        );
      },
    },

    {
      // title: "Company",
      title: <FormattedMessage id="app.vendor" defaultMessage="Vendor" />,
      dataIndex: "partnerName",
      width: "10%",
      ...getColumnSearchProps("partnerName"),
    },
    {
      // title: "Status",
      title: <FormattedMessage id="app.role" defaultMessage="Role" />,
      dataIndex: "roleType",
      width: "10%",
      filters: roleTypeOption,

      onFilter: (value, record) => {
        return record.roleType === value;
      },
    },

    {
      title: (
        <FormattedMessage id="app.mobileNumber" defaultMessage="Mobile #" />
      ),
      dataIndex: "mobileNumber",
      width: "10%",
      render: (name, item, i) => {
        return (
          <span>
            {item.countryDialCode} {item.mobileNumber}
          </span>
        );
      },
    },
    {
      title: <FormattedMessage id="app.country" defaultMessage="Country" />,
      dataIndex: "country",
      align: "left",
      sorter: (a, b) => {
        var nameA = a.country; // ignore upper and lowercase
        var nameB = b.country; // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        return 0;
      },
      width: "7%",
    },
    {
      title: <FormattedMessage id="app.skills" defaultMessage="Skills" />,
      // dataIndex: "skillList",
      width: "17%",
      ...getColumnSearchProps("skillList"),
      render: (name, item, i) => {
        const data =
          item.skillList === null
            ? []
            : item.skillList.filter((skill) => {
                return skill !== null && skill !== "";
              });

        return (
          <>
            {item.skillList === [] ? (
              "None"
            ) : (
              <span>
                <SkillsLoadMore skillList={data} />
              </span>
            )}
          </>
        );
      },
    },

    {
      title: <FormattedMessage id="app.cost" defaultMessage="Cost" />,
      dataIndex: "billing",
      align: "left",
      width: "6%",
      render: (name, item, i) => {
        return (
          <>
            <span>
              <CurrencySymbol currencyType={item.currency} />
              {item.billing}
            </span>
          </>
        );
      },
    },
    {
      title: <FormattedMessage id="app.benefits" defaultMessage="Benefits" />,
      dataIndex: "benifit",
      width: "6%",
      render: (name, item, i) => {
        return (
          <>
            <span>
              <CurrencySymbol currencyType={item.currency} />
              {item.benifit}
            </span>
          </>
        );
      },
    },
    {
      title: <FormattedMessage id="app.available" defaultMessage="Available" />,
      dataIndex: "availableDate",
      width: "7%",
      render: (text, item) => {
        const availableDate = moment(item.availableDate).format("ll");
        return (
          <>
            {item.availableDate === null ? (
              "None"
            ) : (
              <span>{moment(item.availableDate).format("l")}</span>
            )}
          </>
        );
      },
    },

    {
      //title: "",
      title: <FormattedMessage id="app.owner" defaultMessage="Owner" />,
      width: "8%",
      filters: ownerlistType,

      onFilter: (value, record) => {
        return record.fullName === value;
      },
      render: (name, item, i) => {
        return (
          <>
            <Tooltip title={item.ownerName}>
              <span>
                <MultiAvatar
                  primaryTitle={item.ownerName}
                  imageId={item.ownerImageId}
                  imageURL={item.imageURL}
                  imgWidth={"2.1em"}
                  imgHeight={"2.1em"}
                />
              </span>
            </Tooltip>
          </>
        );
      },
    },
    {
      title: <FormattedMessage id="app.active" defaultMessage="Active" />,
      width: "6%",
      render: (name, item, i) => {
        return (
          <StatusToggle
            type={props.active ? "primary" : "danger"}
            candidateId={item.candidateId}
            active={item.active}
          />
        );
      },
    },

    {
      title: "",
      dataIndex: "documentId",
      width: "3%",
      render: (name, item, i) => {
        //debugger
        return (
          <span
            style={{ cursor: "pointer" }}
            onClick={() => {
              props.setEditCandidate(item);
              handleUpdateCandidateModal(true);
              handleSetCurrentCandidateId(item.candidateId);
            }}
          >
            <BorderColorIcon style={{ fontSize: "0.8rem" }} />
          </span>
        );
      },
    },
  ];
  const tab = document.querySelector(".ant-layout-sider-children");
  const tableHeight = tab && tab.offsetHeight * 0.75;
  return (
    <>
      <InfiniteScroll
        dataLength={props.candidateByCategory.length}
        next={handleLoadMore}
        hasMore={true}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
        height={600}
      >
        <StyledTable
          rowKey="accountId"
          columns={columns}
          dataSource={candidateByCategory}
          pagination={false}
        />
      </InfiniteScroll>

      <UpdateCandidateModal
        candidateId={currentCandidateId}
        updateCandidateModal={updateCandidateModal}
        handleUpdateCandidateModal={handleUpdateCandidateModal}
        handleSetCurrentCandidateId={handleSetCurrentCandidateId}
      />
    </>
  );
}
// }
const mapStateToProps = ({ candidate, auth, opportunity }) => ({
  candidateByCategory: candidate.candidateByCategory,
  userId: auth.userDetails.userId,
  fetchingCandidatesCategory: candidate.fetchingCandidatesCategory,
  fetchingCandidatesCategoryError: candidate.fetchingCandidatesCategoryError,
  updateCandidateModal: candidate.updateCandidateModal,
  sales: opportunity.sales,
  recruiterName: opportunity.recruiterName,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getCandidateListByCategory,
      handleUpdateCandidateModal,
      setEditCandidate,
      getRoles,
      getAllSalesList,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(CandidateBlueTable);
