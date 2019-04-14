// @flow

import { useState } from "react";

const defaultMaxSize = 5;

export default function useLogger(maxSize?: number = defaultMaxSize): * {
  const [lines, setLines]: * = useState([]);
  const messages: string[] = lines.map(l => {
    let msg = `${l.timestamp.toISOString()}: ${l.msg}`;
    if (l.count > 1) {
      msg += ` (repeated ${l.count} times)`;
    }
    return msg;
  });
  return [
    messages,
    msg => {
      const out = lines.slice();
      if (out.length > 0 && out[out.length - 1].msg === msg) {
        out[lines.length - 1].count++;
      } else {
        out.push({ timestamp: new Date(), msg, count: 1 });
        if (out.length > maxSize) {
          out.shift();
        }
      }
      setLines(out);
    }
  ];
}
