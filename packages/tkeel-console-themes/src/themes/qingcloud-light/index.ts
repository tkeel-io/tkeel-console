import { extendTheme } from '@chakra-ui/react';

import baseExtension from '../base-extension';
import components from './components';
import foundations from './foundations';
import styles from './styles';

const theme = extendTheme(baseExtension, {
  config: { initialColorMode: 'light' },
  styles,
  components,
  ...foundations,
});

export default theme;
