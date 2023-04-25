import { useContext, useState, useEffect } from "react";
import { getSession } from "next-auth/react";

import { Canvas } from "@/modules/canvas";

import { signOut } from "next-auth/react";

import axios from "axios";

export default function Home({ session }) {
  const [bombs, setBombs] = useState({
    a: [0, 0, 0, 0, 0],
    b: [0, 0, 0, 0, 0],
    c: [0, 0, 0, 0, 0],
    d: [0, 0, 0, 0, 0],
    e: [0, 0, 0, 0, 0],
  });

  const [playing, setPlaying] = useState(false);
  const [inactive, setInactive] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const [betAmountOption, setBetAmountOption] = useState(0);
  const betAmountOptions = [
    1, 2, 3, 4, 5, 6, 7, 8, 12, 20, 40, 100, 200, 400, 500,
  ];

  const [betAmount, setBetAmount] = useState(betAmountOptions[betAmountOption]);

  const [balance, setBalance] = useState(session.user.balance);

  const handleGameStatus = () => {
    if (!playing) return getBombPositions();

    setBalance(balance + betAmount * 100);
    setShowResults(true);

    setInactive(true);
    setPlaying(!playing);

    setTimeout(() => {
      setInactive(false);
      setShowResults(false);
    }, 3000);
  };

  const getBombPositions = async () => {
    setBalance(balance - betAmountOptions[betAmountOption] * 100);

    await axios
      .post("https://apimines.appsdaroi.com.br/find-game.php")
      .then((res) => {
        console.log(res);
        setBombs(res.data.game, setPlaying(!playing));
      });
  };

  useEffect(() => {
    console.log(bombs);
  }, [bombs]);

  useEffect(() => {
    setBetAmount(betAmountOptions[betAmountOption]);
  }, [betAmountOption]);

  return (
    <div className="relative top-0 bottom-0 left-0 right-0 w-full h-full">
      <div className="absolute top-0 bottom-0 left-0 right-0 bg-[#131419] p-[5px]">
        <div className="w-full h-full shadow-[inset_1px_1px_#ffffff3b] relative rounded-[12px] bg-[linear-gradient(-57deg,#0048dc_3%,#0781cc_85%)] overflow-hidden">
          <div className="top-auto bottom-0 h-[36px] p-[5px] absolute w-full">
            <div className="flex items-center h-full">
              <div className="bg-[#0267a5] w-full flex items-center pr-[15px] h-full border border-px border-black relative rounded-[20px] shadow-[inset_1px_1px_#fff1cd33] max-w-[122px] after:absolute after:right-[10px] after:top-[8px] after:w-[10px] after:h-[10px] after:bg-[url('/icons/icon-dd-arrow.svg')] after:bg-no-repeat after:bg-center after:bg-contain">
                <span className="flex items-center justify-center w-full text-sm text-white">
                  MINES
                </span>
              </div>

              <div className="w-[22px] h-[22px] ml-[5px] flex items-center rounded-[17px] justify-center text-center bg-[linear-gradient(to_bottom,#f9a119,#f38410)]">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                  _ngcontent-umj-c65=""
                  aria-hidden="true"
                  className="scale-[1.128]"
                >
                  <g fill="#3c0606" fill-rule="nonzero">
                    <path d="M8.667 12a.667.667 0 1 1-1.334 0 .667.667 0 0 1 1.334 0z"></path>
                    <path d="M8 16c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zM8 1C4.14 1 1 4.14 1 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7z"></path>
                    <path d="M8 9.833a.5.5 0 0 1-.5-.5V8.66c0-.635.403-1.203 1.001-1.415.797-.28 1.332-1.129 1.332-1.745A1.835 1.835 0 0 0 8 3.667 1.835 1.835 0 0 0 6.167 5.5a.5.5 0 0 1-1 0A2.837 2.837 0 0 1 8 2.667 2.837 2.837 0 0 1 10.833 5.5c0 1.112-.878 2.293-1.999 2.689a.5.5 0 0 0-.334.472v.672a.5.5 0 0 1-.5.5z"></path>
                  </g>
                </svg>
              </div>

              <div className="relative flex items-center ml-auto mr-2 text-sm text-white">
                {(balance / 100).toFixed(2)}
                <span className="ml-1 text-white/50">BRL</span>
              </div>

              <div className="bg-[#0267a5] flex items-center pr-[15px] basis-[26px] h-[26px] border border-px border-black relative rounded-[20px] shadow-[inset_1px_1px_#fff1cd33] bg-[url('/icons/icon-burguer-menu.svg')] bg-center bg-no-repeat"></div>
            </div>
          </div>

          <div className="h-full pb-[179px]">
            <div className="flex flex-col justify-between h-full">
              <div className="flex flex-col justify-between items-center mt-[2px] p-[0_2px]">
                <div
                  onClick={signOut}
                  className="h-[26px] flex justify-between items-center bg-[#15171969] w-full rounded-[12px]"
                >
                  <div className="bg-[#0267a5] w-[140px] flex items-center pr-[15px] h-full border border-px border-black relative rounded-[20px] shadow-[inset_1px_1px_#fff1cd33] after:absolute after:right-[5px] after:top-[8px] after:w-[10px] after:h-[10px] after:bg-[url('/icons/icon-dd-arrow.svg')] after:bg-no-repeat after:bg-center after:bg-contain">
                    <span className="flex items-center justify-center w-full text-xs text-white">
                      Mines: 3
                    </span>
                  </div>

                  <div className="bg-[#ffc107] flex items-center justify-center h-full border border-px border-black relative rounded-[20px] shadow-[inset_1px_1px_#fff1cd33] gap-1.5 px-4">
                    <span className="flex items-center justify-center text-xs text-black">
                      Next:
                    </span>
                    <span className="flex items-center justify-center text-sm text-black">
                      {betAmount.toFixed(2)} BRL
                    </span>
                  </div>
                </div>
              </div>

              <div className="w-[90%] py-0 px-[5px] aspect-square h-auto mx-auto flex items-center justify-center">
                <Canvas
                  bombs={bombs}
                  status={{ playing, setPlaying }}
                  amount={{ betAmount, setBetAmount }}
                  baseAmount={betAmountOptions[betAmountOption]}
                  inactiveState={{ inactive, setInactive }}
                  userBalance={{ balance, setBalance }}
                  showCards={{ showResults, setShowResults }}
                />
              </div>

              <div className="flex justify-center mb-[10px] w-full px-[5px] py-[2px] gap-1">
                <button
                  disabled={!playing}
                  className="bg-[#0267a5] flex items-center h-full border border-px border-black relative rounded-[20px] shadow-[inset_1px_1px_#fff1cd33] w-1/2"
                >
                  <span className="flex items-center justify-center w-full text-sm text-white">
                    RANDOM
                  </span>
                </button>

                <div className="bg-black/30 rounded-full h-[26px] text-white text-sm flex items-center justify-center w-1/2 relative pl-[2.25rem]">
                  <svg
                    width="22"
                    height="18"
                    viewBox="0 0 22 18"
                    xmlns="http://www.w3.org/2000/svg"
                    _ngcontent-umj-c81=""
                    aria-hidden="true"
                    className="absolute left-[4px] top-1/2 -translate-y-1/2"
                  >
                    <g fill="#FFF" fill-rule="nonzero" _ngcontent-umj-c81="">
                      <path
                        d="M6.321 10.271a.524.524 0 0 0-.395-.868H4.58a6.09 6.09 0 0 1 6.07-6.486c1.612 0 3.08.63 4.169 1.657l1.898-2.221A8.935 8.935 0 0 0 10.65 0a8.941 8.941 0 0 0-6.364 2.636 8.941 8.941 0 0 0-2.627 6.767H.525c-.45 0-.69.53-.395.868l2.558 2.934.538.617 1.929-2.213L6.32 10.27zM21.17 8.559 19.26 6.37l-1.187-1.362-1.696 1.945-1.4 1.606a.524.524 0 0 0 .395.868h1.345a6.091 6.091 0 0 1-6.068 5.656 6.053 6.053 0 0 1-3.724-1.276l-1.898 2.221A8.931 8.931 0 0 0 10.65 18a8.941 8.941 0 0 0 6.364-2.636 8.935 8.935 0 0 0 2.626-5.937h1.135c.45 0 .69-.53.394-.868z"
                        _ngcontent-umj-c81=""
                      ></path>
                    </g>
                  </svg>

                  <button
                    disabled={playing}
                    className="relative inline-block text-xs before:bg-[#ffffff42] before:top-1/2 before:-translate-y-1/2 before:left-[-2.25rem] before:w-[1.75rem] before:h-[16px] before:rounded-full before:absolute after:absolute after:top-1/2 after:-translate-y-1/2 after:left-[calc(-2.25rem+2px)] after:w-[calc(1rem-4px)] after:h-[calc(1rem-4px)] after:rounded-full after:bg-white"
                  >
                    Auto game
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="h-[145px] bottom-[34px] pb-0 p-[0_2px_2px] absolute w-full">
            <div className="flex flex-col-reverse items-center justify-center bg-black/30 rounded-[12px] h-full gap-4">
              <div
                className={`bg-[#0267a5] shadow-[inset_1px_1px_#fff1cd33] min-w-[300px] max-w-[300px] h-[50px] rounded-full border border-black/50 flex items-center ${
                  playing && "opacity-50 pointer-events-none"
                }`}
              >
                <div className="ml-[14px] flex flex-col justify-center items-center h-[40px] w-[150px] text-sm text-white">
                  <span className="leading-none">Bet, BRL</span>
                  <span className="w-[142px] h-[22px] rounded-[11px] border border-black/60 bg-[#0000004d]">
                    <span className="flex justify-center items-center font-semibold text-[16px] leading-none mt-[1.5px]">
                      {betAmountOptions[betAmountOption].toFixed(2)}
                    </span>
                  </span>
                </div>

                <div className="flex items-center justify-center w-full gap-1">
                  <button
                    onClick={() =>
                      betAmountOption > 0 &&
                      setBetAmountOption(betAmountOption - 1)
                    }
                    className="w-[36px] h-[32px] relative text-sm bg-[#0267a5] shadow-[inset_1px_1px_#fff1cd33] border border-black/50 rounded-full after:absolute after:right-0 after:top-0 after:w-full after:h-full after:bg-[url('/icons/icon-minus.svg')] after:bg-no-repeat after:bg-center"
                  />
                  <div className="w-[38px] h-[36px] relative text-sm bg-[#0267a5] shadow-[inset_1px_1px_#fff1cd33] border border-black/50 rounded-full after:absolute after:right-0 after:top-0 after:w-full after:h-full after:bg-[url('/icons/icon-coin.svg')] after:bg-no-repeat after:bg-center" />
                  <button
                    onClick={() =>
                      betAmountOption + 1 < betAmountOptions.length &&
                      setBetAmountOption(betAmountOption + 1)
                    }
                    className="w-[36px] h-[32px] relative text-sm bg-[#0267a5] shadow-[inset_1px_1px_#fff1cd33] border border-black/50 rounded-full after:absolute after:right-0 after:top-0 after:w-full after:h-full after:bg-[url('/icons/icon-plus.svg')] after:bg-no-repeat after:bg-center"
                  />
                </div>
              </div>

              <div className="w-[310px] flex gap-2">
                <button
                  disabled={!playing}
                  className="bg-[radial-gradient(circle_at_50%_50%,#0576dc,#025cd5_68%)] min-w-[50px] max-w-[50px] h-[50px] rounded-full border-2 border-black/90 shadow-[3px_3px_6px_#020b1a80,inset_-1px_-1px_#00000052,inset_1px_1px_#fff1cd33]"
                >
                  <i className="block w-full h-full bg-[url('/icons/icon-auto-play.svg')] bg-center bg-no-repeat" />
                </button>

                {playing ? (
                  <button
                    onClick={handleGameStatus}
                    className=" flex flex-col items-center justify-center bg-[radial-gradient(circle_at_50%_50%,#ee3f00,#b32b00_94%)] w-full h-[50px] rounded-[20px] border-2 border-black/90 shadow-[3px_3px_6px_#020b1a80,inset_-1px_-1px_#00000052,inset_1px_1px_#fff1cd33] text-center relative text-white text-sm"
                  >
                    CASH OUT
                    <span className="min-w-[48px] h-[15px] bg-black/40 rounded-[4px] flex items-center justify-center px-[8px] text-xs mx-auto">
                      {betAmount.toFixed(2)} BRL
                    </span>
                  </button>
                ) : (
                  <button
                    disabled={inactive}
                    onClick={handleGameStatus}
                    className="bg-[radial-gradient(circle_at_50%_50%,#61a503,#2d7500_94%)] w-full h-[50px] rounded-[20px] border-2 border-black/90 shadow-[3px_3px_6px_#020b1a80,inset_-1px_-1px_#00000052,inset_1px_1px_#fff1cd33] text-center relative text-white text-sm"
                  >
                    <i className="absolute left-[14px] top-1/2 -translate-y-1/2 w-[19px] h-[23px] bg-[url('/icons/icon-play.svg')] bg-center bg-no-repeat" />
                    BET
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { req } = context;
  const session = await getSession({ req });

  if (!session)
    return {
      redirect: { destination: "/auth/signin" },
    };

  return {
    props: {
      session: session,
    },
  };
}
