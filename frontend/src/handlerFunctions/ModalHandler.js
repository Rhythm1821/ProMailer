const modalStyles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },
    container: {
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        width: '500px',
        maxWidth: '90%',
        maxHeight: '90%',
        overflowY: 'auto',
        position: 'relative',
    },
    closeButton: {
        position: 'absolute',
        right: '10px',
        top: '10px',
        background: 'none',
        border: 'none',
        fontSize: '18px',
        cursor: 'pointer',
        color: 'gray',
    },
    input: {
        width: '100%',
        padding: '8px',
        margin: '8px 0',
        borderRadius: '4px',
        border: '1px solid #e5e7eb',
    },
};

// Modal state
const handleInputChange = (e, setNewItemData, newItemData) => {
    setNewItemData({ ...newItemData, [e.target.name]: e.target.value });
};

const handleSelect = (item, selectedInstances, setSelectedInstances, setIsDropdownOpen) => {
    if (!selectedInstances.some(selected => selected._id === item._id)) {
        setSelectedInstances([...selectedInstances, item]);
    }
    setIsDropdownOpen(false);
};

const handleAdd = (setIsAddingNew, setNewItemData) => {
    setIsAddingNew(true);
    setNewItemData({});
};

const handleRemove = (itemToRemove, selectedInstances, setSelectedInstances) => {
    setSelectedInstances(selectedInstances.filter(item => item._id !== itemToRemove._id));
};

const handleSubmitNewNode = async (nodeType, setData, setIsAddingNew, setNewItemData, newItemData) => {
    const endpoint = nodeType === 'leadSource' ? '/api/leads' : '/api/templates';
    const api = `${import.meta.env.VITE_API_URL}${endpoint}`;
    
    try {
        const response = await fetch(api, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newItemData),
        });
        const data = await response.json();
        if (response.ok) {
            setData(prevData=>([...prevData, data]));
            setIsAddingNew(false);
            setNewItemData({});
        } else {
            alert('Error adding new item: ' + data);
        }
    } catch (error) {
        alert('Error adding new item: ' + error);
    }
};

const handleInsert = (selectedInstances, nodeId, nodeType, addNewNode, onClose) => {
    if (selectedInstances.length === 1) {
        addNewNode(selectedInstances, nodeId, nodeType);
        onClose();
    } else {
        alert('Please select one for now :)');
    }
};

export { modalStyles, handleInputChange, handleSelect, handleAdd, handleRemove, handleSubmitNewNode, handleInsert };