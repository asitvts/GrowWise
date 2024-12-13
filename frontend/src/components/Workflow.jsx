import { CheckCircle2 } from "lucide-react";
import { checklistItems } from "../constants";
import video3 from "../assets/video3.mp4";

const Workflow = () => {
  return (
    <div id="workflow" className="mt-20">
      <h2 className="text-3xl sm:text-5xl lg:text-6xl text-center mt-6 tracking-wide">
        Accelerate your{" "}
        <span className="bg-gradient-to-r from-orange-500 to-orange-800 text-transparent bg-clip-text">
          Investing workflow.
        </span>
      </h2>
      <div className="flex flex-wrap justify-center">
        <div className="pl-2 pr-2 w-full lg:w-1/2 mt-20">
        <video
          autoPlay
          loop
          muted
          className="rounded-lg rotate-90 border border-orange-700 shadow-sm shadow-orange-400 mx-2 mt-20"
        >
          <source src={video3} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        </div>
        <div className="pt-12 w-full lg:w-1/2">
          {checklistItems.map((item, index) => (
            <div key={index} className="flex mb-12">
              <div className="text-green-400 mx-6 bg-neutral-900 h-10 w-10 p-2 justify-center items-center rounded-full">
                <CheckCircle2 />
              </div>
              <div>
                <h5 className="mt-1 mb-2 text-xl">{item.title}</h5>
                <p className="text-md text-neutral-500">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Workflow;
