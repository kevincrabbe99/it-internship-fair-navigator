import React from 'react'
import { FontAwesomeIcon } from "react-fontawesome";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import maplayout from './layout.png';

export default function ImageZoom(){
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