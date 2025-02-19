import { useEffect } from "react";

export default function useFetchModalData(isOpen, nodeId, nodeType, setData) {
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
}