import React, { FC } from 'react';
// import { ArrayField, Button, Input, Form } from '@douyinfe/semi-ui';
import { Input } from '@douyinfe/semi-ui';
// import { IconPlusCircle, IconMinusCircle } from '@douyinfe/semi-icons';

const InputPlus: FC<{
  onChange?: Function;
}> = (props) => {
  return (
    <Input
      onChange={(value) =>
        props.onChange &&
        props.onChange({
          query: value,
        })
      }
      placeholder={'a=1&b=2&c=3'}
      style={{ marginRight: 16 }}></Input>
  );
};

export default InputPlus;

// <Form
//   style={{
//     maxHeight: '150px',
//     overflowY: 'scroll',
//     overflowX: 'hidden',
//   }}>
//   <ArrayField field='effects' initValue={[{ data: {} }]}>
//     {({ add, arrayFields }) => (
//       <>
//         <Button onClick={add} icon={<IconPlusCircle />} theme='light'>
//           新增项
//         </Button>
//         {arrayFields.map(({ key, remove }) => (
//           <div
//             key={key}
//             style={{
//               width: 1000,
//               display: 'flex',
//               alignItems: 'center',
//             }}>
//             <Input
//               placeholder={'key'}
//               style={{ width: 200, marginRight: 16 }}></Input>
//             <Input
//               placeholder={'value'}
//               style={{ width: 200, marginRight: 16 }}></Input>
//             <Button
//               type='danger'
//               theme='borderless'
//               icon={<IconMinusCircle />}
//               onClick={remove}
//               style={{ margin: 12 }}></Button>
//           </div>
//         ))}
//       </>
//     )}
//   </ArrayField>
// </Form>
