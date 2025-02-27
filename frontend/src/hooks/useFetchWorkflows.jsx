import { useEffect } from "react";

export default function useFetchWorkflows(setNodes, setEdges) {
    useEffect(() => {
        fetch(`http://localhost:3000/api/workflows`)
          .then(res => res.json())
          .then(data => data.allWorkflows ? data.allWorkflows[0] : {})
          .then(data => {
            const { nodes, edges } = data;
            if (nodes && edges) {
              const updatedNodes = nodes.map(node => ({
                ...node,
                data: {
                  ...node.data,
                  setNodes,
                  setEdges,
                }
              }));
              setNodes(updatedNodes);
              setEdges(edges);
            }
          })
          .catch(error => console.log(error))
      }, [])


}