import { FormEvent, useContext, useState } from 'react';
import Image from 'next/image';
import { getGeolocation } from '../../utils';
import { LocationContext } from '../../context';

const Search = () => {
  const [ipAddress, setIpAddress] = useState<string>('');
  const { setLocationData } = useContext(LocationContext);

  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const regEx =
      /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
        ipAddress
      );

    if (!regEx) {
      alert('Please enter a valid IP Address!');
      return;
    }

    const data = await getGeolocation(ipAddress);

    setLocationData(data);
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <div className="search__container">
        <input
          type="text"
          placeholder="Search for any IP address or domain"
          value={ipAddress}
          onChange={e => setIpAddress(e.target.value)}
        />
        <button className="button__primary" type="submit">
          <Image
            src="/images/icon-arrow.svg"
            width="11"
            height="14"
            alt="arrow-right"
          />
        </button>
      </div>
    </form>
  );
};

export default Search;
