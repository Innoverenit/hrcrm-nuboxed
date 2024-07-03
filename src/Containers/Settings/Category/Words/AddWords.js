import React, { useState } from "react";
import { Button, Input } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {AddLangWords} from "../../SettingsAction";

function AddWords(props) {
  
  
   

    const [rows, setRows] = useState([{ input1: '', input2: '' }]);

    const handleChange = (index, key, value) => {
      const updatedRows = [...rows];
      updatedRows[index][key] = value;
      setRows(updatedRows);
    };
  
    const handleAddRow = () => {
      setRows([...rows, { input1: '', input2: '' }]);
    };
  
    const handleRemoveRow = (index) => {
      const updatedRows = [...rows];
      updatedRows.splice(index, 1);
      setRows(updatedRows);
    };
    const handleSubmit = () => {
      // Prepare data to send to the API
      const dataToSend = rows.map((row) => ({
        english: row.input1,
        dutch: row.input2,
      }));
  
      // Make the API call
      props.AddLangWords(dataToSend);
  setRows([{ input1: '', input2: '' }]);
    };
    return (
      <div>
        {rows.map((row, index) => (
          
          <div key={index}>
             <div class="flex justify-around w-[30rem]">
             <div>
                    <b>{`Word ${index + 1}`}</b>
                  </div>
              <div>
              <label>English</label>
             <div class="w-24">
            <Input
              type="text"
              value={row.input1}
              onChange={(e) => handleChange(index, 'input1', e.target.value)}
              placeholder="Input 1"
            />
            </div>
            </div>
            <div>
              <label>Dutch</label>
            <div class="w-24">
            <Input
              type="text"
              value={row.input2}
              onChange={(e) => handleChange(index, 'input2', e.target.value)}
              placeholder="Input 2"
            />
            </div>
            </div>
            <div class="w-4">
         <CloseOutlined onClick={() => handleRemoveRow(index)}/>
         </div>
         </div>
          </div>
        ))}
        <Button type="primary" onClick={handleAddRow}>Add Words</Button>
        <Button type="primary" loading={props.addingLangWords} onClick={handleSubmit}>Submit</Button>
      </div>
    );
  }


const mapStateToProps = ({ settings }) => ({
  addingLangWords:settings.addingLangWords
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({
      AddLangWords
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AddWords);
