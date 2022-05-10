import { useState, useEffect } from 'react';
import { Form, ListGroup } from 'react-bootstrap';

const TubeStatus = () => {
  const [keyword, setKeyword] = useState('');
  const [fetchData, setFetchData] = useState([]);
  useEffect(() => {
    if (!keyword.length) return;

    fetch(`https://api.tfl.gov.uk/BikePoint/Search?query=${keyword}`)
        .then(res => res.json())
        .then(setFetchData)
        .catch(console.error);
  }, [keyword]);

  const onTextChange = (e) => {
    setKeyword(e.target?.value || '');
  };

  return (
    <>
      <Form.Control id="search-box" type="text" placeholder="Find area for bikes" onChange={onTextChange} />
      <ListGroup>
      { fetchData.map((data) => (
        <ListGroup.Item>
          { `${data.id.replace('BikePoints_', '')} ${data.commonName} (${data.lat}, ${data.lon})` }
        </ListGroup.Item>
      )) }
      </ListGroup>
    </>
  );
}

export default TubeStatus;
