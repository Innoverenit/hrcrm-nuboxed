import React, {Component ,lazy} from "react";
import { MultiAvatar2 } from "../../Components/UI/Elements";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import styled from "styled-components";
import{getPartnerListByUserId,getPartnerDocument,handlePartnerDrawerModal} from './PartnerAction';
const PartnerDetailsView =lazy(()=>import("../Partner/child/PartnerTable/PartnerDetailView"));
class PartnerCardView extends Component {
  render() {
    const{user}=this.props;
    return (
      <>
        <CardWrapper>
          {this.props.partnerByUserId.map((item) => {
            return (
              <CardElement>
                <CardImage>
                  <MultiAvatar2
                    primaryTitle={item.partnerName}
                    imgHeight={200}
                    imgWidth={200}
                    imgRadius={20}
                  />
                  <Header>    
                     <PartnerDetailsView 
            partnerId={item.partnerId}
            partnerName={item.partnerName}
          /></Header>
                </CardImage>
                <Price>100</Price>
                <span
                 className="hover:bg-black"
                  onClick={() => {
                    this.props.getPartnerListByUserId(item.partnerId);
                    this.props.getPartnerDocument(item.partnerId);

                    this.props.handlePartnerDrawerModal(true);
                  }}
                >{user.pulseAccessInd ===true && ( 
                  <PulseIcon></PulseIcon>
                  )}
                </span>
              </CardElement>
            );
          })}
        </CardWrapper>
       
      </>
    )
  }
}

const mapStateToProps = ({ auth, partner }) => ({
  userId: auth.userDetails.userId,
  partner: partner.partner,
  user: auth.userDetails,
  documentsByPartnerId: partner.documentsByPartnerId,
  partnerByUserId: partner.partnerByUserId,
  addDrawerPartnerModal: partner.addDrawerPartnerModal,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getPartnerListByUserId,
      getPartnerDocument,
      handlePartnerDrawerModal,     
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(PartnerCardView);

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

  border-radius: 0.2rem;
  border: 2px solid #eeeeee;
  background-color: rgb(255, 255, 255);
  height: auto;
  color: rgb(68, 68, 68);
  margin: 0.3rem;
  padding: 0.3rem;
  width: 17vw;

  margin-top: 1.5em;
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
  display: flex;
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
  font-size: 1em;
  margin-left:14px;
  color:blue;
  cursor:pointer;
  // font-family: Poppins;
  //font-weight: 700;
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

const AppIcon = (props) => (
  <i
    className={`fas fa-heartbeat ${props.className}`}
    style={{ fontSize: "123%" }}
  ></i>
);

const AppIcon1 = (props) => (
  <i
    className={`fas fa-heartbeat ${props.className}`}
    style={{ fontSize: "145%" }}
  ></i>
);

const PulseIcon = styled(AppIcon)`
  color: #df9697;
  &:hover {
    color: blue;
  }
`;
const PulseIcon1 = styled(AppIcon1)`
  color: green;
  &:hover {
    color: blue;
  }
`;
