import { useState, useEffect } from 'react';
import { Form, ListGroup } from 'react-bootstrap';

const TubeStatus = ({
  cycleHireData,
  setCycleHireData
}) => {
  const [keyword, setKeyword] = useState('');
  const [fetchData, setFetchData] = useState(null);
  const [noFetch, setNoFetch] = useState(false);
  useEffect(() => {
    if (cycleHireData.keyword) {
      setKeyword(cycleHireData.keyword);
    }

    if (cycleHireData.data) {
      setFetchData(cycleHireData.data);
      setNoFetch(true);
    }
  }, []);

  useEffect(() => {
    if (!keyword.length) return;
    if (noFetch) {
      setNoFetch(false);
      return;
    }
    
    fetch(`https://api.tfl.gov.uk/BikePoint/Search?query=${encodeURI(keyword)}`)
      .then(res => res.json())
      .then((data) => {
        setFetchData(data);
        setCycleHireData({
          keyword, data
        })
      })
      .catch(console.error);
  }, [keyword]);

  const onTextChange = (e) => {
    const newKeyword = e.target?.value || '';
    setKeyword(newKeyword);
  };

  return (
    <>
      <Form.Control id="search-box" type="text" placeholder="Find area for bikes" onChange={onTextChange} value={keyword} />
      <ListGroup>
      { (fetchData && fetchData.length > 0)  ? (fetchData.map((data) => (
        <ListGroup.Item>
          { `${data.id.replace('BikePoints_', '')} ${data.commonName} (${data.lat}, ${data.lon})` }
        </ListGroup.Item>
      ))) :
      ( keyword.length > 0 ? `No bike points found for ${keyword}` : '') }
      </ListGroup>
    </>
  );
}

export default TubeStatus;
