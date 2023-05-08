import { useState, useEffect, useRef } from "react";
import { getSession } from "next-auth/react";

import ProgressBar from "@/modules/progressBar";
import { CanvasDots, CanvasPlane } from "@/modules/canvas";
import { signOut } from "next-auth/react";

import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";

import { randomBetweenRange } from "../helpers/random";
import { faker } from "@faker-js/faker";

const avatars = require("give-me-an-avatar");

export default function Home({ session }) {
  const [progress, setProgress] = useState(100);
  const [playing, setPlaying] = useState(false);
  const [crashed, setCrashed] = useState(false);
  const [crashAt, setCrashAt] = useState(0);
  const [multiplier, setMultiplier] = useState(1.0);
  const [animationType, setAnimationType] = useState("");
  const [history, setHistory] = useState([]);

  const [isBetting, setIsBetting] = useState({
    first: false,
    second: false,
  });

  const [bet1, setBet1] = useState(0.0);
  const [bet2, setBet2] = useState(0.0);

  const [input1, setInput1] = useState(1.0);
  const [input2, setInput2] = useState(1.0);

  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);

  const [bets, setBets] = useState([]);

  const areaRef = useRef(null);

  const getCrashAt = async () => {
    await axios
      .get("https://apiaviator.appsdaroi.com.br/api/result", {
        headers: { Authorization: `Bearer ${session.user.token}` },
      })
      .then((res) => {
        setCrashAt(res.data.result);
      });
  };

  useEffect(() => {
    if (!playing) {
      const progressInterval = setInterval(() => {
        setProgress((progress) => {
          if (progress === randomBetweenRange(4, 13)) {
            let generateBets = [];

            for (let i = 0; i < randomBetweenRange(2,7); i++) {
              const username = faker.internet.userName();

              generateBets.push({
                username: `${username.slice(-1)}***${username.slice(0, 1)}`,
                avatar: avatars.giveMeAnAvatar(),
                bet: randomBetweenRange(50, 500)
              });
            }

            setBets((bets) => [...bets, ...generateBets]);

          }

          if (progress === randomBetweenRange(15, 27)) {
            let generateBets = [];

            for (let i = 0; i < randomBetweenRange(2,7); i++) {
              const username = faker.internet.userName();

              generateBets.push({
                username: `${username.slice(-1)}***${username.slice(0, 1)}`,
                avatar: faker.internet.avatar(),
                bet: randomBetweenRange(50, 500)
              });
            }

            setBets((bets) => [...bets, ...generateBets]);

          }

          if (progress === randomBetweenRange(34, 46)) {
            let generateBets = [];

            for (let i = 0; i < randomBetweenRange(2,7); i++) {
              const username = faker.internet.userName();

              generateBets.push({
                username: `${username.slice(-1)}***${username.slice(0, 1)}`,
                avatar: faker.internet.avatar(),
                bet: randomBetweenRange(50, 500)
              });
            }

            setBets((bets) => [...bets, ...generateBets]);

          }

          if (progress === randomBetweenRange(57, 64)) {
            let generateBets = [];

            for (let i = 0; i < randomBetweenRange(2,7); i++) {
              const username = faker.internet.userName();

              generateBets.push({
                username: `${username.slice(-1)}***${username.slice(0, 1)}`,
                avatar: faker.internet.avatar(),
                bet: randomBetweenRange(50, 500)
              });
            }

            setBets((bets) => [...bets, ...generateBets]);

          }

          if (progress === randomBetweenRange(82, 96)) {
            let generateBets = [];

            for (let i = 0; i < randomBetweenRange(11, 26); i++) {
              const username = faker.internet.userName();

              generateBets.push({
                username: `${username.slice(-1)}***${username.slice(0, 1)}`,
                avatar: faker.internet.avatar(),
                bet: randomBetweenRange(50, 500)
              });
            }

            setBets((bets) => [...bets, ...generateBets]);
          }

          if (progress < 1) {
            setPlaying(true);
            clearInterval(progressInterval);

            return 100;
          }

          return progress - 1;
        });
      }, 45);
    }

    if (playing) {
      setCrashed(false);
      setAnimationType("start");

      if (!(isBetting.first || isBetting.second)) {
        const int = randomBetweenRange(2, 9);
        const minor = randomBetweenRange(1, 98);

        setCrashAt(parseFloat(`${int}.${minor}`));
        console.log(parseFloat(`${int}.${minor}`));
      }

      const multiplierInterval = setInterval(() => {
        setMultiplier((multiplier) => {
          if (multiplier >= crashAt) {
            setCrashed(true);
            clearInterval(multiplierInterval);

            return 1.0;
          }

          return multiplier + 0.01;
        });
      }, 70);
    }
  }, [playing]);

  useEffect(() => {
    if (crashed) {
      setBets([]);

      setHistory([...history, crashAt]);
      setAnimationType("crashed");

      setIsBetting({
        first: false,
        second: false,
      });

      setTimeout(() => {
        setPlaying(false);
      }, 5000);
    }
  }, [crashed]);

  useEffect(() => {
    console.log(progress);
  }, [progress]);

  useEffect(() => {
    if ((isBetting.first || isBetting.second) && !playing) {
      getCrashAt();
    }
  }, [isBetting]);

  useEffect(() => {
    setHeight(areaRef.current.clientHeight);
    setWidth(areaRef.current.clientWidth);

    if (multiplier > 2.0) setAnimationType("float");
  }, [multiplier]);

  useEffect(() => {
    if (!(isBetting.first || isBetting.second)) {
      const int = randomBetweenRange(2, 9);
      const minor = randomBetweenRange(1, 98);

      setCrashAt(parseFloat(`${int}.${minor}`));
      console.log(parseFloat(`${int}.${minor}`));
    }

    let generatedHistory = [];

    for (let i = 0; i < 10; i++) {
      const int = randomBetweenRange(2, 9);
      const minor = randomBetweenRange(1, 98);

      generatedHistory.push(parseFloat(`${int}.${minor}`));
    }

    setHistory(generatedHistory);
  }, []);

  return (
    <div className="w-full h-auto relative pt-[38px] bg-[#0e0e0e]">
      <div className="h-[38px] fixed w-full top-0 left-0 z-[840]">
        <div className="h-full w-inherit bg-[#1b1c1d] flex items-center justify-between">
          <div className="w-[72px] h-full bg-contain bg-center bg-no-repeat ml-[5px] bg-[url('/aviator-logo.svg')]" />
          <div className="h-[26px] flex gap-[5px]">
            <div className="text-[#5f3816] bg-[#e69308] border border-[#ffbd71] rounded-full px-[5px]">
              <div className="w-[16px] h-[16px] bg-[url('/icons/icon-question.svg')] align-middle inline-block" />
            </div>

            <div className="flex h-full">
              <span className="px-2.5 flex justify-center items-center">
                <div className="flex items-end justify-center gap-1">
                  <span className="text-[#28a909] font-bold leading-none">
                    {(session.user.balance / 100).toFixed(2)}
                  </span>
                  <span className="text-[#9b9c9e] text-xs leading-none">
                    BRL
                  </span>
                </div>
              </span>

              <div className="border-l border-[#464648] h-full">
                <div className="px-2.5 h-full w-full flex items-center relative">
                  <div className="w-[18px] h-[18px] bg-contain bg-center bg-no-repeat bg-[url('/icons/icon-burguer-menu.svg')]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-full">
        <div className="flex w-full flex-col-reverse px-[5px] h-auto">
          <div className="w-full flex flex-col flex-grow-0 flex-shrink-0 h-[80vh] pt-[20px]">
            <div className="flex flex-col w-full h-full bg-[#1b1c1d] rounded-[10px_10px_0_0]">
              <div className="min-h-[24px] max-h-[24px] my-[5px] flex- justify-center items-center w-fit mx-auto">
                <div className="h-full bg-[#141516] rounded-[10px] relative flex  border border-[#141516]">
                  <div className="w-[100px] text-white bg-[rgb(44,45,48)] border border-[#141516] rounded-full text-center text-xs h-full flex justify-center items-center">
                    All Bets
                  </div>
                  <div className="w-[100px] text-white rounded-full text-center text-xs h-full flex justify-center items-center">
                    My Bets
                  </div>
                  <div className="w-[100px] text-white rounded-full text-center text-xs h-full flex justify-center items-center">
                    Top
                  </div>
                </div>
              </div>

              <div className="flex flex-col h-full min-h-[0]">
                <div className="flex flex-col">
                  <div className="text-sm leading-[1.2] px-[10px] pb-[5px] flex justify-between items-center">
                    <div className="text-white">
                      <div>ALL BETS</div>
                      <div>{bets.length * 17}</div>
                    </div>

                    <div className="relative text-xs text-[#9ea0a3] flex justify-center items-center h-[20px] p-[0_8px_0_3px] rounded-full border gap-[5px] border-[#414148] bg-[#252528] cursor-pointer">
                      <div className="w-[17px] h-[16px] bg-[url('/icons/icon-history.svg')] bg-contain bg-center bg-no-repeat" />
                      <span>Previous hand</span>
                    </div>
                  </div>

                  <hr className="border-t-2 border-[#141516]" />

                  <div className="text-[11px] text-[#7b7b7b] h-[20px] mx-[10px] flex justify-center items-center">
                    <span className="w-[19%]">User</span>
                    <span className="w-[35%] pr-[10px] text-right whitespace-nowrap">
                      Bet, BRL
                    </span>
                    <span>X</span>
                    <span className="flex-1 text-right whitespace-nowrap">
                      Cash out, BRL
                    </span>
                  </div>
                </div>

                <div className="ml-[5px] h-full relative">
                  <div className="absolute top-0 left-0 min-w-full">
                    {Object.keys(bets).map((bet, i) => (
                      <div className="flex items-center justify-center h-[34px] mt-[2px] rounded-[8px] bg-[#101112] border border-[#101112] text-sm text-[#bbbfc5]">
                        <div className="w-[15%] flex items-center justify-center gap-[5px]">
                          <img
                            src={bets[bet].avatar}
                            alt=""
                            className="w-[30px] h-[30px] ml-[2px] rounded-full"
                          />
                          <div className="text-[13px] text-[#9ea0a3]">
                            {bets[bet].username}
                          </div>
                        </div>

                        <div className="min-w-[35%] pr-[10px] flex justify-end">
                        {bets[bet].bet.toFixed(2)}
                        </div>

                        <div
                          className={`py-[2px] px-[11px] rounded-full font-bold bg-black text-[rgb(145,62,248)]`}
                        >
                          2.46x
                        </div>

                        <div className="flex-1 pr-[5px] text-right">174.00</div>
                      </div>
                    ))}

                    <div className="flex items-center justify-center h-[34px] mt-[2px] rounded-[8px] bg-[#123405] border border-[#427f00] text-sm text-white">
                      <div className="w-[15%] flex items-center justify-center gap-[5px]">
                        <img
                          src=""
                          alt=""
                          className="w-[30px] h-[30px] ml-[2px]"
                        />
                        <div className="text-[13px] text-[#9ea0a3]"></div>
                      </div>

                      <div className="min-w-[35%] pr-[10px] flex justify-end">
                        100.00
                      </div>

                      <div
                        className={`py-[2px] px-[11px] rounded-full font-bold bg-black text-[rgb(145,62,248)]`}
                      >
                        2.46x
                      </div>

                      <div className="flex-1 pr-[5px] text-right">174.00</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between w-full h-full overflow-y-hidden">
            <div className="min-h-[22px] max-h-[22px] flex justify-center items-centerm my-2.5">
              <div className="h-[22px] w-full flex items-center relative px-[5px] text-xs">
                <div className="flex items-center w-full h-full overflow-hidden">
                  <div className="flex gap-[4px]">
                    {history
                      .slice(0)
                      .reverse()
                      .map((registry, i) => (
                        <div
                          className={`py-[2px] px-[11px] rounded-full font-bold bg-black ${
                            Math.floor(registry) > 4
                              ? "text-[rgb(145,62,248)]"
                              : "text-[rgb(52,180,255)]"
                          }`}
                        >
                          {registry}x
                        </div>
                      ))}
                    <div className="py-[2px] px-[11px] rounded-full font-bold bg-black ">
                      7.76x
                    </div>
                  </div>
                </div>

                <div className="w-[52px] h-full">
                  <div className="ml-[6px] relative flex justify-center items-center w-[46px] h-[22px] rounded-full border gap-[5px] border-[#414148] bg-[#252528] cursor-pointer">
                    <div className="w-[14px] h-[13px] bg-[url('/icons/icon-history.svg')] bg-contain bg-center bg-no-repeat" />
                    <div className="w-[10px] bg-contain bg-center bg-no-repeat h-[10px] bg-[url('/icons/icon-dd.svg')]" />
                  </div>
                </div>
              </div>
            </div>

            <div
              ref={areaRef}
              className="relative h-[calc(40vh-38px)] min-h-[200px]"
            >
              <div className="w-full h-full absolute rounded-[20px] border border-[rgb(42,43,46)] overflow-hidden">
                <div className="flex flex-col items-center justify-center h-full gap-2 z-[2] relative">
                  {playing ? (
                    <>
                      {crashed ? (
                        <>
                          <span className="absolute mb-24 text-xl leading-none text-white z-[999]">
                            FLEW AWAY!
                          </span>
                          <span className="font-bold text-red-700 text-7xl z-[999]">
                            {crashAt.toFixed(2)}x
                          </span>
                        </>
                      ) : (
                        <>
                          <span className="font-bold text-white text-7xl z-[999]">
                            {multiplier.toFixed(2)}x
                          </span>

                          {height !== 0 && width !== 0 && (
                            <CanvasDots
                              height={height}
                              width={width}
                              className="absolute top-0 left-0 bottom-0 right-0 z-[1]"
                              animate={multiplier > 2.0}
                            />
                          )}
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      <img
                        className="w-[90px] h-[90px] animate-spin-slow mb-1"
                        src="/icons/prop.svg"
                      />
                      <div className="mb-1 text-2xl text-white">
                        WAITING FOR NEXT ROUND
                      </div>
                      <ProgressBar bgcolor="#e50539" completed={progress} />
                    </>
                  )}

                  {height !== 0 && width !== 0 && (
                    <CanvasPlane
                      height={height}
                      width={width}
                      className="absolute top-0 left-0 bottom-0 right-0 z-[1]"
                      animate={multiplier > 2.0}
                      animation={{ animationType, setAnimationType }}
                    />
                  )}

                  <svg
                    width="438px"
                    height="334px"
                    viewBox="0 0 438 334"
                    className={`absolute top-0 bottom-0 left-0 right-0 z-[1] scale-90 transition-opacity ${
                      playing && !crashed ? "opacity-70" : "opacity-0"
                    }`}
                  >
                    <defs>
                      <filter
                        x="-70.1%"
                        y="-166.7%"
                        width="240.2%"
                        height="433.3%"
                        filterUnits="objectBoundingBox"
                        id="filter-1"
                      >
                        <feGaussianBlur stdDeviation="50" in="SourceGraphic" />
                      </filter>
                    </defs>
                    <g
                      id="Ideas"
                      stroke="none"
                      stroke-width="1"
                      fill="none"
                      fill-rule="evenodd"
                    >
                      <g
                        id="idea---Bg-color-anim"
                        transform="translate(-90.000000, -1190.000000)"
                        className="transition-all"
                        fill={
                          multiplier > 2.0
                            ? "rgb(145, 62, 248)"
                            : "rgb(52, 180, 255)"
                        }
                      >
                        <ellipse
                          id="blur-low"
                          filter="url(#filter-1)"
                          cx="309"
                          cy="1357"
                          rx="107"
                          ry="45"
                        />
                      </g>
                    </g>
                  </svg>
                </div>

                <div
                  style={{
                    animationPlayState:
                      playing && !crashed ? "running" : "paused",
                  }}
                  className="absolute w-[calc(100%*3)] h-[calc(100%*3)] z-[0] top-[-50%] right-[-50%] bg-[url('/icons/bg-sun.svg')] bg-cover bg-center animate-spin-slower"
                />
              </div>
            </div>

            <div className="flex justify-center shrink-0 pt-[5px] gap-[5px] flex-wrap">
              <div className="h-auto min-h-[150px] w-full max-w-[750px] min-w-[310px] rounded-[20px]">
                <div className="flex relative w-full flex-col justify-center rounded-[10px] bg-[#1b1c1d] h-full m-[0_auto] border border-[transparent]">
                  <div className="h-[24px] text-xs mb-auto mt-2.5">
                    <div className="h-full bg-[#141516] rounded-[10px] border border-[#141516] relative flex justify-center items-center w-max mx-auto">
                      <div className="relative w-[100px] h-full text-center rounded-[10px] text-white leading-[22px] bg-[rgb(44,45,48)]">
                        Bet
                      </div>

                      <div className="relative w-[100px] h-full text-center text-[#9ea0a3] leading-[22px]">
                        Auto
                      </div>
                    </div>
                  </div>

                  <div className="w-[calc(100%-20px)] max-w-[390px] flex flex-wrap justify-center mt-0 mb-auto mx-auto">
                    <div className="flex flex-col justify-center items-center text-center w-[140px]">
                      <div className="h-[34px] text-lg">
                        <div className="h-full flex justify-between items-center rounded-full bg-[#000000b3] font-bold px-2.5">
                          <div className="inline-flex items-center">
                            <button className="bg-transparent bg-[url('/icons/icon-minus.svg')] w-[18px] h-[18px] min-w-[18px] max-w-[18px] text-[#000000b3] text-center leading-[16px] font-bold" />

                            <div className="flex items-center w-[calc('100%-35px')] h-full">
                              <input
                                type="text"
                                className="w-full font-bold text-center text-white bg-transparent"
                                value={input1}
                                onChange={(evt) =>
                                  setInput1(parseInt(evt.target.value) || 0)
                                }
                              />
                            </div>

                            <button className="bg-transparent bg-[url('/icons/icon-plus.svg')] w-[18px] h-[18px] min-w-[18px] max-w-[18px] text-[#000000b3] text-center leading-[16px] font-bold" />
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-center flex-wrap text-sm text-[#9ea0a3] w-full">
                        <button className="w-[64px] h-[18px] mt-[4px] leading-none p-0 bg-[#141516] rounded-full">
                          <span className="text-[#ffffff80]">1</span>
                        </button>
                        <button className="w-[64px] h-[18px] mt-[4px] leading-none p-0 bg-[#141516] rounded-full">
                          <span className="text-[#ffffff80]">2</span>
                        </button>
                        <button className="w-[64px] h-[18px] mt-[4px] leading-none p-0 bg-[#141516] rounded-full">
                          <span className="text-[#ffffff80]">5</span>
                        </button>
                        <button className="w-[64px] h-[18px] mt-[4px] leading-none p-0 bg-[#141516] rounded-full">
                          <span className="text-[#ffffff80]">10</span>
                        </button>
                      </div>
                    </div>

                    <div className="w-[calc(100%-145px)] ml-[5px] flex justify-center items-center flex-col">
                      {isBetting.first ? (
                        <>
                          {playing && !crashed ? (
                            <button
                              onClick={() =>
                                setIsBetting({
                                  ...isBetting,
                                  first: false,
                                })
                              }
                              className="w-full h-full rounded-[20px] text-xl border border-[#ffbd71] bg-[#d07206] shadow-[inset_0_1px_1px_#ffffff80] text-white text-center"
                            >
                              <span className="flex flex-col items-center justify-center">
                                <label className="leading-none uppercase">
                                  Cash Out
                                </label>
                                <label className="mt-[2px]">
                                  <span className="text-2xl leading-none">
                                    {(bet1 * multiplier).toFixed(2)}
                                  </span>
                                  <span className="text-lg leading-none">
                                    &nbsp;BRL
                                  </span>
                                </label>
                              </span>
                            </button>
                          ) : (
                            <>
                              <span className="text-white/70">
                                Waiting for next round
                              </span>
                              <button
                                onClick={() =>
                                  setIsBetting({
                                    ...isBetting,
                                    first: false,
                                  })
                                }
                                className="w-full h-full rounded-[20px] text-xl border border-[#ff7171] bg-[#cb011a] shadow-[inset_0_1px_1px_#ffffff80] text-white text-center"
                              >
                                <span className="flex flex-col items-center justify-center">
                                  <label className="leading-none uppercase">
                                    Cancel
                                  </label>
                                </span>
                              </button>
                            </>
                          )}
                        </>
                      ) : (
                        <button
                          onClick={() => {
                            setIsBetting({
                              ...isBetting,
                              first: true,
                            });

                            setBet1(input1);
                          }}
                          className="w-full h-full rounded-[20px] text-xl border border-[#b2f2a3] bg-[#28a909] shadow-[inset_0_1px_1px_#ffffff80] text-white text-center"
                        >
                          <span className="flex flex-col items-center justify-center">
                            <label className="leading-none uppercase">
                              Bet
                            </label>
                            <label className="mt-[2px]">
                              <span className="text-2xl leading-none">
                                {input1.toFixed(2)}
                              </span>
                              <span className="text-lg leading-none">
                                &nbsp;BRL
                              </span>
                            </label>
                          </span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="h-auto min-h-[150px] w-full max-w-[750px] min-w-[310px] rounded-[20px]">
                <div className="flex relative w-full flex-col justify-center rounded-[10px] bg-[#1b1c1d] h-full m-[0_auto] border border-[transparent]">
                  <div className="h-[24px] text-xs mb-auto mt-2.5">
                    <div className="h-full bg-[#141516] rounded-[10px] border border-[#141516] relative flex justify-center items-center w-max mx-auto">
                      <div className="relative w-[100px] h-full text-center rounded-[10px] text-white leading-[22px] bg-[rgb(44,45,48)]">
                        Bet
                      </div>

                      <div className="relative w-[100px] h-full text-center text-[#9ea0a3] leading-[22px]">
                        Auto
                      </div>
                    </div>
                  </div>

                  <div className="w-[calc(100%-20px)] max-w-[390px] flex justify-center mt-0 mb-auto mx-auto">
                    <div className="flex flex-col justify-center items-center text-center w-[140px]">
                      <div className="h-[34px] text-lg">
                        <div className="h-full flex justify-between items-center rounded-full bg-[#000000b3] font-bold px-2.5">
                          <div className="inline-flex items-center">
                            <button className="bg-transparent bg-[url('/icons/icon-minus.svg')] w-[18px] h-[18px] min-w-[18px] max-w-[18px] text-[#000000b3] text-center leading-[16px] font-bold" />

                            <div className="flex items-center w-[calc('100%-35px')] h-full">
                              <input
                                type="text"
                                className="w-full font-bold text-center text-white bg-transparent"
                                value={input2}
                                onChange={(evt) =>
                                  setInput2(parseInt(evt.target.value) || 0)
                                }
                              />
                            </div>

                            <button className="bg-transparent bg-[url('/icons/icon-plus.svg')] w-[18px] h-[18px] min-w-[18px] max-w-[18px] text-[#000000b3] text-center leading-[16px] font-bold" />
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-center flex-wrap text-sm text-[#9ea0a3] w-full">
                        <button className="w-[64px] h-[18px] mt-[4px] leading-none p-0 bg-[#141516] rounded-full">
                          <span className="text-[#ffffff80]">1</span>
                        </button>
                        <button className="w-[64px] h-[18px] mt-[4px] leading-none p-0 bg-[#141516] rounded-full">
                          <span className="text-[#ffffff80]">2</span>
                        </button>
                        <button className="w-[64px] h-[18px] mt-[4px] leading-none p-0 bg-[#141516] rounded-full">
                          <span className="text-[#ffffff80]">5</span>
                        </button>
                        <button className="w-[64px] h-[18px] mt-[4px] leading-none p-0 bg-[#141516] rounded-full">
                          <span className="text-[#ffffff80]">10</span>
                        </button>
                      </div>
                    </div>

                    <div className="w-[calc(100%-145px)] ml-[5px] flex justify-center items-center flex-col">
                      {isBetting.second ? (
                        <>
                          {playing && !crashed ? (
                            <button
                              onClick={() =>
                                setIsBetting({
                                  ...isBetting,
                                  second: false,
                                })
                              }
                              className="w-full h-full rounded-[20px] text-xl border border-[#ffbd71] bg-[#d07206] shadow-[inset_0_1px_1px_#ffffff80] text-white text-center"
                            >
                              <span className="flex flex-col items-center justify-center">
                                <label className="leading-none uppercase">
                                  Cash Out
                                </label>
                                <label className="mt-[2px]">
                                  <span className="text-2xl leading-none">
                                    {(bet2 * multiplier).toFixed(2)}
                                  </span>
                                  <span className="text-lg leading-none">
                                    &nbsp;BRL
                                  </span>
                                </label>
                              </span>
                            </button>
                          ) : (
                            <>
                              <span className="text-white/70">
                                Waiting for next round
                              </span>
                              <button
                                onClick={() =>
                                  setIsBetting({
                                    ...isBetting,
                                    second: false,
                                  })
                                }
                                className="w-full h-full rounded-[20px] text-xl border border-[#ff7171] bg-[#cb011a] shadow-[inset_0_1px_1px_#ffffff80] text-white text-center"
                              >
                                <span className="flex flex-col items-center justify-center">
                                  <label className="leading-none uppercase">
                                    Cancel
                                  </label>
                                </span>
                              </button>
                            </>
                          )}
                        </>
                      ) : (
                        <button
                          onClick={() => {
                            setIsBetting({
                              ...isBetting,
                              second: true,
                            });

                            setBet2(input2);
                          }}
                          className="w-full h-full rounded-[20px] text-xl border border-[#b2f2a3] bg-[#28a909] shadow-[inset_0_1px_1px_#ffffff80] text-white text-center"
                        >
                          <span className="flex flex-col items-center justify-center">
                            <label className="leading-none uppercase">
                              Bet
                            </label>
                            <label className="mt-[2px]">
                              <span className="text-2xl leading-none">
                                {input2.toFixed(2)}
                              </span>
                              <span className="text-lg leading-none">
                                &nbsp;BRL
                              </span>
                            </label>
                          </span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
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
