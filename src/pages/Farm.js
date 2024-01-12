import NormalHeader from "../components/NormalHeader";

const Farm = () => {
  return (
    <div className="w-screen h-full pb-9  flex flex-col bg-black gap-[90px] px-3 lg:px-9 pb-[10px] ">
      <NormalHeader page={"farm"} />
      {/* First Box */}
      <div className="w-full flex flex-col justify-center items-center ">
        <h1 className="text-white text-center text-3xl mt-[]  pb-2 font-bold tracking-widest w-full">
          Farm
        </h1>
        <div className="w-full max-w-[600px]  bg-black mt-9 flex flex-col justify-center rounded-4xl ">
          <img
            className="rounded-3xl"
            src="https://pixelplex.io/wp-content/uploads/2021/03/what-is-yield-farming-main-1600.jpg"
          />
        </div>
        <p className="text-slate-300  font-bold w-full text-center max-w-[600px] mt-9 ">
          Unlock the power of your $ZKNS tokens with our revolutionary staking &
          farming feature. Now, you have the opportunity to stake your tokens in
          our staking pool and watch your investments grow. By participating in
          our staking & farming program, you have the opportunity to earn an
          impressive Annual Percentage Rate (APR) of up to 200% on your staked
          tokens.
        </p>
        <h1 className="text-yellow-300 text-center text-xl mt-[20px]  pb-2 font-bold tracking-widest w-full">
          Farm & Staking Comming Soon......
        </h1>
      </div>
    </div>
  );
};

export default Farm;
