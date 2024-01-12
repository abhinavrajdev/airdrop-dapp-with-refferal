import NormalHeader from "../components/NormalHeader";

const ContactUs = () => {
  return (
    <div className="w-full pb-9 h-full  flex flex-col bg-black gap-[90px] px-3 lg:px-9 pb-[10px] ">
      <NormalHeader page={"contact"} />
      {/* First Box */}
      <div className="w-full flex flex-col justify-center items-center">
        <h1 className="text-white text-center text-3xl mt-[]  pb-2 font-bold tracking-widest w-full">
          Contact Us
        </h1>
        <div className="w-full max-w-[600px]  bg-black mt-9 flex flex-col justify-center rounded-4xl ">
          <img
            className="rounded-3xl"
            src="https://www.theclimategroup.org/sites/default/files/styles/hero_header_x2/public/2020-11/contact%20us.jpg?itok=RCr-RXBv"
          />
        </div>
        <p className="text-slate-300  font-bold w-full text-center max-w-[600px] mt-9 ">
          Get in touch with us at any time you need an assistance. We are
          available 24x7 to answer your queries, fix any technical issues you
          encouner and guide you with anything you need, part of abhraj.com
        </p>
        <h1 className="text-yellow-700 text-center text-xl mt-[20px]  pb-2 font-bold tracking-widest w-full">
          Support Email : abhinavrajdevcontact@gmail.com
        </h1>
        <div className="w-full max-w-[300px] mt-9 flex flex-col justify-center ">
          <p className="text-slate-300 font-bold my-1">Your Email:</p>
          <input type="text" className="w-full rounded-xl px-2 py-1 "></input>
          <p className="text-slate-300 font-bold mb-1 mt-3">Your Message:</p>
          <textarea className="w-full  rounded-xl px-3 py-1" rows="4" cols="50">
            {" "}
          </textarea>
          <button className="px-3 py-3 text-black mt-9 font-bold rounded-xl bg-blue-400 font-bold">
            Submit query
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
