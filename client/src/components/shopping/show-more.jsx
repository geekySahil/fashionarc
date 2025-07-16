import React, { useState } from "react";
import { Button } from "../ui/button";

function ShowMore({ text, addStyles }) {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="space-y-2 mt-2 ">
      <p
        className={`${addStyles} text-muted-foreground ${
          !showMore ? "line-clamp-2" : ""
        }`}
      >
        {text}
      </p>
      <span
        onClick={() => setShowMore(!showMore)}
        variant='outline'
        className="hover:underline text-sm font-medium text-slate-600"
      >
        {showMore ? "Show Less" : "Show More"}
      </span>
    </div>
  );
}

export default ShowMore;
