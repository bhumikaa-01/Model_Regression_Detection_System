import { motion } from "framer-motion";
import "./PageHeader.css";

export default function PageHeader({
  title,
  subtitle,
  actions,
  extra,
  children,
}) {
  return (
    <motion.div
      className="page-header"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <div className="page-header__left">
        <h1 className="page-header__title">{title}</h1>

        {subtitle && (
          <p className="page-header__subtitle">{subtitle}</p>
        )}

        {children && (
          <div className="page-header__children">
            {children}
          </div>
        )}
      </div>

      <div className="page-header__right">
        {extra && (
          <div className="page-header__extra">
            {extra}
          </div>
        )}

        {actions && (
          <div className="page-header__actions">
            {actions}
          </div>
        )}
      </div>
    </motion.div>
  );
}