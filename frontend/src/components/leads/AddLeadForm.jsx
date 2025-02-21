import { modalStyles, handleInputChange, handleSubmitNewNode } from "../../handlerFunctions/ModalHandler"
export default function AddLeadForm(
    { 
        setNewItemData, 
        newItemData,
        setIsAddingNew,
        setData,
        nodeType
    }
) {
    return (
        <div>
            <input
                type="text"
                name="name"
                placeholder="Name"
                onChange={(e) => handleInputChange(e, setNewItemData, newItemData)}
                style={modalStyles.input}
            />
            <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={(e) => handleInputChange(e, setNewItemData, newItemData)}
                style={modalStyles.input}
            />
            <input
                type="tel"
                name="phone"
                placeholder="Phone"
                onChange={(e) => handleInputChange(e, setNewItemData, newItemData)}
                style={modalStyles.input}
            />
            <input
                type="text"
                name="company"
                placeholder="Company"
                onChange={(e) => handleInputChange(e, setNewItemData, newItemData)}
                style={modalStyles.input}
            />
            <select
                name="status"
                onChange={(e) => handleInputChange(e, setNewItemData, newItemData)}
                style={modalStyles.input}
            >
                <option value="">Select Status</option>
                <option value="Pending">Pending</option>
                <option value="Contacted">Contacted</option>
                <option value="Unresponsive">Unresponsive</option>
                <option value="Converted">Converted</option>
            </select>
            <button
                onClick={() => setIsAddingNew(false)}
                style={{
                    backgroundColor: '#f3f4f6',
                    color: '#333',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    border: 'none',
                    marginTop: '16px',
                    marginRight: '8px',
                }}
            >
                Cancel
            </button>
            <button
                onClick={() => handleSubmitNewNode(nodeType, setData, setIsAddingNew, setNewItemData, newItemData)}
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
                Add
            </button>
        </div>
    )
}