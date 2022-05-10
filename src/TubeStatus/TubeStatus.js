import { useState, useEffect } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

const TubeStatus = () => {
  const [fetchData, setfetchData] = useState([]);
  useEffect(() => {
      fetch('https://api.tfl.gov.uk/Line/Mode/tube,overground,dlr/Status?detail=true')
          .then(res => res.json())
          .then(setfetchData);
  }, []);

  const hasNightTube = (serviceTypes) => {
    return serviceTypes && serviceTypes.some((service) => service.name === 'Night');
  };

  console.info(fetchData);

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Line</TableCell>
          <TableCell>Service Status</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        { fetchData.map((data) => (
          <TableRow>
            <TableCell>
              { data.name }
              { hasNightTube(data.serviceTypes) && 
                <img className="night-tube" src="./moon.png" alt="Night Tube Service" /> }
            </TableCell>
            <TableCell>
              { data.lineStatuses.map((status) => 
                (<div className={ status.statusSeverity !== 10 ? 'bad-service' : ''}>
                  { status.statusSeverityDescription }
                </div>)
              )}
            </TableCell>
          </TableRow>
        )) }
      </TableBody>
    </Table>
  );
}

export default TubeStatus;
