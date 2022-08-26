import { useEffect } from "react";


function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

function Timer({time, updateTime, active, startTime}) {
    useEffect(() => {
        async function tick() {
            await delay(77);
            updateTime(Date.now());
            await tick();
        };

        Promise.resolve().then(tick);
    }, [updateTime]);

    const seconds = Math.floor((time - startTime) / 10) / 100;

    return (
        <label>
            Elapsed Time: {active ? `${seconds} seconds` : ""}
        </label>
    );
}

export default Timer;