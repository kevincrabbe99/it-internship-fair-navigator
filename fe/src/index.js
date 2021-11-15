import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { FontAwesomeIcon } from "react-fontawesome";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import maplayout from './layout.png';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

const ImageZoom = () => {
  return (
    <>
      <div className="row">
        <div className="col text-center">
          <h2>Zoomable Image</h2>
          <p className="mt-3">
            <div className="row mt-3 d-flex justify-content-center">
              <div className="col-lg-8 text-center text-dark">
                <TransformWrapper
                  defaultScale={1}
                  defaultPositionX={1}
                  defaultPositionY={1}
                >
                  {({ zoomIn, zoomOut, ...rest }) => (
                    <>
                      <div className="col-lg-12 text-center mb-3">
                        <button
                          className="btn btn-outline-primary mr-2"
                          onClick={zoomIn}
                        >
                          <FontAwesomeIcon icon="plus" /> Zoom In
                        </button>
                        <button
                          className="btn btn-outline-secondary"
                          onClick={zoomOut}
                        >
                          <FontAwesomeIcon icon="minus" /> Zoom Out
                        </button>
                      </div>
                      <TransformComponent>
                        <img src={maplayout} alt = "testmap" style={{ width: "100%" }} />
                      </TransformComponent>
                    </>
                  )}
                </TransformWrapper>
              </div>
            </div>
          </p>
        </div>
      </div>
    </>
  );
};

export default ImageZoom;

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
