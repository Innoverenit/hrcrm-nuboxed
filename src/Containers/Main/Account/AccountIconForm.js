import React, { useState } from "react";
import { Formik, Form, Field } from 'formik';
import { connect } from "react-redux";
import { Button, } from "antd";
import { TextareaComponent } from "../../../Components/Forms/Formik/TextareaComponent";

function AccountIconForm(props) {
    const [showDescription, setShowDescription] = useState(false);

    return (
        <Formik
            initialValues={{
                comments: "",
                orgId: props.orgId,
            }}
        >
            {({ values }) => (
                <div className="overflow-y-auto h-[28rem] overflow-x-hidden max-sm:h-[30rem]">
                    <Form>
                        <div className="flex justify-between">
                         
                            <div>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    onClick={() => setShowDescription(!showDescription)}
                                    // className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    {showDescription ? "Hide Description" : "About Customer"}
                                </Button>
                                {showDescription && (
                                     <div className="w-[24rem] flex-col flex">
                                     <div className="mt-3">
                                         <Field
                                             name="comments"
                                             label="Description"
                                             width={"100%"}
                                             isColumn
                                             component={TextareaComponent}
                                         />
                                     </div>
                                 </div>
                                )}
                            </div>
                        </div>
                    </Form>
                </div>
            )}
        </Formik>
    );
}

const mapStateToProps = ({ supplies }) => ({});

export default connect(mapStateToProps)(AccountIconForm);
