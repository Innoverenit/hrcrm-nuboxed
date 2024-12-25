import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledTable } from "../../../../../Components/UI/Antd";
import {getScheduler,deleteReportSchedulerInternalData} from "../../../SettingsAction";
import { Popconfirm } from "antd";
import DeleteIcon from '@mui/icons-material/Delete';

function SchedulerTable(props) {
  useEffect(()=>{
    console.log(props.departmentId)
    props.getScheduler(props.departmentId)
},[])

const {
  deleteReportSchedulerInternalData,
 
} = props;

  const columns = [
    {
      title: "Report Scheduler",
      dataIndex: "type",
     width: "30%",
    },
  

    {
      title: "Frequency",
      dataIndex: "frequency",
      width: "30%",
    },
    {
      title: "",
      width: "2%",
      render: (name, item, i) => {
        return (
          <Popconfirm
            title="Do you want to delete?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => deleteReportSchedulerInternalData(item.reportSchedulingId
              )}
          >
            <DeleteIcon
            type="delete" style={{ cursor: "pointer", color: "red" }} />
          </Popconfirm>
        );
      },
    },
  ]
 
  return (
    <>
      <StyledTable
        columns={columns}
        dataSource={props.scheduler}
        loading={
          props.fetchingScheduler ||
          props.fetchingSchedulerError
        }
        pagination={false}
        scroll={{ y: 240 }}
        onChange={console.log("task onChangeHere...")}
      />
      
    </>
  );
}

const mapStateToProps = ({  auth,settings }) => ({
  // departmentId:settings. departmentList.departmentId,
  scheduler: settings.scheduler,   
  fetchingScheduler: settings.fetchingScheduler,
  fetchingSchedulerError: settings.fetchingSchedulerError,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {   
      getScheduler, 
      deleteReportSchedulerInternalData, 
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SchedulerTable);
