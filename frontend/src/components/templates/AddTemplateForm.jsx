import { handleInputChange, modalStyles, handleSubmitNewNode } from "../../handlerFunctions/ModalHandler";

export default function AddTemplateForm({
  setIsAddingNew,
  setNewItemData,
  newItemData,
  nodeType,
  setData,
}) {
  return (
    <form>
      <input
        type="text"
        name="name"
        placeholder="Name"
        onChange={(e) => handleInputChange(e, setNewItemData, newItemData)}
        style={modalStyles.input}
      />
      <input
        type="text"
        name="subject"
        placeholder="Subject"
        onChange={(e) => handleInputChange(e, setNewItemData, newItemData)}
        style={modalStyles.input}
      />
      <textarea
        name="content"
        placeholder="Content"
        onChange={(e) => handleInputChange(e, setNewItemData, newItemData)}
        style={{ ...modalStyles.input, minHeight: '100px' }}
      />
      <input
        type="text"
        name="placeholders"
        placeholder="Placeholders (comma-separated)"
        onChange={(e) => handleInputChange(e, setNewItemData, newItemData)}
        style={modalStyles.input}
      />
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
    </form>
  )
}