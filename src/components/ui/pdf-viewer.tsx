import React from 'react';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

// Import styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

const PdfViewer: React.FC<{ fileUrl: string }> = ({ fileUrl }) => {
	const defaultLayoutPluginInstance = defaultLayoutPlugin();

	return (
		<Worker workerUrl='https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js'>
			<div className='size-full'>
				<Viewer
					plugins={[defaultLayoutPluginInstance]}
					fileUrl='https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
				/>
			</div>
		</Worker>
	);
};

export default PdfViewer;
