// import React, { useState, useEffect } from 'react';
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import { getLibrarys } from "../../../Library/LibraryAction";
// import {addSkillLevel} from "../../../SettingsAction"

// const MatrixData = (props) => {
//   // Ensure props.librarys is not undefined or null before using it
//   useEffect(() => {
//     props.getLibrarys(props.organizationId)
//   }, []);
//   const librarysData = props.librarys || [];

//   // Define the header labels for X axis.
//   const xHeaderLabels = ['Level 1', 'Level 2', 'Level 3'];

//   // Extract Y axis header labels from the data array.
//   const yHeaderLabels = librarysData.map(item => item.name);

//   // Initial cell data.
//   const initialCellData = {};
//   librarysData.forEach(item => {
//     initialCellData[item.name] = ["0", "0", "0"];
//   });

//   // Create a state variable to store the cell data.
//   const [cellData, setCellData] = useState(initialCellData);

//   // Use useEffect to update cellData when props.librarys changes
//   useEffect(() => {
//     const updatedCellData = {};
//     librarysData.forEach(item => {
//       const name = item.name;
//       updatedCellData[name] = cellData[name] || ["0", "0", "0"];
//     });
//     setCellData(updatedCellData);
//   }, [librarysData]);

//   // Handle cell value change.
//   const handleCellValueChange = (name, xIndex, newValue) => {
//     const updatedCellData = { ...cellData };
//     updatedCellData[name][xIndex] = newValue;
//     setCellData(updatedCellData);
//   };

//   // Handle save row click.
//   const handleSaveRowClick = (name) => {
//     const result = {
//       skillDefinationId: librarysData.find(item => item.name === name)?.definationId || "",
//       level1: cellData[name][0],
//       level2: cellData[name][1],
//       level3: cellData[name][2],
//       countryId:props.activeTab
//     };

//     props.addSkillLevel(result)
//     console.log('Saving data:', result);
//   };

//   // Generate rows based on Y and X axis header labels.
//   const rows = yHeaderLabels.map((name, yIndex) => (
//     <tr key={yIndex}>
//       <th>{name}</th>
//       {xHeaderLabels.map((xLabel, xIndex) => (
//         <td key={xIndex}>
//           <input
//             type="text"
//             value={cellData[name]?.[xIndex] || ''}
//             onChange={(e) =>
//               handleCellValueChange(name, xIndex, e.target.value)
//             }
//           />
//         </td>
//       ))}
//       <td>
//         <button onClick={() => handleSaveRowClick(name)}>Save</button>
//       </td>
//     </tr>
//   ));

//   return (
//     <div>
//       <table className="matrix-table">
//         <thead>
//           <tr>
//             <th></th>
//             {xHeaderLabels.map((label, index) => (
//               <th key={index}>{label}</th>
//             ))}
//             <th>Save</th>
//           </tr>
//         </thead>
//         <tbody>{rows}</tbody>
//       </table>
//     </div>
//   );
// };

// const mapStateToProps = ({ librarys, auth }) => ({
//   librarys: librarys.librarys,
//   organizationId: auth.userDetails.organizationId,
// });

// const mapDispatchToProps = (dispatch) =>
//   bindActionCreators(
//     {
//       getLibrarys,
//       addSkillLevel
//     },
//     dispatch
//   );

// export default connect(mapStateToProps, mapDispatchToProps)(MatrixData);

import React, { useState, useEffect } from 'react';
import { Select, Input, Button, Form, Row, Col } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getLibrarys } from '../../../Library/LibraryAction';
import { addSkillLevel,updateSkillLevel } from '../../../SettingsAction';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import NodataFoundPage from "../../../../../Helpers/ErrorBoundary/NodataFoundPage";

const { Option } = Select;

