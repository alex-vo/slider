import React, { useState } from "react";
import "./App.css";

function getSlider() {
  return [
    <img src="/favicon.ico" />,
    <div>A</div>,
    <div>B</div>,
    <div>C</div>,
    <div>D</div>,
  ];
}

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [content, setContent] = useState(getSlider());
  const [goToPage, setGoToPage] = useState(0);
  const [swipeCoordinate, setSwipeCoordinate] = useState(0);

  function left() {
    if (currentSlide <= 0) {
      return;
    }

    setCurrentSlide((slider) => {
      return slider - 1;
    });
  }

  function right() {
    if (currentSlide >= content.length - 1) {
      return;
    }

    setCurrentSlide((slider) => {
      return slider + 1;
    });
  }

  function goToSlide(e) {
    e.preventDefault();
    if (goToPage < 1 || goToPage > content.length) {
      return;
    }

    setCurrentSlide(goToPage - 1);
  }

  function startSwiping(e) {
    setSwipeCoordinate(e.touches[0].clientX);
  }

  function finishSwiping(e) {
    if (e.changedTouches[0].clientX > swipeCoordinate) {
      left();
    } else {
      right();
    }
  }

  return (
    <React.Fragment>
      <div
        className="content"
        onTouchStart={(e) => startSwiping(e)}
        onTouchEnd={(e) => finishSwiping(e)}
      >
        {content[currentSlide]}
      </div>
      <div className="navigation">
        <button onClick={left} disabled={currentSlide <= 0}>
          left
        </button>
        <div>
          {currentSlide + 1} of {content.length}
        </div>
        <button onClick={right} disabled={currentSlide >= content.length - 1}>
          right
        </button>
      </div>
      <div>
        <form onSubmit={goToSlide}>
          <input
            type="number"
            value={goToPage ? goToPage : ""}
            onChange={(e) => setGoToPage(parseInt(e.target.value))}
            min="1"
            max={content.length}
            onSubmit={goToSlide}
          ></input>
          <button
            type="submit"
            disabled={goToPage < 1 || goToPage > content.length}
          >
            Go
          </button>
        </form>
      </div>
    </React.Fragment>
  );
}

export default App;
