import { useState } from "react";

const Canvas = () => {
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

  const [bombs, setBombs] = useState({
    a: [1, 1, 0, 0, 0],
    b: [0, 0, 0, 0, 0],
    c: [0, 0, 0, 1, 0],
    d: [0, 0, 0, 0, 0],
    e: [0, 0, 0, 0, 0],
  });

  const setPlace = (char, index) => {
    const currCharGrid = grid[char];
    const currClicked = clicked[char];

    currClicked[index] = true;

    setClicked({
      ...clicked,
      [char]: currCharGrid
    })

    if (bombs[char][index] == 1) {
      currCharGrid[index] = 2;

      return setGrid({
        ...grid,
        [char]: currCharGrid,
      });
    }

    currCharGrid[index] = 1;

    return setGrid({
      ...grid,
      [char]: currCharGrid,
    });
  };

  return (
    <div className="grid items-center justify-center grid-rows-5 gap-2">
      {Object.keys(grid).map((char) => (
        <div className="grid items-center justify-center grid-cols-5 gap-1.5">
          {grid[char].map((status, index) => {
            //   console.log(grid[char][index])

            if (grid[char][index] == 0)
              return (
                <button
                  onClick={() => setPlace(char, index)}
                  className="relative w-[60px] h-[43px] bg-[linear-gradient(to_bottom,#043560,#0d4173)] border-[3px] border-[#015196] rounded-[6px] shadow-[#093666_0px_3px_0px] after:absolute after:left-1/2 after:-translate-x-1/2 after:top-1/2 after:-translate-y-1/2 after:w-4 after:h-4 after:rounded-full after:bg-[linear-gradient(to_bottom,#1f5097,#2069ab)]"
                />
              );

            if (grid[char][index] == 1 && clicked[char][index])
              return (
                <button
                  onClick={() => setPlace(char, index)}
                  className="relative w-[60px] h-[43px] bg-[linear-gradient(to_bottom,#f9b519,#f77811)] border-[3px] border-[#ed9a0f] rounded-[6px] shadow-[#c45c07_0px_3px_0px] after:absolute after:left-1/2 after:-translate-x-1/2 after:top-1/2 after:-translate-y-1/2 after:w-7 after:h-7 after:bg-[url('/icons/icon-star.svg')] after:bg-center after:bg-contain"
                />
              );

            if (grid[char][index] == 1)
              return (
                <button
                  onClick={() => setPlace(char, index)}
                  className="relative w-[60px] h-[43px] bg-[linear-gradient(to_bottom,#043560,#0d4173)] border-[3px] border-[#015196] rounded-[6px] shadow-[#093666_0px_3px_0px] after:absolute after:left-1/2 after:-translate-x-1/2 after:top-1/2 after:-translate-y-1/2 after:w-7 after:h-7 after:bg-[url('/icons/icon-star.svg')] after:bg-center after:bg-contain"
                />
              );

            if (grid[char][index] == 2)
              return (
                <button
                  onClick={() => setPlace(char, index)}
                  className="relative w-[60px] h-[43px] bg-[linear-gradient(to_bottom,#fe7f7f,#f65a5a)] border-[3px] border-[#fe7f7f] rounded-[6px] shadow-[#a32350_0px_3px_0px] after:absolute after:left-1/2 after:-translate-x-1/2 after:top-1/2 after:-translate-y-1/2 after:w-7 after:h-7 after:bg-[url('/icons/icon-explosion.svg')] after:bg-center after:bg-contain"
                />
              );
          })}
        </div>
      ))}
    </div>
  );
};

export { Canvas };
