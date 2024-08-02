import React, {  Component } from 'react'
import { base_url } from "../../../../../../../../Config/Auth";
import FileCopyIcon from '@mui/icons-material/FileCopy';
import { MainWrapper } from '../../../../../../../../Components/UI/Layout'
import {
    getCandidateDocument,  
  } from "../../../../../../../Candidate/CandidateAction";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import styled from 'styled-components'

class RecruitmentDocumentCard extends Component {
    componentDidMount() {
        const {
          candidate: { candidateId },
          getCandidateDocument,
        } = this.props;
        //console.log("can",this.props.candidateId)
        getCandidateDocument(candidateId);
      }
     

//   handleAddPlusClick = (productId, merchantDetailsId) => {
//     const cartId = sessionStorage.getItem('cartId')

//     let data = {
//       itemId: productId,
//       cartId: cartId,
//       identifierType: '',
//       quantity: 1,
//       storeTerminal: {
//         storeId: merchantDetailsId,
//       },
//     }

//     this.props.LinkProductInfo(data)
//   }

// componentDidMount() {
//     this.props.getCandidateById(this.props.userId);
 
//   }
  
  render() {

    return (
      
        <MainWrapper>
            <h1 style={{fontSize:"0.875em"}}>Document</h1>
            <div class="flex"> 
               {this.props.documentsByCandidateId.map((item) => { 
                  return ( 
             
                 
                    <CardElement>
                      <CardImage>
                      <a
              href={`${base_url}/document/${item.documentId}`}
            // target="_blank"
            >
                         <FileCopyIcon 
                   style={{fontSize:"40px",color:"blue"}}
                
                  />
                   </a>
                                
                      {/* <CardDescription> */}
                        {/* <Header>
                             {item.documentName} 
                            </Header> */}
                        </CardImage>
                        {/* <Price>
                          {item.price} {item.currencyName}
                        </Price> */}
                        {/* <Price>Color: {item.productColour}</Price> */}
                         <Price>{item.documentContentType} </Price> 
                      
                        {/* <Desc dangerouslySetInnerHTML={{ __html: item.description }}></Desc> */}                     
                      {/* </CardDescription> */}

                    </CardElement>
                  )   
                      })} 
              </div>     

            </MainWrapper>   
    
    )
              }
}

const mapStateToProps = ({ candidate, auth }) => ({
    // userId: auth.userDetails.userId,
    documentsByCandidateId:candidate.documentsByCandidateId
    
})

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        // getCandidateListByUserId,
        // getCandidateById,
        getCandidateDocument
        // handleCandidateDrawerModal
    //   LinkProductInfo
    },
    dispatch,
  )

export default connect(mapStateToProps, mapDispatchToProps)(RecruitmentDocumentCard)

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
`
const CardDescription = styled.div`
  
  @media only screen and (max-width: 600px) {
    width: 100%;
    display:flex;
    align-items: center;
    flex-direction:column
  }
`
const CardImage = styled.div`
  
  width:200;
  display:flex;
  height:200
  @media only screen and (max-width: 600px) {
    width: 100%;
    display:flex;
    align-items: center;
    flex-direction:column
  }
`
const WithOutImage = styled.div`
  
  width:200px;
  height:200px;
  display:flex;
    align-items: center;
    flex-direction:column
  @media only screen and (max-width: 600px) {
    width: 100%;
    display:flex;
    align-items: center;
    flex-direction:column
  }
`

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
`
const Desc = styled.p`
  height: 0px;
`
const Price = styled.div`
  height: 1.5em;
  font-weight: 700;
  font-family: Poppins;
  font-size: 1em;
  white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis
`

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
