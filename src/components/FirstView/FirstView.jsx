import React, { useEffect, useState, useRef } from "react";
import styles from "./FirstView.module.scss";
import axios from "axios";

const FirstView = () => {
  const [fullSlogan, setFullSlogan] = useState(
    "Discover, Cook, Delight: Your Ultimate Recipe Haven!"
  );
  const [currentSlogan, setCurrentSlogan] = useState("");
  const currentSloganRef = useRef("");

  useEffect(() => {
    setTimeout(outSlogan, 300);
    //wait();
  }, []);

  // async function wait() {
  //   const x = await axios.get(
  //     "https://api.edamam.com/api/recipes/v2?type=public&q=pizza&app_id=c31a3183&app_key=%209ea4d958f775d81e1166f17e0594475e"
  //   );
  //   console.log(x);
  // }
  function outSlogan() {
    let currentIndex = 0;
    const intervalId = setInterval(() => {
      currentSloganRef.current += fullSlogan[currentIndex];
      setCurrentSlogan(currentSloganRef.current);
      currentIndex++;
      if (currentIndex === fullSlogan.length) {
        clearInterval(intervalId);
      }
    }, 100);
  }

  return (
    <section className={styles.first_view}>
      <h2 className={styles.slogan}>
        {currentSlogan}
        <span className={styles.type}>|</span>
      </h2>
    </section>
  );
};

export default FirstView;
