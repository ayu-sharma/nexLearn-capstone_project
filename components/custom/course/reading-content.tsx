import React, { useRef } from 'react';
import { Download, Copy, Check } from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

interface ReadingContentProps {
  content: string;
  title?: string;
}

const ReadingContent = ({ content, title = 'NexLearnStudyNotes/' }: ReadingContentProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = React.useState(false);
  
  const handleDownloadPDF = async () => {
    if (!contentRef.current) return;
    
    try {
      const canvas = await html2canvas(contentRef.current, {
        backgroundColor: '#f8fafc',
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
      
      pdf.addImage(imgData, 'PNG', imgX, 20, imgWidth * ratio, imgHeight * ratio);
      pdf.save(`${title.replace(/\s+/g, '_')}.pdf`);
    } catch (error) {
      console.error('Failed to generate PDF:', error);
      alert('Failed to download PDF. Please try again.');
    }
  };
  
  const handleCopyContent = () => {
    if (!contentRef.current) return;
    
    navigator.clipboard.writeText(content)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(err => {
        console.error('Failed to copy text:', err);
        alert('Failed to copy text. Please try again.');
      });
  };
  
  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto">
      <div className="w-full bg-slate-100 p-4 rounded-t-lg border-b border-slate-300 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-slate-800">{title}</h2>
        <div className="flex gap-2">
          <button
            onClick={handleCopyContent}
            className="flex items-center gap-1 bg-slate-200 hover:bg-slate-300 text-slate-700 py-1 px-3 rounded-md transition-colors duration-200"
            title="Copy to clipboard"
          >
            {copied ? <Check size={16} className="text-green-600" /> : <Copy size={16} />}
            <span>{copied ? 'Copied!' : 'Copy'}</span>
          </button>
          <button
            onClick={handleDownloadPDF}
            className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded-md transition-colors duration-200"
            title="Download as PDF"
          >
            <Download size={16} />
            <span>PDF</span>
          </button>
        </div>
      </div>
      
      <div 
        ref={contentRef}
        className="w-full bg-white border border-slate-300 rounded-b-lg p-6 shadow-sm"
      >
        <div className="prose prose-slate max-w-none">
          {content.split('\n').map((paragraph, idx) => (
            paragraph.trim() ? (
              <p key={idx} className="mb-4 text-slate-700 leading-relaxed selection:bg-blue-100">
                {paragraph}
              </p>
            ) : <br key={idx} />
          ))}
        </div>
      </div>
      
      <div className="w-full mt-6 flex justify-between items-center text-slate-500 text-sm px-2">
        <span>Last updated: {new Date().toLocaleDateString()}</span>
        <span>© {new Date().getFullYear()} NexLearn/Module name</span>
      </div>
    </div>
  );
};

export default ReadingContent;