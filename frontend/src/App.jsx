import { useState } from "react";
import axios from "axios";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import PromptSection from "./components/PromptSection";
import OptionsSection from "./components/OptionsSection";
import ScriptSection from "./components/ScriptSection";

function App() {
  const [prompt, setPrompt] = useState("");
  const [options, setOptions] = useState({});
  const [script, setScript] = useState("");
  const [loading, setLoading] = useState(false);

  const API = import.meta.env.VITE_API_URL;

  const extractOptions = async () => {
    if (!prompt.trim()) {
      alert("Please enter a prompt first");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post(`${API}/extract-options`, { prompt });
      setOptions(res.data);
    } catch {
      alert("Extraction failed");
    }
    setLoading(false);
  };

  const enhancePrompt = async () => {
    if (!prompt.trim()) {
      alert("Please enter a prompt first");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post(`${API}/enhance-prompt`, {
        original_prompt: prompt,
        options,
      });
      setPrompt(res.data.enhanced_prompt);
    } catch {
      alert("Enhancement failed");
    }
    setLoading(false);
  };

  const generateScript = async () => {
    if (!prompt.trim()) {
      alert("Please enter a prompt first");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post(`${API}/generate-script`, { prompt });
      setScript(res.data.script);
    } catch {
      alert("Script generation failed");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-6xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-10 space-y-10"
      >
        <h1 className="text-4xl font-bold text-white text-center">
          AI Prompt Intelligence
        </h1>

        <PromptSection
          prompt={prompt}
          setPrompt={setPrompt}
          extractOptions={extractOptions}
          enhancePrompt={enhancePrompt}
          generateScript={generateScript}
          loading={loading}
        />

        <OptionsSection options={options} setOptions={setOptions} />

        <ScriptSection script={script} />
      </motion.div>
    </div>
  );
}

export default App;
