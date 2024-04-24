import { EditOutlined } from "@ant-design/icons";
import { Input, Popconfirm ,Button, Form,Typography } from "antd";
import React, { useState,useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledTable } from "../../../../../Components/UI/Antd";
import { Select } from "../../../../../Components/UI/Elements";
import { getCurrencyConversion } from "../../../SettingsAction";

const { Option } = Select;
const ButtonGroup = Button.Group;


function OneTimeTable (props) {
    useEffect(()=> {
        props.getCurrencyConversion(props.orgId);
    },[]);

    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    const [editingKey, setEditingKey] = useState('');
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
        const inputNode = <Input />;
        return (
            <td {...restProps}>
                {editing && inputType === "picker"  ? (
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
                        {inputNode}
                    </Form.Item>
                ) : editing && inputType !== "picker" ? (
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
                  {["USD", "EURO","GBP","INR"].map((item) => {
                    return <Option value={item}>{item} </Option>;
                  })}
                </Select>
              </Form.Item>
          ):(
                    children
                )}
            </td>
        );
    };
    useEffect(() => {
        setData(props.conversionCurrencies)
    }, [props.conversionCurrencies])

    const isEditing = (record) => record.currencyConversionid === editingKey;

    const edit = (record) => {
        form.setFieldsValue({
            value1: '',
            currency1: '',
            value2: '',
            currency2: '',
           
            ...record,
        });
        setEditingKey(record.currencyConversionid);
    };

    const cancel = () => {
        setEditingKey('');
    };
    const save = async (key) => {
        try {
            const row = await form.validateFields();
            const newData = [...data];
            const index = newData.findIndex((item) => key === item.currencyConversionid);
            if (index > -1) {
                // alert("if");
                const item = newData[index];
                console.log(item)
                newData.splice(index, 1, { ...item, ...row });
                const a = newData[index];
                
                    props.addOneTimeDeliveryCharge(
                        {
                            value1: a.value1,
                            currency1: a.currency1,
                            value2: a.value2,
                            currency2: a.currency2,
                            // userId: props.userId,
                            currencyConversionid: a.currencyConversionid,
                            
                        }, 
                    );

                setEditingKey('');
            } else {
                alert("else");
                newData.push(row);
                // setData(newData);
                setEditingKey('');
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };
        const {
            oneTimeDeliveryCharge,
            fetchingOneTimeDeliveryCharge,
        } = props;


        const columns = [
            {
                title: "",
                width: "5%",
            },
            {
                title: "From",
                dataIndex: "reportingCurrency",
                width: "12%",
                // editable: true,
            },
            {
                title: "To",
                dataIndex: "conversionCurrency",
                width: "12%",
                editable: true,
            },
            {
                title: "Conversion Factor",
                dataIndex: "conversionFactor",
                width: "12%",
                editable: true,
            },

            {
                title: '',
                width: "10%",
                dataIndex: 'operation',
                render: (_, record) => {
                    const editable = isEditing(record);
                    return editable ? (
                        <span>
                            <Typography.Link
                                onClick={() =>
                                    save(record.currencyConversionid)
                                    // alert("Save success")
                                }
                                style={{
                                    marginRight: 8,
                                }}
                            >
                                Save
                            </Typography.Link>
                            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                                <a>Cancel</a>
                            </Popconfirm>
                        </span>
                    ) : (
                        <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                            <EditOutlined />
                        </Typography.Link>
                    )
                },
            },
        ];

        const mergedColumns = columns.map((col) => {
            if (!col.editable) {
                return col;
            }
    
            return {
                ...col,
                onCell: (record) => ({
                    record,
                    inputType: col.dataIndex === 'currency1' || col.dataIndex === 'currency2' ? 'text' : 'picker',
                    dataIndex: col.dataIndex,
                    title: col.title,
                    editing: isEditing(record),
                }),
            };
        });

        return (
            <>
                {true && (
                     <Form form={form} component={false}>
                    <StyledTable
                        rowKey="currencyConversionid"
                        dataSource={data}
                        loading={props.fetchingCurrencyConversion}
                        scroll={{ y: 320 }}
                        pagination={false}
                        components={{
                            body: {
                                cell: EditableCell,
                            },
                        }}
                        columns={mergedColumns}
                        rowClassName="editable-row"
                    />
                    </Form>
                )}
            </>
        );   
}

const mapStateToProps = ({ settings,auth }) => ({
    fetchingCurrencyConversion: settings.fetchingCurrencyConversion,
    userId: auth.userDetails.userId,
    orgId:auth.userDetails.organizationId,
    conversionCurrencies:settings.conversionCurrencies
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getCurrencyConversion,
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OneTimeTable);