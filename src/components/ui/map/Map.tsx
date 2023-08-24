import React, { useEffect, useState } from 'react'
import { YMaps, Map, Placemark } from 'react-yandex-maps'

interface IProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  location: Array<any>
  height: string
  borderRadius?:string;
}
const MyMapComponent = ({ location, height,borderRadius }: IProps) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [myLocation, setLocation] = useState<any | null>(null)
  useEffect(() => {
    setLocation(location)
  }, [location])

  return (
        <YMaps>
          <Map defaultState={{ center: location, zoom: 5 }} style={{ width: '100%', height, borderRadius:borderRadius, overflow: 'hidden' }}>
            <Placemark geometry={myLocation} />
          </Map>
        </YMaps>
  )
}

export default MyMapComponent
