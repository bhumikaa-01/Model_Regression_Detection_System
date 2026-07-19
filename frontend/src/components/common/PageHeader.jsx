import { motion } from "framer-motion";
import Button from "../ui/Button";

export default function PageHeader({
  title,
  subtitle,
  buttonText,
  onButtonClick,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="mb-8 flex flex-col items-start justify-between gap-5 md:flex-row md:items-center"
    >
      <div>
        <h1 className="text-4xl font-bold tracking-tight text-white">
          {title}
        </h1>

        <p className="mt-2 text-slate-400">
          {subtitle}
        </p>
      </div>

      <Button onClick={onButtonClick}>
        {buttonText}
      </Button>
    </motion.div>
  );
}