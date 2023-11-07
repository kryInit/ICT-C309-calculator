import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import InteractiveEditor from "~/components/pages/interactive-editor/InteractiveEditor";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
      <InteractiveEditor />
  </React.StrictMode>,
)
