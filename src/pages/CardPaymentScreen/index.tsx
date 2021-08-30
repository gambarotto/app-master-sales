import React from 'react';
// import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input";

import { Container } from './styles';

const CardPaymentScreen: React.FC = () => (
  <Container>
    {/* <CreditCardInput onChange={this._onChange} />
<LiteCreditCardInput onChange={this._onChange} /> */}
  </Container>
);

// Note: You'll need to enable LayoutAnimation on android to see LiteCreditCardInput's animations
// UIManager.setLayoutAnimationEnabledExperimental(true);

export default CardPaymentScreen;
