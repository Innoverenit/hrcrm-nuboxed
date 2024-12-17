import React ,{ lazy, Suspense} from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {getProductionTable} from "./ProductionAction"

const ProductionTableView=lazy(()=>import("./Child/ProductionTableView"));
const ProductionTimeLine=lazy(()=>import("./Child/ProductionTimeLine"));
const NodataFoundPage=lazy(()=>import("../../Helpers/ErrorBoundary/NodataFoundPage"));

const ProductionDashCard = (props) => {
   
    return (
        <div className="parentContainer">

    {!props.fetchingProductionTable && props.productionTableData.length === 0 ? (
       <div style={{marginLeft:"27em"}}>
        <NodataFoundPage/>
        </div>
    ) : (
        
        <>
        <Suspense>
            <div className="leftContainer">
                {/* Render ProductionTableView */}
                <ProductionTableView
                        translateText={props.translateText}
                        selectedLanguage={props.selectedLanguage}
                    fetchingProductionTable={props.fetchingProductionTable}
                    productionTableData={props.productionTableData}
                />
            </div>
            <div className="rightContainer">
                {/* Render ProductionTimeLine */}
                <ProductionTimeLine 
                        translateText={props.translateText}
                        selectedLanguage={props.selectedLanguage}
                productionProductId={props.productionTableData[0].productionProductId}
                    // productionTableData={props.productionTableData}
                />
            </div>
            </Suspense>
        </>
    )}
</div>

    );
};



const mapStateToProps = ({ production, auth, inventory }) => ({
    // productionByLocsId: production.productionByLocsId,
    // fetchingProductionLocId: production.fetchingProductionLocId,
    // locationId: auth.userDetails.locationId,
    // orgId: auth.userDetails.organizationId,
    // user: auth.userDetails,
   
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

