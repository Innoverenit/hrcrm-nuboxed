import React, { useEffect, useState, useMemo } from "react";
import { StyledPopconfirm, StyledTable } from "../../../../Components/UI/Antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import moment from "moment";
import ExploreIcon from "@mui/icons-material/Explore";
import { getSectors } from "../../../Settings/Sectors/SectorsAction";
import { MultiAvatar, SubTitle } from "../../../../Components/UI/Elements";
import "jspdf-autotable";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Highlighter from "react-highlight-words";
import DeleteIcon from "@mui/icons-material/Delete";
// import { getCountries } from "../../../Auth/AuthAction";
import {
  getLeads,
  deleteLeadsData,
  setEditLeads,
  handleUpdateLeadsModal,
  handleLeadsEmailDrawerModal,
  getLeadDetailsById,
} from "../../../Leads/LeadsAction";
import { MailOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Tooltip, Input } from "antd";
import StatusCustomerToggle from "./StatusCustomerToggle";
import { FormattedMessage } from "react-intl";
import styled from "styled-components";
import LeadsDetailView from "./LeadsDetailView";
import UpdateLeadsModal from "../UpdateLeads/UpdateLeadsModal";
import AddLeadsEmailDrawerModal from "../UpdateLeads/AddLeadsEmailDrawerModal";
import { BundleLoader } from "../../../../Components/Placeholder";
import BorderColorIcon from "@mui/icons-material/BorderColor";

