import { useRef, useContext } from 'react';
import { LocationContext } from '../../context';
import { useWidth } from '../../hooks';
import Item from './Item';
import { v4 as uuidv4 } from 'uuid';

const AddressDetails = () => {
  const addressDetailsRef = useRef<HTMLDivElement | null>(null);
  const width = useWidth(addressDetailsRef);

  const { locationData } = useContext(LocationContext);

  const { city, country, postalCode, timezone } = locationData.location;

  const data = [
    {
      headline: 'IP Address',
      info: locationData.ip,
    },
    {
      headline: 'Location',
      info: `${country}, ${city}, ${postalCode}`,
    },
    {
      headline: 'Timezone',
      info: `UTC ${timezone}`,
    },
    {
      headline: 'Isp',
      info: locationData.isp,
    },
  ];

  return (
    <div
      className="address__details"
      ref={addressDetailsRef}
      style={{
        width: '90%',
        marginLeft: `-${width! / 2}px`,
      }}
    >
      {data.map(({ headline, info }) => {
        return (
          <>
            <Item headline={headline} data={info} key={uuidv4()} />
            <div className="vertical__line"></div>
          </>
        );
      })}
    </div>
  );
};

export default AddressDetails;
