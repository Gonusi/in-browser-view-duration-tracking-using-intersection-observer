import React, { useState } from "react";
import ViewDurationTracker from "../components/ViewDurationTracker/ViewDurationTracker";

/* 5 hours left for the project, let's inline the damn styles*/
const ViewDurationTrackerDemoView = () => {
  const [duration, setDuration] = useState(0);

  return (
    <>
      <div
        style={{
          background: "yellow",
          border: "10px solid black",
          padding: 20,
          position: "sticky",
          top: 8
        }}
      >
        Total view time: {duration / 1000}s
      </div>
      <h1>ViewDurationTracker demo view</h1>
      <ol>
        <li>↓ scroll down until component in view ↓</li>
        <li>↑ then scroll up until component no longer in view ↑</li>
      </ol>
      <ViewDurationTracker
        style={{
          background: "blue",
          border: "10px solid black",
          color: "white",
          height: 230,
          marginTop: "100vh",
          padding: 10,
          width: 270
        }}
        onViewDurationMsChange={({ viewDuration }) => setDuration(viewDuration)}
      >
        <pre>
          {`
                __        _      
              _/  \    _(\(o     
             /     \  /  _  ^^^o 
            /   !   \/  ! '!!!v' 
           !  !  \ _' ( \____    
           ! . \ _!\   \===^\)   
Art by      \ \_!  / __!         
 Gunnar Z.   \!   /    \         
       (\_      _/   _\ )        
        \ ^^--^^ __-^ /(__       
         ^^----^^    "^--v'
       `}{" "}
        </pre>
      </ViewDurationTracker>
    </>
  );
};

export default ViewDurationTrackerDemoView;
