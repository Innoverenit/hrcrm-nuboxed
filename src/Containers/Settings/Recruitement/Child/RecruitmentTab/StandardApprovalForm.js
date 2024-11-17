
import React, { useState, useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button,Select } from "antd";

import {
  addApproval,
  getApprovalData,
  getDepartmentList
} from "../../../../Settings/SettingsAction";
import { CloseOutlined } from "@ant-design/icons";
const { Option } = Select;
function StandardApprovalForm(props) {
       useEffect(() => {
        props.getApprovalData(props.stageId);
        props.getDepartmentList()
    }, [])
    const [rows, setRows] = useState([{ value: "", id: 1 }]);
    const [id, setId] = useState(1);
    const [level, setLevel] = useState(1);


    function buttonOnClick() {
        var mapped = rows.map((item, i) => ({ [`level${i + 1}`]: item.value }));
        var data = Object.assign(
            {},
            ...mapped,
          

            { levelCount: level },
                        { approvalIndicator: props.approvalIndicator },
                        { approvalType: props.approvalType },
                        { processName: "Indent" },
                        { subProcessName: "IndentApproval" },
                        { stageId: props.stageId,}
        );
        console.log(data);
        props.addApproval(data);
    };
  
    function handleChangeValue(value, a) {
        setRows((v) => {
            return v.map((d) => {
                if (`${d.id}_value` === a) {
                    return { ...d, value: value };
                } else {
                    return d;
                }
            });
        });
    }
    function handleAddRowClick() {
        setId((v) => v + 1);
        setLevel((v) => v + 1);
        setRows((v) => [...v, { value: "", id: id + 1 }]);

    }

    function handleDelete(row) {
        setRows((v) => v.filter((d) => d.id !== row.id));
        setLevel((v) => v - 1);
    }
    console.log(rows);

    console.log("stages1",props.stageId)
    return (
        <div>
            <div className="MainBox">
                <div className="InputBox">
                    {rows.map((row, i) => {
                        return (
                            <div style={{ width: "100%", display: "flex", fontWeight: "bold" }}>
                                <div style={{ width: "16%" }}>
                                    <p>{`Level ${i + 1}`}</p>
                                </div>
                                <div style={{ width: "47%" }}>
                                    <Select
                                        name={`${row.id}_value`}
                                        value={`${row.value}`}
                                        onChange={(value) =>
                                            handleChangeValue(value, `${row.id}_value`)
                                        }
                                    // placeholder={`select`}
                                    >
                                        {props.departmentList.map((a) => {
                                            return <Option value={a.departmentId}>{a.departmentName}</Option>;
                                        })}
                                    </Select>
                                </div>
                                {rows.length > 1 && (row.id + 1 > row.id) ? (
                                    <CloseOutlined onClick={() => handleDelete(row)} />
                                ) : null}
                            </div>
                        );
                    })}
                 <div class=" flex flex-row flex-wrap items-start self-start justify-end grow shrink h-auto mr-auto ">
                        <div className="button">
                            <Button type="primary" onClick={handleAddRowClick}>
                                Add Level
                            </Button>
                        </div>
                    </div>
                    <div class=" flex flex-row flex-wrap items-start self-start justify-end grow shrink h-auto mr-auto "
                        style={{ marginLeft: "104%", marginTop: "52px" }}>
                        <Button
                            type="primary"
                            style={{
                                marginRight: "-105px",
                                marginTop: "-76px",
                                marginBottom: "5px",
                            }}
                            onClick={() => buttonOnClick()}
                        >
                            Submit
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}


const mapStateToProps = ({ settings, user }) => ({
       addingApproval: settings.addingApproval,
    departmentList: settings.departmentList,
    // functions: functions.functions,
    // designationById: user.designationById,
    approvalData: settings.approvalData,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({
        addApproval,
                getApprovalData,
                getDepartmentList
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(StandardApprovalForm);
