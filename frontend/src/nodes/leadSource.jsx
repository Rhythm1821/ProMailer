
export default function LeadSource({ data }){
    return (
        <div style={{ padding: 10, border: '1px solid #000', borderRadius: 5 }}>
            <span>{data.label}</span>
        </div>
    )
}