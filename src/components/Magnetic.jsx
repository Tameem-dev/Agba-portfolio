import { useRef } from 'react';
import { motion } from 'framer-motion';

export default function Magnetic({ children, strength = 0.35, className, as = 'a', ...rest }) {
  const ref = useRef(null);
  const Component = motion[as] || motion.a;

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * strength;
    const y = (e.clientY - rect.top - rect.height / 2) * strength;
    el.style.transform = `translate(${x}px, ${y}px)`;
  };

  const handleLeave = () => {
    if (ref.current) ref.current.style.transform = 'translate(0px, 0px)';
  };

  return (
    <Component
      ref={ref}
      className={className}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ transition: 'transform 0.3s var(--ease-out)' }}
      {...rest}
    >
      {children}
    </Component>
  );
}
