import { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [text, setText] = useState('');
  const [audioFile, setAudioFile] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_APP_API_URL}/generate-audio/`, {
        text: text,
      });
      setAudioFile(`${import.meta.env.VITE_APP_API_URL}/audio/${response.data.audio_file}`);
      setText('');
    } catch (error) {
      console.error("Error generating audio:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4">Text to Speech</h1>
        <form onSubmit={handleSubmit}>
          <textarea
            className="w-full h-32 p-2 border border-gray-300 rounded mb-4"
            placeholder="Enter text..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Generate Audio
          </button>
        </form>
        {audioFile && (
          <div className="mt-4">
            <h2 className="text-lg">Generated Audio:</h2>
            <audio controls>
              <source src={audioFile} type="audio/mp3" />
              Your browser does not support the audio element.
            </audio>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
