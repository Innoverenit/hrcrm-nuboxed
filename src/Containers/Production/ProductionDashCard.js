import React ,{useEffect} from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {getProductionTable} from "./ProductionAction"
import ProductionTableView from "./Child/ProductionTableView"
import ProductionTimeLine from "./Child/ProductionTimeLine"

const ProductionDashCard = (props) => {
    useEffect(() => {
        props.getProductionTable(props.userId);
        // setPage(page + 1);
        // props.getRoomRackByLocId(props.locationId, props.orgId);
    }, []);
    return (
        <div className="parentContainer">
            <div className="leftContainer">
                {/* Component 1 goes here */}
                {/* <Component1 /> */}
                <ProductionTableView
                productionTableData={props.productionTableData}
                />
            </div>
            <div className="rightContainer">
                {/* Component 2 goes here */}
                <ProductionTimeLine 
                productionTableData={props.productionTableData}
                />
            </div>
        </div>
    );
};



const mapStateToProps = ({ production, auth, inventory }) => ({
    // productionByLocsId: production.productionByLocsId,
    // fetchingProductionLocId: production.fetchingProductionLocId,
    // locationId: auth.userDetails.locationId,
    // orgId: auth.userDetails.organizationId,
    // user: auth.userDetails,
    productionTableData:production.productionTableData,
    // openbUILDERProductiondrawer: production.openbUILDERProductiondrawer,
    // clickedProductionIdrwr: production.clickedProductionIdrwr,
    // organizationId: auth.userDetails.organizationId,
    userId: auth.userDetails.userId,
    // roomRackbyLoc: inventory.roomRackbyLoc,
    // rackList: inventory.rackList,
    // orgId: auth.userDetails.organizationId,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getProductionTable,
            
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductionDashCard);

