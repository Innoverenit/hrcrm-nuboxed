import React, { useEffect,lazy,Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BundleLoader } from "../../../Components/Placeholder";
import { StyledTable } from "../../../Components/UI/Antd";
import { getTeamList } from "./TeamsAction";
import APIFailed from "../../../Helpers/ErrorBoundary/APIFailed";
const TeamDetailsView =lazy(()=> import('./TeamDetailsView'));

function TeamsTable(props) {
  useEffect(() => {
    props.getTeamList();
  }, []);

  const columns = [
    { title: "", width: "2%" },
    {
      title: "",
      dataIndex: "imageId",
      width: "10%",
    },
    {
      title: "Name",
      dataIndex: "name",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (name, item, i) => (
        <Suspense fallback={<BundleLoader />}>
        <TeamDetailsView teamId={item.teamId} teamName={item.name} />
        </Suspense>
      ),
    },
    {
      title: "Zone",
      dataIndex: "zoneName",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.zoneName.localeCompare(b.zoneName),
    },
    {
      title: "Area",
      dataIndex: "areaName",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.areaName.localeCompare(b.areaName),
    },
    {
      title: "Management",
      render: (name, item, i) => {
        return {
          children: `${item.managementDetails.firstName || ""} 
            ${item.managementDetails.lastName || ""}`,
        };
      },
      defaultSortOrder: "descend",
    },
    {
      title: "Area Manager",
      render: (name, item, i) => {
        return {
          children: `${item.areaManagerDetails.firstName || ""} 
            ${item.areaManagerDetails.lastName || ""}`,
        };
      },
      defaultSortOrder: "descend",
      sorter: (a, b) => {
        return a.areaManagerDetails.localeCompare(b.areaManagerDetails);
      },
    },
  ];

  if (props.fetchingTeamError) {
    return <APIFailed />;
  }
  const tab = document.querySelector(".ant-layout-sider-children");
  const tableHeight = tab && tab.offsetHeight - 200;

  return (
    <>
      <StyledTable
        rowKey=""
        loading={props.fetchingTeam || props.fetchingTeamError}
        dataSource={props.teamList}
        columns={columns}
        scroll={{ y: tableHeight }}
        pagination={false}
      />
    </>
  );
}

const mapStateToProps = ({ teams, auth }) => ({
  teamList: teams.teamList,
  user: auth.userDetails,
  fetchingTeam: teams.fetchingTeam,
  fetchingTeamError: teams.fetchingTeamError,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getTeamList,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(TeamsTable);
