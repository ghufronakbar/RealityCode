// import cloudinary from "@/config/cloudinary";
// import multer from "multer";
// import { CloudinaryStorage } from "multer-storage-cloudinary";
// import { CLOUDINARY_MESSAGE, CLOUDINARY_POST } from "@/constants/cloudinary";
// import randomCharacter from "@/utils/randomCharacter";

// type Target = "message" | "post";

// const uploadCloudinary = (target: Target) => {
//   let folder: string;
//   const allowedFormats = ["png", "jpg", "jpeg", "gif"];

//   switch (target) {
//     case "message":
//       folder = CLOUDINARY_MESSAGE;
//       break;
//     case "post":
//       folder = CLOUDINARY_POST;
//       break;
//     default:
//       throw new Error("Target not found");
//   }

//   const storage = new CloudinaryStorage({
//     cloudinary: cloudinary,
//     params: async (req: Express.Request, file: File) => {
//       return {
//         folder: folder,
//         public_id: () => randomCharacter(8),
//         format: () => {
//           const ext = file.name.split(".")[1];
//           return allowedFormats.includes(ext) ? ext : "jpg";
//         },
//       };
//     },
//   });

  
//   return multer({ storage });
// };

// export default uploadCloudinary;
