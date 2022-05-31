import type { StyleProps } from '@chakra-ui/react';
import { Text } from '@chakra-ui/react';
import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  sx?: StyleProps;
}

export default function OverviewBoxLabel({ children, sx }: Props) {
  return (
    <Text fontSize="14px" lineHeight="16px" color="gray.500" {...sx}>
      {children}
    </Text>
  );
}
