import { handleNodeEdit, handleNodeRemove } from "../../handlerFunctions/AppHandler";

export default function EditAndRemoveNodeButton({ id, setNodes, setEdges }) {
    return (
        <div style={{
            position: 'absolute',
            top: '-15px',
            right: '-15px',
            display: 'flex',
            gap: '5px',
          }}>
            <button
              onClick={() => handleNodeEdit(id)}
              style={{
                padding: '4px 8px',
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
              onClick={() => handleNodeRemove(id, setNodes, setEdges)}
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
}