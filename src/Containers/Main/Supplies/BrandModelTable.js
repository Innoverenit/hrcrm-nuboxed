import React, { useEffect, useState } from 'react'
import { StyledTable } from '../../../Components/UI/Antd'
import { getBrandModel,addMasterList } from "./SuppliesAction"
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Button } from 'antd'

const BrandModelTable = (props) => {
    useEffect(() => {
       props.getBrandModel()
    }, [])
    const [selectedRow, setselectedRow] = useState([]);

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setselectedRow(selectedRows);
        },
    };
    console.log(selectedRow)
    const IdList = selectedRow.map(function (item) {
        return item['phoneMasterListId'];
    });
    const handleSubmit = () => {
        props.addMasterList({
            phoneMasterListIds: IdList,
            suppliesId: props.particularDiscountData.suppliesId
        })
    }
    const columns = [
        {
            width: "2%"
        },
        {
            title: "Brand",
            dataIndex: "brand"
        },
        {
            title: "Model",
            dataIndex: "model"
        }
    ]
    const tab = document.querySelector(".ant-layout-sider-children");
    const tableHeight = tab && tab.offsetHeight * 1.2;
    return (
        <>
            <StyledTable
                rowKey="phoneMasterListId"
                dataSource={props.brandModel}
                columns={columns}
                scroll={{ y: tableHeight }}
                pagination={false}
            rowSelection={rowSelection}
            />
            <div class="flex justify-end">
                <Button
                    type="primary"
                onClick={handleSubmit}
                loading={props.addingMasterList}
                >
                    Submit
                </Button>
            </div>
        </>
    )
}
const mapStateToProps = ({ supplies}) => ({
    brandModel: supplies.brandModel,
    addingMasterList:supplies.addingMasterList
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getBrandModel,
            addMasterList,

        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(BrandModelTable);

