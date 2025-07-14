import toast from "react-hot-toast";

export const successToast = (message, id) => {
  return toast.success(message, {
    id: id,
  });
};
export const errorToast = (message, id) => {
  return toast.error(message, {
    id: id,
  });
};
