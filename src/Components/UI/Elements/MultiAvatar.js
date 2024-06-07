import React from "react";
//import Avatar from "antd/lib/avatar";
import { ProgressiveImage } from "../../Utils";
import { Icon, Empty, Tooltip, Input, Button, Avatar, Rate } from "antd";
import { base_url } from "../../../Config/Auth";
import ProfilePreview from "../../../Assets/Images/ProfilePreview.png";
const MultiAvatar = ({
  imageId,
  imageURL,
  primaryTitle,
  imgWidth,
  imgHeight,
  smallAvatar,
  imgRadius,
  // bgcolor,
  minAvatarWidth,
}) => {
  const size = smallAvatar && !imageId && !imageURL ? "small" : "large";
  // const fontSize = size === "large" ? 18 : 12;
  const color = size === "large" ? "#fff" : "#fff";
  // const backgroundColor = size === "large" ? "#337df4" : "#337df4";
  const backgroundColor = size === "large" ? "#94B3E4" : "#94B3E4";
  const borderWidth = size === "large" ? "0.0625em" : "0.0625em";
  const borderColor = size === "large" ? "#94B3E4" : "#94B3E4";
  const borderStyle = size === "large" ? "solid" : "solid";
  return (
    <>
      {imageId || imageURL ? (
        imageId ? (
          <div style={{  }}>
            <ProgressiveImage
              preview={ProfilePreview}
              image={`${base_url}/image/${imageId}`}
              width={imgWidth || "3.4375em"}
              height={imgHeight || "3.4375em"}
              // borderRadius={imgRadius}
              borderRadius={'1.0625em'}
            />
          </div>
        ) : (
            <ProgressiveImage
              preview={ProfilePreview}
              image={imageURL}
              width={imgWidth || "3.4375em"}
              height={imgHeight || "3.4375em"}
              // borderRadius={imgRadius}
             borderRadius={'1.0625em'}
            />
          )
      ) : (
          // <Avatar
          //   size={size || "large"}
          //   style={{
          //     color,
          //     // backgroundColor: bgcolor ? "red" : backgroundColor,
          //     backgroundColor,
          //     // fontSize,
          //     borderWidth,
          //     borderColor,
          //     borderStyle,
          //     minWidth: minAvatarWidth,
          //   }}
          // >
          //   {primaryTitle && primaryTitle.split("")[0].toUpperCase()}
          // </Avatar>
        //   <Avatar.Group
        //   maxCount={1000}
        //   maxStyle={{ color: "#e97c28ba", backgroundColor: "#fde3cf" }}
        // >
         
         <Tooltip title={primaryTitle}>
                  <Avatar style={{ backgroundColor: "#e97c28ba",fontFamily:"poppins" }}>
                  {primaryTitle && primaryTitle.slice(0,2)}
                  </Avatar>
                  </Tooltip>
               
             
            
        // </Avatar.Group>
        )}
    </>
  );
};

export default MultiAvatar;
{
  /* <Icon type="audit" />influencer */
}
{
  /* <i class="material-icons">
how_to_reg
</i> evaluator */
}

// <i class="material-icons">
// how_to_vote
// </i>decision maker
{
  /* <i class="material-icons">
assistant
</i>influencer */
}

//decision maker <i class="fas fa-vote-yea"></i>
//evaluator <i class="fas fa-address-card"></i>
//influencer <i class="fas fa-hands-helping"></i>
