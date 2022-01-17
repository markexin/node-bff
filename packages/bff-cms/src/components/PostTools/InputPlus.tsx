import React from 'react';
import { ArrayField, Button, Input } from '@douyinfe/semi-ui';
import { IconPlusCircle, IconMinusCircle } from '@douyinfe/semi-icons';

const InputPlus = () => {
  return (
    <ArrayField field='effects' initValue={[{ data: {} }]}>
      {({ add, arrayFields }) => (
        <>
          <Button onClick={add} icon={<IconPlusCircle />} theme='light'>
            新增项
          </Button>
          {arrayFields.map(({ key, remove }) => (
            <div
              key={key}
              style={{
                width: 1000,
                display: 'flex',
                alignItems: 'center',
              }}>
              <Input
                placeholder={'key'}
                style={{ width: 200, marginRight: 16 }}></Input>
              <Input
                placeholder={'value'}
                style={{ width: 200, marginRight: 16 }}></Input>
              <Button
                type='danger'
                theme='borderless'
                icon={<IconMinusCircle />}
                onClick={remove}
                style={{ margin: 12 }}></Button>
            </div>
          ))}
        </>
      )}
    </ArrayField>
  );
};

export default InputPlus;
