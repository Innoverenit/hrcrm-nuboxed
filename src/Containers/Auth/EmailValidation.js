// import React, { Component } from "react";

// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import { validateEmail } from "./AuthAction";
// import { Title } from "../../Components/UI/Elements";
// import { BundleLoader} from "../../Components/Placeholder";

// class EmailValidation extends Component {
//   constructor(props) {
//     super(props)
//   }
//   handleEmailValidation = () => {
//     const { history, match: { params: { employeeId, token, emailId, organizationId } } } = this.props;
//     this.props.validateEmail(employeeId, token, emailId, organizationId, history);
//   }
//   componentDidMount() {
//     this.handleEmailValidation()
//   }
//   render() {
//     return (
//       <div class="  w-1/2  min-h-[100vh] overflow-auto flex justify-center items-center ">
//   <div class=" p-4 w-wk shadow-[ 0em 0.25em 0.625em -0.125em #444] border-solid bg-white self-center">
//         <div class=" flex flex-col flex-wrap items-center self-start justify-center grow shrink h-auto mr-auto ">
//             <Title color='#f4f4f4' fontFamily='Abel' fontSize={'1.25em'} >Please wait while we are validating your email ...</Title>
//             <BundleLoader />
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// const mapStateToProps = state => ({});

// const mapDispatchToProps = dispatch =>
//   bindActionCreators({ validateEmail }, dispatch);
// export default connect(mapStateToProps, mapDispatchToProps)(EmailValidation)

import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { validateEmail } from "./AuthAction";
import { Title } from "../../Components/UI/Elements";
import { BundleLoader } from "../../Components/Placeholder";

const EmailValidation = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Replaces `useHistory` in React Router DOM v7
  const { employeeId, token, emailId, organizationId } = useParams();

  useEffect(() => {
    props.validateEmail(employeeId, token, emailId, organizationId, navigate);
  }, [ employeeId, token, emailId, organizationId, navigate]);

  return (
    <div className="w-1/2 min-h-[100vh] overflow-auto flex justify-center items-center">
      <div className="p-4 w-wk shadow-[0em 0.25em 0.625em -0.125em #444] border-solid bg-white self-center">
        <div className="flex flex-col flex-wrap items-center self-start justify-center grow shrink h-auto mr-auto">
          <Title color="#f4f4f4" fontFamily="Abel" fontSize="1.25em">
            Please wait while we are validating your email ...
          </Title>
          <BundleLoader />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ validateEmail }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(EmailValidation);
