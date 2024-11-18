import React, { useState, useMemo } from 'react';
import { Trophy, AlertCircle } from 'lucide-react';
import { CardCounter } from './components/CardCounter';
import { Modal } from './components/Modal';

const TOTAL_CARDS = 40;
const MAX_CARDS_PER_NUMBER = 4;

function App() {
  const [myCards, setmyCards] = useState({});
  const [modalOpen, setModalOpen] = useState(true);

  const totalCardsHeld = useMemo(
    () =>
      Object.values(myCards).reduce((sum, count) => sum + count, 0),
    [myCards]
  );

  const remainingCards = TOTAL_CARDS - totalCardsHeld;

  const handleModalSubmit = (counts) => {
    setmyCards(counts);
  };

  const addUserCard = (number) => {
    alert(number)
    if (myCards[number] < MAX_CARDS_PER_NUMBER) {
      setmyCards((prev) => ({
        ...prev,
        [number]: prev[number] + 1,
      }));
    }
  };

  const handleDecrement = (number) => {
    if (myCards[number] > 0) {
      setmyCards((prev) => ({
        ...prev,
        [number]: prev[number] - 1,
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-800 p-4 text-white">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-center gap-2 mb-6">
          <Trophy className="w-8 h-8" />
          <h1 className="text-2xl font-bold">Card Counter</h1>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-400" />
              <span className="font-semibold">Your Cards: {Object.keys(myCards).length}</span>
            </div>
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-blue-400" />
              <span className="font-semibold">
                Other Players: {remainingCards}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-5 gap-4">
            {Object.keys(myCards).map((number) => (
              <label
                key={number} // Unique key
                className="flex items-center justify-center bg-white/10 text-white font-bold rounded-lg p-3 cursor-pointer hover:bg-indigo-600 transition peer-checked:bg-blue-600"
              >
                <input
                  type="checkbox"
                  className="hidden peer"
                  value={Number(myCards[number])}
                  onChange={(e) => {
                    if (e.target.checked) {
                      addUserCard(Number(number)); // Add card when checked
                    } else {
                      handleDecrement(Number(number)); // Remove card when unchecked
                    }
                  }}
                />
                {number}
              </label>
            ))}

          </div>

          <div className="mt-6 text-sm text-gray-300 text-center">
            Use + and - to track your cards (max 4 of each number)
          </div>
        </div>
      </div>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleModalSubmit}
      />
    </div>
  );
}

export default App;
