import { useState, useEffect } from 'react';
import { Form, ListGroup } from 'react-bootstrap';

const TubeStatus = () => {
  const [keyword, setKeyword] = useState('');
  const [fetchData, setFetchData] = useState([]);
  useEffect(() => {
    const keywordStorage = localStorage && localStorage.getItem('keyword');
    if (keywordStorage) setKeyword(keywordStorage);
    if (!keyword.length) return;

    fetch(`https://api.tfl.gov.uk/BikePoint/Search?query=${encodeURI(keyword)}`)
        .then(res => res.json())
        .then(setFetchData)
        .catch(console.error);
  }, [keyword]);

  const onTextChange = (e) => {
    const newKeyword = e.target?.value || '';
    setKeyword(newKeyword);

    if (localStorage) {
      localStorage.setItem('keyword', newKeyword);
    }
  };

  return (
    <>
      <Form.Control id="search-box" type="text" placeholder="Find area for bikes" onChange={onTextChange} value={keyword} />
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
