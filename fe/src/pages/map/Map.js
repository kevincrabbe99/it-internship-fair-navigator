import React from 'react'
import RoutesView from '../../components/Routes/RoutesView'

import { test } from '../../util/Endpoints'

export default function Map() {

    test();

    return (
        <div>
            <RoutesView />
        </div>
    )
}
