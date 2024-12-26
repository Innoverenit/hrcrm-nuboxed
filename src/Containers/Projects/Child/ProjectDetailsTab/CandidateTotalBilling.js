import React, { useEffect,Suspense,lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getCandidateTotalBilling} from "../../ProjectsAction"

import CandidateBillingTable from "./CandidateBillingTable";
import CandidateProjectsHeader from "./CandidateProjectsHeader";



const CandidateTotalBilling =(props)=>{
  console.log(props.startDate);
  useEffect(() => {
     const { userId, startDate, endDate, organizationId } = props;
    props.getCandidateTotalBilling(props.match.params.candidateId,props.match.params.projectId, startDate, endDate,);
  }, [props.endDate,props.startDate ]);
  return(
   
<>
<Suspense fallback={"Loading..."}>
<CandidateProjectsHeader/>
<CandidateBillingTable
candidateTotalBilling={props.candidateTotalBilling}
/>
</Suspense>

</>
  );

}
const mapStateToProps = ({ projects }) => ({
  teamProject:projects.teamProject,
  startDate: projects.startDate,
  endDate: projects.endDate,
  fetchingCandidateTotalBilling: projects.fetchingCandidateTotalBilling,
   candidateTotalBilling:projects.candidateTotalBilling,
});
const mapDispatchToProps = (dispatch) =>
bindActionCreators(
  {
      getCandidateTotalBilling,
  },
  dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(CandidateTotalBilling)
