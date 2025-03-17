"use client"; // Ensures this runs only in the browser

import dynamic from "next/dynamic";
import { useState } from "react";
import { pdfjs } from "react-pdf";

// Set the worker source manually (important for Next.js)
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

// Dynamically import react-pdf to prevent SSR errors
const Document = dynamic(() => import("react-pdf").then((mod) => mod.Document), { ssr: false });
const Page = dynamic(() => import("react-pdf").then((mod) => mod.Page), { ssr: false });

type PDFProps = {
  pdfs: { id: string; title: string; url: string }[];
};

export default function PDFList({ pdfs }: PDFProps) {
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null);

  return (
    <div className="flex flex-col space-y-4">
      {pdfs.map((pdf) => (
        <div
          key={pdf.id}
          className="flex items-center border p-4 rounded-lg bg-white shadow-md w-full"
        >
          {/* PDF Preview */}
          <div className="w-24 h-32 border shadow-md overflow-hidden">
            <Document
              file={pdf.url}
              onLoadError={(error) => console.error("PDF load error:", error)}
            >
              <Page pageNumber={1} width={100} />
            </Document>
          </div>

          {/* PDF Details */}
          <div className="ml-4 flex flex-col flex-grow">
            <h2 className="text-lg font-semibold">{pdf.title}</h2>
            <button
              onClick={() => setSelectedPdf(pdf.url)}
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
            >
              View Full PDF
            </button>
          </div>
        </div>
      ))}

      {/* Full PDF Viewer (Modal) */}
      {selectedPdf && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full relative">
            <button
              onClick={() => setSelectedPdf(null)}
              className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded"
            >
              Close
            </button>
            <Document file={selectedPdf}>
              <Page pageNumber={1} width={500} />
            </Document>
          </div>
        </div>
      )}
    </div>
  );
}
