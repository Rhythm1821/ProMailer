export default function InsertButton({ onClick, style }) {
    return (
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button
                onClick={onClick}
                style={style}
            >
                Insert
            </button>
        </div>
    )
}