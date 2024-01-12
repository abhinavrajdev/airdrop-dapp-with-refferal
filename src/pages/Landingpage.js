import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import getTotalTransactionCount from "../blockchain/getTotalTransactionCount";
import getPublicAddress from "../blockchain/getPublicAddress";
import ClaimAirdropRefer from "../blockchain/ClaimAirdropRefer";
import { useParams } from "react-router-dom";
import ClaimAirdropNoRefer from "../blockchain/ClaimAirdropNoRefer";
import getTotalClaimed from "../blockchain/getTotalClaimed";
import getReffEarning from "../blockchain/getTotalRefferal";
import getClaimStatus from "../blockchain/getClaimStatus";

const Landingpage = () => {
  const [UserAdderss, setUserAddress] = useState("");
  const [totalTransactions, setTotalTransactions] = useState(0);
  const [claimableAmount, setClaimableAmount] = useState(0);
  const [connected, setConnecyed] = useState(false);
  const [loading, setLoading] = useState(false);
  const { filter } = useParams();
  const [showRefferal, setShowReffferal] = useState(false);
  const [totalClaimedAmt, set_totalClaimedAmt] = useState(1180000000);
  const [percentClaimed, set_percentClaimed] = useState(45);
  const [reffEarning, setReffEarning] = useState(0);
  const [hasClaimed, set_hasClaimed] = useState(true);

  const TotalAirdropSupply = 4000000000;

  const ClaimAirdropClick = async () => {
    console.log("clciked");
    setLoading(true);
    if (filter != null) {
      try {
        await ClaimAirdropRefer(UserAdderss, filter, totalTransactions * 1000);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const res = await ClaimAirdropNoRefer(
          UserAdderss,
          totalTransactions * 1000
        );
        console.log(res.blockHash);
      } catch (error) {
        console.log(error);
      }
    }
    const claimSatus = await getClaimStatus(UserAdderss);
    console.log("Claim Status:  " + claimSatus);
    set_hasClaimed(claimSatus);
    setLoading(false);
  };

  const handleRefferalClick = () => {
    setShowReffferal(true);
  };

  const handleRefferalClickClose = () => {
    setShowReffferal(false);
  };

  const handleConnectWallet = async () => {
    try {
      const pubAddress = await getPublicAddress();

      if (pubAddress != null) {
        setConnecyed(true);
        const totalTX = await getTotalTransactionCount();
        setClaimableAmount(totalTX * 1000);
        if (totalTX > 25) {
          setClaimableAmount(25000);
        }
        await setTotalTransactions(totalTX);
        await setUserAddress(pubAddress);

        // Get Total Claim
        /* global BigInt */

        var { _hex } = await getTotalClaimed();
        _hex = _hex.replace("0x", "");
        if (_hex.length % 2) {
          _hex = "0" + _hex;
        }
        console.log("Hex :  " + _hex);
        var bn = BigInt("0x" + _hex);
        console.log("BN:  " + bn);
        bn = bn / BigInt(1000000000000000000);

        bn = Number(bn);
        set_totalClaimedAmt(bn);
        console.log(bn);

        // Percent Claim
        const percentClaim_var = (Number(bn) / TotalAirdropSupply) * 100;
        const claim = Math.floor(percentClaim_var);
        set_percentClaimed(claim);
        console.log(claim);

        // Get Reff Earning
        var { _hex } = await getReffEarning(pubAddress);
        _hex = _hex.replace("0x", "");
        if (_hex.length % 2) {
          _hex = "0" + _hex;
        }
        console.log("Bn : " + _hex);
        var bn = BigInt("0x" + _hex);

        bn = bn / BigInt(1000000000000000000);

        const reff = Number(bn);
        setReffEarning(reff);
        console.log("Reff:  " + reff);

        // Get has CLaimed
        const claimSatus = await getClaimStatus(pubAddress);
        console.log("Claim Status:  " + claimSatus);
        set_hasClaimed(claimSatus);
      }
    } catch (e) {
      setConnecyed(false);
    }
  };

  const handleDisconnect = () => {
    setConnecyed(false);
  };

  return (
    <div className="w-screen  flex flex-col bg-black gap-[90px] px-3 lg:px-9 pb-[10px] ">
      <Header
        page={"airdrop"}
        connectStats={connected}
        connectFunc={handleConnectWallet}
        userAddr={UserAdderss}
        handleDisconnect={handleDisconnect}
      />
      {/* First Box */}
      <div className="flex justify-center w-screeen bg-black  ">
        {/* border-x-indigo-500 border-y-4 border-y-purple-500 */}
        <div className="flex flex-col lg:flex-col w-full max-w-[1200px] gap-[0px] items-center  px-9 ">
          {/* Description Box */}
          <div className="  px-3  ">
            <div className="w-full h-screen flex flex-col text-white ">
              <h1 className=" text-left font-black tracking-widest text-7xl lg:text-9xl pb-9  ">
                The Airdrop
              </h1>
              <h1 className=" text-left font-black tracking-widest text-7xl lg:text-9xl pb-9  ">
                is <span className="text-[#e7e752] ">Live</span>
              </h1>
              <div className="w-full flex flex-col  items-center"></div>
            </div>
          </div>

          <div className="w-full flex flex-col gap-[50px] text-white ">
            <h1 className=" text-center font-black tracking-  text-3xl lg:text-4xl pb-9  ">
              Only 400M MAC reserved for Airdrop
              <div className="h-[20px]"></div>
              <h1 className="text-[#e7e752] ">HURRY UP !!!</h1>
            </h1>
            <h1 className=" text-center font-black tracking- text-3xl  lg:text-4xl pb-9  ">
              Automatic referral
              <div className="h-[20px]"></div>
              <span className="text-indigo-400 ">Earnings </span>
              <div className="h-[20px]"></div>
              <span className="text-pink-300 ">
                {" "}
                !!! No claim required, Auto deposit to wallet !!!{" "}
              </span>
            </h1>

            <h1 className=" text-center font-black tracking-  text-3xl lg:text-4xl pb-9  ">
              My referral earnings
              <div className="h-[20px]"></div>
              <span className="text-green-400 "> {reffEarning + " ZKNS"} </span>
            </h1>
            <div className="flex justify-center items-center cursor-pointer">
              <a href="https://abhraj.com/" target="_blank">
                <h1 className=" text-center text-blue-300 font-black tracking-wide bg-pink-500 px-3 rounded-3xl  text-xl lg:text-xl py-1  ">
                  Share and Follow on Twitter to earn more rewards...
                  <div className="h-[20px]"></div>
                </h1>{" "}
              </a>
            </div>
          </div>

          {/* Form Box */}
          <div className="w-full max-w-[600px] mt-[200px] rounded-3xl pt-[50px] pb-7 px-3 flex flex-col items-center bg-gradient-to-r from-blue-600 to-violet-600 ">
            <h1 className="text-black text-center font-black text-slate-100  tracking-widest text-5xl">
              Claim Airdrop
            </h1>

            <div className="flex flex-col w-full max-w-[400px] mt-[100px]  ">
              {/* Loading Box */}
              <h1 className="text-white  pb-2 font-bold tracking-widest w-full">
                Total Claimed :
              </h1>
              <div className="w-full h-[50px] rounded-2xl bg-gradient-to-r from-teal-400 to-yellow-200 border-2 border-black mb-9 ">
                <div
                  className={
                    "h-full rounded-2xl bg-green-600 w-[" +
                    percentClaimed +
                    "%]"
                  }
                ></div>
                <h1 className="text-white text-center  pt-2 font-bold tracking-widest w-full">
                  {" "}
                  {totalClaimedAmt} {"/ "}
                  {TotalAirdropSupply}
                </h1>
              </div>

              {connected && (
                <h1 className="text-white mt-[50px]   pb-2 font-bold tracking-widest w-full">
                  Total Claimable :
                </h1>
              )}

              {connected && !hasClaimed && (
                <div className="w-full rounded-lg py-2 bg-slate-600 px-3 tracking-widest text-white font-black ">
                  <h1 className=" text-center   ">
                    {" "}
                    {claimableAmount + " MAC"}{" "}
                  </h1>
                </div>
              )}
              {connected && hasClaimed && (
                <div className="w-full opacity-50 rounded-lg py-2 bg-slate-600 px-3 tracking-widest text-white font-black ">
                  <h1 className=" text-center   ">
                    {" "}
                    {claimableAmount + " MAC"}{" "}
                  </h1>
                </div>
              )}

              {connected && !hasClaimed && (
                <button
                  disabled={loading && true}
                  onClick={ClaimAirdropClick}
                  className="w-full rounded-3xl border-2 border-slate-700 py-4  bg-gradient-to-r from-lime-400 to-lime-500 px-3 tracking-widest text-3xl text-black font-black my-9 cursor-pointer "
                >
                  {loading ? "Loading..." : "Claim"}
                </button>
              )}

              {connected && hasClaimed && (
                <button
                  disabled
                  onClick={ClaimAirdropClick}
                  className="w-full opacity-40 rounded-3xl border-2 border-slate-700 py-4  bg-gradient-to-r from-lime-400 to-lime-500 px-3 tracking-widest text-3xl text-black font-black my-9 cursor-pointer "
                >
                  Claimed
                </button>
              )}

              {!connected && (
                <button
                  disabled
                  onClick={ClaimAirdropClick}
                  className="w-full opacity-40 rounded-3xl border-2 border-slate-700 py-4  bg-gradient-to-r from-lime-400 to-lime-500 px-3 tracking-widest text-3xl text-black font-black my-9 cursor-pointer "
                >
                  Claim
                </button>
              )}

              {connected && (
                <button
                  onClick={handleRefferalClick}
                  className="w-full rounded-lg py-2 bg-black px-3 tracking-widest text-white font-black  cursor-pointer "
                >
                  Invite Friends{" "}
                  <p className="text-sm font-bold">to earn 10% extra</p>
                </button>
              )}
              {!connected && (
                <button
                  disabled
                  onClick={handleRefferalClick}
                  className="w-full opacity-50 rounded-lg py-2 bg-black px-3 tracking-widest text-white font-black  cursor-pointer "
                >
                  Invite Friends{" "}
                  <p className="text-sm font-bold">to earn 10% extra</p>
                </button>
              )}

              {!connected && (
                <button
                  onClick={handleConnectWallet}
                  className="w-full rounded-3xl py-2 bg-red-600 px-3 tracking-widest text-white font-black mt-6 cursor-pointer "
                >
                  Connect Wallet
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col justify-center items-center">
        <h1 className="text-white text-center text-xl mt-[50px]  pb-2 font-bold tracking-widest w-full">
          MACNICA Contract Address
        </h1>
        <div className="flex flex-col">
          <a
            href="https://goerli.etherscan.io/address/0x9c42095267cc4de848b9b1491b552e3cffd939cd"
            target="_blank"
            className="text-blue-500 w-full text-center max-w-[600px]  "
          >
            Click to view token contract
          </a>
          <a
            href="https://goerli.etherscan.io/address/0x222f7007ccfd7ca55b6b422abea80a36017342df"
            target="_blank"
            className="text-blue-500 w-full text-center max-w-[600px]  "
          >
            Click to view airdrop contract
          </a>
        </div>
      </div>

      <div className="w-full flex flex-col justify-center items-center">
        <h1 className="text-white text-center text-xl mt-[]  pb-2 font-bold tracking-widest w-full">
          About MANICA
        </h1>
        <p className="text-slate-500  font-bold w-full text-center max-w-[600px]  ">
          In the pulsating heart of the cryptosphere, where digital pulses
          translate into financial fortunes, a new player rises: Manic. More
          than just another altcoin, Manic seeks to revolutionize the very way
          we interact with our money. Imagine a world where transactions flow
          like lightning, unburdened by the clunky chains of traditional
          finance. Where borders melt away, replaced by a seamless tapestry of
          instantaneous exchange. This is the future Manic paints, a future
          fueled by its own electrifying energy.
        </p>
      </div>

      <div className="w-full flex flex-col justify-center items-center">
        <p className="text-yellow-500  font-bold w-full text-center max-w-[600px] mt-9 text-xl ">
          {" "}
          Your referral link:{" "}
        </p>
        <u>
          <a
            href={
              window.location.href.split("/")[0] +
              "//" +
              window.location.href.split("/")[2] +
              "/airdrop/" +
              UserAdderss
            }
            className="text-blue-500"
            target="_blank"
          >
            <p className="text-sm overflow-scroll text-center">
              {""}
              {window.location.href.split("/")[0]}
              {"//" +
                window.location.href.split("/")[2] +
                "/airdrop/" +
                UserAdderss.substr(0, 9)}
              {"..."}
            </p>
          </a>
        </u>

        <button
          onClick={() =>
            navigator.clipboard.writeText(
              window.location.href.split("/")[0] +
                "//" +
                window.location.href.split("/")[2] +
                "/airdrop/" +
                UserAdderss
            )
          }
          className="bg-black text-white text-sm mt-3 tracking-widest font-bold hover:text-yellow-700"
        >
          Click to copy
        </button>
      </div>

      {/* Tokenomics */}
      <div className="flex justify-center w-screeen bg-black ">
        <div className="w-full max-w-[1200px] py-9 gap-[90px] flex flex-col ">
          <h1 className="text-purple-500 text-left font-black tracking-widest text-4xl py-9">
            Tokenomics{" "}
          </h1>
          <div className="flex w-full flex-col lg:flex-row justify-center items-center gap-9   ">
            <div className="w-full lg:w-1/2  ">
              <img
                className="w-full bg-cover"
                src="https://i.imgur.com/BTLpMxk.png"
              />
            </div>
            <div className="w-full lg:w-1/2  flex-end flex justify-between ">
              <div></div>
              <img
                className="w-full lg:w-[80%]  bg-cover "
                src="https://i.imgur.com/SgZcT24.png"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Roadmap Section  */}
      <div className="w-full flex justify-center items-center flex flex-col gap-[90px] ">
        <h1 className="text-purple-500 text-left font-black tracking-widest text-4xl py-9">
          Roadmap{" "}
        </h1>
        <div className="flex  flex-col lg:flex-row gap-[100px] lg:gap-9   ">
          <div className="w-full lg:w-[300px] ">
            <img
              className="w-full bg-cover"
              src="https://i.imgur.com/0T11bBY.png"
            />
          </div>
          <div className="w-full lg:w-[300px] ">
            <img
              className="w-full bg-cover"
              src="https://i.imgur.com/uu1pX9D.png"
            />
          </div>
          <div className="w-full lg:w-[300px] ">
            <img
              className="w-full bg-cover"
              src="https://i.imgur.com/4deJKkD.png"
            />
          </div>
        </div>
      </div>

      {/* Exchange partners Section*/}
      <div className="w-full flex justify-center items-center flex flex-col gap-[20px] ">
        <div className="flex flex-col lg:flex-row gap-3 lg:gap-0 lg:gap-3">
          <h1 className="text-purple-500 text-center font-black tracking-widest text-4xl lg:text-3xl  pt-9 lg:pt-0">
            Exchange{" "}
          </h1>
          <h1 className="text-purple-500 text-center font-black tracking-widest text-3xl pb-9 ">
            {" "}
            Partners{" "}
          </h1>
        </div>

        <div className="flex  flex-col lg:flex-row gap-9 justify-center items-center">
          <div className="w-[100px]  ">
            <img src="https://i.imgur.com/2uz5Ujq.png" />
          </div>
          <div className="w-[100px]">
            <img src="https://i.imgur.com/Un5hRyj.png" />
          </div>
          <div className="w-[100px] ">
            <img
              className="w-full rounded-lg"
              src="https://miro.medium.com/v2/resize:fit:1400/format:webp/0*R0Cxtr2xKX5N_Pq7.png"
            />
          </div>
          <div className="w-[100px] ">
            <img
              className="w-full rounded-lg"
              src="https://i.imgur.com/40v631J.png"
            />
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col justify-center items-center">
        <p className="text-slate-500  font-bold w-full text-center max-w-[600px]  ">
          This project is a part of Abhinav Raj portfolio project, contact me at
          abhinavrajdevcontact@gmail.com or abhraj.com
        </p>
      </div>

      {/* Social media Section*/}
      <div className="w-full flex mt-[] justify-center items-center flex flex-col gap-[20px] ">
        <div className="flex  flex-row gap-9">
          <div className="w-[30px] rounded-full bg-white  ">
            <img
              className="w-full"
              src="https://about.twitter.com/content/dam/about-twitter/x/brand-toolkit/logo-black.png.twimg.1920.png"
            />
          </div>
          <div className="w-[30px]">
            <img
              className="w-full"
              src="https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg"
            />
          </div>
          <div className="w-[30px]  rounded-full pt-1">
            <img
              className="w-full"
              src="https://assets-global.website-files.com/6257adef93867e50d84d30e2/636e0a69f118df70ad7828d4_icon_clyde_blurple_RGB.svg"
            />
          </div>
        </div>
      </div>

      {/* Refferal Page */}
      {showRefferal && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-slate-700 opacity-80 flex justify-center items-center">
          <div className="px-9 py-9 bg-black opacity-100 rounded-3xl flex justify-center items-center gap-3 flex-col">
            <h1 className=" text-center font-black tracking-widest text-white  ">
              Your Referral Link: <br />
            </h1>
            <u>
              <a
                href={
                  window.location.href.split("/")[0] +
                  "//" +
                  window.location.href.split("/")[2] +
                  "/airdrop/" +
                  UserAdderss
                }
                className="text-blue-500"
                target="_blank"
              >
                <p className="text-sm overflow-scroll text-center">
                  {""}
                  {window.location.href.split("/")[0]}
                  {"//" + window.location.href.split("/")[2] + "/airdrop/"}{" "}
                  {UserAdderss.substr(0, 9)} {"..."}
                </p>
              </a>
            </u>
            <button
              onClick={() =>
                navigator.clipboard.writeText(
                  window.location.href.split("/")[0] +
                    "//" +
                    window.location.href.split("/")[2] +
                    "/airdrop/" +
                    UserAdderss
                )
              }
              className="bg-black text-white text-sm mt-3 tracking-widest font-bold hover:text-yellow-700"
            >
              Click to copy
            </button>
            <button
              onClick={handleRefferalClickClose}
              className="py-2 px-9 text-white bg-red-700 rounded-2xl font-black  w-fit mt-9 "
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Landingpage;
