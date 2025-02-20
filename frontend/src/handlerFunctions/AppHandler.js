const handleSave = (nodes, edges, currentLead, currentTemplate, delay) => {
    const data = {
        lead: currentLead,
        template: currentTemplate,
        delay,
        nodes,
        edges,
    }

    fetch('http://localhost:3000/api/workflows', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then(res => res.json()).then(data => console.log(data)).catch(error => console.log(error))
}



const onNodeClick = (e, node, nodes) => {
    if (node.type === 'leadSource') {
        const leadNodePresent = nodes.some((n) => n.type === 'leadNode');
        if (leadNodePresent) {
            return
        }
        setModalInfo({ isOpen: true, nodeId: node.id, nodeType: 'leadSource', includeDelay: false });
    } else if (node.type === 'addNode') {
        const templateNodePresent = nodes.some((n) => n.type === 'templateNode');
        if (templateNodePresent) {
            console.log("Template node present");
            setModalInfo({ isOpen: true, nodeId: node.id, nodeType: 'addNode', includeDelay: true });
            console.log(modalInfo);

        } else {
            setModalInfo({ isOpen: true, nodeId: node.id, nodeType: 'addNode', includeDelay: false });
        }
    }
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

export { handleSave, onNodeClick,  handleNodeRemove };