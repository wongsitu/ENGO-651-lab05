import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'; // theme css file
import { DateRange, Range } from 'react-date-range';
import { useState } from 'react';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { useLocations } from '../../services/locations/locations';
import { format } from '../../utils/format';
import useDebounce from '../../hooks/useDebounce';

const Home = () => {
  const [showTrafficIncidents, setShowTrafficInicidents] = useState(false);
  const [state, setState] = useState<Range[]>([
    {
      startDate: new Date(),
      endDate: undefined,
      key: 'selection',
    },
  ]);
  const debouncedState = useDebounce(state);

  const position = { lat: 51.0447, lng: -114.0719 };
  const { locations } = useLocations({
    startDate: debouncedState[0].startDate
      ? format(debouncedState[0].startDate, 'YYYY-MM-DD')
      : undefined,
    endDate: debouncedState[0].endDate
      ? format(debouncedState[0].endDate, 'YYYY-MM-DD')
      : undefined,
  });

  return (
    <div className="relative">
      <div
        className="absolute p-4 bg-white top-0 right-0 flex flex-col justify-center"
        style={{ zIndex: 999 }}
      >
        <DateRange
          editableDateInputs
          onChange={(item) => setState([item.selection])}
          moveRangeOnFirstSelection={false}
          ranges={state}
          maxDate={new Date()}
        />
        {/* <button
          type="button"
          className="bg-white hover:bg-gray-100 text-gray-800 py-2 px-4 border border-gray-400 rounded shadow"
          onClick={() => setShowTrafficInicidents((state) => !state)}
        >
          {showTrafficIncidents
            ? 'Hide traffic incidents'
            : 'Show traffic incidents'}
        </button> */}
      </div>
      <div>
        <MapContainer center={position} zoom={13}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {showTrafficIncidents && (
            <TileLayer
              attribution='&copy; <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>'
              url="https://api.mapbox.com/styles/v1/wongsitu/clenl5gww000501ptpyjwe8mw/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoid29uZ3NpdHUiLCJhIjoiY2xlZXhtOGk1MDVzZDN0cG10a2x1NjUxMCJ9.hFkKaWzhPkDlzmcDSBKj-w"
            />
          )}
          <MarkerClusterGroup chunkedLoading>
            {locations.map((el, idx) =>
              el.properties.latitude && el.properties.longitude ? (
                <Marker
                  // eslint-disable-next-line react/no-array-index-key
                  key={idx}
                  position={{
                    lat: parseFloat(el.properties.latitude),
                    lng: parseFloat(el.properties.longitude),
                  }}
                >
                  <Popup>
                    <p>Issue date: {el.properties.issueddate}</p>
                    <p>Work class group: {el.properties.workclassgroup}</p>
                    <p>Contractor name: {el.properties.contractorname}</p>
                    <p>community name: {el.properties.communityname}</p>
                    <p>Original adress: {el.properties.originaladdress}</p>
                  </Popup>
                </Marker>
              ) : null,
            )}
          </MarkerClusterGroup>
        </MapContainer>
      </div>
    </div>
  );
};

export default Home;
