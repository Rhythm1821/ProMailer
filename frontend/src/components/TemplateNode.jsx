import { Handle } from "@xyflow/react";

export default function TemplateNode({ data }) {
  return (
    <div className="group" style={{
      padding: '16px',
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      width: '200px',
      border: '1px solid #f0f0f0',
      position: 'relative',
      transition: 'all 0.2s ease'
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
          backgroundColor: '#f3e8ff',
          padding: '8px',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9333ea" strokeWidth="2">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          </svg>
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
            Email Template
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

