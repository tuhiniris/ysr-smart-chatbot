import React, { useRef } from "react";
import LoadingBar from "react-top-loading-bar";

const LoadingBarAction = props => {
  const [progress, setProgress] = useState(0);
  setProgress(props.action);

  return (
    <LoadingBar
      color="#f11946"
      progress={progress}
      onLoaderFinished={() => setProgress(0)}
    />
  );
};

export default LoadingBarAction;
