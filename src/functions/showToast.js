const ShowToast = (text, setToast) => {
  // const [toast, setToast] = useRecoilState(toastAtom);
  setToast(text);
  setTimeout(() => {
    setToast("");
  }, 3000);
  return "";
};

export default ShowToast;
