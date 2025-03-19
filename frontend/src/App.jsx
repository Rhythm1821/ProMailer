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
import { handleSave } from './handlerFunctions/AppHandler';
import useFetchWorkflows from './hooks/useFetchWorkflows';
import DelayNode from './nodes/DelayNode';


export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [modalInfo, setModalInfo] = useState({ isOpen: false, nodeId: null, nodeType: null });
  const [currentLead, setCurrentLead] = useState({});
  const [templates, setTemplates] = useState([]);
  const [delays, setDelays] = useState([]);

  const onConnect = (params) => {
    setEdges((eds) => addEdge(params, eds));
  };

  useFetchWorkflows(setNodes, setEdges);

  const onNodeClick = (e, node) => {
    if (node.type === 'leadSource') {
      const leadNodePresent = nodes && Array.isArray(nodes) && nodes.some((n) => n.type === 'leadNode');
      if (leadNodePresent) {
        return;
      }
      setModalInfo({ isOpen: true, nodeId: node.id, nodeType: 'leadSource' });
    } else if (node.type === 'addNode') {
      setModalInfo({ isOpen: true, nodeId: node.id, nodeType: 'addNode' });
    }
  };

  const addNewNode = (selectedData, nodeType, delayType) => {
    if (!nodes || !Array.isArray(nodes)) return;
    const newNodeId = crypto.randomUUID();
    const newNode = {
      id: newNodeId,
      position: { x: 540, y: nodes.length * 100 },
      data: {
        id: newNodeId,
        label: nodeType !== 'delay' ? selectedData[0]?.name : selectedData,
        delayType: nodeType === 'delay' ? delayType : null,
        setNodes,
        setEdges,
      },
      type: nodeType === 'leadSource' ? 'leadNode' : nodeType === 'delay' ? 'delayNode' : 'templateNode',
    };

    const currentAddNode = nodes.find((node) => node.id === 'addNode');

    if (!currentAddNode) return;
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
      setCurrentLead(selectedData[0]);
    } else if (nodeType === 'addNode') {
      setTemplates((prev) => [...prev, selectedData[0]]);
    } else if (nodeType === 'delay') {
      setDelays((prev) => [...prev, { time: selectedData, type: delayType }]);
    }

    setNodes((prevNodes) => {
      if (!prevNodes) return [];
      const filteredNodes = prevNodes.filter((node) => node.id !== 'addNode');
      return [...filteredNodes, newNode, updatedAddNode];
    });

    setEdges((prevEdges) => {
      if (!prevEdges) return [];
      if (nodeType !== 'leadSource') {
        const updatedEdges = [...prevEdges];
        if (updatedEdges.length > 0) {
          updatedEdges[updatedEdges.length - 1] = {
            ...updatedEdges[updatedEdges.length - 1],
            target: newNodeId,
          };
        }

        return [...updatedEdges, newEdgeToAddNode];
      }
      return prevEdges;
    });

    setModalInfo({ isOpen: false, nodeId: null, nodeType: null });
  };

  return (
    <div className="w-screen h-screen">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        nodeTypes={{
          addNode: AddNode,
          leadSource: LeadSource,
          sequenceStartNode: SequenceStartNode,
          leadNode: LeadNode,
          templateNode: TemplateNode,
          delayNode: DelayNode,
        }}
      >
        <Controls />
        <MiniMap />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>

      <button
        className="absolute top-2.5 right-2.5 text-white bg-blue-500 px-4 py-2 rounded cursor-pointer"
        onClick={() => handleSave(nodes, edges, currentLead, templates, delays)}
        type="submit"
      >
        Save
      </button>

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

