// import React,{useEffect} from "react";
// import { ProgressiveImage } from "../../Utils";
// import { Tooltip, Avatar } from "antd";
// import { base_url } from "../../../Config/Auth";
// import ProfilePreviewImg from "../../../Assets/Images/ProfilePreviewImg.webp";
// const MultiAvatar = ({
//   imageId,
//   imageURL,
//   primaryTitle,
//   imgWidth,
//   imgHeight,
//   smallAvatar,
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
//                loading="lazy"
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
//              loading="lazy"
//           />
//         )
//       ) : (


//         <Tooltip title={primaryTitle}>
//           <Avatar style={{ backgroundColor: "#e97c28ba", fontFamily: "poppins" }}>
//             {primaryTitle && primaryTitle.slice(0, 2)}
//           </Avatar>
//         </Tooltip>



//         // </Avatar.Group>
//       )}
//     </>
//   );
// };

// export default MultiAvatar;


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




