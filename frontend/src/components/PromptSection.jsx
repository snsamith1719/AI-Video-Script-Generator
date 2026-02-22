// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

function PromptSection({
  prompt,
  setPrompt,
  extractOptions,
  enhancePrompt,
  generateScript,
  loading,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white/10 border border-white/20 rounded-2xl p-6 space-y-4"
    >
      <h2 className="text-xl font-semibold text-white">Prompt Box</h2>

      <textarea
        className="w-full bg-white/20 text-white placeholder-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        rows="5"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your cinematic video idea..."
      />

      <div className="flex gap-4 flex-wrap">
        {[
          { label: "Extract Options", action: extractOptions },
          { label: "Enhance Prompt", action: enhancePrompt },
          { label: "Generate Script", action: generateScript },
        ].map((btn, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={btn.action}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium shadow-lg hover:shadow-xl transition"
          >
            {btn.label}
          </motion.button>
        ))}
      </div>

      {loading && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-indigo-300"
        >
          Processing...
        </motion.p>
      )}
    </motion.div>
  );
}

export default PromptSection;
