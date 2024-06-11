import React,{ useEffect, useState, lazy }  from 'react'
import { FormattedMessage } from "react-intl";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {getManufactureDetailsData} from "../ProductionAction"

function ManufactureListData(props) {

    const [page, setPage] = useState(0);
    useEffect(() => {
        // props.emptyManufactureLink()
       props.getManufactureDetailsData(props.productionProductId,page)
      }, []);
      const handleLoadMore = () => {
        setPage(page + 1);
        props.getManufactureDetailsData(props.productionProductId,page)
    };
  return (
    <div>ManufactureListData</div>
  )
}



const mapStateToProps = ({
    auth,
    customer,
    sector,
    opportunity,
    employee,
    report,
    production
  }) => ({
 
    // viewType: customer.viewType,
   // manufactureLinkData:production.manufactureLinkData,
  
    //userId: auth.userDetails.userId,
    manufactureDetailsData:production.manufactureDetailsData,
  });
  const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
      {
        getManufactureDetailsData
        // getManufactureLinkData
      },
      dispatch
    );
  export default connect(mapStateToProps, mapDispatchToProps)(ManufactureListData);

