import axios from "axios";

const sendMessage = async (
  name: string,
  email: string,
  message: string,
  file?: File
) => {
  let data;
  if (file) {
    data = new FormData();
    data.append("name", name);
    data.append("email", email);
    data.append("message", message);
    data.append("file", file, file.name);
  } else {
    data = {
      name,
      email,
      message,
    };
  }
  try {
    await axios.post("/api/message", data);
    return "Success Send Message";
  } catch (error) {
    console.log(error);    
    return "Error Send Message";
  }
};

export default sendMessage;
