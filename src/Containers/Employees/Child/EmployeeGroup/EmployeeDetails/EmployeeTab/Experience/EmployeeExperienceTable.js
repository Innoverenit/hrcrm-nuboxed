import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledTable } from '../../../../../../../Components/UI/Antd';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {  getTopicsByUserId } from "../../../../../../Employees/EmployeeAction";
import { Popconfirm, Form, Input, Typography, Button,Tooltip } from 'antd';
import { Select } from "../../../../../../../Components/UI/Elements";
import styled from "styled-components";

const { Option } = Select;
const ButtonGroup = Button.Group;

function EmployeeExperienceTable(props) {
  useEffect(()=>{
    props.getTopicsByUserId(props.singleEmployee.employeeId)
},[]) 

function handleBeginnerClick (skillSetDetailsId) {
   
  let data = { 
    skillRole: "Beginner",  
  };
  props.setSkillRoleExperience(data,skillSetDetailsId);
};
function handleIntermediateClick (skillSetDetailsId) {
   
  let data = { 
    skillRole: "Intermediate",  
  };
  props.setSkillRoleExperience(data,skillSetDetailsId);
};
function handleExpertClick (skillSetDetailsId) {
   
  let data = { 
    skillRole: "Expert",  
  };
  props.setSkillRoleExperience(data,skillSetDetailsId);
};

  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [editingKey, setEditingKey] = useState('');
  const isEditing = (record) => record.skillSetDetailsId === editingKey;

  useEffect(() => {
    setData(props.employeeExperince)
  }, [props.employeeExperince])
  const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {
    const inputNode = <Input />;
    return (
      <td {...restProps}>
        {editing && inputType !== "picker" ? (
          
           
              <Form.Item
                name={dataIndex}
                style={{
                  margin: 0,
                }}
                rules={[
                  {
                    required: true,
                    message: `Please Input ${title}!`,
                  },
                ]}
              >
                <Select>
                  {props.topicsByCandidateId.map((item) => {
                    return <Option value={item.skillSetDetailsId}>{item.skillName} </Option>;
                  })}
                </Select>
              </Form.Item>
              ) :editing && inputType === "picker" ?(
                <Form.Item
                name={dataIndex}
                style={{
                  margin: 0
                }}
                rules={[
                  {
                    required: true,
                    message: `Please Input ${title}!`
                  }
                ]}
              >
                
              {inputNode}
                </Form.Item>
                      ) :(
                          children
                        )}
                    </td>
                  );
                };
                const edit = (record) => {
                  form.setFieldsValue({
                    skillSetDetailsId: "",
                    experience: "",
                    ...record,
                  });
                  setEditingKey(record.skillSetDetailsId);
                };
              
                const cancel = () => {
                  setEditingKey('');
                };
                const save = async (key) => {
                  // alert("Hello")
                  try {
                    // alert("Try")
                    const row = await form.validateFields();
                    const newData = [...data];
                    const index = newData.findIndex((item) => key === item.skillSetDetailsId);
                    // //console.log(item.orderId)
                    // //console.log(newData)
                    if (index > -1) {
                      // alert("if");
                      const item = newData[index];
                      //console.log(item)
                      newData.splice(index, 1, { ...item, ...row });
                      const a = newData[index];          
                    //   props.updateExperienceByCandidateId(
                    //     {
                    //       skillSetDetailsId: a.skillSetDetailsId,
                    //       experience: a.experience,
                    //       // candidateId: a.candidateId,
                    //     },
                    //     key,
                    //     a.skillSetDetailsId
                    //   );
                      setEditingKey('');
              
                    } else {
                      alert("else");
                      // newData.push(row);
                      setData(newData);
                      setEditingKey('');
              
                    }
                  } catch (errInfo) {
                   
                  }
                };

    const columns=[
        {
            title:"Skill",
            dataIndex: "keySkillsName",
            editable: true,
        },
        {
            title:"Experience (in Years)",
            dataIndex: "experience",
            editable: true, 
        },
        {
          title: "Level",
          dataIndex: "skillSetDetailsId",
          width: "30%",
          render: (name, item, i) => {
            console.log(name);
            console.log(item);
            return (
              <div class=" flex justify-evenly" >
                <ButtonGroup>
                  <RoleButton
                    type="Beginner"
                    iconType="fa-medal"
                    tooltip="Beginner"
                    role={item.skillRole}
                      onClick={() =>
                        handleBeginnerClick(
                         
                          item.skillSetDetailsId,
                          
                        )
                      }
                  />
                  <RoleButton
                    type="Intermediate"
                    iconType="fa-medal"
                    tooltip="Intermediate"
                    role={item.skillRole}
                      onClick={() =>
                        handleIntermediateClick(
                          item.skillSetDetailsId,
                        )
                      }
                  />
                  <RoleButton
                    type="Expert"
                    iconType="fa-medal"
                    tooltip="Expert"
                    role={item.skillRole}
                      onClick={() =>
                      handleExpertClick(
                          item.skillSetDetailsId,
                        )
                      }
                  />
                </ButtonGroup>
              
              </div>
            );
          },
        },
      
        {
          title: '',
          dataIndex: 'operation',
          width: "12%", 
          render: (_, record) => {
            const editable = isEditing(record);
            return editable ? (
              <span>
                <Typography.Link
                  onClick={() =>
                    save(record.skillSetDetailsId)
                  }
                  style={{
                    marginRight: 8,
                  }}
                >
                  Save
                  </Typography.Link>
                <Popconfirm title="Sure to cancel?"
                  onConfirm={cancel}>
                  <a>Cancel</a>
                </Popconfirm>
              </span>
            ) :
              <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                 <VisibilityIcon/>
              </Typography.Link>
          },
        },
    ]
    const mergedColumns = columns.map((col) => {
      if (!col.editable) {
        return col;
      }
  
      return {
        ...col,
        onCell: (record) => ({
          record,
          inputType: col.dataIndex === 'skillName' ? 'text' : 'picker',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: isEditing(record),
        }),
      };
    }); 

   
  return (
    <>
    <Form form={form} component={false}>
        <StyledTable
        // columns={column}
        rowKey="candidateId"
         dataSource={props.topicsByUserId}
         loading={
          props.fetchingTopicsByUserId ||
          props.fetchingTopicsByUserIdError
         }
         pagination={false}
        scroll={{ y: 240 }}
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        columns={mergedColumns}
        rowClassName="editable-row"
        />
        </Form>
    </>
  );
}
const mapStateToProps = ({  candidate,employee}) => ({
    skillName:candidate.candidateId,
    experience:candidate.candidateId,
    employeeExperince:employee.employeeExperince,
    singleEmployee: employee.singleEmployee,
    fetchingTopicsByUserId:employee.fetchingTopicsByUserId,
    fetchingTopicsByUserIdError:employee.fetchingTopicsByUserIdError,
     topicsByUserId:employee.topicsByUserId
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getTopicsByUserId,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeeExperienceTable);

function RoleButton({ type, iconType, tooltip, role, size, onClick }) {
  if (role === type) {
    size = "1.375em";
  } else {
    size = "1em";
  }
  return (
    <Tooltip title={tooltip}>
      <Button
        style={{
          padding: "0.375em",
          borderColor: "transparent",
          color: role === type ? "#1890ff" : "grey",
        }}
        ghost={role !== type}
        onClick={onClick}
      >
        <i className={`fas ${iconType}`} style={{ fontSize: "1.25em" }}></i>
      </Button>
    </Tooltip>
  );
}
const AppIcon1 = (props) => (
  
  <EditIcon
  // icon={solid("pen-to-square")}
  className={`pen-to-square ${props.className}`}

  />


);

const EditIcon = styled(AppIcon1)`
  color: black;
  &:hover {
    // background: yellow;
    color: blue;
  }
`;