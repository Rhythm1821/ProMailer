const handleSave = (nodes, edges, currentLead, templates, delays) => {
    if (nodes.length === 0 || edges.length === 0) {
        if (window.confirm('Are you sure you want to delete the workflow?')) {
            fetch(`${import.meta.env.VITE_API_URL}/workflows`, {
                method: 'DELETE',
            })
            return
        }
    }
    const leadNode = nodes.find(node => node.type === 'leadNode');
    if (!leadNode) {
        alert('You must select a lead to start the workflow');
        return;
    }
    const newNodes = nodes.filter((node) => node.type !== 'leadSource' && node.type !== 'addNode');
    const data = {
        lead: currentLead,
        templates,
        delays,
        nodes:newNodes,
        edges,
    }
    

    fetch(`${import.meta.env.VITE_API_URL}/workflows`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then(res => res.json()).then(data => alert(data.msg)).catch(error => alert(error))
}

const handleNodeRemove = (nodeId, setNodes, setEdges) => {
    setNodes((prevNodes) => prevNodes.filter((node) => node.id !== nodeId));

    setEdges((prevEdges) => {
        const edgesToRemove = prevEdges.filter(
            (edge) => edge.source === nodeId || edge.target === nodeId
        );

        // Find the parent (source) and child (target) nodes
        const parentEdge = edgesToRemove.find((edge) => edge.target === nodeId);
        const childEdge = edgesToRemove.find((edge) => edge.source === nodeId);

        if (parentEdge && childEdge) {
            const newEdge = {
                id: `edge-${prevEdges.length + 1}`,
                source: parentEdge.source,
                target: childEdge.target,
            };

            return [...prevEdges.filter((edge) => !edgesToRemove.includes(edge)), newEdge];
        }

        // If there are no parent or child connections, just remove edges related to the node
        return prevEdges.filter((edge) => edge.source !== nodeId && edge.target !== nodeId);
    });
};

  
const handleNodeEdit = (nodeId) => {
    console.log("Edit node logic here!!");
    
};

export { handleSave, handleNodeRemove, handleNodeEdit };