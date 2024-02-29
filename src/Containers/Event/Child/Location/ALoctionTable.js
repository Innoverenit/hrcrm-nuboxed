// import React, {  useEffect, useState } from "react";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import { StyledTable } from "../../../../Components/UI/Antd";
// import { Popconfirm, Form, Input, Typography, Button, Space, DatePicker} from "antd";
// import { EditOutlined, SearchOutlined } from "@ant-design/icons";
// import Highlighter from "react-highlight-words";
// import moment from "moment";
// import {
//     getAlLocshift,
//     getShiftlocs,
//     updateLocation,
// } from "./LocationAction";
// import { Select } from "../../../../Components/UI/Elements";

// const { Option } = Select;
// const ButtonGroup = Button.Group;

// function ALoctionTable(props) {
//     useEffect(() => {
//         props.getAlLocshift(props.storedLoc.locationDetailsId);
//         props.getShiftlocs(props.storedLoc.locationDetailsId);
//     }, []);

//     const [show, setshow] = useState(false);
//     const [orderId, setorderId] = useState("");
//     const [searchText, setSearchText] = useState("");
//     const [particularRowData, setParticularRowData] = useState({});
//     const [searchedColumn, setSearchedColumn] = useState("");

//     function handleOrder(orderId) {
//         setshow(true);
//         setorderId(orderId);
//     }

//     function handleSetParticularOrderData(item, data) {
//         console.log(item);
//         setParticularRowData(item);
//     }

//     function getColumnSearchProps(dataIndex) {
//         return {
//             filterDropdown: ({
//                 setSelectedKeys,
//                 selectedKeys,
//                 confirm,
//                 clearFilters,
//             }) => (
//                 <div style={{ padding: 8 }}>
//                     <Input
//                         // ref={node => {
//                         //   this.searchInput = node;
//                         // }}
//                         placeholder={`Search ${dataIndex}`}
//                         value={selectedKeys[0]}
//                         onChange={(e) =>
//                             setSelectedKeys(e.target.value ? [e.target.value] : [])
//                         }
//                         onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
//                         style={{ width: 240, marginBottom: 8, display: "block" }}
//                     />
//                     <Space>
//                         <Button
//                             type="primary"
//                             onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
//                             icon={<SearchOutlined />}
//                             size="small"
//                             style={{ width: 90 }}
//                         >
//                             Search
//                         </Button>
//                         <Button
//                             onClick={() => handleReset(clearFilters)}
//                             size="small"
//                             style={{ width: 90 }}
//                         >
//                             Reset
//                         </Button>
//                         <Button
//                             type="link"
//                             size="small"
//                             onClick={() => {
//                                 confirm({ closeDropdown: false });
//                                 setSearchText(selectedKeys[0]);
//                                 setSearchedColumn(dataIndex);
//                             }}
//                         >
//                             Filter
//                         </Button>
//                     </Space>
//                 </div>
//             ),
//             filterIcon: (filtered) => (
//                 <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
//             ),
//             onFilter: (value, record) =>
//                 record[dataIndex]
//                     .toString()
//                     .toLowerCase()
//                     .includes(value.toLowerCase()),
//             onFilterDropdownVisibleChange: (visible) => {
//                 if (visible) {
//                     // setTimeout(() => this.searchInput.select());
//                 }
//             },
//             render: (text) =>
//                 searchedColumn === dataIndex ? (
//                     <Highlighter
//                         highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
//                         searchWords={[searchText]}
//                         autoEscape
//                         textToHighlight={text.toString()}
//                     />
//                 ) : (
//                     text
//                 ),
//         };
//     }

//     function handleSearch(selectedKeys, confirm, dataIndex) {
//         confirm();
//         setSearchText(selectedKeys[0]);
//         setSearchedColumn(dataIndex);
//     }

//     function handleReset(clearFilters) {
//         clearFilters();
//         setSearchText("");
//     }

//     const [form] = Form.useForm();
//     const [data, setData] = useState([]);
//     const [editingKey, setEditingKey] = useState('');
//     const [creationDate,setcreationDate]=useState(undefined)
//     const isEditing = (record) => record.shiftId === editingKey;
  
