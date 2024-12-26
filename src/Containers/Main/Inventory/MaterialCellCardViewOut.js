import React, { useEffect } from 'react';
import { Card,Progress } from 'antd';
import { getCellData } from "./InventoryAction"
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


const data = [
    {
        cellname: 'A',
        itemList: [
            { name: "Turbine", unit: "5" },
            { name: "Bled", unit: "2" },
            { name: "Nokia", unit: "6" },
        ],

    },
    {
        cellname: 'B',
        itemList: [
            { name: "Car", unit: "7" },
            { name: "Bled", unit: "9" },
            { name: "Samsung", unit: "8" },
        ],
    },
    {
        cellname: 'C',
        itemList: [
            { name: "Turbine", unit: "5" },
            { name: "Bled", unit: "4" },
            { name: "Redmi", unit: "4" },
        ],
    },

];



const MaterialCellCardViewOut = (props) => {

    useEffect(() => {
        props.getCellData(props.locationId, props.orgId)
    }, [])
    console.log(props.cellData)
    return (
        <div  className="flex flex-wrap ml-4 !text-lm" style={{  gap: 20 }}>
            {props.cellData.map((item, index) => (
                <Card key={index} title={`${item.cellChamber}`}>
                    {item.suppliesData.map((itemlist, ind) => {
                        return (
                            <div key={ind} >
                                <div>{itemlist.suppliesFullName}</div>
                                
                                  
                                   <div>
                                    <Progress percent={itemlist.balanced} />
                                    </div>
                                    
                                    {/* <Progress percent={itemlist.unitUsed} /> */}
                            </div>
                        )
                    })}
                </Card>
            ))}
        </div>
    );
};

const mapStateToProps = ({ inventory, auth }) => ({
    cellData: inventory.cellData,
    orgId: auth.userDetails.organizationId,
    locationId:auth.userDetails.locationId
    // locationId: inventory.inventoryDetailById.locationDetailsId,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getCellData
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(MaterialCellCardViewOut);
