import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import PanZoom from "@sasza/react-panzoom";
import "./styles.css";

const ImageZoom = () => (
  <Fragment>
    <h2>Zoomable Map</h2>
    <div className="box">
      <PanZoom
        boundary={{
          parent: true
        }}
        disableUserSelect
      >
        <div className="circle" />
      </PanZoom>
    </div>
  </Fragment>
);

const rootElement = document.getElementById("root");
ReactDOM.render(<ImageZoom />, rootElement);
export default ImageZoom;