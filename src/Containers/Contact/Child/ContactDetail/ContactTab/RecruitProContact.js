import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import dayjs from "dayjs";
import { Input, Switch, Button, Checkbox } from 'antd';
import { getContactRecruit } from "../../../ContactAction";

const RecruitProContact = (props) => {
    const [editMode, setEditMode] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]); 
    const [inputValues, setInputValues] = useState({}); 

    useEffect(() => {
        props.getContactRecruit(props.contactId)
        
    }, []);



    return (
        <div className="flex flex-col w-full p-4">
            <div className="flex sticky z-auto">
                    <div className="rounded m-1 p-1 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
                        <div className="flex justify-between w-[99.5%] p-1 bg-transparent font-bold sticky z-10">
                           
                            <div className="md:w-[6.1rem]">Job ID</div>
                            <div className="md:w-[7.1rem]">Requirement</div>
                            <div className="md:w-[7.12rem]">Quotation</div>
                            <div className="md:w-[6.12rem]">Close By</div>
                            <div className="md:w-[5.1rem]">Start</div>
                            <div className="md:w-[6.8rem]">Rate/hr</div>
                            <div className="md:w-[7.13rem]">Experience</div>
                            <div className="md:w-[7.14rem]">Skill Set</div>
                            <div className="md:w-[7.15rem]">OnBoarded</div>
                            <div className="md:w-[5.1rem]">Owner</div>
                            <div className="md:w-[5.3rem]">Sponsor</div>
                        </div>
                        <div className="h-[74vh]">
                            {props.contactRecruit.map((item) => {
                                const currentdate = dayjs().format("DD/MM/YYYY");
                                const date = dayjs(item.paymentDate).format("DD/MM/YYYY");
                         
                                return (
                                    <>
                                    <div className="flex rounded justify-between mt-1 bg-white h-8 items-center p-1">
                                       
                                        <div className="flex font-medium justify-between w-[10.25rem]">
                                            <div className="font-normal text-[0.85rem] font-poppins flex items-center">
                                                {item.name}
                                            </div>
                                        </div>
                                    </div>
                                    </>
                                )
                               
                                
                            })}
                        </div>
                    </div>
                </div>
        </div>
    );
};

const mapStateToProps = ({ contact, auth }) => ({
    userId: auth.userDetails.userId,
    orgId: auth.userDetails.organizationId,
    contactRecruit:contact.contactRecruit,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
          getContactRecruit,

        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(RecruitProContact);
