// import React from "react";
// //import Avatar from "antd/lib/avatar";
// import { ProgressiveImage } from "../../Utils";
// import { Tooltip, Avatar } from "antd";
// import { base_url } from "../../../Config/Auth";
// import ProfilePreviewImg from "../../../Assets/Images/ProfilePreviewImg.webp";

// const MultiAvatar2 = ({
//   imageId,
//   imageURL,
//   primaryTitle,
//   imgWidth,
//   imgHeight,
//   smallAvatar,
//   imgRadius,
//   // bgcolor,
//   minAvatarWidth,
// }) => {
//   const size = smallAvatar && !imageId && !imageURL ? "small" : "large";
//   // const fontSize = size === "large" ? 18 : 12;
//   const color = size === "large" ? "#fff" : "#fff";
//   // const backgroundColor = size === "large" ? "#337df4" : "#337df4";
//   const backgroundColor = size === "large" ? "#94B3E4" : "#94B3E4";
//   const borderWidth = size === "large" ? "0.0625em" : "0.0625em";
//   const borderColor = size === "large" ? "#94B3E4" : "#94B3E4";
//   const borderStyle = size === "large" ? "solid" : "solid";
//   return (
//     <>
//       {imageId || imageURL ? (
//         imageId ? (
//           <div style={{}}>
//             <ProgressiveImage
//               preview={ProfilePreviewImg}
//               image={`${base_url}/image/${imageId}`}
//               width={imgWidth || "3.4375em"}
//               height={imgHeight || "3.4375em"}
//               // borderRadius={imgRadius}
//               borderRadius={'1.0625em'}
//                 loading="lazy"
//             />
//           </div>
//         ) : (
//           <ProgressiveImage
//             preview={ProfilePreviewImg}
//             image={imageURL}
//             width={imgWidth || "3.4375em"}
//             height={imgHeight || "3.4375em"}
//             // borderRadius={imgRadius}
//             borderRadius={'1.0625em'}
//               loading="lazy"
//           />
//         )
//       ) : (
//         // <Avatar
//         //   size={size || "large"}
//         //   style={{
//         //     color,
//         //     // backgroundColor: bgcolor ? "red" : backgroundColor,
//         //     backgroundColor,
//         //     // fontSize,
//         //     borderWidth,
//         //     borderColor,
//         //     borderStyle,
//         //     minWidth: minAvatarWidth,
//         //   }}
//         // >
//         //   {primaryTitle && primaryTitle.split("")[0].toUpperCase()}
//         // </Avatar>
//         //   <Avatar.Group
//         //   maxCount={1000}
//         //   maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
//         // >

//         <Tooltip title={primaryTitle}>
//           <Avatar style={{ backgroundColor: "#94b3e4", fontFamily: "poppins" }}>
//             {primaryTitle && primaryTitle.slice(0, 2)}
//           </Avatar>
//         </Tooltip>



//         // </Avatar.Group>
//       )}
//     </>
//   );
// };

// export default MultiAvatar2;
// {
//   /* <Icon type="audit" />influencer */
// }
// {
//   /* <i class="material-icons">
// how_to_reg
// </i> evaluator */
// }

// // <i class="material-icons">
// // how_to_vote
// // </i>decision maker
// {
//   /* <i class="material-icons">
// assistant
// </i>influencer */
// }

// //decision maker <i class="fas fa-vote-yea"></i>
// //evaluator <i class="fas fa-address-card"></i>
// //influencer <i class="fas fa-hands-helping"></i>

import React, { useMemo } from "react";
import { ProgressiveImage } from "../../Utils";
import { Tooltip, Avatar } from "antd";
import { base_url } from "../../../Config/Auth";
import ProfilePreviewImg from "../../../Assets/Images/ProfilePreviewImg.webp";

const MultiAvatar = ({
  imageId,
  imageURL,
  primaryTitle,
  imgWidth,
  imgHeight,
  smallAvatar,
}) => {
  const size = smallAvatar && !imageId && !imageURL ? "small" : "large";
  const avatarStyle = useMemo(() => ({
    backgroundColor: "#e97c28ba",
    fontFamily: "Poppins",
  }), []);

  const wrapperStyle = useMemo(() => ({
    borderRadius: "1.0625em",
    width: imgWidth || "3.4375em",
    height: imgHeight || "3.4375em",
  }), [imgWidth, imgHeight]);

  return (
    <>
      {imageId || imageURL ? (
        <div style={wrapperStyle}>
          <ProgressiveImage
            preview={ProfilePreviewImg}
            image={imageId ? `${base_url}/image/${imageId}` : imageURL}
            width={imgWidth || "3.4375em"}
            height={imgHeight || "3.4375em"}
            borderRadius={"1.0625em"}
            loading="lazy"
          />
        </div>
      ) : (
        <Tooltip title={primaryTitle}>
          <Avatar style={avatarStyle}>
            {primaryTitle && primaryTitle.slice(0, 2)}
          </Avatar>
        </Tooltip>
      )}
    </>
  );
};

export default MultiAvatar;



