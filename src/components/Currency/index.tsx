import React from 'react';
import { Text } from 'react-native';

import NumberFormat from 'react-number-format';

interface Props {
  value: number;
}

export default function Currency({
  value,
}: Props): React.ReactElement<any, any> {
  return (
    <NumberFormat
      value={value}
      displayType="text"
      thousandSeparator="."
      decimalSeparator=","
      fixedDecimalScale
      decimalScale={2}
      prefix="R$ "
      renderText={(item) => <Text>{item}</Text>}
    />
  );
}
