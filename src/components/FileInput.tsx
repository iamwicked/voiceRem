import { ChangeEvent, useState } from "react";

interface FileInputProps {
  onChange: (file: File) => void;
}

export default function FileInput({ onChange }: FileInputProps) {
  const [fileName, setFileName] = useState("No file chosen");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      onChange(file);
    }
  };

  return (
    <div className="mb-4">
      <label
        htmlFor="audio-upload"
        className="block text-sm font-medium text-gray-300"
      >
        Upload Audio File
      </label>
      <div className="mt-1 flex items-center">
        <input
          type="file"
          id="audio-upload"
          accept="audio/*"
          onChange={handleChange}
          className="hidden"
        />
        <button
          type="button"
          onClick={() => document.getElementById("audio-upload")?.click()}
          className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
        >
          Choose File
        </button>
        <span className="ml-2 text-gray-400">{fileName}</span>
      </div>
    </div>
  );
}
