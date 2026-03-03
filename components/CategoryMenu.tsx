'use client';

import { motion } from 'framer-motion';
import { categories } from '@/lib/questions';

interface CategoryMenuProps {
  onSelectCategory: (category: string | null) => void;
}

export function CategoryMenu({ onSelectCategory }: CategoryMenuProps) {
  return (
    <div className="w-full max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl md:text-7xl font-black text-white mb-4 tracking-tight">
          TRIVIA <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">BLITZ</span>
        </h1>
        <p className="text-xl text-zinc-400">Test your knowledge across different categories!</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-8"
      >
        <button
          onClick={() => onSelectCategory(null)}
          className="group relative px-8 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-2xl font-bold text-xl text-black hover:scale-105 transition-transform"
        >
          <span className="relative z-10">🎲 Random Mix</span>
          <motion.div
            className="absolute inset-0 bg-white/20 rounded-2xl"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
          />
        </button>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-center text-zinc-500 mb-6"
      >
        Or choose a category:
      </motion.p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {categories.map((category, index) => (
          <motion.button
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
            onClick={() => onSelectCategory(category.id)}
            className="group relative p-6 bg-zinc-800/50 border-2 border-zinc-700 rounded-2xl hover:border-zinc-500 transition-all hover:scale-105"
          >
            <div className="text-4xl mb-3">{category.emoji}</div>
            <p className="font-semibold text-white group-hover:text-emerald-400 transition-colors">
              {category.name}
            </p>
            <motion.div
              className={`absolute inset-0 ${category.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity`}
            />
          </motion.button>
        ))}
      </div>
    </div>
  );
}
