import React, { useState ,useEffect} from "react";
import { Formik, Form, Field } from 'formik';
import { connect } from "react-redux";
import { Button, } from "antd";
import { bindActionCreators } from "redux";
import {getChatgpt} from "../Account/AccountAction"
import { TextareaComponent } from "../../../Components/Forms/Formik/TextareaComponent";

function AccountIconForm(props) {
    const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchMenuTranslations = async () => {
        try {
          setLoading(true); 
          const itemsToTranslate = [
              "Description"
          ];
  
          const translations = await props.translateText(itemsToTranslate, props.selectedLanguage);
          setTranslatedMenuItems(translations);
          setLoading(false);
        } catch (error) {
          setLoading(false);
          console.error('Error translating menu items:', error);
        }
      };
  
      fetchMenuTranslations();
    }, [props.selectedLanguage]);
    const [showDescription, setShowDescription] = useState(false);
    // useEffect(() => {
    //     props.getChatgpt()
    //    }, []);
    const handleAboutCustomerClick = () => {

        props.getChatgpt();
      };
    return (
        <Formik
            initialValues={{
              
                comments:props.chatGpt.comments || "",
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
                                    onClick={() => {
                                        setShowDescription(!showDescription);
                                        handleAboutCustomerClick(); 
                                      }}
                                    // onClick={() => setShowDescription(!showDescription)}
                                    // className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    {showDescription ? "Hide Description" : "About Customer"}
                                </Button>
                                {showDescription && (
                                     <div className="w-[24rem] flex-col flex">
                                     <div className="mt-3">
                                         <Field
                                             name="comments"
                                             label= {translatedMenuItems[0]}
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

const mapStateToProps = ({ distributor }) => ({
    chatGpt:distributor.chatGpt,
    fetchingChatgpt:distributor.fetchingChatgpt,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        getChatgpt
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(AccountIconForm);