const EditableTable = (props) => {
  const [form] = Form.useForm();
  const [data, setData] = useState(props.matrixData);
  const [rows, setRows] = useState([]);
  const [level3, setLevel3] = useState("");
  const [level1, setLevel1] = useState("");
  const [level2, setLevel2] = useState("");
  const [skillData, setSkillData] = useState("");
  const [editsuppliesId, setEditsuppliesId] = useState(null);
  const [editedFields, setEditedFields] = useState({});
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    props.getLibrarys(props.organizationId);
  }, [props.organizationId]);

  const validateRow = (index) => {
    const row = rows[index];
    const errors = {};
  
    if (!row.skillDefinationId) {
      errors.skill = 'Skill is required';
    }
  
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [index]: errors,
    }));
  
    return Object.keys(errors).length === 0; // Return true if no errors
  };

  useEffect(() => {
    if (props.matrixData.length > 0) {
      // Update activeTab when data is available
      setData(props.matrixData);
    }
   
  }, [props.matrixData]);

  const handleAddRow = () => {
    const newRow = {
      // key: String(data.length + 1),
      skill: '',
      level1: '',
      level2: '',
      level3: '',
      skillDefinationId: '',
      // skillLevelLinkId:""
    };
    setRows([...rows, newRow]);
  };

  const handleChange = (index, key, value) => {
    const updatedRows = [...rows];
    updatedRows[index][key] = value;
    setRows(updatedRows);
  };

  // const columns = [
  //   {
  //     title: 'Skill',
  //     dataIndex: 'skill',
  //     render: (_, record) => (
  //       <Select
  //         style={{ width: 120 }}
  //         value={record.skillDefinationId} // Updated to use definationId instead of skill
  //         onChange={(value) => handleSelectChange(value, record.key, 'skillDefinationId')}
  //       >
  //         {props.librarys.map((s) => (
  //           <Option key={s.definationId} value={s.definationId}>
  //             {s.name}
  //           </Option>
  //         ))}
  //       </Select>
  //     ),
  //   },
  //   {
  //     title: 'Level 1',
  //     dataIndex: 'level1',
  //     render: (_, record) => (
  //       <Input
  //       style={{width:"11em"}}
  //         value={record.level1}
  //         onChange={(e) => handleInputChange(e.target.value, record.key, 'level1')}
  //       />
  //     ),
  //   },
  //   {
  //     title: 'Level 2',
  //     dataIndex: 'level2',
  //     render: (_, record) => (
  //       <Input
  //       style={{width:"11em"}}
  //         value={record.level2}
  //         onChange={(e) => handleInputChange(e.target.value, record.key, 'level2')}
  //       />
  //     ),
  //   },
  //   {
  //     title: 'Level 3',
  //     dataIndex: 'level3',
  //     render: (_, record) => (
  //       <Input
  //       style={{width:"11em"}}
  //         value={record.level3}
  //         onChange={(e) => handleInputChange(e.target.value, record.key, 'level3')}
  //       />
  //     ),
  //   },
  //   {
  //     title: 'Action',
  //     dataIndex: 'action',
  //     render: (_, record) => (
  //       <Button type="primary" onClick={() => handleSave(record.key)}>
  //         Save
  //       </Button>
  //     ),
  //   },
  // ];

  const handleSelectChange = (value, key, dataIndex) => {
    const updatedData = data.map((row) =>
      row.key === key ? { ...row, [dataIndex]: value, skillDefinationId: value } : row
    );
    // setData(updatedData);
  };

 
  

  // const handleSave = (index) => {
  //    const row = rows[index];
  //    console.log('Submitting Row:', row);
  //     const result = {
  //             skillDefinationId: row.skillDefinationId,
  //             level1: row.level1,
  //             level2: row.level2,
  //             level3: row.level3,
  //             // skillLevelLinkId:row.skillLevelLinkId,
  //             skillLevelLinkId:"",
  //             countryId:props.activeTab
  //           };
  //     props.addSkillLevel(result)
  //     setRows([{ skillDefinationId: '', level1: '', level2: '', level3: '' }]);
  // };
  const handleEditClick = (skillLevelLinkId,level1,level2,level3,skillDefinationId) => {
    setEditsuppliesId(skillLevelLinkId);
    setLevel1(level1)
    setLevel2(level2)
    setLevel3(level3)
    setSkillData(skillDefinationId)
  };
  const handleCancelClick = (productCurrencyId) => {
    //setEditedFields((prevFields) => ({ ...prevFields, [productCurrencyId]: undefined }));
    setEditsuppliesId(null);
  };
  function handleUpdate(item) {
    console.log('Submitting Row:', item);
    const updatedData = {
      skillDefinationId: skillData,
      level1: level1,
      level2: level2,
      level3: level3,
      skillLevelLinkId:item.skillLevelLinkId,
      countryId:props.activeTab
    };
    props.updateSkillLevel(updatedData,props.activeTab,props.organizationId);
    setEditsuppliesId(null);
  };

  const onFinish = (values) => {
    console.log('Form values:', values);
    form.resetFields();
    const result = {
      skillDefinationId: values.skill,
      level1: values.level1,
      level2: values.level2,
      level3: values.level3,
      skillLevelLinkId: '',
      countryId: props.activeTab
    };
    props.addSkillLevel(result);
  };
