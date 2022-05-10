import './App.css';
import TubeStatus from './TubeStatus/TubeStatus';
import CycleHire from './CycleHire/CycleHire';

import { Button } from 'react-bootstrap';
import { useState } from 'react';

const App = () => {
  const [isCycleHire, setIsCycleHire] = useState(false);

  const onClickTubeStatus = () => setIsCycleHire(false);
  const onClickCycleHire = () => setIsCycleHire(true);

  return (
    <div className="App">
      <Button className="menu-buttons" variant="primary" onClick={onClickTubeStatus}>Tube Status</Button>
      <Button className="menu-buttons" variant="primary" onClick={onClickCycleHire}>Cycle Hire</Button>
      { isCycleHire ?  <CycleHire /> :  <TubeStatus /> }
    </div>
  );
}

export default App;
