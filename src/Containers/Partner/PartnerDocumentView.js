import React, { Suspense, Component } from "react";
import { connect } from "react-redux";
import FileCopyIcon from '@mui/icons-material/FileCopy';
import { bindActionCreators } from "redux";
import styled from "styled-components";

class PartnerDocumentView extends Component {
  render() {
    return (
      <>
        <CardWrapper>
          {this.props.documentsByPartnerId.map((item) => {
            return (
              <CardElement>
                <CardImage>
                  <FileCopyIcon
                    style={{ fontSize: "64px", color: "blue" }}
                    icon={solid("file")}
                  />
                </CardImage>
                <Price>{item.documentContentType} </Price>
              </CardElement>
            );
          })}
        </CardWrapper>
      </>
    );
  }
}

const mapStateToProps = ({ partner, auth }) => ({});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PartnerDocumentView);

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
  //border:2px solid #EEEEEE;
  //background-color: rgb(255, 255, 255);
  height: auto;
  color: rgb(68, 68, 68);
  margin: 0.3rem;
  padding: 0.3rem;
  width: 6vw;

  //   padding: 0 20px;
  margin-top: 0.5em;
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


const Desc = styled.p`
  height: 0px;
`;
const Price = styled.div`
  height: 1.5em;
  font-weight: 700;
  font-family: Poppins;
  font-size: 1em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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
    // background: yellow;
    color: blue;
  }
`;
const PulseIcon1 = styled(AppIcon1)`
  color: green;
  &:hover {
    // background: yellow;
    color: blue;
  }
`;
