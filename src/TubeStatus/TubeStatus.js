import { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';

const TubeStatus = () => {
  const [fetchData, setFetchData] = useState([]);

  useEffect(() => {
    fetch('https://api.tfl.gov.uk/Line/Mode/tube,overground,dlr/Status?detail=true')
      .then(res => res.json())
      .then(data => setFetchData(sortData(data)))
      .catch(console.error);
  }, []);

  const hasNightTube = (serviceTypes) => {
    return serviceTypes && serviceTypes.some((service) => service.name === 'Night');
  };

  const sortData = (dataList) => {
    return dataList.sort((a, b) => {
      if (a.modeName > b.modeName) { return 1; }
      if (a.modeName < b.modeName) { return -1; }
      if (a.name > b.name) { return 1; }
      if (a.name < b.name) { return -1; }
      return 0;
    });
  };

  return (
    <Table>
      <thead>
        <tr>
          <th>Line</th>
          <th>Service Status</th>
        </tr>
      </thead>
      <tbody>
        {fetchData.map((data) => (
          <tr key={data.name}>
            <td>
              {data.name}
              {hasNightTube(data.serviceTypes) &&
                <img className="night-tube" src="./moon.png" alt="Night Tube Service" />}
            </td>
            <td>
              {data.lineStatuses.map((status) =>
              (<div className={status.statusSeverity !== 10 ? 'bad-service' : ''}>
                {status.statusSeverityDescription}
              </div>)
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default TubeStatus;
