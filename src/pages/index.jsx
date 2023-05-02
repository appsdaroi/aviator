import { useState, useEffect } from "react";
import { getSession } from "next-auth/react";

import { Canvas } from "@/modules/canvas";
import { signOut } from "next-auth/react";

import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";

export default function Home({ session }) {
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
          <div></div>

          <div className="flex flex-col justify-between w-full h-full overflow-y-hidden">
            <div className="min-h-[22px] max-h-[22px] flex justify-center items-centerm my-2.5">
              <div className="h-[22px] w-full flex items-center relative px-[5px] text-xs">
                <div className="flex items-center w-full h-full overflow-hidden">
                  <div className="flex gap-[4px]">
                    <div className="py-[2px] px-[11px] rounded-full font-bold bg-black text-[rgb(52,180,255)]">
                      1.25x
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

            <div className="relative h-[calc(40vh-38px)] min-h-[200px]">
              <div className="w-full h-full absolute rounded-[20px] border border-[#2a2b2e] overflow-hidden"></div>
            </div>

            <div className="flex justify-center shrink-0 pt-[5px]">
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

                    <div className="w-[calc(100%-20px)] max-w-[390px] flex justify-center mt-0 mb-auto mx-auto">
                      <div className="flex flex-col justify-center items-center text-center w-[140px]">
                        <div className="h-[34px] text-lg">
                          <div className="h-full flex justify-between items-center rounded-full bg-[#000000b3] font-bold px-2.5">
                            <div className="inline-flex items-center">
                              <button className="bg-transparent bg-[url('/icons/icon-minus.svg')] w-[18px] h-[18px] min-w-[18px] max-w-[18px] text-[#000000b3] text-center leading-[16px] font-bold" />

                              <div className="flex items-center w-[calc('100%-35px')] h-full">
                                <input
                                  type="text"
                                  className="w-full font-bold text-white bg-transparent"
                                />
                              </div>

                              <button className="bg-transparent bg-[url('/icons/icon-plus.svg')] w-[18px] h-[18px] min-w-[18px] max-w-[18px] text-[#000000b3] text-center leading-[16px] font-bold" />
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-center flex-wrap text-sm text-[#9ea0a3] w-full"></div>
                      </div>

                      <div className="w-[calc(100%-145px)] ml-[5px] flex justify-center items-center flex-col">
                        <button className="w-full h-full rounded-[20px] text-xl border border-[#b2f2a3] bg-[#28a909] shadow-[inset_0_1px_1px_#ffffff80] text-white text-center">
                          <span className="flex flex-col items-center justify-center">
                            <label className="uppercase">Bet</label>
                            <label>
                              <span className="text-2xl">1.00</span>
                              <span>BRL</span>
                            </label>
                          </span>
                        </button>
                      </div>
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
