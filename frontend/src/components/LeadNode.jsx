import { Handle } from "@xyflow/react";

export default function LeadNode({ data }) {
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
          backgroundColor: '#fce7f3',
          padding: '8px',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ec4899" strokeWidth="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
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

