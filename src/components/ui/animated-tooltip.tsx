
import { useState } from "react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface AnimatedTooltipProps {
  items: {
    name: string;
    image: string;
  }[];
}

export const AnimatedTooltip = ({ items }: AnimatedTooltipProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="flex flex-row items-center justify-center gap-2">
      {items.map((item, idx) => (
        <div
          className="relative group"
          key={idx}
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <Avatar className="h-10 w-10 border-2 border-white">
            <AvatarImage src={item.image} alt={item.name} />
            <AvatarFallback>{item.name.charAt(0)}</AvatarFallback>
          </Avatar>
          {hoveredIndex === idx && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.6 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                transition: {
                  type: "spring",
                  stiffness: 260,
                  damping: 10,
                },
              }}
              exit={{ opacity: 0, y: 20, scale: 0.6 }}
              className="absolute -top-14 left-1/2 -translate-x-1/2 flex items-center justify-center"
            >
              <div className="bg-card border shadow-lg px-2 py-1 rounded-md text-sm z-50">
                <div className="text-center">{item.name}</div>
              </div>
            </motion.div>
          )}
        </div>
      ))}
    </div>
  );
};
