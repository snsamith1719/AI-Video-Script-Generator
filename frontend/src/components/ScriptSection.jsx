// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

function ScriptSection({ script }) {
  if (!script) return null;

  const lines = script.split("\n");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-slate-900/70 backdrop-blur-xl border border-white/5 rounded-2xl p-6 shadow-xl space-y-6"
    >
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          🎬 Cinematic Video Script
        </h2>
      </div>

      {/* Content */}
      <div className="text-sm text-slate-300 leading-relaxed space-y-3">
        {lines.map((line, index) => {
          // Divider
          if (line.trim() === "") {
            return <div key={index} className="border-t border-white/5 my-4" />;
          }

          // Scene Heading
          if (line.startsWith("Scene")) {
            return (
              <h3
                key={index}
                className="text-cyan-400 font-semibold text-base mt-6"
              >
                {line}
              </h3>
            );
          }

          // Title
          if (line.startsWith("Video Title")) {
            return (
              <h3 key={index} className="text-cyan-400 font-semibold">
                {line}
              </h3>
            );
          }

          // Label format (Format:, Visuals:, Narration:)
          if (line.includes(":")) {
            const [label, ...rest] = line.split(":");
            return (
              <p key={index}>
                <span className="text-cyan-400 font-medium">{label}:</span>{" "}
                {rest.join(":")}
              </p>
            );
          }

          // Normal paragraph
          return <p key={index}>{line}</p>;
        })}
      </div>
    </motion.div>
  );
}

export default ScriptSection;
