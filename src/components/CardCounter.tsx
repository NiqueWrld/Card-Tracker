import React from 'react';
import { Plus, Minus } from 'lucide-react';

type CardCounterProps = {
  number: number;
  count: number;
  onChecked: () => void;
  onUnchecked: () => void;
};

export function CardCounter({ number, count, onChecked, onUnchecked }: CardCounterProps) {
  return (
    <label
      key={count}
      className="flex items-center justify-center bg-white/10 text-white font-bold rounded-lg p-3 cursor-pointer hover:bg-indigo-600 transition"
    >
      <input
        type="checkbox"
        className="hidden"
        value={number}
       
      />
      {number}
    </label>
  );
}