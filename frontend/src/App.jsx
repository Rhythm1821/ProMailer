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
import LeadSource from './nodes/LeadSource';
import { initialNodes } from './utils';
import AddNode from './nodes/AddNode';
import SequenceStartNode from './nodes/SequenceStartNode';
import Modal from './components/Modal';
import TemplateNode from './nodes/TemplateNode';
import LeadNode from './nodes/LeadNode';
import { handleNodeRemove, handleSave } from './handlerFunctions/AppHandler';
import useFetchWorkflows from './hooks/useFetchWorkflows';
import DelayNode from './nodes/DelayNode';


export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [modalInfo, setModalInfo] = useState({ isOpen: false, nodeId: null, nodeType: null });
  const [currentLead, setCurrentLead] = useState({});
  const [currentTemplate, setCurrentTemplate] = useState({});
  const [delay, setDelay] = useState(0);
  const [delayType, setDelayType] = useState('');

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
      setModalInfo({ isOpen: true, nodeId: node.id, nodeType: 'leadSource'});
    } else if (node.type === 'addNode') {
        setModalInfo({ isOpen: true, nodeId: node.id, nodeType: 'addNode' });
    }
  }

  const addNewNode = (selectedData, nodeType, delayType) => {
    const newNodeId = `node-${nodes.length + 1}`;

    // Create the new node
    const newNode = {
      id: newNodeId,
      position: { x: 540, y: nodes.length * 100 },
      data: {
        id: newNodeId,
        label: nodeType !== 'delay' ? selectedData[0].name : selectedData,
        delayType: nodeType==='delay' ? delayType : null,
        setNodes,
        setEdges,
      },
      type: nodeType === 'leadSource' ? 'leadNode' : nodeType === 'delay' ? 'delayNode' : 'templateNode',
    };

    // Find the addNode node
    const currentAddNode = nodes.find((node) => node.id === 'addNode');


    // Update the position of the addNode node
    const updatedAddNode = {
      ...currentAddNode,
      position: { x: newNode.position.x, y: newNode.position.y + 200 },
    };

    // Create the edge to connect the new node to the addNode node
    const newEdgeToAddNode = {
      id: `edge-${edges.length + 1}`,
      source: newNodeId,
      target: 'addNode',
    };

    // Update the current lead or template based on the nodeType
    if (nodeType === 'leadSource') {
      setCurrentLead(selectedData[0])
    } else if (nodeType === 'addNode') {
      setCurrentTemplate(selectedData[0])
    } else if (nodeType === 'delay') {
      setDelay(selectedData[0])
      setDelayType(delayType)
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

    setModalInfo({ isOpen: false, nodeId: null, nodeType: null });
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
        nodeTypes={{ addNode: AddNode, leadSource: LeadSource, sequenceStartNode: SequenceStartNode, leadNode: LeadNode, templateNode: TemplateNode, delayNode: DelayNode }}
      >
        <Controls />
        <MiniMap />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>

      <button style={{ position: 'absolute', top: '10px', right: '10px', color: '#fff' }} onClick={() => handleSave(nodes, edges, currentLead, currentTemplate, delay, delayType)} type="submit">Save</button>

      {/* Render the modal */}
      <Modal
        isOpen={modalInfo.isOpen}
        onClose={() => setModalInfo({ isOpen: false, nodeId: null, nodeType: null })}
        nodeId={modalInfo.nodeId}
        nodeType={modalInfo.nodeType}
        addNewNode={addNewNode}
      />

    </div>
  );
}

