import { useState } from 'react';

const useDateInput = (initialValue, postFunc=null) => {
    const [value, setValue] = useState(initialValue);

    const onChange = date => {
        setValue(date);
        postFunc && postFunc(date);
    }

    return [ value, setValue, onChange ];
}

export default useDateInput;