console.log(editsuppliesId)
  return (
    <div>
     
      <div class=" ml-4">Currency is in Local Value</div>
      {/* {rows.map((row, index) => (
          <div key={index} class="flex items-center">
            <div class="flex justify-around w-[40rem]">
              <div>
                <div class="font-bold text-xs font-poppins text-black">Skill</div>
               
                <Select
  style={{ width: '7rem', borderColor: validationErrors[index]?.skill && 'red' }}
  value={row.skillDefinationId}
  onChange={(value) => handleChange(index, 'skillDefinationId', value)}
>
  {props.librarys.map((d) => (
    <Option key={d.definationId} value={d.definationId}>
      {d.name}
    </Option>
  ))}
</Select>
{validationErrors[index]?.skill && (
  <div style={{ color: 'red' }}>{validationErrors[index].skill}</div>
)}


              
              </div>

              <div>
                <div class="font-bold text-xs font-poppins text-black">Level 1</div>
        
                <Input
                        style={{ width:"6rem"}}
                        value={row.level1}
                        onChange={(e) => handleChange(index,'level1',e.target.value)}
                      /></div>
              <div>
                <div class="font-bold text-xs font-poppins text-black">Level 2</div>
                
                <Input
                   style={{ width:"6rem"}}
                        value={row.level2}
                        onChange={(e) => handleChange(index,'level2',e.target.value)}
                      /></div>
              <div>
                <div class="font-bold text-xs font-poppins text-black">Level 3</div>
              
                <Input
                       style={{ width:"6rem"}}
                        value={row.level3}
                        onChange={(e) => handleChange(index,'level3',e.target.value)}
                      />
             
              </div>
            </div>
            <div class="w-[4rem]">
            <Button type="primary" onClick={() => handleSave(index)}>
              Submit
            </Button>
            </div>
            
          </div>
        ))} */}


<Form form={form} onFinish={onFinish} layout="inline">
      <Row gutter={16}>
        <Col>
          <Form.Item
            label="Skill"
            name="skill"
            rules={[{ required: true, message: 'Please select a skill!' }]}
          >
            {/* <Select placeholder="Select a skill" style={{ width: 150 }}>
              <Option value="javascript">JavaScript</Option>
              <Option value="react">React</Option>
              <Option value="nodejs">Node.js</Option>
              <Option value="python">Python</Option>
            </Select> */}

<Select
 placeholder="Select a skill" style={{ width: 150 }}
>
  {props.librarys.map((d) => (
    <Option key={d.definationId} value={d.definationId}>
      {d.name}
    </Option>
  ))}
</Select>
          </Form.Item>
        </Col>

        <Col>
          <Form.Item
            label="Level 1"
            name="level1"
            rules={[{ required: true, message: 'Please input Level 1!' }]}
          >
            <Input placeholder="Level 1" />
          </Form.Item>
        </Col>

        <Col>
          <Form.Item
            label="Level 2"
            name="level2"
            rules={[{ required: true, message: 'Please input Level 2!' }]}
          >
            <Input placeholder="Level 2" />
          </Form.Item>
        </Col>

        <Col>
          <Form.Item
            label="Level 3"
            name="level3"
            rules={[{ required: true, message: 'Please input Level 3!' }]}
          >
            <Input placeholder="Level 3" />
          </Form.Item>
        </Col>

        <Col>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
      {/* <Table dataSource={data} columns={columns} /> */}
      <div className=' flex  sticky z-auto h-[79vh]'>
        <div class="rounded m-1 p-1 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
          <div className=" flex justify-between w-[100%]  p-1 bg-transparent font-bold sticky  z-10">          <div className=""></div>
            <div className=" md:w-[7%]">Skill</div>
            <div className=" md:w-[6.1rem]">Level 1</div>
            <div className=" md:w-[4.2rem] ">Level 2</div>
            <div className="md:w-[5.8rem]">Level 3</div>
            <div className="w-12"></div>             </div>

          {data.length ? data.map((item) => {
            return (
              <div key={item.skillLevelLinkId}>
                <div className="flex rounded justify-between mt-1 bg-white h-8 items-center p-1 "
                >

                  <div className=" flex font-medium flex-col md:w-[9.1rem] max-sm:w-full  ">
                    <div class="text-sm  font-semibold  font-poppins cursor-pointer">
                    {editsuppliesId  === item.skillLevelLinkId ? (
                      <Select
                        classNames="w-32"
                        value={skillData}
                        onChange={(value) => setSkillData(value)}
                       
                      >
                        {props.librarys.map((d) => (
                          <Option key={d.definationId} value={d.definationId}>
                            {d.name}
                          </Option>
                        ))}
                      </Select>
                    ):(
                      <div className="font-normal text-sm  font-poppins">
                      <div> {item.skill}</div>
                    </div>
                  )}
                    </div>
                  </div>

                  <div className=" flex font-medium flex-col  md:w-[7.1rem] max-sm:flex-row w-full max-sm:justify-between  ">
                  {editsuppliesId  === item.skillLevelLinkId  ? (
                    <div class=" text-xs  font-poppins">
                      <Input
                        className="w-32"
                        value={level1}
                        onChange={(e) => setLevel1(e.target.value)} 
                        // onChange={(e) => handleInputChange(e.target.value, item.key, 'level1')}
                      />
                    </div>
 ):(
  <div className="font-normal text-sm  font-poppins">
  <div> {item.level1}</div>
</div>
)}
                  </div>



                  <div className=" flex font-medium flex-col md:w-[6.5rem] max-sm:flex-row w-full max-sm:justify-between ">
                  {editsuppliesId  === item.skillLevelLinkId  ? (
                    <div class=" text-xs  font-poppins">
                      <Input
                        className="w-32"
                        value={level2}
                        onChange={(e) => setLevel2(e.target.value)} 
                      />
                    </div>
                     ):(
                      <div className="font-normal text-sm  font-poppins">
                      <div> {item.level2}</div>
                    </div>
                    )}
                  </div>
                  <div className=" flex font-medium flex-col md:w-[6.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                  {editsuppliesId  === item.skillLevelLinkId  ? (

                    <div class=" text-xs  font-semibold  font-poppins">
                      <Input
                        className="w-32"
                        value={level3}
                        onChange={(e) => setLevel3(e.target.value)} 
                        // onChange={(e) => handleInputChange(e.target.value, item.key, 'level3')}
                      />
                    </div>
                     ):(
                      <div className="font-normal text-sm  font-poppins">
                      <div> {item.level3}</div>
                    </div>
                    )}
                  </div>

                  <div class="flex md:items-center">


                    {/* <div class="flex flex-col w-20 max-sm:flex-row max-sm:w-[10%]">
                      <div>
                        <Button type="primary" onClick={() => handleSave(item.key)}>
                          Save
                        </Button>
                      </div>

                    </div> */}
 {editsuppliesId  === item.skillLevelLinkId  ? (
                        <>
                      <Button 
                      type="primary"
                      onClick={() => handleUpdate(item)}>
                        Save
                      </Button>
                        <Button 
                         type="primary"
                        onClick={() => handleCancelClick(item.skillLevelLinkId)} className="ml-[0.5rem]">
                        Cancel
                      </Button>
                      </>
                      
                    ) : (
                      <BorderColorIcon
                      className="!text-icon cursor-pointer text-[tomato] flex justify-center items-center mt-1 ml-1"
                        tooltipTitle="Edit"
                        iconType="edit"
                        onClick={() => handleEditClick(item.skillLevelLinkId,item.level1,item.level2,item.level3,item.skillDefinationId)}
                      />
                    )}
 {/* <div>
      <Popconfirm
                          title="Do you want to delete?"
                          onConfirm={() => props.removeProductPrice(item.skillLevelLinkId)}

                          >
                     <Tooltip title="Delete">
                          <DeleteIcon
                           className="!text-base cursor-pointer text-[red]"
                          />
                       </Tooltip>
                       </Popconfirm>
                       </div> */}
                  </div>

                </div>
              </div>
            );
          }) : !data.length && !props.fetchingProductCurrency ? <NodataFoundPage /> : null}

        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ librarys, auth }) => ({
  librarys: librarys.librarys,
  organizationId: auth.userDetails.organizationId,
  
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getLibrarys,
      addSkillLevel,
      updateSkillLevel
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(EditableTable);



// import React, { useState } from 'react';
// import { Table, Input, Select, Button } from 'antd';

// const { Option } = Select;

// const initialData = [
//   {
//     level1: 144,
//     level2: 232,
//     level3: 567,
//     skill: 'Java',
//     id: '1',
//   },
// ];

// const EditableTable = () => {
//   const skillOptions = [
//     {
//       skillName: 'Java',
//       id: '1',
//     },
//     {
//       skillName: 'Angular',
//       id: '2',
//     },
//   ];

//   const [data, setData] = useState(initialData.map((item, index) => ({ ...item, key: String(index) })));

//   const handleAddRow = () => {
//     const newRow = {
//       key: String(data.length + 1),
//       skill: '',
//       level1: '',
//       level2: '',
//       level3: '',
//       id: '',
//     };
//     setData([...data, newRow]);
//   };

//   const columns = [
//     {
//       title: 'Skill',
//       dataIndex: 'skill',
//       render: (_, record) => (
//         <Select
//           style={{ width: 120 }}
//           value={record.id}
//           onChange={(value) => handleSelectChange(value, record.key, 'skill')}
//         >
//           {skillOptions.map((s) => (
//             <Option key={s.id} value={s.id}>
//               {s.skillName}
//             </Option>
//           ))}
//         </Select>
//       ),
//     },
//     {
//       title: 'Level 1',
//       dataIndex: 'level1',
//       render: (_, record) => (
//         <Input
//           value={record.level1}
//           onChange={(e) => handleInputChange(e.target.value, record.key, 'level1')}
//         />
//       ),
//     },
//     {
//       title: 'Level 2',
//       dataIndex: 'level2',
//       render: (_, record) => (
//         <Input
//           value={record.level2}
//           onChange={(e) => handleInputChange(e.target.value, record.key, 'level2')}
//         />
//       ),
//     },
//     {
//       title: 'Level 3',
//       dataIndex: 'level3',
//       render: (_, record) => (
//         <Input
//           value={record.level3}
//           onChange={(e) => handleInputChange(e.target.value, record.key, 'level3')}
//         />
//       ),
//     },
//     {
//       title: 'Action',
//       dataIndex: 'action',
//       render: (_, record) => (
//         <Button type="primary" onClick={() => handleSave(record.key)}>
//           Save
//         </Button>
//       ),
//     },
//   ];

//   const handleSelectChange = (value, key, dataIndex) => {
//     const updatedData = data.map((row) =>
//       row.key === key ? { ...row, [dataIndex]: value, id: value } : row
//     );
//     setData(updatedData);
//   };

//   const handleInputChange = (value, key, dataIndex) => {
//     const updatedData = data.map((row) =>
//       row.key === key ? { ...row, [dataIndex]: value } : row
//     );
//     setData(updatedData);
//   };

//   const handleSave = (key) => {
//     const targetRow = data.find((row) => row.key === key);
//     if (targetRow) {
//       const { level1, level2, level3, id } = targetRow;
//       console.log(`Skill ID: ${id}, Level 1: ${level1}, Level 2: ${level2}, Level 3: ${level3}`);
//     }
//   };

//   return (
//     <div>
//       <Button type="primary" onClick={handleAddRow} style={{ marginBottom: 16 }}>
//         Add Row
//       </Button>
//       <Table dataSource={data} columns={columns} />
//     </div>
//   );
// };

// export default EditableTable;