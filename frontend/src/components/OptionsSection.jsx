// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

function OptionsSection({ options, setOptions }) {
  const handleChange = (key, value) => {
    setOptions({ ...options, [key]: value });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="bg-white/10 border border-white/20 rounded-2xl p-6 space-y-4"
    >
      <h2 className="text-xl font-semibold text-white">Extracted Options</h2>

      <div className="grid grid-cols-2 gap-4">
        {["duration", "language", "platform", "size", "category"].map(
          (field) => (
            <div key={field} className="flex flex-col">
              <label className="text-sm text-gray-300 capitalize">
                {field}
              </label>
              <input
                className="bg-white/20 text-white rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                value={options[field] || ""}
                onChange={(e) => handleChange(field, e.target.value)}
              />
            </div>
          ),
        )}
      </div>
    </motion.div>
  );
}

export default OptionsSection;
