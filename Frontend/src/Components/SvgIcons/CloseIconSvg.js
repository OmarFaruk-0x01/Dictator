import React from 'react';
import Svg, {Path} from 'react-native-svg';

function CloseIcon(props) {
  return (
    <Svg
      width={14}
      height={12}
      viewBox="0 0 14 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path d="M12 1L2 11h10L2 1" stroke="#00B871" />
    </Svg>
  );
}

export default CloseIcon;
