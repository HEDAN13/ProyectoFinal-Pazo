import { useState } from "react";

function useCount({ initial = 1, stock }) {
  const [count, setCount] = useState(initial);

  const remove = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const add = () => {
    if (count < stock) {
      setCount(count + 1);
    }
  };

  return {
    count,
    remove,
    add,
  };
}
export default useCount;
