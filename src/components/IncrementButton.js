import { useState } from "react";


function IncrementButton() {
    const [val, update_val] = useState(0);

    return (
        <button onClick={() => update_val(val + 1)}>
            Click me: {val}
        </button>
    );
}

export default IncrementButton;