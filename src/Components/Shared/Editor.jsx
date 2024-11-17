import React, { useState, useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';

const Editor = ({ content, setContent, placeholder }) => {
    const editor = useRef(null);
    const config = {
        readonly: false,
        placeholder: placeholder || 'Start typings...',
        height: 500,
    }
    return (
        <JoditEditor
        
            ref={editor}
            value={content}
            config={config}
            tabIndex={1}
            onBlur={newContent => setContent(newContent)}
            onChange={newContent => { }}
        />
    );
}

export default Editor
