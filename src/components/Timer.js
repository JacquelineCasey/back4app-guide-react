import { useEffect, useRef } from "react";


function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

function Timer({time, updateTime, active, startTime}) {
    const start_time_ref = useRef(startTime);
    start_time_ref.current = startTime;

    useEffect(() => {
        if (active) {
            const saved_start_time = start_time_ref.current;
            async function tick() {
                await delay(35);
                if (saved_start_time === start_time_ref.current) {
                    updateTime(Date.now());
                    await tick();
                }
            };

            Promise.resolve().then(tick);
        }
    }, [active, updateTime, startTime]);

    const seconds = Math.floor((time - startTime) / 10) / 100;

    return (
        <label>
            Elapsed Time: {active ? `${seconds} seconds` : ""}
        </label>
    );
}

export default Timer;