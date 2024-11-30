import React, { useCallback, useEffect, useState } from 'react';
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  Controls,
  MiniMap,
  Background,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';
import LeadSource from './nodes/leadSource';
import { initialNodes } from './utils';
import AddNode from './components/AddNode';
import SequenceStartNode from './components/SequenceStartNode';
import Modal from './components/Modal';
import TemplateNode from './components/TemplateNode';
import LeadNode from './components/LeadNode';


export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [modalInfo, setModalInfo] = useState({ isOpen: false, nodeId: null, nodeType: null, includeDelay: false });
  const [currentLead, setCurrentLead] = useState({});
  const [currentTemplate, setCurrentTemplate] = useState({});
  const [delay, setDelay] = useState(0);

  const handleSave = () => {
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

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onNodeClick = (e, node) => {
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

  const addNewNode = (selectedData, sourceNodeId, nodeType) => {

    const newNodeId = `node-${nodes.length + 1}`;

    const newNode = {
      id: newNodeId,
      position: { x: 540, y: nodes.length * 100 },
      data: { label: selectedData[0].name },
      type: nodeType === 'leadSource' ? 'leadNode' : 'templateNode',
    };

    const currentAddNode = nodes.find((node) => node.id === 'addNode');
    const updatedAddNode = {
      ...currentAddNode,
      position: { x: newNode.position.x, y: newNode.position.y + 200 },
    };

    const newEdgeToAddNode = {
      id: `edge-${edges.length + 1}`,
      source: newNodeId,
      target: 'addNode',
    };

    if (nodeType === 'leadSource') {
      setCurrentLead(selectedData[0])
    } else if (nodeType === 'addNode') {
      setCurrentTemplate(selectedData[0])
    }

    setNodes((prevNodes) => {
      const filteredNodes = prevNodes.filter((node) => node.id !== 'addNode');
      return [...filteredNodes, newNode, updatedAddNode];
    });

    setEdges((prevEdges) => {
      const updatedEdges = [...prevEdges];
      if (updatedEdges.length > 0) {
        updatedEdges[updatedEdges.length - 1] = {
          ...updatedEdges[updatedEdges.length - 1],
          target: newNodeId,
        };
      }

      return [...updatedEdges, newEdgeToAddNode];
    });

    console.log("new node created", newNode);
    

    setModalInfo({ isOpen: false, nodeId: null, nodeType: null, includeDelay: false });
  };

  const handleNodeRemove = (nodeId) => {
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
  

  useEffect(() => {
    fetch(`http://localhost:3000/api/workflows`)
      .then(res => res.json())
      .then(data => data.allWorkflows[0])
      .then(data => {
        const { nodes, edges } = data;
        if (nodes && edges) {
          setNodes(nodes);
          setEdges(edges);
        }
      })
      .catch(error => console.log(error))
  }, [])

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        nodeTypes={{ addNode: AddNode, leadSource: LeadSource, sequenceStartNode: SequenceStartNode, leadNode: LeadNode, templateNode: TemplateNode }}
      >
        <Controls />
        <MiniMap />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>

      {/* Render dynamic buttons for each node */}
      {
  nodes.map((node) => (
    node.type !== 'addNode' && node.type !== 'leadSource' && (
      <div
        key={`buttons-${node.id}`} // Use a unique key for each node
        style={{
          position: 'absolute',
          top: node.position.y - 20, // Adjust based on your UI
          left: node.position.x + 20, // Adjust based on your UI
          zIndex: 10,
        }}
      >
        <button
          onClick={() => handleNodeEdit(node.id)}
          style={{
            padding: '4px 8px',
            marginRight: '5px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          ✏️
        </button>
        <button
          onClick={() => handleNodeRemove(node.id)}
          style={{
            padding: '4px 8px',
            backgroundColor: '#dc3545',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          X
        </button>
      </div>
    )
  ))
}


      <button style={{ position: 'absolute', top: '10px', right: '10px', color: '#fff' }} onClick={handleSave} type="submit">Save</button>

      {/* Render the modal */}
      <Modal
        isOpen={modalInfo.isOpen}
        onClose={() => setModalInfo({ isOpen: false, nodeId: null, nodeType: null, includeDelay: false })}
        nodeId={modalInfo.nodeId}
        nodeType={modalInfo.nodeType}
        addNewNode={addNewNode}
        includeDelay={modalInfo.includeDelay}
      />

    </div>
  );
}

