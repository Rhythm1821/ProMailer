import React, { useEffect, useState } from "react";

const Modal = ({ isOpen, onClose, nodeId, nodeType, addNewNode, includeDelay }) => {
  const [data, setData] = useState([]);
  const [selectedInstances, setSelectedInstances] = useState({});
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newItemData, setNewItemData] = useState({});

  useEffect(() => {
    if (isOpen && nodeId) {
      const fetchData = async () => {
        let fetchedData = [];

        if (nodeType === 'leadSource') {
          fetchedData = await fetch(`/api/leads`)
            .then((res) => res.json())
            .then((data) => data.allLeads || []);
        } else if (nodeType === 'addNode') {
          fetchedData = await fetch(`/api/templates`)
            .then((res) => res.json())
            .then((data) => data.allTemplates || []);
        }
        setData(fetchedData);
      };

      fetchData();
    }
  }, [isOpen, nodeId, nodeType]);

  useEffect(() => {
    if (!isOpen) {
      setIsAddingNew(false);
      setSelectedInstances([]);
      setNewItemData({});
    }
  }, [isOpen]);

  const handleSelect = (item) => {
    if (!selectedInstances.some(selected => selected._id === item._id)) {
      setSelectedInstances([...selectedInstances, item]);
    }
    setIsDropdownOpen(false);
  };

  const handleRemove = (itemToRemove) => {
    setSelectedInstances(selectedInstances.filter(item => item._id !== itemToRemove._id));
  };

  const handleInsert = () => {
    if (selectedInstances.length === 1) {
      addNewNode(selectedInstances, nodeId, nodeType);
      onClose();
    } else {
      alert('Please select one for now :)');
    }
  };

  const handleAdd = () => {
    setIsAddingNew(true);
    setNewItemData({});
  };

  const handleInputChange = (e) => {
    setNewItemData({ ...newItemData, [e.target.name]: e.target.value });
  };

  const handleSubmitNew = async () => {
    const endpoint = nodeType === 'leadSource' ? '/api/leads' : '/api/templates';
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItemData),
      });
      const data = await response.json();
      if (response.ok) {
        setData([...data, data]);
        setIsAddingNew(false);
        setNewItemData({});
      } else {
        alert('Error adding new item: ' + data.message);
      }
    } catch (error) {
      alert('Error adding new item: ' + error.message);
    }
  };

  if (!isOpen) return null;

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

  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.container}>
        <button onClick={() => {
          setIsAddingNew(false);
          setSelectedInstances([]);
          setNewItemData({});
          onClose();
        }} style={modalStyles.closeButton}>
          X
        </button>
        <h2 style={{fontSize: '24px', fontWeight: 'bold', marginBottom: '8px', color: '#333'}}>
          {nodeType === 'leadSource' ? 'Leads from List(s)' : 'Sequence Start Details'}
        </h2>
        <p style={{color: '#666', marginBottom: '16px'}}>
          {nodeType === 'leadSource' 
            ? 'Connect multiple lists as source for this sequence.' 
            : 'Select sequence templates to start with.'}
        </p>
        {!isAddingNew ? (
          <div style={{marginBottom: '16px'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px'}}>
              <h3 style={{fontWeight: 'bold', color: '#333'}}>Select your List(s)</h3>
              <button
               onClick={handleAdd}
               style={{
                border: '1px solid #3b82f6',
                color: '#3b82f6',
                padding: '4px 12px',
                borderRadius: '9999px',
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer'
              }}>
                <span style={{marginRight: '4px'}}>+</span> 
                {nodeType === 'leadSource' ? 'Add Lead' : 'Add Template'}
              </button>
            </div>
            <div style={{
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              padding: '8px',
              minHeight: '100px',
              position: 'relative'
            }}>
              <div style={{display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '8px'}}>
                {selectedInstances.map((item) => (
                  <span key={item._id} style={{
                    backgroundColor: '#f3f4f6',
                    padding: '4px 8px',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    color: '#6b7280'
                  }}>
                    {item.name}
                    <button onClick={() => handleRemove(item)} style={{marginLeft: '4px', color: '#6b7280'}}>
                      X
                    </button>
                  </span>
                ))}
              </div>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '8px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '4px',
                  background: 'white',
                  color: '#333',
                  cursor: 'pointer'
                }}
              >
                Select options
              </button>
              {isDropdownOpen && (
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: 0,
                  right: 0,
                  maxHeight: '200px',
                  overflowY: 'auto',
                  border: '1px solid #e5e7eb',
                  borderTop: 'none',
                  borderRadius: '0 0 4px 4px',
                  background: 'white',
                  zIndex: 10
                }}>
                  {data.filter(item => !selectedInstances.some(selected => selected._id === item._id))
                    .map((item) => (
                      <button
                        key={item._id}
                        onClick={() => handleSelect(item)}
                        style={{
                          display: 'block',
                          width: '100%',
                          textAlign: 'left',
                          padding: '8px',
                          cursor: 'pointer',
                          border: 'none',
                          background: 'none',
                          color: '#333'
                        }}
                      >
                        {item.name}
                      </button>
                    ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div>
            <h3 style={{fontWeight: 'bold', color: '#333', marginBottom: '16px'}}>
              {nodeType === 'leadSource' ? 'Add New Lead' : 'Add New Template'}
            </h3>
            {nodeType === 'leadSource' ? (
              <>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  onChange={handleInputChange}
                  style={modalStyles.input}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={handleInputChange}
                  style={modalStyles.input}
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone"
                  onChange={handleInputChange}
                  style={modalStyles.input}
                />
                <input
                  type="text"
                  name="company"
                  placeholder="Company"
                  onChange={handleInputChange}
                  style={modalStyles.input}
                />
                <select
                  name="status"
                  onChange={handleInputChange}
                  style={modalStyles.input}
                >
                  <option value="">Select Status</option>
                  <option value="Pending">Pending</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Unresponsive">Unresponsive</option>
                  <option value="Converted">Converted</option>
                </select>
              </>
            ) : (
              <>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  onChange={handleInputChange}
                  style={modalStyles.input}
                />
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  onChange={handleInputChange}
                  style={modalStyles.input}
                />
                <textarea
                  name="content"
                  placeholder="Content"
                  onChange={handleInputChange}
                  style={{...modalStyles.input, minHeight: '100px'}}
                />
                <input
                  type="text"
                  name="placeholders"
                  placeholder="Placeholders (comma-separated)"
                  onChange={handleInputChange}
                  style={modalStyles.input}
                />
              </>
            )}
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
                marginRight: '8px'
              }}
            >
              Cancel
            </button>
            <button
              onClick={handleSubmitNew}
              style={{
                backgroundColor: '#3b82f6',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '8px',
                cursor: 'pointer',
                border: 'none',
                marginTop: '16px'
              }}
            >
              Add
            </button>
          </div>
        )}
        {!isAddingNew && (
          <div style={{display: 'flex', justifyContent: 'flex-end'}}>
            <button
              onClick={handleInsert}
              style={{
                backgroundColor: '#3b82f6',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '8px',
                cursor: 'pointer',
                border: 'none'
              }}
            >
              Insert
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;

