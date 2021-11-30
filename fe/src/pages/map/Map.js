import React from 'react'
import RoutesView from '../../components/Routes/RoutesView'
import ImageZoom from '../../components/panZoom/ImageZoom'

export default function Map() {
    return (
        <div>
            <RoutesView />
            <ImageZoom />
        </div>
    )
}