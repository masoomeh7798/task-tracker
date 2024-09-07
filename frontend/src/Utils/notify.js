import toast from "react-hot-toast";

const notify = (type, message) => {
    if(type!='info'){
        toast[type](message, { duration: 4000, position: "top-left" });

    }
};
export default notify