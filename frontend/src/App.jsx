import React, { useCallback, useState } from 'react';
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
import { handleNodeRemove, handleSave } from './handlerFunctions/AppHandler';
import useFetchWorkflows from './hooks/useFetchWorkflows';


export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [modalInfo, setModalInfo] = useState({ isOpen: false, nodeId: null, nodeType: null, includeDelay: false });
  const [currentLead, setCurrentLead] = useState({});
  const [currentTemplate, setCurrentTemplate] = useState({});
  const [delay, setDelay] = useState(0);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  useFetchWorkflows(setNodes, setEdges);

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
                onClick={() => handleNodeRemove(node.id, setNodes, setEdges)}
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


      <button style={{ position: 'absolute', top: '10px', right: '10px', color: '#fff' }} onClick={() => handleSave(nodes, edges, currentLead, currentTemplate, delay)} type="submit">Save</button>

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

