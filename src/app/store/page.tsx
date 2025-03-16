const pdfs = [
    { id: "1", title: "Free PDF", price: "Free" },
    { id: "2", title: "Premium PDF", price: "5 Credits" },
  ];
  
  export default function Store() {
    return (
      <main className="flex flex-col items-center">
        <h1 className="text-2xl font-bold">PDF Store</h1>
        <ul className="mt-4 space-y-2">
          {pdfs.map((pdf) => (
            <li key={pdf.id} className="border p-4 rounded shadow-md w-80 bg-white">
              <h2 className="text-lg font-semibold">{pdf.title}</h2>
              <p>{pdf.price}</p>
              <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
                Download
              </button>
            </li>
          ))}
        </ul>
      </main>
    );
  }
  