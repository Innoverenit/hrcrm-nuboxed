import React, {useState} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router";
import dayjs from "dayjs";
import { FormattedMessage } from "react-intl";

function CollectionActionRight (props){
  const [selectedTodayRowDistributor,setSelectedTodayRowDistributor] = useState([]);
  const [selectedRowDistributor, setSelectedRowDistributor] = useState([]);

  const resultForToday = selectedTodayRowDistributor.reduce((acc, item) => {
    acc = acc + item.paymentAmount;
    return acc;
  }, 0);

  const resultForDis = selectedRowDistributor.reduce((acc, item) => {
    acc = acc + item.paymentAmount;
    return acc;
  }, 0);
    return (
<>
<div class="flex justify-evenly">
<div class="font-bold flex justify-center"> <FormattedMessage
                              id="app.receivable"
                              defaultMessage="Receivables"
                            />: ₹ {resultForToday.toFixed(2)}</div>
&nbsp;&nbsp;
<div class="font-bold flex justify-center">
<FormattedMessage
                              id="app.balanceasof"
                              defaultMessage="Balance as of"
                            />{dayjs().format("ll")} : ₹{resultForDis.toFixed(2)}
</div>
</div>
    </>
    )
    

}
const mapStateToProps = ({ auth }) => ({
  user: auth.userDetails,
});
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CollectionActionRight)
);
