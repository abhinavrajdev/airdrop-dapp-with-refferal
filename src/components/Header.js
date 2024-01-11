import React from "react";

const Header = ({ page, connectStats, connectFunc, userAddr }) => {
  return (
    <div className="w-full   flex flex-col items-center gap-9">
      <div className="w-full pb-2 pt-9 flex justify-between rounded-b-lg max-w-[1000px]  ">
        <h1 className="text-slate-400 text-left font-black tracking-widest text-3xl">
          ZKENS
        </h1>
        {!connectStats && (
          <button
            onClick={connectFunc}
            className="bg-[#e7e752] rounded-3xl  font-black px-3 py-1 "
          >
            Connect Wallet
          </button>
        )}
        {connectStats && (
          <button className="bg-[#e7e752] rounded-3xl opacity-70 font-black px-3 py-1 ">
            {userAddr.substr(1, 10) + "..."}
          </button>
        )}
      </div>
      <div className="flex justify-center items-center gap-3">
        <button className="font-bold text-slate-400">Home</button>
        {page != "airdrop" && (
          <button className="font-bold text-slate-400">Airdrop</button>
        )}
        {page == "airdrop" && (
          <button className="font-bold text-black py-1 px-3 bg-[#e7e752] rounded-3xl ">
            Airdrop
          </button>
        )}
        <button className="font-bold text-slate-400">Farm</button>
        <button className="font-bold text-slate-400">Contact Us</button>
      </div>
    </div>
  );
};

export default Header;
