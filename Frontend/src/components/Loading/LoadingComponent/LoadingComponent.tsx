import LoadingSVG from "../../../assets/icons/loading-animated.svg?react";
import "./loadingComponentStyles.css";

function LoadingComponent() {
  return (
    <div className="loading-component">
      <div className="loading-content">
        <div className="loading-container">
          <LoadingSVG />
        </div>
        <span>Loading</span>
      </div>
    </div>
  );
}

export default LoadingComponent;
