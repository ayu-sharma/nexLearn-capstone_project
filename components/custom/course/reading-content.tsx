import React, { useRef, useState } from 'react';
import { Download, Copy, Check } from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

interface ReadingContentProps {
  content: string;
  filename?: string;
}

const ReadingContent: React.FC<ReadingContentProps> = ({ 
  content, 
  filename = 'NexLearnStudyNotes' 
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState<boolean>(false);
  
  const handleDownloadPDF = async (): Promise<void> => {
    if (!contentRef.current) return;
    
    try {
      const canvas = await html2canvas(contentRef.current, {
        backgroundColor: '#ffffff',
        scale: 2,
        logging: false,
        useCORS: true
      });
      
      const imgData = canvas.toDataURL('image/png');
      
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      
      // Add image first
      pdf.addImage(imgData, 'PNG', imgX, 20, imgWidth * ratio, imgHeight * ratio);
      
      // Add filename as watermark background
      pdf.setTextColor(200); // Light gray color
      
      // Large watermark text
      pdf.setTextColor(0, 0, 0, 0.2);
      pdf.setFontSize(20);
      pdf.text(`NexLearn/${filename}`, pdfWidth / 2, pdfHeight / 2, {
        align: 'center',
        maxWidth: 100,
        angle: 45,
      });
      
      // Smaller additional text
      pdf.setTextColor(0, 0, 0, 0.2);
      pdf.setFontSize(10);
      pdf.text('Confidential Document - Internal Use Only', pdfWidth / 2, pdfHeight / 2 + 50, {
        align: 'center',
        maxWidth: 100,
        angle: 45
      });
      
      pdf.save(`${filename.replace(/\s+/g, '_')}.pdf`);
    } catch (error) {
      console.error('Failed to generate PDF:', error);
      alert(`Failed to download PDF: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };
  
  const handleCopyContent = (): void => {
    if (!contentRef.current) return;
    
    navigator.clipboard.writeText(content)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((err: Error) => {
        console.error('Failed to copy text:', err);
        alert('Failed to copy text. Please try again.');
      });
  };
  
  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto px-4 sm:px-6 my-6">
      <div className="relative w-full bg-white rounded-2xl shadow-lg border border-gray-100">
        <div className="absolute -top-3 right-4 flex gap-2 z-10">
          <button
            onClick={handleCopyContent}
            className="flex items-center justify-center h-10 w-10 sm:w-auto sm:px-4 bg-gray-900 hover:bg-gray-800 text-white rounded-full shadow-md transition-all duration-200"
            title="Copy to clipboard"
          >
            {copied ? <Check size={18} /> : <Copy size={18} />}
            <span className="hidden sm:inline ml-1">{copied ? 'Copied!' : 'Copy'}</span>
          </button>
          <button
            onClick={handleDownloadPDF}
            className="flex items-center justify-center h-10 w-10 sm:w-auto sm:px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-md transition-all duration-200"
            title="Download as PDF"
          >
            <Download size={18} />
            <span className="hidden sm:inline ml-1">PDF</span>
          </button>
        </div>
        
        <div 
          ref={contentRef}
          className="w-full p-6 sm:p-8 pt-8"
        >
          <div className="prose prose-sm sm:prose lg:prose-lg prose-slate max-w-none">
            {content.split('\n').map((paragraph, idx) => (
              paragraph.trim() ? (
                <p key={idx} className="mb-4 text-gray-800 leading-relaxed selection:bg-indigo-100 selection:text-indigo-900">
                  {paragraph}
                </p>
              ) : <br key={idx} />
            ))}
          </div>
        </div>
        
        <div className="border-t border-gray-100 w-full p-4 sm:p-6 flex flex-col sm:flex-row sm:justify-between items-start sm:items-center text-gray-400 text-xs">
          <span>Last updated: {new Date().toLocaleDateString()}</span>
          <span>© {new Date().getFullYear()} NexLearn/{filename}</span>
        </div>
      </div>
    </div>
  );
};

export default ReadingContent;