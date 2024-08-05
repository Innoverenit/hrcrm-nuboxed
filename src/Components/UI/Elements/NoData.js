import React, { Component } from "react";
import { ApplicationWrapper, FlexContainer } from "../Layout";
import {
  BellOutlined, PlusOutlined,FileFilled
  
} from '@ant-design/icons';

import { Title, SubTitle } from "./";

class NoData extends Component {
  render() {
    const { content } = this.props;

    return (
      <>
        <ApplicationWrapper>
          <FlexContainer
            justifyContent="center"
            alignItems="center"
            style={{ margin: "0em auto", height: "80vh" }}
          >
            <FlexContainer
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              alignSelf="center"
            >
              <FileFilled  type="file"  style={{ fontSize: "3.125em" }} />           
              <Title style={{ textAlign: "center" }}>
                Welcome to the {this.props.content || "Data"} tab.
              </Title>
              <SubTitle
                style={{
                  textAlign: "center",
                  color: "#1890ff",
                  cursor: "pointer",
                }}
                onClick={this.props.onClick || undefined}
              >
                Let us help you get started, click <PlusOutlined type="plus" /> Create{" "}
                {this.props.content || "Data"}
              </SubTitle>
            </FlexContainer>
          </FlexContainer>
        </ApplicationWrapper>
      </>
    );
  }
}
//       <>
//         <BundleLoader />
//         {content === "ViewPort" ? (
//           <>
//             <ApplicationWrapper>
//               <FlexContainer
//                 justifyContent="center"
//                 alignItems="center"
//                 style={{ margin: "0em auto", height: "80vh" }}
//               >
//                 <FlexContainer
//                   flexDirection="column"
//                   justifyContent="center"
//                   alignItems="center"
//                   alignSelf="center"
//                 >
//                   <Icon
//                     type="file"
//                     theme="filled"
//                     style={{ fontSize: "3.125em" }}
//                   />
//                   <FlexContainer
//                     flexWrap="nowrap"
//                     alignItems="center"
//                     justifyContent="center"
//                     alignSelf="center"
//                   >
//                     <Title style={{ textAlign: "center" }}>
//                       Welcome to the {this.props.content || "Data"} tab.
//                     </Title>
//                   </FlexContainer>
//                   <SubTitle
//                     style={{
//                       textAlign: "center",
//                       color: "#1890ff",
//                       cursor: "pointer"
//                     }}
//                   // onClick={this.props.onClick || undefined}
//                   >
//                     Let us help you get started, select user from top left.
//                   </SubTitle>
//                 </FlexContainer>
//               </FlexContainer>
//             </ApplicationWrapper>
//           </>
//         ) : (
//             <>
//               <ApplicationWrapper>
//                 <FlexContainer
//                   justifyContent="center"
//                   alignItems="center"
//                   style={{ margin: "0em auto", height: "80vh" }}
//                 >
//                   <FlexContainer
//                     flexDirection="column"
//                     justifyContent="center"
//                     alignItems="center"
//                     alignSelf="center"
//                   >
//                     <Icon
//                       type="file"
//                       theme="filled"
//                       style={{ fontSize: "3.125em" }}
//                     />
//                     <FlexContainer
//                       flexWrap="nowrap"
//                       alignItems="center"
//                       justifyContent="center"
//                       alignSelf="center"
//                     >
//                       <Title style={{ textAlign: "center" }}>
//                         Welcome to the {this.props.content || "Data"} tab.
//                     </Title>
//                     </FlexContainer>
//                     <SubTitle
//                       style={{
//                         textAlign: "center",
//                         color: "#1890ff",
//                         cursor: "pointer"
//                       }}
//                       onClick={this.props.onClick || undefined}
//                     >
//                       Let us help you get started, click <Icon type="plus" />{" "}
//                       Create {this.props.content || "Data"}
//                     </SubTitle>
//                   </FlexContainer>
//                 </FlexContainer>
//               </ApplicationWrapper>
//             </>
//           )}
//       </>
//     );
//   }
// }

export default NoData;
