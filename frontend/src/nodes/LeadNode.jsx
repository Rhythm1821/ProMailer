import { Handle } from "@xyflow/react";
import EditAndRemoveNodeButton from "../components/buttons/EditAndRemoveNodeButton";

export default function LeadNode({ data }) {
  const { id, setNodes, setEdges } = data;
  
  return (
    <div className="group" style={{
      padding: '16px',
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      width: '200px',
      border: '1px solid #f0f0f0',
      position: 'relative',
      transition: 'all 0.2s ease',
      color: '#111827'
    }}>
      <Handle
        type="target"
        position="top"
        style={{ 
          background: '#e5e7eb',
          width: '8px',
          height: '8px',
          border: '2px solid #fff'
        }}
      />
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '8px'
      }}>
        <div style={{
          backgroundColor: '#fce7f3',
          padding: '8px',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          🗿
        </div>
        <div style={{
          display: 'flex',
          flexDirection: 'column'
        }}>
          <span style={{
            fontSize: '14px',
            color: '#6b7280',
            fontWeight: '500'
          }}>
            Leads from
          </span>
          <span style={{
            fontSize: '16px',
            color: '#111827',
            fontWeight: '600'
          }}>
            {data.label}
          </span>
        </div>
      </div>
      {/* Edit & Delete Buttons */}
      <EditAndRemoveNodeButton id={id} setNodes={setNodes} setEdges={setEdges} />
      <Handle
        type="source"
        position="bottom"
        style={{ 
          background: '#e5e7eb',
          width: '8px',
          height: '8px',
          border: '2px solid #fff'
        }}
      />
    </div>
  );
}

