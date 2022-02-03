import { useState } from 'react';
import { useQueryClient } from 'react-query';
import { Cell, Column } from 'react-table';
import { Flex, Text } from '@chakra-ui/react';
import {
  ButtonsHStack,
  LinkButton,
  PageHeaderToolbar,
  Table,
  toast,
} from '@tkeel/console-components';
import { formatDateTimeByTimestamp } from '@tkeel/console-utils';

import CreateUserButton from './components/CreateUserButton';
import ModifyUserButton from './components/ModifyUserButton';

import useUsersQuery, {
  User,
} from '@/tkeel-console-plugin-tenant-users/hooks/queries/useUsersQuery';

function Index() {
  const [keyword, setKeyWord] = useState('');
  const queryClient = useQueryClient();

  let params = {};
  if (keyword) {
    params = { ...params, key_words: keyword };
  }
  const { data, queryKey } = useUsersQuery({ params });
  const users = data?.users ?? [];

  const handleCreateUserSuccess = () => {
    queryClient.invalidateQueries(queryKey);
  };

  const handleModifyUserSuccess = () => {
    toast({ status: 'success', title: '修改成功' });
    queryClient.invalidateQueries(queryKey);
  };

  const columns: ReadonlyArray<Column<User>> = [
    {
      Header: '用户账号',
      accessor: 'username',
      // eslint-disable-next-line react/no-unstable-nested-components
      Cell({ value }: { value: string }) {
        return (
          <Text color="gray.800" fontWeight="600">
            {value}
          </Text>
        );
      },
    },
    {
      Header: '用户昵称',
      accessor: 'nick_name',
    },
    {
      Header: '创建时间',
      accessor: 'create_at',
      Cell({ value }) {
        return formatDateTimeByTimestamp({ timestamp: value });
      },
    },
    {
      Header: '用户角色',
      accessor: 'roles',
      Cell({ value = [] }) {
        return value.join('，');
      },
    },
    {
      Header: '操作',
      // eslint-disable-next-line react/no-unstable-nested-components
      Cell({ row }: Cell<User>) {
        const { original } = row;

        return (
          <ButtonsHStack>
            <ModifyUserButton
              data={original}
              onSuccess={handleModifyUserSuccess}
            />
            <LinkButton>重置密码</LinkButton>
            <LinkButton>删除</LinkButton>
          </ButtonsHStack>
        );
      },
    },
  ];

  return (
    <Flex flexDirection="column" height="100%">
      <PageHeaderToolbar
        name="用户管理"
        hasSearchInput
        searchInputProps={{
          onSearch(value) {
            setKeyWord(value.trim());
          },
        }}
        buttons={[
          <CreateUserButton key="create" onSuccess={handleCreateUserSuccess} />,
        ]}
      />
      <Table
        style={{ flex: 1, overflow: 'hidden', backgroundColor: 'whiteAlias' }}
        columns={columns}
        data={users}
        defaultPageSize={20}
        scroll={{ y: '100%' }}
      />
    </Flex>
  );
}

export default Index;
