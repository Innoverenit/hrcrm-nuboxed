import React, { useContext, useEffect, useRef, useState } from "react";
//import { addSequence,getSequence ,getSequenceDetail,handleCAndidateSequenceModal} from "../../../../Settings/SettingsAction";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {  Tooltip } from "antd";
import { Button, Form, Input, Popconfirm, Select, Table } from "antd";
//import AddCandidateSequenceModal from "./AddCandidateSequenceModal";
import DiamondIcon from '@mui/icons-material/Diamond';
const { Option } = Select;

const OutreachForm = (props) => {
  const [dataSource, setDataSource] = useState([]);
  const [currentSequenceData,setCurrentSequenceData]= useState([]);
  const [count, setCount] = useState(0);
//     useEffect(() => {
//       props.getSequence(props.organizationId)  

// }, [])


function handlesetCurrentSequenceData(item){
  setCurrentSequenceData(item)
}

// const backendData=props.sequence
//   useEffect(() => {
//     const data = backendData.map((item, i) => {
//       return { ...item, key: i + 1 };
//     });
//     setDataSource(data);
//   }, []);
  const EditableContext = React.createContext(null);
const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};
const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);
  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex]
    });
  };
  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({
        ...record,
        ...values
      });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };
  let childNode = children;
  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`
          }
        ]}
      >
        {title === "Name" ? (
    
    <Input ref={inputRef} 
    onPressEnter={save}
     onBlur={save}
      />
        ) :title === "Type" ? (
          <Select
          ref={inputRef}
          style={{
            width: 70
          }}
        onChange={save}
         >
           <Option value={"Mail"} >Mail</Option>
                  <Option value={"Call"} > Call</Option>
                  <Option value={"Whatsapp"} > Whatsapp</Option>
         </Select>
        ):title === "Days" ? (
          <Input ref={inputRef} 
          onPressEnter={save} 
          onBlur={save}
           />
      ) :
                   null}
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }
  return <td {...restProps}>{childNode}</td>;
};
  const handleDelete = (key, id) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
    console.log(key, id);
  };
  const defaultColumns = [
   

    {
      title: "Name",
      dataIndex: "name",
     width: "30%",
     editable: true,
    },
    {
      title: "Type",
      dataIndex: "type",
      width: "30%",
      editable: true,
    },
    {
      title: "Days",
      dataIndex: "noOfDays",
           width: "30%",
           editable: true,
    },
    {
      width: "8%",
        render: (name, item, i) => { 
          // const data1= item.currency
          return (
            <>
              {/* {item.billing} {item.currency} */}
              <Tooltip title="">
              <span
               onClick={() => {
               props.handleCAndidateSequenceModal(true);
              //  handlesetCurrentSequenceId(item.sequenceId);
               props.getSequenceDetail(item.sequenceId)
     handlesetCurrentSequenceData(item)
              
             }}
              >
              <DiamondIcon style={{fontSize:"1.3em"}} 
              // icon={solid("diamond-turn-right")}
               />
            </span>
            </Tooltip>
            </>
          );
        },
      },
      
    
    {
      title: "operation",
      dataIndex: "operation",
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <>
            <Button
              type="primary"
              style={{
                marginBottom: 16
              }}
              onClick={() => handleBackendCall(record.key, record.sequenceId)}
            >
              Save
            </Button>
            <Popconfirm
              title="Do you want to delete?"
              okText="Yes"
              cancelText="No"
              onConfirm={() => handleDelete(record.key, record.sequenceId)}
            >
              <a>Delete</a>
            </Popconfirm>
          </>
        ) : null
    }
  ];
  const handleAdd = () => {
    const newData = {
      key: count,
      //sequenceId:"",
      name:"",
      priority:"",
      type:"",
      noOfDays:"",
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };
  const handleSave = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row
    });
    setDataSource(newData);
  };
  const handleBackendCall = (key, sequenceId) => {
    console.log(key);
    const newData = dataSource.filter((item) => item.sequenceId === sequenceId);
    console.log(newData);
   
    const a=newData[0]
     console.log(a);

    
    // props.addSequence(
    //                      {
    //                       // ...values,
    //                       type: a.selectedType,
    //                       priority: a.priority,
    //                       name:a.name,
    //                       orgId:props.organizationId,
    //                       noOfDays:a.noOfDays,
    //                       },
    //                       props.organizationId,
    //           // resetForm ()
    //                     );
  };
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell
    }
  };
  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
         handleSave
      })
    };
  });
  return (
    <>
    <div>
      <Button
        onClick={handleAdd}
        type="primary"
        style={{
          marginBottom: 16
        }}
      >
        Add Sequence
      </Button>
      <Table
        components={components}
        rowClassName={() => "editable-row"}
        bordered
        dataSource={dataSource}
        columns={columns}
      />
    </div>

    </>
  );

};



 const mapStateToProps = ({ auth, settings, librarys, customer }) => ({

//       addingSequence: settings.addingSequence,
//   addingSequenceError: settings.addingSequenceError,  
//       sequence: settings.sequence, 
//       sequenceDetail:settings.sequenceDetail,
//   organizationId: auth.userDetails.organizationId,
//   candidateSequenceModal:settings.candidateSequenceModal,
  });
  
  const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
      {
       
    //    getSequence,
    //   addSequence,
    //   handleCAndidateSequenceModal,
    //   getSequenceDetail
      },
      dispatch
    );
  
  export default connect(mapStateToProps, mapDispatchToProps)(OutreachForm);