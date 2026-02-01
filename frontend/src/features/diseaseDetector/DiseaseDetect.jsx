import { useState } from 'react';
import { useSelector } from 'react-redux';
import { detectDisease } from './diseaseAPI';

const DiseaseDetect = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { token } = useSelector((state) => state.auth);

  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setResult(null);
    setError('');
    if (selectedFile) {
      setPreview(URL.createObjectURL(selectedFile));
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    try {
      setLoading(true);
      setError('');
      const data = await detectDisease(file, token);
      setResult(data);
    } catch (err) {
      console.error('[❌ Error] Axios or API failed:', err);
      setError('Failed to detect disease. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-light-bg p-6 font-sans">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <span className="bg-primary/10 text-primary p-4 rounded-2xl text-4xl inline-block mb-4">🔍</span>
          <h2 className="text-4xl font-serif font-bold text-secondary mb-2">Disease Detector</h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Upload a photo of your plant leaf to identify diseases and get treatment advice instantly.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-secondary/10 h-fit">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative border-2 border-dashed border-secondary/20 rounded-2xl p-8 text-center hover:bg-secondary/5 transition-colors cursor-pointer group">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                {preview ? (
                  <div className="relative h-64 w-full rounded-xl overflow-hidden">
                    <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-white font-bold">Change Image</span>
                    </div>
                  </div>
                ) : (
                  <div className="py-12">
                    <span className="text-4xl block mb-4 opacity-50">📸</span>
                    <p className="font-bold text-secondary mb-1">Click or Drag to Upload</p>
                    <p className="text-sm text-gray-500">Supports JPG, PNG</p>
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={loading || !file}
                className={`w-full py-4 rounded-xl font-bold text-white transition-all shadow-lg ${
                  loading || !file
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-secondary hover:bg-primary shadow-secondary/20'
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="animate-spin">⏳</span> Analyzing...
                  </span>
                ) : (
                  'Detect Disease'
                )}
              </button>
            </form>
            {error && (
              <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-xl border border-red-100 text-center font-medium">
                {error}
              </div>
            )}
          </div>

          {/* Result Section */}
          <div className="space-y-6">
            {result ? (
              <div className="bg-white p-8 rounded-3xl shadow-xl border border-secondary/10 animate-fade-in">
                <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
                  <h3 className="text-2xl font-serif font-bold text-secondary">Analysis Result</h3>
                  {result.confidence && (
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-bold">
                      {(result.confidence * 100).toFixed(1)}% Match
                    </span>
                  )}
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Detected Issue</h4>
                    <p className="text-2xl font-bold text-primary">{result.disease}</p>
                  </div>

                  <div className="bg-light-bg p-4 rounded-xl border border-secondary/5">
                    <h4 className="font-bold text-secondary mb-2 flex items-center gap-2">
                      <span>📝</span> Summary
                    </h4>
                    <p className="text-gray-600 text-sm leading-relaxed">{result.summary}</p>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    <div className="bg-red-50 p-4 rounded-xl border border-red-100">
                      <h4 className="font-bold text-red-800 mb-2 flex items-center gap-2">
                        <span>🦠</span> Cause
                      </h4>
                      <p className="text-red-700 text-sm">{result.cause}</p>
                    </div>
                    
                    <div className="bg-green-50 p-4 rounded-xl border border-green-100">
                      <h4 className="font-bold text-green-800 mb-2 flex items-center gap-2">
                        <span>💊</span> Treatment
                      </h4>
                      <p className="text-green-700 text-sm">{result.treatment}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                     <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                        <h4 className="font-bold text-blue-800 mb-1 text-sm">Fertilizer</h4>
                        <p className="text-blue-700 text-xs">{result.fertilizer_advice}</p>
                     </div>
                     <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
                        <h4 className="font-bold text-orange-800 mb-1 text-sm">Survivability</h4>
                        <p className="text-orange-700 text-xs">{result.survivability}</p>
                     </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 opacity-50 border-2 border-dashed border-gray-200 rounded-3xl">
                <span className="text-6xl mb-4 grayscale">🌿</span>
                <h3 className="text-xl font-bold text-gray-400">No Analysis Yet</h3>
                <p className="text-gray-400 text-sm mt-2">Upload an image to see the diagnosis here.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiseaseDetect;
