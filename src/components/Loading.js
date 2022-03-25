import React from "react";
import { useRecoilValue } from "recoil";
import { loadingAtom } from "../Recoil/atom";

function Loading() {
  const loading = useRecoilValue(loadingAtom);
  return <div>Loading</div>;
}

export default Loading;
