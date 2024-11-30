const fetchLeadSource = async () => {
    const res = await fetch('http://localhost:3000/leadSource');
    const data = await res.json();
    return data;
}

const fetchTemplates = async () => {
    const res = await fetch('http://localhost:3000/templates');
    const data = await res.json();
    return data;
}

const modalStyles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    container: {
      background: '#fff',
      padding: '20px',
      borderRadius: '8px',
      width: '400px',
      textAlign: 'center',
    },
    closeButton: {
      position: 'absolute',
      top: '10px',
      right: '10px',
      border: 'none',
      background: 'none',
      fontSize: '16px',
      cursor: 'pointer',
    },
  };

const initialNodes = [
    // { id: 'initial', type: 'sequenceStartNode', position: { x: 500, y: 80 }, data: { label: 'Sequence start point' } },
    { id: 'addNode', type: 'addNode', position: { x: 570, y: 180 }, data: { label: '+' } },

    { id: 'leadSource', type: 'leadSource', position: { x: 200, y: 80 }, data: { label: 'Add from Lead Source' } },
];

export { fetchLeadSource, fetchTemplates, initialNodes,  modalStyles }  