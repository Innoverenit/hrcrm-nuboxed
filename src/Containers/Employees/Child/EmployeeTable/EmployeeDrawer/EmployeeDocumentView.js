import React, { Suspense, Component } from 'react';
import { base_url } from '../../../../../Config/Auth';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import styled from 'styled-components';

class EmployeeDocumentView extends Component {
  render() {
    return (
      <>
      <div class="flex"> 
          {this.props.documentsByEmployeeId.length === 0?<div class=" flex items-center mt-8">Data Not Available</div>:this.props.documentsByEmployeeId.map((item) => {
            return (
              <CardElement key={item.documentId}>
                <MainWrapper>
                  <CardImage>
                    <a href={`${base_url}/document/${item.documentId}`}>
                      <FileCopyIcon style={{ fontSize: "1.5rem", color: "cornflowerblue" }} />
                    </a>
                  
                  </CardImage>
                 
                  <Price>{item.documentContentType}</Price>
                </MainWrapper>
                <div>{item.documentName}</div> 
              </CardElement>
            )
          })}
        </div>
      </>
    )
  }
}

const MainWrapper = styled.div`
  border-radius: 2px;
  box-shadow: 0 0.5em 0.375em -0.375em rgb(46 44 44);
  border: 0.0625em solid #eee;
  background-color: #fff;
  color: #444;
  margin: 0.2rem;
  padding: 0.3rem;
`



const CardElement = styled.div`
  border-radius: 0.2rem;
  height: auto;
  color: rgb(68, 68, 68);
  margin: 0.3rem;
  padding: 0.3rem;
  width: 6vw;
  margin-top: 0.5em;
  
  @media only screen and (max-width: 600px) {
    width: 100%;
  }
`

const CardImage = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  
  a {
    text-decoration: none;
  }

  h1 {
    text-align: center;
    margin-top: 0.5em;
  }
`

const Price = styled.div`
  height: 1.5em;
  font-weight: 500;
  font-family: Poppins;
  font-size: 1em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export default EmployeeDocumentView;
