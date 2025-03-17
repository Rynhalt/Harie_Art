import PDFList from "../_components/PDFList";

const pdfs = [
  { id: "1", title: "Free PDF", url: "/pdfs/sample1.pdf" },
  { id: "2", title: "Premium PDF", url: "/pdfs/sample2.pdf" },
];

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">PDF List</h1>
      <PDFList pdfs={pdfs} />
    </main>
  );
}
