import React, { Component } from 'react'
import { Button, Tooltip,Popconfirm } from "antd";
import { FormattedMessage } from "react-intl";
import dayjs from "dayjs";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {removeExpense} from "../Expense/ExpenseAction"
import { TextInput } from "../../../Components/UI/Elements";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { DeleteOutlined } from "@ant-design/icons";
import ViewEditCard from "../../../Components/UI/Elements/ViewEditCard";

class SingleExpenses extends Component {
    constructor(props) {
        super(props)
        this.state = {
            type: '',
            expenseType: "",

        }
    }
    render() {
        const { expense: { expenseType,creationDate, expenseTypeId }, handleChange, name, value, linkedExpenses,
            updatingExpenses, handleUpdateExpense, handleDeleteExpense } = this.props;
        console.log(linkedExpenses)
        const currentdate = dayjs().format("DD/MM/YYYY");
        const date = dayjs(creationDate).format("DD/MM/YYYY");
        // const disableDelete = linkedCustomers && linkedCustomers.includes(typeId)
        return (
            <div class=" w-full cursor-pointer">
                <ViewEditCard>
                    {({ viewType }, toggleViewType) => (
                        viewType === 'view'
                            ?
                            <div class=" flex justify-between" >
                                <div class=" font-semibold" >
                                    {expenseType}&nbsp;&nbsp;&nbsp;
            {date === currentdate ?<span class="text-xs text-[tomato] font-bold"
                                  >
                                    New
                                  </span> : null}
                                </div>
                                <div>
                                    {this.props.expense.editInd?
                         <BorderColorIcon 
                            tooltipTitle="Edit"
                                 iconType="edit"
                            onClick={toggleViewType}
                            style={{fontSize:"1rem"}}
                               />:null}
                              
                                <Tooltip title="Delete">
                                <Popconfirm
                          title="Do you want to delete?"
                          okText="Yes"
                          cancelText="No"
                          onConfirm={() => this.props.removeExpense(expenseTypeId )}
                        >
                    <DeleteOutlined

                    //   onClick={() => handleDeleteExpense(expenseTypeId)}
                  
                      style={{
                        verticalAlign: "center",
                        marginLeft: "1rem",
                        fontSize:"1rem",
                        color: "red",
                      }}
                    />
                       </Popconfirm>
                  </Tooltip>
                            
                                  
                                </div>
                            </div>
                            :
                            <div class=" flex">
                                <TextInput
                                    name={name}
                                    // value={value || expenseType}
                                    defaultValue={expenseType}
                                    onChange={handleChange}
                                    style={{ width: '60%' }}
                                />
                              
                                <div class=" ml-auto" >
                                <Button
                                    type='primary'
                                    htmlType='submit'
                                    loading={updatingExpenses}
                                    disabled={!value}
                                    onClick={() => handleUpdateExpense(expenseTypeId, value, toggleViewType())}
                                >
                                    {/* Save */}
                                    <FormattedMessage
                                       id="app.update"
                                       defaultMessage="Update"
                                    />
                                </Button>
                                <Button
                                    type='cancel'
                                    
                                  
                                    onClick={() => toggleViewType()}
                                >
                                    {/* Cancel */}
                                    <FormattedMessage
                                        id="app.cancel"
                                        defaultMessage="Cancel"
                                    />
                                </Button>
                                </div>
                            </div>
                    )}
                </ViewEditCard>
            </div>
        )
    }
}

const mapStateToProps = ({ departments, sector }) => ({

});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        removeExpense,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(SingleExpenses);



