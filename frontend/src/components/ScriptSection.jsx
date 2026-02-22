// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

function ScriptSection({ script }) {
  if (!script) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6 }}
      className="bg-black/60 border border-white/20 rounded-2xl p-6"
    >
      <h2 className="text-xl font-semibold text-white mb-4">
        Cinematic Script
      </h2>

      <div className="text-green-300 whitespace-pre-wrap font-mono text-sm max-h-96 overflow-y-auto">
        {script}
      </div>
    </motion.div>
  );
}

export default ScriptSection;