//     useEffect(() => {
//       setData(props.alLocShift)
//     }, [props.alLocShift])

//     function handleDatePickerCahnge(date,dateString){
//       setcreationDate(moment(dateString).format("YYYY-MM-DDTHH:mm:ss.SSSS[Z]"))
//     }
//     const EditableCell = ({
//       editing,
//       dataIndex,
//       title,
//       inputType,
//       record,
//       index,
//       children,
//       ...restProps
//     }) => {
//       const dateFormat = "MM/DD/YYYY";
//       const inputNode = <Input />;
//       return (
//         <td {...restProps}>
//           {editing && inputType !== "picker" ? (
            
             
//                 <Form.Item
//                   name={dataIndex}
//                   style={{
//                     margin: 0,
//                   }}
//                   rules={[
//                     {
//                       required: true,
//                       message: `Please Input ${title}!`,
//                     },
//                   ]}
//                 >
//                   <Select>
//                     {props.shiftLocs.map((item) => {
//                       return (
//                        <Option value={item.shiftName}>{item.shiftName} </Option>
//                        )
//                     })}
//                   </Select>
//                 </Form.Item>
//                 ) :editing && inputType === "picker" ?(
//                 //   <Form.Item
//                 //   name={dataIndex}
//                 //   style={{
//                 //     margin: 0
//                 //   }}
//                 //   rules={[
//                 //     {
//                 //       required: true,
//                 //       message: `Please Input ${title}!`
//                 //     }
//                 //   ]}
//                 // >
                  
//                 // {inputNode}
//                 //   </Form.Item>
//                 <DatePicker format={dateFormat} 
//                 onChange={(date,dateString)=>handleDatePickerCahnge(date,dateString)}/>
//                         ) :(
//                             children
//                           )}
//                       </td>
//                     );
//                   };
//                   const edit = (record) => {
//                     form.setFieldsValue({
//                       shiftName: "",
//                       creationDate: "",
//                       ...record,
//                     });
//                     setEditingKey(record.shiftId);
//                   };
                
//                   const cancel = () => {
//                     setEditingKey('');
//                   };
//                   const save = async (key) => {
//                     // alert("Hello")
//                     try {
//                       // alert("Try")
//                       const row = await form.validateFields();
//                       const newData = [...data];
//                       const index = newData.findIndex((item) => key === item.shiftId);
//                       // //console.log(item.orderId)
//                       // //console.log(newData)
//                       if (index > -1) {
//                         // alert("if");
//                         const item = newData[index];
//                         //console.log(item)
//                         newData.splice(index, 1, { ...item,creationDate, ...row });
//                         const a = newData[index];          
//                         props.updateLocation(
//                           {
//                             shiftId: a.shiftId,
//                             shiftName:a.shiftName,
//                             creationDate: a.creationDate,
//                             // candidateId: a.candidateId,
//                           },
//                           key,
//                           props.storedLoc.locationDetailsId
//                         );
//                         setEditingKey('');
                
//                       } else {
//                         alert("else");
//                         // newData.push(row);
//                         setData(newData);
//                         setEditingKey('');
                
//                       }
//                     } catch (errInfo) {
                     
//                     }
//                   };
                 
//     const columns = [
//         {
//             title: "",
//             width: "2%",
//         },
//         {
//             title: "Name",
//             width: "15%",
//             dataIndex: "fullName", 
//         },
//         {
//             title: "Shift",
//             dataIndex: "shiftName",
//             width: "18%",
//             editable: true,
//         },
//         {
//             title: "Effective",
//             dataIndex: "creationDate",
//             width: "18%",
//             render: (name, item, i) => {
//               return <span>{` ${moment(item.creationDate).format("ll")}`}</span>;
//             },
//             editable: true,
//         },
       
