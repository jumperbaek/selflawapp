import { useState } from 'react';

const useInput = (initialValue, postFunc=null) => {
    const [value, setValue] = useState(initialValue);

    const onChange = e => {
            // Destructing Assignment
        const {target: {value}} = e;
        setValue(value);
        postFunc && postFunc(value);
    }

    return [ value, setValue, onChange ];
}

export default useInput;
