import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import PanZoom from "@sasza/react-panzoom";
import "./styles.css";
import Map from  '../../pages/map/Map';

const ImageZoom = () => (
  <Fragment>
    <div className="box">
      <PanZoom
        boundary={{
          parent: true
        }}
        disableUserSelect
      >
      <Map/>
      </PanZoom>
    </div>
  </Fragment>
);

const rootElement = document.getElementById("root");
ReactDOM.render(<ImageZoom />, rootElement);
export default ImageZoom;