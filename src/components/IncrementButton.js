
function IncrementButton({count, updateCount}) {
    return (
        <button onClick={() => updateCount(count + 1)}>
            Click me: {count}
        </button>
    );
}

export default IncrementButton;