import React, {useContext} from 'react';
import Svg, {G, Text, TSpan, Circle, Path} from 'react-native-svg';
import ThemeContext from '../../contexts/ThemeContext';

function AppHeaderIcon(props) {
  const theme = useContext(ThemeContext);
  return (
    <Svg
      width={props.width || 200}
      height={props.height || 104}
      viewBox="0 0 278 104"
      {...props}>
      <G transform="translate(-373 -8)">
        <Text
          transform="translate(373 92)"
          fill={theme.primaryColor}
          fontSize={93}
          fontFamily="EdoSZ, Edo SZ">
          <TSpan x={0} y={0}>
            {'D'}
          </TSpan>
          <TSpan y={-5} fontSize={60} fill="#000">
            {'ictator'}
          </TSpan>
        </Text>
        <Circle
          cx={2.5}
          cy={2.5}
          r={2.5}
          transform="translate(392 51)"
          fill={theme.primaryColor}
        />
        <G
          transform="translate(394 53)"
          fill="#fff"
          stroke="#fff"
          strokeWidth={0.5}>
          <Circle cx={1} cy={1} r={1} stroke="none" />
          <Circle cx={1} cy={1} r={0.75} fill="none" />
        </G>
        <Circle
          cx={2.5}
          cy={2.5}
          r={2.5}
          transform="translate(404 51)"
          fill={theme.primaryColor}
        />
        <G
          transform="translate(406 53)"
          fill="#fff"
          stroke="#fff"
          strokeWidth={0.5}>
          <Circle cx={1} cy={1} r={1} stroke="none" />
          <Circle cx={1} cy={1} r={0.75} fill="none" />
        </G>
        <Path
          d="M391.452 63.017s-2.647 8.08 14.548 0"
          fill="none"
          stroke={theme.primaryColor}
        />
      </G>
    </Svg>
  );
}

export default AppHeaderIcon;
