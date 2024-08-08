import React, { useState, useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Tooltip, Checkbox } from "antd";
import { Formik, Form, Field } from "formik";
import { SelectComponent } from "../../../../Components/Forms/Formik/SelectComponent";

import { getProcess } from "../../../Settings/SettingsAction";
import { addSla } from "../../RulesAction";
import { Editor } from "react-draft-wysiwyg";
import {
    EditorState,
    convertToRaw,
    ContentState,
    convertFromHTML,
} from "draft-js";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import CustomOption from "./CustomOption";
import { addMatrix, getMatrix } from "../../RulesAction";


function MessagingForm(props) {
    const [editorState, seteditorState] = useState(EditorState.createEmpty());

    const [priority, setPriority] = useState("High");
    const [currentData, setCurrentData] = useState("");

    function onEditorStateChange(editorState) {
        console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));
        seteditorState(editorState);
    }
    function handleButtonClick(data) {
        setPriority(data);
    }

    useEffect(() => {
        console.log(props.processId);
        console.log(priority);
        props.getMatrix(props.processId, priority);
    }, [props.processId, priority]);
    useEffect(() => {
        console.log(typeof props.matrix.messagingFile);
        if (props.matrix.messagingFile) {
            debugger;

            seteditorState(
                EditorState.createWithContent(
                    ContentState.createFromBlockArray(
                        convertFromHTML(props.matrix.messagingFile)
                    )
                )
            );
        } else {
            seteditorState(EditorState.createEmpty());
        }
    }, [props.matrix.messagingFile]);
    useEffect(() => {
        setCurrentData(props.matrix);
    }, [props.matrix]);
    console.log(currentData);
    const toData = useMemo(() => {
        return (
            currentData.salesReportingManager &&
            currentData.salesReportingManager.to.map((item) => {
                return item;
            })
        );
    }, [currentData]);

    const nonSalesReceiverData = useMemo(() => {
        return (
            currentData.nonSalesreportingMangaer &&
            currentData.nonSalesreportingMangaer.nonSalesReceiver.map((item) => {
                return item;
            })
        );
    }, [currentData]);

    console.log(toData);
    return (
        <>
            <Formik
                enableReinitialize
                initialValues={{
                    priority: priority,
                    processId: props.processId,
                    salesReportingManager: {
                        to: toData ? toData : [],
                    },
                    nonSalesreportingMangaer: {
                        nonSalesReceiver: nonSalesReceiverData ? nonSalesReceiverData : [],
                    },
                }}
                onSubmit={(values) => {
                    const editText = draftToHtml(
                        convertToRaw(editorState.getCurrentContent())
                    );

                    props.addMatrix({
                        ...values,
                        priority: priority,
                        processId: props.processId,
                        messagingFile: editText,
                    });
                }}
            >
                {({ values }) => (
                    <Form className="form-background">
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <div
                                style={{
                                    height: "100%",
                                    width: "100%",
                                }}
                            >
                            <div class=" flex flex-row flex-wrap items-start self-start justify-start grow shrink h-auto mr-auto ">
                                    <div style={{ width: "18%" }}>
                                        {" "}
                                        <div class=" text-xs font-bold font-poppins text-black">Priority</div>
                                    </div>
                                    <div>
                                        {" "}
                                        <div class=" text-xs font-bold font-poppins text-black">Executor</div>
                                    </div>
                                </div>
                                <mt-3 />
                                <div class=" flex flex-row flex-wrap items-start self-start justify-between grow shrink h-auto mr-auto  w-full">
                                    <div
                                        style={{
                                            width: "15%",
                                            display: "flex",
                                            justifyContent: "space-between",
                                            padding: "0.625em 0em",
                                        }}
                                    >
                                        <Tooltip title={"High"}>
                                            <div
                                                onClick={() => handleButtonClick("High")}
                                                style={{
                                                    cursor: "pointer",
                                                    borderRadius: "50%",
                                                    height: "2.1875em",
                                                    width: "2.1875em",
                                                    border: "0.0625em solid grey",
                                                    backgroundColor:
                                                        priority === "High" ? "red" : "white",
                                                }}
                                            ></div>
                                        </Tooltip>
                                        <Tooltip title={"Medium"}>
                                            <div
                                                onClick={() => handleButtonClick("Medium")}
                                                style={{
                                                    cursor: "pointer",
                                                    borderRadius: "50%",
                                                    height: "2.1875em",
                                                    width: "2.1875em",
                                                    border: "0.0625em solid grey",
                                                    backgroundColor:
                                                        priority === "Medium" ? "Orange" : "white",
                                                }}
                                            ></div>
                                        </Tooltip>
                                        <Tooltip title={"Low"}>
                                            <div
                                                onClick={() => handleButtonClick("Low")}
                                                style={{
                                                    cursor: "pointer",
                                                    borderRadius: "50%",
                                                    height: "2.1875em",
                                                    width: "2.1875em",
                                                    border: "0.0625em solid grey",
                                                    backgroundColor:
                                                        priority === "Low" ? "teal" : "white",
                                                }}
                                            ></div>
                                        </Tooltip>
                                    </div>

                                    <div style={{ width: "40%" }}>
                                        <Field
                                            name="salesReportingManager.to"
                                            label="Sales User"
                                            style={{
                                                flexBasis: "80%",

                                                marginTop: "0.25em",
                                            }}
                                            mode
                                            component={SelectComponent}
                                            options={["Reporting Manager", "Reporting Manager +1"]}
                                        />
                                    </div>
                                    <div style={{ width: "40%" }}>
                                        <Field
                                            name="nonSalesreportingMangaer.nonSalesReceiver"
                                            label="Non Sales User"
                                            style={{
                                                flexBasis: "80%",

                                                marginTop: "0.25em",
                                            }}
                                            mode
                                            component={SelectComponent}
                                            options={[
                                                "Sales Task Owner",
                                                "Non salesreporting Manager",
                                                "reporting Manager",
                                                "Reporting Manager +1",
                                            ]}
                                        />
                                    </div>
                                </div>
                                <mt-3 />
                                <div class=" text-xs font-bold font-poppins text-black">Email</div>
                                <div>
                                    Same For Notification&nbsp;&nbsp;
                  <Checkbox>Yes</Checkbox>
                                    <Checkbox>No</Checkbox>
                                </div>
                                <mt-3 />
                                <Editor
                                    editorState={editorState}
                                    wrapperClassName="demo-wrapper"
                                    editorClassName="demo-editor"
                                    editorStyle={{
                                        height: 250,
                                        overflow: "auto",
                                        border: "0.0625em solid #aaa",
                                        padding: "0.3125em 0.625em ",
                                    }}
                                    toolbarCustomButtons={[<CustomOption />]}
                                    onEditorStateChange={onEditorStateChange}
                                // placeholder={placeholder || "Type here"}
                                />
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    // disabled={!empty.length}
                                    // Loading={sendingEmail}
                                    style={{ marginTop: "0.625em" }}
                                >
                                    Update
                </Button>
                            </div>
                            {/* <div
                style={{
                  height: "100%",
                  width: "55%",
                }}
              >
               
              </div> */}
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    );
}

const mapStateToProps = ({ settings, rule }) => ({
    Process: settings.Process,

    matrix: rule.matrix,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        { getProcess, addSla, addMatrix, getMatrix },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(MessagingForm);
