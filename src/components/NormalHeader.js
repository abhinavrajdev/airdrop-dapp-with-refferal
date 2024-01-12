import React from "react";

const NormalHeader = ({ page }) => {
  return (
    <div className="w-full   flex flex-col items-center gap-9">
      <div className="w-full pb-2 pt-9 flex justify-between rounded-b-lg max-w-[1000px]  ">
        <div className="flex justify-center items-center gap-3">
          <img className="w-[50px] " src={"https://i.imgur.com/EdnafE8.jpeg"} />
          <h1 className="text-slate-400 text-left font-black tracking-widest text-3xl">
            MANICA
          </h1>
        </div>
      </div>
      <div className="flex justify-center items-center gap-3">
        <button className="font-bold text-slate-400">Home</button>

        {page != "airdrop" && (
          <a href="/airdrop">
            <button className="font-bold text-slate-400">Airdrop</button>
          </a>
        )}
        {page == "airdrop" && (
          <button className="font-bold text-black py-1 px-3 bg-[#e7e752] rounded-3xl ">
            Airdrop
          </button>
        )}

        {page != "farm" && (
          <a href="farm">
            <button className="font-bold text-slate-400">Farm</button>
          </a>
        )}
        {page == "farm" && (
          <button className="font-bold text-black py-1 px-3 bg-[#e7e752] rounded-3xl ">
            Farm
          </button>
        )}

        {page != "contact" && (
          <a href="/contactus">
            <button className="font-bold text-slate-400"> Contact Us</button>
          </a>
        )}
        {page == "contact" && (
          <button className="font-bold text-black py-1 px-3 bg-[#e7e752] rounded-3xl ">
            Contact Us
          </button>
        )}
      </div>
    </div>
  );
};

export default NormalHeader;
