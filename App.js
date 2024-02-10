import React, { useState } from 'react';

function App() {
  const [text, setText] = useState('');
  const [cost, setCost] = useState('');
  const [showBlankPage, setShowBlankPage] = useState(false);

  const handleSubmit = () => {
    // Handle submission logic here
    console.log('Text:', text);
    console.log('Cost:', cost);
  };

  const handleToggle = () => {
    setShowBlankPage(!showBlankPage);
  };

  return (
    <div>
      <h1>What are you looking for today?</h1>
      <div>
        <label>
          Item
          <input type="text" value={text} onChange={e => setText(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Cost:
          <input type="number" value={cost} onChange={e => setCost(e.target.value)} />
        </label>
      </div>
      <div>
        <button onClick={handleSubmit}>Submit</button>
      </div>
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: 'lightgray', padding: '10px' }}>
        <button onClick={handleToggle}>{showBlankPage ? 'Show Form Page' : 'Show Blank Page'}</button>
      </div>
      {showBlankPage && <div style={{ height: 'calc(100vh - 60px)', background: 'white' }}>Blank Page</div>}
    </div>
  );
}

export default App;