const LeadsTable = (props) => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  useEffect(() => {
    props.getLeads(props.userId);
    props.getSectors();
    // props.getCountries();
  }, []);

  const [currentLeadsId, setCurrentLeadsId] = useState("");

  function handleSetCurrentLeadsId(item) {
    setCurrentLeadsId(item);
    console.log(item);
  }
  const { deleteLeadsData, handleUpdateLeadsModal, updateLeadsModal } = props;

  const sectorsNameOption = props.sectors.map((item) => {
    return {
      text: item.sectorName,
      value: item.sectorName,
    };
  });

  // const CountryTypeOption = props.countries.map((item) => {
  //   return {
  //     text: item.countryAlpha3Code || "",
  //     value: item.countryAlpha3Code,
  //   };
  // });

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
  const { fetchingLeads } = props;
  if (fetchingLeads) {
    return <BundleLoader />;
  }
  const columns = [
    {
      title: "",
      dataIndex: "imageId",
      width: "3%",
      render: (name, item, i) => {
        return (
          <SubTitle>
            <MultiAvatar
              primaryTitle={item.name}
              imageId={item.imageId}
              imageURL={item.imageURL}
              imgWidth={"1.8em"}
              imgHeight={"1.8em"}
            />
          </SubTitle>
        );
      },
    },
    {
      title: <FormattedMessage id="app.name" defaultMessage="Name" />,
      dataIndex: "",
      width:"10%",
    },
    {
      title: <FormattedMessage id="app.phome" defaultMessage="Phone #" />,
      dataIndex: "phone",
      width:"10%",
    },
    {
      //title: "Name",
      title: <FormattedMessage id="app.company" defaultMessage="Company" />,
      dataIndex: "name",
      ...getColumnSearchProps("name"),
      width: "19%",
      render: (name, item, id) => {
        const currentdate = moment().format("DD/MM/YYYY");
        const date = moment(item.creationDate).format("DD/MM/YYYY");
        return (
          <>
            <LeadsDetailView leadsId={item.leadsId} name={item.name} />
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
      width: "2%",
      render: (name, item, i) => {
        return (
          <>
            {item.url !== null ? (
              <Tooltip title={item.url}>
                <span
                  //type="edit"
                  style={{ cursor: "pointer" }}
                  onClick={() => {}}
                >
                  {" "}
                  <a href={`item.url`} target="_blank">
                    <ExploreIcon
                      style={{ cursor: "pointer", color: "green" ,fontSize: "0.8rem",}}
                    />
                  </a>
                </span>
              </Tooltip>
            ) : null}
          </>
        );
      },
    },
    

    {
      //title: "Group",
      title: <FormattedMessage id="app.sector" defaultMessage="Sector" />,
      dataIndex: "sector",
      width: "13%",

      filters: sectorsNameOption,
      onFilter: (value, record) => {
        return record.sector === value;
      },
    },
    {
      //title: "Email",
      title: <FormattedMessage id="app.country" defaultMessage="Country" />,
      dataIndex: "country",
      width: "7%",
      filters: CountryTypeOption,
      onFilter: (value, record) => {
        return record.country === value;
      },
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
    },
    {
      title: "Assigned",
      dataIndex: "assignedTo",
      width: "10%",
      render: (name, item, i) => {
        return (
          <>
            <span>
              {item.assignedTo === null ? (
                "None"
              ) : (
                <MultiAvatar
                  primaryTitle={item.assignedTo}
                  imgWidth={"1.8em"}
                  imgHeight={"1.8em"}
                />
              )}
            </span>
          </>
        );
      },
    },

    {
      title: <FormattedMessage id="app.owner" defaultMessage="Owner" />,
      dataIndex: "ownerName",
      width: "7%",
      filters: ownerlistType,
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
      title: (
        <FormattedMessage
          id="app.qualified"
          defaultMessage="Qualified"
        />
      ),

      width: "12%",
      render: (name, item, i) => {
        return (
          <StatusCustomerToggle
            type={props.convertInd ? "primary" : "danger"}
            leadsId={item.leadsId}
            convertInd={item.convertInd}
          />
        );
      },
    },
   
    {
      title: "",
      width: "2%",
      render: (name, item, i) => {
        const dataLoc = ` Address : ${
          item.address && item.address.length && item.address[0].address1
        } 
             Street : ${
               item.address && item.address.length && item.address[0].street
             }   
            State : ${
              item.address && item.address.length && item.address[0].state
            }
           Country : ${
             (item.address && item.address.length && item.address[0].country) ||
             ""
           } 
             PostalCode : ${
               item.address && item.address.length && item.address[0].postalCode
             } `;
        return (
          <Tooltip
            overlayStyle={{ maxWidth: "300px" }}
            title={dataLoc}
          >
            <span
              style={{
                cursor: "pointer",
              }}
            >
             <LocationOnIcon   style={{
                cursor: "pointer",
                fontSize: "0.8rem"
              }}/>
            </span>
          </Tooltip>
        );
      },
    },
    {
      width: "2%",
      render: (name, item, i) => {
        //debugger

        return (
          <>
            <Tooltip title={item.email}>
              <MailOutlineIcon
                type="mail"
                style={{ cursor: "pointer",fontSize:"0.8rem"  }}
                onClick={() => {
                  handleSetCurrentLeadsId(item);
                  props.handleLeadsEmailDrawerModal(true);
                }}
              />
            </Tooltip>
          </>
        );
      },
    },

    {
      title: "",
      // dataIndex: "id",
      width: "2%",
      render: (name, item, i) => {
        return (
          <StyledPopconfirm
            title="Do you want to delete?"
            onConfirm={() => deleteLeadsData(item.leadsId)}
          >
            {/* {user.opportunityDeleteInd ===true && ( */}
            <DeleteIcon
              type="delete"
              style={{ cursor: "pointer", color: "red" ,fontSize: "0.8rem",}}
            />
            {/* )} */}
          </StyledPopconfirm>
        );
      },
    },

    {
      title: "",
      dataIndex: "documentId",
      width: "2%",

      render: (name, item, i) => {

        return (
          <>
            {/* {props.user.customerUpdateInd === true && ( */}

            <span
              style={{ cursor: "pointer" }}
              onClick={() => {
                props.setEditLeads(item);
                handleUpdateLeadsModal(true);
                handleSetCurrentLeadsId(item);
              }}
            >
              <BorderColorIcon style={{ fontSize: "0.8rem",}} />
            </span>
            {/* )} */}

            {/* }  */}
          </>
        );
      },
    },
  ];

  return (
    <>
      <StyledTable
        columns={columns}
        loading={props.fetchingLeads}
        dataSource={props.leadsAllData}
        pagination={false}
      />

      <UpdateLeadsModal
        item={currentLeadsId}
        updateLeadsModal={updateLeadsModal}
        handleUpdateLeadsModal={handleUpdateLeadsModal}
        handleSetCurrentLeadsId={handleSetCurrentLeadsId}
      />
      <AddLeadsEmailDrawerModal
        item={currentLeadsId}
        handleSetCurrentLeadsId={handleSetCurrentLeadsId}
        addDrawerLeadsEmailModal={props.addDrawerLeadsEmailModal}
        handleLeadsEmailDrawerModal={props.handleLeadsEmailDrawerModal}
      />
    </>
  );
};

const mapStateToProps = ({ auth, leads, sector }) => ({
  leadsAllData: leads.leadsAllData,
  userId: auth.userDetails.userId,
  lead: leads.lead,
  countries: auth.countries,
  sectors: sector.sectors,
  updateLeadsModal: leads.updateLeadsModal,
  addDrawerLeadsEmailModal: leads.addDrawerLeadsEmailModal,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getLeads,
      getSectors,
      deleteLeadsData,
      setEditLeads,
      handleUpdateLeadsModal,
      handleLeadsEmailDrawerModal,
      getLeadDetailsById,
      // getCountries,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(LeadsTable);
const AppIcon = (props) => (
  <i
    className={`fas fa-heartbeat ${props.className}`}
    style={{ fontSize: "123%" }}
  ></i>
);

const PulseIcon = styled(AppIcon)`
  color: #df9697;
  &:hover {
    // background: yellow;
    color: blue;
  }
`;

const AppIcon1 = (props) => (
  <BorderColorIcon 
 />
);

const EditIcon1 = styled(AppIcon1)`
  color: black;
  &:hover {
    // background: yellow;
    color: blue;
  }
`;
