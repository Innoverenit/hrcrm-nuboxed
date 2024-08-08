import React, { useEffect, useState, useMemo, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  getProjectTaskTable,
  handleUpdateProjectTaskModal,
  addProjectTask,
} from "../TaskAction";
import dayjs from "dayjs";
import { StyledTable } from "../../../Components/UI/Antd";
import { Tooltip, Button, Input, Select } from "antd";
const UpdateProjectTaskModal = lazy(() => import("./UpdateProjectTaskModal"));

function ProjectTaskTable(props) {
  useEffect(() => {
    props.getProjectTaskTable(props.userId, props.data.taskId);
  }, []);

  const [currentItem, setCurrentItem] = useState("");
  const [name, setName] = useState("");

  const [data1, setData1] = useState({});

  function handleSet( inputData, hourId) {
    setData1(
       inputData,
     
    );
  }
  console.log(data1);
  function handleDescription(textData){
    setName(textData);
    console.log(textData)
}
console.log(name)

// console.log(name)
  function handleClick(hourId,) {
    // console.log(data1);
    console.log(data1);
    let data={
      aproveUnit:data1,
      remark:name,
      hourId:hourId,
    }
    props.addProjectTask(data);
  }

  function handleSetCurrentItem(item) {
    setCurrentItem(item);
  }

  console.log("Task2", props.data.taskId);

  const columns = [
    {
      title: "CandidateName",
      width: "15%",
      dataIndex: "candidateName",
    },

    {
      title: "Unit",
      width: "15%",
      dataIndex: "completeUnit",
    },

    {
      title: "Task",
      width: "15%",
      dataIndex: "taskName",
    },

    {
      title: "Creation Date",
      width: "15%",
      render: (text, item) => {
        const startDate = dayjs(item.creationDate).format("ll");
        return <span>{startDate}</span>;
      },
    },
    {
      title: "Start Date",
      width: "15%",
      render: (text, item) => {
        const PlannerDate = dayjs(item.plannerStartDate).format("ll");
        return <span>{PlannerDate}</span>;
      },
    },

    {
      title: "Input",
      key: "hourId",
      width: "8%",
      render: (name, item) => {
        return (
          <>
            <div class=" flex justify-between">
              <div class="w-24">
                <Input
              defaultValue={item.aproveUnit}
                  placeholder="Approve Unit"
                   onChange={(e) => handleSet(e.target.value, item.hourId)}
                />
              </div>
              <div class="  w-24">
                <Input
                  placeholder="Description"
                   defaultValue={item.remark}
                    onChange={(e) => handleDescription(e.target.value )}
                />
                {/* {data1 && ( */}
                  <Button type="primary" 
                  onClick={()=>{
                    handleClick(
                      item.hourId,
                     
                      )
                  }}
                  >
                    Approve
                  </Button>
                 {/* )}  */}
              </div>
            </div>
          </>
        );
      },
    },


    
  ];

  const tab = document.querySelector(".ant-layout-sider-children");
  const tableHeight = tab && tab.offsetHeight * 0.75;
  return (
    <>
      <StyledTable
        rowKey="hourId"
        columns={columns}
        dataSource={props.projectTaskTable}
        pagination={false}
      />

      <UpdateProjectTaskModal
        item={currentItem}
        updateProjectTaskModal={props.updateProjectTaskModal}
        handleUpdateProjectTaskModal={props.handleUpdateProjectTaskModal}
      />
    </>
  );
}
// }
const mapStateToProps = ({
  auth,
  customer,
  task,
  sector,
  opportunity,
  employee,
}) => ({
  projectTaskTable: task.projectTaskTable,
  userId: auth.userDetails.userId,
  updateProjectTaskModal: task.updateProjectTaskModal,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getProjectTaskTable,
      handleUpdateProjectTaskModal,
      addProjectTask,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(ProjectTaskTable);