//         {
//             title: '',
//             dataIndex: 'operation',
//             width: "12%", 
//             render: (_, record) => {
//               const editable = isEditing(record);
//               return editable ? (
//                 <span>
//                   <Typography.Link
//                     onClick={() =>
//                       save(record.shiftId)
//                       // alert("Save success")
//                     }
//                     style={{
//                       marginRight: 8,
//                     }}
//                   >
//                     Save
//                     </Typography.Link>
//                   <Popconfirm title="Sure to cancel?"
//                     onConfirm={cancel}>
//                     <a>Cancel</a>
//                   </Popconfirm>
//                 </span>
//               ) :
//                 <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
//                    <EditOutlined/>
//                 </Typography.Link>
//             },
//           },
//     ];
//     const mergedColumns = columns.map((col) => {
//         if (!col.editable) {
//           return col;
//         }
    
//         return {
//           ...col,
//           onCell: (record) => ({
//             record,
//             inputType: col.dataIndex === 'shiftName' ? 'text' : 'picker',
//             dataIndex: col.dataIndex,
//             title: col.title,
//             editing: isEditing(record),
//           }),
//         };
//       }); 

//     const tab = document.querySelector(".ant-layout-sider-children");
//     const tableHeight = tab && tab.offsetHeight - 200;

//     return (
//         <>
//          <Form form={form} component={false}>
//             <StyledTable
//                 rowKey="shiftId"
//                 // columns={columns}
//                 dataSource={props.alLocShift}
//                 loading={props.fetchingAlLocShift}
//                 scroll={{ y: tableHeight }}
//                 pagination={false}
//                 components={{
//                     body: {
//                       cell: EditableCell,
//                     },
//                   }}
//                   columns={mergedColumns}
//                   rowClassName="editable-row"
                
//             />
// </Form>
          
//         </>
//     );
// }

// const mapStateToProps = ({ location, auth }) => ({
//     alLocShift: location.alLocShift,
//     fetchingAlLocShift: location.fetchingAlLocShift,
//     userId: auth.userDetails.userId,
//     shiftLocs: location.shiftLocs,
// });

// const mapDispatchToProps = (dispatch) =>
//     bindActionCreators(
//         {
//             getAlLocshift,
//             getShiftlocs,
//             updateLocation
//         },
//         dispatch
//     );

// export default connect(mapStateToProps, mapDispatchToProps)(ALoctionTable);



