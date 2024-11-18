import React, { useState, useMemo, useRef } from 'react';
import { Trophy, AlertCircle, Car } from 'lucide-react';
import { Modal } from './components/Modal';

const TOTAL_CARDS = 40;
const MAX_CARDS_PER_NUMBER = 4;

function App() {
  const startBtnRef = useRef<HTMLButtonElement | null>(null);
  const [myCards, setMyCards] = useState({});
  const [playedCards, setOtherCards] = useState({});
  const [winnerCards, setWinnerCards] = useState({});
  const cards = Array.from({ length: 10 }, (_, index) => Array(4).fill(index + 1)).flat();
  const [unPlayedCards, setUnPlayedCards] = useState({});
  const [modalOpen, setModalOpen] = useState(true);

  const totalCardsHeld = useMemo(
    () => Object.values(myCards).reduce((sum, count) => sum + count, 0),
    [myCards]
  );

  const checkWinnerCards = () => {
    // Get the keys from myCards
    const myCardNumbers = Object.keys(myCards); // Assuming the cards are keyed by numbers (strings)

    // Get the keys from playedCards and unPlayedCards
    const playedCardNumbers = new Set(Object.keys(playedCards));
    const unPlayedCardNumbers = new Set(Object.keys(unPlayedCards));

    // Filter out the numbers in myCards that don't exist in playedCards or unPlayedCards
    const filteredWinnerCards = myCardNumbers.filter(card =>
      !playedCardNumbers.has(card) && !unPlayedCardNumbers.has(card)
    );

    // Update winnerCards with the filtered numbers
    setWinnerCards(filteredWinnerCards);
  };


  const calculateUnPlayedCards = () => {
    const myCardNumbers = Object.values(myCards).flat();
    const remainingCards = [...cards];

    myCardNumbers.forEach((number) => {
      const index = remainingCards.indexOf(number);
      if (index !== -1) {
        remainingCards.splice(index, 1);
      }
    });

    setUnPlayedCards(remainingCards);

    startBtnRef.current.style.display = "none";
    //checkWinnerCards()

  };


  const handleModalSubmit = (counts) => {
    setMyCards(counts);
    setModalOpen(false);
  };

  const addUserCard = (number) => {
    setOtherCards((prevCards) => ({ ...prevCards, [Object.keys(prevCards).length]: number }));

    setMyCards((prevCards) => {
      const updatedCards = { ...prevCards };
      // Find the first key with the value matching cardNumber
      const keyToRemove = Object.keys(updatedCards).find(
        (key) => updatedCards[Number(key)] === number
      );

      // If a matching key is found, delete it from the object
      if (keyToRemove) {
        delete updatedCards[keyToRemove];
      }
      return updatedCards; // Return the updated state
    });

  };

  const playCard = (number) => {
    setOtherCards((prevCards) => ({ ...prevCards, [Object.keys(prevCards).length]: number }));

    setUnPlayedCards((prevCards) => {
      const updatedCards = { ...prevCards };
      // Find the first key with the value matching cardNumber
      const keyToRemove = Object.keys(updatedCards).find(
        (key) => updatedCards[Number(key)] === number
      );

      // If a matching key is found, delete it from the object
      if (keyToRemove) {
        delete updatedCards[keyToRemove];
      }
      return updatedCards; // Return the updated state
    });

    checkWinnerCards()

  };

  const getFilteredNumbers = () => {
    const myCardNumbers = Object.values(myCards);
    const unPlayedCardNumbers = Object.values(unPlayedCards);
    
    // Filter numbers that are in myCards but not in unPlayedCards
    // Then convert to Set and back to array to remove duplicates
    return [...new Set(
      myCardNumbers.filter(number => !unPlayedCardNumbers.includes(number))
    )];
  };

  

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-800 p-4 text-white">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-center gap-2 mb-6">
          <Trophy className="w-8 h-8" />
          <h1 className="text-2xl font-bold">Card Counter</h1>
        </div>

        <button
          ref={startBtnRef}
          onClick={calculateUnPlayedCards}
          className="bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-purple-700 transition duration-300 ease-in-out transform hover:scale-105 mb-4"
        >
          Start
        </button>

        <div className="flex flex-col md:flex-row gap-4">

          {/* Winner Cards Section - Always Visible */}
          <div className="md:w-1/4 bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-xl">
            <div className="text-white font-semibold text-center">Winner Cards</div>
            <div className="mt-4">
            {getFilteredNumbers().map((number, index) => (
        <label
          key={`card-${number}-${index}`}
          className="block bg-white/10 text-white font-bold rounded-lg p-3 mb-2 cursor-pointer hover:bg-indigo-600 transition"
        >
          {number}
        </label>
      ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-xl">
            <div className="flex flex-col sm:flex-row items-center justify-between mb-6">
              <div className="flex items-center gap-2 mb-2 sm:mb-0">
                <Trophy className="w-5 h-5 text-yellow-400" />
                <span className="font-semibold">Your Cards: {Object.keys(myCards).length}</span>
              </div>
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-blue-400" />
                <span className="font-semibold">
                  Played Cards: {Object.keys(playedCards).length}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
              {Object.keys(myCards).map((number) => (
                <label
                  key={number}
                  className="flex items-center justify-center bg-white/10 text-white font-bold rounded-lg p-3 cursor-pointer hover:bg-indigo-600 transition peer-checked:bg-blue-600"
                >
                  <input
                    type="checkbox"
                    className="hidden peer"
                    value={Number(myCards[number])}
                    onChange={(e) => {
                      if (e.target.checked) {
                        addUserCard(Number(myCards[number]));
                      }
                    }}
                  />
                  {Number(myCards[number])}
                </label>
              ))}
            </div>

            <div className="mt-6 text-sm text-gray-300 text-center">
              Tap a card to remove it when played
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-5 gap-4 mt-4">
              {[
                ...new Set(Object.values(unPlayedCards)) // Use Set to get unique values from the object
              ].map((number, index) => (
                <button
                  key={index} // Use index as key since values are now unique
                  onClick={(e) => {
                    playCard(number);
                  }}
                  className="flex items-center justify-center bg-white/10 text-white font-bold rounded-lg p-3 cursor-pointer hover:bg-indigo-600 transition peer-checked:bg-blue-600"
                >
                  {number}
                </button>
              ))}
            </div>


          </div>
        </div>



        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onSubmit={handleModalSubmit}
        />
      </div>
    </div>
  );
}

export default App;