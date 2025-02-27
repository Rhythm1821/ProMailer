const fetchLeadSource = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/leadSource`);
    const data = await res.json();
    return data;
}

const fetchTemplates = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/templates`);
    const data = await res.json();
    return data;
}


const initialNodes = [
    // { id: 'initial', type: 'sequenceStartNode', position: { x: 500, y: 80 }, data: { label: 'Sequence start point' } },
    { id: 'addNode', type: 'addNode', position: { x: 570, y: 180 }, data: { label: '+' } },

    { id: 'leadSource', type: 'leadSource', position: { x: 200, y: 80 }, data: { label: 'Add from Lead Source' } },
];

export { fetchLeadSource, fetchTemplates, initialNodes };