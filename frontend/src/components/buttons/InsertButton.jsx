export default function InsertButton({ onClick }) {
    return (
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button
                onClick={onClick}
                style={{
                    backgroundColor: '#3b82f6',
                    color: 'white',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    border: 'none',
                    marginTop: '16px',
                }}
            >
                Insert
            </button>
        </div>
    )
}