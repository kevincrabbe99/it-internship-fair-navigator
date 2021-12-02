import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import PanZoom from "@sasza/react-panzoom";
import "./styles.css";
import Table from  '../../pages/map/table/Table';

const ImageZoom = () => (
  <Fragment>
    <div className="box">
      <PanZoom
        boundary={{
          parent: true
        }}
        disableUserSelect
      >
      
        <div className="map-container">
        <Table/>
        <Table/>
        <Table/>
        <Table/>
        </div>
      </PanZoom>
    </div>
  </Fragment>
);

const rootElement = document.getElementById("root");
ReactDOM.render(<ImageZoom />, rootElement);
export default ImageZoom;