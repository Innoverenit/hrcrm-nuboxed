import React, { Suspense, Component } from "react";
import { MultiAvatar } from "../../Components/UI/Elements";
import { getOpportunityListByUserId } from "../Opportunity/OpportunityAction";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import styled from "styled-components";

class OpportunityCardView extends Component {
  componentDidMount() {
    this.props.getOpportunityListByUserId(this.props.userId);
  }

  render() {
    return (
      <>
        <CardWrapper>
          {this.props.opportunityByUserId.map((item) => {
            return (
              <CardElement>
                <CardImage>
                  <MultiAvatar
                    // imageId={item.imageId ? item.imageId : ''}
                    imgHeight={200}
                    imgWidth={200}
                    imgRadius={20}
                  />
                </CardImage>

                <CardDescription>
                  <Header>{item.opportunityName}</Header>
                  <Price>100</Price>
                </CardDescription>
              </CardElement>
            );
          })}
        </CardWrapper>
      </>
    );
  }
}

const mapStateToProps = ({ opportunity, auth }) => ({
  userId: auth.userDetails.userId,
  opportunityByUserId: opportunity.opportunityByUserId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getOpportunityListByUserId,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OpportunityCardView);

const MainWrapper = styled.div`
  /* */
  margin: 0px 20px;
  @media only screen and (max-width: 600px) {
  }
`;
const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;

  @media only screen and (max-width: 600px) {
    justify-content: center;
    flex-direction: column;
  }
`;
const CardElement = styled.div`
  //   width: 20%;
  border-radius: 0.2rem;
  border: 2px solid #eeeeee;
  background-color: rgb(255, 255, 255);
  height: 9em;
  color: rgb(68, 68, 68);
  margin: 0.3rem;
  padding: 0.3rem;
  width: 21vw;
  //   padding: 0 20px;
  margin-top: 1.5em;
  /* margin:0px 20px; */
  @media only screen and (max-width: 600px) {
    width: 100%;
  }
`;
const CardDescription = styled.div`
  @media only screen and (max-width: 600px) {
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
  }
`;
const CardImage = styled.div`
  width: 200;
  height: 200 @media only screen and (max-width: 600px) {
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
  }
`;
const WithOutImage = styled.div`
  width: 200px;
  height: 200px;
  display: flex;
  align-items: center;
  flex-direction:column @media only screen and (max-width: 600px) {
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
  }
`;

const Header = styled.div`
  text-overflow: ellipsis;

  white-space: nowrap;
  overflow: hidden;
  height: 2em;
  font-size: 1.3em;
  font-family: Poppins;
  font-weight: 700;
  @media only screen and (max-width: 600px) {
    text-overflow: ellipsis;

white-space: nowrap;
overflow: hidden;
height: 2em;
font-size: 1.3em;
font-family: Poppins;
font-weight: 700;
width:100%
text-align:center
  }
`;
const Desc = styled.p`
  height: 0px;
`;
const Price = styled.div`
  height: 1.5em;
  font-weight: 700;
  font-family: Poppins;
  font-size: 1em;
`;
