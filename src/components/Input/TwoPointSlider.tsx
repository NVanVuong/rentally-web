import * as React from 'react';
import { Range } from 'react-range';

const TwoPointSlider = () => {
  const [values, setValues] = React.useState([25, 75]);

  return (
    <Range
      step={0.1}
      min={0}
      max={100}
      values={values}
      onChange={(values) => setValues(values)}
      renderTrack={({ props, children }) => (
        <div
          {...props}
          style={{
            ...props.style,
            height: '6px',
            width: '100%',
            backgroundColor: '#ccc'
          }}
        >
          {children}
        </div>
      )}
      renderThumb={({ props, index }) => (
        <div
          {...props}
          style={{
            ...props.style,
            height: '42px',
            width: '42px',
            backgroundColor: index === 0 ? '#999' : '#555'
          }}
        />
      )}
    />
  );
};

export default TwoPointSlider;
