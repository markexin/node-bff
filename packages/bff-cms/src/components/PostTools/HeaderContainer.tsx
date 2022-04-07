import React from 'react';
import JSONInput from 'react-json-editor-ajrm';
// @ts-ignore TODO: 类型优化
import locale from 'react-json-editor-ajrm/locale/zh-cn';

const HeaderContainer = ({ initValue = {} }: { initValue?: {} }) => {
  return (
    <JSONInput
      placeholder={initValue}
      theme='light_mitsuketa_tribute'
      locale={locale}
      colors={{
        // overrides theme colors with whatever color value you want
        string: '#DAA520',
      }}
      width='auto'
      height='150px'
    />
  );
};

export default HeaderContainer;
