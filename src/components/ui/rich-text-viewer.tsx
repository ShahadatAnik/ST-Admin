import React from 'react';
import ReactQuill from 'react-quill-new';

import 'react-quill-new/dist/quill.bubble.css';

const RichTextViewer: React.FC<{ content: string }> = ({ content }) => {
	return <ReactQuill readOnly theme='bubble' value={content} />;
};

export default RichTextViewer;
