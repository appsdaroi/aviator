import { useState, useEffect, useReducer } from "react";
import { AnimatePresence, motion } from "framer-motion";

const Canvas = ({
  bombs,
  status,
  amount,
  inactiveState,
  baseAmount,
  showCards,
}) => {
  const { playing, setPlaying } = status;
  const { betAmount, setBetAmount } = amount;
  const { inactive, setInactive } = inactiveState;
  const { showResults, setShowResults } = showCards;

  const [grid, setGrid] = useState({
    a: [0, 0, 0, 0, 0],
    b: [0, 0, 0, 0, 0],
    c: [0, 0, 0, 0, 0],
    d: [0, 0, 0, 0, 0],
    e: [0, 0, 0, 0, 0],
  });

  const [clicked, setClicked] = useState({
    a: [false, false, false, false, false],
    b: [false, false, false, false, false],
    c: [false, false, false, false, false],
    d: [false, false, false, false, false],
    e: [false, false, false, false, false],
  });

  const [_, forceUpdate] = useReducer((x) => x + 1, 0);

  const setPlace = (char, index) => {
    const currCharGrid = grid[char];
    const currClicked = clicked[char];

    currClicked[index] = true;
    setClicked({
      ...clicked,
      [char]: currClicked,
    });

    setBetAmount(betAmount * 1.1015);

    if (bombs[char][index] == 1) {
      currCharGrid[index] = 2;
      setPlaying(false);
      setInactive(true);

      setGrid(() => {
        return {
          ...grid,
          [char]: currCharGrid,
        };
      });

      return setShowResults(true);
    }

    currCharGrid[index] = 1;

    return setGrid({
      ...grid,
      [char]: currCharGrid,
    });
  };

  useEffect(() => {
    if (showResults) {
      const openGrid = grid;

      Object.keys(grid).map((char) => {
        grid[char].map((_, index) => {
          if (grid[char][index] == 2) return (openGrid[char][index] = 2);

          return (openGrid[char][index] = 1);
        });
      });

      setGrid(openGrid, forceUpdate());
    }
  }, [showResults]);

  useEffect(() => {
    inactive &&
      setTimeout(() => {
        setInactive(false);

        setGrid({
          a: [0, 0, 0, 0, 0],
          b: [0, 0, 0, 0, 0],
          c: [0, 0, 0, 0, 0],
          d: [0, 0, 0, 0, 0],
          e: [0, 0, 0, 0, 0],
        });

        setBetAmount(baseAmount);

        setClicked({
          a: [false, false, false, false, false],
          b: [false, false, false, false, false],
          c: [false, false, false, false, false],
          d: [false, false, false, false, false],
          e: [false, false, false, false, false],
        });

        setShowResults(false, forceUpdate());
      }, 3000);
  }, [inactive]);

  useEffect(() => {
    console.log(grid);
  }, [grid]);

  return (
    <div className="grid items-center justify-center grid-rows-5 gap-2">
      {Object.keys(grid).map((char) => (
        <div className="grid items-center justify-center grid-cols-5 gap-1.5">
          <AnimatePresence>
            {grid[char].map((_, index) => {
              if (grid[char][index] == 1 && bombs[char][index] == 1)
                return (
                  <motion.button
                    key={`role_${char}${index}`}
                    initial={{ rotateY: 0 }}
                    animate={{ rotateY: 0 }}
                    exit={{ rotateY: -180 }}
                    transition={{
                      ease: "linear",
                      duration: 0.5
                    }}
                    disabled={!playing}
                    onClick={() => setPlace(char, index)}
                    className="relative w-[60px] h-[43px] bg-[linear-gradient(to_bottom,#043560,#0d4173)] border-[3px] border-[#015196] rounded-[6px] shadow-[#093666_0px_3px_0px] after:absolute after:left-1/2 after:-translate-x-1/2 after:top-1/2 after:-translate-y-1/2 after:w-7 after:h-7 after:bg-[url('/icons/icon-bomb.svg')] after:bg-center after:bg-contain"
                  />
                );

              if (grid[char][index] == 1 && clicked[char][index])
                return (
                  <button
                    key={`role_${char}${index}`}
                    disabled={!playing}
                    onClick={() => setPlace(char, index)}
                    className="relative w-[60px] h-[43px] bg-[linear-gradient(to_bottom,#f9b519,#f77811)] border-[3px] border-[#ed9a0f] rounded-[6px] shadow-[#c45c07_0px_3px_0px] after:absolute after:left-1/2 after:-translate-x-1/2 after:top-1/2 after:-translate-y-1/2 after:w-7 after:h-7 after:bg-[url('/icons/icon-star.svg')] after:bg-center after:bg-contain"
                  />
                );

              if (grid[char][index] == 1) {
                console.log(grid[char][index]);
                return (
                  <motion.button
                    initial={{ rotateY: 0 }}
                    animate={{ rotateY: 0 }}
                    exit={{ rotateY: -180 }}
                    transition={{
                      ease: "linear",
                      duration: 0.5
                    }}
                    key={`role_${char}${index}`}
                    disabled={!playing}
                    onClick={() => setPlace(char, index)}
                    className="relative w-[60px] h-[43px] bg-[linear-gradient(to_bottom,#043560,#0d4173)] border-[3px] border-[#015196] rounded-[6px] shadow-[#093666_0px_3px_0px] after:absolute after:left-1/2 after:-translate-x-1/2 after:top-1/2 after:-translate-y-1/2 after:w-7 after:h-7 after:bg-[url('/icons/icon-star.svg')] after:bg-center after:bg-contain"
                  />
                );
              }

              if (grid[char][index] == 0)
                return (
                  <motion.button
                    initial={{ rotateY: 0 }}
                    animate={{ rotateY: 180 }}
                    exit={{ rotateY: -180 }}
                    transition={{
                      ease: "linear",
                      duration: 0.5
                    }}
                    key={`role_${char}${index}`}
                    disabled={!playing}
                    onClick={() => setPlace(char, index)}
                    className="relative w-[60px] h-[43px] bg-[linear-gradient(to_bottom,#051d2f,#103559)] border-[3px] border-[#00457a] rounded-[6px] shadow-[#0a1e38_0px_3px_0px] after:absolute after:left-1/2 after:-translate-x-1/2 after:top-1/2 after:-translate-y-1/2 after:w-4 after:h-4 after:rounded-full after:bg-[linear-gradient(to_bottom,#273f76,#2b669a)]"
                  />
                );

              if (grid[char][index] == 2)
                return (
                  <button
                    key={`role_${char}${index}`}
                    disabled={!playing}
                    onClick={() => setPlace(char, index)}
                    className="relative w-[60px] h-[43px] bg-[linear-gradient(to_bottom,#fe7f7f,#f65a5a)] border-[3px] border-[#fe7f7f] rounded-[6px] shadow-[#a32350_0px_3px_0px] after:absolute after:left-1/2 after:-translate-x-1/2 after:top-1/2 after:-translate-y-1/2 after:w-7 after:h-7 after:bg-[url('/icons/icon-explosion.svg')] after:bg-center after:bg-contain"
                  />
                );
            })}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};

export { Canvas };
