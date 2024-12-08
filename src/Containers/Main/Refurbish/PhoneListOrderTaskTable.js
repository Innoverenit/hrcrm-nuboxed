import React, { useState, useEffect, useMemo } from "react";
import { connect } from "react-redux";
import AddBoxIcon from '@mui/icons-material/AddBox';
import { bindActionCreators } from "redux";
import { getTaskByPhoneId ,handleAllSpareProcess} from "./RefurbishAction";
import { BundleLoader } from "../../../Components/Placeholder";
import ProcessAllSpareDrawer from "./ProcessAllSpareDrawer";

function PhoneListOrderTaskTable(props) {
    const [newData, setnewData] = useState("");
     useEffect(() => {
        props.getTaskByPhoneId(props.data.phoneId)
    }, []);
    function handleSetNewData(item) {
        setnewData(item);
    }
if (props.fetchingTaskByPhoneId) {
    return <BundleLoader/>
}
    return (
        <>
        <div>
            {props.taskByPhone.map((item) => {
                    return (
                        <div class="cursor-pointer w-[25%] flex justify-center ">
                            <div class="basis-[85%]">
                                {item.taskName}
                            </div>
                            <div>
                            <AddBoxIcon className=" !text-icon  ml-1 items-center
 text-[#6f0080ad]"
                                  onClick={() => {
                                    props.handleAllSpareProcess(true);
                                    handleSetNewData(item);
                                   

                                }}
                                />
                                {/* <Popconfirm
                                    title="Do you want to delete?"
                                    onConfirm={() => props.deleteTaskList({}, item.phoneTaskId)}
                                >
                                    <DeleteIcon
                                        className=" !text-base cursor-pointer text-[red]"
                                    />
                                </Popconfirm> */}

                            </div>
                        </div>
                    )
                })}
           </div>
           <ProcessAllSpareDrawer       
         newData={newData}                    
         allSpareProcessModal={props.allSpareProcessModal}
         handleAllSpareProcess={props.handleAllSpareProcess}
                />
        </>
    );
}

const mapStateToProps = ({  refurbish}) => ({
    taskByPhone:refurbish.taskByPhone,
    fetchingTaskByPhoneId:refurbish.fetchingTaskByPhoneId,
    allSpareProcessModal: refurbish.allSpareProcessModal
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getTaskByPhoneId,
            handleAllSpareProcess
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(PhoneListOrderTaskTable);
