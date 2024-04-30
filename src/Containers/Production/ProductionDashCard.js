import React from 'react';
import ProductionTableView from "./Child/ProductionTableView"
import ProductionTimeLine from "./Child/ProductionTimeLine"

const ProductionDashCard = () => {
    return (
        <div className="parentContainer">
            <div className="leftContainer">
                {/* Component 1 goes here */}
                {/* <Component1 /> */}
                <ProductionTableView/>
            </div>
            <div className="rightContainer">
                {/* Component 2 goes here */}
                <ProductionTimeLine />
            </div>
        </div>
    );
};

export default ProductionDashCard;
