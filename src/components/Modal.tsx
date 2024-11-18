import React, { useState } from 'react';

export function Modal({ isOpen, onClose, onSubmit }) {
  const [totalCards, setTotalCards] = useState(0);

  const [cardCounts, setCardCounts] = useState({});

  const handleTotalCardsSubmit = () => {
    if (totalCards > 0) {
      // Create input fields for card counts dynamically
      const initialCounts = Array.from({ length: totalCards }, (_, i) => ({
        [i + 1]: 0,
      })).reduce((acc, curr) => ({ ...acc, ...curr }), {});
      setCardCounts(initialCounts);
    }
  };

  const handleCardCountChange = (card, value) => {
    setCardCounts((prev) => ({
      ...prev,
      [card]: value,
    }));
  };

  const handleModalSubmit = () => {
    onSubmit(cardCounts);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg text-black font-bold mb-4">Enter Your Card Numbers</h2>

        {Object.keys(cardCounts).length === 0 ? (
          <>
            <input
              type="number"
              min="1"
              max="40"
              onChange={(e) => setTotalCards(Number(e.target.value))}
              className="w-full px-3 py-2 text-black border rounded-md mb-4"
            />
            <button
              className="w-full px-4 py-2 bg-purple-500 text-black rounded-md"
              onClick={handleTotalCardsSubmit}
            >
              Next
            </button>
          </>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-4">
              {Object.keys(cardCounts).map((card) => (
                <div key={card} className="flex items-center gap-2">
                  <span>Card {card}:</span>
                  <input
                    type="number"
                    min="0"
                    max="4"
                    onChange={(e) =>
                      handleCardCountChange(card, Number(e.target.value))
                    }
                    className="w-16 px-2 text-black py-1 border rounded-md"
                  />
                </div>
              ))}
            </div>
            <button
              className="mt-4 w-full px-4 py-2 bg-purple-500 text-black rounded-md"
              onClick={handleModalSubmit}
            >
              Submit
            </button>
          </>
        )}
      </div>
    </div>
  );
}
