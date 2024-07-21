import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function About() {
  const [about, setAbout] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/about")
      .then((response) => response.json())
      .then((data) => {
        if (data.about) {
          setAbout(data.about);
        } else {
          throw new Error("Unexpected data structure: " + JSON.stringify(data));
        }
      })
      .catch((error) => {
        console.error("Error fetching about data:", error);
        setError(error.message);
      });
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!about) {
    return <div>Loading...</div>;
  }

  return (
    <div className="border-b border-neutral-900 pb-4">
      <h1 className="my-20 text-center text-4xl">About
        <span className="text-neutral-500"> Me</span>
      </h1>
      <div className="flex flex-wrap">
        <motion.div 
          whileInView={{opacity: 1, x: 0}}
          initial={{opacity: 0, x: -100}}
          transition={{duration: 0.5}}
          className="w-full lg:w-1/2 lg:p-8">
          <div className="flex items-center justify-center">
            <img className="rounded-2xl" src={about.imageUrl} alt="about" />
          </div>
        </motion.div>
        <motion.div 
          whileInView={{opacity:1, x:0}}
          initial={{opacity: 0, x: 100}}
          transition={{duration: 0.5}}
          className="w-full lg:w-1/2">
          <div className="flex justify-center lg:justify-start">
            <p className="my-2 max-w-xl py-6">{about.aboutText}</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