import React, {  useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledTable } from "../../../../Components/UI/Antd";
import { Popconfirm, Form, Input, Typography, Button, Space, DatePicker} from "antd";
import { EditOutlined, SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import moment from "moment";
import {
    getAlLocshift,
    getShiftlocs,
    updateLocation,
} from "./LocationAction";
import { Select } from "../../../../Components/UI/Elements";

const { Option } = Select;
const ButtonGroup = Button.Group;

function ALoctionTable(props) {
    useEffect(() => {
        props.getAlLocshift(props.storedLoc.locationDetailsId);
        props.getShiftlocs(props.storedLoc.locationDetailsId);
    }, []);

    const [show, setshow] = useState(false);
    const [orderId, setorderId] = useState("");
    const [searchText, setSearchText] = useState("");
    const [particularRowData, setParticularRowData] = useState({});
    const [searchedColumn, setSearchedColumn] = useState("");

    function handleOrder(orderId) {
        setshow(true);
        setorderId(orderId);
    }

    function handleSetParticularOrderData(item, data) {
        console.log(item);
        setParticularRowData(item);
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
                        // ref={node => {
                        //   this.searchInput = node;
                        // }}
                        placeholder={`Search ${dataIndex}`}
                        value={selectedKeys[0]}
                        onChange={(e) =>
                            setSelectedKeys(e.target.value ? [e.target.value] : [])
                        }
                        onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        style={{ width: 240, marginBottom: 8, display: "block" }}
                    />
                    <Space>
                        <Button
                            type="primary"
                            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                            icon={<SearchOutlined />}
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
                    </Space>
                </div>
            ),
            filterIcon: (filtered) => (
                <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
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

    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    const [editingKey, setEditingKey] = useState('');
    const [creationDate,setcreationDate]=useState(undefined)
    const isEditing = (record) => record.shiftId === editingKey;
  
    useEffect(() => {
      setData(props.alLocShift)
    }, [props.alLocShift])

    function handleDatePickerCahnge(date,dateString){
      setcreationDate(moment(dateString).format("YYYY-MM-DDTHH:mm:ss.SSSS[Z]"))
    }
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
      const dateFormat = "MM/DD/YYYY";
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
                    {props.shiftLocs.map((item) => {
                      return (
                       <Option value={item.shiftName}>{item.shiftName} </Option>
                       )
                    })}
                  </Select>
                </Form.Item>
                ) :editing && inputType === "picker" ?(
                //   <Form.Item
                //   name={dataIndex}
                //   style={{
                //     margin: 0
                //   }}
                //   rules={[
                //     {
                //       required: true,
                //       message: `Please Input ${title}!`
                //     }
                //   ]}
                // >
                  
                // {inputNode}
                //   </Form.Item>
                <DatePicker format={dateFormat} 
                onChange={(date,dateString)=>handleDatePickerCahnge(date,dateString)}/>
                        ) :(
                            children
                          )}
                      </td>
                    );
                  };
                  const edit = (record) => {
                    form.setFieldsValue({
                      shiftName: "",
                      creationDate: "",
                      ...record,
                    });
                    setEditingKey(record.shiftId);
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
                      const index = newData.findIndex((item) => key === item.shiftId);
                      // //console.log(item.orderId)
                      // //console.log(newData)
                      if (index > -1) {
                        // alert("if");
                        const item = newData[index];
                        //console.log(item)
                        newData.splice(index, 1, { ...item,creationDate, ...row });
                        const a = newData[index];          
                        props.updateLocation(
                          {
                            shiftId: a.shiftId,
                            shiftName:a.shiftName,
                            creationDate: a.creationDate,
                            // candidateId: a.candidateId,
                          },
                          key,
                          props.storedLoc.locationDetailsId
                        );
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
                 
                  return (
                    <>
                        <div className=' flex justify-end sticky top-28 z-auto h-[34rem] overflow-auto'>
                        <div class="rounded-lg m-5 p-2 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
                                <div className=" flex  w-[95%] p-2 bg-transparent font-bold sticky top-0 z-10">
                                    <div className=" md:w-[12.1rem]">Name</div>
                                    <div className=" md:w-[9.1rem]">Shift</div>
                                    <div className="md:w-[7.7rem]">Effective</div>
                                </div>
                                {props.alLocShift.map((item) => {
                                   const date1 = moment(item.endDate).format("DD/MM/YYYY");
                                    const date = moment(item.startDate).format("DD/MM/YYYY");
                                    return (
                                        <div>
                                            <div className="flex rounded-xl  mt-4 bg-white h-12 items-center p-3 " >
                                                <div class="flex">
                                                    <div className=" flex font-medium  md:w-[12.2rem] max-sm:w-full ">
                                                       {item.fullName}
                                                    </div>
            
                                                    <div className=" flex font-medium   md:w-[9.2rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                                        <div class=" text-xs text-cardBody font-poppins">
                                                        {item.shiftName}
                                                        </div>
            
                                                    </div>
                                                    <div className=" flex font-medium  md:w-[5.2rem] max-sm:flex-row w-full max-sm:justify-between ">
            
                                                    <span>{` ${moment(item.creationDate).format("ll")}`}</span>
            
                                                        
                                                    </div>
                                                    <div className=" flex font-medium  md:w-[5.2rem] max-sm:flex-row w-full max-sm:justify-between ">
            
                                                    <span>
                  <Typography.Link
                    // onClick={() =>
                    //   save(record.shiftId)
                    //   // alert("Save success")
                    // }
                    // style={{
                    //   marginRight: 8,
                    // }}
                  >
                    Save
                    </Typography.Link>
                  <Popconfirm title="Sure to cancel?"
                    onConfirm={cancel}>
                    <a>Cancel</a>
                  </Popconfirm>
                </span>

                
            </div>
                                                </div>
            
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                            
                        </div>
                    </>
                )
}

const mapStateToProps = ({ location, auth }) => ({
    alLocShift: location.alLocShift,
    fetchingAlLocShift: location.fetchingAlLocShift,
    userId: auth.userDetails.userId,
    shiftLocs: location.shiftLocs,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getAlLocshift,
            getShiftlocs,
            updateLocation
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(ALoctionTable);
